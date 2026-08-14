import { API_URL } from "./constants";

export type DripsManifest = {
  ethereum: {
    ownedBy: string;
  };
};

export type SplitsProposal = {
  totalWeight: number;
  ownerWeight: number;
  dependencyPoolWeight: number;
  leftoverWeight: number;
  dependencies: Array<{
    name: string;
    version: string;
    suggestedWeight: number;
  }>;
};

export type AnalyzeResponse = {
  drips: DripsManifest;
  _metadata: {
    projectName: string;
    version?: string;
    analyzedAt: string;
    dependenciesCount: number;
    devDependenciesCount: number;
    peerDependenciesCount: number;
  };
  splitsProposal: SplitsProposal;
  warnings: string[];
};

export type AnalyzeErrorBody = {
  error: string;
  details?: unknown;
};

export async function analyzePackageJson(
  packageJson: unknown,
  options: { ownedBy?: string } = {}
): Promise<AnalyzeResponse> {
  const url = new URL("/analyze", API_URL);
  if (options.ownedBy) {
    url.searchParams.set("ownedBy", options.ownedBy);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageJson)
    });
  } catch {
    throw new Error(
      `Cannot reach wizard-api at ${API_URL}. Start it with \`npm run dev\` in the wizard-api repo.`
    );
  }

  const data = (await response.json()) as AnalyzeResponse | AnalyzeErrorBody;
  if (!response.ok) {
    const message = "error" in data ? data.error : "Failed to analyze package.json";
    throw new Error(message);
  }

  return data as AnalyzeResponse;
}
