import {
  FarmerStats,
  InvestorStats,
  InvestmentStats,
  UIDashboardStats,
} from "./types";
// import { plantify_backend } from "./declarations";
import { 
  mockMyDashboardData,
  mockAdminDashboardStats,
  mockPlatformOverview,
  mockPlatformMetrics,
  mockFarmerStats,
  mockInvestorStats,
  mockInvestmentStats,
  mockRegistrationStatus
} from "./mock/dashboardData";

export const getMyDashboardData = async (): Promise<UIDashboardStats> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyDashboardData();
    // Process the result to return UIDashboardStats
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const dashboardData = mockMyDashboardData;
    
    // Transform to UI-ready format
    if (dashboardData.farmerData && dashboardData.farmerData.length > 0) {
      const farmerData = dashboardData.farmerData[0];
      if (farmerData) {
        return {
          totalProjects: Number(farmerData.totalProjects),
          activeProjects: Number(farmerData.activeProjects),
          totalFundingRaised: Number(farmerData.totalFundingRaised) / 1000000, // Convert to millions
          totalInvestors: 0, // This would need to come from project data
          averageROI: 15.0, // Default/calculated value
        };
      }
    }
    
    // Fallback to default values
    return {
      totalProjects: 0,
      activeProjects: 0,
      totalFundingRaised: 0,
      totalInvestors: 0,
      averageROI: 0,
    };
  } catch (error) {
    console.error("Error fetching my dashboard data:", error);
    throw error;
  }
};

export const getAdminDashboardStats = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getAdminDashboardStats();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAdminDashboardStats;
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    throw error;
  }
};

export const getPlatformOverview = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getPlatformOverview();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlatformOverview;
  } catch (error) {
    console.error("Error fetching platform overview:", error);
    throw error;
  }
};

export const getPlatformMetrics = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getPlatformMetrics();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlatformMetrics;
  } catch (error) {
    console.error("Error fetching platform metrics:", error);
    throw error;
  }
};

export const getFarmerRegistrationStats = async (): Promise<FarmerStats> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getFarmerRegistrationStats();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFarmerStats;
  } catch (error) {
    console.error("Error fetching farmer registration stats:", error);
    throw error;
  }
};

export const getInvestorRegistrationStats = async (): Promise<InvestorStats> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestorRegistrationStats();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestorStats;
  } catch (error) {
    console.error("Error fetching investor registration stats:", error);
    throw error;
  }
};

export const getInvestmentStats = async (): Promise<InvestmentStats> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestmentStats();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestmentStats;
  } catch (error) {
    console.error("Error fetching investment stats:", error);
    throw error;
  }
};

export const getMyRegistrationStatus = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyRegistrationStatus();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRegistrationStatus;
  } catch (error) {
    console.error("Error fetching my registration status:", error);
    throw error;
  }
}; 