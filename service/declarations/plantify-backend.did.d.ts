import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AccessRoadCondition = { 'Fair' : null } |
  { 'Good' : null } |
  { 'Poor' : null };
export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export type ApprovalError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'NonExistentTokenId' : null } |
  { 'InvalidSpender' : null } |
  { 'Unauthorized' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export interface ApprovalInfo {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'expires_at' : [] | [bigint],
  'spender' : Account,
}
export type ApprovalResult = { 'Ok' : TokenId } |
  { 'Err' : ApprovalError };
export interface BudgetAllocation {
  'fertilizers' : bigint,
  'equipment' : bigint,
  'labor' : bigint,
  'insurance' : bigint,
  'seeds' : bigint,
  'infrastructure' : bigint,
  'operational' : bigint,
}
export interface BudgetRequest {
  'previousFarmingLoans' : [] | [boolean],
  'expectedMinROI' : bigint,
  'budgetAllocation' : BudgetAllocation,
  'hasBusinessBankAccount' : boolean,
  'emergencyContactPhone' : string,
  'emergencyContactName' : string,
  'expectedMaxROI' : bigint,
}
export interface CreateInvestmentRequest {
  'agreements' : Array<boolean>,
  'farmInfo' : FarmInfoRequest,
  'documents' : Array<InvestmentDocument>,
  'experience' : ExperienceRequest,
  'budget' : BudgetRequest,
}
export type CropType = { 'Corn' : null } |
  { 'Rice' : null } |
  { 'Vegetables' : null } |
  { 'Other' : string } |
  { 'Fruits' : null } |
  { 'Coffee' : null };
export type CultivationMethod = { 'Conventional' : null } |
  { 'Hydroponic' : null } |
  { 'Organic' : null };
export interface Document {
  'documentType' : DocumentType,
  'fileHash' : string,
  'fileName' : string,
  'uploadedAt' : bigint,
}
export type DocumentType = { 'SelfiePhoto' : null } |
  { 'GovernmentID' : null } |
  { 'LandCertificate' : null } |
  { 'BusinessLicense' : null };
export type DocumentType__1 = { 'AgriculturalCertification' : null } |
  { 'PreviousHarvestPhoto' : null } |
  { 'LandCertificate' : null } |
  { 'CommunityEndorsement' : null } |
  { 'GovernmentPermit' : null } |
  { 'FarmPhoto' : null } |
  { 'SoilTestResult' : null } |
  { 'LeaseAgreement' : null };
export type ExperienceLevel = { 'Beginner' : null } |
  { 'Experienced' : null } |
  { 'Intermediate' : null };
export interface ExperienceRequest {
  'farmingExperience' : ExperienceLevel,
  'cultivationMethod' : CultivationMethod,
  'harvestTimeline' : HarvestTimeline,
  'investmentDescription' : string,
  'marketDistribution' : Array<MarketDistribution>,
  'expectedYield' : string,
}
export interface FarmInfoRequest {
  'farmSize' : string,
  'country' : string,
  'gpsCoordinates' : [] | [string],
  'stateProvince' : string,
  'cityDistrict' : string,
  'accessRoads' : AccessRoadCondition,
  'landOwnership' : LandOwnership,
  'cropType' : CropType,
  'waterSource' : string,
  'fundingRequired' : bigint,
}
export interface FarmNFTMetadata {
  'soldSupply' : bigint,
  'farmerId' : Principal,
  'fundingAmount' : bigint,
  'area' : string,
  'createdAt' : bigint,
  'harvestTimeline' : string,
  'totalSupply' : bigint,
  'imageUrl' : [] | [string],
  'projectStatus' : string,
  'cropType' : string,
  'investmentId' : bigint,
  'nftPrice' : bigint,
  'location' : string,
  'availableSupply' : bigint,
  'expectedYield' : string,
}
export type FarmerId = Principal;
export interface FarmerProfile {
  'documents' : Array<Document>,
  'farmerId' : FarmerId,
  'lastUpdated' : bigint,
  'fullName' : string,
  'isActive' : boolean,
  'email' : string,
  'governmentId' : string,
  'registrationDate' : bigint,
  'phoneNumber' : string,
  'verificationStatus' : VerificationStatus,
}
export type FarmerRegistrationResult = { 'Error' : string } |
  { 'AlreadyRegistered' : FarmerId } |
  { 'Success' : FarmerId } |
  { 'InvalidData' : string };
export interface FarmerStats {
  'pendingVerification' : bigint,
  'approvedFarmers' : bigint,
  'rejectedFarmers' : bigint,
  'totalFarmers' : bigint,
}
export type HarvestTimeline = { 'Short' : null } |
  { 'Long' : null } |
  { 'Medium' : null };
export interface InvestmentDocument {
  'documentType' : DocumentType__1,
  'isRequired' : boolean,
  'fileHash' : string,
  'fileName' : string,
  'uploadedAt' : bigint,
}
export type InvestmentId = bigint;
export interface InvestmentProject {
  'id' : InvestmentId,
  'agreements' : Array<boolean>,
  'status' : InvestmentStatus,
  'farmInfo' : FarmInfoRequest,
  'documents' : Array<InvestmentDocument>,
  'farmerId' : FarmerId,
  'rejectedReason' : [] | [string],
  'approvedAt' : [] | [bigint],
  'createdAt' : bigint,
  'lastUpdated' : bigint,
  'experience' : ExperienceRequest,
  'budget' : BudgetRequest,
  'verificationNotes' : [] | [string],
}
export type InvestmentProjectResult = { 'Error' : string } |
  { 'FarmerNotVerified' : null } |
  { 'Success' : InvestmentId } |
  { 'InvalidData' : string };
export interface InvestmentStats {
  'pendingVerification' : bigint,
  'approvedProjects' : bigint,
  'activeProjects' : bigint,
  'totalProjects' : bigint,
  'completedProjects' : bigint,
  'rejectedProjects' : bigint,
}
export type InvestmentStatus = { 'InVerification' : null } |
  { 'Active' : null } |
  { 'PendingVerification' : null } |
  { 'Approved' : null } |
  { 'Draft' : null } |
  { 'Rejected' : null } |
  { 'Cancelled' : null } |
  { 'Completed' : null };
export type InvestorId = Principal;
export interface InvestorInvestment {
  'status' : { 'Sold' : null } |
    { 'Active' : null } |
    { 'Matured' : null },
  'purchaseDate' : bigint,
  'investmentAmount' : bigint,
  'currentValue' : bigint,
  'nftTokenIds' : Array<bigint>,
  'investmentId' : bigint,
}
export interface InvestorPortfolio {
  'totalValue' : bigint,
  'roiPercentage' : number,
  'investments' : Array<InvestorInvestment>,
  'totalReturns' : bigint,
  'investor' : InvestorProfile,
}
export interface InvestorProfile {
  'status' : InvestorStatus,
  'lastUpdated' : bigint,
  'investorId' : InvestorId,
  'activeInvestments' : bigint,
  'fullName' : string,
  'isActive' : boolean,
  'email' : string,
  'portfolioValue' : bigint,
  'registrationDate' : bigint,
  'totalInvestmentAmount' : bigint,
}
export type InvestorRegistrationResult = { 'Error' : string } |
  { 'AlreadyRegistered' : InvestorId } |
  { 'Success' : InvestorId } |
  { 'InvalidData' : string };
export interface InvestorStats {
  'activeInvestors' : bigint,
  'totalInvestmentVolume' : bigint,
  'inactiveInvestors' : bigint,
  'averageInvestmentAmount' : bigint,
  'suspendedInvestors' : bigint,
  'totalInvestors' : bigint,
}
export type InvestorStatus = { 'Inactive' : null } |
  { 'Active' : null } |
  { 'Suspended' : null };
export type LandOwnership = { 'Partnership' : null } |
  { 'Leased' : null } |
  { 'Owned' : null };
export type MarketDistribution = { 'LocalMarkets' : null } |
  { 'ExportBuyers' : null } |
  { 'DirectToConsumer' : null } |
  { 'ProcessingIndustries' : null } |
  { 'Cooperatives' : null } |
  { 'ContractFarming' : null };
export type MintError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Unauthorized' : null } |
  { 'InvalidRecipient' : null } |
  { 'TokenIdAlreadyExists' : null };
export type MintResult = { 'Ok' : TokenId } |
  { 'Err' : MintError };
export interface NFTCollection {
  'soldSupply' : bigint,
  'tokenIds' : Array<TokenId>,
  'createdAt' : bigint,
  'totalSupply' : bigint,
  'investmentId' : bigint,
  'nftPrice' : bigint,
  'availableSupply' : bigint,
}
export interface PurchaseNFTRequest {
  'quantity' : bigint,
  'investmentId' : bigint,
  'paymentAmount' : bigint,
}
export type PurchaseNFTResult = { 'Error' : string } |
  { 'InsufficientPayment' : { 'provided' : bigint, 'required' : bigint } } |
  { 'InvalidQuantity' : null } |
  {
    'Success' : {
      'tokenIds' : Array<TokenId>,
      'totalPaid' : bigint,
      'remainingAvailable' : bigint,
    }
  } |
  { 'InsufficientSupply' : { 'requested' : bigint, 'available' : bigint } } |
  { 'ProjectNotFound' : null };
export interface RegisterFarmerRequest {
  'fullName' : string,
  'email' : string,
  'governmentId' : string,
  'phoneNumber' : string,
}
export interface RegisterInvestorRequest {
  'fullName' : string,
  'email' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : TokenId } |
  { 'err' : string };
export interface Standard { 'url' : string, 'name' : string }
export type TokenId = bigint;
export type TokenMetadata = Array<[string, Value]>;
export interface TransferArg {
  'to' : Account,
  'token_id' : TokenId,
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
}
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'NonExistentTokenId' : null } |
  { 'Duplicate' : { 'duplicate_of' : TokenId } } |
  { 'Unauthorized' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'InvalidRecipient' : null } |
  { 'GenericBatchError' : { 'message' : string, 'error_code' : bigint } } |
  { 'TooOld' : null };
