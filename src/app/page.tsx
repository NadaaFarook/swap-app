"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SwapInterface from "./components/TokenSwap";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SwapInterface />
      </QueryClientProvider>
    </>
  );
}
