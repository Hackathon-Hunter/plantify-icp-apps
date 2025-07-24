"use client"

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";

import {
    ArrowRight,
    ArrowLeft,
    ChevronDown
} from "lucide-react";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
}

export default function FundingDetails({ nextStep, prevStep }: Props) {
    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Funding Details</span>
            <span className="text-neutral-500">Set your funding goals and terms</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Funding Goal (USD) <span className="text-red-500">*</span></span>
                    <Input placeholder="150000" bgClass="bg-neutral-700 text-black" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Minimum Funding (USD) <span className="text-red-500">*</span></span>
                    <Input placeholder="50000" bgClass="bg-neutral-700 text-black" />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Company Valuation (USD) <span className="text-red-500">*</span></span>
                    <Input placeholder="150000" bgClass="bg-neutral-700 text-black" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Campaign Duration (Days) <span className="text-red-500">*</span></span>
                    <Select rightIcon={<ChevronDown />} bgClass="bg-neutral-700 text-white">
                        <option
                            value=""
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            Select a days
                        </option>
                        <option
                            value="id"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            1
                        </option>
                        <option
                            value="us"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            2
                        </option>
                        <option
                            value="jp"
                            className="bg-neutral-800 text-white px-4"
                            style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                        >
                            3
                        </option>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-white">Use of Funds <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="How will you use the raised funds? Break down by percentage or amount."
                    bgClass="bg-neutral-700"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Security Type <span className="text-red-500">*</span></span>
                <Select rightIcon={<ChevronDown />} bgClass="bg-neutral-700 text-white">
                    <option
                        value=""
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        Tokenized SPV (Recomended)
                    </option>
                    <option
                        value="id"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        1
                    </option>
                    <option
                        value="us"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        2
                    </option>
                    <option
                        value="jp"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        3
                    </option>
                </Select>
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