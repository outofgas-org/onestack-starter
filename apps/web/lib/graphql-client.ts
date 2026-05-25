import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { subgraphUrl } from "@/config/subgraph";

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: Array<{
    message: string;
  }>;
}

export async function fetchGraphQL<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables
) {
  const response = await fetch(subgraphUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: print(document),
      variables
    })
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  if (!payload.data) {
    throw new Error("GraphQL request returned no data");
  }

  return payload.data;
}
