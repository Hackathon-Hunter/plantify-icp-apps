"use client";

import React, { useState, useEffect } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import SubmitForReview from "./partial/SubmitForReview";
import FailedCampaign from "./partial/FailedCampaign";
import WalletWithdraw from "./partial/WalletWithdraw";
import ActivityFeed from "./partial/ActivityFeed";

import {
  BanknoteArrowUp,
  ChartPie,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";
import {
  getMyInvestmentSummaries,
  getMyInvestments,
  getMyInvestorProfile,
} from "@/service/api/plantifyService";
import {
  Investment,
  InvestmentSummary,
  Investor,
  _SERVICE,
} from "@/service/declarations/plantify-backend.did";
import { ActorSubclass } from "@dfinity/agent";
import { useRouter } from "next/navigation";

// Shimmer loading component
const ShimmerLoader = ({ className = "" }: { className?: string }) => (
  <div className={`animate-shimmer ${className}`}></div>
);

// Error component
const ErrorDisplay = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="bg-red-950/50 border border-red-700 rounded-lg p-6 text-center">
    <AlertCircle className="mx-auto text-red-400 mb-3" size={48} />
    <h3 className="text-red-300 text-lg font-semibold mb-2">
      Error Loading Data
    </h3>
    <p className="text-red-200 mb-4">{message}</p>
    <Button
      onClick={onRetry}
      iconLeft={<RefreshCw size={16} />}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      Try Again
    </Button>
  </div>
);

// Not registered component
const NotRegistered = () => {
  const router = useRouter();

  return (
    <div className="bg-yellow-950/50 border border-yellow-700 rounded-lg p-6 text-center">
      <AlertCircle className="mx-auto text-yellow-400 mb-3" size={48} />
      <h3 className="text-yellow-300 text-lg font-semibold mb-2">
        Investor Registration Required
      </h3>
      <p className="text-yellow-200 mb-4">
        You need to register as an investor to access the dashboard.
      </p>
      <Button
        onClick={() => router.push("/register/investor")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white"
      >
        Register as Investor
      </Button>
    </div>
  );
};

// Empty state component
const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="bg-neutral-800 rounded-lg p-8 text-center">
      <ChartPie className="mx-auto text-neutral-400 mb-4" size={64} />
      <h3 className="text-white text-xl font-semibold mb-2">
        No Investments Yet
      </h3>
      <p className="text-neutral-400 mb-6">
        Start building your portfolio by exploring startups and making your
        first investment.
      </p>
      <Button
        onClick={() => router.push("/investor/explore")}
        iconLeft={<BanknoteArrowUp size={16} />}
        className="bg-white text-black hover:bg-neutral-200"
      >
        Explore Startups
      </Button>
    </div>
  );
};

