import { plantify_backend } from "./declarations";
import type {
  CreateCollectionRequest,
  CollectionResult,
  NFTCollection,
  CollectionStats,
} from "./declarations/plantify-backend.did";

export const createNFTCollection = async (args: CreateCollectionRequest): Promise<CollectionResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.createNFTCollection(args);
};

export const getNFTCollection = async (collectionId: string): Promise<NFTCollection | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getNFTCollection(collectionId);
  return result[0] ?? null;
};

export const getNFTCollectionsByProject = async (projectId: string): Promise<NFTCollection[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getNFTCollectionsByProject(projectId);
};

export const getActiveNFTCollections = async (): Promise<NFTCollection[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getActiveNFTCollections();
};

export const getNFTStats = async (): Promise<CollectionStats> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getNFTStats();
}; 