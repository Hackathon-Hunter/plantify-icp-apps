import {
  CreateInvestmentRequest,
  InvestmentProjectResult,
  InvestmentProject,
  InvestmentId,
  InvestmentStatus,
  VerificationTracker,
  Result,
  UIProjectData,
} from "./types";
import { Principal } from "@dfinity/principal";
// import { plantify_backend } from "./declarations";
import {
  getMockProjectsByFarmer,
  getMockProjectsByStatus,
  mockInvestmentProject, // Still needed for getInvestmentProject function
  mockVerificationTracker,
} from "./mock/farmData";
import { getStatusString } from "./utils";

// Transform investment project data for UI
const transformProjectData = (project: InvestmentProject): UIProjectData => {
  const getStatusDisplay = () => {
    if ("Active" in project.status)
      return { status: "Active", color: "bg-green-500" };
    if ("PendingVerification" in project.status)
      return { status: "In Verification", color: "bg-blue-500" };
    if ("InVerification" in project.status)
      return { status: "In Verification", color: "bg-blue-500" };
    if ("Approved" in project.status)
      return { status: "Approved", color: "bg-green-500" };
    if ("Rejected" in project.status)
      return { status: "Rejected", color: "bg-red-500" };
    if ("Completed" in project.status)
      return { status: "Completed", color: "bg-purple-500" };
    return { status: "Draft", color: "bg-gray-500" };
  };

  const getCropType = () => {
    if ("Rice" in project.farmInfo.cropType) return "Rice";
    if ("Coffee" in project.farmInfo.cropType) return "Coffee";
    if ("Vegetables" in project.farmInfo.cropType) return "Vegetables";
    if ("Fruits" in project.farmInfo.cropType) return "Fruits";
    if ("Corn" in project.farmInfo.cropType) return "Corn";
    if ("Other" in project.farmInfo.cropType)
      return project.farmInfo.cropType.Other;
    return "Unknown";
  };

  const getTimeline = () => {
    if ("Short" in project.experience.harvestTimeline) return "2-3 months";
    if ("Medium" in project.experience.harvestTimeline) return "4-6 months";
    if ("Long" in project.experience.harvestTimeline) return "6+ months";
    return "TBD";
  };

  const statusInfo = getStatusDisplay();
  const daysAgo = Math.floor(
    (Date.now() - Number(project.lastUpdated)) / (1000 * 60 * 60 * 24)
  );

  // For completed projects, show 100% funding and completed status
  const isCompleted = "Completed" in project.status;
  const fundingPercentage =
    isCompleted || statusInfo.status === "Active"
      ? 100
      : statusInfo.status === "Approved"
      ? 75
      : 0;

  return {
    id: Number(project.id),
    title:
      project.experience.investmentDescription ||
      `${getCropType()} Farm Project`,
    location: `${project.farmInfo.cityDistrict}, ${project.farmInfo.stateProvince}`,
    crop: getCropType(),
    area: project.farmInfo.farmSize,
    status: statusInfo.status,
    fundingProgress: {
      current: Number(project.farmInfo.fundingRequired) / 1000000, // Convert to millions for display
      target: Number(project.farmInfo.fundingRequired) / 1000000,
      percentage: fundingPercentage,
    },
    investors: isCompleted ? 15 : 0, // Completed projects show investor count
    timeline: isCompleted
      ? `Harvest: Complete • ${statusInfo.status}`
      : `Harvest: ${getTimeline()} • ${statusInfo.status}`,
    expectedYield: {
      amount: parseFloat(project.experience.expectedYield.split(" ")[0]) || 0,
      unit: project.experience.expectedYield.includes("tons") ? "tons" : "kg",
    },
    roi: isCompleted
      ? `${Number(project.budget.expectedMaxROI)}%`
      : `${Number(project.budget.expectedMinROI)}%`,
    lastUpdate: daysAgo === 0 ? "Today" : `${daysAgo} days ago`,
    statusColor: statusInfo.color,
    verificationStatus:
      statusInfo.status === "In Verification" ? "Document Review" : undefined,
  };
};

export const createInvestmentProject = async (
  _args: CreateInvestmentRequest
): Promise<InvestmentProjectResult> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.createInvestmentProject(args);
    // return result;

    // Return mock success for now
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { Success: BigInt(Math.floor(Math.random() * 1000)) };
  } catch (error) {
    console.error("Error creating investment project:", error);
    throw error;
  }
};

export const getMyInvestmentProjects = async (): Promise<UIProjectData[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getMyInvestmentProjects();
    // return result.map(transformProjectData);

    // Return mock data for now - simulates getting projects for current farmer
    await new Promise((resolve) => setTimeout(resolve, 500));
    const currentFarmerId = Principal.anonymous(); // In reality, this would come from authentication
    return getMockProjectsByFarmer(currentFarmerId).map(transformProjectData);
  } catch (error) {
    console.error("Error fetching my investment projects:", error);
    throw error;
  }
};

export const getInvestmentProject = async (
  _id: InvestmentId
): Promise<InvestmentProject | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestmentProject(id);
    // return result[0] || null;

    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockInvestmentProject;
  } catch (error) {
    console.error("Error fetching investment project:", error);
    throw error;
  }
};

export const getInvestmentProjectsByStatus = async (
  status: InvestmentStatus
): Promise<UIProjectData[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getInvestmentProjectsByStatus(status);
    // return result.map(transformProjectData);

    // Return mock data for now - simulates filtering by status
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Use elegant utility function to extract union variant name
    const statusString = getStatusString(status);
    return getMockProjectsByStatus(statusString).map(transformProjectData);
  } catch (error) {
    console.error("Error fetching investment projects by status:", error);
    throw error;
  }
};

export const updateInvestmentProjectStatus = async (
  _id: InvestmentId,
  _status: InvestmentStatus,
  _reason?: string
): Promise<Result> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.updateInvestmentProjectStatus(
    //   id,
    //   status,
    //   reason ? [reason] : []
    // );
    // return result;

    // Return mock success for now
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ok: null };
  } catch (error) {
    console.error("Error updating investment project status:", error);
    throw error;
  }
};

export const getVerificationTracker = async (
  _id: InvestmentId
): Promise<VerificationTracker | null> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.getVerificationTracker(id);
    // return result[0] || null;

    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockVerificationTracker;
  } catch (error) {
    console.error("Error fetching verification tracker:", error);
    throw error;
  }
};
