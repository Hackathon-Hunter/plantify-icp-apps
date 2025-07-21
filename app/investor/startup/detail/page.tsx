'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import { CardVertical } from "@/components/ui/CardVertical"
import WarningCard from "@/components/ui/WarningCard"
import { CardProduct } from "@/components/ui/CardProduct"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BadgeWarning from "@/components/ui/BadgeWarning";
import BadgeMuted from "@/components/ui/BadgeMuted";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"

import {
    Search,
    Filter,
    Heart,
    MapPin,
    TrendingUp,
    DollarSign,
    Clock,
    Sprout,
    Download,
    LayoutPanelLeft,
    UsersRound,
    ArrowLeft,
    ScrollText,
    FileText
} from "lucide-react";

const campaigns = [
    {
        imageUrl: "/images/campaign1.png",
        title: "GreenTech Solutions",
        description: "Sustainable packaging solutions for e-commerce",
        buttonText: "View Detail",
        buttonIcon: <Search />,
        reverse: false,
        rightBadge: <BadgeWarning text="23 days left" icon={<Clock size={15} />} iconPosition="left" />,
        leftBadge: <BadgeMuted text="EdTech" />,
        raisedAmount: 100,
        goalAmount: 1,
        category: "Sustainability",
    },
    {
        imageUrl: "/images/campaign2.png",
        title: "HealthTrack Pro",
        description: "Wearable health monitoring for chronic disease management",
        buttonText: "View Detail",
        buttonIcon: <Search />,
        reverse: true,
        rightBadge: <BadgeWarning text="23 days left" icon={<Clock size={15} />} iconPosition="left" />,
        leftBadge: <BadgeMuted text="EdTech" />,
        raisedAmount: 100,
        goalAmount: 1,
        category: "Health Tech",
    },
    {
        imageUrl: "/images/campaign2.png",
        title: "FoodieBot",
        description: "AI-powered restaurant recommendation and food delivery optimization",
        buttonText: "View Detail",
        buttonIcon: <Search />,
        reverse: true,
        rightBadge: <BadgeWarning text="23 days left" icon={<Clock size={15} />} iconPosition="left" />,
        leftBadge: <BadgeMuted text="EdTech" />,
        raisedAmount: 100,
        goalAmount: 1,
        category: "Food Tech",
    },
    {
        imageUrl: "/images/campaign2.png",
        title: "CryptoSecure",
        description: "Enterprise blockchain security and audit platform",
        buttonText: "View Detail",
        buttonIcon: <Search />,
        reverse: true,
        rightBadge: <BadgeWarning text="23 days left" icon={<Clock size={15} />} iconPosition="left" />,
        leftBadge: <BadgeMuted text="EdTech" />,
        raisedAmount: 100,
        goalAmount: 1,
        category: "Cybersecurity",
    },
]

const detailsData = {
    overview: `
      <span class="text-white">The Problem</span> <br/>
      Traditional language learning apps use a one-size-fits-all approach...
    `,
    financials: `
      <span class="text-white">Financial Projections</span> <br/>
      Proyeksi keuangan dan pendapatan untuk 3 tahun ke depan...
    `,
    updates: `
      <span class="text-white">Latest Updates</span> <br/>
      Kami baru saja meraih pendanaan tahap awal sebesar $1M...
    `,
    teams: [
        {
            title: "John Doe",
            description: "CEO & Co-founder",
            imageUrl: "/images/team1.png",
        },
        {
            title: "Jane Smith",
            description: "CTO",
            imageUrl: "/images/team2.png",
        },
    ],
}

