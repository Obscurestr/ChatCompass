// Shared by the two root layouts (the country picker and /{country}/{lang}): fonts, metadata, <html>/<body>.

import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Comfortaa, Nunito, Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import { APP_NAME } from "../config/app";

// Display + labels: rounded, friendly; variable weight (we use 600–700).
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Body/UI: variable weight; we use 400 and 700.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  // Next has no metric overrides for this font yet; fall back to system UI fonts.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Macedonian (Cyrillic): Quicksand and Atkinson have no Cyrillic, so html[lang="mk"] switches to these.
// Not preloaded: only Macedonian pages download them.
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  preload: false,
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  preload: false,
});

const fontVariables = [quicksand, atkinson, comfortaa, nunito].map((f) => f.variable).join(" ");

// Discretion (constitution III): neutral title, not indexed, no referrer sent to other sites.
export const metadata: Metadata = {
  title: APP_NAME,
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  formatDetection: { telephone: false, email: false, address: false },
  // iOS "Add to Home Screen": neutral name, runs full-screen like an app.
  appleWebApp: { capable: true, title: APP_NAME, statusBarStyle: "default" },
  applicationName: APP_NAME,
};

export const viewport: Viewport = {
  themeColor: "#fffcfa",
};

/** <html> + <body> with the fonts. Each layout puts the QuickExit pill inside (constitution III: on every screen). */
export function Shell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} className={fontVariables}>
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
