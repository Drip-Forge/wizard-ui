# wizard-ui

Next.js 15 dashboard for **DripForge Wizard**. Maintainers paste a `package.json`, optionally connect a wallet, and download a Drips [`FUNDING.json`](https://docs.drips.network/get-support/claim-your-repository/) plus a suggested dependency-splits table.

This repository is one of three. Read them together:

| Layer | Repository | What it does |
| --- | --- | --- |
| UI | **wizard-ui** (this repo) | Analyzer UI, wallet, in-app docs |
| API | [wizard-api](https://github.com/Drip-Forge/wizard-api) | `POST /analyze` — validation and splits proposal |
| Chain | [wizard-contracts](https://github.com/Drip-Forge/wizard-contracts) | On-chain `SplitsLib` / `DependencySplits` |

**Docs in this repo**

- [Documentation index](docs/README.md)
- [Getting started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- In-app hub: `/docs` once the app is running
- [Contributing](CONTRIBUTING.md)

Sibling docs: [wizard-api HTTP reference](https://github.com/Drip-Forge/wizard-api/blob/main/docs/api.md) · [wizard-contracts integration](https://github.com/Drip-Forge/wizard-contracts/blob/main/docs/integration.md)

## Quick start

You need **wizard-api** running on port 3001 (or set `NEXT_PUBLIC_API_URL`).

```bash
# terminal 1
cd wizard-api && npm install && npm run dev

# terminal 2
cd wizard-ui
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## What the analyzer produces

- **`FUNDING.json`** — `{ "drips": { "ethereum": { "ownedBy": "0x…" } } }` to commit on your default branch, then [claim on Drips](https://docs.drips.network/get-support/claim-your-repository/)
- **Splits proposal** — 80% owner / 20% equal pool across production dependencies, weights out of 1,000,000, ready for [DependencySplits](https://github.com/Drip-Forge/wizard-contracts/blob/main/docs/contracts.md)

Connect a wallet and click **Wallet** to stamp the connected address as `ownedBy`.

## Claiming this repo on Drips

Replace the zero address in [`FUNDING.json`](FUNDING.json) with the maintainer wallet before claiming.

## License

[MIT](LICENSE) © Drip-Forge
