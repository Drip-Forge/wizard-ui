# Getting started

Wizard is three repositories. Clone all of them (or work from the Drip-Forge org) and run API + UI together.

## 1. wizard-api

```bash
git clone https://github.com/Drip-Forge/wizard-api.git
cd wizard-api
npm install
npm run dev
```

Confirm `GET http://localhost:3001/health`. Details: [wizard-api README](https://github.com/Drip-Forge/wizard-api#readme) and [docs/api.md](https://github.com/Drip-Forge/wizard-api/blob/main/docs/api.md).

## 2. wizard-ui

```bash
git clone https://github.com/Drip-Forge/wizard-ui.git
cd wizard-ui
cp .env.example .env.local
npm install
npm run dev
```

`.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-cloud-walletconnect-id
```

Open http://localhost:3000 — paste a `package.json`, optionally connect a wallet, generate `FUNDING.json`.

## 3. wizard-contracts (optional for the dashboard)

Needed when you want to apply splits on-chain:

```bash
git clone https://github.com/Drip-Forge/wizard-contracts.git
cd wizard-contracts
npm install
forge test
```

See [wizard-contracts getting path](https://github.com/Drip-Forge/wizard-contracts/blob/main/docs/integration.md).

## Claim flow after generate

1. Download `FUNDING.json` (must not use the zero address)
2. Commit it on the GitHub repo's **default** branch
3. In the [Drips app](https://drips.network), Projects → Claim project
4. Configure maintainers and dependencies, or feed the UI's splits table into `DependencySplits`

Official steps: [Claim your open-source project](https://docs.drips.network/get-support/claim-your-repository/).
