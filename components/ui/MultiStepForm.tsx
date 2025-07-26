"use client";

import React, { useState, ReactElement, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Industry,
  ProjectType,
} from "@/service/declarations/plantify-backend.did";

interface Step {
  id: number;
  label: string;
  component: ReactElement;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit?: (formData: ProjectFormData) => void;
}

export interface ProjectFormData {
  companyName: string;
  industry: Industry | null;
  projectType: ProjectType | null;
  companyTagline: string;
  location: string;
  website?: string;
  problem: string;
  solution: string;
  marketOpportunity: string;
  fundingGoal: number;
  companyValuation: number;
  minInvestment: number;
  maxInvestment?: number;
  expectedROI: string;
  riskLevel: string;
  timeline: string;
  useOfFunds: Array<{
    category: string;
    amount: number;
    percentage: number;
    description: string;
  }>;
  teamMembers: Array<{
    name: string;
    role: string;
    bio?: string;
    imageUrl?: string;
    linkedinUrl?: string;
  }>;
  milestones: Array<{
    title: string;
    description: string;
    fundingRequired: number;
    targetDate?: Date;
    completed: boolean;
  }>;
  productImages: string[];
  companyLogo?: string;
  pitchDeckUrl?: string;
  demoVideoUrl?: string;
  tags: string[];
  minimumFunding: number;
}

// Define step component props to fix type issue
export interface StepComponentProps {
  nextStep?: () => void;
  prevStep?: () => void;
  formData?: ProjectFormData;
  updateFormData?: (data: Partial<ProjectFormData>) => void;
  handleSubmit?: () => void;
}

export default function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({
    companyName: "",
    industry: null,
    companyTagline: "",
    location: "",
    website: "",
    problem: "",
    solution: "",
    marketOpportunity: "",
    fundingGoal: 0,
    companyValuation: 0,
    minInvestment: 0,
    expectedROI: "",
    riskLevel: "Medium",
    timeline: "",
    projectType: null,
    useOfFunds: [],
    teamMembers: [],
    milestones: [],
    productImages: [],
    tags: [],
    minimumFunding: 0,
  });

  // Debug logging to track step changes and data updates
  useEffect(() => {
    console.log(
      `Current step: ${currentStep}, Step name: ${steps[currentStep].label}`
    );
    console.log("Current form data:", formData);
  }, [currentStep, formData, steps]);

  const nextStep = () => {
    console.log("Moving to next step with data:", formData);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    console.log("Moving to previous step with data:", formData);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting form with data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const updateFormData = (data: Partial<ProjectFormData>) => {
    console.log("Updating form data:", data);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    const StepComponent = steps[currentStep].component;
    const props: StepComponentProps = {
      nextStep,
      prevStep,
      formData,
      updateFormData,
      handleSubmit: currentStep === steps.length - 1 ? handleSubmit : undefined,
    };

    return React.cloneElement(StepComponent, props);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={cn(
              "px-3 py-2 rounded text-sm whitespace-nowrap transition-colors flex gap-2 items-center w-full",
              index === currentStep ? "bg-neutral-800 text-white" : "text-white"
            )}
          >
            <span className="bg-neutral-700 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs shrink-0">
              {index + 1}
            </span>
            <span className="truncate max-w-[120px] sm:max-w-[180px]">
              {step.label}
            </span>
          </button>
        ))}
      </div>

      <div>{renderCurrentStep()}</div>
    </div>
  );
}
