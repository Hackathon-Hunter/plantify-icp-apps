import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Suspense } from "react";
import WalletGuard from "@/components/guards/WalletGuard";
import { AuthProvider } from "@/hooks/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantify - Invest in the Future",
  description:
    "Unlock access to high-growth startups using blockchain-powered equity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster position="top-right" richColors />
          <Suspense>
            <WalletGuard>{children}</WalletGuard>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
