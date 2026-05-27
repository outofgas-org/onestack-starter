# Onestack API

Standalone Hono backend for the Onestack Starter workspace.

## Stack

- Hono
- Bun runtime
- Prisma
- PostgreSQL adapter
- Zod OpenAPI
- Scalar API reference
- Biome

## Development

Install dependencies from the repository root:

```sh
bun install
```

Run only the API app from the root:

```sh
bun run dev:api
```

Or from this directory:

```sh
bun run dev
```

The API currently runs on [http://localhost:5201](http://localhost:5201) unless
`PORT` is set.

## Environment

Copy the example file and fill in local values:

```sh
cp .env.example .env
```

Available variables:

```txt
DATABASE_URL=
PORT=
```

## API Docs

When the API server is running:

```sh
http://localhost:5201/docs/ui
http://localhost:5201/docs
```

## Scripts

Run from `apps/api`:

```sh
bun run dev
bun run start
bun run prisma:generate
bun run typecheck
bun run lint
bun run lint:fix
bun run format
bun run check
bun run generate:version
```

Run from the repository root:

```sh
bun run dev:api
bun run api:typecheck
bun run api:check
bun run prisma:generate
```

## Project Notes

- Keep Hono as a standalone backend app.
- Keep Prisma and database code backend-only.
- Validate incoming API input at the backend boundary.
- Prefer service modules under `apps/api/src` for business logic instead of
  placing everything directly in route handlers.
- Use `packages/shared` only for TypeScript that is safe in both frontend and
  backend environments.

## Deployment

Deploy this directory as the Hono backend. Common targets include Docker, Fly.io,
Railway, Render, a VPS, or a Workers-compatible runtime if the app is adapted for
that environment.
