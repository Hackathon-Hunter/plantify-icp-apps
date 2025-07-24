"use client"

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { UploadFileButton } from '@/components/ui/UploadFileButton';

import {
    Download
} from "lucide-react";

export default function ProfitDistribution() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <span className="text-white text-2xl font-semibold">Profit Distribution</span>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    iconLeft={<Download />}
                    size="lg"
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-black text-sm px-4 py-4 w-full sm:w-fit"
                >
                    CSV
                </Button>
                <Button
                    iconLeft={<Download />}
                    size="lg"
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-black text-sm px-4 py-4 w-full sm:w-fit"
                >
                    PDF
                </Button>
            </div>
        </div>
    )
}