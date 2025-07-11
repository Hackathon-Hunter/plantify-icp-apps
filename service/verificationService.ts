import { 
  VerificationTracker, 
  InvestmentId,
  VerificationStep as BackendVerificationStep
} from "./types";
// import { plantify_backend } from "./declarations";

export interface VerificationStep {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  completedTime?: string;
  currentDate?: string;
  status: 'completed' | 'current' | 'in-progress' | 'pending';
  iconType: 'document' | 'search' | 'map' | 'dollar' | 'award' | 'rocket';
}

export interface ProjectInfo {
  projectId: string;
  farmer: string;
  crop: string;
  location: string;
  fundingAmount: string;
  investmentId: number;
}

export const getVerificationTracker = async (investmentId: InvestmentId): Promise<VerificationTracker | null> => {
  try {
    // TODO: Uncomment when backend is ready
    // const result = await plantify_backend.getVerificationTracker(investmentId);
    // return result[0] || null;
    
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      investmentId,
      currentStep: "Site Verification",
      overallProgress: BigInt(60),
      lastUpdated: BigInt(Date.now()),
      steps: [
        {
          stepName: "Document Review",
          description: "Reviewing submitted documents and application forms",
          estimatedTime: "6-12 hours",
          status: { Completed: null },
          completedAt: [BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000)],
          notes: ["All documents verified"]
        },
        {
          stepName: "Agricultural Assessment", 
          description: "Evaluating farming plan, crop viability, and market analysis",
          estimatedTime: "12-24 hours",
          status: { Completed: null },
          completedAt: [BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000)],
          notes: []
        },
        {
          stepName: "Site Verification",
          description: "Physical inspection of farm location and infrastructure", 
          estimatedTime: "1-2 days",
          status: { InProgress: null },
          completedAt: [],
          notes: []
        },
        {
          stepName: "Financial Validation",
          description: "Budget analysis and financial feasibility assessment",
          estimatedTime: "4-8 hours", 
          status: { Pending: null },
          completedAt: [],
          notes: []
        },
        {
          stepName: "Final Approval",
          description: "Management review and final approval decision",
          estimatedTime: "2-4 hours",
          status: { Pending: null },
          completedAt: [],
          notes: []
        },
        {
          stepName: "Investment Launched",
          description: "Project goes live on marketplace for investors",
          estimatedTime: "1-2 hours",
          status: { Pending: null },
          completedAt: [],
          notes: []
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching verification tracker:", error);
    throw error;
  }
};

export const transformVerificationStepsToActivities = (steps: BackendVerificationStep[]): VerificationStep[] => {
  const iconMap: Record<string, 'document' | 'search' | 'map' | 'dollar' | 'award' | 'rocket'> = {
    'Document Review': 'document',
    'Agricultural Assessment': 'search', 
    'Site Verification': 'map',
    'Financial Validation': 'dollar',
    'Final Approval': 'award',
    'Investment Launched': 'rocket'
  };

  return steps.map((step, index) => {
    const getStatus = () => {
      if ('Completed' in step.status) return 'completed';
      if ('InProgress' in step.status) return 'in-progress';  
      if ('Failed' in step.status) return 'pending';
      return 'pending';
    };

    const status = getStatus();
    const completedTime = step.completedAt.length > 0 ? 
      new Date(Number(step.completedAt[0])).toLocaleDateString() : undefined;

    return {
      id: index + 1,
      title: step.stepName,
      description: step.description,
      estimatedTime: step.estimatedTime,
      completedTime: status === 'completed' ? completedTime : undefined,
      currentDate: status === 'in-progress' ? new Date().toLocaleDateString() : undefined,
      status,
      iconType: iconMap[step.stepName] || 'document'
    };
  });
};

// Mock data - this would come from API in real implementation
const mockProjectInfo: ProjectInfo = {
  projectId: "PLT-2025-001",
  farmer: "Ahmad Rizki",
  crop: "Rice",
  location: "Batu, Malang, East Java",
  fundingAmount: "$3,500",
  investmentId: 1,
};

