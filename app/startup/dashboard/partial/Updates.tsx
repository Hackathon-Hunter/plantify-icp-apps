"use client"

import React, { useState } from "react";
import { Project } from "@/service/declarations/plantify-backend.did";

import { Button } from "@/components/ui/button";

import PostUpdateModal from "./PostUpdateModal";

import {
    Plus,
    Eye,
    SquarePen
} from "lucide-react";

interface UpdatesProps {
    project?: Project;
}

export default function Updates({ project }: UpdatesProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-neutral-900 p-4 w-full h-fit">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-xl text-white">Post Update</span>
                    <Button
                        onClick={() => setOpenModal(true)}
                        iconLeft={<Plus />}
                        size="lg"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-2 sm:mt-0 w-fit"
                    >
                        New Update
                    </Button>
                </div>

                <div className="border-2 border-dashed border-neutral-600 my-4"></div>

                <p className="text-neutral-500">
                    Keep your investors engaged by sharing regular updates about your progress,
                    milestones, and company news.
                </p>
                <p className="text-yellow-300">
                    Update will be sent to all {project?.investorCount.toString() || "0"} investor{(project?.investorCount || 0) !== BigInt(1) ? "s" : ""} via email and shown in their dashboard
                </p>
            </div>

            {/* Previous Update */}
            <div className="bg-neutral-900 p-4 w-full">
                <span className="text-xl text-white">Previous Update</span>
                <div className="border-2 border-dashed border-neutral-600 my-4"></div>

                <div className="flex flex-col gap-4">
                    {[1, 2].map((_, i) => (
                        <div key={i} className="bg-neutral-700 p-4">
                            <div className="flex justify-between">
                                <span className="text-white">Beta Testing Complete</span>
                                <span className="text-white text-neutral-500 text-xs">10/01/2025</span>
                            </div>
                            <span className="text-white text-neutral-500 text-xs">
                                We’ve successfully completed our beta testing phase with over 500 users
                            </span>

                            <div className="flex flex-wrap gap-3">
                                <Button
                                    iconLeft={<Eye />}
                                    size="lg"
                                    className="bg-transparent border border-white text-white hover:bg-white hover:text-black text-sm px-4 py-4 mt-4 w-fit"
                                >
                                    View
                                </Button>
                                <Button
                                    iconLeft={<SquarePen />}
                                    size="lg"
                                    className="bg-transparent border border-white text-white hover:bg-white hover:text-black text-sm px-4 py-4 mt-4 w-fit"
                                >
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PostUpdateModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={() => {
                    setOpenModal(false);
                }}
            />
        </div>
    )
}