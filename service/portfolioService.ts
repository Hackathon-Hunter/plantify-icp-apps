import {
  InvestorPortfolio,
  InvestorId,
  TokenId,
  InvestorProfile,
} from "./types";
// import { plantify_backend } from "./declarations";
import { 
  mockInvestorPortfolio,
  mockTopInvestors,
  mockInvestorProfile 
} from "./mock/investorData";
import { 
  mockMyNFTs 
} from "./mock/nftData";
import { 
  mockInvestmentProject 
} from "./mock/farmData";

export const getMyPortfolio = async (): Promise<InvestorPortfolio | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyPortfolio();
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestorPortfolio;
  } catch (error) {
    console.error("Error fetching my portfolio:", error);
    throw error;
  }
};

export const getInvestorPortfolio = async (
  _investorId: InvestorId
): Promise<InvestorPortfolio | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestorPortfolio(investorId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestorPortfolio;
  } catch (error) {
    console.error("Error fetching investor portfolio:", error);
    throw error;
  }
};

export const getDetailedPortfolio = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getDetailedPortfolio();
    // return result.length > 0 ? result[0] : null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      investor: mockInvestorProfile,
      investments: [
        {
          investment: mockInvestorPortfolio.investments[0],
          project: [mockInvestmentProject],
          currentMarketValue: BigInt(27500000),
          roiPercentage: 10.0,
          nftTokens: mockMyNFTs
        }
      ],
      summary: {
        totalValue: BigInt(55000000),
        totalReturns: BigInt(5000000),
        overallROI: 10.0,
        bestPerforming: [BigInt(1)],
        worstPerforming: []
      }
    };
  } catch (error) {
    console.error("Error fetching detailed portfolio:", error);
    throw error;
  }
};

export const getMyNFTs = async (): Promise<TokenId[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyNFTs();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMyNFTs;
  } catch (error) {
    console.error("Error fetching my NFTs:", error);
    throw error;
  }
};

export const getMyInvestorProfile = async (): Promise<InvestorProfile | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyInvestorProfile();
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestorProfile;
  } catch (error) {
    console.error("Error fetching my investor profile:", error);
    throw error;
  }
};

export const getInvestorProfile = async (
  _investorId: InvestorId
): Promise<InvestorProfile | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestorProfile(investorId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvestorProfile;
  } catch (error) {
    console.error("Error fetching investor profile:", error);
    throw error;
  }
};

export const getTopInvestors = async (_limit: bigint): Promise<InvestorProfile[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getTopInvestors(limit);
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTopInvestors;
  } catch (error) {
    console.error("Error fetching top investors:", error);
    throw error;
  }
}; 