const Explore = () => {
    const [activeTab, setActiveTab] = useState("Overview")
    const campaignCategories = ["Overview", ...new Set(campaigns.map((c) => c.category))]
    const extraTabs = ["Overview", "Financials", "Teams", "Updates"]
    const tabs = [...extraTabs]

    // const filteredCampaigns =
    //     activeTab === "Overview"
    //         ? campaigns
    //         : campaignCategories.includes(activeTab)
    //             ? campaigns.filter((c) => c.category === activeTab)
    //             : []

    const images = [
        { src: "/assets/images/dummy-explore-1.png", alt: "Explore 1" },
        { src: "/assets/images/dummy-explore-1.png", alt: "Explore 2" },
        { src: "/assets/images/dummy-explore-1.png", alt: "Explore 3" },
        { src: "/assets/images/dummy-explore-1.png", alt: "Explore 4" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-64 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs
                    segments={[
                        { label: "Explore Startups" },
                        { label: "LinguaLearn", active: true },
                    ]}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    {/* col 1 */}
                    <div className="w-full md:w-2/2 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <img
                                src="/assets/images/dummy-explore-1.png"
                                alt="Explore1"
                                className="w-full h-auto object-cover"
                            />

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-auto object-cover rounded"
                                    />
                                ))}
                            </div>

                            <div className="mt-4">
                                <Tabs
                                    tabs={tabs.map((c) => ({ label: c, value: c }))}
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                />

                                <div className="mt-6">
                                    {/* === Overview Component === */}
                                    {activeTab === "Overview" && (
                                        <div
                                            className="text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: detailsData.overview }}
                                        />
                                    )}

                                    {/* === Financials Component === */}
                                    {activeTab === "Financials" && (
                                        <div
                                            className="text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: detailsData.financials }}
                                        />
                                    )}

                                    {/* === Updates Component === */}
                                    {activeTab === "Updates" && (
                                        <div
                                            className="text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: detailsData.updates }}
                                        />
                                    )}

                                    {/* === Teams Component with CardVertical === */}
                                    {activeTab === "Teams" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {detailsData.teams.map((member, idx) => (
                                                <CardVertical
                                                    key={idx}
                                                    imageUrl={member.imageUrl}
                                                    title={member.title}
                                                    description={member.description}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col gap-3">
                        {/* profile */}
                        <div className="flex-1">
                            <CardHorizontal
                                title="LinguaLearn"
                                description="AI-powered language learning app with personalized curriculum"
                                rightBadge={
                                    <BadgeWarning
                                        text="23 days left"
                                        icon={<Clock size={15} />}
                                        iconPosition="left"
                                    />
                                }
                                leftBadge={<BadgeMuted text="EdTech" />}
                            />
                        </div>

                        {/* Raised */}
                        <div className="bg-neutral-900 text-white py-4 px-4 flex-grow border border-neutral-800 h-fit">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white">Raised</span>
                                <span className="text-purple-500">$85,000</span>
                            </div>

                            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                                <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{ width: "57%" }}
                                />
                            </div>

                            <div className="flex justify-between text-sm mb-4">
                                <p>
                                    <span className="text-white">57%</span>{" "}
                                    <span className="text-gray-500">funded</span>
                                </p>
                                <p>
                                    <span className="text-gray-500">Goal:</span>{" "}
                                    <span className="text-white">$150,000</span>
                                </p>
                            </div>

                            <div className="border-t border-dashed border-gray-700 my-4"></div>

                            <div className="flex justify-between text-sm">
                                <p className="flex gap-1 items-center text-gray-500">
                                    <UsersRound size={15} />
                                    Investors
                                </p>
                                <p className="flex gap-1 items-center">
                                    <MapPin size={15} />
                                    <span className="text-white">San Francisco, CA</span>
                                </p>
                            </div>

                            <Button
                                iconLeft={<LayoutPanelLeft />}
                                size="lg"
                                className="bg-white text-black hover:bg-gray-800 hover:text-white text-sm px-4 py-4 mt-4 w-full"
                            >
                                Invest Now!
                            </Button>
                        </div>

                        {/* Documents */}
                        <div className="bg-neutral-900 text-white py-4 px-4 flex-grow border border-neutral-800 h-fit flex flex-col gap-3">
                            <span>Documents</span>
                            <Button
                                iconLeft={<LayoutPanelLeft />}
                                iconRight={<Download />}
                                size="lg"
                                className="bg-neutral-700 text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-full"
                            >
                                Pitch Deck
                            </Button>
                            <Button
                                iconLeft={<ScrollText />}
                                iconRight={<Download />}
                                size="lg"
                                className="bg-neutral-700 text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-full"
                            >
                                Financial Statements
                            </Button>
                            <Button
                                iconLeft={<FileText />}
                                iconRight={<Download />}
                                size="lg"
                                className="bg-neutral-700 text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-full"
                            >
                                Legal Documents
                            </Button>
                            <Button
                                iconLeft={<FileText />}
                                iconRight={<Download />}
                                size="lg"
                                className="bg-neutral-700 text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-full"
                            >
                                Form C Filing
                            </Button>
                        </div>

                        {/* Warning */}
                        <WarningCard
                            title="Investment Risk"
                            description="Investing in startups is risky. You could lose your entire investment. Only invest what you can afford to lose."
                        />
                    </div>
                </div>


            </section>

            <Footer />
        </div>
    )
}

export default Explore;