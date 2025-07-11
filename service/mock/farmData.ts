import { Principal } from "@dfinity/principal";

// Mock data for farm-related functionality
export const mockFarmerId = Principal.anonymous();
export const mockFarmerId2 = Principal.anonymous();
export const mockFarmerId3 = Principal.anonymous();
export const mockFarmerId4 = Principal.anonymous();
export const mockInvestmentId = BigInt(1);

export const mockInvestmentProject = {
  id: mockInvestmentId,
  farmerId: mockFarmerId,
  status: { Active: null },
  createdAt: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000),
  lastUpdated: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
  approvedAt: [BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000)] as [bigint],
  rejectedReason: [] as [],
  verificationNotes: ["All documents verified"] as [string],
  agreements: [true, true, true, true, true],
  farmInfo: {
    farmSize: "5.5 hectares",
    country: "Indonesia",
    stateProvince: "Central Java",
    cityDistrict: "Magelang",
    gpsCoordinates: ["-7.4704, 110.2180"] as [string],
    accessRoads: { Good: null },
    landOwnership: { Owned: null },
    cropType: { Rice: null },
    waterSource: "Irrigation system",
    fundingRequired: BigInt(25000000),
  },
  experience: {
    farmingExperience: { Experienced: null },
    cultivationMethod: { Organic: null },
    harvestTimeline: { Medium: null },
    investmentDescription: "Organic rice farming",
    marketDistribution: [{ LocalMarkets: null }] as [{ LocalMarkets: null }],
    expectedYield: "7 tons per hectare",
  },
  budget: {
    budgetAllocation: {
      seeds: BigInt(5000000),
      fertilizers: BigInt(3000000),
      equipment: BigInt(8000000),
      labor: BigInt(6000000),
      infrastructure: BigInt(2000000),
      operational: BigInt(1000000),
      insurance: BigInt(500000),
    },
    expectedMinROI: BigInt(15),
    expectedMaxROI: BigInt(25),
    hasBusinessBankAccount: true,
    previousFarmingLoans: [false] as [boolean],
    emergencyContactName: "Siti Nurhaliza",
    emergencyContactPhone: "+62812345678",
  },
  documents: [] as [],
};

// Coffee plantation project
export const mockCoffeeProject = {
  id: BigInt(2),
  farmerId: mockFarmerId2,
  status: { PendingVerification: null },
  createdAt: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000),
  lastUpdated: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
  approvedAt: [] as [],
  rejectedReason: [] as [],
  verificationNotes: ["Documents under review"] as [string],
  agreements: [true, true, true, true, true],
  farmInfo: {
    farmSize: "3.2 hectares",
    country: "Indonesia",
    stateProvince: "West Java",
    cityDistrict: "Bandung",
    gpsCoordinates: ["-6.9175, 107.6191"] as [string],
    accessRoads: { Good: null },
    landOwnership: { Owned: null },
    cropType: { Coffee: null },
    waterSource: "Mountain spring water",
    fundingRequired: BigInt(40000000),
  },
  experience: {
    farmingExperience: { Experienced: null },
    cultivationMethod: { Organic: null },
    harvestTimeline: { Long: null },
    investmentDescription: "Premium arabica coffee plantation",
    marketDistribution: [{ ExportBuyers: null }] as [{ ExportBuyers: null }],
    expectedYield: "2.5 tons per hectare",
  },
  budget: {
    budgetAllocation: {
      seeds: BigInt(8000000),
      fertilizers: BigInt(5000000),
      equipment: BigInt(12000000),
      labor: BigInt(8000000),
      infrastructure: BigInt(4000000),
      operational: BigInt(2000000),
      insurance: BigInt(1000000),
    },
    expectedMinROI: BigInt(25),
    expectedMaxROI: BigInt(40),
    hasBusinessBankAccount: true,
    previousFarmingLoans: [false] as [boolean],
    emergencyContactName: "Dewi Sartika",
    emergencyContactPhone: "+62813456789",
  },
  documents: [] as [],
};

