import { plantify_backend } from "./declarations";
import type {
  Project,
  ProjectStatus,
  ProjectResult,
  ProjectCreateRequest,
  ProjectUpdateRequest,
  ProjectUpdateResult,
} from "./declarations/plantify-backend.did";

// Project Management
export const createProject = async (request: ProjectCreateRequest): Promise<ProjectResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.createProject(request);
};

export const getProject = async (id: string): Promise<Project | null> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  const result = await plantify_backend.getProject(id);
  return result[0] ?? null;
};

export const getAllProjects = async (): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getAllProjects();
};

export const getActiveProjects = async (): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getActiveProjects();
};

export const getMyProjects = async (): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getMyProjects();
};

export const getProjectsByStatus = async (status: ProjectStatus): Promise<Project[]> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getProjectsByStatus(status);
};

export const getProjectCount = async (): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getProjectCount();
};

export const updateProject = async (
  id: string,
  request: ProjectUpdateRequest
): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateProject(id, request);
};

export const updateProjectStatus = async (
  id: string,
  status: ProjectStatus
): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.updateProjectStatus(id, status);
};

export const submitProjectForReview = async (id: string): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.submitProjectForReview(id);
};

export const deleteProject = async (id: string): Promise<ProjectUpdateResult> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.deleteProject(id);
};

export const getTotalFundingForProject = async (id: string): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getTotalFundingForProject(id);
};

export const getInvestorCountForProject = async (id: string): Promise<bigint> => {
  if (!plantify_backend) throw new Error("plantify_backend is not defined");
  return await plantify_backend.getInvestorCountForProject(id);
};
