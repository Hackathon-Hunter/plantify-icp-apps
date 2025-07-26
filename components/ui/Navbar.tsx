"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Wallet,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { getMyICPBalance } from "@/service/api/plantifyService";

const Navbar = ({
  onScrollExplore,
  onScrollHowItWorks,
  onScrollRaiseCapital,
  onScrollSecondaryMarket,
}: {
  onScrollExplore?: () => void;
  onScrollHowItWorks?: () => void;
  onScrollRaiseCapital?: () => void;
  onScrollSecondaryMarket?: () => void;
} = {}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [icpBalance, setIcpBalance] = useState<string>("0.00");
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { logout, isAuthenticated, principal, actor } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/home";

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (!actor || !isAuthenticated) return;

      setLoadingBalance(true);
      try {
        const balanceResult = await getMyICPBalance(actor);
        if ("ok" in balanceResult) {
          const balance = Number(balanceResult.ok) / 100_000_000;
          setIcpBalance(balance.toFixed(2));
        }
      } catch (error) {
        console.error("Failed to fetch ICP balance:", error);
        setIcpBalance("0.00");
      } finally {
        setLoadingBalance(false);
      }
    };

    if (isAuthenticated && actor) {
      fetchBalance();
    }
  }, [actor, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [])

  const formatPrincipal = (principalStr: string) => {
    if (principalStr.length <= 10) return principalStr;
    return `${principalStr.slice(0, 6)}...${principalStr.slice(-4)}`;
  };

  const copyPrincipal = async () => {
    if (principal) {
      try {
        await navigator.clipboard.writeText(principal.toString());
      } catch (error) {
        console.error("Failed to copy principal:", error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <nav className="p-4 bg-transparent absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo skeleton */}
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-8 h-8 bg-neutral-700 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-neutral-600 rounded"></div>
              </div>
              <div className="h-6 bg-neutral-700 rounded w-20"></div>
            </div>

            {/* Navigation Links skeleton - Only show on homepage */}
            {isHomePage && (
              <div className="hidden md:flex items-center space-x-8 animate-pulse">
                <div className="h-4 bg-neutral-700 rounded w-16"></div>
                <div className="h-4 bg-neutral-700 rounded w-20"></div>
                <div className="h-4 bg-neutral-700 rounded w-24"></div>
                <div className="h-4 bg-neutral-700 rounded w-28"></div>
              </div>
            )}

            {/* Right side skeleton */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                /* Authenticated user skeleton */
                <div className="animate-pulse">
                  <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg">
                    <div className="w-4 h-4 bg-neutral-600 rounded"></div>
                    <div className="h-4 bg-neutral-600 rounded w-16"></div>
                    <div className="w-3 h-3 bg-neutral-600 rounded"></div>
                  </div>
                </div>
              ) : (
                /* Sign in button skeleton */
                <div className="animate-pulse">
                  <div className="h-10 bg-neutral-700 rounded w-24"></div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button skeleton */}
            <div className="md:hidden animate-pulse">
              <div className="w-10 h-10 bg-neutral-700 rounded border"></div>
            </div>
          </div>

          {/* Mobile Menu skeleton - Only show when mobile menu is open */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 bg-black p-4 animate-pulse">
              <div className="flex flex-col space-y-4 mt-4">
                {!isAuthenticated && (
                  <>
                    <div className="h-4 bg-neutral-700 rounded w-16"></div>
                    <div className="h-4 bg-neutral-700 rounded w-20"></div>
                    <div className="h-4 bg-neutral-700 rounded w-24"></div>
                    <div className="h-4 bg-neutral-700 rounded w-28"></div>
                  </>
                )}

                <div className="flex flex-col gap-2 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {/* Mobile Profile Info skeleton */}
                      <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="h-4 bg-neutral-700 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-neutral-600 rounded w-full mb-1"></div>
                        <div className="h-3 bg-neutral-600 rounded w-3/4 mb-2"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-neutral-600 rounded"></div>
                          <div className="h-3 bg-neutral-600 rounded w-16"></div>
                        </div>
                      </div>

                      {/* Mobile Action buttons skeleton */}
                      <div className="h-10 bg-neutral-700 rounded w-full"></div>
                      <div className="h-10 bg-neutral-700 rounded w-full"></div>
                      <div className="h-10 bg-red-800 rounded w-full"></div>
                    </div>
                  ) : (
                    <div className="h-10 bg-neutral-700 rounded w-full"></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav className="p-4 bg-transparent absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <Logo />
              </div>
              <span className="text-xl font-bold">PLANTIFY</span>
            </div>

            {/* Navigation Links - Hidden when authenticated */}
            {isHomePage && (
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={onScrollExplore} className="text-white hover:text-gray-500 bg-transparent border-none outline-none cursor-pointer">Explore</button>
                <button onClick={onScrollHowItWorks} className="text-white hover:text-gray-500 bg-transparent border-none outline-none cursor-pointer">How it Works</button>
                <button onClick={onScrollRaiseCapital} className="text-white hover:text-gray-500 bg-transparent border-none outline-none cursor-pointer">Raise Capital</button>
                <button onClick={onScrollSecondaryMarket} className="text-white hover:text-gray-500 bg-transparent border-none outline-none cursor-pointer">Secondary Market</button>
              </div>
            )}

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <User size={16} />
                    <span className="text-sm">
                      {principal
                        ? formatPrincipal(principal.toString())
                        : "Profile"}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${profileDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-50">
                      <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-700">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">Connected</div>
                            <div className="text-neutral-400 text-sm">
                              Internet Identity
                            </div>
                          </div>
                        </div>

                        {/* Principal ID */}
                        <div className="mb-4">
                          <div className="text-neutral-400 text-xs mb-1">
                            Principal ID
                          </div>
                          <div
                            className="bg-neutral-800 rounded-md p-2 text-white text-sm font-mono cursor-pointer hover:bg-neutral-700 transition-colors"
                            onClick={copyPrincipal}
                            title="Click to copy"
                          >
                            {principal ? principal.toString() : "Loading..."}
                          </div>
                        </div>

                        {/* ICP Balance */}
                        <div className="mb-4">
                          <div className="text-neutral-400 text-xs mb-1">
                            ICP Balance
                          </div>
                          <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                            <Wallet size={16} className="text-blue-400" />
                            <span className="text-white font-medium">
                              {loadingBalance ? "Loading..." : `${icpBalance} ICP`}
                            </span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2 mb-4">
                          <button
                            onClick={() =>
                              (window.location.href = "/investor/dashboard")
                            }
                            className="w-full text-left px-3 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors text-sm"
                          >
                            Dashboard
                          </button>
                          <button
                            onClick={() =>
                              (window.location.href = "/investor/explore")
                            }
                            className="w-full text-left px-3 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors text-sm"
                          >
                            Explore Startups
                          </button>
                        </div>

                        {/* Logout Button */}
                        <div className="pt-3 border-t border-neutral-700">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors text-sm"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  iconLeft={<LogIn />}
                  variant="outline"
                  className="border-white text-white hover:bg-gray-500"
                  onClick={navigateToLogin}
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden border-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 bg-black p-4">
              <div className="flex flex-col space-y-4 mt-4">
                {!isAuthenticated && (
                  <>
                    <button onClick={onScrollExplore} className="text-white text-left bg-transparent border-none outline-none cursor-pointer">Explore</button>
                    <button onClick={onScrollHowItWorks} className="text-white text-left bg-transparent border-none outline-none cursor-pointer">How it Works</button>
                    <button onClick={onScrollRaiseCapital} className="text-white text-left bg-transparent border-none outline-none cursor-pointer">Raise Capital</button>
                    <button onClick={onScrollSecondaryMarket} className="text-white text-left bg-transparent border-none outline-none cursor-pointer">Secondary Market</button>
                  </>
                )}

                <div className="flex flex-col gap-2 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {/* Mobile Profile Info */}
                      <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="text-white text-sm mb-2">Principal ID</div>
                        <div className="text-neutral-300 text-xs font-mono break-all">
                          {principal ? principal.toString() : "Loading..."}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Wallet size={14} className="text-blue-400" />
                          <span className="text-white text-sm">
                            {loadingBalance ? "Loading..." : `${icpBalance} ICP`}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <Button
                        variant="outline"
                        className="border-white text-white w-full"
                        onClick={() =>
                          (window.location.href = "/investor/dashboard")
                        }
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white text-white w-full"
                        onClick={() => (window.location.href = "/investor/explore")}
                      >
                        Explore Startups
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-400 text-red-400 w-full"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-white text-white"
                      onClick={navigateToLogin}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
