"use client";

import { useState } from "react";
import { Upload, FileCode, Check, Copy, Download, AlertTriangle, RefreshCw } from "lucide-react";

export function FileUpload() {
  const [fileContent, setFileContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);
      setError(null);
      setResult(null);
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!fileContent.trim()) {
      setError("Please paste or upload a package.json file.");
      return;
    }

    let parsedJson: any;
    try {
      parsedJson = JSON.parse(fileContent);
    } catch (e) {
      setError("Invalid JSON format. Please check your syntax.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call Fastify api (localhost:3001)
      const res = await fetch("http://localhost:3001/analyze", {
        method: "POST", // Standard post works natively for body
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze package.json");
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result.drips, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFundingJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result.drips, null, 2)], {
      type: "application/json",
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
        {/* Input panel */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Input package.json</h3>
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/40 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              Upload File
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <textarea
            value={fileContent}
            onChange={(e) => {
              setFileContent(e.target.value);
              setError(null);
              setResult(null);
            }}
            placeholder='{
  "name": "my-cool-package",
  "version": "1.0.0",
  "dependencies": {
    "ethers": "^6.0.0"
  },
  "drips": {
    "ethereum": {
      "ownedBy": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
    }
  }
}'
            className="w-full flex-1 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 font-mono text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-primary/50 resize-none overflow-y-auto"
          />

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

        {/* Output Panel */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[500px]">
          <h3 className="text-lg font-semibold text-white mb-4">Generated Manifest</h3>

          {error && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border border-rose-900/25 bg-rose-950/10 rounded-xl text-center">
              <AlertTriangle className="h-10 w-10 text-rose-500 mb-3" />
              <p className="text-sm font-semibold text-rose-400 mb-1">Analysis Failed</p>
              <p className="text-xs text-rose-400/80 max-w-sm">{error}</p>
            </div>
          )}

          {!error && !result && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border border-dashed border-zinc-800 rounded-xl text-center">
              <FileCode className="h-10 w-10 text-zinc-600 mb-3" />
              <p className="text-sm font-medium text-zinc-500 max-w-xs">
                Upload or paste your configuration and click "Generate" to construct your Drips schema.
              </p>
            </div>
          )}

          {!error && result && (
            <div className="flex-1 flex flex-col h-full justify-between">
              <div className="w-full flex-1 border border-zinc-800 bg-zinc-950/60 rounded-xl p-4 font-mono text-sm overflow-y-auto">
                <div className="text-zinc-500 mb-2">// Copy this and save it as FUNDING.json in your repo root</div>
                <pre className="text-emerald-400">{JSON.stringify(result.drips, null, 2)}</pre>
              </div>

              {result._metadata && (
                <div className="mt-4 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 grid grid-cols-2 gap-2">
                  <div>Project: <span className="text-white font-medium">{result._metadata.projectName}</span></div>
                  <div>Analyzed: <span className="text-white font-medium">{new Date(result._metadata.analyzedAt).toLocaleTimeString()}</span></div>
                  <div>Dependencies: <span className="text-white font-medium">{result._metadata.dependenciesCount}</span></div>
                  <div>DevDependencies: <span className="text-white font-medium">{result._metadata.devDependenciesCount}</span></div>
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-sm font-medium text-zinc-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Drips Schema
                    </>
                  )}
                </button>
                <button
                  onClick={downloadFundingJson}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary hover:bg-secondary-hover text-white text-sm font-medium transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Config
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
