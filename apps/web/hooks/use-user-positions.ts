"use client";

import { useQuery } from "@tanstack/react-query";
import { PolymarketUserPositionsDocument, type PolymarketUserPositionsQuery } from "@/graphql/generated/graphql";
import { fetchGraphQL } from "@/lib/graphql-client";
import { queryKeys } from "@/lib/query-keys";

export const DEFAULT_MIN_REALIZED_PNL = 10_000_000;

interface UseUserPositionsOptions {
  minRealizedPnl?: number;
}

export function useUserPositions(options: UseUserPositionsOptions = {}) {
  const minRealizedPnl = options.minRealizedPnl ?? DEFAULT_MIN_REALIZED_PNL;

  return useQuery<PolymarketUserPositionsQuery>({
    queryKey: queryKeys.polymarket.userPositions(minRealizedPnl),
    queryFn: () => fetchGraphQL(PolymarketUserPositionsDocument, { minRealizedPnl }),
    refetchInterval: 10000
  });
}
