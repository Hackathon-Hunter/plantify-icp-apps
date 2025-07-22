import { plantify_backend } from "./declarations";
import type {
  Founder,
  FounderRegistrationRequest,
  FounderRegistrationResult,
  FounderUpdateResult,
  Project,
  ProjectCreateRequest,
  ProjectResult,
  ProjectUpdateRequest,
  ProjectUpdateResult,
  ProjectStatus
} from "./declarations/plantify-backend.did";

// Rename from farmerService to founderService to match backend terminology
// Founder Registration and Profile Management
export const registerFounder = async (request: FounderRegistrationRequest): Promise<FounderRegistrationResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.registerFounder(request);
};

export const getMyFounderProfile = async (): Promise<Founder | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getMyFounderProfile();
  return result[0] ?? null;
};

export const updateMyFounderProfile = async (
  id: string, 
  request: FounderRegistrationRequest
): Promise<FounderUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateMyFounderProfile(id, request);
};

export const getFounder = async (id: string): Promise<Founder | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getFounder(id);
  return result[0] ?? null;
};

export const getFounderByEmail = async (email: string): Promise<Founder | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getFounderByEmail(email);
  return result[0] ?? null;
};

export const founderExistsByEmail = async (email: string): Promise<boolean> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.founderExistsByEmail(email);
};

export const getAllFounders = async (): Promise<Founder[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getAllFounders();
};

export const getFounderCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getFounderCount();
};

export const updateFounderVerification = async (
  id: string, 
  isVerified: boolean
): Promise<FounderUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateFounderVerification(id, isVerified);
};

// Project Management
export const createProject = async (request: ProjectCreateRequest): Promise<ProjectResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.createProject(request);
};

export const updateProject = async (id: string, request: ProjectUpdateRequest): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateProject(id, request);
};

export const deleteProject = async (id: string): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.deleteProject(id);
};

export const submitProjectForReview = async (id: string): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.submitProjectForReview(id);
};

export const updateProjectStatus = async (id: string, status: ProjectStatus): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateProjectStatus(id, status);
};

export const getMyProjects = async (): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyProjects();
};

export const getProject = async (id: string): Promise<Project | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getProject(id);
  return result[0] ?? null;
};

export const getProjectsByFounder = async (founderId: string): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getProjectsByFounder(founderId);
};

export const getInvestmentsForMyProjects = async () => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestmentsForMyProjects();
};
