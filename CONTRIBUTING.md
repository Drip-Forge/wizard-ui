# Contributing to wizard-ui

This is the dashboard for DripForge Wizard. It depends on the HTTP contract of [wizard-api](https://github.com/Drip-Forge/wizard-api) and will eventually call [wizard-contracts](https://github.com/Drip-Forge/wizard-contracts). Read [docs/architecture.md](docs/architecture.md) first.

## Local setup

See [docs/getting-started.md](docs/getting-started.md). You almost always need wizard-api running.

```bash
npm install
npm run dev
npm run typecheck
```

## Drips Wave

Prepared for [Drips Wave](https://www.drips.network/solutions/wave):

1. Comment to claim an issue before you start.
2. Keep discussion on the GitHub issue / PR.
3. Branch from `main`.
4. For UI changes, include a screenshot or short clip. If you change `src/lib/api.ts`, update this repo's docs **and** confirm [wizard-api docs/api.md](https://github.com/Drip-Forge/wizard-api/blob/main/docs/api.md) still matches.
5. Do not commit `.env.local` or WalletConnect secrets.

`FUNDING.json` is a placeholder until a maintainer claims the project on Drips.

## Good first contributions

- Send `applyAnalyzedSplits` from the connected wallet (wagmi `writeContract`)
- Better empty / error states when CORS or API origin is wrong
- Support `includeDevDependencies` toggle
- Accessibility pass on the analyzer

## License

MIT, see [LICENSE](LICENSE).
