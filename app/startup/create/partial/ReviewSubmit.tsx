"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import WarningCard from "@/components/ui/WarningCard"
import SuccessCard from "@/components/ui/SuccessCard"

import {
    ArrowRight,
    ArrowLeft,
    Check
} from "lucide-react";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
}

export default function ReviewSubmit({ nextStep, prevStep }: Props) {
    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Review & Submit</span>
            <span className="text-neutral-500">Introduce your team and upload campaign materials</span>

            <div className="border border-dashed border-neutral-600"></div>

            <span className="text-white text-xl">Campaign Summary</span>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Company Name</span>
                    <span className="text-white">Your Company Name</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Industry</span>
                    <span className="text-white">Selected Industry</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Funding Goal</span>
                    <span className="text-white">$150,000</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Valuation</span>
                    <span className="text-white">$2,500,000</span>
                </div>
            </div>

            <WarningCard
                title="Before You Submit"
                description={[
                    "Your campaign will be review by our compliance team",
                    "Review typically takes 3-5 business days",
                    "You’ll be notified via email once approved",
                    "Make sure all information is accurate and complete"
                ]}
            />

            <SuccessCard
                title="Ready to Launch?"
                description="Once submitted, your campaign will enter our review process. You’ll receive updates via email."
                bgClass="bg-green-950"
                titleClass="text-green-300"
                descriptionClass="text-white/90"
            />

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            <div className="flex justify-between">
                {prevStep && (
                    <Button
                        onClick={prevStep}
                        iconLeft={<ArrowLeft />}
                        size="lg"
                        className="bg-neutral-500 text-white hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                    >
                        Previous
                    </Button>
                )}
                <Button
                    iconRight={<Check className="text-green-500" />}
                    size="lg"
                    className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                >
                    Submit for Review
                </Button>
            </div>
        </div>
    )
}
