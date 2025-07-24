"use client"

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import MultiStepForm from "@/components/ui/MultiStepForm"

import BasicInformation from "./partial/BasicInformation";
import CompanyDetails from "./partial/CompanyDetails";
import FundingDetails from "./partial/FundingDetails";
import TeamMedia from "./partial/TeamMedia";
import ReviewSubmit from "./partial/ReviewSubmit";

export default function startupCreate() {
    const steps = [
        { id: 0, label: "Basic Information", component: <BasicInformation /> },
        { id: 1, label: "Company Details", component: <CompanyDetails /> },
        { id: 2, label: "Funding Details", component: <FundingDetails /> },
        { id: 3, label: "Team & Media", component: <TeamMedia /> },
        { id: 4, label: "Review & Submit", component: <ReviewSubmit /> },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-0 pt-0 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs
                    segments={[
                        { label: "Back to Home" },
                    ]}
                />

                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-4xl">Create Your Startup</h2>
                    <span>Launch your fundraising startup and connect with investors worldwide</span>

                    <MultiStepForm steps={steps} />
                </div>


            </section>

            <Footer />
        </div>
    )
}