"use client"

import React, { useState, useEffect } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";

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
import { useAuth } from "@/hooks/useAuth";
import { getMyProjects, getInvestorCountForProject } from "@/service/api/plantifyService";
import { Project } from "@/service/declarations/plantify-backend.did";

export default function DashboardFounder() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [investorCount, setInvestorCount] = useState<bigint>(BigInt(0));
    const [loading, setLoading] = useState<boolean>(true);
    
    const extraTabs = ["Overview", "Campaign Editor", "Compliance", "Updates", "Profit Distribution", "Investors"];
    const tabs = [...extraTabs];
    const { actor, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            if (actor && isAuthenticated) {
                try {
                    setLoading(true);
                    const myProjects = await getMyProjects(actor);
                    setProjects(myProjects);
                    
                    if (myProjects.length > 0) {
                        setCurrentProject(myProjects[0]);
                        
                        // Get investor count for the first project
                        const investors = await getInvestorCountForProject(actor, myProjects[0].id);
                        setInvestorCount(investors);
                    }
                } catch (error) {
                    console.error("Error fetching projects:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProjects();
    }, [actor, isAuthenticated]);

    // Calculate progress percentage
    const calculateProgress = () => {
        if (!currentProject) return 0;
        
        const raised = Number(currentProject.fundingRaised);
        const goal = Number(currentProject.fundingGoal);
        
        if (goal === 0) return 0;
        return Math.round((raised / goal) * 100);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs segments={[{ label: "Back to Home" }]} />

                {loading ? (
                    <div className="w-full">
                        {/* Shimmer effect for project name */}
                        <div className="h-8 w-64 bg-neutral-800 rounded-md mb-2 animate-pulse"></div>
                        <div className="h-4 w-96 bg-neutral-800 rounded-md mb-6 animate-pulse"></div>
                        
                        {/* Shimmer for stats cards */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
                            </div>
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                        
                        {/* Shimmer for second row of stats */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
                            </div>
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ) : !currentProject ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-neutral-900 rounded-lg">
                        <div className="text-white text-xl mb-4">No projects found.</div>
                        <p className="text-neutral-400 mb-6 text-center">You haven&apos;t created any projects yet. Start by creating your first project.</p>
                        <Button 
                            onClick={() => window.location.href = '/startup/create'}
                            className="bg-white text-black hover:bg-neutral-200 px-6 py-2 rounded-md"
                        >
                            Create Project
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-1">
                            <span className="text-white text-2xl">{currentProject.companyName}</span>
                            <span className="text-neutral-500">{currentProject.companyTagline}</span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <span className="text-white">Amount Raised</span>
                                    <BanknoteArrowUp />
                                </div>
                                <span className="text-white text-3xl">${Number(currentProject.fundingRaised || 0).toLocaleString()}</span>
                                <small className="text-neutral-500">Of ${Number(currentProject.fundingGoal).toLocaleString()} target</small>
                            </div>
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <span className="text-white">Investor</span>
                                    <Users />
                                </div>
                                <span className="text-white text-3xl">{investorCount.toString()}</span>
                                <small className="text-neutral-500">Total backers</small>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <span className="text-white">Progress</span>
                                    <TrendingUp />
                                </div>
                                <span className="text-white text-3xl">{calculateProgress()}%</span>
                                <small className="text-neutral-500">Funding complete</small>
                            </div>
                            <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                                <div className="flex justify-between">
                                    <span className="text-white">NFT Left</span>
                                    <Calendar />
                                </div>
                                <span className="text-white text-3xl">
                                    23
                                </span>
                            </div>
                        </div>

                        {projects.length > 1 && (
                            <div className="mt-4">
                                <select 
                                    className="bg-neutral-800 text-white p-2 rounded"
                                    value={currentProject.id}
                                    onChange={async (e) => {
                                        const selectedProject = projects.find(p => p.id === e.target.value);
                                        if (selectedProject && actor) {
                                            setCurrentProject(selectedProject);
                                            const investors = await getInvestorCountForProject(actor, selectedProject.id);
                                            setInvestorCount(investors);
                                        }
                                    }}
                                >
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>
                                            {project.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="border-2 border-dashed border-neutral-600" />

                        <Tabs
                            tabs={tabs.map((c) => ({ label: c, value: c }))}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <div className="mt-6">
                            {activeTab === "Overview" && <Overview project={currentProject} />}
                            {activeTab === "Campaign Editor" && <CampaignEditor project={currentProject} />}
                            {activeTab === "Compliance" && <Compliance project={currentProject} />}
                            {activeTab === "Updates" && <Updates project={currentProject} />}
                            {activeTab === "Profit Distribution" && <ProfitDistribution project={currentProject} />}
                        </div>
                    </>
                )}
            </section>

            <Footer />
        </div>
    )
}