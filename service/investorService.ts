import { plantify_backend } from "./declarations";
import type { 
  Investor,
  InvestorRegistrationRequest, 
  InvestorRegistrationResult,
  InvestorUpdateResult,
  InvestmentSummary,
  Investment
} from "./declarations/plantify-backend.did";

// Investor Registration and Profile Management
export const registerInvestor = async (request: InvestorRegistrationRequest): Promise<InvestorRegistrationResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.registerInvestor(request);
};

export const getMyInvestorProfile = async (): Promise<Investor | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getMyInvestorProfile();
  return result[0] ?? null;
};

export const updateMyInvestorProfile = async (
  id: string,
  request: InvestorRegistrationRequest
): Promise<InvestorUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateMyInvestorProfile(id, request);
};

export const getInvestor = async (id: string): Promise<Investor | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getInvestor(id);
  return result[0] ?? null;
};

export const getInvestorByEmail = async (email: string): Promise<Investor | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getInvestorByEmail(email);
  return result[0] ?? null;
};

export const investorExistsByEmail = async (email: string): Promise<boolean> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.investorExistsByEmail(email);
};

export const getAllInvestors = async (): Promise<Investor[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getAllInvestors();
};

export const getInvestorCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestorCount();
};

export const getMyInvestmentSummaries = async (): Promise<InvestmentSummary[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyInvestmentSummaries();
};

export const getMyInvestments = async (): Promise<Investment[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyInvestments();
};

export const getInvestorCountForProject = async (projectId: string): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestorCountForProject(projectId);
};

export const updateInvestorVerification = async (
  id: string, 
  isVerified: boolean
): Promise<InvestorUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateInvestorVerification(id, isVerified);
};
