"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import {
  Upload,
  FileCode,
  Check,
  Copy,
  Download,
  AlertTriangle,
  RefreshCw,
  Wallet
} from "lucide-react";
import { analyzePackageJson, type AnalyzeResponse } from "@/lib/api";

const SAMPLE = `{
  "name": "my-cool-package",
  "version": "1.0.0",
  "dependencies": {
    "ethers": "^6.0.0",
    "viem": "^2.21.0"
  },
  "drips": {
    "ethereum": {
      "ownedBy": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
    }
  }
}`;

export function FileUpload() {
  const { address, isConnected } = useAccount();
  const [fileContent, setFileContent] = useState<string>("");
  const [ownerOverride, setOwnerOverride] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [copied, setCopied] = useState<"manifest" | "proposal" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent((event.target?.result as string) ?? "");
      setError(null);
      setResult(null);
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!fileContent.trim()) {
      setError("Paste or upload a package.json file first.");
      return;
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(fileContent);
    } catch {
      setError("Invalid JSON. Check the syntax of your package.json.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzePackageJson(parsedJson, {
        ownedBy: ownerOverride.trim() || undefined
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected analysis error.");
    } finally {
      setLoading(false);
    }
  };

  const fundingJson = result ? { drips: result.drips } : null;

  const copyText = async (label: "manifest" | "proposal", value: unknown) => {
    await navigator.clipboard.writeText(JSON.stringify(value, null, 2));
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadFundingJson = () => {
    if (!fundingJson) return;
    const blob = new Blob([JSON.stringify(fundingJson, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "FUNDING.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[560px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Input package.json</h3>
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/40 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              Upload File
              <input type="file" accept=".json,application/json" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <textarea
            value={fileContent}
            onChange={(e) => {
              setFileContent(e.target.value);
              setError(null);
              setResult(null);
            }}
            placeholder={SAMPLE}
            className="w-full flex-1 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 font-mono text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-primary/50 resize-none overflow-y-auto"
          />

          <div className="mt-4 space-y-2">
            <label className="text-xs font-medium text-zinc-400">Owner address (optional override)</label>
            <div className="flex gap-2">
              <input
                value={ownerOverride}
                onChange={(e) => setOwnerOverride(e.target.value)}
                placeholder="0x… from package.json drips.ethereum.ownedBy"
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 font-mono text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-primary/50"
              />
              <button
                type="button"
                disabled={!isConnected || !address}
                onClick={() => setOwnerOverride(address ?? "")}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800/40 text-xs text-zinc-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                title={isConnected ? "Use connected wallet" : "Connect a wallet first"}
              >
                <Wallet className="h-3.5 w-3.5" />
                Wallet
              </button>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-glass-glow hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing package.json...
              </>
            ) : (
              <>
                <FileCode className="h-4 w-4" />
                Generate FUNDING.json
              </>
            )}
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[560px]">
          <h3 className="text-lg font-semibold text-white mb-4">Generated manifest</h3>

          {error && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border border-rose-900/25 bg-rose-950/10 rounded-xl text-center">
              <AlertTriangle className="h-10 w-10 text-rose-500 mb-3" />
              <p className="text-sm font-semibold text-rose-400 mb-1">Analysis failed</p>
              <p className="text-xs text-rose-400/80 max-w-sm">{error}</p>
            </div>
          )}

          {!error && !result && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border border-dashed border-zinc-800 rounded-xl text-center">
              <FileCode className="h-10 w-10 text-zinc-600 mb-3" />
              <p className="text-sm font-medium text-zinc-500 max-w-xs">
                Upload or paste package.json, then generate a Drips-compatible FUNDING.json.
              </p>
            </div>
          )}

          {!error && result && fundingJson && (
            <div className="flex-1 flex flex-col min-h-0">
              {result.warnings.length > 0 && (
                <div className="mb-3 p-3 rounded-lg border border-amber-900/40 bg-amber-950/20 text-xs text-amber-200">
                  {result.warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              )}

              <div className="flex-1 border border-zinc-800 bg-zinc-950/60 rounded-xl p-4 font-mono text-sm overflow-y-auto min-h-0">
                <div className="text-zinc-500 mb-2">// Commit this as FUNDING.json on your default branch</div>
                <pre className="text-emerald-400">{JSON.stringify(fundingJson, null, 2)}</pre>
              </div>

              {result._metadata && (
                <div className="mt-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 grid grid-cols-2 gap-2">
                  <div>
                    Project: <span className="text-white font-medium">{result._metadata.projectName}</span>
                  </div>
                  <div>
                    Deps: <span className="text-white font-medium">{result._metadata.dependenciesCount}</span>
                  </div>
                  <div>
                    Owner share:{" "}
                    <span className="text-white font-medium">
                      {(result.splitsProposal.ownerWeight / 10_000).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    Dependency pool:{" "}
                    <span className="text-white font-medium">
                      {(result.splitsProposal.dependencyPoolWeight / 10_000).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => copyText("manifest", fundingJson)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-sm font-medium text-zinc-200 transition-colors"
                >
                  {copied === "manifest" ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={downloadFundingJson}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary hover:bg-secondary-hover text-white text-sm font-medium transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && result.splitsProposal.dependencies.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Suggested Drips splits</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Equal share of a 20% dependency pool. Map each package to a Drips account ID, then submit the list to{" "}
                <code className="text-primary">DependencySplits.applyAnalyzedSplits</code>.
              </p>
            </div>
            <button
              onClick={() => copyText("proposal", result.splitsProposal)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-xs font-medium text-zinc-200"
            >
              {copied === "proposal" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              Copy proposal
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="text-left py-2 font-medium">Package</th>
                  <th className="text-left py-2 font-medium">Version</th>
                  <th className="text-right py-2 font-medium">Weight</th>
                  <th className="text-right py-2 font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {result.splitsProposal.dependencies.map((dep) => (
                  <tr key={dep.name} className="border-b border-zinc-800/80">
                    <td className="py-2 font-mono text-xs">{dep.name}</td>
                    <td className="py-2 font-mono text-xs text-zinc-500">{dep.version}</td>
                    <td className="py-2 text-right font-mono text-xs">{dep.suggestedWeight.toLocaleString()}</td>
                    <td className="py-2 text-right text-xs">
                      {(dep.suggestedWeight / 10_000).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
