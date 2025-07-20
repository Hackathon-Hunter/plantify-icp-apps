import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface CollectionMetadata {
  supply_cap: [] | [bigint];
  name: string;
  description: string;
  image: [] | [string];
  symbol: string;
}
export type CollectionResult = { ok: NFTCollection } | { err: string };
export interface CollectionStats {
  totalTokensMinted: bigint;
  activeCollections: bigint;
  totalValueLocked: bigint;
  totalCollections: bigint;
}
export interface CreateCollectionRequest {
  name: string;
  description: string;
  projectId: string;
  image: [] | [string];
  pricePerToken: [] | [bigint];
  maxSupply: bigint;
  symbol: string;
}
export interface Founder {
  id: string;
  principal: Principal;
  fullName: string;
  email: string;
  governmentId: string;
  isVerified: boolean;
  registrationDate: bigint;
  phoneNumber: string;
}
export interface FounderRegistrationRequest {
  fullName: string;
  email: string;
  governmentId: string;
  phoneNumber: string;
}
export type FounderRegistrationResult = { ok: Founder } | { err: string };
export type FounderUpdateResult = { ok: null } | { err: string };
export interface ICPTransferRequest {
  to: Principal;
  memo: [] | [string];
  amount: bigint;
}
export interface Investment {
  id: string;
  status: InvestmentStatus;
  transactionHash: [] | [string];
  investorPrincipal: Principal;
  tokenIds: Array<bigint>;
  collectionId: string;
  investorId: string;
  projectId: string;
  investmentDate: bigint;
  quantity: bigint;
  founderId: string;
  pricePerToken: bigint;
  founderPrincipal: Principal;
  amount: bigint;
}
export type InvestmentStatus =
  | { Failed: null }
  | { Refunded: null }
  | { Processing: null }
  | { Completed: null }
  | { Pending: null };
export interface InvestmentSummary {
  id: string;
  status: InvestmentStatus;
  currentValue: [] | [bigint];
  projectTitle: string;
  investmentDate: bigint;
  quantity: bigint;
  amount: bigint;
}
export interface Investor {
  id: string;
  principal: Principal;
  fullName: string;
  email: string;
  isVerified: boolean;
  registrationDate: bigint;
}
export interface InvestorRegistrationRequest {
  fullName: string;
  email: string;
}
export type InvestorRegistrationResult = { ok: Investor } | { err: string };
export type InvestorUpdateResult = { ok: null } | { err: string };
export interface NFTCollection {
  id: string;
  metadata: CollectionMetadata;
  createdAt: bigint;
  createdBy: Principal;
  totalSupply: bigint;
  isActive: boolean;
  projectId: string;
  pricePerToken: bigint;
  maxSupply: bigint;
}
export interface Project {
  id: string;
  status: ProjectStatus;
  title: string;
  fundingRaised: bigint;
  projectType: ProjectType;
  investorCount: bigint;
  createdAt: bigint;
  tags: Array<string>;
  maxInvestment: [] | [bigint];
  minInvestment: bigint;
  description: string;
  updatedAt: bigint;
  targetDate: [] | [bigint];
  founderId: string;
  category: string;
  launchDate: [] | [bigint];
  expectedROI: string;
  fundingGoal: bigint;
  founderPrincipal: Principal;
  riskLevel: string;
  location: string;
  timeline: string;
}
export interface ProjectCreateRequest {
  title: string;
  projectType: ProjectType;
  tags: Array<string>;
  maxInvestment: [] | [bigint];
  minInvestment: bigint;
  description: string;
  targetDate: [] | [bigint];
  category: string;
  expectedROI: string;
  fundingGoal: bigint;
  riskLevel: string;
  location: string;
  timeline: string;
}
export type ProjectResult = { ok: Project } | { err: string };
export type ProjectStatus =
  | { Active: null }
  | { InReview: null }
  | { Draft: null }
  | { Rejected: null }
  | { Funded: null }
  | { Cancelled: null }
  | { InProgress: null }
  | { Completed: null };
export type ProjectType =
  | { Healthcare: null }
  | { RealEstate: null }
  | { Energy: null }
  | { Technology: null }
  | { Environment: null }
  | { Services: null }
  | { Other: null }
  | { Agriculture: null }
  | { Education: null }
  | { Finance: null }
  | { Manufacturing: null };
