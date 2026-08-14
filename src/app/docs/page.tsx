import { Navbar } from "@/components/Navbar";
import { DRIPS_APP, DRIPS_CLAIM_DOCS, DRIPS_PROTOCOL_DOCS, REPOS } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Documentation | Wizard DripForge",
  description: "How wizard-ui, wizard-api, and wizard-contracts work together on Drips."
};

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">DripForge Wizard</p>
          <h1 className="text-4xl font-extrabold text-white">Documentation</h1>
          <p className="text-zinc-400">
            Wizard is the maintainer toolkit for{" "}
            <a href={DRIPS_APP} className="text-secondary hover:underline">
              Drips
            </a>
            : generate a claim file, inspect dependency splits, and apply those splits on-chain. This
            page is the hub. Each repo also ships its own docs folder.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">The three repositories</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <p>
              <a href={REPOS.ui} className="text-white font-medium hover:underline">
                wizard-ui
              </a>{" "}
              — this Next.js app. Source:{" "}
              <Link href="/" className="text-primary hover:underline">
                analyzer
              </Link>
              , markdown docs in{" "}
              <a href={`${REPOS.ui}/blob/main/docs/architecture.md`} className="text-primary hover:underline">
                docs/architecture.md
              </a>
              .
            </p>
            <p>
              <a href={REPOS.api} className="text-white font-medium hover:underline">
                wizard-api
              </a>{" "}
              — Fastify + Zod analysis service. Start here for the HTTP contract:{" "}
              <a href={`${REPOS.api}/blob/main/docs/api.md`} className="text-secondary hover:underline">
                docs/api.md
              </a>
              .
            </p>
            <p>
              <a href={REPOS.contracts} className="text-white font-medium hover:underline">
                wizard-contracts
              </a>{" "}
              — Foundry contracts wrapping Drips splits rules.{" "}
              <a
                href={`${REPOS.contracts}/blob/main/docs/contracts.md`}
                className="text-accent hover:underline"
              >
                docs/contracts.md
              </a>
              .
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">End-to-end flow</h2>
          <ol className="list-decimal list-inside space-y-3 text-sm text-zinc-400">
            <li>
              Maintainer pastes <code className="text-zinc-200">package.json</code> into the analyzer
              (optionally stamps the connected wallet as <code className="text-zinc-200">ownedBy</code>
              ).
            </li>
            <li>
              wizard-ui POSTs to <code className="text-zinc-200">wizard-api /analyze</code>. The API
              returns a Drips <code className="text-emerald-400">FUNDING.json</code> body, warnings, and
              a splits proposal whose weights sum to at most 1,000,000.
            </li>
            <li>
              Maintainer commits <code className="text-emerald-400">FUNDING.json</code> to the
              repository default branch, then{" "}
              <a href={DRIPS_CLAIM_DOCS} className="text-secondary hover:underline">
                claims the project in the Drips app
              </a>
              . Lit Protocol proves the file on-chain.
            </li>
            <li>
              For a contract-owned Drips account, map each dependency to a Drips account ID and call{" "}
              <code className="text-primary">DependencySplits.applyAnalyzedSplits</code>. GitHub repo
              splits can also be set in the Drips UI after claiming — see{" "}
              <a href={DRIPS_PROTOCOL_DOCS} className="text-secondary hover:underline">
                protocol overview
              </a>
              .
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Local development</h2>
          <pre className="text-xs text-zinc-300 bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 overflow-x-auto">{`# terminal 1 — API
cd wizard-api && npm install && npm run dev

# terminal 2 — UI
cd wizard-ui && cp .env.example .env.local && npm install && npm run dev

# optional — contracts
cd wizard-contracts && npm install && forge test`}</pre>
          <p className="text-sm text-zinc-400">
            Point <code className="text-zinc-200">NEXT_PUBLIC_API_URL</code> at the API (default{" "}
            <code className="text-zinc-200">http://localhost:3001</code>). Full setup lives in{" "}
            <a href={`${REPOS.ui}/blob/main/docs/getting-started.md`} className="text-primary hover:underline">
              docs/getting-started.md
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Contributing (Drips Wave)</h2>
          <p className="text-sm text-zinc-400">
            Each repository has a <code className="text-zinc-200">CONTRIBUTING.md</code>. Claim an issue
            before starting, keep discussion public, and open a PR against{" "}
            <code className="text-zinc-200">main</code> from a feature branch. Good first surfaces: API
            tests, additional manifest formats (Cargo.toml, go.mod), and RepoDriver integration.
          </p>
        </section>
      </main>
    </div>
  );
}
