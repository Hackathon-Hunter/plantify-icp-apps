"use client"

import React from "react";
import { Investment } from "@/service/declarations/plantify-backend.did";

import {
    MoveUpRight,
    Minus
} from "lucide-react";

interface ActivityFeedProps {
    investments?: Investment[];
}

export default function ActivityFeed({ investments = [] }: ActivityFeedProps) {
    // Format date from timestamp
    const formatDate = (timestamp: bigint) => {
        const date = new Date(Number(timestamp));
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format amount from e8s to ICP
    const formatAmount = (amount: bigint) => {
        return (Number(amount) / 100000000).toFixed(2);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <span className="text-white text-xl font-semibold">Recent Activity</span>
                <small className="text-neutral-400">Your investment history</small>
            </div>

            {investments.length === 0 ? (
                <div className="bg-neutral-800 p-4 text-center">
                    <span className="text-neutral-400">No investment activity found</span>
                </div>
            ) : (
                investments.sort((a, b) => Number(b.investmentDate) - Number(a.investmentDate))
                    .slice(0, 10) // Show only the 10 most recent
                    .map((investment) => (
                        <div key={investment.id} className="bg-neutral-800 p-4 flex justify-between">
                            <div className="flex gap-3 items-center">
                                <MoveUpRight className="text-red-500" size={20} />
                                <div className="flex flex-col">
                                    <span className="text-white text-xl">
                                        Invested in {investment.projectId.slice(0, 8)}...
                                    </span>
                                    <small className="text-neutral-400">
                                        {formatDate(investment.investmentDate)}
                                    </small>
                                </div>
                            </div>
                            <div className="text-red-500 flex items-center w-fit">
                                <Minus size={15} />
                                <span>{formatAmount(investment.amount)} ICP</span>
                            </div>
                        </div>
                    ))
            )}
        </div>
    )
}