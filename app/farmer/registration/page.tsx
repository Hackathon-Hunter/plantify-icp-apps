'use client'

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Upload,
  CheckCircle,
  User,
  CreditCard,
  X,
  AlertCircle,
} from "lucide-react";
import { useFarmerRegistration } from './handlers';

const FarmerRegistration = () => {
  const {
    // State
    currentStep,
    formData,
    documents,
    isSubmitting,
    error,

    // Validation
    isStepValid,

    // Refs
    governmentIdInputRef,
    selfieInputRef,

    // Handlers
    handleInputChange,
    handleFileUpload,
    handleRemoveFile,
    handleNext,
    handlePrevious,
    handleSubmitRegistration,
    triggerGovernmentIdUpload,
    triggerSelfieUpload,
    takeSelfie,
    navigateToDashboard,
  } = useFarmerRegistration();

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Government ID Photo", icon: CreditCard },
    { number: 3, title: "Selfie Photo", icon: Camera },
    { number: 4, title: "Registration Complete", icon: CheckCircle },
  ];

  const ProgressIndicator = useMemo(() => (
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
  ), [currentStep]);

  const PersonalInformationStep = useMemo(() => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold">
          Personal Information
        </CardTitle>
        <p className="text-sm text-gray-600">
          Join Plantify to connect with investors and grow your agricultural
          projects
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <Input
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="john@example.com"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <Input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            placeholder="+62812345678"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Government ID (Passport/National ID) *
          </label>
          <Input
            value={formData.governmentId}
            onChange={(e) => handleInputChange("governmentId", e.target.value)}
            placeholder="ID Number"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={!isStepValid}
            className="bg-black text-white hover:bg-gray-800 border border-black disabled:bg-gray-400 disabled:border-gray-400"
          >
            Next →
          </Button>
        </div>
      </CardContent>
    </Card>
  ), [formData, handleInputChange, handleNext, isStepValid, error]);

  const DocumentUploadStep = useMemo(() => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold">Government ID Photo</CardTitle>
        <p className="text-sm text-gray-600">
          Please upload a clear photo of your passport or national ID card
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div 
          className="border-2 border-dashed border-black rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          onClick={triggerGovernmentIdUpload}
        >
          {documents.governmentIdPhoto.preview ? (
            <div className="relative">
              <img 
                src={documents.governmentIdPhoto.preview} 
                alt="Government ID" 
                className="max-w-full max-h-48 mx-auto rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile('governmentIdPhoto');
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-sm font-medium mb-2">Click to upload photo</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </>
          )}
        </div>

        <input
          ref={governmentIdInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload('governmentIdPhoto', e.target.files)}
          className="hidden"
        />

        <div className="flex justify-between pt-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid}
            className="bg-black text-white hover:bg-gray-800 border border-black disabled:bg-gray-400 disabled:border-gray-400"
          >
            Next →
          </Button>
        </div>
      </CardContent>
    </Card>
  ), [
    documents.governmentIdPhoto,
    error,
    triggerGovernmentIdUpload,
    handleFileUpload,
    handleRemoveFile,
    handleNext,
    handlePrevious,
    isStepValid,
    governmentIdInputRef,
  ]);

  const SelfieStep = useMemo(() => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold">Selfie Photo</CardTitle>
        <p className="text-sm text-gray-600">
          Take a selfie or upload a recent photo of yourself for verification
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div 
          className="border-2 border-dashed border-black rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          onClick={triggerSelfieUpload}
        >
          {documents.selfiePhoto.preview ? (
            <div className="relative">
              <img 
                src={documents.selfiePhoto.preview} 
                alt="Selfie" 
                className="max-w-full max-h-48 mx-auto rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile('selfiePhoto');
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              <Camera size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-sm font-medium mb-2">Take a selfie</p>
              <p className="text-xs text-gray-500">
                Click here to use camera or upload photo
              </p>
            </>
          )}
        </div>

        <input
          ref={selfieInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload('selfiePhoto', e.target.files)}
          className="hidden"
        />

        <div className="flex gap-2">
          <Button
            onClick={takeSelfie}
            variant="outline"
            className="flex-1 border-black text-black hover:bg-gray-100"
          >
            <Camera size={16} className="mr-2" />
            Use Camera
          </Button>
          <Button
            onClick={triggerSelfieUpload}
            variant="outline"
            className="flex-1 border-black text-black hover:bg-gray-100"
          >
            <Upload size={16} className="mr-2" />
            Upload Photo
          </Button>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Previous
          </Button>
          <Button
            onClick={handleSubmitRegistration}
            disabled={!isStepValid || isSubmitting}
            className="bg-black text-white hover:bg-gray-800 border border-black disabled:bg-gray-400 disabled:border-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  ), [
    documents.selfiePhoto,
    error,
    triggerSelfieUpload,
    handleFileUpload,
    handleRemoveFile,
    takeSelfie,
    handlePrevious,
    handleSubmitRegistration,
    isStepValid,
    isSubmitting,
    selfieInputRef,
  ]);

  const CompletionStep = useMemo(() => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <CheckCircle size={64} className="mx-auto mb-4 text-black" />
        <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
        <p className="text-gray-600 mb-6">
          Your farmer registration has been submitted successfully. We&apos;ll review
          your information and notify you once your account is verified.
        </p>

        <div className="text-left space-y-2 mb-6 bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold">What&apos;s Next?</h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Account verification (2-3 business days)</li>
            <li>• Access to farmer dashboard</li>
            <li>• Create your first agricultural project</li>
            <li>• Connect with potential investors</li>
          </ul>
        </div>

        <Button 
          className="w-full bg-black text-white hover:bg-gray-800 border border-black" 
          onClick={navigateToDashboard}
        >
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  ), [navigateToDashboard]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return PersonalInformationStep;
      case 2:
        return DocumentUploadStep;
      case 3:
        return SelfieStep;
      case 4:
        return CompletionStep;
      default:
        return PersonalInformationStep;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">PLANTIFY</h1>
        <h2 className="text-xl font-semibold">Farmer Registration Center</h2>
        <p className="text-gray-600 text-sm">
          Join Plantify to connect with investors and grow your agricultural
          projects
        </p>
      </div>

      {/* Progress Indicator */}
      {ProgressIndicator}

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};

export default FarmerRegistration;