export interface ProjectUpdateRequest {
  title: string;
  projectType: ProjectType;
  tags: Array<string>;
  maxInvestment: [] | [bigint];
  minInvestment: bigint;
  description: string;
  targetDate: [] | [bigint];
  category: string;
  expectedROI: string;
  fundingGoal: bigint;
  riskLevel: string;
  location: string;
  timeline: string;
}
export type ProjectUpdateResult = { ok: null } | { err: string };
export interface PurchaseRequest {
  collectionId: string;
  projectId: string;
  quantity: bigint;
  paymentAmount: bigint;
}
export type PurchaseResult = { ok: Investment } | { err: string };
export type TransferResult = { ok: bigint } | { err: string };
export interface _SERVICE {
  createNFTCollection: ActorMethod<[CreateCollectionRequest], CollectionResult>;
  createProject: ActorMethod<[ProjectCreateRequest], ProjectResult>;
  deleteProject: ActorMethod<[string], ProjectUpdateResult>;
  founderExistsByEmail: ActorMethod<[string], boolean>;
  getActiveNFTCollections: ActorMethod<[], Array<NFTCollection>>;
  getActiveProjects: ActorMethod<[], Array<Project>>;
  getAllFounders: ActorMethod<[], Array<Founder>>;
  getAllInvestors: ActorMethod<[], Array<Investor>>;
  getAllProjects: ActorMethod<[], Array<Project>>;
  getFounder: ActorMethod<[string], [] | [Founder]>;
  getFounderByEmail: ActorMethod<[string], [] | [Founder]>;
  getFounderCount: ActorMethod<[], bigint>;
  getICPTransferFee: ActorMethod<[], bigint>;
  getInvestment: ActorMethod<[string], [] | [Investment]>;
  getInvestmentsForMyProjects: ActorMethod<[], Array<Investment>>;
  getInvestor: ActorMethod<[string], [] | [Investor]>;
  getInvestorByEmail: ActorMethod<[string], [] | [Investor]>;
  getInvestorCount: ActorMethod<[], bigint>;
  getInvestorCountForProject: ActorMethod<[string], bigint>;
  getMyFounderProfile: ActorMethod<[], [] | [Founder]>;
  getMyICPBalance: ActorMethod<[], { ok: bigint } | { err: string }>;
  getMyInvestmentSummaries: ActorMethod<[], Array<InvestmentSummary>>;
  getMyInvestments: ActorMethod<[], Array<Investment>>;
  getMyInvestorProfile: ActorMethod<[], [] | [Investor]>;
  getMyProjects: ActorMethod<[], Array<Project>>;
  getNFTCollection: ActorMethod<[string], [] | [NFTCollection]>;
  getNFTCollectionsByProject: ActorMethod<[string], Array<NFTCollection>>;
  getNFTStats: ActorMethod<[], CollectionStats>;
  getPlatformStats: ActorMethod<
    [],
    {
      totalFundingRaised: bigint;
      activeProjects: bigint;
      totalFounders: bigint;
      totalProjects: bigint;
      totalInvestments: bigint;
      totalInvestors: bigint;
    }
  >;
  getProject: ActorMethod<[string], [] | [Project]>;
  getProjectCount: ActorMethod<[], bigint>;
  getProjectsByFounder: ActorMethod<[string], Array<Project>>;
  getProjectsByStatus: ActorMethod<[ProjectStatus], Array<Project>>;
  getTotalFundingForProject: ActorMethod<[string], bigint>;
  healthCheck: ActorMethod<[], string>;
  investorExistsByEmail: ActorMethod<[string], boolean>;
  purchaseNFTs: ActorMethod<[PurchaseRequest], PurchaseResult>;
  registerFounder: ActorMethod<
    [FounderRegistrationRequest],
    FounderRegistrationResult
  >;
  registerInvestor: ActorMethod<
    [InvestorRegistrationRequest],
    InvestorRegistrationResult
  >;
  simulateICPTransfer: ActorMethod<[ICPTransferRequest], TransferResult>;
  submitProjectForReview: ActorMethod<[string], ProjectUpdateResult>;
  transferICP: ActorMethod<[ICPTransferRequest], TransferResult>;
  updateFounderVerification: ActorMethod<
    [string, boolean],
    FounderUpdateResult
  >;
  updateInvestorVerification: ActorMethod<
    [string, boolean],
    InvestorUpdateResult
  >;
  updateMyFounderProfile: ActorMethod<
    [string, FounderRegistrationRequest],
    FounderUpdateResult
  >;
  updateMyInvestorProfile: ActorMethod<
    [string, InvestorRegistrationRequest],
    InvestorUpdateResult
  >;
  updateProject: ActorMethod<
    [string, ProjectUpdateRequest],
    ProjectUpdateResult
  >;
  updateProjectStatus: ActorMethod<
    [string, ProjectStatus],
    ProjectUpdateResult
  >;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
