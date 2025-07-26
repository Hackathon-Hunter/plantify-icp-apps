"use client"

import React from "react";

import { Button } from "@/components/ui/button";

import {
    BanknoteX
} from "lucide-react";

export default function FailedCampaign() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <span className="text-white text-2xl">Failed Startup</span>
                <span className="text-neutral-500">Campaigns that didn’t reach their funding goal-funds were refunded</span>
            </div>

            <div className="bg-red-950 p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <BanknoteX className="text-white" size={30} />
                    <div className="flex flex-col gap-1 text-red-300">
                        <span className="font-semibold text-xl">FailedStartup</span>
                        <span className="text-white text-sm">Refunded on December 15, 2024</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <Button
                        size="lg"
                        className="bg-transparent border border-red-300 text-red-300 hover:bg-red-300 hover:text-white text-sm px-4 py-4 mt-4 w-fit"
                    >
                        Refunded
                    </Button>
                    <span className="font-semibold">$150</span>
                </div>
            </div>
        </div>
    )
}