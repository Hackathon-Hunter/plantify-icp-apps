export const idlFactory = ({ IDL }) => {
  const Value = IDL.Rec();
  const InvestmentId = IDL.Nat;
  const DocumentType__1 = IDL.Variant({
    'AgriculturalCertification' : IDL.Null,
    'PreviousHarvestPhoto' : IDL.Null,
    'LandCertificate' : IDL.Null,
    'CommunityEndorsement' : IDL.Null,
    'GovernmentPermit' : IDL.Null,
    'FarmPhoto' : IDL.Null,
    'SoilTestResult' : IDL.Null,
    'LeaseAgreement' : IDL.Null,
  });
  const InvestmentDocument = IDL.Record({
    'documentType' : DocumentType__1,
    'isRequired' : IDL.Bool,
    'fileHash' : IDL.Text,
    'fileName' : IDL.Text,
    'uploadedAt' : IDL.Int,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const TokenId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : TokenId, 'err' : IDL.Text });
  const AccessRoadCondition = IDL.Variant({
    'Fair' : IDL.Null,
    'Good' : IDL.Null,
    'Poor' : IDL.Null,
  });
  const LandOwnership = IDL.Variant({
    'Partnership' : IDL.Null,
    'Leased' : IDL.Null,
    'Owned' : IDL.Null,
  });
  const CropType = IDL.Variant({
    'Corn' : IDL.Null,
    'Rice' : IDL.Null,
    'Vegetables' : IDL.Null,
    'Other' : IDL.Text,
    'Fruits' : IDL.Null,
    'Coffee' : IDL.Null,
  });
  const FarmInfoRequest = IDL.Record({
    'farmSize' : IDL.Text,
    'country' : IDL.Text,
    'gpsCoordinates' : IDL.Opt(IDL.Text),
    'stateProvince' : IDL.Text,
    'cityDistrict' : IDL.Text,
    'accessRoads' : AccessRoadCondition,
    'landOwnership' : LandOwnership,
    'cropType' : CropType,
    'waterSource' : IDL.Text,
    'fundingRequired' : IDL.Nat,
  });
  const ExperienceLevel = IDL.Variant({
    'Beginner' : IDL.Null,
    'Experienced' : IDL.Null,
    'Intermediate' : IDL.Null,
  });
  const CultivationMethod = IDL.Variant({
    'Conventional' : IDL.Null,
    'Hydroponic' : IDL.Null,
    'Organic' : IDL.Null,
  });
  const HarvestTimeline = IDL.Variant({
    'Short' : IDL.Null,
    'Long' : IDL.Null,
    'Medium' : IDL.Null,
  });
  const MarketDistribution = IDL.Variant({
    'LocalMarkets' : IDL.Null,
    'ExportBuyers' : IDL.Null,
    'DirectToConsumer' : IDL.Null,
    'ProcessingIndustries' : IDL.Null,
    'Cooperatives' : IDL.Null,
    'ContractFarming' : IDL.Null,
  });
  const ExperienceRequest = IDL.Record({
    'farmingExperience' : ExperienceLevel,
    'cultivationMethod' : CultivationMethod,
    'harvestTimeline' : HarvestTimeline,
    'investmentDescription' : IDL.Text,
    'marketDistribution' : IDL.Vec(MarketDistribution),
    'expectedYield' : IDL.Text,
  });
  const BudgetAllocation = IDL.Record({
    'fertilizers' : IDL.Nat,
    'equipment' : IDL.Nat,
    'labor' : IDL.Nat,
    'insurance' : IDL.Nat,
    'seeds' : IDL.Nat,
    'infrastructure' : IDL.Nat,
    'operational' : IDL.Nat,
  });
  const BudgetRequest = IDL.Record({
    'previousFarmingLoans' : IDL.Opt(IDL.Bool),
    'expectedMinROI' : IDL.Nat,
    'budgetAllocation' : BudgetAllocation,
    'hasBusinessBankAccount' : IDL.Bool,
    'emergencyContactPhone' : IDL.Text,
    'emergencyContactName' : IDL.Text,
    'expectedMaxROI' : IDL.Nat,
  });
  const CreateInvestmentRequest = IDL.Record({
    'agreements' : IDL.Vec(IDL.Bool),
    'farmInfo' : FarmInfoRequest,
    'documents' : IDL.Vec(InvestmentDocument),
    'experience' : ExperienceRequest,
    'budget' : BudgetRequest,
  });
  const InvestmentProjectResult = IDL.Variant({
    'Error' : IDL.Text,
    'FarmerNotVerified' : IDL.Null,
    'Success' : InvestmentId,
    'InvalidData' : IDL.Text,
  });
  const InvestmentStats = IDL.Record({
    'pendingVerification' : IDL.Nat,
    'approvedProjects' : IDL.Nat,
    'activeProjects' : IDL.Nat,
    'totalProjects' : IDL.Nat,
    'completedProjects' : IDL.Nat,
    'rejectedProjects' : IDL.Nat,
  });
  const InvestorStats = IDL.Record({
    'activeInvestors' : IDL.Nat,
    'totalInvestmentVolume' : IDL.Nat,
    'inactiveInvestors' : IDL.Nat,
    'averageInvestmentAmount' : IDL.Nat,
    'suspendedInvestors' : IDL.Nat,
    'totalInvestors' : IDL.Nat,
  });
  const FarmerStats = IDL.Record({
    'pendingVerification' : IDL.Nat,
    'approvedFarmers' : IDL.Nat,
    'rejectedFarmers' : IDL.Nat,
    'totalFarmers' : IDL.Nat,
  });
  const DocumentType = IDL.Variant({
    'SelfiePhoto' : IDL.Null,
    'GovernmentID' : IDL.Null,
    'LandCertificate' : IDL.Null,
    'BusinessLicense' : IDL.Null,
  });
  const Document = IDL.Record({
    'documentType' : DocumentType,
    'fileHash' : IDL.Text,
    'fileName' : IDL.Text,
    'uploadedAt' : IDL.Int,
  });
  const FarmerId = IDL.Principal;
  const VerificationStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'InReview' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const FarmerProfile = IDL.Record({
    'documents' : IDL.Vec(Document),
    'farmerId' : FarmerId,
    'lastUpdated' : IDL.Int,
    'fullName' : IDL.Text,
    'isActive' : IDL.Bool,
    'email' : IDL.Text,
    'governmentId' : IDL.Text,
    'registrationDate' : IDL.Int,
    'phoneNumber' : IDL.Text,
    'verificationStatus' : VerificationStatus,
  });
  const InvestmentStatus = IDL.Variant({
    'InVerification' : IDL.Null,
    'Active' : IDL.Null,
    'PendingVerification' : IDL.Null,
    'Approved' : IDL.Null,
    'Draft' : IDL.Null,
    'Rejected' : IDL.Null,
    'Cancelled' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const InvestmentProject = IDL.Record({
    'id' : InvestmentId,
    'agreements' : IDL.Vec(IDL.Bool),
    'status' : InvestmentStatus,
    'farmInfo' : FarmInfoRequest,
    'documents' : IDL.Vec(InvestmentDocument),
    'farmerId' : FarmerId,
    'rejectedReason' : IDL.Opt(IDL.Text),
    'approvedAt' : IDL.Opt(IDL.Int),
    'createdAt' : IDL.Int,
    'lastUpdated' : IDL.Int,
    'experience' : ExperienceRequest,
    'budget' : BudgetRequest,
    'verificationNotes' : IDL.Opt(IDL.Text),
  });
  const InvestorStatus = IDL.Variant({
    'Inactive' : IDL.Null,
    'Active' : IDL.Null,
    'Suspended' : IDL.Null,
  });
  const InvestorId = IDL.Principal;
  const InvestorProfile = IDL.Record({
    'status' : InvestorStatus,
    'lastUpdated' : IDL.Int,
    'investorId' : InvestorId,
    'activeInvestments' : IDL.Nat,
    'fullName' : IDL.Text,
    'isActive' : IDL.Bool,
    'email' : IDL.Text,
    'portfolioValue' : IDL.Nat,
    'registrationDate' : IDL.Int,
    'totalInvestmentAmount' : IDL.Nat,
  });
  const NFTCollection = IDL.Record({
    'soldSupply' : IDL.Nat,
    'tokenIds' : IDL.Vec(TokenId),
    'createdAt' : IDL.Int,
    'totalSupply' : IDL.Nat,
    'investmentId' : IDL.Nat,
    'nftPrice' : IDL.Nat,
    'availableSupply' : IDL.Nat,
  });
  const InvestorInvestment = IDL.Record({
    'status' : IDL.Variant({
      'Sold' : IDL.Null,
      'Active' : IDL.Null,
      'Matured' : IDL.Null,
    }),
    'purchaseDate' : IDL.Int,
    'investmentAmount' : IDL.Nat,
    'currentValue' : IDL.Nat,
    'nftTokenIds' : IDL.Vec(IDL.Nat),
    'investmentId' : IDL.Nat,
  });
  const FarmNFTMetadata = IDL.Record({
    'soldSupply' : IDL.Nat,
    'farmerId' : IDL.Principal,
    'fundingAmount' : IDL.Nat,
    'area' : IDL.Text,
    'createdAt' : IDL.Int,
    'harvestTimeline' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'imageUrl' : IDL.Opt(IDL.Text),
    'projectStatus' : IDL.Text,
    'cropType' : IDL.Text,
    'investmentId' : IDL.Nat,
    'nftPrice' : IDL.Nat,
    'location' : IDL.Text,
    'availableSupply' : IDL.Nat,
    'expectedYield' : IDL.Text,
  });
  const InvestorPortfolio = IDL.Record({
    'totalValue' : IDL.Nat,
    'roiPercentage' : IDL.Float64,
    'investments' : IDL.Vec(InvestorInvestment),
    'totalReturns' : IDL.Nat,
    'investor' : InvestorProfile,
  });
  const VerificationStep = IDL.Record({
    'status' : IDL.Variant({
      'Failed' : IDL.Null,
      'InProgress' : IDL.Null,
      'Completed' : IDL.Null,
      'Pending' : IDL.Null,
    }),
    'completedAt' : IDL.Opt(IDL.Int),
    'description' : IDL.Text,
    'stepName' : IDL.Text,
    'notes' : IDL.Opt(IDL.Text),
    'estimatedTime' : IDL.Text,
  });
  const VerificationTracker = IDL.Record({
    'lastUpdated' : IDL.Int,
    'overallProgress' : IDL.Nat,
    'steps' : IDL.Vec(VerificationStep),
    'currentStep' : IDL.Text,
    'investmentId' : InvestmentId,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ApprovalInfo = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'expires_at' : IDL.Opt(IDL.Nat64),
    'spender' : Account,
  });
  const ApprovalError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'NonExistentTokenId' : IDL.Null,
    'InvalidSpender' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const ApprovalResult = IDL.Variant({ 'Ok' : TokenId, 'Err' : ApprovalError });
  const Standard = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  Value.fill(
    IDL.Variant({
      'Int' : IDL.Int,
      'Map' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
      'Nat' : IDL.Nat,
      'Blob' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'Array' : IDL.Vec(Value),
    })
  );
  const TokenMetadata = IDL.Vec(IDL.Tuple(IDL.Text, Value));
  const TransferArg = IDL.Record({
    'to' : Account,
    'token_id' : TokenId,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
  });
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'NonExistentTokenId' : IDL.Null,
    'Duplicate' : IDL.Record({ 'duplicate_of' : TokenId }),
    'Unauthorized' : IDL.Null,
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'InvalidRecipient' : IDL.Null,
    'GenericBatchError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TooOld' : IDL.Null,
  });
  const TransferResult = IDL.Variant({ 'Ok' : TokenId, 'Err' : TransferError });
  const MintError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Unauthorized' : IDL.Null,
    'InvalidRecipient' : IDL.Null,
    'TokenIdAlreadyExists' : IDL.Null,
  });
  const MintResult = IDL.Variant({ 'Ok' : TokenId, 'Err' : MintError });
  const PurchaseNFTRequest = IDL.Record({
    'quantity' : IDL.Nat,
    'investmentId' : IDL.Nat,
    'paymentAmount' : IDL.Nat,
  });
  const PurchaseNFTResult = IDL.Variant({
    'Error' : IDL.Text,
    'InsufficientPayment' : IDL.Record({
      'provided' : IDL.Nat,
      'required' : IDL.Nat,
    }),
    'InvalidQuantity' : IDL.Null,
    'Success' : IDL.Record({
      'tokenIds' : IDL.Vec(TokenId),
      'totalPaid' : IDL.Nat,
      'remainingAvailable' : IDL.Nat,
    }),
    'InsufficientSupply' : IDL.Record({
      'requested' : IDL.Nat,
      'available' : IDL.Nat,
    }),
    'ProjectNotFound' : IDL.Null,
  });
  const RegisterFarmerRequest = IDL.Record({
    'fullName' : IDL.Text,
    'email' : IDL.Text,
    'governmentId' : IDL.Text,
    'phoneNumber' : IDL.Text,
  });
  const FarmerRegistrationResult = IDL.Variant({
    'Error' : IDL.Text,
    'AlreadyRegistered' : FarmerId,
    'Success' : FarmerId,
    'InvalidData' : IDL.Text,
  });
  const RegisterInvestorRequest = IDL.Record({
    'fullName' : IDL.Text,
    'email' : IDL.Text,
  });
  const InvestorRegistrationResult = IDL.Variant({
    'Error' : IDL.Text,
    'AlreadyRegistered' : InvestorId,
    'Success' : InvestorId,
    'InvalidData' : IDL.Text,
  });
  const UploadDocumentRequest = IDL.Record({
    'documentType' : DocumentType,
    'fileHash' : IDL.Text,
    'fileName' : IDL.Text,
  });
  return IDL.Service({
    'addInvestmentDocument' : IDL.Func(
        [InvestmentId, InvestmentDocument],
        [Result],
        [],
      ),
    'approveInvestmentAndMintNFT' : IDL.Func(
        [InvestmentId, IDL.Opt(IDL.Text), IDL.Opt(IDL.Nat)],
        [Result_1],
        [],
      ),
    'calculateNFTPrice' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], ['query']),
    'checkInvestorRegistration' : IDL.Func(
        [IDL.Vec(IDL.Principal)],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Bool))],
        ['query'],
      ),
    'createInvestmentProject' : IDL.Func(
        [CreateInvestmentRequest],
        [InvestmentProjectResult],
        [],
      ),
    'getAdminDashboardStats' : IDL.Func(
        [],
        [
          IDL.Record({
            'projects' : InvestmentStats,
            'nfts' : IDL.Record({
              'totalVolume' : IDL.Nat,
              'averagePrice' : IDL.Nat,
              'totalSupply' : IDL.Nat,
              'totalCollections' : IDL.Nat,
            }),
            'users' : IDL.Record({
              'investors' : InvestorStats,
              'farmers' : FarmerStats,
            }),
            'financial' : IDL.Record({
              'averageInvestmentSize' : IDL.Nat,
              'platformRevenue' : IDL.Nat,
              'totalInvestmentVolume' : IDL.Nat,
            }),
          }),
        ],
        ['query'],
      ),
    'getAllFarmers' : IDL.Func([], [IDL.Vec(FarmerProfile)], ['query']),
    'getAllInvestmentProjects' : IDL.Func(
        [],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getAllInvestors' : IDL.Func([], [IDL.Vec(InvestorProfile)], ['query']),
    'getAllNFTCollections' : IDL.Func([], [IDL.Vec(NFTCollection)], ['query']),
    'getAllNFTs' : IDL.Func([], [IDL.Vec(TokenId)], ['query']),
    'getDetailedPortfolio' : IDL.Func(
        [],
        [
          IDL.Opt(
            IDL.Record({
              'investments' : IDL.Vec(
                IDL.Record({
                  'nftTokens' : IDL.Vec(TokenId),
                  'roiPercentage' : IDL.Float64,
                  'investment' : InvestorInvestment,
                  'currentMarketValue' : IDL.Nat,
                  'project' : IDL.Opt(InvestmentProject),
                })
              ),
              'summary' : IDL.Record({
                'totalValue' : IDL.Nat,
                'worstPerforming' : IDL.Opt(IDL.Nat),
                'bestPerforming' : IDL.Opt(IDL.Nat),
                'totalReturns' : IDL.Nat,
                'overallROI' : IDL.Float64,
              }),
              'investor' : InvestorProfile,
            })
          ),
        ],
        ['query'],
      ),
    'getFarmNFTMetadata' : IDL.Func(
        [TokenId],
        [IDL.Opt(FarmNFTMetadata)],
        ['query'],
      ),
    'getFarmerProfile' : IDL.Func(
        [FarmerId],
        [IDL.Opt(FarmerProfile)],
        ['query'],
      ),
    'getFarmerRegistrationStats' : IDL.Func([], [FarmerStats], ['query']),
    'getFarmersByStatus' : IDL.Func(
        [VerificationStatus],
        [IDL.Vec(FarmerProfile)],
        ['query'],
      ),
    'getInvestmentOpportunities' : IDL.Func(
        [],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getInvestmentProject' : IDL.Func(
        [InvestmentId],
        [IDL.Opt(InvestmentProject)],
        ['query'],
      ),
    'getInvestmentProjectSummary' : IDL.Func(
        [InvestmentId],
        [
          IDL.Opt(
            IDL.Record({
              'pricing' : IDL.Opt(
                IDL.Record({
                  'soldSupply' : IDL.Nat,
                  'priceInICP' : IDL.Float64,
                  'totalSupply' : IDL.Nat,
                  'nftPrice' : IDL.Nat,
                  'fundingRequired' : IDL.Nat,
                  'availableSupply' : IDL.Nat,
                })
              ),
              'nftCollection' : IDL.Opt(NFTCollection),
              'project' : InvestmentProject,
            })
          ),
        ],
        ['query'],
      ),
    'getInvestmentProjectsByFarmer' : IDL.Func(
        [FarmerId],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getInvestmentProjectsByStatus' : IDL.Func(
        [InvestmentStatus],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getInvestmentStats' : IDL.Func([], [InvestmentStats], ['query']),
    'getInvestorPortfolio' : IDL.Func(
        [InvestorId],
        [IDL.Opt(InvestorPortfolio)],
        ['query'],
      ),
    'getInvestorProfile' : IDL.Func(
        [InvestorId],
        [IDL.Opt(InvestorProfile)],
        ['query'],
      ),
    'getInvestorRegistrationStats' : IDL.Func([], [InvestorStats], ['query']),
    'getInvestorsByStatus' : IDL.Func(
        [InvestorStatus],
        [IDL.Vec(InvestorProfile)],
        ['query'],
      ),
    'getMarketplaceOverview' : IDL.Func(
        [],
        [
          IDL.Record({
            'activeProjects' : IDL.Nat,
            'averageROI' : IDL.Float64,
            'topPerformingCrops' : IDL.Vec(IDL.Text),
            'totalFundingAvailable' : IDL.Nat,
            'totalInvestmentOpportunities' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getMyDashboardData' : IDL.Func(
        [],
        [
          IDL.Record({
            'userType' : IDL.Text,
            'farmerData' : IDL.Opt(
              IDL.Record({
                'totalFundingRaised' : IDL.Nat,
                'activeProjects' : IDL.Nat,
                'totalProjects' : IDL.Nat,
                'verificationStatus' : VerificationStatus,
              })
            ),
            'investorData' : IDL.Opt(
              IDL.Record({
                'roiPercentage' : IDL.Float64,
                'totalInvestments' : IDL.Nat,
                'portfolioValue' : IDL.Nat,
                'totalReturns' : IDL.Nat,
              })
            ),
          }),
        ],
        ['query'],
      ),
    'getMyFarmerProfile' : IDL.Func([], [IDL.Opt(FarmerProfile)], ['query']),
    'getMyInvestmentProjects' : IDL.Func(
        [],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getMyInvestorProfile' : IDL.Func(
        [],
        [IDL.Opt(InvestorProfile)],
        ['query'],
      ),
    'getMyNFTs' : IDL.Func([], [IDL.Vec(TokenId)], ['query']),
    'getMyPortfolio' : IDL.Func([], [IDL.Opt(InvestorPortfolio)], ['query']),
    'getMyRegistrationStatus' : IDL.Func(
        [],
        [
          IDL.Record({
            'isFarmer' : IDL.Bool,
            'isInvestor' : IDL.Bool,
            'investorStatus' : IDL.Opt(InvestorStatus),
            'farmerStatus' : IDL.Opt(VerificationStatus),
          }),
        ],
        ['query'],
      ),
    'getNFTCollection' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(NFTCollection)],
        ['query'],
      ),
    'getNFTStats' : IDL.Func(
        [],
        [
          IDL.Record({
            'averagePrice' : IDL.Nat,
            'totalSupply' : IDL.Nat,
            'totalCollections' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getNFTsByFarmer' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenId)],
        ['query'],
      ),
    'getNFTsByInvestment' : IDL.Func([IDL.Nat], [IDL.Vec(TokenId)], ['query']),
    'getPlatformMetrics' : IDL.Func(
        [],
        [
          IDL.Record({
            'averageInvestmentSize' : IDL.Nat,
            'platformGrowthRate' : IDL.Float64,
            'totalInvestmentProjects' : IDL.Nat,
            'totalInvestmentVolume' : IDL.Nat,
            'totalUsers' : IDL.Nat,
            'totalFarmers' : IDL.Nat,
            'totalInvestors' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getPlatformOverview' : IDL.Func(
        [],
        [
          IDL.Record({
            'investors' : InvestorStats,
            'farmers' : FarmerStats,
            'nfts' : IDL.Record({
              'totalSupply' : IDL.Nat,
              'totalCollections' : IDL.Nat,
            }),
            'investments' : InvestmentStats,
          }),
        ],
        ['query'],
      ),
    'getPricingInfo' : IDL.Func(
        [IDL.Nat],
        [
          IDL.Opt(
            IDL.Record({
              'soldSupply' : IDL.Nat,
              'priceInICP' : IDL.Float64,
              'totalSupply' : IDL.Nat,
              'nftPrice' : IDL.Nat,
              'fundingRequired' : IDL.Nat,
              'availableSupply' : IDL.Nat,
            })
          ),
        ],
        ['query'],
      ),
    'getRecentInvestmentActivity' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'getTopInvestors' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(InvestorProfile)],
        ['query'],
      ),
    'getVerificationTracker' : IDL.Func(
        [InvestmentId],
        [IDL.Opt(VerificationTracker)],
        ['query'],
      ),
    'healthCheck' : IDL.Func([], [IDL.Text], ['query']),
    'icrc7_approve' : IDL.Func(
        [IDL.Vec(ApprovalInfo)],
        [IDL.Vec(ApprovalResult)],
        [],
      ),
    'icrc7_balance_of' : IDL.Func(
        [IDL.Vec(Account)],
        [IDL.Vec(IDL.Nat)],
        ['query'],
      ),
    'icrc7_description' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'icrc7_logo' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'icrc7_name' : IDL.Func([], [IDL.Text], ['query']),
    'icrc7_owner_of' : IDL.Func(
        [IDL.Vec(TokenId)],
        [IDL.Vec(IDL.Opt(Account))],
        ['query'],
      ),
    'icrc7_supported_standards' : IDL.Func([], [IDL.Vec(Standard)], ['query']),
    'icrc7_symbol' : IDL.Func([], [IDL.Text], ['query']),
    'icrc7_token_metadata' : IDL.Func(
        [IDL.Vec(TokenId)],
        [IDL.Vec(IDL.Opt(TokenMetadata))],
        ['query'],
      ),
    'icrc7_tokens_of' : IDL.Func(
        [Account, IDL.Opt(TokenId), IDL.Opt(IDL.Nat)],
        [IDL.Vec(TokenId)],
        ['query'],
      ),
    'icrc7_total_supply' : IDL.Func([], [IDL.Nat], ['query']),
    'icrc7_transfer' : IDL.Func(
        [IDL.Vec(TransferArg)],
        [IDL.Vec(TransferResult)],
        [],
      ),
    'isActiveInvestor' : IDL.Func([InvestorId], [IDL.Bool], ['query']),
    'isFarmerVerified' : IDL.Func([FarmerId], [IDL.Bool], ['query']),
    'mintFarmNFT' : IDL.Func(
        [InvestmentId, IDL.Opt(IDL.Nat)],
        [MintResult],
        [],
      ),
    'purchaseNFT' : IDL.Func([PurchaseNFTRequest], [PurchaseNFTResult], []),
    'registerFarmer' : IDL.Func(
        [RegisterFarmerRequest],
        [FarmerRegistrationResult],
        [],
      ),
    'registerInvestor' : IDL.Func(
        [RegisterInvestorRequest],
        [InvestorRegistrationResult],
        [],
      ),
    'searchInvestmentProjects' : IDL.Func(
        [
          IDL.Opt(CropType),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Nat),
          IDL.Opt(IDL.Nat),
          IDL.Opt(InvestmentStatus),
        ],
        [IDL.Vec(InvestmentProject)],
        ['query'],
      ),
    'updateFarmerProfile' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'updateFarmerVerificationStatus' : IDL.Func(
        [FarmerId, VerificationStatus],
        [Result],
        [],
      ),
    'updateInvestmentProjectStatus' : IDL.Func(
        [InvestmentId, InvestmentStatus, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'updateInvestmentValue' : IDL.Func(
        [InvestorId, IDL.Nat, IDL.Nat],
        [Result],
        [],
      ),
    'updateInvestorProfile' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'updateInvestorStatus' : IDL.Func(
        [InvestorId, InvestorStatus],
        [Result],
        [],
      ),
    'updateNFTMetadata' : IDL.Func(
        [TokenId, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'uploadDocument' : IDL.Func([UploadDocumentRequest], [Result], []),
  });
};
export const init = ({ }) => { return []; };
