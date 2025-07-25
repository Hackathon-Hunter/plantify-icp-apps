"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";
import { Industry } from "@/service/declarations/plantify-backend.did";

import {
    ArrowRight,
    ChevronDown
} from "lucide-react";

export default function BasicInformation({ nextStep, formData, updateFormData }: StepComponentProps) {
    const [form, setForm] = useState({
        companyName: formData?.companyName || '',
        industry: formData?.industry || null,
        companyTagline: formData?.companyTagline || '',
        location: formData?.location || '',
        website: formData?.website || ''
    });

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        let industry: Industry | null = null;
        
        if (value) {
            industry = { [value]: null } as Industry;
        }
        
        setForm(prev => ({
            ...prev,
            industry
        }));
    };

    const handleNext = () => {
        if (updateFormData) {
            updateFormData(form);
        }
        if (nextStep) {
            nextStep();
        }
    };

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Basic Information</span>
            <span className="text-neutral-500">Tell us about your company and what you&apos;re building</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex w-full gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Company Name <span className="text-red-500">*</span></span>
                    <Input 
                        placeholder="Enter your company name" 
                        bgClass="bg-neutral-700 text-white" 
                        value={form.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Industry <span className="text-red-500">*</span></span>
                    <Select 
                        rightIcon={<ChevronDown />} 
                        bgClass="bg-neutral-700 text-white"
                        onChange={handleIndustryChange}
                        value={form.industry ? Object.keys(form.industry)[0] : ""}
                    >
                        <option
                            value=""
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Select an industry
                        </option>
                        <option
                            value="Technology"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Technology
                        </option>
                        <option
                            value="Fintech"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Fintech
                        </option>
                        <option
                            value="Healthcare"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Healthcare
                        </option>
                        <option
                            value="Agriculture"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Agriculture
                        </option>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Company Tagline <span className="text-red-500">*</span></span>
                <Input 
                    placeholder="A brief description of what you do" 
                    bgClass="bg-neutral-700 text-white"
                    value={form.companyTagline}
                    onChange={(e) => handleChange('companyTagline', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Location <span className="text-red-500">*</span></span>
                <Input 
                    placeholder="City, State/Country" 
                    bgClass="bg-neutral-700 text-white"
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Website</span>
                <Input 
                    placeholder="https://yourcompany.com" 
                    bgClass="bg-neutral-700 text-white"
                    value={form.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                />
            </div>

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            <div className="flex justify-end">
                <Button
                    onClick={handleNext}
                    iconRight={<ArrowRight />}
                    size="lg"
                    className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}