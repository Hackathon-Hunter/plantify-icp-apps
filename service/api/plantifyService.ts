import { ActorSubclass } from "@dfinity/agent";
import {
  _SERVICE,
  CollectionResult,
  CollectionStats,
  CreateCollectionRequest,
  Founder,
  FounderRegistrationRequest,
  FounderRegistrationResult,
  FounderUpdateResult,
  ICPTransferRequest,
  Investment,
  InvestmentSummary,
  Investor,
  InvestorRegistrationRequest,
  InvestorRegistrationResult,
  InvestorUpdateResult,
  NFTCollection,
  Project,
  ProjectCreateRequest,
  ProjectResult,
  ProjectStatus,
  ProjectUpdateRequest,
  ProjectUpdateResult,
  PurchaseRequest,
  PurchaseResult,
  TransferResult,
  Industry,
  ProjectType,
} from "../declarations/plantify-backend.did";

// =============================================
// FOUNDER MANAGEMENT
// =============================================

// Register a new founder
export const registerFounder = async (
  actor: ActorSubclass<_SERVICE>,
  args: FounderRegistrationRequest
): Promise<FounderRegistrationResult> => {
  try {
    const result = await actor.registerFounder(args);
    return result;
  } catch (error) {
    console.error("Error registering founder:", error);
    throw error;
  }
};

// Get founder by ID
export const getFounder = async (
  actor: ActorSubclass<_SERVICE>,
  founderId: string
): Promise<Founder | undefined> => {
  try {
    const result = await actor.getFounder(founderId);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching founder:", error);
    throw error;
  }
};

// Get founder by email
export const getFounderByEmail = async (
  actor: ActorSubclass<_SERVICE>,
  email: string
): Promise<Founder | undefined> => {
  try {
    const result = await actor.getFounderByEmail(email);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching founder by email:", error);
    throw error;
  }
};

// Check if founder exists by email
export const founderExistsByEmail = async (
  actor: ActorSubclass<_SERVICE>,
  email: string
): Promise<boolean> => {
  try {
    const result = await actor.founderExistsByEmail(email);
    return result;
  } catch (error) {
    console.error("Error checking if founder exists:", error);
    throw error;
  }
};

// Get my founder profile
export const getMyFounderProfile = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Founder | undefined> => {
  try {
    const result = await actor.getMyFounderProfile();
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching my founder profile:", error);
    throw error;
  }
};

// Update my founder profile
export const updateMyFounderProfile = async (
  actor: ActorSubclass<_SERVICE>,
  founderId: string,
  args: FounderRegistrationRequest
): Promise<FounderUpdateResult> => {
  try {
    const result = await actor.updateMyFounderProfile(founderId, args);
    return result;
  } catch (error) {
    console.error("Error updating founder profile:", error);
    throw error;
  }
};

// Update founder verification status
export const updateFounderVerification = async (
  actor: ActorSubclass<_SERVICE>,
  founderId: string,
  isVerified: boolean
): Promise<FounderUpdateResult> => {
  try {
    const result = await actor.updateFounderVerification(founderId, isVerified);
    return result;
  } catch (error) {
    console.error("Error updating founder verification:", error);
    throw error;
  }
};

// Get all founders
export const getAllFounders = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Founder[]> => {
  try {
    const result = await actor.getAllFounders();
    return result;
  } catch (error) {
    console.error("Error fetching all founders:", error);
    throw error;
  }
};

// Get founder count
export const getFounderCount = async (
  actor: ActorSubclass<_SERVICE>
): Promise<bigint> => {
  try {
    const result = await actor.getFounderCount();
    return result;
  } catch (error) {
    console.error("Error fetching founder count:", error);
    throw error;
  }
};

// =============================================
// INVESTOR MANAGEMENT
// =============================================

