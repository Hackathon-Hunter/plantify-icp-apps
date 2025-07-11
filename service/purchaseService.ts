import {
  PurchaseNFTRequest,
  PurchaseNFTResult,
  NFTCollection,
  FarmNFTMetadata,
  TokenId,
} from "./types";
// import { plantify_backend } from "./declarations";
import { 
  mockPurchaseResult,
  mockNFTCollection,
  mockFarmNFTMetadata,
  mockNFTStats,
  mockMyNFTs 
} from "./mock/nftData";

export const purchaseNFT = async (
  _request: PurchaseNFTRequest
): Promise<PurchaseNFTResult> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.purchaseNFT(request);
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPurchaseResult;
  } catch (error) {
    console.error("Error purchasing NFT:", error);
    throw error;
  }
};

export const getNFTCollection = async (
  _investmentId: bigint
): Promise<NFTCollection | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getNFTCollection(investmentId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNFTCollection;
  } catch (error) {
    console.error("Error fetching NFT collection:", error);
    throw error;
  }
};

export const getFarmNFTMetadata = async (
  _tokenId: TokenId
): Promise<FarmNFTMetadata | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getFarmNFTMetadata(tokenId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFarmNFTMetadata;
  } catch (error) {
    console.error("Error fetching farm NFT metadata:", error);
    throw error;
  }
};

export const calculateNFTPrice = async (
  fundingAmount: bigint,
  totalSupply: bigint
): Promise<bigint> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.calculateNFTPrice(fundingAmount, totalSupply);
    // return result;
    
    // Return mock calculation for now
    await new Promise(resolve => setTimeout(resolve, 300));
    return fundingAmount / totalSupply; // Simple mock calculation
  } catch (error) {
    console.error("Error calculating NFT price:", error);
    throw error;
  }
};

export const getNFTsByInvestment = async (_investmentId: bigint): Promise<TokenId[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getNFTsByInvestment(investmentId);
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMyNFTs.slice(0, 3); // Return subset based on investment
  } catch (error) {
    console.error("Error fetching NFTs by investment:", error);
    throw error;
  }
};

export const getNFTStats = async () => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getNFTStats();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNFTStats;
  } catch (error) {
    console.error("Error fetching NFT stats:", error);
    throw error;
  }
};

export const getAllNFTs = async (): Promise<TokenId[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getAllNFTs();
    // return result;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMyNFTs; // Reuse mock NFTs as placeholder
  } catch (error) {
    console.error("Error fetching all NFTs:", error);
    throw error;
  }
}; 