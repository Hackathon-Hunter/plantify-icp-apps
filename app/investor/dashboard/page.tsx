'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"

import SubmitForReview from "./partial/SubmitForReview";
import FailedCampaign from "./partial/FailedCampaign";
import WalletWithdraw from "./partial/WalletWithdraw";
import ActivityFeed from "./partial/ActivityFeed";

import {
    Search,
    BanknoteArrowUp,
    ChartPie,
    TrendingUp
} from "lucide-react";

export default function DashboardInvestor() {
    const [activeTab, setActiveTab] = useState("Submit for Review")
    const extraTabs = ["Submit for Review", "Failed Campaign", "Wallet Withdraw", "Activity Feed"]
    const tabs = [...extraTabs]
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

                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="bg-neutral-800 p-4 flex justify-between w-full">
                        <div className="flex flex-col gap-3">
                            <span className="text-white text-xl">Total Invested</span>
                            <span className="text-white text-2xl font-bold">$5,200</span>
                            <span className="text-white text-sm">Across all campaigns</span>
                        </div>
                        <div><BanknoteArrowUp className="text-white" /></div>
                    </div>

                    <div className="bg-neutral-800 p-4 flex justify-between w-full">
                        <div className="flex flex-col gap-3">
                            <span className="text-white text-xl">Startups Backed</span>
                            <span className="text-white text-2xl font-bold">8</span>
                            <span className="text-white text-sm">Active investments</span>
                        </div>
                        <div><ChartPie className="text-white" /></div>
                    </div>

                    <div className="bg-neutral-800 p-4 flex justify-between w-full">
                        <div className="flex flex-col gap-3">
                            <span className="text-white text-xl">Portfolio Value</span>
                            <span className="text-white text-2xl font-bold">$2,910</span>
                            <span className="text-white text-sm">
                                <span className="text-green-500">+32%</span> Total return
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
                        <SubmitForReview />
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

            </section>

            <Footer />

        </div>
    )
}