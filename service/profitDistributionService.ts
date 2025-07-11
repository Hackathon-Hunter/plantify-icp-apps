import { Principal } from "@dfinity/principal";
// import { plantify_backend } from "./declarations";

export interface ProfitDistributionData {
  investmentId: number;
  totalRevenue: number;
  operationalCosts: number;
  grossProfit: number;
  platformFee: number;
  netProfit: number;
  profitMargin: number;
  additionalNotes?: string;
  documents: File[];
}

export type ProfitDistributionResult = 
  | {
      Success: {
        distributionId: string;
        totalDistributed: number;
        investorsCount: number;
        distributionDate: string;
      };
    }
  | {
      Error: string;
    }
  | {
      InsufficientFunds: {
        required: number;
        available: number;
      };
    }
  | {
      InvalidProject: string;
    };

export interface DistributionHistory {
  distributionId: string;
  investmentId: number;
  projectName: string;
  totalAmount: number;
  distributionDate: string;
  investorsCount: number;
  status: 'completed' | 'pending' | 'failed';
}

export interface ProjectProfitSummary {
  investmentId: number;
  projectName: string;
  totalInvestors: number;
  nftsIssued: number;
  totalFunding: number;
  actualRevenue?: number;
  operatingCosts?: number;
  netProfit?: number;
  profitMargin?: number;
  readyForDistribution: boolean;
  lastUpdated: string;
}

// Mock data for development
const mockProjectData: ProjectProfitSummary = {
  investmentId: 1,
  projectName: "Organic Rice Farm Malang",
  totalInvestors: 12,
  nftsIssued: 60,
  totalFunding: 4200,
  actualRevenue: 6120,
  operatingCosts: 4680,
  netProfit: 1296,
  profitMargin: 23.5,
  readyForDistribution: true,
  lastUpdated: "2 hours ago",
};

export const distributeProfits = async (
  data: ProfitDistributionData
): Promise<ProfitDistributionResult> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.distributeProfits({
    //   investmentId: BigInt(data.investmentId),
    //   totalRevenue: BigInt(Math.round(data.totalRevenue * 1000000)), // Convert to smallest unit
    //   operationalCosts: BigInt(Math.round(data.operationalCosts * 1000000)),
    //   additionalNotes: data.additionalNotes ? [data.additionalNotes] : [],
    //   documents: data.documents.map(file => ({
    //     fileName: file.name,
    //     fileHash: "mock-hash-" + file.name,
    //     documentType: { ProfitReport: null },
    //     uploadedAt: BigInt(Date.now() * 1000000),
    //   })),
    // });

    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (data.netProfit <= 0) {
      return {
        Error: "Net profit must be positive for distribution"
      };
    }

    return {
      Success: {
        distributionId: `DIST-${Date.now()}`,
        totalDistributed: data.netProfit,
        investorsCount: mockProjectData.totalInvestors,
        distributionDate: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error("Error distributing profits:", error);
    return {
      Error: `Distribution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export const getProjectsReadyForDistribution = async (): Promise<ProjectProfitSummary[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getProjectsReadyForDistribution();

    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [mockProjectData];
  } catch (error) {
    console.error("Error fetching projects ready for distribution:", error);
    return [];
  }
};

export const getDistributionHistory = async (_farmerId?: Principal): Promise<DistributionHistory[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getDistributionHistory(farmerId);

    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [];
  } catch (error) {
    console.error("Error fetching distribution history:", error);
    return [];
  }
};

export const calculateProfitBreakdown = async (
  investmentId: number,
  revenue: number,
  costs: number
): Promise<{
  grossProfit: number;
  platformFee: number;
  netProfit: number;
  profitMargin: number;
}> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.calculateProfitBreakdown(
    //   BigInt(investmentId),
    //   BigInt(Math.round(revenue * 1000000)),
    //   BigInt(Math.round(costs * 1000000))
    // );

    // Mock calculation for development
    const grossProfit = revenue - costs;
    const platformFee = grossProfit * 0.1; // 10% platform fee
    const netProfit = grossProfit - platformFee;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    return {
      grossProfit,
      platformFee,
      netProfit,
      profitMargin,
    };
  } catch (error) {
    console.error("Error calculating profit breakdown:", error);
    throw error;
  }
};

export const uploadProfitDocuments = async (
  investmentId: number,
  files: File[]
): Promise<{ success: boolean; uploadedFiles: string[] }> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.uploadProfitDocuments(
    //   BigInt(investmentId),
    //   files.map(file => ({
    //     fileName: file.name,
    //     fileHash: generateFileHash(file),
    //     documentType: { ProfitReport: null },
    //   }))
    // );

    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      uploadedFiles: files.map(file => file.name),
    };
  } catch (error) {
    console.error("Error uploading profit documents:", error);
    return {
      success: false,
      uploadedFiles: [],
    };
  }
}; 