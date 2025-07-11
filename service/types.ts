// Re-export all types from backend declarations for use in components
// This provides a clean interface and prevents components from directly importing .did files

export type {
  // Core types
  FarmerId,
  InvestorId,
  InvestmentId,
  TokenId,

  // Investment Project types
  InvestmentProject,
  InvestmentStatus,
  InvestmentProjectResult,
  CreateInvestmentRequest,
  
  // Farm types
  FarmerProfile,
  FarmInfoRequest,
  ExperienceRequest,
  BudgetRequest,
  BudgetAllocation,
  
  // Investor types
  InvestorProfile,
  InvestorPortfolio,
  InvestorInvestment,
  InvestorStatus,
  
  // NFT types
  NFTCollection,
  FarmNFTMetadata,
  PurchaseNFTRequest,
  PurchaseNFTResult,
  
  // Registration types
  RegisterFarmerRequest,
  FarmerRegistrationResult,
  RegisterInvestorRequest,
  InvestorRegistrationResult,
  
  // Document types
  Document,
  InvestmentDocument,
  UploadDocumentRequest,
  DocumentType,
  DocumentType__1,
  
  // Verification types
  VerificationStatus,
  VerificationTracker,
  VerificationStep,
  
  // Stats types
  FarmerStats,
  InvestorStats,
  InvestmentStats,
  
  // Enum types
  CropType,
  LandOwnership,
  AccessRoadCondition,
  ExperienceLevel,
  CultivationMethod,
  HarvestTimeline,
  MarketDistribution,
  
  // Utility types
  Result,
  Result_1,
} from "./declarations/plantify-backend.did";

// UI-specific types for transformed data
export interface UIProjectData {
  id: number;
  title: string;
  location: string;
  crop: string;
  area: string;
  status: string;
  fundingProgress: { current: number; target: number; percentage: number };
  investors: number;
  timeline: string;
  expectedYield: { amount: number; unit: string };
  roi: string;
  lastUpdate: string;
  statusColor: string;
  verificationStatus?: string;
}

export interface UIDashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalFundingRaised: number;
  totalInvestors: number;
  averageROI: number;
} 