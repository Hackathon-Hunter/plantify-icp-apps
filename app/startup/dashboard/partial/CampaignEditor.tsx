"use client"

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { UploadFileButton } from '@/components/ui/UploadFileButton';
import EditStartupModal from "./EditStartupModal";

import {
    SquarePen
} from "lucide-react";

export default function Overview() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-3 w-full lg:w-2/3">
                <div className="flex flex-col gap-3 bg-neutral-900 p-4 w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <span className="text-xl text-white">Startup Content</span>
                        <Button
                            onClick={() => setOpenModal(true)}
                            iconLeft={<SquarePen />}
                            size="lg"
                            className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-fit"
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="border-2 border-dashed border-neutral-600"></div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-white">Problem</span>
                            <small className="text-neutral-500">
                                Traditional language learning apps use a one-size-fits-all approach
                            </small>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-white">Solution</span>
                            <small className="text-neutral-500">
                                LinguaLearn uses advanced AI to create personalized learning path
                            </small>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-white">Problem</span>
                            <small className="text-neutral-500">
                                Traditional language learning apps use a one-size-fits-all approach
                            </small>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 bg-neutral-900 p-4 w-full">
                    <span className="text-xl text-white">Use of Funds</span>
                    <div className="border-2 border-dashed border-neutral-600"></div>

                    {["Product Development", "Marketing", "Team Expansion", "Operations"].map((item, idx) => (
                        <div className="flex flex-col gap-2" key={idx}>
                            <div className="flex justify-between">
                                <span className="text-white font-semibold">{item}</span>
                                <span className="text-white">50%</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-500 mt-2">
                                <div
                                    className="h-full bg-white"
                                    style={{ width: `${(85000 / 150000) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="border-2 border-dashed border-neutral-600 mt-2"></div>
                    <div className="flex justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-white">50%</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 bg-neutral-900 p-4 w-full lg:w-1/3">
                <div className="border-2 border-dashed border-neutral-600 mb-2"></div>
                {[
                    { title: "Pitch Deck", desc: "Upload your presentation (PDF, max 10MB)" },
                    { title: "Demo Video", desc: "Product demo or pitch video (MP4, Max 100MB)" },
                    { title: "Financials", desc: "PDF, max 5MB" },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full"
                    >
                        <span className="text-white">{item.title}</span>
                        <span className="text-neutral-400 text-center text-sm">{item.desc}</span>

                        <UploadFileButton
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) console.log("Selected file:", file);
                            }}
                        />
                    </div>
                ))}
            </div>

            <EditStartupModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={() => {
                    setOpenModal(false);
                }}
            />
        </div>
    )
}