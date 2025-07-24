"use client"

import React from "react";

import { Button } from "@/components/ui/button";

import {
    Download,
    CircleCheckBig,
    MoveUpRight,
    MoveDownLeft,
    Plus,
    Minus
} from "lucide-react";

export default function ActivityFeed() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <span className="text-white text-xl font-semibold">Recent Activity</span>
                <small className="text-neutral-400">Recent Activity</small>
            </div>

            <div className="bg-neutral-800 p-4 flex justify-between">
                <div className="flex gap-3 items-center">
                    <MoveUpRight className="text-red-500" size={20} />
                    <div className="flex flex-col">
                        <span className="text-white text-xl">Invested $300 in EcoRide </span>
                        <small className="text-neutral-400">January 01, 2025 at 14:30</small>
                    </div>
                </div>
                <div className="text-red-500 flex items-center w-fit">
                    <Minus size={15} />
                    <span>$500</span>
                </div>
            </div>

            <div className="bg-neutral-800 p-4 flex justify-between">
                <div className="flex gap-3 items-center">
                    <MoveDownLeft className="text-green-500" size={20} />
                    <div className="flex flex-col">
                        <span className="text-white text-xl">Sold 50 LinguaLearn NFTs </span>
                        <small className="text-neutral-400">January 01, 2025 at 14:30</small>
                    </div>
                </div>
                <div className="text-green-500 flex items-center w-fit">
                    <Plus size={15} />
                    <span>$500</span>
                </div>
            </div>
        </div>
    )
}