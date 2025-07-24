'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import { CardVertical } from "@/components/ui/CardVertical"
import WarningCard from "@/components/ui/WarningCard"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BadgeWarning from "@/components/ui/BadgeWarning";
import BadgeMuted from "@/components/ui/BadgeMuted";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"

import {
    MapPin,
    Clock,
    Download,
    LayoutPanelLeft,
    UsersRound,
    ScrollText,
    FileText
} from "lucide-react";

import { getProject } from "@/service/api/plantifyService";
import type { _SERVICE, Project } from "@/service/declarations/plantify-backend.did";
import { useAuth } from "@/hooks/useAuth";
import { ActorSubclass } from "@dfinity/agent";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Explore = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { actor } = useAuth();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    React.useEffect(() => {
        if (!actor || !id) return;
        setLoading(true);
        setError(null);
        getProject(actor as ActorSubclass<_SERVICE>, id)
            .then((data) => {
                setProject(data || null);
            })
            .catch(() => setError("Failed to load project"))
            .finally(() => setLoading(false));
    }, [actor, id]);

    const extraTabs = ["Overview", "Financials", "Teams", "Updates"]
    const tabs = [...extraTabs]

    // const filteredCampaigns =
    //     activeTab === "Overview"
    //         ? campaigns
    //         : campaignCategories.includes(activeTab)
    //             ? campaigns.filter((c) => c.category === activeTab)
    //             : []

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-64 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs
                    segments={[
                        { label: "Explore Startups" },
                        { label: project?.companyName || "-", active: true },
                    ]}
                />

                {loading ? (
                    <div className="text-white">Loading project...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : !project ? (
                    <div className="text-gray-400">Project not found.</div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* col 1 */}
                        <div className="w-full md:w-2/2 flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <img
                                    src={project.companyLogo?.[0] || "/assets/images/dummy-explore-1.png"}
                                    alt={project.companyName}
                                    className="w-full h-auto object-cover"
                                />

                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {project.productImages && project.productImages.length > 0 ? (
                                        project.productImages.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={project.companyName}
                                                className="w-full h-auto object-cover rounded"
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src={project.companyLogo?.[0] || "/assets/images/dummy-explore-1.png"}
                                            alt={project.companyName}
                                            className="w-full h-auto object-cover rounded"
                                        />
                                    )}
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
                                                dangerouslySetInnerHTML={{ __html: `<span class='text-white'>The Problem</span><br/>${project.problem}` }}
                                            />
                                        )}

                                        {/* === Financials Component === */}
                                        {activeTab === "Financials" && (
                                            <div
                                                className="text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: `<span class='text-white'>Financial Goal</span><br/>Goal: $${Number(project.fundingGoal) / 1e8}<br/>Raised: $${Number(project.fundingRaised) / 1e8}` }}
                                            />
                                        )}

                                        {/* === Updates Component === */}
                                        {activeTab === "Updates" && (
                                            <div
                                                className="text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: `<span class='text-white'>Latest Updates</span><br/>No updates yet.` }}
                                            />
                                        )}

                                        {/* === Teams Component with CardVertical === */}
                                        {activeTab === "Teams" && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {project.teamMembers && project.teamMembers.length > 0 ? (
                                                    project.teamMembers.map((member, idx) => (
                                                        <CardVertical
                                                            key={idx}
                                                            imageUrl={member.imageUrl?.[0] || "/assets/images/dummy-explore-1.png"}
                                                            title={member.name}
                                                            description={member.role}
                                                        />
                                                    ))
                                                ) : (
                                                    <div className="text-gray-400">No team members.</div>
                                                )}
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
                                    title={project.companyName}
                                    description={project.companyTagline}
                                    rightBadge={
                                        <BadgeWarning
                                            text={(() => {
                                                if (project.targetDate && project.targetDate[0]) {
                                                    const now = Date.now();
                                                    const target = Number(project.targetDate[0]) / 1_000_000;
                                                    const days = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
                                                    return `${days} days left`;
                                                }
                                                return "-";
                                            })()}
                                            icon={<Clock size={15} />}
                                            iconPosition="left"
                                        />
                                    }
                                    leftBadge={<BadgeMuted text={(() => {
                                        if (typeof project.industry === "object") {
                                            return Object.keys(project.industry)[0];
                                        }
                                        return project.industry;
                                    })()} />}
                                />
                            </div>

                            {/* Raised */}
                            <div className="bg-neutral-900 text-white py-4 px-4 flex-grow border border-neutral-800 h-fit">

                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white">Raised</span>
                                    <span className="text-purple-500">${Number(project.fundingRaised) / 1e8}</span>
                                </div>

                                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                                    <div
                                        className="bg-purple-500 h-2 rounded-full"
                                        style={{ width: `${Math.min(100, Math.round((Number(project.fundingRaised) / Number(project.fundingGoal)) * 100))}%` }}
                                    />
                                </div>

                                <div className="flex justify-between text-sm mb-4">
                                    <p>
                                        <span className="text-white">{Math.min(100, Math.round((Number(project.fundingRaised) / Number(project.fundingGoal)) * 100))}%</span>{" "}
                                        <span className="text-gray-500">funded</span>
                                    </p>
                                    <p>
                                        <span className="text-gray-500">Goal:</span>{" "}
                                        <span className="text-white">${Number(project.fundingGoal) / 1e8}</span>
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
                                        <span className="text-white">{project.location}</span>
                                    </p>
                                </div>

                                <Button
                                    iconLeft={<LayoutPanelLeft />}
                                    size="lg"
                                    className="bg-white text-black hover:bg-gray-800 hover:text-white text-sm px-4 py-4 mt-4 w-full"
                                    onClick={() => {
                                      if (project?.id) {
                                        router.push(`/investor/startup/checkout?id=${project.id}`);
                                      }
                                    }}
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
                                description={[
                                    "Investing in startups is risky. You could lose your entire investment. Only invest what you can afford to lose."
                                ]}
                            />
                        </div>
                    </div>
                )}


            </section>

            <Footer />
        </div>
    )
}

export default Explore;