export type TransferResult = { 'Ok' : TokenId } |
  { 'Err' : TransferError };
export interface UploadDocumentRequest {
  'documentType' : DocumentType,
  'fileHash' : string,
  'fileName' : string,
}
export type Value = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value> };
export type VerificationStatus = { 'Approved' : null } |
  { 'InReview' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export interface VerificationStep {
  'status' : { 'Failed' : null } |
    { 'InProgress' : null } |
    { 'Completed' : null } |
    { 'Pending' : null },
  'completedAt' : [] | [bigint],
  'description' : string,
  'stepName' : string,
  'notes' : [] | [string],
  'estimatedTime' : string,
}
export interface VerificationTracker {
  'lastUpdated' : bigint,
  'overallProgress' : bigint,
  'steps' : Array<VerificationStep>,
  'currentStep' : string,
  'investmentId' : InvestmentId,
}
export interface _SERVICE {
  'addInvestmentDocument' : ActorMethod<
    [InvestmentId, InvestmentDocument],
    Result
  >,
  'approveInvestmentAndMintNFT' : ActorMethod<
    [InvestmentId, [] | [string], [] | [bigint]],
    Result_1
  >,
  'calculateNFTPrice' : ActorMethod<[bigint, bigint], bigint>,
  'checkInvestorRegistration' : ActorMethod<
    [Array<Principal>],
    Array<[Principal, boolean]>
  >,
  'createInvestmentProject' : ActorMethod<
    [CreateInvestmentRequest],
    InvestmentProjectResult
  >,
  'getAdminDashboardStats' : ActorMethod<
    [],
    {
      'projects' : InvestmentStats,
      'nfts' : {
        'totalVolume' : bigint,
        'averagePrice' : bigint,
        'totalSupply' : bigint,
        'totalCollections' : bigint,
      },
      'users' : { 'investors' : InvestorStats, 'farmers' : FarmerStats },
      'financial' : {
        'averageInvestmentSize' : bigint,
        'platformRevenue' : bigint,
        'totalInvestmentVolume' : bigint,
      },
    }
  >,
  'getAllFarmers' : ActorMethod<[], Array<FarmerProfile>>,
  'getAllInvestmentProjects' : ActorMethod<[], Array<InvestmentProject>>,
  'getAllInvestors' : ActorMethod<[], Array<InvestorProfile>>,
  'getAllNFTCollections' : ActorMethod<[], Array<NFTCollection>>,
  'getAllNFTs' : ActorMethod<[], Array<TokenId>>,
  'getDetailedPortfolio' : ActorMethod<
    [],
    [] | [
      {
        'investments' : Array<
          {
            'nftTokens' : Array<TokenId>,
            'roiPercentage' : number,
            'investment' : InvestorInvestment,
            'currentMarketValue' : bigint,
            'project' : [] | [InvestmentProject],
          }
        >,
        'summary' : {
          'totalValue' : bigint,
          'worstPerforming' : [] | [bigint],
          'bestPerforming' : [] | [bigint],
          'totalReturns' : bigint,
          'overallROI' : number,
        },
        'investor' : InvestorProfile,
      }
    ]
  >,
  'getFarmNFTMetadata' : ActorMethod<[TokenId], [] | [FarmNFTMetadata]>,
  'getFarmerProfile' : ActorMethod<[FarmerId], [] | [FarmerProfile]>,
  'getFarmerRegistrationStats' : ActorMethod<[], FarmerStats>,
  'getFarmersByStatus' : ActorMethod<
    [VerificationStatus],
    Array<FarmerProfile>
  >,
  'getInvestmentOpportunities' : ActorMethod<[], Array<InvestmentProject>>,
  'getInvestmentProject' : ActorMethod<
    [InvestmentId],
    [] | [InvestmentProject]
  >,
  'getInvestmentProjectSummary' : ActorMethod<
    [InvestmentId],
    [] | [
      {
        'pricing' : [] | [
          {
            'soldSupply' : bigint,
            'priceInICP' : number,
            'totalSupply' : bigint,
            'nftPrice' : bigint,
            'fundingRequired' : bigint,
            'availableSupply' : bigint,
          }
        ],
        'nftCollection' : [] | [NFTCollection],
        'project' : InvestmentProject,
      }
    ]
  >,
  'getInvestmentProjectsByFarmer' : ActorMethod<
    [FarmerId],
    Array<InvestmentProject>
  >,
  'getInvestmentProjectsByStatus' : ActorMethod<
    [InvestmentStatus],
    Array<InvestmentProject>
  >,
  'getInvestmentStats' : ActorMethod<[], InvestmentStats>,
  'getInvestorPortfolio' : ActorMethod<[InvestorId], [] | [InvestorPortfolio]>,
  'getInvestorProfile' : ActorMethod<[InvestorId], [] | [InvestorProfile]>,
  'getInvestorRegistrationStats' : ActorMethod<[], InvestorStats>,
  'getInvestorsByStatus' : ActorMethod<
    [InvestorStatus],
    Array<InvestorProfile>
  >,
  'getMarketplaceOverview' : ActorMethod<
    [],
    {
      'activeProjects' : bigint,
      'averageROI' : number,
      'topPerformingCrops' : Array<string>,
      'totalFundingAvailable' : bigint,
      'totalInvestmentOpportunities' : bigint,
    }
  >,
  'getMyDashboardData' : ActorMethod<
    [],
    {
      'userType' : string,
      'farmerData' : [] | [
        {
          'totalFundingRaised' : bigint,
          'activeProjects' : bigint,
          'totalProjects' : bigint,
          'verificationStatus' : VerificationStatus,
        }
      ],
      'investorData' : [] | [
        {
          'roiPercentage' : number,
          'totalInvestments' : bigint,
          'portfolioValue' : bigint,
          'totalReturns' : bigint,
        }
      ],
    }
  >,
  'getMyFarmerProfile' : ActorMethod<[], [] | [FarmerProfile]>,
  'getMyInvestmentProjects' : ActorMethod<[], Array<InvestmentProject>>,
  'getMyInvestorProfile' : ActorMethod<[], [] | [InvestorProfile]>,
  'getMyNFTs' : ActorMethod<[], Array<TokenId>>,
  'getMyPortfolio' : ActorMethod<[], [] | [InvestorPortfolio]>,
  'getMyRegistrationStatus' : ActorMethod<
    [],
    {
      'isFarmer' : boolean,
      'isInvestor' : boolean,
      'investorStatus' : [] | [InvestorStatus],
      'farmerStatus' : [] | [VerificationStatus],
    }
  >,
  'getNFTCollection' : ActorMethod<[bigint], [] | [NFTCollection]>,
  'getNFTStats' : ActorMethod<
    [],
    {
      'averagePrice' : bigint,
      'totalSupply' : bigint,
      'totalCollections' : bigint,
    }
  >,
  'getNFTsByFarmer' : ActorMethod<[Principal], Array<TokenId>>,
  'getNFTsByInvestment' : ActorMethod<[bigint], Array<TokenId>>,
  'getPlatformMetrics' : ActorMethod<
    [],
    {
      'averageInvestmentSize' : bigint,
      'platformGrowthRate' : number,
      'totalInvestmentProjects' : bigint,
      'totalInvestmentVolume' : bigint,
      'totalUsers' : bigint,
      'totalFarmers' : bigint,
      'totalInvestors' : bigint,
    }
  >,
  'getPlatformOverview' : ActorMethod<
    [],
    {
      'investors' : InvestorStats,
      'farmers' : FarmerStats,
      'nfts' : { 'totalSupply' : bigint, 'totalCollections' : bigint },
      'investments' : InvestmentStats,
    }
  >,
  'getPricingInfo' : ActorMethod<
    [bigint],
    [] | [
      {
        'soldSupply' : bigint,
        'priceInICP' : number,
        'totalSupply' : bigint,
        'nftPrice' : bigint,
        'fundingRequired' : bigint,
        'availableSupply' : bigint,
      }
    ]
  >,
  'getRecentInvestmentActivity' : ActorMethod<
    [bigint],
    Array<InvestmentProject>
  >,
  'getTopInvestors' : ActorMethod<[bigint], Array<InvestorProfile>>,
  'getVerificationTracker' : ActorMethod<
    [InvestmentId],
    [] | [VerificationTracker]
  >,
  'healthCheck' : ActorMethod<[], string>,
  'icrc7_approve' : ActorMethod<[Array<ApprovalInfo>], Array<ApprovalResult>>,
  'icrc7_balance_of' : ActorMethod<[Array<Account>], Array<bigint>>,
  'icrc7_description' : ActorMethod<[], [] | [string]>,
  'icrc7_logo' : ActorMethod<[], [] | [string]>,
  'icrc7_name' : ActorMethod<[], string>,
  'icrc7_owner_of' : ActorMethod<[Array<TokenId>], Array<[] | [Account]>>,
  'icrc7_supported_standards' : ActorMethod<[], Array<Standard>>,
  'icrc7_symbol' : ActorMethod<[], string>,
  'icrc7_token_metadata' : ActorMethod<
    [Array<TokenId>],
    Array<[] | [TokenMetadata]>
  >,
  'icrc7_tokens_of' : ActorMethod<
    [Account, [] | [TokenId], [] | [bigint]],
    Array<TokenId>
  >,
  'icrc7_total_supply' : ActorMethod<[], bigint>,
  'icrc7_transfer' : ActorMethod<[Array<TransferArg>], Array<TransferResult>>,
  'isActiveInvestor' : ActorMethod<[InvestorId], boolean>,
  'isFarmerVerified' : ActorMethod<[FarmerId], boolean>,
  'mintFarmNFT' : ActorMethod<[InvestmentId, [] | [bigint]], MintResult>,
  'purchaseNFT' : ActorMethod<[PurchaseNFTRequest], PurchaseNFTResult>,
  'registerFarmer' : ActorMethod<
    [RegisterFarmerRequest],
    FarmerRegistrationResult
  >,
  'registerInvestor' : ActorMethod<
    [RegisterInvestorRequest],
    InvestorRegistrationResult
  >,
  'searchInvestmentProjects' : ActorMethod<
    [
      [] | [CropType],
      [] | [string],
      [] | [bigint],
      [] | [bigint],
      [] | [InvestmentStatus],
    ],
    Array<InvestmentProject>
  >,
  'updateFarmerProfile' : ActorMethod<
    [[] | [string], [] | [string], [] | [string]],
    Result
  >,
  'updateFarmerVerificationStatus' : ActorMethod<
    [FarmerId, VerificationStatus],
    Result
  >,
  'updateInvestmentProjectStatus' : ActorMethod<
    [InvestmentId, InvestmentStatus, [] | [string]],
    Result
  >,
  'updateInvestmentValue' : ActorMethod<[InvestorId, bigint, bigint], Result>,
  'updateInvestorProfile' : ActorMethod<[[] | [string], [] | [string]], Result>,
  'updateInvestorStatus' : ActorMethod<[InvestorId, InvestorStatus], Result>,
  'updateNFTMetadata' : ActorMethod<
    [TokenId, [] | [string], [] | [string]],
    Result
  >,
  'uploadDocument' : ActorMethod<[UploadDocumentRequest], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
