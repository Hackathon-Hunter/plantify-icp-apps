"use client"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";

import {
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
}

export default function CompanyDetails({ nextStep, prevStep }: Props) {
    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Company Details</span>
            <span className="text-neutral-500">Tell us about your company and what you're building</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex flex-col gap-2">
                <span className="text-white">The Problem <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="What problem are you solving? Why is this important?"
                    bgClass="bg-neutral-700"
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Your Solution <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="How does your product/service solve this problem?"
                    bgClass="bg-neutral-700"
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Market Opportunity <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="Describe your target market and the opportunity size"
                    bgClass="bg-neutral-700"
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Transaction & Milestones</span>
                <Textarea
                    placeholder="What progress have you made? Key metrics, partnerships, etc."
                    bgClass="bg-neutral-700"
                />
            </div>

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
                {nextStep && (
                    <Button
                        onClick={nextStep}
                        iconRight={<ArrowRight />}
                        size="lg"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}