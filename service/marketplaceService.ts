import {
  InvestmentProject,
  CropType,
  InvestmentStatus,
  NFTCollection,
  InvestmentId,
} from "./types";
// import { plantify_backend } from "./declarations";
import { 
  getMockInvestmentOpportunities,
  getMockSearchResults,
  mockInvestmentProject
} from "./mock/farmData";
import { 
  mockMarketplaceOverview,
  mockRecentInvestmentActivity 
} from "./mock/dashboardData";
import { 
  mockNFTCollection,
  mockPricingInfo 
} from "./mock/nftData";
import { getCropTypeString, getStatusString } from "./utils";

export const getInvestmentOpportunities = async (): Promise<InvestmentProject[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestmentOpportunities();
    // return result;
    
    // Return mock data for now - only projects available for investment
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockInvestmentOpportunities();
  } catch (error) {
    console.error("Error fetching investment opportunities:", error);
    throw error;
  }
};

export const searchInvestmentProjects = async (
  cropType?: CropType,
  location?: string,
  minFunding?: bigint,
  maxFunding?: bigint,
  status?: InvestmentStatus
): Promise<InvestmentProject[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.searchInvestmentProjects(
    //   cropType ? [cropType] : [],
    //   location ? [location] : [],
    //   minFunding ? [minFunding] : [],
    //   maxFunding ? [maxFunding] : [],
    //   status ? [status] : []
    // );
    // return result;
    
    // Return mock data for now - simulates search with filters
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use elegant utility functions to extract union variant names
    const filters: {
      cropType?: string;
      location?: string;
      minFunding?: bigint;
      maxFunding?: bigint;
      status?: string;
    } = {};
    
    if (cropType) filters.cropType = getCropTypeString(cropType);
    if (location) filters.location = location;
    if (minFunding) filters.minFunding = minFunding;
    if (maxFunding) filters.maxFunding = maxFunding;
    if (status) filters.status = getStatusString(status);
    
    return getMockSearchResults(filters);
  } catch (error) {
    console.error("Error searching investment projects:", error);
    throw error;
  }
};

export const getMarketplaceOverview = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMarketplaceOverview();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMarketplaceOverview;
  } catch (error) {
    console.error("Error fetching marketplace overview:", error);
    throw error;
  }
};

export const getInvestmentProjectSummary = async (_id: InvestmentId) => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestmentProjectSummary(id);
    // return result.length > 0 ? result[0] : null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      project: mockInvestmentProject,
      nftCollection: [mockNFTCollection],
      pricing: [mockPricingInfo]
    };
  } catch (error) {
    console.error("Error fetching investment project summary:", error);
    throw error;
  }
};

export const getAllNFTCollections = async (): Promise<NFTCollection[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getAllNFTCollections();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return [mockNFTCollection];
  } catch (error) {
    console.error("Error fetching NFT collections:", error);
    throw error;
  }
};

export const getPricingInfo = async (_investmentId: bigint) => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getPricingInfo(investmentId);
    // return result.length > 0 ? result[0] : null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPricingInfo;
  } catch (error) {
    console.error("Error fetching pricing info:", error);
    throw error;
  }
};

export const getRecentInvestmentActivity = async (_limit: bigint): Promise<InvestmentProject[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getRecentInvestmentActivity(limit);
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRecentInvestmentActivity;
  } catch (error) {
    console.error("Error fetching recent investment activity:", error);
    throw error;
  }
}; 