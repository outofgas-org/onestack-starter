import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/pnl-subgraph/0.0.14/gn",
  documents: ["graphql/queries/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "graphql/generated/": {
      preset: "client"
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
