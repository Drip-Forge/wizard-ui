"use client";

import { ConnectKitButton } from "connectkit";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { REPOS } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary p-2 text-white shadow-glass-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Wizard{" "}
            <span className="text-secondary font-medium text-sm border border-secondary/25 px-2 py-0.5 rounded-full ml-1 bg-secondary/5">
              DripForge
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/#analyze" className="hover:text-white transition-colors">
            Analyzer
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors">
            Documentation
          </Link>
          <a href={REPOS.contracts} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            Contracts
          </a>
          <a href={REPOS.api} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            API
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <ConnectKitButton />
        </div>
      </div>
    </header>
  );
}
