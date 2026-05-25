# AGENTS.md

## Project Overview

- This repository is a Bun + TypeScript backend built with Hono.
- The app entrypoint is `src/index.ts`.
- Route modules live under `src/modules`.
- Shared helpers live under `src/lib`.
- Middleware lives under `src/middlewares`.
- Prisma schema and migrations live under `prisma/`.

## Commands

- Install dependencies: `bun install`
- Start local dev server: `bun run dev`
- Start without hot reload: `bun run start`
- Run type checks: `bun run typecheck`
- Run lint checks: `bun run lint`
- Auto-fix lint issues: `bun run lint:fix`
- Format code: `bun run format`
- Run the main verification suite: `bun run check`
- Regenerate version file: `bun run generate:version`

## Project Conventions

- Keep changes minimal and aligned with the existing Hono module structure.
- Add new route modules under `src/modules/<domain>/router.ts`, then mount them from `src/index.ts`.
- Reuse helpers from `src/lib/response.ts` for API response shapes when possible.
- Put reusable middleware in `src/middlewares`.
- If you add request context variables, update `src/types.ts`.
- Follow the existing Biome formatting instead of hand-formatting code.
- Avoid adding inline comments unless the user asks for them.
- For database design, use `snake_case` for table names and column names.

## API Notes

- The `/user` routes are protected by `privyAuthMiddleware`.
- If you add authenticated endpoints, prefer reusing the existing Privy auth middleware.
- The app reads `PRIVY_APP_ID` and `PRIVY_APP_SECRET` for auth, and `DATABASE_URL` for Prisma.
- In this monorepo, the API dev port defaults to `5201`.

## Prisma Notes

- The Prisma schema is at `prisma/schema.prisma`.
- Prisma config is at `prisma.config.ts`.
- The configured client output is `src/generated/prisma`.
- Prefer `snake_case` for database tables and columns in Prisma models. Use Prisma mapping features if needed to keep application naming clear.
- If schema changes are required, keep Prisma-related updates focused and note any needed regeneration steps in your handoff.

## Validation

- Prefer `bun run check` before finishing substantial code changes.
- Use `bun run format` when formatting drift appears.
- Do not fix unrelated lint or type errors unless the user asks.
