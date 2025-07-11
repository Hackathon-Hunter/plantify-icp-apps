'use client'

import React from "react";
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
  RefreshCw,
  Bell,
} from "lucide-react";
import { useVerificationTracker } from "./handlers";

const FarmerVerificationTracker = () => {
  const {
    trackerData,
    notifications,
    isLoading,
    error,
    isRefreshing,
    unreadNotifications,
    progressStatusText,
    getStepStatusConfig,
    getStepStatusText,
    handleContactSupport,
    handleViewProjectDetails,
    handleUpdateInformation,
    refreshData,
    markNotificationAsRead,
  } = useVerificationTracker();

  // Icon mapping for different step types
  const getStepIcon = (iconType?: string) => {
    const iconMap = {
      document: FileText,
      search: Search,
      map: MapPin,
      dollar: DollarSign,
      award: Award,
      rocket: Rocket,
    };
    return iconMap[iconType as keyof typeof iconMap] || Clock;
  };

  type StatusUnion = { Failed: null } | { InProgress: null } | { Completed: null } | { Pending: null };

  const getStatusIcon = (status: StatusUnion) => {
    if ('Completed' in status) return <CheckCircle size={20} className="text-black" />;
    if ('InProgress' in status) return <Clock size={20} className="text-black" />;
    if ('Failed' in status) return <Clock size={20} className="text-red-500" />;
    return <Clock size={20} className="text-gray-400" />;
  };

  const isStatusCompleted = (status: StatusUnion) => 'Completed' in status;
  const isStatusInProgress = (status: StatusUnion) => 'InProgress' in status;
  const isStatusFailed = (status: StatusUnion) => 'Failed' in status;
  const isStatusPending = (status: StatusUnion) => 'Pending' in status;

  const getStepStyle = (status: StatusUnion) => {
    let statusString = "pending";
    if ('Completed' in status) statusString = "completed";
    else if ('InProgress' in status) statusString = "in-progress";
    else if ('Failed' in status) statusString = "failed";
    else if ('Pending' in status) statusString = "pending";
    
    const config = getStepStatusConfig(statusString as "completed" | "in-progress" | "pending" | "current");
    return `${config.borderColor} ${config.bgColor}`;
  };

  const getStatusString = (status: StatusUnion): string => {
    if ('Completed' in status) return "completed";
    if ('InProgress' in status) return "in-progress";
    if ('Failed' in status) return "failed";
    return "pending";
  };

  if (isLoading && !trackerData) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading verification tracker...</p>
        </div>
      </div>
    );
  }

  if (error && !trackerData) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!trackerData) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <p className="text-gray-600">No verification data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">
            Verification Progress Tracker
          </h1>
          {unreadNotifications.length > 0 && (
            <div className="relative">
              <Bell className="h-6 w-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications.length}
              </span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm">
          Track your investment setup verification by our expert team
        </p>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Overall Progress */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center flex-1">
            <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
            <div className="text-2xl font-bold">{trackerData.overallProgress}%</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
            className="border-black text-black hover:bg-gray-100"
          >
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-black h-4 rounded-full transition-all duration-300"
            style={{ width: `${trackerData.overallProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-600">
            Status: {progressStatusText}
          </p>
          <p className="text-gray-600">
            Current Step: {trackerData.currentStep}
          </p>
        </div>
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
                <p className="text-sm font-medium text-gray-600">Investment ID</p>
                <p className="font-semibold">{trackerData.investmentId.toString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Step</p>
                <p className="font-semibold">{trackerData.currentStep}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="font-semibold">{trackerData.overallProgress.toString()}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="font-semibold">{new Date(Number(trackerData.lastUpdated)).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verification Steps */}
        <div className="space-y-4">
          {trackerData.steps.map((step, index) => {
            const StepIcon = getStepIcon();
            return (
              <Card
                key={index}
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
                          isStatusCompleted(step.status)
                            ? "bg-black text-white border-black"
                            : isStatusInProgress(step.status)
                            ? "bg-white text-black border-black"
                            : isStatusFailed(step.status)
                            ? "bg-red-100 text-red-500 border-red-500"
                            : "bg-gray-100 text-gray-400 border-gray-300"
                        }
                      `}
                      >
                        {isStatusCompleted(step.status) ? (
                          <CheckCircle size={20} />
                        ) : (
                          <StepIcon size={20} />
                        )}
                      </div>
                      {index < trackerData.steps.length - 1 && (
                        <div
                          className={`
                          w-0.5 h-8
                          ${
                            isStatusCompleted(step.status)
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
                            {step.stepName}
                            {isStatusInProgress(step.status) && (
                              <span className="text-xs bg-black text-white px-2 py-1 rounded">
                                IN PROGRESS
                              </span>
                            )}
                            {isStatusFailed(step.status) && (
                              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                FAILED
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {step.description}
                          </p>

                          {/* Time Information */}
                          <div className="mt-2 text-sm">
                            {isStatusCompleted(step.status) &&
                              step.completedAt && (
                                <p className="text-gray-500">
                                  Estimated time: {step.estimatedTime}{" "}
                                  (Completed at: {new Date(Number(step.completedAt)).toLocaleDateString()})
                                </p>
                              )}
                            {isStatusInProgress(step.status) && (
                              <>
                                <p className="text-gray-500">
                                  Estimated time: {step.estimatedTime}
                                </p>
                              </>
                            )}
                            {isStatusPending(step.status) && (
                              <p className="text-gray-500">
                                Estimated time: {step.estimatedTime}
                              </p>
                            )}
                            {isStatusFailed(step.status) && step.notes && (
                              <p className="text-red-600 mt-1">
                                Note: {step.notes}
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
                              isStatusCompleted(step.status)
                                ? "text-black"
                                : isStatusInProgress(step.status)
                                ? "text-black"
                                : isStatusFailed(step.status)
                                ? "text-red-500"
                                : "text-gray-400"
                            }
                          `}
                          >
                            {getStepStatusText(getStatusString(step.status) as "completed" | "in-progress" | "pending" | "current")}
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
            onClick={handleContactSupport}
            className="border-black text-black hover:bg-gray-100"
          >
            Contact Support
          </Button>
          <Button 
            onClick={handleViewProjectDetails}
            className="bg-black text-white hover:bg-gray-800 border border-black"
          >
            View Project Details
          </Button>
          <Button
            variant="outline"
            onClick={handleUpdateInformation}
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
