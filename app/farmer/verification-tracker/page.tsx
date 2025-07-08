'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  FileText,
  Search,
  MapPin,
  DollarSign,
  Award,
  Rocket,
} from "lucide-react";

const FarmerVerificationTracker = () => {
  const [overallProgress] = useState(33);

  const projectInfo = {
    projectId: "PLT-2025-001",
    farmer: "Ahmad Rizki",
    crop: "Rice",
    location: "Batu, Malang, East Java",
    fundingAmount: "$3,500",
  };

  const verificationSteps = [
    {
      id: 1,
      title: "Document Review",
      description: "Reviewing submitted documents and application forms",
      estimatedTime: "6-12 hours",
      completedTime: "8 hours",
      status: "completed",
      icon: FileText,
    },
    {
      id: 2,
      title: "Agricultural Assessment",
      description:
        "Evaluating farming plan, crop viability, and market analysis",
      estimatedTime: "12-24 hours",
      completedTime: "16 hours",
      status: "completed",
      icon: Search,
    },
    {
      id: 3,
      title: "Site Verification",
      description: "Physical inspection of farm location and infrastructure",
      estimatedTime: "1-2 days",
      currentDate: "January 4, 2025",
      status: "in-progress",
      icon: MapPin,
    },
    {
      id: 4,
      title: "Financial Validation",
      description: "Budget analysis and financial feasibility assessment",
      estimatedTime: "4-8 hours",
      status: "pending",
      icon: DollarSign,
    },
    {
      id: 5,
      title: "Final Approval",
      description: "Management review and final approval decision",
      estimatedTime: "2-4 hours",
      status: "pending",
      icon: Award,
    },
    {
      id: 6,
      title: "Investment Launched",
      description: "Project goes live on marketplace for investors",
      estimatedTime: "1-2 hours",
      status: "pending",
      icon: Rocket,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} className="text-black" />;
      case "in-progress":
        return <Clock size={20} className="text-black" />;
      case "pending":
        return <Clock size={20} className="text-gray-400" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return "Pending";
    }
  };

  const getStepStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "border-black bg-white";
      case "in-progress":
        return "border-black bg-gray-50";
      case "pending":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Verification Progress Tracker
        </h1>
        <p className="text-gray-600 text-sm">
          Track your investment setup verification by our expert team
        </p>
      </div>

      {/* Overall Progress */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
          <div className="text-2xl font-bold">{overallProgress}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-black h-4 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600">Completion overdue</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Project Summary */}
        <Card className="border-2 border-black">
          <CardHeader className="border-b border-black">
            <CardTitle className="text-xl font-bold">Project Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Project ID</p>
                <p className="font-semibold">{projectInfo.projectId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Farmer</p>
                <p className="font-semibold">{projectInfo.farmer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Crop & Location
                </p>
                <p className="font-semibold">{projectInfo.crop}</p>
                <p className="text-sm text-gray-600">{projectInfo.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Funding Amount
                </p>
                <p className="font-semibold">{projectInfo.fundingAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <Card
                key={step.id}
                className={`border-2 ${getStepStyle(step.status)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Icon */}
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center
                        ${
                          step.status === "completed"
                            ? "bg-black text-white border-black"
                            : step.status === "in-progress"
                            ? "bg-white text-black border-black"
                            : "bg-gray-100 text-gray-400 border-gray-300"
                        }
                      `}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle size={20} />
                        ) : (
                          <StepIcon size={20} />
                        )}
                      </div>
                      {index < verificationSteps.length - 1 && (
                        <div
                          className={`
                          w-0.5 h-8
                          ${
                            step.status === "completed"
                              ? "bg-black"
                              : "bg-gray-300"
                          }
                        `}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {step.title}
                            {step.status === "in-progress" && (
                              <span className="text-xs bg-black text-white px-2 py-1 rounded">
                                IN PROGRESS
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {step.description}
                          </p>

                          {/* Time Information */}
                          <div className="mt-2 text-sm">
                            {step.status === "completed" &&
                              step.completedTime && (
                                <p className="text-gray-500">
                                  Estimated time: {step.estimatedTime}{" "}
                                  (Completed in: {step.completedTime})
                                </p>
                              )}
                            {step.status === "in-progress" && (
                              <>
                                <p className="text-gray-500">
                                  Estimated time: {step.estimatedTime}
                                </p>
                                {step.currentDate && (
                                  <p className="text-black font-medium">
                                    {step.currentDate}
                                  </p>
                                )}
                              </>
                            )}
                            {step.status === "pending" && (
                              <p className="text-gray-500">
                                Estimated time: {step.estimatedTime}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(step.status)}
                          <span
                            className={`
                            text-sm font-medium
                            ${
                              step.status === "completed"
                                ? "text-black"
                                : step.status === "in-progress"
                                ? "text-black"
                                : "text-gray-400"
                            }
                          `}
                          >
                            {getStatusText(step.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Contact Support
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 border border-black">
            View Project Details
          </Button>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Update Information
          </Button>
        </div>

        {/* Additional Information */}
        <Card className="border border-gray-300">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Need Help?</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                • If you have questions about the verification process, contact
                our support team
              </p>
              <p>
                • Verification times may vary based on complexity and document
                completeness
              </p>
              <p>
                • You will receive email notifications for each completed step
              </p>
              <p>
                • Site verification appointments will be scheduled via phone or
                email
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerVerificationTracker;
