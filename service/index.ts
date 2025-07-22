// Main service exports - single point of import for all services and types

// Export all types
export * from "./types";

// Export from farmerService with renamed exports to avoid conflicts
import * as farmerService from "./farmerService";
export const {
  registerFounder,
  getMyFounderProfile,
  updateMyFounderProfile,
  getFounder,
  getFounderByEmail,
  founderExistsByEmail,
  getAllFounders,
  getFounderCount: getFounderCountFromFarmer,
  updateFounderVerification,
  createProject: createProjectFromFarmer,
  updateProject: updateProjectFromFarmer,
  deleteProject: deleteProjectFromFarmer,
  submitProjectForReview: submitProjectForReviewFromFarmer,
  updateProjectStatus: updateProjectStatusFromFarmer,
  getMyProjects: getMyProjectsFromFarmer,
  getProject: getProjectFromFarmer,
  getProjectsByFounder,
  getInvestmentsForMyProjects: getInvestmentsForMyProjectsFromFarmer
} = farmerService;

// Export from investorService with renamed exports to avoid conflicts
import * as investorService from "./investorService";
export const {
  registerInvestor,
  getMyInvestorProfile,
  updateMyInvestorProfile,
  getInvestor,
  getInvestorByEmail,
  investorExistsByEmail,
  getAllInvestors,
  getInvestorCount: getInvestorCountFromInvestor,
  getMyInvestmentSummaries: getMyInvestmentSummariesFromInvestor,
  getMyInvestments: getMyInvestmentsFromInvestor,
  getInvestorCountForProject: getInvestorCountForProjectFromInvestor,
  updateInvestorVerification
} = investorService;

// Export from investmentProjectService with renamed exports
import * as projectService from "./investmentProjectService";
export const {
  createProject: createProjectFromService,
  getProject: getProjectFromService,
  getAllProjects: getAllProjectsFromService,
  getActiveProjects: getActiveProjectsFromService,
  getMyProjects: getMyProjectsFromService,
  getProjectsByStatus,
  getProjectCount,
  updateProject: updateProjectFromService,
  updateProjectStatus: updateProjectStatusFromService,
  submitProjectForReview: submitProjectForReviewFromService,
  deleteProject: deleteProjectFromService,
  getTotalFundingForProject,
  getInvestorCountForProject: getInvestorCountForProjectFromService
} = projectService;

// Export from marketplaceService with renamed exports
import * as marketService from "./marketplaceService";
export const {
  createNFTCollection: createNFTCollectionFromMarket,
  getNFTCollection: getNFTCollectionFromMarket,
  getNFTCollectionsByProject: getNFTCollectionsByProjectFromMarket,
  getActiveNFTCollections: getActiveNFTCollectionsFromMarket,
  getNFTStats: getNFTStatsFromMarket,
  getAllProjects: getAllProjectsFromMarket,
  getActiveProjects: getActiveProjectsFromMarket
} = marketService;

// Export from portfolioService with renamed exports
import * as portfolioService from "./portfolioService";
export const {
  getMyInvestments: getMyInvestmentsFromPortfolio,
  getMyInvestmentSummaries: getMyInvestmentSummariesFromPortfolio,
  getInvestment: getInvestmentFromPortfolio,
  getInvestmentsForMyProjects: getInvestmentsForMyProjectsFromPortfolio,
  getMyICPBalance: getMyICPBalanceFromPortfolio,
  getFormattedICPBalance
} = portfolioService;

// Export from purchaseService with renamed exports
import * as purchaseService from "./purchaseService";
export const {
  purchaseNFTs,
  getInvestment: getInvestmentFromPurchase,
  getMyInvestments: getMyInvestmentsFromPurchase,
  transferICP,
  simulateICPTransfer,
  getICPTransferFee,
  getMyICPBalance: getMyICPBalanceFromPurchase,
  getNFTCollection: getNFTCollectionFromPurchase
} = purchaseService;

// Export from dashboardService with renamed exports
import * as dashboardService from "./dashboardService";
export const {
  getPlatformStats,
  getNFTStats: getNFTStatsFromDashboard,
  getFounderCount: getFounderCountFromDashboard,
  getInvestorCount: getInvestorCountFromDashboard,
  getProjectCount: getProjectCountFromDashboard,
  getFormattedDashboardStats,
  healthCheck
} = dashboardService;

// Export other services
export * from "./documentService";
export * from "./authService";

// Export from nftService with renamed exports
import * as nftService from "./nftService";
export const {
  createNFTCollection: createNFTCollectionFromNFT,
  getNFTCollection: getNFTCollectionFromNFT,
  getNFTCollectionsByProject: getNFTCollectionsByProjectFromNFT,
  getActiveNFTCollections: getActiveNFTCollectionsFromNFT,
  getNFTStats: getNFTStatsFromNFT
} = nftService;

// Export mock data for development
export * from "./mock"; 