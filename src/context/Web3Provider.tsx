"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, optimism, sepolia],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
      [sepolia.id]: http(),
    },
    // WalletConnect Project ID (using standard fallback for dev)
    walletConnectProjectId: "3fcc6b5f18b1a37c95e1e07b8fa38c82", 

    appName: "Wizard DripForge",
    appDescription: "Automate Open Source Project Dependency Splits on Drips",
    appUrl: "https://dripforge.org",
    appIcon: "https://dripforge.org/logo.png",
  })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
