"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import WarningCard from "@/components/ui/WarningCard"
import SuccessCard from "@/components/ui/SuccessCard"
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import {
    ArrowLeft,
    Check,
    Loader2
} from "lucide-react";

export default function ReviewSubmit({ prevStep, formData, handleSubmit }: StepComponentProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async () => {
        if (handleSubmit) {
            setIsSubmitting(true);
            try {
                await handleSubmit();
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!formData) {
        return (
            <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
                <span className="text-xl text-white">Review & Submit</span>
                <span className="text-neutral-500">Missing form data. Please complete previous steps.</span>
            </div>
        );
    }

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Review & Submit</span>
            <span className="text-neutral-500">Review your project details before submission</span>

            <div className="border border-dashed border-neutral-600"></div>

            <span className="text-white text-xl">Startup Summary</span>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Company Name</span>
                    <span className="text-white">{formData.companyName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Industry</span>
                    <span className="text-white">{formData.industry ? Object.keys(formData.industry)[0] : 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Project Type</span>
                    <span className="text-white">{formData.projectType ? Object.keys(formData.projectType)[0] : 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Location</span>
                    <span className="text-white">{formData.location || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Funding Goal</span>
                    <span className="text-white">${formData.fundingGoal ? formData.fundingGoal.toLocaleString() : '0'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Valuation</span>
                    <span className="text-white">${formData.companyValuation ? formData.companyValuation.toLocaleString() : '0'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Min Investment</span>
                    <span className="text-white">${formData.minInvestment ? formData.minInvestment.toLocaleString() : '0'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Team Members</span>
                    <span className="text-white">{formData.teamMembers?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Milestones</span>
                    <span className="text-white">{formData.milestones?.length || 0}</span>
                </div>
            </div>

            <WarningCard
                title="Before You Submit"
                description={[
                    "Your startup will be review by our compliance team",
                    "Review typically takes 3-5 business days",
                    "You'll be notified via email once approved",
                    "Make sure all information is accurate and complete"
                ]}
            />

            <SuccessCard
                title="Ready to Launch?"
                description="Once submitted, your startup will enter our review process. You'll receive updates via email."
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
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    iconRight={isSubmitting ? <Loader2 className="animate-spin" /> : <Check className="text-green-500" />}
                    size="lg"
                    className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                >
                    {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
            </div>
        </div>
    )
}
