export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const REPOS = {
  ui: "https://github.com/Drip-Forge/wizard-ui",
  api: "https://github.com/Drip-Forge/wizard-api",
  contracts: "https://github.com/Drip-Forge/wizard-contracts"
} as const;

export const DRIPS_CLAIM_DOCS = "https://docs.drips.network/get-support/claim-your-repository/";
export const DRIPS_PROTOCOL_DOCS = "https://docs.drips.network/the-protocol/overview/";
export const DRIPS_APP = "https://drips.network";