// Register a new investor
export const registerInvestor = async (
  actor: ActorSubclass<_SERVICE>,
  args: InvestorRegistrationRequest
): Promise<InvestorRegistrationResult> => {
  try {
    const result = await actor.registerInvestor(args);
    return result;
  } catch (error) {
    console.error("Error registering investor:", error);
    throw error;
  }
};

// Get investor by ID
export const getInvestor = async (
  actor: ActorSubclass<_SERVICE>,
  investorId: string
): Promise<Investor | undefined> => {
  try {
    const result = await actor.getInvestor(investorId);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching investor:", error);
    throw error;
  }
};

// Get investor by email
export const getInvestorByEmail = async (
  actor: ActorSubclass<_SERVICE>,
  email: string
): Promise<Investor | undefined> => {
  try {
    const result = await actor.getInvestorByEmail(email);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching investor by email:", error);
    throw error;
  }
};

// Check if investor exists by email
export const investorExistsByEmail = async (
  actor: ActorSubclass<_SERVICE>,
  email: string
): Promise<boolean> => {
  try {
    const result = await actor.investorExistsByEmail(email);
    return result;
  } catch (error) {
    console.error("Error checking if investor exists:", error);
    throw error;
  }
};

// Get my investor profile
export const getMyInvestorProfile = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Investor | undefined> => {
  try {
    const result = await actor.getMyInvestorProfile();
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching my investor profile:", error);
    throw error;
  }
};

// Update my investor profile
export const updateMyInvestorProfile = async (
  actor: ActorSubclass<_SERVICE>,
  investorId: string,
  args: InvestorRegistrationRequest
): Promise<InvestorUpdateResult> => {
  try {
    const result = await actor.updateMyInvestorProfile(investorId, args);
    return result;
  } catch (error) {
    console.error("Error updating investor profile:", error);
    throw error;
  }
};

// Update investor verification status
export const updateInvestorVerification = async (
  actor: ActorSubclass<_SERVICE>,
  investorId: string,
  isVerified: boolean
): Promise<InvestorUpdateResult> => {
  try {
    const result = await actor.updateInvestorVerification(
      investorId,
      isVerified
    );
    return result;
  } catch (error) {
    console.error("Error updating investor verification:", error);
    throw error;
  }
};

// Get all investors
export const getAllInvestors = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Investor[]> => {
  try {
    const result = await actor.getAllInvestors();
    return result;
  } catch (error) {
    console.error("Error fetching all investors:", error);
    throw error;
  }
};

// Get investor count
export const getInvestorCount = async (
  actor: ActorSubclass<_SERVICE>
): Promise<bigint> => {
  try {
    const result = await actor.getInvestorCount();
    return result;
  } catch (error) {
    console.error("Error fetching investor count:", error);
    throw error;
  }
};

// =============================================
// PROJECT MANAGEMENT
// =============================================

// Type for form data needed to create a project
export interface ProjectFormDataType {
  companyName: string;
  industry: Industry | null;
  projectType: ProjectType | null;
  companyTagline: string;
  location: string;
  website?: string;
  problem: string;
  solution: string;
  marketOpportunity: string;
  fundingGoal: number;
  companyValuation: number;
  minInvestment: number;
  maxInvestment?: number;
  expectedROI: string;
  riskLevel: string;
  timeline: string;
  useOfFunds: Array<{
    category: string;
    amount: number;
    percentage: number;
    description: string;
  }>;
  teamMembers: Array<{
    name: string;
    role: string;
    bio?: string;
    imageUrl?: string;
    linkedinUrl?: string;
  }>;
  milestones: Array<{
    title: string;
    description: string;
    fundingRequired: number;
    targetDate?: Date;
    completed: boolean;
  }>;
  productImages: string[];
  companyLogo?: string;
  pitchDeckUrl?: string;
  demoVideoUrl?: string;
  tags: string[];
  minimumFunding: number;
}

// Helper function to safely handle conversion
const createDefaultIndustry = (): Industry => ({ Other: null });
const createDefaultProjectType = (): ProjectType => ({ Other: null });

