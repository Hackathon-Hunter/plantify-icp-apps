import { plantify_backend } from "./declarations";
import { UIDashboardStats } from "./types";

// Platform Statistics
export const getPlatformStats = async (): Promise<{
  totalFundingRaised: bigint;
  activeProjects: bigint;
  totalFounders: bigint;
  totalProjects: bigint;
  totalInvestments: bigint;
  totalInvestors: bigint;
}> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getPlatformStats();
};

export const getNFTStats = async (): Promise<{
  totalTokensMinted: bigint;
  activeCollections: bigint;
  totalValueLocked: bigint;
  totalCollections: bigint;
}> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getNFTStats();
};

export const getFounderCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getFounderCount();
};

export const getInvestorCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestorCount();
};

export const getProjectCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getProjectCount();
};

// Utility function to convert stats to UI format with proper number formatting
export const getFormattedDashboardStats = async (): Promise<UIDashboardStats> => {
  const stats = await getPlatformStats();
  
  return {
    totalProjects: Number(stats.totalProjects),
    activeProjects: Number(stats.activeProjects),
    totalFundingRaised: Number(stats.totalFundingRaised) / 100000000, // Convert from e8s to ICP
    totalInvestors: Number(stats.totalInvestors),
    totalFounders: Number(stats.totalFounders),
    totalInvestments: Number(stats.totalInvestments),
  };
};

// Health check function
export const healthCheck = async (): Promise<string> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.healthCheck();
}; 