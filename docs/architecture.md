# Architecture

```
browser  wizard-ui
   │
   ├─ Navbar          wallet (ConnectKit / wagmi) + links to API & contracts repos
   ├─ FileUpload      POST NEXT_PUBLIC_API_URL/analyze
   ├─ /               landing + analyzer
   └─ /docs           documentation hub (links out to GitHub markdown)
              │
              ▼
         wizard-api
              │
              ▼
     FUNDING.json + splitsProposal
              │
              ▼
     wizard-contracts (later: writeContract)
```

## Important files

| Path | Role |
| --- | --- |
| `src/lib/api.ts` | Typed client for wizard-api. **Keep in sync** with [docs/api.md](https://github.com/Drip-Forge/wizard-api/blob/main/docs/api.md) |
| `src/lib/constants.ts` | API URL and canonical GitHub URLs for the three repos |
| `src/components/FileUpload.tsx` | Analyzer, owner override, wallet stamp, splits table |
| `src/context/Web3Provider.tsx` | wagmi + ConnectKit (mainnet, OP, Sepolia) |
| `src/app/docs/page.tsx` | In-app docs that deep-link into all three `docs/` trees |

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | wizard-api origin |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | public example id | Replace for production |

If the API is down, `analyzePackageJson` throws a message that tells the operator to start wizard-api — that was a scaffold footgun (hard-coded URL + no POST route).

## Related docs

- [Getting started](getting-started.md)
- [wizard-api architecture](https://github.com/Drip-Forge/wizard-api/blob/main/docs/architecture.md)
- [wizard-contracts architecture](https://github.com/Drip-Forge/wizard-contracts/blob/main/docs/architecture.md)
