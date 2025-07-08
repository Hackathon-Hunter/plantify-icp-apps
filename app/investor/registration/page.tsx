'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, User, TrendingUp } from "lucide-react";

const InvestorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const steps = [
    { number: 1, title: "Basic Information", icon: User },
    { number: 2, title: "Registration Complete", icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`
              w-12 h-12 rounded-full border-2 flex items-center justify-center
              ${
                currentStep >= step.number
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }
            `}
            >
              <step.icon size={20} />
            </div>
            <span className="text-xs mt-2 text-center max-w-20">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
              w-16 h-0.5 mx-2 mt-6
              ${currentStep > step.number ? "bg-black" : "bg-gray-300"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const BasicInformationStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold">
          Investor Registration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Join Plantify to discover and invest in agricultural projects
          worldwide
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Why Invest with Plantify?
          </h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span>Direct investment in real agricultural projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span>Transparent profit sharing through blockchain NFTs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span>Support sustainable farming practices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
              <span>Track your investments in real-time</span>
            </li>
          </ul>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-2">
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="rounded border-black mt-1" />
            <span className="text-sm">
              I agree to the{" "}
              <span className="underline">Terms & Conditions</span> and{" "}
              <span className="underline">Privacy Policy</span>
            </span>
          </label>
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="rounded border-black mt-1" />
            <span className="text-sm">
              I want to receive updates about new investment opportunities
            </span>
          </label>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            className="bg-black text-white hover:bg-gray-800 border border-black"
            disabled={!formData.fullName || !formData.email}
          >
            Create Account →
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CompletionStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <CheckCircle size={64} className="mx-auto mb-4 text-black" />
        <h2 className="text-2xl font-bold mb-2">Welcome to Plantify!</h2>
        <p className="text-gray-600 mb-6">
          Your investor account has been created successfully. You can now
          explore and invest in agricultural projects from verified farmers.
        </p>

        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="border border-black rounded p-4 text-left">
            <div className="text-2xl mb-2">🌱</div>
            <h3 className="font-semibold">Browse Projects</h3>
            <p className="text-sm text-gray-600">
              Discover investment opportunities in agriculture
            </p>
          </div>

          <div className="border border-black rounded p-4 text-left">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold">Invest with NFTs</h3>
            <p className="text-sm text-gray-600">
              Purchase NFT shares in farming projects
            </p>
          </div>

          <div className="border border-black rounded p-4 text-left">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold">Track Returns</h3>
            <p className="text-sm text-gray-600">
              Monitor your investments and receive profits
            </p>
          </div>
        </div>

        <div className="text-left bg-gray-50 p-4 rounded border mb-6">
          <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Complete your investor profile (optional)</li>
            <li>• Browse available agricultural projects</li>
            <li>• Set up your digital wallet for investments</li>
            <li>• Start investing in verified farm projects</li>
            <li>• Track your portfolio and earnings</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-black text-white hover:bg-gray-800 border border-black">
            Explore Projects
          </Button>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep />;
      case 2:
        return <CompletionStep />;
      default:
        return <BasicInformationStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">PLANTIFY</h1>
        <h2 className="text-xl font-semibold">Investor Registration</h2>
        <p className="text-gray-600 text-sm">
          Start your journey in agricultural investment
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};

export default InvestorRegistration;
