"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  Database,
  RefreshCw,
  Trophy,
  Wallet
} from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEFAULT_MIN_REALIZED_PNL,
  useUserPositions
} from "@/hooks/use-user-positions";
import type { PolymarketUserPositionsQuery } from "@/graphql/generated/graphql";

type UserPositionRow = PolymarketUserPositionsQuery["userPositions"][number];

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatNumberish(value: unknown) {
  return String(value);
}

function formatMetric(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

function toNumeric(value: unknown) {
  const parsed = Number(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

const columns: ColumnDef<UserPositionRow>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{formatAddress(row.original.user)}</p>
        <p className="text-muted-foreground">{row.original.user}</p>
      </div>
    )
  },
  {
    accessorKey: "tokenId",
    header: "Token ID",
    cell: ({ row }) => (
      <span className="block max-w-[180px] truncate">
        {formatNumberish(row.original.tokenId)}
      </span>
    )
  },
  {
    accessorKey: "realizedPnl",
    header: "Realized PnL",
    cell: ({ row }) => formatNumberish(row.original.realizedPnl)
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatNumberish(row.original.amount)
  },
  {
    accessorKey: "avgPrice",
    header: "Avg Price",
    cell: ({ row }) => formatNumberish(row.original.avgPrice)
  },
  {
    accessorKey: "totalBought",
    header: "Total Bought",
    cell: ({ row }) => formatNumberish(row.original.totalBought)
  }
];

export default function Home() {
  const { login } = usePrivy();

  const { data, isLoading, isFetching, refetch, error } = useUserPositions({
    minRealizedPnl: DEFAULT_MIN_REALIZED_PNL
  });
  const positions = data?.userPositions ?? [];
  const totalRealizedPnl = positions.reduce(
    (sum, position) => sum + toNumeric(position.realizedPnl),
    0
  );
  const totalAmount = positions.reduce(
    (sum, position) => sum + toNumeric(position.amount),
    0
  );
  const uniqueUsers = new Set(positions.map((position) => position.user)).size;
  const topPosition = positions[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(210,240,227,0.95),_transparent_28%),radial-gradient(circle_at_85%_15%,_rgba(255,210,148,0.45),_transparent_24%),linear-gradient(180deg,_#fffdf8_0%,_#f4f7f0_52%,_#eef2ea_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(135deg,rgba(14,50,38,0.08),transparent_62%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-14 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-black/5 bg-white/70 px-5 py-3 shadow-[0_10px_40px_rgba(20,33,23,0.06)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-950 text-white shadow-lg shadow-emerald-950/20">
              <Database className="size-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-900/55">
                Polymarket Monitor
              </p>
              <h1 className="text-sm font-semibold text-emerald-950">
                Positions Intelligence
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => toast.success("System is live")}>
              Status
            </Button>
            <Button variant="outline" onClick={login}>
              <Wallet className="size-4" />
              Login
            </Button>
            <Button
              className="bg-emerald-950 text-white hover:bg-emerald-900"
              disabled={isFetching}
              onClick={() => refetch()}
            >
              {isFetching ? <Spinner /> : <RefreshCw className="size-4" />}
              Refetch
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,rgba(17,52,42,0.96),rgba(28,80,63,0.9)_52%,rgba(241,171,84,0.84)_140%)] p-8 text-white shadow-[0_24px_80px_rgba(16,43,35,0.22)]">
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-8 -translate-y-8 rounded-full border border-white/15" />
            <div className="absolute bottom-0 right-10 h-28 w-28 rounded-full bg-white/8 blur-2xl" />

            <div className="relative max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/75">
                <ArrowUpRight className="size-3.5" />
                Live subgraph snapshot
              </div>

              <div className="space-y-3">
                <p className="max-w-xl text-sm leading-6 text-white/72">
                  A cleaner front page for watching profitable positions, comparing wallet behavior,
                  and jumping straight into the highest-realized PnL accounts.
                </p>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  A trading home that feels closer to an ops console than a starter template.
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/72">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Threshold {DEFAULT_MIN_REALIZED_PNL.toLocaleString()}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {isLoading ? "Syncing positions" : `${positions.length} loaded`}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {uniqueUsers} unique wallets
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-5 shadow-[0_18px_60px_rgba(19,32,25,0.08)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Realized PnL
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                    {isLoading ? "--" : formatMetric(totalRealizedPnl)}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-100 p-3 text-emerald-900">
                  <Trophy className="size-4" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Aggregate realized PnL across the loaded winner cohort.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-black/5 bg-[#fff7ed]/85 p-5 shadow-[0_18px_60px_rgba(19,32,25,0.06)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-900/55">
                    Position Flow
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-amber-950">
                    {isLoading ? "--" : formatMetric(totalAmount)}
                  </p>
                </div>
                <div className="rounded-full bg-amber-200/70 p-3 text-amber-950">
                  <RefreshCw className="size-4" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-amber-950/60">
                Total amount represented by the rows currently on screen.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-black/5 bg-white/75 p-5 shadow-[0_14px_50px_rgba(19,32,25,0.05)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Leader
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {topPosition ? formatAddress(topPosition.user) : "--"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Highest realized PnL wallet in the current table.
                </p>
              </div>
              <p className="text-lg font-medium text-emerald-900">
                {topPosition ? formatNumberish(topPosition.realizedPnl) : "--"}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-black/5 bg-white/75 p-5 shadow-[0_14px_50px_rgba(19,32,25,0.05)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Wallet Count
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{uniqueUsers}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Distinct accounts represented by the filtered dataset.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-black/5 bg-white/75 p-5 shadow-[0_14px_50px_rgba(19,32,25,0.05)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Table Health
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {error ? "Issue" : isFetching ? "Syncing" : "Ready"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {error
                ? "The subgraph returned an error. Check network or query inputs."
                : "Live-refreshing every 10 seconds through React Query."}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/5 bg-white/82 p-6 shadow-[0_24px_80px_rgba(19,32,25,0.08)] backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                User Positions
              </p>
              <h3 className="text-2xl font-semibold tracking-tight">
                Live PnL table
              </h3>
              <p className="text-sm text-muted-foreground">
                Sorted by realized PnL with the current subgraph threshold applied.
              </p>
            </div>
            <div className="rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground">
              {isLoading ? "Loading positions" : `${positions.length} rows in table`}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-16 rounded-2xl bg-foreground/5"
                />
              ))}
            </div>
          ) : error ? (
            <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
              {error.message}
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-border bg-background/80">
              <DataTable
                columns={columns}
                data={positions}
                defaultSort={[{ id: "realizedPnl", desc: true }]}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
