'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFarmDetailsHandlers, ProjectDisplayData } from "./handlers";

const FarmDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handlers = useFarmDetailsHandlers();
  
  const [investmentAmount, setInvestmentAmount] = useState("1");
  const [activeTab, setActiveTab] = useState("overview");
  const [projectData, setProjectData] = useState<ProjectDisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectId = searchParams.get('projectId') || '1';

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await handlers.fetchProjectDetails(projectId);
        setProjectData(data);
        
      } catch (err) {
        console.error('Error loading project data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [projectId, handlers]);

  const navigateToPurchase = () => {
    router.push(`/investor/farm-purchase?projectId=${projectId}`);
  };

  const handleSaveProject = async () => {
    if (!projectData) return;
    try {
      await handlers.saveProject(projectData.id);
      // TODO: Show success toast
    } catch (err) {
      console.error('Error saving project:', err);
      // TODO: Show error toast
    }
  };

  const handleShareProject = async () => {
    if (!projectData) return;
    try {
      const shareUrl = await handlers.shareProject(projectData.id);
      // TODO: Show success toast with share URL
      console.log('Project shared:', shareUrl);
    } catch (err) {
      console.error('Error sharing project:', err);
      // TODO: Show error toast
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The requested project could not be found.</p>
          <Button onClick={() => router.push('/investor/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  // Now using dynamic projectData from handlers

  const calculateInvestment = () => {
    const amount = parseFloat(investmentAmount) || 0;
    return handlers.calculateInvestment(amount);
  };

  const investment = calculateInvestment();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Project Details</h1>
              <p className="text-gray-600">
                Agricultural Investment Opportunity
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
                onClick={handleSaveProject}
              >
                <Heart size={16} className="mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
                onClick={handleShareProject}
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="border-2 border-black">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Project Icon */}
                  <div className="w-32 h-32 border-2 border-black rounded-lg flex items-center justify-center text-6xl bg-red-50">
                    🍎
                  </div>

                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {projectData.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        #{projectData.id}
                      </span>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">
                      {projectData.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{projectData.location}</span>
                      </div>
                      <span>•</span>
                      <span>{projectData.area}</span>
                      <span>•</span>
                      <span>By {projectData.farmer}</span>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {projectData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700">{projectData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Progress */}
            <Card className="border-2 border-black">
              <CardHeader className="border-b border-black">
                <CardTitle>Investment Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span className="font-semibold">
                      {projectData.fundingProgress.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${projectData.fundingProgress.percentage}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1 text-gray-600">
                    <span>
                      {projectData.fundingProgress.current} ICP raised
                    </span>
                    <span>Goal: {projectData.fundingProgress.target} ICP</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{projectData.funded}%</div>
                    <div className="text-sm text-gray-600">Funded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{projectData.timeline}</div>
                    <div className="text-sm text-gray-600">Timeline</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{projectData.investors}</div>
                    <div className="text-sm text-gray-600">Investors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{projectData.expectedROI}</div>
                    <div className="text-sm text-gray-600">Est. ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-gray-300">
              <div className="flex space-x-8">
                {["overview", "timeline", "risks", "documents"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <Card className="border border-black">
                <CardHeader className="border-b border-black">
                  <CardTitle>Investment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(projectData.breakdown).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                            <span className="capitalize">{key}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {value.amount} ICP
                            </div>
                            <div className="text-sm text-gray-500">
                              {value.percentage}%
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "timeline" && (
              <Card className="border border-black">
                <CardHeader className="border-b border-black">
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {projectData.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {milestone.status === "completed" && (
                          <CheckCircle
                            size={20}
                            className="text-green-500 mt-1"
                          />
                        )}
                        {milestone.status === "current" && (
                          <Clock size={20} className="text-blue-500 mt-1" />
                        )}
                        {milestone.status === "upcoming" && (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <p className="text-sm text-gray-600">
                            {milestone.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "risks" && (
              <Card className="border border-black">
                <CardHeader className="border-b border-black">
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {projectData.risks.map((risk, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div>
                          <h3 className="font-semibold">{risk.factor}</h3>
                          <p className="text-sm text-gray-600">
                            {risk.description}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            risk.level === "Low"
                              ? "bg-green-100 text-green-800"
                              : risk.level === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {risk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card className="border border-black">
                <CardHeader className="border-b border-black">
                  <CardTitle>Legal Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      "Land Ownership Certificate",
                      "Farming License", 
                      "Business Registration",
                      "Insurance Policy",
                      "Soil Test Results",
                      "Environmental Permit"
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={16} />
                          <span>{doc}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-black text-black"
                          onClick={() => console.log(`Viewing document: ${doc}`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Investment Panel */}
          <div className="space-y-6">
            {/* Investment Card */}
            <Card className="border-2 border-black sticky top-6">
              <CardHeader className="border-b border-black">
                <CardTitle>Invest in This Project</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-2xl font-bold">
                    {projectData.currentPrice}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {projectData.priceChange}
                  </div>
                  <div className="text-sm text-gray-600">per share</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <select
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full border border-black rounded px-3 py-2"
                  >
                    {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Investment Amount:</span>
                    <span className="font-semibold">
                      {investment.amount.toFixed(2)} ICP
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Gross Return (18%):</span>
                    <span className="font-semibold text-green-600">
                      {investment.estimatedReturn.toFixed(2)} ICP
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform Fee (10%):</span>
                    <span className="font-semibold text-red-600">
                      -{investment.platformFee.toFixed(2)} ICP
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Net Profit:</span>
                    <span className="font-semibold text-green-600">
                      +{investment.profit.toFixed(2)} ICP
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span>Net Return:</span>
                    <span className="font-semibold">
                      {investment.netReturn.toFixed(2)} ICP
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 border border-blue-600" onClick={navigateToPurchase}>
                  Buy Now
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-100"
                >
                  View Offer
                </Button>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="border border-black">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Key Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Investment:</span>
                    <span className="font-medium">0.1 ICP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Duration:</span>
                    <span className="font-medium">8 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profit Distribution:</span>
                    <span className="font-medium">Quarterly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
