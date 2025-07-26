"use client"

import React from "react";
import { Project } from "@/service/declarations/plantify-backend.did";

import {
    CircleCheckBig
} from "lucide-react";

interface ComplianceProps {
    project?: Project;
}

export default function Compliance({ project: _project }: ComplianceProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <span className="text-xl text-white">Compliance Checklist</span>
                <small className="text-neutral-500">Track your startup compliance status</small>
            </div>

            <div className="bg-neutral-800 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-4 items-start sm:items-center">
                    <CircleCheckBig className="text-green-500" size={25} />
                    <div className="flex flex-col">
                        <span className="text-xl text-white">Company Verification</span>
                        <small className="text-neutral-400">Legal entity registration and documentation</small>
                    </div>
                </div>
                <div className="text-green-300 bg-green-950 p-2 w-fit text-sm rounded">Verified</div>
            </div>

            <div className="bg-neutral-800 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-4 items-start sm:items-center">
                    <CircleCheckBig className="text-green-500" size={25} />
                    <div className="flex flex-col">
                        <span className="text-xl text-white">Background Check</span>
                        <small className="text-neutral-400">Founder and team background verification</small>
                    </div>
                </div>
                <div className="text-green-300 bg-green-950 p-2 w-fit text-sm rounded">Verified</div>
            </div>

            <div className="bg-neutral-800 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-4 items-start sm:items-center">
                    <CircleCheckBig className="text-green-500" size={25} />
                    <div className="flex flex-col">
                        <span className="text-xl text-white">Legal Disclosures</span>
                        <small className="text-neutral-400">Risk disclosures and regulatory compliance</small>
                    </div>
                </div>
                <div className="text-red-300 bg-red-950 p-2 w-fit text-sm rounded">In-Review</div>
            </div>
        </div>
    )
}