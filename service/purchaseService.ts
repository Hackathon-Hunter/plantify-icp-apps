import { plantify_backend } from "./declarations";
import type {
  PurchaseRequest,
  PurchaseResult,
  Investment,
  ICPTransferRequest,
  TransferResult,
  NFTCollection
} from "./declarations/plantify-backend.did";

// NFT Purchase Functions
export const purchaseNFTs = async (request: PurchaseRequest): Promise<PurchaseResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.purchaseNFTs(request);
};

export const getInvestment = async (id: string): Promise<Investment | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getInvestment(id);
  return result[0] ?? null;
};

export const getMyInvestments = async (): Promise<Investment[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyInvestments();
};

// ICP Transfer Functions
export const transferICP = async (request: ICPTransferRequest): Promise<TransferResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.transferICP(request);
};

export const simulateICPTransfer = async (request: ICPTransferRequest): Promise<TransferResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.simulateICPTransfer(request);
};

export const getICPTransferFee = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getICPTransferFee();
};

export const getMyICPBalance = async (): Promise<{ ok: bigint } | { err: string }> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyICPBalance();
};

// NFT Collection functions
export const getNFTCollection = async (id: string): Promise<NFTCollection | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getNFTCollection(id);
  return result[0] ?? null;
}; 