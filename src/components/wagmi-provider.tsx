"use client";
import { config } from "@/config";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

export function WagmiAppProvider(props: PropsWithChildren) {
  return <WagmiProvider config={config}>{props.children}</WagmiProvider>;
}
