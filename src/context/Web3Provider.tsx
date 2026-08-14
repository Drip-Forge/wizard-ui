"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "3fcc6b5f18b1a37c95e1e07b8fa38c82";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, optimism, sepolia],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
      [sepolia.id]: http()
    },
    walletConnectProjectId,
    appName: "Wizard DripForge",
    appDescription: "Generate Drips FUNDING.json manifests and dependency splits",
    appUrl: "https://github.com/Drip-Forge/wizard-ui",
    appIcon: "https://drips.network/favicon.ico"
  })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
