"use client";

import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { Terminal, Shield, GitBranch, Heart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
            Drips OpenSource Wave 🌊
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-none">
            Fund your dependencies. <br />
            Automate on-chain splits.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
            Wizard scans your project configurations and scaffolds Drips-compatible funding manifests, aligning your open-source projects with the Drips circular software economy.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="#analyze"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-glass-glow hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Analyze package.json
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#docs"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-300 font-semibold hover:bg-zinc-800/80 transition-all"
            >
              Read Docs
            </a>
          </div>
        </section>

        {/* Interactive Analyzer */}
        <section id="analyze" className="space-y-6 pt-8 scroll-mt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Manifest Generator</h2>
            <p className="text-sm text-zinc-400">
              Drag-and-drop or paste your Node project package.json to construct your validated Drips funding layout.
            </p>
          </div>
          <FileUpload />
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Strict Verification</h3>
            <p className="text-sm text-zinc-400">
              Our Fastify API validates configuration payloads using Zod schemas to ensure your Drips profiles conform exactly to protocol requirements.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Foundry Scaffolding</h3>
            <p className="text-sm text-zinc-400">
              Scaffold EVM contracts automatically with our preconfigured Foundry framework, containing the abstract `FundingParser` architecture.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Circular Ecosystem</h3>
            <p className="text-sm text-zinc-400">
              Easily generate, download, and publish your project's `FUNDING.json` file to stream recursive splits to your underlying project dependencies.
            </p>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs" className="glass-panel rounded-3xl p-8 md:p-12 space-y-8 scroll-mt-20">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How Wizard Integrates with Drips</h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              The Drips Protocol operates on a simple, powerful concept: continuous financial streaming. Rather than one-off grants, projects configure continuous ERC-20 token streams (drips) and percentage splits.
            </p>
          </div>

          <div className="border-t border-zinc-800/80 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-md font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs text-primary font-bold">1</span>
                Declare Project Wallet
              </h4>
              <p className="text-zinc-400 text-sm pl-8">
                Place the generated <code className="text-emerald-400 font-mono text-xs">FUNDING.json</code> file in your repository's default branch on GitHub. This links your repository identity to your Ethereum address.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs text-secondary font-bold">2</span>
                Deploy Parser Smart Contract
              </h4>
              <p className="text-zinc-400 text-sm pl-8">
                Inherit the solidity <code className="text-primary font-mono text-xs">FundingParser</code> base contract. It automatically updates your project's splits on-chain with DripsHub by resolving dependencies.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600 bg-dark-900">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for the Drips Ecosystem.
        </p>
      </footer>
    </div>
  );
}