// Utility to convert form data to ProjectCreateRequest
export const createProjectRequestFromForm = (formData: ProjectFormDataType): ProjectCreateRequest => {
  console.log("Converting form data to project request:", formData);
  
  return {
    companyName: formData.companyName || "",
    industry: formData.industry || createDefaultIndustry(),
    projectType: formData.projectType || createDefaultProjectType(),
    companyTagline: formData.companyTagline || "",
    location: formData.location || "",
    website: formData.website && formData.website.trim() !== '' ? [formData.website] : [],
    problem: formData.problem || "",
    solution: formData.solution || "",
    marketOpportunity: formData.marketOpportunity || "",
    fundingGoal: BigInt(formData.fundingGoal || 0),
    companyValuation: BigInt(formData.companyValuation || 0),
    minInvestment: BigInt(formData.minInvestment || 0),
    maxInvestment: formData.maxInvestment ? [BigInt(formData.maxInvestment)] : [],
    expectedROI: formData.expectedROI || "",
    riskLevel: formData.riskLevel || "Medium",
    timeline: formData.timeline || "",
    useOfFunds: (formData.useOfFunds || []).map(item => ({
      category: item.category || "",
      amount: BigInt(item.amount || 0),
      percentage: item.percentage || 0,
      description: item.description || ""
    })),
    teamMembers: (formData.teamMembers || []).map(member => ({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio && member.bio.trim() !== '' ? [member.bio] : [],
      imageUrl: member.imageUrl && member.imageUrl.trim() !== '' ? [member.imageUrl] : [],
      linkedinUrl: member.linkedinUrl && member.linkedinUrl.trim() !== '' ? [member.linkedinUrl] : []
    })),
    milestones: (formData.milestones || []).map(milestone => ({
      title: milestone.title || "",
      description: milestone.description || "",
      fundingRequired: BigInt(milestone.fundingRequired || 0),
      targetDate: milestone.targetDate ? [BigInt(milestone.targetDate.getTime())] : [],
      completed: milestone.completed || false,
      completedDate: []
    })),
    productImages: formData.productImages || [],
    companyLogo: formData.companyLogo && formData.companyLogo.trim() !== '' ? [formData.companyLogo] : [],
    pitchDeckUrl: formData.pitchDeckUrl && formData.pitchDeckUrl.trim() !== '' ? [formData.pitchDeckUrl] : [],
    demoVideoUrl: formData.demoVideoUrl && formData.demoVideoUrl.trim() !== '' ? [formData.demoVideoUrl] : [],
    tags: formData.tags || [],
    minimumFunding: BigInt(formData.minimumFunding || 0),
    jurisdiction: [],
    legalStructure: [],
    targetDate: []
  };
};

