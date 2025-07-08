'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  TrendingUp,
  Camera,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const FarmTrackingPage = () => {
  const [activeTab, setActiveTab] = useState("growth-timeline");

  const projectData = {
    title: "Apple Orchard #001",
    location: "Batu, Malang, East Java",
    status: "Flowering",
    statusColor: "text-green-600",
    completionPercentage: 65,
    currentStage: "Flowering",
    expectedYield: "75 kg",
    yieldProgress: "+4% vs projection",
    estimatedValue: "IDR 1,875,000",
    valueChange: "+2% YTD",
  };

  const growthTimeline = [
    {
      id: 1,
      title: "Planting",
      description: "Seeds planted successfully",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      title: "Germination",
      description: "First shoots emerged",
      date: "2024-02-01",
      status: "completed",
    },
    {
      id: 3,
      title: "Vegetative Growth",
      description: "Healthy leaf development observed",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 4,
      title: "Flowering",
      description: "Flowering stage, good pollination expected",
      date: "2024-05-01",
      status: "current",
    },
    {
      id: 5,
      title: "Fruit Development",
      description: "Fruit formation expected",
      date: "2024-06-15",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Maturation",
      description: "Final ripening phase",
      date: "2024-08-01",
      status: "upcoming",
    },
    {
      id: 7,
      title: "Harvest",
      description: "Ready for harvest",
      date: "2024-09-15",
      status: "upcoming",
    },
  ];

  const farmPhotos = [
    { id: 1, date: "June 2, 2024", description: "Early flowering stage" },
    { id: 2, date: "May 15, 2024", description: "Healthy plant growth" },
    { id: 3, date: "June 8, 2024", description: "Full bloom development" },
  ];

  const tabs = [
    { id: "growth-timeline", label: "Growth Timeline" },
    { id: "weather-conditions", label: "Weather & Conditions" },
    { id: "farm-activities", label: "Farm Activities" },
    { id: "financial-projection", label: "Financial Projection" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} className="text-green-500" />;
      case "current":
        return <Clock size={20} className="text-blue-500" />;
      case "upcoming":
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        );
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "current":
        return "Current";
      case "upcoming":
        return "Upcoming";
      default:
        return "Pending";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Farm Tracking</h1>
              <p className="text-gray-600">
                Monitor your investment progress in real-time
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                <Heart size={16} className="mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                <TrendingUp size={16} className="mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Project Overview */}
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Project Icon */}
              <div className="w-16 h-16 border-2 border-black rounded-lg flex items-center justify-center text-3xl bg-red-50">
                🍎
              </div>

              {/* Project Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold">{projectData.title}</h2>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Quality
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <MapPin size={14} />
                  <span>{projectData.location}</span>
                </div>

                {/* Progress Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Growth Progress</p>
                    <p className="font-semibold">
                      {projectData.completionPercentage}% Complete
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Stage</p>
                    <p className="font-semibold text-blue-600">
                      {projectData.currentStage}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Yield</p>
                    <p className="font-semibold">{projectData.expectedYield}</p>
                    <p className="text-xs text-green-600">
                      {projectData.yieldProgress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Value</p>
                    <p className="font-semibold">
                      {projectData.estimatedValue}
                    </p>
                    <p className="text-xs text-green-600">
                      {projectData.valueChange}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span className="font-semibold">
                  {projectData.completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${projectData.completionPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-300">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "growth-timeline" && (
          <Card className="border-2 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle>Growth Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {growthTimeline.map((stage, index) => (
                  <div key={stage.id} className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="flex flex-col items-center">
                      {getStatusIcon(stage.status)}
                      {index < growthTimeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            stage.status === "completed"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {stage.title}
                          </h3>
                          <p className="text-gray-600">{stage.description}</p>
                          <p className="text-sm text-gray-500">{stage.date}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            stage.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : stage.status === "current"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {getStatusLabel(stage.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Farm Photos */}
        <Card className="border-2 border-black">
          <CardHeader className="border-b border-black">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Farm Photos</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="border-black text-black hover:bg-gray-100"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {farmPhotos.map((photo) => (
                <div key={photo.id} className="space-y-2">
                  {/* Photo Placeholder */}
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Camera
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-sm text-gray-500">Farm Photo</p>
                    </div>
                  </div>

                  {/* Photo Info */}
                  <div className="text-center">
                    <p className="text-sm font-medium">{photo.date}</p>
                    <p className="text-xs text-gray-600">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <TrendingUp size={24} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Performance Report</h3>
              <p className="text-sm text-gray-600 mb-3">
                View detailed analytics
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                View Report
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <Camera size={24} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Photo Gallery</h3>
              <p className="text-sm text-gray-600 mb-3">
                Browse all farm photos
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <AlertCircle size={24} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Updates & Alerts</h3>
              <p className="text-sm text-gray-600 mb-3">
                Get notified of changes
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                Manage Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmTrackingPage;
