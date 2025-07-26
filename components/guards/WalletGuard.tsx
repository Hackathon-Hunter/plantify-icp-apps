"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Wallet, AlertTriangle } from "lucide-react";
import InternetIdentityModal from "@/components/ui/InternetIdentityModal";
import { useAuth } from "@/hooks/useAuth";
import { useWalletGuard } from "@/hooks/useWalletGuard";

interface WalletGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  excludedPaths?: string[];
}

const WalletGuard: React.FC<WalletGuardProps> = ({
  children,
  fallback,
  excludedPaths,
}) => {
  const { login, isAuthenticated, principal } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    shouldShowModal,
    isLoading,
    hasWallet,
    isProtectedRoute,
    handleModalClose,
  } = useWalletGuard({ excludedPaths });

  useEffect(() => {
    if (isAuthenticated && principal && shouldShowModal) {
      setTimeout(() => {
        setIsLoggingIn(false);
      }, 500);
    }
  }, [isAuthenticated, principal, shouldShowModal]);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);

      await login();
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggingIn(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (isLoading && isProtectedRoute) {
    return (
      fallback || (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <span className="text-white">Checking authentication...</span>
          </div>
        </div>
      )
    );
  }

  if (!isProtectedRoute) {
    return <>{children}</>;
  }

  if (isAuthenticated && hasWallet) {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      <InternetIdentityModal
        isOpen={shouldShowModal}
        onClose={handleModalClose}
        title={
          !isAuthenticated
            ? "Connect Your Wallet"
            : "Wallet Connection Required"
        }
        subtitle={
          !isAuthenticated
            ? "You need to connect your Internet Identity to access this page"
            : "Your wallet connection seems to be lost. Please reconnect to continue."
        }
        features={[
          {
            icon: Wallet,
            text: "Secure wallet connection",
            iconColor: "text-white",
          },
          {
            icon: AlertTriangle,
            text: "Required for protected pages",
            iconColor: "text-yellow-400",
          },
        ]}
        buttons={[
          {
            text: isAuthenticated
              ? "Reconnect Wallet"
              : "Connect Internet Identity",
            onClick: handleLogin,
            variant: "primary" as const,
            icon: Wallet,
            disabled: isLoggingIn,
          },
          {
            text: "Go to Homepage",
            onClick: handleGoHome,
            variant: "secondary" as const,
            disabled: isLoggingIn,
          },
        ]}
        footerText="You need to connect your wallet to access protected features"
        footerLinks={[]}
        showFooter={true}
        howItWorksTitle="Why do I need to connect?"
        steps={[
          {
            title: "Security",
            description:
              "Your wallet connection ensures secure access to your account and investments",
          },
          {
            title: "Data Protection",
            description:
              "All your investment data and NFTs are tied to your wallet identity",
          },
          {
            title: "Transaction Safety",
            description:
              "Only you can authorize transactions from your connected wallet",
          },
        ]}
      />
    </>
  );
};

export default WalletGuard;
