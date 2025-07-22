import { plantify_backend } from "./declarations";
import type {
  Investment,
  InvestmentSummary
} from "./declarations/plantify-backend.did";

// Investment Portfolio Management
export const getMyInvestments = async (): Promise<Investment[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyInvestments();
};

export const getMyInvestmentSummaries = async (): Promise<InvestmentSummary[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyInvestmentSummaries();
};

export const getInvestment = async (id: string): Promise<Investment | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getInvestment(id);
  return result[0] ?? null;
};

export const getInvestmentsForMyProjects = async (): Promise<Investment[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestmentsForMyProjects();
};

// Balance Management
export const getMyICPBalance = async (): Promise<{ ok: bigint } | { err: string }> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyICPBalance();
};

// Format ICP balance for display (converts from e8s to ICP)
export const getFormattedICPBalance = async (): Promise<number | null> => {
  const balanceResult = await getMyICPBalance();
  
  if ('ok' in balanceResult) {
    return Number(balanceResult.ok) / 100000000; // Convert from e8s to ICP
  }
  
  return null;
};
