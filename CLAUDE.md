# Proveri — instructions for Claude Code

This project uses Spec Kit (spec-driven development).

- Source of truth: `.specify/memory/constitution.md` and `specs/001-proveri-mi-ovo/` (spec.md, plan.md, tasks.md, contracts/, research.md, data-model.md, quickstart.md). Read them before writing code.
- The constitution overrides everything else. Never store or log conversation text, never accept images, keep QuickExit on every screen.
- Follow the design system in `plan.md` exactly (colors, fonts, layout, motion, voice). All UI copy goes in `src/copy/sr.ts`, Serbian Latin script.
- Work through `tasks.md` in order, one phase at a time. Tick each task `[x]` in tasks.md when done. Stop at every **Checkpoint** / **QA** task and report what to test.
- Scaffold non-interactively, e.g. `npx create-next-app@latest . --ts --tailwind --app --src-dir --eslint --use-npm --no-import-alias --yes`.
- Never commit `.env.local` or API keys.
- Run `npm run build` and `npx vitest run` before saying a phase is done.

@AGENTS.md