const mockVerificationSteps: VerificationStep[] = [
  {
    id: 1,
    title: "Document Review",
    description: "Reviewing submitted documents and application forms",
    estimatedTime: "6-12 hours",
    completedTime: "8 hours",
    status: "completed",
    iconType: "document",
  },
  {
    id: 2,
    title: "Agricultural Assessment",
    description: "Evaluating farming plan, crop viability, and market analysis",
    estimatedTime: "12-24 hours",
    completedTime: "16 hours",
    status: "completed",
    iconType: "search",
  },
  {
    id: 3,
    title: "Site Verification",
    description: "Physical inspection of farm location and infrastructure",
    estimatedTime: "1-2 days",
    currentDate: "January 4, 2025",
    status: "in-progress",
    iconType: "map",
  },
  {
    id: 4,
    title: "Financial Validation",
    description: "Budget analysis and financial feasibility assessment",
    estimatedTime: "4-8 hours",
    status: "pending",
    iconType: "dollar",
  },
  {
    id: 5,
    title: "Final Approval",
    description: "Management review and final approval decision",
    estimatedTime: "2-4 hours",
    status: "pending",
    iconType: "award",
  },
  {
    id: 6,
    title: "Investment Launched",
    description: "Project goes live on marketplace for investors",
    estimatedTime: "1-2 hours",
    status: "pending",
    iconType: "rocket",
  },
];

export const getProjectInfo = (): ProjectInfo => {
  return mockProjectInfo;
};

export const getVerificationSteps = (): VerificationStep[] => {
  return mockVerificationSteps;
};

export const updateVerificationStep = async (
  investmentId: number,
  stepId: number,
  updates: Partial<VerificationStep>
): Promise<VerificationStep> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/farmer/verification-tracker/${investmentId}/step/${stepId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates),
    // });
    // if (!response.ok) throw new Error('Failed to update verification step');
    // return response.json();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const step = mockVerificationSteps.find(s => s.id === stepId);
    if (!step) throw new Error('Step not found');

    return { ...step, ...updates };
  } catch (error) {
    console.error('Error updating verification step:', error);
    throw error;
  }
};

export const requestVerificationUpdate = async (
  investmentId: number,
  message: string
): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/farmer/verification-tracker/${investmentId}/request-update`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message }),
    // });
    // if (!response.ok) throw new Error('Failed to request verification update');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Verification update requested:', message);
  } catch (error) {
    console.error('Error requesting verification update:', error);
    throw error;
  }
};

export const uploadAdditionalDocuments = async (
  investmentId: number,
  files: File[]
): Promise<string[]> => {
  try {
    // TODO: Replace with actual API call
    // const formData = new FormData();
    // files.forEach(file => formData.append('documents', file));
    // 
    // const response = await fetch(`/api/farmer/verification-tracker/${investmentId}/documents`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!response.ok) throw new Error('Failed to upload documents');
    // return response.json();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock file URLs
    return files.map(file => `https://storage.plantify.com/documents/${file.name}`);
  } catch (error) {
    console.error('Error uploading documents:', error);
    throw error;
  }
};

export const getNotifications = async (_investmentId: number): Promise<{ id: number; type: string; message: string; timestamp: Date; read: boolean }[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/farmer/verification-tracker/${investmentId}/notifications`);
    // if (!response.ok) throw new Error('Failed to fetch notifications');
    // return response.json();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: 1,
        type: 'info',
        message: 'Site verification scheduled for January 4, 2025',
        timestamp: new Date(),
        read: false,
      },
      {
        id: 2,
        type: 'success',
        message: 'Agricultural assessment completed successfully',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true,
      },
    ];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Helper functions for status management
export const getStatusConfig = (status: VerificationStep['status']) => {
  const configs = {
    completed: {
      textColor: 'text-black',
      bgColor: 'bg-white',
      borderColor: 'border-black',
      iconColor: 'text-black',
    },
    'in-progress': {
      textColor: 'text-black',
      bgColor: 'bg-gray-50',
      borderColor: 'border-black',
      iconColor: 'text-black',
    },
    current: {
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-600',
    },
    pending: {
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      iconColor: 'text-gray-400',
    },
    failed: {
      textColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconColor: 'text-red-500',
    },
  };

  return configs[status] || configs.pending;
};

export const getStatusText = (status: VerificationStep['status']): string => {
  const statusTexts = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    current: 'Current',
    pending: 'Pending',
    failed: 'Failed',
  };

  return statusTexts[status] || 'Pending';
}; 