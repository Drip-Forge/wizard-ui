"use client";

import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { Terminal, Shield, GitBranch, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DRIPS_CLAIM_DOCS, REPOS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
            Built for Drips Wave
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-none">
            Fund your dependencies.
            <br />
            Claim your project on Drips.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
            Wizard turns a Node <code className="text-zinc-200">package.json</code> into a Drips{" "}
            <code className="text-emerald-400">FUNDING.json</code> manifest and a suggested on-chain splits
            table — so maintainers can join the circular open-source funding graph in minutes.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="#analyze"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-glass-glow hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Analyze package.json
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/docs"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-300 font-semibold hover:bg-zinc-800/80 transition-all"
            >
              Read the docs
            </Link>
          </div>
        </section>

        <section id="analyze" className="space-y-6 pt-8 scroll-mt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Manifest generator</h2>
            <p className="text-sm text-zinc-400">
              Runs against{" "}
              <a href={REPOS.api} className="text-secondary hover:underline">
                wizard-api
              </a>{" "}
              on port 3001. Connect a wallet to stamp your address as the Drips owner.
            </p>
          </div>
          <FileUpload />
        </section>

        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Validated manifests</h3>
            <p className="text-sm text-zinc-400">
              <a href={REPOS.api} className="text-primary hover:underline">
                wizard-api
              </a>{" "}
              checks package.json with Zod and verifies the owner is a 20-byte Ethereum address before
              emitting FUNDING.json.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">On-chain splits</h3>
            <p className="text-sm text-zinc-400">
              Suggested weights follow Drips rules (1,000,000 total). Apply them with{" "}
              <a href={REPOS.contracts} className="text-secondary hover:underline">
                wizard-contracts
              </a>{" "}
              <code className="text-xs">DependencySplits</code>.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Claim on Drips</h3>
            <p className="text-sm text-zinc-400">
              Commit FUNDING.json on the default branch, then{" "}
              <a href={DRIPS_CLAIM_DOCS} className="text-accent hover:underline">
                claim the GitHub repo
              </a>{" "}
              so incoming streams can split to maintainers and dependencies.
            </p>
          </div>
        </section>

        <section id="docs" className="glass-panel rounded-3xl p-8 md:p-12 space-y-8 scroll-mt-20">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How the three repos fit together</h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Wizard is one product split across three repositories so the UI, API, and contracts can
              evolve independently — and so Drips Wave contributors can pick a stack they know.
            </p>
          </div>

          <div className="border-t border-zinc-800/80 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-md font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs text-primary font-bold">
                  1
                </span>
                wizard-ui
              </h4>
              <p className="text-zinc-400 text-sm pl-8">
                This app. Upload package.json, connect a wallet, download FUNDING.json.{" "}
                <Link href="/docs" className="text-primary hover:underline">
                  In-app docs
                </Link>
                .
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-md font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs text-secondary font-bold">
                  2
                </span>
                wizard-api
              </h4>
              <p className="text-zinc-400 text-sm pl-8">
                Fastify service that validates input and returns the manifest plus a splits proposal.{" "}
                <a href={`${REPOS.api}#readme`} className="text-secondary hover:underline">
                  API README
                </a>
                .
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-md font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs text-accent font-bold">
                  3
                </span>
                wizard-contracts
              </h4>
              <p className="text-zinc-400 text-sm pl-8">
                Foundry contracts that validate Drips receiver lists and apply them on-chain.{" "}
                <a href={`${REPOS.contracts}#readme`} className="text-accent hover:underline">
                  Contracts README
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600 bg-dark-900 space-y-2">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for the Drips ecosystem.
        </p>
        <p className="flex justify-center gap-4">
          <a href={REPOS.ui} className="hover:text-zinc-400">
            UI
          </a>
          <a href={REPOS.api} className="hover:text-zinc-400">
            API
          </a>
          <a href={REPOS.contracts} className="hover:text-zinc-400">
            Contracts
          </a>
        </p>
      </footer>
    </div>
  );
}
