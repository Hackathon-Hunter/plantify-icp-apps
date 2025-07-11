'use client'

import React, { useState, useEffect } from "react";
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
import { 
  farmTrackingHandlers, 
  ProjectTrackingData, 
  GrowthTimelineStage,
  FinancialProjection
} from "./handlers";
import { WeatherData, FarmActivity, FarmPhoto } from "@/service/farmerService";

const FarmTrackingPage = () => {
  const [activeTab, setActiveTab] = useState("growth-timeline");
  const [projectData, setProjectData] = useState<ProjectTrackingData | null>(null);
  const [growthTimeline, setGrowthTimeline] = useState<GrowthTimelineStage[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [farmActivities, setFarmActivities] = useState<FarmActivity[]>([]);
  const [farmPhotos, setFarmPhotos] = useState<FarmPhoto[]>([]);
  const [financialProjection, setFinancialProjection] = useState<FinancialProjection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('projectId') || '1');

        const [
          project,
          timeline,
          weather,
          activities,
          photos,
          financial
        ] = await Promise.all([
          farmTrackingHandlers.fetchProjectTracking(projectId),
          farmTrackingHandlers.fetchGrowthTimeline(projectId),
          farmTrackingHandlers.fetchWeatherData(),
          farmTrackingHandlers.fetchFarmActivities(projectId),
          farmTrackingHandlers.fetchFarmPhotos(projectId),
          farmTrackingHandlers.fetchFinancialProjection(projectId)
        ]);

        setProjectData(project);
        setGrowthTimeline(timeline);
        setWeatherData(weather);
        setFarmActivities(activities);
        setFarmPhotos(photos);
        setFinancialProjection(financial);
      } catch (error) {
        console.error('Error loading farm tracking data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load farm tracking data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSaveToFavorites = async () => {
    if (!projectData) return;
    try {
      await farmTrackingHandlers.saveToFavorites(projectData.projectId);
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  };

  const handleGenerateAnalytics = async () => {
    if (!projectData) return;
    try {
      await farmTrackingHandlers.generateAnalytics(projectData.projectId);
    } catch (error) {
      console.error('Error generating analytics:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading farm tracking data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No project data available</p>
        </div>
      </div>
    );
  }

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
                onClick={handleSaveToFavorites}
              >
                <Heart size={16} className="mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
                onClick={handleGenerateAnalytics}
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

        {activeTab === "weather-conditions" && (
          <Card className="border-2 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle>Weather & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {weatherData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-sm text-gray-600">Temperature</h4>
                    <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-sm text-gray-600">Humidity</h4>
                    <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-sm text-gray-600">Rainfall</h4>
                    <p className="text-2xl font-bold">{weatherData.rainfall}mm</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-sm text-gray-600">Condition</h4>
                    <p className="text-lg font-semibold">{weatherData.condition}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "farm-activities" && (
          <Card className="border-2 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle>Farm Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {farmActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-semibold">{activity.activity}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "financial-projection" && (
          <Card className="border-2 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle>Financial Projection</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {financialProjection && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">Total Investment</h4>
                      <p className="text-2xl font-bold">IDR {financialProjection.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">Current Value</h4>
                      <p className="text-2xl font-bold">IDR {financialProjection.marketPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">Projected Revenue</h4>
                      <p className="text-2xl font-bold">IDR {financialProjection.projectedRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">Expected ROI</h4>
                      <p className="text-2xl font-bold text-green-600">{financialProjection.roi.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Payout Information</h4>
                    <p className="text-sm">Expected payout date: {financialProjection.payoutDate}</p>
                    <p className="text-sm">Projected profit: IDR {financialProjection.projectedProfit.toLocaleString()}</p>
                  </div>
                </div>
              )}
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
