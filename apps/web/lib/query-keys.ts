export const queryKeys = {
  polymarket: {
    all: ["polymarket"] as const,
    userPositions: (minRealizedPnl: number) =>
      [...queryKeys.polymarket.all, "userPositions", minRealizedPnl] as const
  }
};
