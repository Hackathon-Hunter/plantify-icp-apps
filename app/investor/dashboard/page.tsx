'use client'

import React, { useState, useEffect } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"

import SubmitForReview from "./partial/SubmitForReview";
import FailedCampaign from "./partial/FailedCampaign";
import WalletWithdraw from "./partial/WalletWithdraw";
import ActivityFeed from "./partial/ActivityFeed";

import {
    BanknoteArrowUp,
    ChartPie,
    TrendingUp
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getMyInvestmentSummaries, getMyInvestments } from "@/service/api/plantifyService";
import { Investment } from "@/service/declarations/plantify-backend.did";

// Shimmer loading component
const ShimmerLoader = ({ className = "" }: { className?: string }) => (
    <div className={`animate-shimmer ${className}`}></div>
);

export default function DashboardInvestor() {
    const [activeTab, setActiveTab] = useState("Submit for Review")
    const extraTabs = ["Submit for Review", "Failed Campaign", "Wallet Withdraw", "Activity Feed"]
    const tabs = [...extraTabs]
    
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Dashboard statistics
    const [totalInvested, setTotalInvested] = useState<number>(0);
    const [startupsBacked, setStartupsBacked] = useState<number>(0);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioReturn, setPortfolioReturn] = useState<number>(0);
    
    const { actor, isAuthenticated } = useAuth();
    
    useEffect(() => {
        const fetchInvestmentData = async () => {
            if (!actor || !isAuthenticated) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                // Fetch investment data
                const [summariesData, investmentsData] = await Promise.all([
                    getMyInvestmentSummaries(actor),
                    getMyInvestments(actor)
                ]);
                
                setInvestments(investmentsData);
                
                // Calculate dashboard statistics
                if (summariesData.length > 0) {
                    // Total invested (sum of all investment amounts)
                    const total = summariesData.reduce((acc, investment) => 
                        acc + Number(investment.amount), 0);
                    setTotalInvested(total / 100000000); // Convert from e8s to ICP
                    
                    // Count of unique projects invested in
                    const uniqueProjects = new Set(summariesData.map(s => s.projectTitle));
                    setStartupsBacked(uniqueProjects.size);
                    
                    // Calculate portfolio value (current value if available, otherwise use amount)
                    const currentValue = summariesData.reduce((acc, investment) => 
                        acc + Number(investment.currentValue?.[0] || investment.amount), 0);
                    setPortfolioValue(currentValue / 100000000); // Convert from e8s to ICP
                    
                    // Calculate return percentage
                    if (total > 0) {
                        const returnPercentage = ((currentValue - total) / total) * 100;
                        setPortfolioReturn(returnPercentage);
                    }
                }
            } catch (err) {
                console.error("Error fetching investment data:", err);
                setError("Failed to load investment data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchInvestmentData();
    }, [actor, isAuthenticated]);
    
    // Shimmer loading for dashboard stats
    const renderShimmerStats = () => (
        <div className="flex flex-col gap-4 md:flex-row">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-neutral-800 p-4 flex justify-between w-full">
                    <div className="flex flex-col gap-3 w-full">
                        <ShimmerLoader className="h-6 w-32 rounded" />
                        <ShimmerLoader className="h-8 w-24 rounded" />
                        <ShimmerLoader className="h-4 w-40 rounded" />
                    </div>
                    <div><ShimmerLoader className="h-6 w-6 rounded-full" /></div>
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
                <div key={i} className="bg-neutral-800 p-4 flex justify-between">
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
    
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs
                    segments={[
                        { label: "Back to Home" },
                    ]}
                />

                <div className="flex flex-col gap-2">
                    <h2 className="text-white text-4xl">Investor Dashboard</h2>
                    <span className="text-neutral-500">Track and manage your startup investments</span>
                </div>

                {isLoading ? (
                    <>
                        {renderShimmerStats()}
                        <div className="border-t border-dashed border-gray-700 my-4"></div>
                        <div className="animate-pulse">
                            <div className="h-10 bg-neutral-800 rounded w-full max-w-md mb-6"></div>
                        </div>
                        {renderShimmerActivity()}
                    </>
                ) : error ? (
                    <div className="text-red-500 text-center py-8">{error}</div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="bg-neutral-800 p-4 flex justify-between w-full">
                                <div className="flex flex-col gap-3">
                                    <span className="text-white text-xl">Total Invested</span>
                                    <span className="text-white text-2xl font-bold">{totalInvested.toFixed(2)} ICP</span>
                                    <span className="text-white text-sm">Across all campaigns</span>
                                </div>
                                <div><BanknoteArrowUp className="text-white" /></div>
                            </div>

                            <div className="bg-neutral-800 p-4 flex justify-between w-full">
                                <div className="flex flex-col gap-3">
                                    <span className="text-white text-xl">Startups Backed</span>
                                    <span className="text-white text-2xl font-bold">{startupsBacked}</span>
                                    <span className="text-white text-sm">Active investments</span>
                                </div>
                                <div><ChartPie className="text-white" /></div>
                            </div>

                            <div className="bg-neutral-800 p-4 flex justify-between w-full">
                                <div className="flex flex-col gap-3">
                                    <span className="text-white text-xl">Portfolio Value</span>
                                    <span className="text-white text-2xl font-bold">{portfolioValue.toFixed(2)} ICP</span>
                                    <span className="text-white text-sm">
                                        <span className={portfolioReturn >= 0 ? "text-green-500" : "text-red-500"}>
                                            {portfolioReturn >= 0 ? "+" : ""}{portfolioReturn.toFixed(0)}%
                                        </span> Total return
                                    </span>
                                </div>
                                <div><TrendingUp className="text-white" /></div>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-gray-700 my-4"></div>

                        <Tabs
                            tabs={tabs.map((c) => ({ label: c, value: c }))}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <div className="mt-6">
                            {activeTab === "Submit for Review" && (
                                <SubmitForReview investments={investments} />
                            )}

                            {activeTab === "Failed Campaign" && (
                                <FailedCampaign />
                            )}

                            {activeTab === "Wallet Withdraw" && (
                                <WalletWithdraw />
                            )}

                            {activeTab === "Activity Feed" && (
                                <ActivityFeed />
                            )}
                        </div>
                    </>
                )}
            </section>

            <Footer />

        </div>
    )
}