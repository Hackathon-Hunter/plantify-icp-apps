"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface WalletGuardOptions {
  redirectTo?: string;
  showModal?: boolean;
  excludedPaths?: string[];
}

export const useWalletGuard = (options: WalletGuardOptions = {}) => {
  const {
    redirectTo = "/login",
    showModal = true,
    excludedPaths = [
      "/",
      "/login",
      "/register",
      "/register/founder",
      "/register/investor",
      "/terms",
      "/privacy",
      "/subscription-agreement",
    ],
  } = options;

  const { isAuthenticated, isLoading, principal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isProtectedRoute, setIsProtectedRoute] = useState(false);

  useEffect(() => {
    const isExcluded = excludedPaths.some((path) => {
      if (path === "/") return pathname === "/";
      return pathname.startsWith(path);
    });

    setIsProtectedRoute(!isExcluded);

    if (isLoading) return;

    if (isExcluded) {
      setShouldShowModal(false);
      return;
    }

    if (isAuthenticated && principal) {
      setShouldShowModal(false);
      return;
    }

    if (!isAuthenticated) {
      if (showModal) {
        setShouldShowModal(true);
      } else {
        router.push(redirectTo);
      }
      return;
    }

    if (isAuthenticated && !principal) {
      if (showModal) {
        setShouldShowModal(true);
      } else {
        router.push(redirectTo);
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    principal,
    pathname,
    redirectTo,
    showModal,
    excludedPaths,
    router,
  ]);

  const handleModalClose = () => {
    setShouldShowModal(false);
    router.push("/");
  };

  return {
    shouldShowModal,
    isLoading,
    isAuthenticated,
    hasWallet: !!principal,
    isProtectedRoute,
    handleModalClose,
  };
};
