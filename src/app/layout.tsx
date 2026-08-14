import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/context/Web3Provider";

export const metadata: Metadata = {
  title: "Wizard | DripForge",
  description: "Automate Open Source Project Dependency Splits on the Drips Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
