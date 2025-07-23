'use client'

import React, { useState, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface Step {
    id: number;
    label: string;
    component: ReactElement;
}

interface MultiStepFormProps {
    steps: Step[];
}

export default function MultiStepForm({ steps }: MultiStepFormProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                    <button
                        key={step.id}
                        className={cn(
                            "px-3 py-2 rounded text-sm whitespace-nowrap transition-colors flex gap-2 items-center w-full",
                            index === currentStep
                                ? "bg-neutral-800 text-white"
                                : "text-white"
                        )}
                    >
                        <span className="bg-neutral-700 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs shrink-0">
                            {index + 1}
                        </span>
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">{step.label}</span>
                    </button>
                ))}
            </div>

            <div>
                {React.cloneElement(StepComponent, { nextStep, prevStep })}
            </div>
        </div>
    );
}
