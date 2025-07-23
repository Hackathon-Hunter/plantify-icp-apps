"use client"

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/button";

import {
    ArrowRight,
    ChevronDown
} from "lucide-react";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
}

export default function BasicInformation({ nextStep }: Props) {
    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Basic Information</span>
            <span className="text-neutral-500">Tell us about your company and what you're building</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex w-full gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Company Name <span className="text-red-500">*</span></span>
                    <Input placeholder="Enter your company name" bgClass="bg-neutral-700 text-black" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Industry <span className="text-red-500">*</span></span>
                    <Select rightIcon={<ChevronDown />} bgClass="bg-neutral-700 text-white">
                        <option
                            value=""
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Select a country
                        </option>
                        <option
                            value="id"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Indonesia
                        </option>
                        <option
                            value="us"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            United States
                        </option>
                        <option
                            value="jp"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Japan
                        </option>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Company Tagline <span className="text-red-500">*</span></span>
                <Input placeholder="A brief description of what you do" bgClass="bg-neutral-700 text-black" />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Location <span className="text-red-500">*</span></span>
                <Input placeholder="City,State/Country" bgClass="bg-neutral-700 text-black" />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Website</span>
                <Input placeholder="https://yourcompany.com" bgClass="bg-neutral-700 text-black" />
            </div>

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            <div className="flex justify-end">
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