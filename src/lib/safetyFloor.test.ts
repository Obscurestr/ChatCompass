import { describe, expect, it } from "vitest";
import { normalize, safetyFloor } from "./safetyFloor";

// Samples from specs/001-proveri-mi-ovo/quickstart.md
const SAMPLES = {
  A: "Did you do the maths homework? / Yeah, question 4 was a pain. / Haha same, let's ask the teacher tomorrow.",
  B: "I really like talking to you. / Me too. / Just don't tell anyone about us, it's our secret, other people wouldn't understand.",
  C: "Let's switch to another app, it's more private there. / Why? / No reason. Which school do you go to and when do your classes end?",
  D: "You're so much more mature than other girls your age. / Thanks. / Send me a pic of you, just for me, nobody else will see it. / I don't know… / Come on, don't you trust me?",
  E: "Let's meet up in the park on Saturday. Don't tell your parents, they'd ruin everything.",
  F: "I've been chatting with a guy for a month. He says he's 16 but he never wants to video call. Lately he keeps asking me about things at home and gets angry when I don't answer.",
};

describe("safetyFloor — quickstart samples", () => {
  it("forces high on D (images) and E (meeting)", () => {
    expect(safetyFloor(SAMPLES.D)).toEqual({ triggered: true, groups: ["images"] });
    expect(safetyFloor(SAMPLES.E)).toEqual({ triggered: true, groups: ["meeting"] });
  });

  it.each(["A", "B", "C", "F"] as const)("leaves sample %s to the model", (key) => {
    expect(safetyFloor(SAMPLES[key]).triggered).toBe(false);
  });

  it("S21: harmless 'if you don't' + 'see you' is not forced high", () => {
    expect(safetyFloor("If you don't make it today, see you tomorrow at school").triggered).toBe(false);
  });

  it("S22: homework picture + watching live is not forced high", () => {
    expect(
      safetyFloor("Send me a pic of the chemistry homework, we watched the game live so I didn't finish").triggered,
    ).toBe(false);
  });
});

describe("safetyFloor — each group, with a harmless counter-example", () => {
  it.each([
    ["meeting", "we should meet in person this weekend", "we met in person at the class trip"],
    ["meeting", "I'll pick you up after school", "mum will pick me up after school"],
    ["meeting", "come over to my place, nobody's home", "come over to the library for the project"],
    ["threats", "I'll show everyone what you sent", "show everyone your drawing, it's great"],
    ["threats", "if you don't send more pics I'll be angry", "if you don't send the notes I'll ask Ana"],
    ["threats", "if you dont send me a photo...", "if you don't send me the photos from the trip by Friday, remind me"],
    ["threats", "If you tell anyone, I'll post it", "if you tell anyone about the surprise party it's ruined"],
    ["threats", "if you tell your mum I'm gonna end you", "tell anyone who asks that the party is at 8"],
    ["images", "can I get a photo of you in your room", "here's a photo of your dog from yesterday"],
    ["images", "send nudes", "the lipstick is a nude shade"],
    ["images", "take a selfie, just for me", "I saved the last cookie just for me"],
  ] as const)("%s: triggers on %j but not on %j", (group, dangerous, harmless) => {
    const hit = safetyFloor(dangerous);
    expect(hit.triggered).toBe(true);
    expect(hit.groups).toContain(group);
    expect(safetyFloor(harmless).triggered).toBe(false);
  });
});

describe("safetyFloor — normalisation", () => {
  it("handles curly apostrophes, missing apostrophes and case", () => {
    expect(safetyFloor("I’LL SHOW EVERYONE").triggered).toBe(true);
    expect(safetyFloor("ill post it online").triggered).toBe(true);
    expect(safetyFloor("IF YOU DONT SEND PICS").triggered).toBe(true);
  });

  it("handles extra whitespace and line breaks inside a phrase", () => {
    expect(safetyFloor("let's   meet\nup tomorrow").triggered).toBe(true);
  });

  it("needs 'just for me' and a photo word in the same message", () => {
    expect(safetyFloor("this is just for me / nice pic of the beach").triggered).toBe(false);
    expect(safetyFloor("send a pic, just for me").triggered).toBe(true);
  });
});

// FR-025 — regional languages. Each dangerous line has a harmless line with similar words.
describe("safetyFloor — regional languages", () => {
  it.each([
    // Serbian / Croatian / Bosnian / Montenegrin
    ["meeting", "Hajde da se nađemo u parku u subotu, nemoj da kažeš mami.", "Vidimo se sutra u školi!"],
    ["meeting", "Dođi kod mene posle škole, niko neće biti kući.", "Dođi na trening u pet."],
    ["meeting", "Doći ću po tebe kolima ispred škole.", "Doći ću na rođendan kasnije."],
    ["threats", "Pokazaću svima tvoje poruke ako me ostaviš.", "Pokazaću ti kako se rešava zadatak."],
    ["threats", "Ako mi ne pošalješ još jednu sliku, svi će videti.", "Ako ne pošalješ beleške, pitaću Anu."],
    ["threats", "Ako nekome kažeš, poslaću tvojim roditeljima sve.", "Ako nekome kažeš za žurku iznenađenja, ljutiću se."],
    ["images", "Pošalji mi svoju sliku u donjem vešu.", "Pošalji mi sliku domaćeg iz hemije."],
    ["images", "Slikaj se za mene, samo za mene.", "Slikaj zalazak sunca, prelep je."],
    ["images", "Pošalji jednu fotku, samo za mene.", "Ovaj kolač je samo za mene."],
    // Macedonian
    ["meeting", "Ајде да се најдеме во паркот, но не кажувај им на родителите.", "Се гледаме утре на час."],
    ["threats", "Ако не ми пратиш слика, ќе им покажам на сите.", "Ако не ми пратиш домашна, ќе ја прашам Ана."],
    ["images", "Прати ми твоја слика, само за мене.", "Прати ми ја домашната по математика."],
    ["images", "Сакам голи слики од тебе.", "Сакам слики од екскурзијата."],
    // Albanian
    ["meeting", "Hajde të takohemi në park të shtunën, mos u thuaj prindërve.", "Shihemi nesër në shkollë."],
    ["threats", "Nëse nuk më dërgon foto, do t'ua tregoj të gjithëve.", "Nëse nuk më dërgon detyrat, do pyes Anën."],
    ["images", "Më dërgo një foto tënden, vetëm për mua.", "Më dërgo detyrën e matematikës."],
    ["images", "Dua foto lakuriq.", "Dua foto nga ekskursioni."],
  ] as const)("%s: triggers on %j but not on %j", (group, dangerous, harmless) => {
    const hit = safetyFloor(dangerous);
    expect(hit.triggered).toBe(true);
    expect(hit.groups).toContain(group);
    expect(safetyFloor(harmless).triggered).toBe(false);
  });

  it("reads Serbian Cyrillic like Latin", () => {
    expect(safetyFloor("Пошаљи ми слику без одеће, само за мене").triggered).toBe(true);
    expect(safetyFloor("Показаћу свима твоје поруке").groups).toContain("threats");
  });

  it("normalises đ, ć, ë and Macedonian ќ", () => {
    expect(normalize("Doći ću po tebe")).toBe("doci cu po tebe");
    expect(normalize("Нађимо се")).toBe("nadjimo se");
    expect(normalize("ќе дојдам по тебе")).toBe("kje dojdam po tebe");
    expect(normalize("t'ua tregoj të gjithëve")).toBe("tua tregoj te gjitheve");
  });
});
