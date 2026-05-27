# Onestack Web

Next.js frontend for the Onestack Starter workspace.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TanStack Query
- Apollo Client and GraphQL Code Generator
- Privy React Auth

## Development

Install dependencies from the repository root:

```sh
bun install
```

Run only the web app from the root:

```sh
bun run dev:web
```

Or from this directory:

```sh
bun run dev
```

The app currently runs on [http://localhost:7200](http://localhost:7200).

## Environment

Copy the example file and fill in local values:

```sh
cp .env.example .env
```

Available variables:

```txt
NEXT_PUBLIC_PRIVY_APP_ID=
API_BASE_URL=
```

Only expose variables to the browser when they are intentionally public.

## Scripts

Run from `apps/web`:

```sh
bun run dev
bun run build
bun run start
bun run lint
bun run codegen
```

Run from the repository root:

```sh
bun run dev:web
bun run build
bun run lint
bun run codegen
```

## Project Notes

- Keep this app focused on UI, routing, client state, and API consumption.
- Do not import implementation code from `apps/api`.
- Use `packages/shared` only for frontend-safe shared types, schemas, constants,
  and lightweight utilities.
- Keep generated API or GraphQL client output inside this app unless it becomes a
  true cross-app contract.

## Deployment

Deploy this directory as the Next.js frontend, commonly to Vercel or another
Next-compatible platform.
