'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Copy,
} from "lucide-react";

const FarmPurchase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { number: 1, title: "Review", status: "completed" },
    {
      number: 2,
      title: "Wallet",
      status: currentStep >= 2 ? "completed" : "pending",
    },
    {
      number: 3,
      title: "Confirm",
      status: currentStep >= 3 ? "completed" : "pending",
    },
    {
      number: 4,
      title: "Processing",
      status: currentStep >= 4 ? "completed" : "pending",
    },
    {
      number: 5,
      title: "Success",
      status: currentStep >= 5 ? "completed" : "pending",
    },
  ];

  const projectData = {
    title: "Apple Orchard #001",
    location: "Batu, Malang Farms",
    timeline: "8 months",
    quantity: 1,
    availableNFTs: 57,
    nftPrice: 0.42,
    platformFee: 0.011,
    networkFee: 0.002,
    total: 0.432,
    expectedROI: "18%",
    riskLevel: "Low",
    harvestPeriod: "8 months",
    yourShare: "1% of harvest",
  };

  const transactionData = {
    hash: "0x3bc3c1...e4790f90",
    blockNumber: "1,234,567",
    network: "Internet Computer Protocol",
    totalPaid: "0.432 ICP",
    yourShares: "1% of Harvest",
  };

  const handleNext = () => {
    if (currentStep < 5) {
      if (currentStep === 3) {
        setIsProcessing(true);
        setCurrentStep(4);
        // Simulate processing time
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(5);
        }, 3000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep !== 4) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`
              w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
              ${
                step.status === "completed"
                  ? "bg-black text-white border-black"
                  : step.number === currentStep
                  ? "bg-white text-black border-black"
                  : "bg-gray-100 text-gray-400 border-gray-300"
              }
            `}
            >
              {step.status === "completed" ? (
                <CheckCircle size={16} />
              ) : (
                step.number
              )}
            </div>
            <span className="text-xs mt-1 text-center">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
              w-12 h-0.5 mx-1 mt-4
              ${step.status === "completed" ? "bg-black" : "bg-gray-300"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Review Purchase
  const ReviewStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Complete Your Purchase
          </CardTitle>
          <Button variant="outline" size="sm" className="border-gray-300 p-1">
            <X size={16} />
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Review your order before proceeding
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border border-black rounded flex items-center justify-center text-xl">
            🍎
          </div>
          <div>
            <h3 className="font-semibold">{projectData.title}</h3>
            <p className="text-sm text-gray-600">{projectData.location}</p>
            <p className="text-sm text-gray-600">{projectData.timeline}</p>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-black w-8 h-8 p-0"
            >
              -
            </Button>
            <Input
              value={projectData.quantity}
              className="w-16 text-center border-black"
              readOnly
            />
            <Button
              variant="outline"
              size="sm"
              className="border-black w-8 h-8 p-0"
            >
              +
            </Button>
            <span className="text-sm text-gray-600">
              Available: {projectData.availableNFTs} NFTs
            </span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h4 className="font-medium">Price Breakdown</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>NFT Price (1x):</span>
              <span>{projectData.nftPrice} ICP</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee (2.5%):</span>
              <span>{projectData.platformFee} ICP</span>
            </div>
            <div className="flex justify-between">
              <span>Network Fee:</span>
              <span>{projectData.networkFee} ICP</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-1">
              <span>Total:</span>
              <span>{projectData.total} ICP</span>
            </div>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-gray-50 p-3 rounded border">
          <h4 className="font-medium mb-2">Investment Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Expected ROI</span>
              <p className="font-semibold text-green-600">
                {projectData.expectedROI}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Risk Level</span>
              <p className="font-semibold">{projectData.riskLevel}</p>
            </div>
            <div>
              <span className="text-gray-600">Harvest Period</span>
              <p className="font-semibold">{projectData.harvestPeriod}</p>
            </div>
            <div>
              <span className="text-gray-600">Your Share</span>
              <p className="font-semibold">{projectData.yourShare}</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="text-xs text-gray-600">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>
              I agree to the Terms of Service and understand the risks
              associated with agricultural investments, including potential crop
              failure and market volatility.
            </span>
          </label>
        </div>

        <Button
          onClick={handleNext}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Continue to Payment
        </Button>
      </CardContent>
    </Card>
  );

  // Step 2 & 3: Confirm Transaction
  const ConfirmStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Confirm Transaction
          </CardTitle>
          <Button variant="outline" size="sm" className="border-gray-300 p-1">
            <X size={16} />
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Review and confirm your purchase details
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Wallet Status */}
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded border">
          <CheckCircle size={16} className="text-green-600" />
          <div>
            <p className="font-medium text-green-800">Wallet Connected</p>
            <p className="text-sm text-green-600">0x7d3a...4819 • 5.64 ICP</p>
          </div>
        </div>

        {/* Transaction Summary */}
        <div>
          <h4 className="font-medium mb-3">Transaction Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Item:</span>
              <span className="font-medium">{projectData.title} (x1)</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">{projectData.total} ICP</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="font-medium">Internet Computer Protocol</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Type:</span>
              <span className="font-medium">NFT Purchase</span>
            </div>
          </div>
        </div>

        {/* Network Fee Warning */}
        <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded border border-yellow-200">
          <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800">Network Fee Required</p>
            <p className="text-yellow-700">
              A network fee of 0.002 ICP will be charged for processing this
              transaction.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 border-black text-black hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm Purchase
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 4: Processing
  const ProcessingStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">Processing Transaction</h2>
        <p className="text-gray-600 mb-4">
          Please wait while we process your purchase...
        </p>

        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm">Wallet signature received</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm">Broadcasting transaction...</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Confirming on blockchain
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Minting NFT to your wallet
            </span>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium">Transaction Hash:</p>
          <p className="text-sm text-gray-600 font-mono">
            0x3bc3c1234...e4790f90
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2 border-black text-black text-xs"
          >
            <Copy size={12} className="mr-1" />
            Copy
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Estimated completion time: 2-3 minutes
        </p>

        <Button
          variant="outline"
          className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Skip to success (for demo)
        </Button>
      </CardContent>
    </Card>
  );

  // Step 5: Success
  const SuccessStep = () => (
    <Card className="w-full max-w-md mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-white" />
        </div>

        <h2 className="text-xl font-bold mb-2">Purchase Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your agricultural NFT has been successfully purchased
        </p>

        {/* Purchase Details */}
        <div className="text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border border-black rounded flex items-center justify-center text-xl">
              🍎
            </div>
            <div>
              <h3 className="font-semibold">{projectData.title}</h3>
              <p className="text-sm text-gray-600">{projectData.location}</p>
              <p className="text-sm text-gray-600">Quantity: 1 NFT</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-600">Total Paid</span>
              <p className="font-semibold">{transactionData.totalPaid}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Your Shares</span>
              <p className="font-semibold">{transactionData.yourShares}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-medium mb-2">Transaction Details</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Transaction Hash:</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono">{transactionData.hash}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 p-0.5"
                  >
                    <Copy size={10} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Block Number:</span>
                <span>{transactionData.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Network:</span>
                <span>{transactionData.network}</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="text-left bg-blue-50 p-4 rounded mb-6">
          <h4 className="font-semibold mb-2">What&apos;s Next?</h4>
          <ul className="text-sm space-y-1">
            <li>• Your NFTs will appear in your wallet shortly</li>
            <li>• You&apos;ll receive updates about the farming progress</li>
            <li>• Harvest profits will be distributed automatically</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-black text-black hover:bg-gray-100"
          >
            View in Portfolio
          </Button>
          <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
            Continue Shopping
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ReviewStep />;
      case 2:
      case 3:
        return <ConfirmStep />;
      case 4:
        return <ProcessingStep />;
      case 5:
        return <SuccessStep />;
      default:
        return <ReviewStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-bold">Plantify</h1>
        </div>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};

export default FarmPurchase;
