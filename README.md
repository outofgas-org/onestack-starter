# Onestack Starter

Monorepo starter with a standalone Next.js frontend and standalone Hono backend.

```txt
apps/
  web/        # Next.js frontend
  api/        # Hono backend
packages/
  shared/     # shared types, validators, utilities
```

## Setup

```sh
bun install
```

## Development

Run both apps:

```sh
bun run dev
```

Run one app:

```sh
bun run dev:web
bun run dev:api
```

By default, the web app runs on [http://localhost:5200](http://localhost:5200) and the API app runs on [http://localhost:5201](http://localhost:5201).

## Shared Code

Put shared TypeScript code in `packages/shared/src` and import it from either app:

```ts
import { healthResponse } from "@onestack/shared";
```
