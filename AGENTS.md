# AGENTS

Use this file as the first-stop guide for agent work in this repository. For local setup details, see [README.md](README.md).

## Project Shape

- This repo is a single app with a Vue 3 + Vite frontend and an Express server in [server.ts](server.ts).
- `npm run dev` runs Vite for the frontend and a separate Express API process for `POST /api/chat`.
- The frontend entry is [src/main.tsx](src/main.tsx); the page shell lives in [src/App.tsx](src/App.tsx).

## Commands

- `npm install` installs dependencies.
- `npm run dev` starts the Vite frontend on its dev port and the API server on port `3001`.
- `npm run lint` runs the repo's only automated validation: `tsc --noEmit`.
- `npm run build` builds the Vite client and separately bundles [server.ts](server.ts) into `dist/server.cjs`.
- `npm run preview` runs the Vite preview server for the client bundle only.

## File Ownership

- Change page layout, sections, and interaction flow in [src/App.tsx](src/App.tsx) and [src/components](src/components).
- Change portfolio copy, skills, projects, experience, and article content in [src/data.ts](src/data.ts).
- Change shared data contracts in [src/types.ts](src/types.ts).
- Change chat drawer UI and request payload shape in [src/components/AIChatBot.tsx](src/components/AIChatBot.tsx).
- Change Gemini integration, fallback responses, and API behavior in [server.ts](server.ts).
- Change global styling tokens and utility classes in [src/index.css](src/index.css).

## Repo-Specific Rules

- Keep profile and branding content synchronized across [src/data.ts](src/data.ts), [src/components/AIChatBot.tsx](src/components/AIChatBot.tsx), and [server.ts](server.ts). The current persona text is duplicated across those files.
- Do not assume live Gemini responses when `GEMINI_API_KEY` is missing. [server.ts](server.ts) intentionally falls back to canned replies.
- Prefer existing TypeScript interfaces over ad hoc object shapes when extending content or chat messages.
- Keep edits narrow. There is no test suite, so avoid broad refactors unless the task requires them.

## Validation

- Run `npm run lint` after TypeScript, React, or server changes.
- Run `npm run build` when touching [server.ts](server.ts), bundling behavior, or app-wide integration points.
- If you change chat behavior, manually smoke test the `/api/chat` flow through the UI because there is no automated API coverage.

## Notes For Agents

- The README only covers setup and environment configuration; do not duplicate it here.
- There is no separate docs directory, no test runner, and no lint formatter beyond TypeScript checking.
- The Vite alias `@/` resolves to the repo root in [vite.config.ts](vite.config.ts), but existing source files mostly use relative imports. Match the surrounding style.
