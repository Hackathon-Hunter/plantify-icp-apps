"use client"

import React from "react";
import { Project } from "@/service/declarations/plantify-backend.did";

interface OverviewProps {
    project?: Project;
}

export default function Overview({ project }: OverviewProps) {
    if (!project) {
        return <div className="text-white">No project data available</div>;
    }

    // Calculate remaining funding
    const fundingRaised = Number(project.fundingRaised);
    const fundingGoal = Number(project.fundingGoal);
    const remainingFunding = fundingGoal - fundingRaised;
    const progressPercentage = fundingGoal > 0 ? Math.round((fundingRaised / fundingGoal) * 100) : 0;

    // Format dates if available
    const formatDate = (timestamp?: bigint) => {
        if (!timestamp) return "Not set";
        return new Date(Number(timestamp)).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const startDate = project.createdAt;
    const endDate = project.targetDate && project.targetDate.length > 0 ? project.targetDate[0] : undefined;

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3 bg-neutral-900 p-4 w-full">
                <span className="text-xl text-white">Startup Details</span>
                <div className="border-2 border-dashed border-neutral-600"></div>

                <div className="flex justify-between">
                    <span className="text-neutral-500">Raise Target</span>
                    <span className="text-white">${Number(project.fundingGoal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Minimum Goal</span>
                    <span className="text-white">${Number(project.minimumFunding).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">NFTs Issued</span>
                    <span className="text-white">{project.investorCount.toString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Start Date</span>
                    <span className="text-white">{formatDate(startDate)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">End Date</span>
                    <span className="text-white">{formatDate(endDate)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Smart Contract</span>
                    <span className="text-white">{project.id}</span>
                </div>
            </div>

            <div className="bg-neutral-800 p-4 flex flex-col gap-3 w-full h-fit">
                <span className="text-xl text-white">NFT Sale Progress</span>
                <div className="border-2 border-dashed border-neutral-600"></div>

                <div className="flex justify-between items-center">
                    <span className="text-white">Raise ${fundingRaised.toLocaleString()}</span>
                    <small className="text-white text-xs">Target ${fundingGoal.toLocaleString()}</small>
                </div>

                <div className="w-full h-2 bg-neutral-500 mt-2">
                    <div
                        className="h-full bg-white"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <div className="flex justify-between">
                    <span className="text-green-500 text-xl">{progressPercentage}%</span>
                    <small className="text-red-500 text-xl">${remainingFunding.toLocaleString()}</small>
                </div>

                <div className="flex justify-between">
                    <span className="text-neutral-500 text-xs">Complete</span>
                    <small className="text-neutral-500 text-xs">Remaining</small>
                </div>
            </div>
        </div>
    )
}