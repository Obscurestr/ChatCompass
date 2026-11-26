# Proveri — SheSafe Hackathon (Case 3)

Spec Kit artifacts for spec-driven development.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
npm test                     # vitest
```

## Use with Spec Kit
```bash
uvx --from git+https://github.com/github/spec-kit.git specify init proveri --ai claude
# copy this folder's .specify/memory/constitution.md and specs/ into the new project
```
Then in your AI agent:
1. `/speckit.analyze` — consistency check across spec, plan, tasks
2. (optional) `/speckit.clarify` — if anything is unclear
3. `/speckit.implement` — or implement phase by phase (Day 1 → Phase 1–3)

## Files
| File | What it is |
|---|---|
| `CLAUDE.md` | Working rules Claude Code reads automatically |
| `.specify/memory/constitution.md` | Non-negotiable principles (safety, privacy, discretion, design) |
| `specs/001-proveri-mi-ovo/spec.md` | User stories, requirements, success criteria |
| `specs/001-proveri-mi-ovo/plan.md` | Stack, architecture, **design system** |
| `specs/001-proveri-mi-ovo/contracts/analyze-api.md` | API contract + AI system prompt |
| `specs/001-proveri-mi-ovo/research.md` | Decisions, safety keywords, helplines to verify |
| `specs/001-proveri-mi-ovo/data-model.md` | Types |
| `specs/001-proveri-mi-ovo/quickstart.md` | Setup + Tamara's manual test script + sample chats |
| `specs/001-proveri-mi-ovo/tasks.md` | Tasks by day |
