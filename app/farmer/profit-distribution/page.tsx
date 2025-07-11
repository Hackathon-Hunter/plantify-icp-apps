'use client'

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Calculator,
  Send,
  FileText,
  DollarSign,
  X,
} from "lucide-react";
import { useProfitDistribution } from './handlers';

const FarmerProfitDistribution = () => {
  const {
    // State
    showTransferModal,
    totalRevenue,
    operationalCosts,
    additionalNotes,
    isProcessing,
    uploadedFiles,

    // Computed values
    profitBreakdown,
    isFormValid,

    // Static data
    projectData,
    milestones,
    requiredDocuments,

    // Handlers
    handleCloseTransferModal,
    handleRevenueChange,
    handleCostsChange,
    handleNotesChange,
    handleFileUpload,
    handleRemoveFile,
    handleTransferProfit,
    handleCalculateProfits,
    handleTransferAllPending,
  } = useProfitDistribution();

  const TransferModal = useMemo(() => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-2 border-black bg-white">
        <CardHeader className="border-b border-black">
          <CardTitle className="text-lg font-bold">
            Transfer Profit Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">{projectData.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Investors</span>
                <p className="font-semibold">{projectData.totalInvestors}</p>
              </div>
              <div>
                <span className="text-gray-600">NFTs Issued</span>
                <p className="font-semibold">{projectData.nftsIssued}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Total Revenue (USD)
            </label>
            <Input
              placeholder="Enter total sales revenue"
              value={totalRevenue}
              onChange={(e) => handleRevenueChange(e.target.value)}
              className="border-black focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Total Operational Costs (USD)
            </label>
            <Input
              placeholder="Enter all operational costs"
              value={operationalCosts}
              onChange={(e) => handleCostsChange(e.target.value)}
              className="border-black focus:ring-black focus:border-black"
            />
          </div>

          {/* Profit Calculation Breakdown */}
          <Card className="border border-gray-300 bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">
                Profit Calculation Breakdown
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Revenue:</span>
                  <span className="font-medium">${profitBreakdown.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Costs:</span>
                  <span className="font-medium text-red-600">
                    -${profitBreakdown.costs.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Gross Profit:</span>
                  <span className="font-medium">${profitBreakdown.grossProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (10%):</span>
                  <span className="font-medium text-red-600">
                    -${profitBreakdown.platformFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Net Profit for Distribution:</span>
                  <span className="text-lg">${profitBreakdown.netProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin:</span>
                  <span className="font-medium">{profitBreakdown.profitMargin}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <label className="block text-sm font-medium mb-1">
              Supporting Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm mb-2">
                Upload sales receipts, cost breakdowns, and harvest reports
              </p>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              placeholder="Any additional information about the harvest, sales, or distribution..."
              rows={3}
              value={additionalNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black resize-none"
            />
          </div>

          {/* Transfer Summary */}
          <Card className="border border-black bg-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Send size={16} />
                <h4 className="font-semibold">Transfer Summary</h4>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  ${profitBreakdown.netProfit.toFixed(2)} will be transferred to Plantify
                  platform
                </p>
                <p>
                  Funds will be automatically distributed to{" "}
                  <span className="font-semibold">
                    {projectData.totalInvestors} investors
                  </span>
                </p>
                <p>Distribution based on NFT ownership percentages</p>
                <p className="text-gray-600">
                  Platform fee: ${profitBreakdown.platformFee.toFixed(2)} retained by Plantify
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-black text-black hover:bg-gray-100"
              onClick={handleCloseTransferModal}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-black text-white hover:bg-gray-800"
              disabled={!isFormValid || isProcessing}
              onClick={handleTransferProfit}
            >
              <Send size={16} className="mr-2" />
              {isProcessing ? 'Processing...' : `Transfer $${profitBreakdown.netProfit.toFixed(2)} to Plantify`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ), [
    projectData,
    totalRevenue,
    operationalCosts,
    additionalNotes,
    uploadedFiles,
    profitBreakdown,
    isFormValid,
    isProcessing,
    handleRevenueChange,
    handleCostsChange,
    handleNotesChange,
    handleFileUpload,
    handleRemoveFile,
    handleCloseTransferModal,
    handleTransferProfit,
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Profit Distribution</h1>
          <p className="text-gray-600">
            Manage harvest profits and distribute earnings to investors
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Action Required Alert */}
        <Card className="border-2 border-orange-500 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-500 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-800 mb-1">
                  Action Required
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  You have 1 project ready for profit distribution and 1
                  milestone payment due.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-orange-500 text-white hover:bg-orange-600"
                    onClick={handleTransferAllPending}
                  >
                    <Send size={14} className="mr-1" />
                    Transfer All Pending ($1,296)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-100"
                    onClick={handleCalculateProfits}
                  >
                    <Calculator size={14} className="mr-1" />
                    Calculate Profits
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Requiring Profit Distribution */}
        <Card className="border-2 border-black">
          <CardHeader className="border-b border-black">
            <CardTitle className="text-xl font-bold">
              Projects Requiring Profit Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Project Card */}
            <Card className="border border-black mb-4">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Ready for Distribution
                      </span>
                      <h3 className="text-lg font-semibold">
                        {projectData.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {projectData.crop} • {projectData.location} •{" "}
                      {projectData.area}
                    </p>
                    <div className="flex items-center gap-4 text-sm mt-2">
                      <span>{projectData.totalInvestors} investors</span>
                      <span>{projectData.nftsIssued} NFTs issued</span>
                      <span>
                        Funding: ${projectData.funding.toLocaleString()}
                      </span>
                      <span>Updated: {projectData.lastUpdate}</span>
                    </div>
                  </div>
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={handleTransferAllPending}
                  >
                    <Send size={16} className="mr-2" />
                    Transfer Profits
                  </Button>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded border">
                    <p className="text-2xl font-bold text-green-600">$6,120</p>
                    <p className="text-sm text-gray-600">Actual Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded border">
                    <p className="text-2xl font-bold text-orange-600">$4,680</p>
                    <p className="text-sm text-gray-600">Operating Costs</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded border">
                    <p className="text-2xl font-bold text-blue-600">$1,296</p>
                    <p className="text-sm text-gray-600">
                      Net Profit to Distribute
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded border">
                    <p className="text-2xl font-bold text-purple-600">23.5%</p>
                    <p className="text-sm text-gray-600">Est. Profit Margin</p>
                  </div>
                </div>

                {/* Project Milestones */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Project Milestones</h4>
                  <div className="space-y-3">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {milestone.status === "completed" && (
                          <CheckCircle size={20} className="text-green-500" />
                        )}
                        {milestone.status === "current" && (
                          <Clock size={20} className="text-blue-500" />
                        )}
                        {milestone.status === "pending" && (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              milestone.status === "completed"
                                ? "text-green-700"
                                : milestone.status === "current"
                                ? "text-blue-700"
                                : "text-gray-500"
                            }`}
                          >
                            {milestone.title}
                          </p>
                          {milestone.date && (
                            <p className="text-xs text-gray-500">
                              {milestone.date}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <Card className="border border-yellow-300 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">
                        Required Documents for Distribution
                      </h4>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-yellow-600 rounded-full" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Recent Distribution History */}
        <Card className="border border-gray-300">
          <CardHeader className="border-b border-gray-300">
            <CardTitle className="text-lg font-semibold">
              Recent Distribution History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8 text-gray-500">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No previous distributions found</p>
              <p className="text-sm">
                Your completed distributions will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && TransferModal}
    </div>
  );
};

export default FarmerProfitDistribution;