export default function DashboardInvestor() {
  const [activeTab, setActiveTab] = useState("Active Investments");
  const extraTabs = [
    "Active Investments",
    "Failed Startup",
    "Wallet Withdraw",
    "Activity Feed",
  ];
  const tabs = [...extraTabs];

  // Data states
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [investmentSummaries, setInvestmentSummaries] = useState<
    InvestmentSummary[]
  >([]);
  const [investorProfile, setInvestorProfile] = useState<Investor | null>(null);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  // Dashboard statistics
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [startupsBacked, setStartupsBacked] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [portfolioReturn, setPortfolioReturn] = useState<number>(0);

  const { actor, isAuthenticated } = useAuth();
  const router = useRouter();

  // Fetch all investment data
  const fetchInvestmentData = async () => {
    if (!actor || !isAuthenticated) {
      console.log("🔍 Dashboard: No actor or not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Dashboard: Fetching investment data...");

      // First check if user is registered as investor
      const profile = await getMyInvestorProfile(
        actor as ActorSubclass<_SERVICE>
      );
      console.log("🔍 Dashboard: Investor profile:", profile);

      if (!profile) {
        console.log("🔍 Dashboard: No investor profile found");
        setIsRegistered(false);
        setIsLoading(false);
        return;
      }

      setInvestorProfile(profile);
      setIsRegistered(true);

      // Fetch investment data in parallel
      const [summariesData, investmentsData] = await Promise.all([
        getMyInvestmentSummaries(actor as ActorSubclass<_SERVICE>),
        getMyInvestments(actor as ActorSubclass<_SERVICE>),
      ]);

      console.log("🔍 Dashboard: Investment summaries:", summariesData);
      console.log("🔍 Dashboard: Investments:", investmentsData);

      setInvestmentSummaries(summariesData);
      setInvestments(investmentsData);

      // Calculate dashboard statistics
      if (summariesData.length > 0) {
        console.log("🔍 Dashboard: Calculating statistics...");

        // Total invested (sum of all investment amounts)
        const total = summariesData.reduce(
          (acc, investment) => acc + Number(investment.amount),
          0
        );
        const totalInvestedICP = total / 100_000_000; // Convert from e8s to ICP
        setTotalInvested(totalInvestedICP);

        // Count of unique projects invested in
        const uniqueProjects = new Set(
          summariesData.map((s) => s.projectTitle)
        );
        setStartupsBacked(uniqueProjects.size);

        // Calculate portfolio value (current value if available, otherwise use amount)
        const currentValue = summariesData.reduce(
          (acc, investment) =>
            acc + Number(investment.currentValue?.[0] || investment.amount),
          0
        );
        const portfolioValueICP = currentValue / 100_000_000; // Convert from e8s to ICP
        setPortfolioValue(portfolioValueICP);

        // Calculate return percentage
        if (total > 0) {
          const returnPercentage = ((currentValue - total) / total) * 100;
          setPortfolioReturn(returnPercentage);
        }

        console.log("🔍 Dashboard: Statistics calculated:", {
          totalInvestedICP,
          startupsBacked: uniqueProjects.size,
          portfolioValueICP,
          returnPercentage: portfolioReturn,
        });
      } else {
        console.log("🔍 Dashboard: No investment summaries found");
        // Reset stats if no investments
        setTotalInvested(0);
        setStartupsBacked(0);
        setPortfolioValue(0);
        setPortfolioReturn(0);
      }
    } catch (err) {
      console.error("🔍 Dashboard: Error fetching investment data:", err);
      setError("Failed to load investment data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (isAuthenticated && actor) {
      fetchInvestmentData();
    } else if (isAuthenticated === false) {
      // User is not authenticated, redirect to login
      router.push("/login");
    }
  }, [actor, isAuthenticated, router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Retry function for error state
  const handleRetry = () => {
    fetchInvestmentData();
  };

  // Shimmer loading for dashboard stats
  const renderShimmerStats = () => (
    <div className="flex flex-col gap-4 md:flex-row">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-neutral-800 p-4 flex justify-between w-full rounded-lg"
        >
          <div className="flex flex-col gap-3 w-full">
            <ShimmerLoader className="h-6 w-32 rounded" />
            <ShimmerLoader className="h-8 w-24 rounded" />
            <ShimmerLoader className="h-4 w-40 rounded" />
          </div>
          <div>
            <ShimmerLoader className="h-6 w-6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  // Shimmer loading for activity feed
  const renderShimmerActivity = () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <ShimmerLoader className="h-7 w-40 rounded" />
        <ShimmerLoader className="h-4 w-32 rounded" />
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-neutral-800 p-4 flex justify-between rounded-lg"
        >
          <div className="flex gap-3 items-center">
            <ShimmerLoader className="h-5 w-5 rounded-full" />
            <div className="flex flex-col gap-2">
              <ShimmerLoader className="h-6 w-48 rounded" />
              <ShimmerLoader className="h-4 w-36 rounded" />
            </div>
          </div>
          <ShimmerLoader className="h-6 w-20 rounded" />
        </div>
      ))}
    </div>
  );

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 mx-auto max-w-6xl">
          <div className="flex justify-center items-center py-16">
            <div className="text-white">Checking authentication...</div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 mx-auto max-w-6xl">
        <Breadcrumbs segments={[{ label: "Back to Home" }]} />

        <div className="flex flex-col gap-2">
          <h2 className="text-white text-4xl">Investor Dashboard</h2>
          <span className="text-neutral-500">
            Track and manage your startup investments
          </span>
          {investorProfile && (
            <span className="text-neutral-400 text-sm">
              Welcome back, {investorProfile.fullName}
            </span>
          )}
        </div>

        {/* Check if user is registered */}
        {isRegistered === false ? (
          <NotRegistered />
        ) : isLoading ? (
          <>
            {renderShimmerStats()}
            <div className="border-t border-dashed border-gray-700 my-4"></div>
            <div className="animate-pulse">
              <div className="h-10 bg-neutral-800 rounded w-full max-w-md mb-6"></div>
            </div>
            {renderShimmerActivity()}
          </>
        ) : error ? (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        ) : investmentSummaries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Dashboard Statistics */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="bg-neutral-800 p-4 flex justify-between w-full rounded-lg">
                <div className="flex flex-col gap-3">
                  <span className="text-white text-xl">Total Invested</span>
                  <span className="text-white text-2xl font-bold">
                    ${totalInvested.toFixed(2)}
                  </span>
                  <span className="text-white text-sm">
                    Across {startupsBacked} project
                    {startupsBacked !== 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  <BanknoteArrowUp className="text-white" />
                </div>
              </div>

              <div className="bg-neutral-800 p-4 flex justify-between w-full rounded-lg">
                <div className="flex flex-col gap-3">
                  <span className="text-white text-xl">Startups Backed</span>
                  <span className="text-white text-2xl font-bold">
                    {startupsBacked}
                  </span>
                  <span className="text-white text-sm">
                    {investments.length} investment
                    {investments.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  <ChartPie className="text-white" />
                </div>
              </div>

              <div className="bg-neutral-800 p-4 flex justify-between w-full rounded-lg">
                <div className="flex flex-col gap-3">
                  <span className="text-white text-xl">Portfolio Value</span>
                  <span className="text-white text-2xl font-bold">
                    ${portfolioValue.toFixed(2)}
                  </span>
                  <span className="text-white text-sm">
                    <span
                      className={
                        portfolioReturn >= 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {portfolioReturn >= 0 ? "+" : ""}
                      {portfolioReturn.toFixed(1)}%
                    </span>{" "}
                    Total return
                  </span>
                </div>
                <div>
                  <TrendingUp className="text-white" />
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-700 my-4"></div>

            <Tabs
              tabs={tabs.map((c) => ({ label: c, value: c }))}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="mt-6">
              {activeTab === "Active Investments" && (
                <SubmitForReview
                  investments={investments}
                //   investmentSummaries={investmentSummaries}
                //   onRefresh={fetchInvestmentData}
                />
              )}

              {activeTab === "Failed Startup" && <FailedCampaign />}

              {activeTab === "Wallet Withdraw" && <WalletWithdraw />}

              {activeTab === "Activity Feed" && (
                <ActivityFeed
                  investments={investments}
                //   onRefresh={fetchInvestmentData}
                />
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
