"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MultiStepForm, { ProjectFormData } from "@/components/ui/MultiStepForm";
import { useAuth } from "@/hooks/useAuth";
import { createProject, createProjectRequestFromForm } from "@/service/api/plantifyService";

import BasicInformation from "./partial/BasicInformation";
import CompanyDetails from "./partial/CompanyDetails";
import FundingDetails from "./partial/FundingDetails";
import TeamMedia from "./partial/TeamMedia";
import ReviewSubmit from "./partial/ReviewSubmit";

export default function StartupCreate() {
    const router = useRouter();
    const { actor } = useAuth();

    const steps = [
        { id: 0, label: "Basic Information", component: <BasicInformation /> },
        { id: 1, label: "Company Details", component: <CompanyDetails /> },
        { id: 2, label: "Funding Details", component: <FundingDetails /> },
        { id: 3, label: "Team & Media", component: <TeamMedia /> },
        { id: 4, label: "Review & Submit", component: <ReviewSubmit /> },
    ];

    const handleSubmit = async (formData: ProjectFormData) => {
        if (!actor) {
            toast.error("You must be logged in to create a project.");
            return;
        }

        try {
            console.log("Form data before conversion:", formData);
            
            // Use the utility function to convert the form data
            const projectRequest = createProjectRequestFromForm(formData);
            console.log("Submitting project request:", projectRequest);
            
            const result = await createProject(actor, projectRequest);
            
            if ('ok' in result) {
                toast.success("Project created successfully!");
                router.push("/startup/dashboard");
            } else {
                toast.error(`Failed to create project: ${result.err}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to create project. Please try again.");
        }
    };

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

                    <MultiStepForm steps={steps} onSubmit={handleSubmit} />
                </div>
            </section>

            <Footer />
        </div>
    )
}