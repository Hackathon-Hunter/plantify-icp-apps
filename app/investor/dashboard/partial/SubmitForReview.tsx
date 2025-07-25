"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Investment, Project, InvestmentStatus } from "@/service/declarations/plantify-backend.did";
import { getProject } from "@/service/api/plantifyService";
import { useAuth } from "@/hooks/useAuth";

import {
    Eye,
    ExternalLink,
    TrendingUp,
    Dot,
    Loader2
} from "lucide-react";

interface SubmitForReviewProps {
    investments?: Investment[];
}

interface ProjectMap {
    [key: string]: Project;
}

export default function SubmitForReview({ investments = [] }: SubmitForReviewProps) {
    const [projectsMap, setProjectsMap] = useState<ProjectMap>({});
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const { actor } = useAuth();

    // Fetch project details for all investments
    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!actor || investments.length === 0) return;
            
            setIsLoadingProjects(true);
            
            try {
                const projectIds = [...new Set(investments.map(inv => inv.projectId))];
                const projectsData: ProjectMap = {};
                
                // Fetch projects in parallel
                await Promise.all(
                    projectIds.map(async (projectId) => {
                        try {
                            const projectData = await getProject(actor, projectId);
                            if (projectData) {
                                projectsData[projectId] = projectData;
                            }
                        } catch (error) {
                            console.error(`Error fetching project ${projectId}:`, error);
                        }
                    })
                );
                
                setProjectsMap(projectsData);
            } catch (error) {
                console.error("Error fetching project details:", error);
            } finally {
                setIsLoadingProjects(false);
            }
        };
        
        fetchProjectDetails();
    }, [investments, actor]);

    // Format amount from e8s to ICP
    const formatAmount = (amount: bigint) => {
        return (Number(amount) / 100000000).toFixed(2);
    };

    // Calculate days since investment
    const getDaysSince = (timestamp: bigint) => {
        const investmentDate = new Date(Number(timestamp));
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - investmentDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Get status label and color
    const getStatusDisplay = (status: InvestmentStatus) => {
        if ('Completed' in status) {
            return { label: "Active", color: "green" };
        } else if ('Pending' in status) {
            return { label: "Pending", color: "yellow" };
        } else if ('Processing' in status) {
            return { label: "Processing", color: "blue" };
        } else if ('Failed' in status) {
            return { label: "Failed", color: "red" };
        } else if ('Refunded' in status) {
            return { label: "Refunded", color: "purple" };
        }
        return { label: "Unknown", color: "gray" };
    };

    // Calculate estimated return (mock calculation - replace with actual logic)
    const calculateReturn = (investment: Investment) => {
        // Mock calculation: 20% return
        const returnAmount = Number(investment.amount) * 0.2;
        return returnAmount / 100000000; // Convert from e8s to ICP
    };

    if (isLoadingProjects) {
        return (
            <div className="flex justify-center items-center p-10">
                <Loader2 className="animate-spin text-white mr-2" size={24} />
                <span className="text-white">Loading investment data...</span>
            </div>
        );
    }

    if (investments.length === 0) {
        return (
            <div className="bg-neutral-800 p-6 text-center">
                <h3 className="text-white text-xl mb-2">No Active Investments</h3>
                <p className="text-neutral-400 mb-4">You don&apos;t have any active investments yet.</p>
                <Button 
                    onClick={() => window.location.href = '/investor/explore'} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Explore Investment Opportunities
                </Button>
            </div>
        );
    }

    // Sort investments by date (newest first)
    const sortedInvestments = [...investments].sort(
        (a, b) => Number(b.investmentDate) - Number(a.investmentDate)
    );

    return (
        <div className="flex flex-col gap-4">
            {sortedInvestments.map((investment) => {
                const project = projectsMap[investment.projectId];
                const status = getStatusDisplay(investment.status);
                const returnValue = calculateReturn(investment);
                const investmentAmount = formatAmount(investment.amount);
                const paperValue = (Number(investmentAmount) + returnValue).toFixed(2);
                const returnPercentage = Math.round((returnValue / Number(investmentAmount)) * 100);
                
                return (
                    <div key={investment.id} className="bg-neutral-800 p-4 flex flex-col gap-3">
                        <div className="flex justify-between flex-wrap gap-2">
                            <span className="text-2xl">
                                {project ? project.companyName : `Project #${investment.projectId.slice(0, 8)}`}
                            </span>
                            <span className="text-green-500 flex items-center">
                                <TrendingUp className="mr-1" /> +{returnPercentage}%
                            </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`bg-${status.color}-950 text-${status.color}-300 flex items-center pt-1 pb-1 pr-2`}>
                                <Dot />{status.label}
                            </span>
                            <span className="text-neutral-400">
                                Last update: {getDaysSince(investment.investmentDate)} days ago
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-400">Invested</span>
                                <span className="text-white text-xl">{investmentAmount} ICP</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-400">NFTs Owned</span>
                                <span className="text-white text-xl">{investment.quantity.toString()}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-400">Paper value</span>
                                <span className="text-white text-xl">{paperValue} ICP</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-400">Campaign Progress</span>
                                <span className="text-white text-xl">
                                    {project ? Math.min(
                                        Math.round((Number(project.fundingRaised) / Number(project.fundingGoal)) * 100),
                                        100
                                    ) : "?"}%
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                            <div className="flex flex-wrap gap-4">
                                <Button 
                                    iconLeft={<Eye />} 
                                    size="lg" 
                                    className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit"
                                    onClick={() => window.location.href = `/investor/farm-details?projectId=${investment.projectId}`}
                                >
                                    View
                                </Button>
                                <Button 
                                    iconLeft={<ExternalLink />} 
                                    size="lg" 
                                    className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit"
                                >
                                    Sell
                                </Button>
                                <Button 
                                    size="lg" 
                                    className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit"
                                >
                                    View Updates
                                </Button>
                            </div>
                            <span className="text-green-500">+ {returnValue.toFixed(2)} ICP return</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}