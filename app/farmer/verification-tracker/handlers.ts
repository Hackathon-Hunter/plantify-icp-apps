import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getVerificationTracker,
  getNotifications,
  requestVerificationUpdate,
  uploadAdditionalDocuments,
  getStatusConfig,
  getStatusText,
  type VerificationStep,
  type ProjectInfo,
} from "@/service/verificationService";
import { type VerificationTracker } from "@/service/types";

export const useVerificationTracker = (investmentId: number = 1) => {
  const router = useRouter();

  // State management
  const [trackerData, setTrackerData] = useState<VerificationTracker | null>(
    null
  );
  const [notifications, setNotifications] = useState<
    {
      id: number;
      type: string;
      message: string;
      timestamp: Date;
      read: boolean;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load verification data from service
  const loadVerificationData = useCallback(async () => {
    if (!investmentId) return;

    setIsLoading(true);
    setError(null);

    try {
      const [tracker, notificationData] = await Promise.all([
        getVerificationTracker(BigInt(investmentId)),
        getNotifications(investmentId),
      ]);

      setTrackerData(tracker);
      setNotifications(notificationData);
    } catch (err) {
      console.error("Error loading verification data:", err);
      setError("Failed to load verification data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [investmentId]);

  // Refresh data without full loading state
  const refreshData = useCallback(async () => {
    if (!investmentId) return;

    setIsRefreshing(true);
    setError(null);

    try {
      const [tracker, notificationData] = await Promise.all([
        getVerificationTracker(BigInt(investmentId)),
        getNotifications(investmentId),
      ]);

      setTrackerData(tracker);
      setNotifications(notificationData);
    } catch (err) {
      console.error("Error refreshing verification data:", err);
      setError("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  }, [investmentId]);

  // Load data on component mount
  useEffect(() => {
    loadVerificationData();
  }, [loadVerificationData]);

  // Auto-refresh data every 30 seconds for active tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (trackerData?.steps.some((step) => 'InProgress' in step.status)) {
        refreshData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [trackerData, refreshData]);

  // Action handlers
  const handleContactSupport = useCallback(async () => {
    if (!trackerData) return;

    const currentStep =
      trackerData.steps.find((step) => 'InProgress' in step.status) ||
      trackerData.steps.find((step) => 'Pending' in step.status);

    try {
      const message = `I need assistance with the verification process for my project ${
        trackerData.investmentId
      }. Current status: ${currentStep?.stepName || "Unknown"}`;

      // First try to send support request through API
      await requestVerificationUpdate(investmentId, message);

      // Then open email as fallback
      const subject = `Verification Support - ${trackerData.investmentId}`;
      const body = `Hello,\n\n${message}\n\nThank you.`;
      window.open(
        `mailto:support@plantify.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`
      );
    } catch (err) {
      console.error("Error contacting support:", err);
      // Fallback to email only
      const subject = `Verification Support - ${trackerData.investmentId}`;
      const body = `Hello,\n\nI need assistance with the verification process for my project ${
        trackerData.investmentId
      }.\n\nCurrent status: ${currentStep?.stepName || "Unknown"}\n\nThank you.`;
      window.open(
        `mailto:support@plantify.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`
      );
    }
  }, [trackerData, investmentId]);

  const handleViewProjectDetails = useCallback(() => {
    // Navigate to investment setup or project details page
    router.push("/farmer/investment-setup");
  }, [router]);

  const handleUpdateInformation = useCallback(() => {
    // Navigate to edit project information
    router.push("/farmer/investment-setup");
  }, [router]);

  const handleUploadDocuments = useCallback(
    async (files: File[]) => {
      if (!investmentId) return;

      setIsLoading(true);
      setError(null);

      try {
        const uploadedUrls = await uploadAdditionalDocuments(
          investmentId,
          files
        );
        console.log("Documents uploaded:", uploadedUrls);

        // Refresh data to show updated status
        await refreshData();

        return uploadedUrls;
      } catch (err) {
        console.error("Error uploading documents:", err);
        setError("Failed to upload documents. Please try again.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [investmentId, refreshData]
  );

  // Helper functions that don't return JSX
  const getStepStatusConfig = useCallback(
    (status: VerificationStep["status"]) => {
      return getStatusConfig(status);
    },
    []
  );

  const getStepStatusText = useCallback(
    (status: VerificationStep["status"]) => {
      return getStatusText(status);
    },
    []
  );

  const getProgressStatusText = useCallback(() => {
    if (!trackerData) return "Loading...";

    if (Number(trackerData.overallProgress) === 100) return "Completed";

    const currentStep = trackerData.steps.find(
      (step) => 'InProgress' in step.status
    );
    if (currentStep) return "In Progress";

    return "Pending";
  }, [trackerData]);

  const getCurrentStep = useCallback(() => {
    if (!trackerData) return null;

    return (
      trackerData.steps.find((step) => 'InProgress' in step.status) ||
      trackerData.steps.find((step) => 'Pending' in step.status)
    );
  }, [trackerData]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter((notification) => !notification.read);
  }, [notifications]);

  const markNotificationAsRead = useCallback((notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  return {
    // State
    trackerData,
    notifications,
    isLoading,
    error,
    isRefreshing,

    // Computed values
    currentStep: getCurrentStep(),
    unreadNotifications: getUnreadNotifications(),
    progressStatusText: getProgressStatusText(),

    // Helper functions
    getStepStatusConfig,
    getStepStatusText,

    // Actions
    handleContactSupport,
    handleViewProjectDetails,
    handleUpdateInformation,
    handleUploadDocuments,
    loadVerificationData,
    refreshData,
    markNotificationAsRead,

    // Utility
    setError,
  };
};

export type { VerificationTracker, VerificationStep, ProjectInfo };
