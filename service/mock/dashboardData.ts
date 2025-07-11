import {
  FarmerStats,
  InvestorStats,
  InvestmentStats,
  VerificationStatus,
} from "../declarations/plantify-backend.did";
import { Principal } from "@dfinity/principal";

export const mockFarmerStats: FarmerStats = {
  totalFarmers: BigInt(150),
  approvedFarmers: BigInt(89),
  pendingVerification: BigInt(45),
  rejectedFarmers: BigInt(16),
};

export const mockInvestorStats: InvestorStats = {
  totalInvestors: BigInt(1250),
  activeInvestors: BigInt(950),
  inactiveInvestors: BigInt(275),
  suspendedInvestors: BigInt(25),
  totalInvestmentVolume: BigInt(2500000000), // 2.5B IDR
  averageInvestmentAmount: BigInt(15000000), // 15M IDR
};

export const mockInvestmentStats: InvestmentStats = {
  totalProjects: BigInt(79), // Increased from 78 to account for completed project
  activeProjects: BigInt(47), // Same as before
  approvedProjects: BigInt(62), // Same as before  
  pendingVerification: BigInt(11), // Same as before
  rejectedProjects: BigInt(5),
  completedProjects: BigInt(16), // Increased from 15 to account for new completed project
};

export const mockMyDashboardData = {
  userType: "farmer", // or "investor" or "both"
  farmerData: [
    {
      totalProjects: BigInt(4), // Updated from 3 to 4 to include completed project
      activeProjects: BigInt(2), // Rice (Active), Coffee (PendingVerification), Vegetable (Approved), Fruit (Completed)
      totalFundingRaised: BigInt(115000000), // Total funding for all 4 projects: 25M + 40M + 15M + 35M = 115M IDR
      verificationStatus: { Approved: null } as VerificationStatus,
    },
  ],
  investorData: [
    {
      totalInvestments: BigInt(5),
      portfolioValue: BigInt(55000000), // 55M IDR
      totalReturns: BigInt(5000000), // 5M IDR
      roiPercentage: 10.0,
    },
  ],
};

export const mockAdminDashboardStats = {
  users: {
    farmers: mockFarmerStats,
    investors: mockInvestorStats,
  },
  projects: mockInvestmentStats,
  nfts: {
    totalSupply: BigInt(225),
    totalCollections: BigInt(3),
    averagePrice: BigInt(500000),
    totalVolume: BigInt(112500000), // Total NFT sales volume
  },
  financial: {
    totalInvestmentVolume: BigInt(2500000000), // 2.5B IDR
    platformRevenue: BigInt(125000000), // 125M IDR (5% platform fee)
    averageInvestmentSize: BigInt(15000000), // 15M IDR
  },
};

export const mockPlatformOverview = {
  farmers: mockFarmerStats,
  investors: mockInvestorStats,
  investments: mockInvestmentStats,
  nfts: {
    totalSupply: BigInt(225),
    totalCollections: BigInt(3),
  },
};

export const mockPlatformMetrics = {
  totalUsers: BigInt(1400), // farmers + investors
  totalFarmers: BigInt(150),
  totalInvestors: BigInt(1250),
  totalInvestmentProjects: BigInt(79), // Updated from 78 to reflect completed project
  totalInvestmentVolume: BigInt(2615000000), // Updated from 2580000000 to reflect completed project funding (added 35M)
  averageInvestmentSize: BigInt(15000000), // 15M IDR
  platformGrowthRate: 25.5, // 25.5% month-over-month growth
};

export const mockMarketplaceOverview = {
  totalInvestmentOpportunities: BigInt(47), // Updated from 45 to reflect active projects
  totalFundingAvailable: BigInt(1200000000), // Updated from 1.125B to reflect new funding opportunities
  averageROI: 18.5, // 18.5% average ROI
  activeProjects: BigInt(47), // Updated from 45 to reflect active projects
  topPerformingCrops: ["Rice", "Vegetables", "Coffee", "Fruits"],
};

export const mockRegistrationStatus = {
  isFarmer: true,
  isInvestor: false,
  farmerStatus: [{ Approved: null } as VerificationStatus],
  investorStatus: [],
};

export const mockRecentInvestmentActivity = [
  {
    id: BigInt(4),
    farmerId: Principal.anonymous(),
    status: { Active: null },
    createdAt: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    lastUpdated: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    approvedAt: [BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000)] as [bigint],
    rejectedReason: [] as [],
    verificationNotes: [] as [],
    agreements: [true, true, true, true, true],
    farmInfo: {
      farmSize: "4.0 hectares",
      country: "Indonesia",
      stateProvince: "West Java",
      cityDistrict: "Bandung",
      gpsCoordinates: ["-6.9175, 107.6191"] as [string],
      accessRoads: { Good: null },
      landOwnership: { Owned: null },
      cropType: { Coffee: null },
      waterSource: "Natural spring water",
      fundingRequired: BigInt(35000000), // 35M IDR
    },
    experience: {
      farmingExperience: { Experienced: null },
      cultivationMethod: { Organic: null },
      harvestTimeline: { Long: null },
      investmentDescription:
        "Premium coffee plantation with specialty varieties",
      marketDistribution: [{ ExportBuyers: null }] as [{ ExportBuyers: null }],
      expectedYield: "2 tons per hectare",
    },
    budget: {
      budgetAllocation: {
        seeds: BigInt(8000000),
        fertilizers: BigInt(4000000),
        equipment: BigInt(12000000),
        labor: BigInt(8000000),
        infrastructure: BigInt(2000000),
        operational: BigInt(1000000),
        insurance: BigInt(500000),
      },
      expectedMinROI: BigInt(25),
      expectedMaxROI: BigInt(40),
      hasBusinessBankAccount: true,
      previousFarmingLoans: [false] as [boolean],
      emergencyContactName: "Rini Susanti",
      emergencyContactPhone: "+62814567890",
    },
    documents: [] as [],
  },
];