// Vegetable farming project
export const mockVegetableProject = {
  id: BigInt(3),
  farmerId: mockFarmerId3,
  status: { Approved: null },
  createdAt: BigInt(Date.now() - 45 * 24 * 60 * 60 * 1000),
  lastUpdated: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000),
  approvedAt: [BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000)] as [bigint],
  rejectedReason: [] as [],
  verificationNotes: ["Approved for funding"] as [string],
  agreements: [true, true, true, true, true],
  farmInfo: {
    farmSize: "2.0 hectares",
    country: "Indonesia",
    stateProvince: "East Java",
    cityDistrict: "Malang",
    gpsCoordinates: ["-7.9797, 112.6304"] as [string],
    accessRoads: { Good: null },
    landOwnership: { Owned: null },
    cropType: { Vegetables: null },
    waterSource: "Drip irrigation system",
    fundingRequired: BigInt(15000000),
  },
  experience: {
    farmingExperience: { Experienced: null },
    cultivationMethod: { Organic: null },
    harvestTimeline: { Short: null },
    investmentDescription: "Organic vegetable farming with greenhouse technology",
    marketDistribution: [{ LocalMarkets: null }] as [{ LocalMarkets: null }],
    expectedYield: "15 tons per hectare",
  },
  budget: {
    budgetAllocation: {
      seeds: BigInt(3000000),
      fertilizers: BigInt(2000000),
      equipment: BigInt(4000000),
      labor: BigInt(3000000),
      infrastructure: BigInt(2000000),
      operational: BigInt(800000),
      insurance: BigInt(200000),
    },
    expectedMinROI: BigInt(20),
    expectedMaxROI: BigInt(35),
    hasBusinessBankAccount: true,
    previousFarmingLoans: [false] as [boolean],
    emergencyContactName: "Ahmad Sudrajat",
    emergencyContactPhone: "+62814567890",
  },
  documents: [] as [],
};

