"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import {
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    Plus,
    Trash2
} from "lucide-react";

export default function FundingDetails({ nextStep, prevStep, formData, updateFormData }: StepComponentProps) {
    const [form, setForm] = useState({
        fundingGoal: formData?.fundingGoal || 0,
        minimumFunding: formData?.minimumFunding || 0,
        companyValuation: formData?.companyValuation || 0,
        minInvestment: formData?.minInvestment || 0,
        expectedROI: formData?.expectedROI || '',
        riskLevel: formData?.riskLevel || 'Medium',
        useOfFunds: formData?.useOfFunds && formData.useOfFunds.length > 0
            ? formData.useOfFunds
            : [{ category: '', amount: 0, percentage: 0, description: '' }]
    });

    const handleChange = <T extends string | number | boolean>(field: keyof typeof form, value: T) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddFundUse = () => {
        setForm(prev => ({
            ...prev,
            useOfFunds: [...prev.useOfFunds, { category: '', amount: 0, percentage: 0, description: '' }]
        }));
    };

    const handleRemoveFundUse = (index: number) => {
        setForm(prev => ({
            ...prev,
            useOfFunds: prev.useOfFunds.filter((_, i) => i !== index)
        }));
    };

    // Update the handleFundUseChange function to better handle string inputs
    const handleFundUseChange = (index: number, field: 'category' | 'amount' | 'percentage' | 'description', value: string | number) => {
        const updated = [...form.useOfFunds];
        
        // Handle string/number conversions properly
        let processedValue: string | number = value;
        if ((field === 'amount' || field === 'percentage') && typeof value === 'string') {
            // Remove non-numeric characters except for decimal point
            const cleanValue = value.replace(/[^\d.]/g, '');
            // Convert to number if it's a valid number, otherwise keep as is
            processedValue = cleanValue === '' ? 0 : parseFloat(cleanValue) || 0;
        }
        
        updated[index] = {
            ...updated[index],
            [field]: processedValue
        };
        
        setForm(prev => ({
            ...prev,
            useOfFunds: updated
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

    return (
        <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
            <span className="text-xl text-white">Funding Details</span>
            <span className="text-neutral-500">Set your funding goals and terms</span>

            <div className="border border-dashed border-neutral-600"></div>

            <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Funding Goal (USD) <span className="text-red-500">*</span></span>
                    <Input 
                        placeholder="150000" 
                        bgClass="bg-neutral-700 text-white"
                        value={form.fundingGoal === 0 ? '' : form.fundingGoal}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            console.log("Raw funding goal value:", rawValue);
                            const numValue = rawValue === '' ? 0 : parseFloat(rawValue) || 0;
                            
                            setForm(prev => ({
                                ...prev,
                                fundingGoal: numValue
                            }));
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Minimum Funding (USD) <span className="text-red-500">*</span></span>
                    <Input 
                        placeholder="50000" 
                        bgClass="bg-neutral-700 text-white"
                        value={form.minimumFunding === 0 ? '' : form.minimumFunding}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const numValue = rawValue === '' ? 0 : parseFloat(rawValue) || 0;
                            
                            setForm(prev => ({
                                ...prev,
                                minimumFunding: numValue
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Company Valuation (USD) <span className="text-red-500">*</span></span>
                    <Input 
                        placeholder="1500000" 
                        bgClass="bg-neutral-700 text-white"
                        value={form.companyValuation === 0 ? '' : form.companyValuation}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const numValue = rawValue === '' ? 0 : parseFloat(rawValue) || 0;
                            
                            setForm(prev => ({
                                ...prev,
                                companyValuation: numValue
                            }));
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-white">Minimum Investment (USD) <span className="text-red-500">*</span></span>
                    <Input 
                        placeholder="1000" 
                        bgClass="bg-neutral-700 text-white"
                        value={form.minInvestment === 0 ? '' : form.minInvestment}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const numValue = rawValue === '' ? 0 : parseFloat(rawValue) || 0;
                            
                            setForm(prev => ({
                                ...prev,
                                minInvestment: numValue
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-white">Expected ROI <span className="text-red-500">*</span></span>
                <Input
                    placeholder="e.g., 15-20% annually"
                    bgClass="bg-neutral-700 text-white"
                    value={form.expectedROI}
                    onChange={(e) => handleChange('expectedROI', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="text-white">Risk Level <span className="text-red-500">*</span></span>
                <Select
                    rightIcon={<ChevronDown />}
                    bgClass="bg-neutral-700 text-white"
                    value={form.riskLevel}
                    onChange={(e) => handleChange('riskLevel', e.target.value)}
                >
                    <option
                        value="Low"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        Low
                    </option>
                    <option
                        value="Medium"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        Medium
                    </option>
                    <option
                        value="High"
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                    >
                        High
                    </option>
                </Select>
            </div>

            {/* Use of Funds Section */}
            <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-lg">Use of Funds <span className="text-red-500">*</span></span>
                    <Button
                        onClick={handleAddFundUse}
                        iconLeft={<Plus size={16} />}
                        size="sm"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-xs px-2 py-1"
                    >
                        Add Category
                    </Button>
                </div>
                <div className="bg-neutral-700 p-3 rounded-md mb-3">
                    <span className="text-neutral-300 text-sm">Break down how you will use the raised funds by category</span>
                </div>

                {form.useOfFunds.map((fund, index) => (
                    <div key={index} className="bg-neutral-700/50 p-4 rounded-md mb-2">
                        <div className="flex justify-between mb-2">
                            <span className="text-white">Category {index + 1}</span>
                            {index > 0 && (
                                <Button
                                    onClick={() => handleRemoveFundUse(index)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 p-1 h-auto"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Category Name</span>
                                <Input
                                    placeholder="e.g., Marketing, Development"
                                    bgClass="bg-neutral-800 text-white"
                                    value={fund.category}
                                    onChange={(e) => handleFundUseChange(index, 'category', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Amount (USD)</span>
                                <Input
                                    placeholder="25000"
                                    bgClass="bg-neutral-800 text-white"
                                    value={fund.amount === 0 ? '' : fund.amount}
                                    onChange={(e) => {
                                        // Just store the raw value for now
                                        const rawValue = e.target.value;
                                        console.log("Raw amount value:", rawValue);
                                        
                                        // Update the state directly
                                        const updatedFunds = [...form.useOfFunds];
                                        updatedFunds[index] = {
                                            ...updatedFunds[index],
                                            amount: rawValue === '' ? 0 : parseFloat(rawValue) || 0
                                        };
                                        
                                        setForm(prev => ({
                                            ...prev,
                                            useOfFunds: updatedFunds
                                        }));
                                        
                                        // Calculate percentage if possible
                                        if (form.fundingGoal > 0 && rawValue) {
                                            const numValue = parseFloat(rawValue) || 0;
                                            const percentage = (numValue / form.fundingGoal) * 100;
                                            
                                            updatedFunds[index] = {
                                                ...updatedFunds[index],
                                                percentage: parseFloat(percentage.toFixed(2))
                                            };
                                            
                                            setForm(prev => ({
                                                ...prev,
                                                useOfFunds: updatedFunds
                                            }));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Percentage</span>
                                <div className="flex items-center">
                                    <Input
                                        placeholder="25"
                                        bgClass="bg-neutral-800 text-white"
                                        value={fund.percentage === 0 ? '' : fund.percentage}
                                        onChange={(e) => {
                                            // Just store the raw value for now
                                            const rawValue = e.target.value;
                                            console.log("Raw percentage value:", rawValue);
                                            
                                            // Update the state directly
                                            const updatedFunds = [...form.useOfFunds];
                                            updatedFunds[index] = {
                                                ...updatedFunds[index],
                                                percentage: rawValue === '' ? 0 : parseFloat(rawValue) || 0
                                            };
                                            
                                            setForm(prev => ({
                                                ...prev,
                                                useOfFunds: updatedFunds
                                            }));
                                        }}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                    <span className="ml-2 text-white">%</span>
                                </div>
                                <span className="text-xs text-neutral-400 mt-1">
                                    {form.fundingGoal > 0 ? 'Auto-calculated from amount' : 'Enter funding goal to auto-calculate'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">Description</span>
                                <Textarea
                                    placeholder="Brief description of how these funds will be used"
                                    bgClass="bg-neutral-800"
                                    value={fund.description}
                                    onChange={(e) => handleFundUseChange(index, 'description', e.target.value)}
                                />
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