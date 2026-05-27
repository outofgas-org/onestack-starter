# Onestack Starter

Onestack Starter is a Bun workspace monorepo with a standalone Next.js frontend,
a standalone Hono backend, and a small shared TypeScript package for code that is
safe in both runtimes.

```txt
apps/
  web/        # Next.js frontend
  api/        # Hono backend
packages/
  shared/     # shared types, validators, utilities
```

## Requirements

- [Bun](https://bun.sh/)
- A database connection string for the API when using Prisma-backed features

## Install

```sh
bun install
```

## Development

Run both apps from the repository root:

```sh
bun run dev
```

Run one app:

```sh
bun run dev:web
bun run dev:api
```

Current default ports:

- Web: [http://localhost:7200](http://localhost:7200)
- API: [http://localhost:5201](http://localhost:5201)

## Environment

Each app owns its own environment file:

```txt
apps/web/.env.example
apps/api/.env.example
```

Copy the relevant example to `.env` in the same app directory and fill in the
values needed by that app. Do not put backend-only secrets in frontend code.

## Commands

```sh
bun run build
bun run lint
bun run check
bun run codegen
bun run prisma:generate
```

## Shared Code

Put shared TypeScript code in `packages/shared/src` when it is safe for both the
frontend and backend. Good candidates are schemas, API types, constants, and
small formatting helpers.

```ts
import { healthResponse } from "@onestack/shared";
```

Keep app-specific implementation in the app that owns it. The web app should
talk to the API over HTTP or generated clients, not by importing API
implementation modules directly.

## App Docs

- [Web README](apps/web/README.md)
- [API README](apps/api/README.md)
