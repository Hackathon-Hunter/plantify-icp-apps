"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadFileButton } from '@/components/ui/UploadFileButton';
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import {
    ArrowRight,
    ArrowLeft,
    Plus,
    Trash2
} from "lucide-react";

export default function TeamMedia({ nextStep, prevStep, formData, updateFormData }: StepComponentProps) {
    const [members, setMembers] = useState(
        formData?.teamMembers && formData.teamMembers.length > 0 
            ? formData.teamMembers 
            : [{ name: '', role: '' }]
    );
    
    const [media, setMedia] = useState({
        pitchDeckUrl: formData?.pitchDeckUrl || '',
        demoVideoUrl: formData?.demoVideoUrl || '',
        companyLogo: formData?.companyLogo || '',
        productImages: formData?.productImages || []
    });

    const handleAddMember = () => {
        setMembers([...members, { name: '', role: '' }]);
    };

    const handleRemoveMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleMemberChange = (index: number, field: keyof typeof members[0], value: string) => {
        const updated = [...members];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setMembers(updated);
    };
    
    const handleMediaChange = (field: keyof typeof media, value: string | string[]) => {
        setMedia(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // For demo purposes, just using URLs instead of actual file uploads
    const handleFileChange = (field: 'pitchDeckUrl' | 'demoVideoUrl' | 'companyLogo' | 'productImages', files: FileList | null) => {
        if (files && files.length > 0) {
            // In a real app, you'd upload these files to storage and get URLs
            const fileName = files[0].name;
            // For demo, just store the file name as if it were a URL
            handleMediaChange(field, `https://example.com/uploads/${fileName}`);
        }
    };

    // Save form data when navigating away
    const handleNext = () => {
        if (updateFormData) {
            updateFormData({
                teamMembers: members,
                ...media
            });
        }
        if (nextStep) {
            nextStep();
        }
    };

    const handlePrevious = () => {
        if (updateFormData) {
            updateFormData({
                teamMembers: members,
                ...media
            });
        }
        if (prevStep) {
            prevStep();
        }
    };

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Team & Media</span>
            <span className="text-neutral-500">Introduce your team and upload startup materials</span>

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
                            value={member.name || ''}
                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                            bgClass="bg-neutral-700 text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Role <span className="text-red-500">*</span></span>
                        <div className="flex gap-2">
                            <Input
                                placeholder="CEO, CTO, etc."
                                value={member.role || ''}
                                onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                                bgClass="bg-neutral-700 text-white"
                            />
                            {index !== 0 && (
                                <Button
                                    onClick={() => handleRemoveMember(index)}
                                    size="lg"
                                    className="bg-neutral-700 text-white hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-3 py-3 w-fit"
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
                        onChange={(e) => handleFileChange('pitchDeckUrl', e.target.files)}
                    />
                    {media.pitchDeckUrl && (
                        <span className="text-green-500 text-xs mt-2">File uploaded: {media.pitchDeckUrl.split('/').pop()}</span>
                    )}
                </div>
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Demo Video</span>
                    <span className="text-neutral-400 text-center text-sm">Product demo or pitch video (MP4, Max 100MB)</span>

                    <UploadFileButton
                        onChange={(e) => handleFileChange('demoVideoUrl', e.target.files)}
                    />
                    {media.demoVideoUrl && (
                        <span className="text-green-500 text-xs mt-2">File uploaded: {media.demoVideoUrl.split('/').pop()}</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-4 md:flex-row mt-4">
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Company Logo</span>
                    <span className="text-neutral-400 text-center text-sm">High-resolution logo (PNG/JPG, max 5MB)</span>

                    <UploadFileButton
                        onChange={(e) => handleFileChange('companyLogo', e.target.files)}
                    />
                    {media.companyLogo && (
                        <span className="text-green-500 text-xs mt-2">File uploaded: {media.companyLogo.split('/').pop()}</span>
                    )}
                </div>
                <div className="bg-neutral-700 flex flex-col gap-4 justify-center items-center p-4 w-full">
                    <span className="text-white">Product Images</span>
                    <span className="text-neutral-400 text-center text-sm">Screenshots or photos (Multiple files allowed)</span>

                    <UploadFileButton
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                // In a real app, you'd upload these files and get URLs back
                                const newImageUrls = Array.from(e.target.files).map(
                                    file => `https://example.com/uploads/${file.name}`
                                );
                                handleMediaChange('productImages', [...media.productImages, ...newImageUrls]);
                            }
                        }}
                    />
                    {media.productImages.length > 0 && (
                        <span className="text-green-500 text-xs mt-2">{media.productImages.length} images uploaded</span>
                    )}
                </div>
            </div>

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            <div className="flex justify-between">
                <Button
                    onClick={handlePrevious}
                    iconLeft={<ArrowLeft />}
                    size="lg"
                    className="bg-neutral-500 text-white hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                >
                    Previous
                </Button>
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