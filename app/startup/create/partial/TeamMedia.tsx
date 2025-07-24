"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { UploadFileButton } from '@/components/ui/UploadFileButton';

import {
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    Plus,
    Trash2
} from "lucide-react";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
}

export default function TeamMedia({ nextStep, prevStep }: Props) {
    const [members, setMembers] = useState([
        { name: '', role: '' }
    ]);

    const handleAddMember = () => {
        setMembers([...members, { name: '', role: '' }]);
    };

    const handleRemoveMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: 'name' | 'role', value: string) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);
    };

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Team & Media</span>
            <span className="text-neutral-500">Introduce your team and upload campaign materials</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex justify-between items-center">
                <span className="text-xl">Team Members</span>

                <Button
                    iconLeft={<Plus />}
                    size="lg"
                    onClick={handleAddMember}
                    className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                >
                    Add Member
                </Button>
            </div>

            {members.map((member, index) => (
                <div className="flex gap-3" key={index}>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Name <span className="text-red-500">*</span></span>
                        <Input
                            placeholder="Full name"
                            value={member.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            bgClass="bg-neutral-700 text-black"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Role <span className="text-red-500">*</span></span>
                        <div className="flex gap-2">
                            <Input
                                placeholder="CEO, CTO, etc."
                                value={member.role}
                                onChange={(e) => handleChange(index, 'role', e.target.value)}
                                bgClass="bg-neutral-700 text-black"
                            />
                            {index !== 0 && (
                                <Button
                                    onClick={() => handleRemoveMember(index)}
                                    size="lg"
                                    className="bg-neutral-700 text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-3 py-3 w-fit"
                                >
                                    <Trash2 className="text-red-500" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            <div className="flex flex-col gap-6 md:gap-4 md:flex-row">
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Pitch Deck</span>
                    <span className="text-neutral-400 text-center text-sm">Upload your presentation (PDF, max 10MB)</span>

                    <UploadFileButton
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                console.log('Selected file:', file);
                            }
                        }}
                    />
                </div>
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Demo Video</span>
                    <span className="text-neutral-400 text-center text-sm">Product demo or pitch video (MP4, Max 100MB)</span>

                    <UploadFileButton
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                console.log('Selected file:', file);
                            }
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-4 md:flex-row mt-4">
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Company Logo</span>
                    <span className="text-neutral-400 text-center text-sm">High-resolution logo (PNG/JPG, max 5MB)</span>

                    <UploadFileButton
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                console.log('Selected file:', file);
                            }
                        }}
                    />
                </div>
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Product Images</span>
                    <span className="text-neutral-400 text-center text-sm">Screenshots or photos (Multiple files allowed)</span>

                    <UploadFileButton
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                console.log('Selected file:', file);
                            }
                        }}
                    />
                </div>
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