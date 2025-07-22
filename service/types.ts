// Re-export all types from backend declarations for use in components
// This provides a clean interface and prevents components from directly importing .did files

export type {
  // Core types
  Project,
  ProjectStatus,
  ProjectType,
  ProjectResult,
  ProjectUpdateResult,
  
  // Collection types
  NFTCollection,
  CollectionMetadata,
  CollectionResult,
  CollectionStats,
  CreateCollectionRequest,
  
  // Founder types
  Founder,
  FounderRegistrationRequest,
  FounderRegistrationResult,
  FounderUpdateResult,
  
  // Investor types
  Investor,
  InvestorRegistrationRequest,
  InvestorRegistrationResult,
  InvestorUpdateResult,
  
  // Investment types
  Investment,
  InvestmentStatus,
  InvestmentSummary,
  
  // Project types
  ProjectCreateRequest,
  ProjectUpdateRequest,
  
  // Purchase types
  PurchaseRequest,
  PurchaseResult,
  
  // ICP types
  ICPTransferRequest,
  TransferResult,
} from "./declarations/plantify-backend.did";

// UI-specific types for transformed data
export interface UIProjectData {
  id: string;
  title: string;
  location: string;
  category: string;
  projectType: string;
  status: string;
  fundingProgress: { current: number; target: number; percentage: number };
  investors: number;
  timeline: string;
  expectedROI: string;
  riskLevel: string;
  lastUpdate: string;
  statusColor: string;
}

export interface UIDashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalFundingRaised: number;
  totalInvestors: number;
  totalFounders: number;
  totalInvestments: number;
} 