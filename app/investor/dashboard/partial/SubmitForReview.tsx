"use client"

import React from "react";

import { Button } from "@/components/ui/button";

import {
    Search,
    Eye,
    ExternalLink,
    TrendingUp,
    Dot
} from "lucide-react";

export default function SubmitForReview() {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2].map((_, i) => (
                <div key={i} className="bg-neutral-800 p-4 flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap gap-2">
                        <span className="text-2xl">LinguaLearn</span>
                        <span className="text-green-500 flex items-center"><TrendingUp /> +50%</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-green-950 text-green-300 flex items-center pt-1 pb-1 pr-2"><Dot />Live</span>
                        <span className="text-neutral-400">Last update : 2 Days ago</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-neutral-400">Invested</span>
                            <span className="text-white text-xl">$500</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-neutral-400">NFTs Owned</span>
                            <span className="text-white text-xl">500</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-neutral-400">Paper value</span>
                            <span className="text-white text-xl">$750</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-neutral-400">Campaign Progress</span>
                            <span className="text-white text-xl">85%</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                        <div className="flex flex-wrap gap-4">
                            <Button iconLeft={<Eye />} size="lg" className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit">
                                View
                            </Button>
                            <Button iconLeft={<ExternalLink />} size="lg" className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit">
                                Sell
                            </Button>
                            <Button size="lg" className="bg-transparent border border-white text-white hover:bg-gray-800 hover:text-white text-sm px-4 py-4 w-fit">
                                View Updates
                            </Button>
                        </div>
                        <span className="text-green-500">+ $250 return</span>
                    </div>
                </div>
            ))}
        </div>
    )
}