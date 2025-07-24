"use client"

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"

import Overview from "./partial/Overview";
import CampaignEditor from "./partial/CampaignEditor"
import Compliance from "./partial/Compliance"
import Updates from "./partial/Updates";
import ProfitDistribution from "./partial/ProfitDistribution";

import {
    TrendingUp,
    BanknoteArrowUp,
    Users,
    Calendar
} from "lucide-react";

export default function DashboardFounder() {
    const [activeTab, setActiveTab] = useState("Overview")
    const extraTabs = ["Overview", "Campaign Editor", "Compliance", "Updates", "Profit Distribution", "Investors",]
    const tabs = [...extraTabs]

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs segments={[{ label: "Back to Home" }]} />

                <div className="flex flex-col gap-1">
                    <span className="text-white text-2xl">LinguaLearn</span>
                    <span className="text-neutral-500">LinguaLearn</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                        <div className="flex justify-between">
                            <span className="text-white">Amount Raised</span>
                            <BanknoteArrowUp />
                        </div>
                        <span className="text-white text-3xl">$85,000</span>
                        <small className="text-neutral-500">Of $150,000 target</small>
                    </div>
                    <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                        <div className="flex justify-between">
                            <span className="text-white">Investor</span>
                            <Users />
                        </div>
                        <span className="text-white text-3xl">127</span>
                        <small className="text-neutral-500">Total backers</small>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                        <div className="flex justify-between">
                            <span className="text-white">Progress</span>
                            <TrendingUp />
                        </div>
                        <span className="text-white text-3xl">57%</span>
                        <small className="text-neutral-500">Funding complete</small>
                    </div>
                    <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                        <div className="flex justify-between">
                            <span className="text-white">NFT Left</span>
                            <Calendar />
                        </div>
                        <span className="text-white text-3xl">23</span>
                    </div>
                </div>

                <div className="border-2 border-dashed border-neutral-600" />

                <Tabs
                    tabs={tabs.map((c) => ({ label: c, value: c }))}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="mt-6">
                    {activeTab === "Overview" && <Overview />}
                    {activeTab === "Campaign Editor" && <CampaignEditor />}
                    {activeTab === "Compliance" && <Compliance />}
                    {activeTab === "Updates" && <Updates />}
                    {activeTab === "Profit Distribution" && <ProfitDistribution />}
                </div>
            </section>

            <Footer />
        </div>
    )
}