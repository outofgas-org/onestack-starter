# Repository Guidelines

## Architecture

This repository is a Bun workspace monorepo with separate deployable apps:

```txt
apps/web          # Next.js frontend
apps/api          # Hono backend
packages/shared   # shared TypeScript code
```

Keep `apps/web` and `apps/api` as independent applications. They may be developed together in this repository, but they should remain deployable separately.

## App Boundaries

- `apps/web` must not import implementation code directly from `apps/api`.
- `apps/api` must not depend on Next.js-specific modules or browser-only code.
- Frontend-to-backend communication should happen through HTTP, generated clients, RPC clients, OpenAPI clients, GraphQL clients, or shared contract types.
- Shared runtime behavior should live in packages only when both apps genuinely need it.

## Shared Package Rules

Use `packages/shared` for pure TypeScript that is safe in both frontend and backend environments.

Good candidates:

- Zod schemas and validators
- API request/response types
- Domain constants
- Lightweight formatting/parsing utilities
- Auth/session type definitions

Do not put these in `packages/shared`:

- Prisma client or database access
- Node-only APIs such as `fs`, `net`, or server process management
- Next.js components, hooks, route handlers, or server actions
- Hono route handlers or backend service implementations
- Secrets, environment variables, or provider SDK instances

If shared code starts needing platform-specific dependencies, split it into a more specific package such as `packages/api-contract`, `packages/config`, `packages/db`, or `packages/ui`.

## Dependency Rules

- Use Bun as the package manager.
- Keep a single root `bun.lock`.
- Add app-specific dependencies to the app that uses them.
- Add truly shared dependencies only to the package that owns the shared code.
- Prefer workspace dependencies with `workspace:*` for internal packages.

Examples:

```sh
bun add zod --cwd packages/shared
bun add @tanstack/react-query --cwd apps/web
bun add pg --cwd apps/api
```

## Development Commands

Run from the repository root:

```sh
bun install
bun run dev
bun run dev:web
bun run dev:api
bun run build
bun run lint
bun run prisma:generate
```

`bun run dev` starts both apps. By default, the web app uses port `5200` and the API app uses port `5201`.

## Backend Guidelines

- Keep Hono as a standalone backend app.
- Keep long-running jobs, queues, scheduled tasks, WebSockets, agent tasks, and database-heavy work out of the Next.js app.
- Prefer explicit service modules under `apps/api/src` instead of placing business logic directly in route handlers.
- Keep Prisma and database code backend-only unless a dedicated backend package is introduced.
- Validate incoming API input at the backend boundary.

## Frontend Guidelines

- Keep `apps/web` focused on UI, routing, client state, and API consumption.
- Do not duplicate backend domain validation in components when a shared schema can be used.
- Keep generated GraphQL or API client output inside the frontend app unless it becomes a cross-app contract.
- Prefer small app-local UI components before creating a shared UI package.

## Environment Variables

- Keep app-specific `.env.example` files close to the app that consumes them.
- Do not commit real `.env` files.
- Do not read backend-only secrets from frontend code.
- If environment validation grows, create a dedicated package such as `packages/config` with clear frontend/backend separation.

## Deployment

Expected deployment model:

- `apps/web`: deploy as the Next.js frontend, commonly to Vercel or another Next-compatible platform.
- `apps/api`: deploy as the Hono backend, commonly to Docker, Fly.io, Railway, Render, VPS, or Workers-compatible runtimes if adapted.

Avoid coupling the backend runtime to Vercel Functions unless the API is intentionally lightweight and serverless-only.

## Code Quality

- Keep changes scoped to the app or package that owns the behavior.
- Avoid broad refactors while making feature changes.
- Preserve app independence even when sharing types.
- Run the narrowest useful verification command after changes.
- For cross-app changes, run at least `bun run build`, `bun run lint`, and any relevant backend checks.

## When Adding New Packages

Create a new package when there is a real ownership boundary, not just to move files around.

Reasonable future packages:

```txt
packages/api-contract   # schemas, API types, generated contract helpers
packages/config         # env parsing and validation
packages/db             # Prisma/database access for backend-owned consumers
packages/ui             # shared UI components, only when multiple frontends exist
packages/auth           # shared auth types and backend/frontend-safe helpers
```

Keep each package explicit about which environments it supports.
