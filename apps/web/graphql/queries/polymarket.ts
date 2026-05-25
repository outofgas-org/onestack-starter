import { graphql } from "../generated";

export const POLYMARKET_USER_POSITIONS = graphql(`
  query PolymarketUserPositions($minRealizedPnl: BigInt!) {
    userPositions(orderBy: realizedPnl, orderDirection: desc, where: { realizedPnl_gt: $minRealizedPnl }) {
      id
      realizedPnl
      tokenId
      totalBought
      user
      avgPrice
      amount
    }
  }
`);
