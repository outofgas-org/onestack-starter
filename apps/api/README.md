## Use This Template

Clone the repository:

```sh
git clone git@github.com:outofgas-build/hono-starter.git my-app
cd my-app
```

If you want to start fresh with your own git history:

```sh
rm -rf .git
git init
```

Install dependencies:

```sh
bun install
```

Run locally:

```sh
bun run dev
```

Open [http://localhost:5201](http://localhost:5201)

OpenAPI:

```sh
http://localhost:5201/docs/ui
http://localhost:5201/docs
```

Code quality workflow:

```sh
bun run lint
bun run lint:fix
bun run format
bun run check
```

`pre-commit` runs `bun run check`, so Biome and TypeScript are validated before each commit.
