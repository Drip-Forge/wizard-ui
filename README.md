# wizard-ui

An interactive dashboard client built using **Next.js 15 (App Router)**, **Tailwind CSS**, and **Wagmi/ConnectKit** under the **DripForge** organization.

## Features

*   **Wallet Connection**: Uses ConnectKit to offer unified, web3-native onboarding across Ethereum, Optimism, and testnets.
*   **Static Manifest Analyzer**: An interactive upload and copy dashboard allowing developers to upload `package.json` configurations and generate Drips-compatible `FUNDING.json` schemas instantly.
*   **Rich Aesthetics**: Deep dark-mode gradients, interactive loading states, and sleek micro-animations tailoring visual elements for web3 users.

## Layout Structure

*   **`src/context/Web3Provider.tsx`**: Registers Wagmi Config, Viem RPC clients, and ConnectKit.
*   **`src/components/Navbar.tsx`**: Header containing app logo, navigation, and connection action.
*   **`src/components/FileUpload.tsx`**: Handles loading, errors, copying, downloading, and API communications with `wizard-api`.
*   **`src/app/page.tsx`**: Landing layout integrating visual items and educational materials.

## Development and Building

### Commands

*   **Install dependencies**:
    ```bash
    npm install
    ```
*   **Run local dev server (port 3000)**:
    ```bash
    npm run dev
    ```
*   **Build production files**:
    ```bash
    npm run build
    ```
*   **Start server**:
    ```bash
    npm run start
    ```
