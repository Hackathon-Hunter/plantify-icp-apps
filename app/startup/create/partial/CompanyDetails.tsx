"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import {
    ArrowRight,
    ArrowLeft,
    Plus,
    Trash2,
    Calendar
} from "lucide-react";

export default function CompanyDetails({ nextStep, prevStep, formData, updateFormData }: StepComponentProps) {
    const [form, setForm] = useState({
        problem: formData?.problem || '',
        solution: formData?.solution || '',
        marketOpportunity: formData?.marketOpportunity || '',
        timeline: formData?.timeline || '',
        milestones: formData?.milestones && formData.milestones.length > 0 
            ? formData.milestones 
            : [{
                title: '',
                description: '',
                fundingRequired: 0,
                completed: false,
                targetDate: undefined,
                completedDate: undefined
            }]
    });

    // Character limit for timeline
    const TIMELINE_CHAR_LIMIT = 50;
    const timelineCharsLeft = TIMELINE_CHAR_LIMIT - form.timeline.length;

    const handleChange = (field: keyof typeof form, value: string) => {
        // If field is timeline, enforce char limit
        if (field === 'timeline' && value.length > TIMELINE_CHAR_LIMIT) {
            return;
        }
        
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddMilestone = () => {
        setForm(prev => ({
            ...prev,
            milestones: [...prev.milestones, { 
                title: '', 
                description: '', 
                fundingRequired: 0,
                completed: false,
                targetDate: undefined,
                completedDate: undefined
            }]
        }));
    };

    const handleRemoveMilestone = (index: number) => {
        setForm(prev => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index)
        }));
    };

    const handleMilestoneChange = (
        index: number, 
        field: 'title' | 'description' | 'fundingRequired' | 'completed' | 'targetDate' | 'completedDate', 
        value: string | number | boolean | Date | undefined
    ) => {
        const updated = [...form.milestones];
        
        if (field === 'fundingRequired' && typeof value === 'string') {
            value = parseFloat(value) || 0;
        }
        
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        
        setForm(prev => ({
            ...prev,
            milestones: updated
        }));
    };

    // Save form data when navigating away
    const handleNext = () => {
        if (updateFormData) {
            updateFormData(form);
        }
        if (nextStep) {
            nextStep();
        }
    };

    const handlePrevious = () => {
        if (updateFormData) {
            updateFormData(form);
        }
        if (prevStep) {
            prevStep();
        }
    };

    // Format date as YYYY-MM-DD for input
    const formatDateForInput = (date?: Date) => {
        if (!date) return "";
        return date instanceof Date ? date.toISOString().split('T')[0] : "";
    };

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Company Details</span>
            <span className="text-neutral-500">Tell us about your company and what you&apos;re building</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex flex-col gap-2">
                <span className="text-white">The Problem <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="What problem are you solving? Why is this important?"
                    bgClass="bg-neutral-700"
                    value={form.problem}
                    onChange={(e) => handleChange('problem', e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Your Solution <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="How does your product/service solve this problem?"
                    bgClass="bg-neutral-700"
                    value={form.solution}
                    onChange={(e) => handleChange('solution', e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Market Opportunity <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="Describe your target market and the opportunity size"
                    bgClass="bg-neutral-700"
                    value={form.marketOpportunity}
                    onChange={(e) => handleChange('marketOpportunity', e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-white">Timeline <span className="text-red-500">*</span></span>
                <Textarea
                    placeholder="Describe your overall project timeline (max 50 chars)"
                    bgClass="bg-neutral-700"
                    value={form.timeline}
                    onChange={(e) => handleChange('timeline', e.target.value)}
                />
                <div className={`text-xs text-right ${timelineCharsLeft < 10 ? 'text-red-400' : 'text-neutral-400'}`}>
                    {timelineCharsLeft} characters left
                </div>
            </div>

            {/* Milestones Section */}
            <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-lg">Project Milestones <span className="text-red-500">*</span></span>
                    <Button
                        onClick={handleAddMilestone}
                        iconLeft={<Plus size={16} />}
                        size="sm"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-xs px-2 py-1"
                    >
                        Add Milestone
                    </Button>
                </div>
                <div className="bg-neutral-700 p-3 rounded-md mb-3">
                    <span className="text-neutral-300 text-sm">Define key project milestones with funding requirements and dates</span>
                </div>

                {form.milestones.map((milestone, index) => (
                    <div key={index} className="bg-neutral-700/50 p-4 rounded-md mb-2">
                        <div className="flex justify-between mb-2">
                            <span className="text-white">Milestone {index + 1}</span>
                            {index > 0 && (
                                <Button
                                    onClick={() => handleRemoveMilestone(index)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 p-1 h-auto"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-3 mb-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Milestone Title <span className="text-red-500">*</span></span>
                                <Input
                                    placeholder="e.g., Land Acquisition & Preparation"
                                    bgClass="bg-neutral-800 text-white"
                                    value={milestone.title}
                                    onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Description <span className="text-red-500">*</span></span>
                                <Textarea
                                    placeholder="e.g., Secure 5 hectares of highland terrain and complete soil analysis"
                                    bgClass="bg-neutral-800"
                                    value={milestone.description}
                                    onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-2">
                                    <span className="text-neutral-300 text-sm">Funding Required (USD) <span className="text-red-500">*</span></span>
                                    <Input
                                        placeholder="1000000 (in cents, e.g. $10,000)"
                                        bgClass="bg-neutral-800 text-white"
                                        value={milestone.fundingRequired === 0 ? '' : milestone.fundingRequired}
                                        onChange={(e) => handleMilestoneChange(index, 'fundingRequired', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-neutral-300 text-sm">Target Date</span>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-neutral-400" />
                                        <Input
                                            type="date"
                                            bgClass="bg-neutral-800 text-white"
                                            value={formatDateForInput(milestone.targetDate)}
                                            onChange={(e) => {
                                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                                handleMilestoneChange(index, 'targetDate', date);
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-400 mt-1">
                                        Format: YYYY-MM-DD (e.g., 2024-11-01)
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                <div className="flex flex-col gap-2">
                                    <span className="text-neutral-300 text-sm">Status</span>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`milestone-${index}-completed`}
                                            checked={milestone.completed}
                                            onChange={(e) => handleMilestoneChange(index, 'completed', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 bg-neutral-800 border-neutral-600 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor={`milestone-${index}-completed`} className="text-white">
                                            Completed
                                        </label>
                                    </div>
                                </div>
                                {milestone.completed && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-neutral-300 text-sm">Completion Date</span>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-neutral-400" />
                                            <Input
                                                type="date"
                                                bgClass="bg-neutral-800 text-white"
                                                // value={formatDateForInput(milestone.completedDate)}
                                                onChange={(e) => {
                                                    const date = e.target.value ? new Date(e.target.value) : undefined;
                                                    handleMilestoneChange(index, 'completedDate', date);
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-400 mt-1">
                                            Format: YYYY-MM-DD (e.g., 2024-08-01)
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
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