"use client";

import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { privyConfig } from "@/lib/privy";
import { Toaster } from "@/components/ui/sonner";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} config={privyConfig}>
        <Toaster position="top-center" closeButton />
        {children}
      </PrivyProvider>
    </QueryClientProvider>
  );
}