// Completed fruit farming project
export const mockCompletedFruitProject = {
  id: BigInt(4),
  farmerId: mockFarmerId4,
  status: { Completed: null },
  createdAt: BigInt(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
  lastUpdated: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
  approvedAt: [BigInt(Date.now() - 150 * 24 * 60 * 60 * 1000)] as [bigint], // 5 months ago
  rejectedReason: [] as [],
  verificationNotes: ["Project completed successfully with excellent yields"] as [string],
  agreements: [true, true, true, true, true],
  farmInfo: {
    farmSize: "4.5 hectares",
    country: "Indonesia",
    stateProvince: "North Sumatra",
    cityDistrict: "Medan",
    gpsCoordinates: ["3.5952, 98.6722"] as [string],
    accessRoads: { Good: null },
    landOwnership: { Owned: null },
    cropType: { Fruits: null },
    waterSource: "Rainwater harvesting system",
    fundingRequired: BigInt(35000000),
  },
  experience: {
    farmingExperience: { Experienced: null },
    cultivationMethod: { Organic: null },
    harvestTimeline: { Medium: null },
    investmentDescription: "Organic tropical fruit orchard with mango and durian",
    marketDistribution: [{ ExportBuyers: null }] as [{ ExportBuyers: null }],
    expectedYield: "12 tons per hectare",
  },
  budget: {
    budgetAllocation: {
      seeds: BigInt(7000000),
      fertilizers: BigInt(4000000),
      equipment: BigInt(10000000),
      labor: BigInt(8000000),
      infrastructure: BigInt(3000000),
      operational: BigInt(2000000),
      insurance: BigInt(1000000),
    },
    expectedMinROI: BigInt(18),
    expectedMaxROI: BigInt(30),
    hasBusinessBankAccount: true,
    previousFarmingLoans: [false] as [boolean],
    emergencyContactName: "Indira Sari",
    emergencyContactPhone: "+62815678901",
  },
  documents: [] as [],
};

export const mockFarmerProfile = {
  farmerId: mockFarmerId,
  fullName: "Budi Santoso",
  email: "budi.santoso@example.com",
  phoneNumber: "+62812345678",
  governmentId: "3301234567890001",
  registrationDate: BigInt(Date.now() - 60 * 24 * 60 * 60 * 1000),
  lastUpdated: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
  verificationStatus: { Approved: null },
  isActive: true,
  documents: [] as [],
};

export const mockVerificationTracker = {
  investmentId: mockInvestmentId,
  currentStep: "Document Review",
  overallProgress: BigInt(75),
  lastUpdated: BigInt(Date.now() - 24 * 60 * 60 * 1000),
  steps: [
    {
      stepName: "Document Submission",
      description: "Submit all required documents",
      status: { Completed: null },
      completedAt: [BigInt(Date.now() - 25 * 24 * 60 * 60 * 1000)] as [bigint],
      estimatedTime: "1-2 days",
      notes: ["All documents received"] as [string],
    },
    {
      stepName: "Document Review",
      description: "Review and validate documents",
      status: { InProgress: null },
      completedAt: [] as [],
      estimatedTime: "3-5 days",
      notes: [] as [],
    },
  ],
};

// Central mock data management
export const getAllMockProjects = () => [
  mockInvestmentProject,
  mockCoffeeProject, 
  mockVegetableProject,
  mockCompletedFruitProject
];

// Helper functions to simulate real API behavior
export const getMockProjectsByFarmer = (_farmerId: Principal) => {
  // In reality, this would filter by farmerId from the database
  // For now, return all projects as if they belong to the current farmer
  return getAllMockProjects();
};

export const getMockProjectsByStatus = (status: string) => {
  const allProjects = getAllMockProjects();
  // In reality, this would filter by status from the database
  switch (status) {
    case 'Active':
      return allProjects.filter(p => 'Active' in p.status);
    case 'Completed':
      return allProjects.filter(p => 'Completed' in p.status);
    case 'PendingVerification':
      return allProjects.filter(p => 'PendingVerification' in p.status);
    case 'Approved':
      return allProjects.filter(p => 'Approved' in p.status);
    default:
      return allProjects;
  }
};

export const getMockInvestmentOpportunities = () => {
  // In reality, this would only return active/approved projects available for investment
  // Exclude completed projects from investment opportunities
  return getAllMockProjects().filter(p => !('Completed' in p.status));
};

export const getMockSearchResults = (filters: {
  cropType?: string;
  location?: string;
  minFunding?: bigint;
  maxFunding?: bigint;
  status?: string;
}) => {
  let projects = getAllMockProjects();
  
  // In reality, this would be a database query with WHERE clauses
  if (filters.cropType) {
    projects = projects.filter(p => {
      if (filters.cropType === 'Rice') return 'Rice' in p.farmInfo.cropType;
      if (filters.cropType === 'Coffee') return 'Coffee' in p.farmInfo.cropType;
      if (filters.cropType === 'Vegetables') return 'Vegetables' in p.farmInfo.cropType;
      if (filters.cropType === 'Fruits') return 'Fruits' in p.farmInfo.cropType;
      return false;
    });
  }
  
  if (filters.location) {
    projects = projects.filter(p => 
      p.farmInfo.stateProvince.toLowerCase().includes(filters.location!.toLowerCase()) ||
      p.farmInfo.cityDistrict.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters.minFunding) {
    projects = projects.filter(p => p.farmInfo.fundingRequired >= filters.minFunding!);
  }
  
  if (filters.maxFunding) {
    projects = projects.filter(p => p.farmInfo.fundingRequired <= filters.maxFunding!);
  }
  
  if (filters.status) {
    projects = getMockProjectsByStatus(filters.status);
  }
  
  return projects;
}; 