// Create a new project
export const createProject = async (
  actor: ActorSubclass<_SERVICE>,
  args: ProjectCreateRequest
): Promise<ProjectResult> => {
  console.log("Creating project:", args);
  try {
    const result = await actor.createProject(args);
    return result;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// Get project by ID
export const getProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<Project | undefined> => {
  try {
    const result = await actor.getProject(projectId);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

// Update project
export const updateProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string,
  args: ProjectUpdateRequest
): Promise<ProjectUpdateResult> => {
  try {
    const result = await actor.updateProject(projectId, args);
    return result;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Update project status
export const updateProjectStatus = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string,
  status: ProjectStatus
): Promise<ProjectUpdateResult> => {
  try {
    const result = await actor.updateProjectStatus(projectId, status);
    return result;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<ProjectUpdateResult> => {
  try {
    const result = await actor.deleteProject(projectId);
    return result;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Submit project for review
export const submitProjectForReview = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<ProjectUpdateResult> => {
  try {
    const result = await actor.submitProjectForReview(projectId);
    return result;
  } catch (error) {
    console.error("Error submitting project for review:", error);
    throw error;
  }
};

// Get all projects
export const getAllProjects = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Project[]> => {
  console.log("fetching all projects");
  try {
    console.log("fetching all projects 2");
    const result = await actor.getAllProjects();
    console.log("result1", result);
    return result;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

// Get active projects
export const getActiveProjects = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Project[]> => {
  try {
    const result = await actor.getActiveProjects();
    return result;
  } catch (error) {
    console.error("Error fetching active projects:", error);
    throw error;
  }
};

// Get my projects
export const getMyProjects = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Project[]> => {
  try {
    const result = await actor.getMyProjects();
    return result;
  } catch (error) {
    console.error("Error fetching my projects:", error);
    throw error;
  }
};

// Get projects by founder
export const getProjectsByFounder = async (
  actor: ActorSubclass<_SERVICE>,
  founderId: string
): Promise<Project[]> => {
  try {
    const result = await actor.getProjectsByFounder(founderId);
    return result;
  } catch (error) {
    console.error("Error fetching projects by founder:", error);
    throw error;
  }
};

// Get projects by status
export const getProjectsByStatus = async (
  actor: ActorSubclass<_SERVICE>,
  status: ProjectStatus
): Promise<Project[]> => {
  try {
    const result = await actor.getProjectsByStatus(status);
    return result;
  } catch (error) {
    console.error("Error fetching projects by status:", error);
    throw error;
  }
};

// Get project count
export const getProjectCount = async (
  actor: ActorSubclass<_SERVICE>
): Promise<bigint> => {
  try {
    const result = await actor.getProjectCount();
    return result;
  } catch (error) {
    console.error("Error fetching project count:", error);
    throw error;
  }
};

// Get total funding for project
export const getTotalFundingForProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<bigint> => {
  try {
    const result = await actor.getTotalFundingForProject(projectId);
    return result;
  } catch (error) {
    console.error("Error fetching total funding for project:", error);
    throw error;
  }
};

// Get investor count for project
export const getInvestorCountForProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<bigint> => {
  try {
    const result = await actor.getInvestorCountForProject(projectId);
    return result;
  } catch (error) {
    console.error("Error fetching investor count for project:", error);
    throw error;
  }
};

// =============================================
// NFT COLLECTION MANAGEMENT
// =============================================

// Create NFT collection
export const createNFTCollection = async (
  actor: ActorSubclass<_SERVICE>,
  args: CreateCollectionRequest
): Promise<CollectionResult> => {
  try {
    const result = await actor.createNFTCollection(args);
    return result;
  } catch (error) {
    console.error("Error creating NFT collection:", error);
    throw error;
  }
};

// Get NFT collection by ID
export const getNFTCollection = async (
  actor: ActorSubclass<_SERVICE>,
  collectionId: string
): Promise<NFTCollection | undefined> => {
  try {
    const result = await actor.getNFTCollection(collectionId);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching NFT collection:", error);
    throw error;
  }
};

// Get active NFT collections
export const getActiveNFTCollections = async (
  actor: ActorSubclass<_SERVICE>
): Promise<NFTCollection[]> => {
  try {
    const result = await actor.getActiveNFTCollections();
    return result;
  } catch (error) {
    console.error("Error fetching active NFT collections:", error);
    throw error;
  }
};

// Get NFT collections by project
export const getNFTCollectionsByProject = async (
  actor: ActorSubclass<_SERVICE>,
  projectId: string
): Promise<NFTCollection[]> => {
  try {
    const result = await actor.getNFTCollectionsByProject(projectId);
    return result;
  } catch (error) {
    console.error("Error fetching NFT collections by project:", error);
    throw error;
  }
};

// Get NFT stats
export const getNFTStats = async (
  actor: ActorSubclass<_SERVICE>
): Promise<CollectionStats> => {
  try {
    const result = await actor.getNFTStats();
    return result;
  } catch (error) {
    console.error("Error fetching NFT stats:", error);
    throw error;
  }
};

// =============================================
// INVESTMENT MANAGEMENT
// =============================================

// Purchase NFTs
export const purchaseNFTs = async (
  actor: ActorSubclass<_SERVICE>,
  args: PurchaseRequest
): Promise<PurchaseResult> => {
  try {
    const result = await actor.purchaseNFTs(args);
    return result;
  } catch (error) {
    console.error("Error purchasing NFTs:", error);
    throw error;
  }
};

// Get investment by ID
export const getInvestment = async (
  actor: ActorSubclass<_SERVICE>,
  investmentId: string
): Promise<Investment | undefined> => {
  try {
    const result = await actor.getInvestment(investmentId);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("Error fetching investment:", error);
    throw error;
  }
};

// Get my investments
export const getMyInvestments = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Investment[]> => {
  try {
    const result = await actor.getMyInvestments();
    return result;
  } catch (error) {
    console.error("Error fetching my investments:", error);
    throw error;
  }
};

// Get my investment summaries
export const getMyInvestmentSummaries = async (
  actor: ActorSubclass<_SERVICE>
): Promise<InvestmentSummary[]> => {
  try {
    const result = await actor.getMyInvestmentSummaries();
    return result;
  } catch (error) {
    console.error("Error fetching my investment summaries:", error);
    throw error;
  }
};

// Get investments for my projects
export const getInvestmentsForMyProjects = async (
  actor: ActorSubclass<_SERVICE>
): Promise<Investment[]> => {
  try {
    const result = await actor.getInvestmentsForMyProjects();
    return result;
  } catch (error) {
    console.error("Error fetching investments for my projects:", error);
    throw error;
  }
};

// =============================================
// ICP TRANSFER
// =============================================

// Transfer ICP
export const transferICP = async (
  actor: ActorSubclass<_SERVICE>,
  args: ICPTransferRequest
): Promise<TransferResult> => {
  try {
    const result = await actor.transferICP(args);
    return result;
  } catch (error) {
    console.error("Error transferring ICP:", error);
    throw error;
  }
};

// Simulate ICP transfer
export const simulateICPTransfer = async (
  actor: ActorSubclass<_SERVICE>,
  args: ICPTransferRequest
): Promise<TransferResult> => {
  try {
    const result = await actor.simulateICPTransfer(args);
    return result;
  } catch (error) {
    console.error("Error simulating ICP transfer:", error);
    throw error;
  }
};

// Get ICP transfer fee
export const getICPTransferFee = async (
  actor: ActorSubclass<_SERVICE>
): Promise<bigint> => {
  try {
    const result = await actor.getICPTransferFee();
    return result;
  } catch (error) {
    console.error("Error fetching ICP transfer fee:", error);
    throw error;
  }
};

// Get my ICP balance
export const getMyICPBalance = async (
  actor: ActorSubclass<_SERVICE>
): Promise<{ ok: bigint } | { err: string }> => {
  try {
    const result = await actor.getMyICPBalance();
    return result;
  } catch (error) {
    console.error("Error fetching my ICP balance:", error);
    throw error;
  }
};

// =============================================
// PLATFORM STATISTICS
// =============================================

// Get platform stats
export const getPlatformStats = async (
  actor: ActorSubclass<_SERVICE>
): Promise<{
  totalFundingRaised: bigint;
  activeProjects: bigint;
  totalFounders: bigint;
  totalProjects: bigint;
  totalInvestments: bigint;
  totalInvestors: bigint;
}> => {
  try {
    const result = await actor.getPlatformStats();
    return result;
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    throw error;
  }
};

// =============================================
// HEALTH CHECK
// =============================================

// Health check
export const healthCheck = async (
  actor: ActorSubclass<_SERVICE>
): Promise<string> => {
  try {
    const result = await actor.healthCheck();
    return result;
  } catch (error) {
    console.error("Error performing health check:", error);
    throw error;
  }
};
