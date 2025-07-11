import {
  UploadDocumentRequest,
  Result,
  InvestmentDocument,
  InvestmentId,
} from "./types";
// import { plantify_backend } from "./declarations";

export const uploadDocument = async (
  _request: UploadDocumentRequest
): Promise<Result> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.uploadDocument(request);
    // return result;
    
    // Return mock success for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ok: null };
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export const addInvestmentDocument = async (
  _investmentId: InvestmentId,
  _document: InvestmentDocument
): Promise<Result> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.addInvestmentDocument(investmentId, document);
    // return result;
    
    // Return mock success for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ok: null };
  } catch (error) {
    console.error("Error adding investment document:", error);
    throw error;
  }
};

// Helper function to create document hash (mock implementation)
export const createDocumentHash = async (file: File): Promise<string> => {
  // In real implementation, this would create a proper hash
  // For now, return a mock hash
  return `hash_${file.name}_${Date.now()}`;
};

// Helper function to upload file to storage (mock implementation)
export const uploadFileToStorage = async (file: File): Promise<string> => {
  // In real implementation, this would upload to IPFS or similar
  // For now, return a mock URL
  return `https://storage.example.com/${file.name}`;
};

// Helper function to validate document type
export const validateDocumentType = (file: File, expectedType: string): boolean => {
  const allowedTypes = {
    'GovernmentID': ['image/jpeg', 'image/png', 'application/pdf'],
    'LandCertificate': ['application/pdf', 'image/jpeg', 'image/png'],
    'SelfiePhoto': ['image/jpeg', 'image/png'],
    'BusinessLicense': ['application/pdf', 'image/jpeg', 'image/png'],
    'FarmPhoto': ['image/jpeg', 'image/png'],
    'SoilTestResult': ['application/pdf', 'image/jpeg', 'image/png'],
    'AgriculturalCertification': ['application/pdf', 'image/jpeg', 'image/png'],
    'PreviousHarvestPhoto': ['image/jpeg', 'image/png'],
    'CommunityEndorsement': ['application/pdf', 'image/jpeg', 'image/png'],
    'GovernmentPermit': ['application/pdf', 'image/jpeg', 'image/png'],
    'LeaseAgreement': ['application/pdf']
  };

  const allowed = allowedTypes[expectedType as keyof typeof allowedTypes] || [];
  return allowed.includes(file.type);
}; 