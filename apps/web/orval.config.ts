import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    input: {
      target: "https://petstore.swagger.io/v2/swagger.json"
    },
    output: {
      target: "./lib/api/generated/index.ts",
      schemas: "./lib/api/generated/model",
      client: "react-query",
      mode: "split",
      clean: true,
      override: {
        query: {
          useQuery: true,
          useSuspenseQuery: false,
          useMutation: true,
          useInfinite: true,
          usePrefetch: false,
          signal: true,
          version: 5
        }
      }
    }
  }
});
