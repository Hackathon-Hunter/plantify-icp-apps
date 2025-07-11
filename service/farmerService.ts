import {
  CreateInvestmentRequest,
  InvestmentId,
  TokenId,
  FarmNFTMetadata,
  VerificationTracker,
  DocumentType__1,
  RegisterFarmerRequest,
  FarmerRegistrationResult,
} from "./types";
import { Principal } from "@dfinity/principal";
// import { plantify_backend } from "./declarations";
import { 
  mockVerificationTracker
} from "./mock/farmData";

export const registerFarmer = async (
  _args: RegisterFarmerRequest
): Promise<FarmerRegistrationResult> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.registerFarmer(args);
    // return result;
    
    // Return mock success for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { Success: Principal.anonymous() };
  } catch (error) {
    console.error("Error farmer registration:", error);
    throw error;
  }
};

export interface FarmPhoto {
  id: number;
  date: string;
  description: string;
  imageUrl?: string;
  tokenId?: bigint;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  lastUpdated: string;
}

export interface FarmActivity {
  id: number;
  date: string;
  activity: string;
  description: string;
  status: 'completed' | 'scheduled' | 'overdue';
}



export const getProjectVerificationTracker = async (
  _investmentId: InvestmentId
): Promise<VerificationTracker | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getVerificationTracker(_investmentId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockVerificationTracker;
  } catch (error) {
    console.error("Error fetching verification tracker:", error);
    throw error;
  }
};

export const getFarmPhotos = async (_projectId: number): Promise<FarmPhoto[]> => {
  try {
    // TODO: Replace with actual API calls when backend is ready
    // const nftTokens = await plantify_backend.getNFTsByInvestment(BigInt(_projectId));
    // const photos = await Promise.all(
    //   nftTokens.map(async (tokenId) => {
    //     const metadata = await plantify_backend.getFarmNFTMetadata(tokenId);
    //     return metadata[0] ? transformNFTMetadataToPhoto(metadata[0], tokenId) : null;
    //   })
    // );
    // return photos.filter(photo => photo !== null);
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        date: "June 2, 2024",
        description: "Early flowering stage",
        imageUrl: undefined // Would come from NFT metadata
      },
      {
        id: 2,
        date: "May 15, 2024", 
        description: "Healthy plant growth",
        imageUrl: undefined
      },
      {
        id: 3,
        date: "June 8, 2024",
        description: "Full bloom development",
        imageUrl: undefined
      }
    ];
  } catch (error) {
    console.error("Error fetching farm photos:", error);
    throw error;
  }
};

export const getWeatherData = async (_location?: string): Promise<WeatherData> => {
  try {
    // TODO: Replace with actual weather API call
    // This would typically integrate with a weather service API
    // const response = await fetch(`/api/weather?location=${_location}`);
    // if (!response.ok) throw new Error('Failed to fetch weather data');
    // return response.json();
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      temperature: 28,
      humidity: 75,
      rainfall: 12,
      condition: "Partly Cloudy",
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getFarmActivities = async (_projectId: number): Promise<FarmActivity[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // This could be derived from verification tracker steps or separate activity logs
    // const tracker = await plantify_backend.getVerificationTracker(BigInt(_projectId));
    // const activities = _transformVerificationStepsToActivities(tracker[0]?.steps || []);
    // return activities;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        date: "2024-01-15",
        activity: "Soil Preparation",
        description: "Plowing and fertilizing the soil",
        status: "completed"
      },
      {
        id: 2,
        date: "2024-01-20",
        activity: "Planting",
        description: "Planting seeds in prepared soil",
        status: "completed"
      },
      {
        id: 3,
        date: "2024-02-01",
        activity: "Irrigation",
        description: "Regular watering and irrigation maintenance",
        status: "completed"
      },
      {
        id: 4,
        date: "2024-02-15",
        activity: "Pest Control",
        description: "Organic pest control application",
        status: "scheduled"
      },
      {
        id: 5,
        date: "2024-03-01",
        activity: "Fertilization",
        description: "Mid-season fertilizer application",
        status: "scheduled"
      }
    ];
  } catch (error) {
    console.error("Error fetching farm activities:", error);
    throw error;
  }
};

// Helper function to transform NFT metadata to photo format
const _transformNFTMetadataToPhoto = (metadata: FarmNFTMetadata, tokenId: TokenId): FarmPhoto => {
  return {
    id: Number(tokenId),
    date: new Date(Number(metadata.createdAt)).toLocaleDateString(),
    description: `${metadata.cropType} farm - ${metadata.projectStatus}`,
    imageUrl: metadata.imageUrl.length > 0 ? metadata.imageUrl[0] : undefined,
    tokenId
  };
};

// Helper function to transform verification steps to activities
const _transformVerificationStepsToActivities = (steps: unknown[]): FarmActivity[] => {
  return steps.map((step, index) => ({
    id: index + 1,
    date: new Date().toISOString().split('T')[0],
    activity: `Step ${index + 1}`,
    description: "Activity description",
    status: 'completed' as const
  }));
};



export const updateInvestmentProject = async (
  investmentId: InvestmentId,
  updates: Partial<CreateInvestmentRequest>
): Promise<void> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // await plantify_backend.updateInvestmentProject(investmentId, updates);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Project updated:", investmentId, updates);
  } catch (error) {
    console.error("Error updating investment project:", error);
    throw error;
  }
};

export const submitProjectForVerification = async (
  investmentId: InvestmentId
): Promise<void> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // await plantify_backend.updateInvestmentProjectStatus(
    //   investmentId, 
    //   { PendingVerification: null }, 
    //   ["Submitted for verification"]
    // );
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Project submitted for verification:", investmentId);
  } catch (error) {
    console.error("Error submitting project for verification:", error);
    throw error;
  }
};

export const uploadProjectDocument = async (
  investmentId: InvestmentId,
  documentType: DocumentType__1,
  file: File
): Promise<void> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const fileHash = await uploadFileToStorage(file);
    // const document = {
    //   documentType,
    //   fileName: file.name,
    //   fileHash,
    //   isRequired: true,
    //   uploadedAt: BigInt(Date.now()),
    // };
    // await plantify_backend.addInvestmentDocument(investmentId, document);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Document uploaded:", investmentId, documentType, file.name);
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
