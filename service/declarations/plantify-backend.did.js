export const idlFactory = ({ IDL }) => {
  const CreateCollectionRequest = IDL.Record({
    name: IDL.Text,
    description: IDL.Text,
    projectId: IDL.Text,
    image: IDL.Opt(IDL.Text),
    pricePerToken: IDL.Opt(IDL.Nat),
    maxSupply: IDL.Nat,
    symbol: IDL.Text,
  });
  const CollectionMetadata = IDL.Record({
    supply_cap: IDL.Opt(IDL.Nat),
    name: IDL.Text,
    description: IDL.Text,
    image: IDL.Opt(IDL.Text),
    symbol: IDL.Text,
  });
  const NFTCollection = IDL.Record({
    id: IDL.Text,
    metadata: CollectionMetadata,
    createdAt: IDL.Int,
    createdBy: IDL.Principal,
    totalSupply: IDL.Nat,
    isActive: IDL.Bool,
    projectId: IDL.Text,
    pricePerToken: IDL.Nat,
    maxSupply: IDL.Nat,
  });
  const CollectionResult = IDL.Variant({
    ok: NFTCollection,
    err: IDL.Text,
  });
  const ProjectType = IDL.Variant({
    B2B: IDL.Null,
    Healthcare: IDL.Null,
    RealEstate: IDL.Null,
    Food: IDL.Null,
    Energy: IDL.Null,
    Consumer: IDL.Null,
    Technology: IDL.Null,
    Entertainment: IDL.Null,
    SocialImpact: IDL.Null,
    Commerce: IDL.Null,
    Transportation: IDL.Null,
    Services: IDL.Null,
    Other: IDL.Null,
    Agriculture: IDL.Null,
    Education: IDL.Null,
    Finance: IDL.Null,
    Manufacturing: IDL.Null,
  });
  const UseOfFunds = IDL.Record({
    description: IDL.Text,
    category: IDL.Text,
    amount: IDL.Nat,
    percentage: IDL.Float64,
  });
  const TeamMember = IDL.Record({
    bio: IDL.Opt(IDL.Text),
    name: IDL.Text,
    role: IDL.Text,
    imageUrl: IDL.Opt(IDL.Text),
    linkedinUrl: IDL.Opt(IDL.Text),
  });
  const Industry = IDL.Variant({
    Marketplace: IDL.Null,
    Payments: IDL.Null,
    SmartGrid: IDL.Null,
    CloudComputing: IDL.Null,
    RetailTechnology: IDL.Null,
    Insurance: IDL.Null,
    CleanTech: IDL.Null,
    EducationTechnology: IDL.Null,
    Banking: IDL.Null,
    PublicTransport: IDL.Null,
    Mobility: IDL.Null,
    FoodDelivery: IDL.Null,
    DigitalHealth: IDL.Null,
    Telemedicine: IDL.Null,
    ContentCreation: IDL.Null,
    RestaurantTech: IDL.Null,
    Pharmaceuticals: IDL.Null,
    Biotechnology: IDL.Null,
    RealEstateServices: IDL.Null,
    WebDevelopment: IDL.Null,
    VirtualReality: IDL.Null,
    ECommerce: IDL.Null,
    SmartHomes: IDL.Null,
    EnergyStorage: IDL.Null,
    Blockchain: IDL.Null,
    Gaming: IDL.Null,
    Sustainability: IDL.Null,
    HealthcareServices: IDL.Null,
    OnlineLearning: IDL.Null,
    StreamingMedia: IDL.Null,
    SoftwareDevelopment: IDL.Null,
    Logistics: IDL.Null,
    DeliveryServices: IDL.Null,
    Cryptocurrency: IDL.Null,
    CorporateTraining: IDL.Null,
    RenewableEnergy: IDL.Null,
    MedicalDevices: IDL.Null,
    PropertyTechnology: IDL.Null,
    AutonomousVehicles: IDL.Null,
    SocialMedia: IDL.Null,
    SupplyChain: IDL.Null,
    NutritionTech: IDL.Null,
    MobileApps: IDL.Null,
    InvestmentPlatforms: IDL.Null,
    Other: IDL.Null,
    Cybersecurity: IDL.Null,
    FoodTechnology: IDL.Null,
    Agriculture: IDL.Null,
    ElectricVehicles: IDL.Null,
    LanguageLearning: IDL.Null,
    SkillTraining: IDL.Null,
    Construction: IDL.Null,
    Fintech: IDL.Null,
    ArtificialIntelligence: IDL.Null,
  });
  const Milestone = IDL.Record({
    completedDate: IDL.Opt(IDL.Int),
    title: IDL.Text,
    completed: IDL.Bool,
    description: IDL.Text,
    targetDate: IDL.Opt(IDL.Int),
    fundingRequired: IDL.Nat,
  });
  const ProjectCreateRequest = IDL.Record({
    projectType: ProjectType,
    companyValuation: IDL.Nat,
    pitchDeckUrl: IDL.Opt(IDL.Text),
    tags: IDL.Vec(IDL.Text),
    maxInvestment: IDL.Opt(IDL.Nat),
    minInvestment: IDL.Nat,
    productImages: IDL.Vec(IDL.Text),
    useOfFunds: IDL.Vec(UseOfFunds),
    website: IDL.Opt(IDL.Text),
    teamMembers: IDL.Vec(TeamMember),
    companyTagline: IDL.Text,
    jurisdiction: IDL.Opt(IDL.Text),
    demoVideoUrl: IDL.Opt(IDL.Text),
    solution: IDL.Text,
    targetDate: IDL.Opt(IDL.Int),
    companyLogo: IDL.Opt(IDL.Text),
    companyName: IDL.Text,
    expectedROI: IDL.Text,
    fundingGoal: IDL.Nat,
    marketOpportunity: IDL.Text,
    riskLevel: IDL.Text,
    location: IDL.Text,
    problem: IDL.Text,
    legalStructure: IDL.Opt(IDL.Text),
    industry: Industry,
    minimumFunding: IDL.Nat,
    milestones: IDL.Vec(Milestone),
    timeline: IDL.Text,
  });
  const ProjectStatus = IDL.Variant({
    Active: IDL.Null,
    InReview: IDL.Null,
    Suspended: IDL.Null,
    Draft: IDL.Null,
    Rejected: IDL.Null,
    Funded: IDL.Null,
    Cancelled: IDL.Null,
    InProgress: IDL.Null,
    Completed: IDL.Null,
  });
  const Project = IDL.Record({
    id: IDL.Text,
    status: ProjectStatus,
    fundingRaised: IDL.Nat,
    projectType: ProjectType,
    companyValuation: IDL.Nat,
    pitchDeckUrl: IDL.Opt(IDL.Text),
    investorCount: IDL.Nat,
    createdAt: IDL.Int,
    tags: IDL.Vec(IDL.Text),
    maxInvestment: IDL.Opt(IDL.Nat),
    minInvestment: IDL.Nat,
    productImages: IDL.Vec(IDL.Text),
    useOfFunds: IDL.Vec(UseOfFunds),
    website: IDL.Opt(IDL.Text),
    teamMembers: IDL.Vec(TeamMember),
    companyTagline: IDL.Text,
    jurisdiction: IDL.Opt(IDL.Text),
    updatedAt: IDL.Int,
    demoVideoUrl: IDL.Opt(IDL.Text),
    solution: IDL.Text,
    targetDate: IDL.Opt(IDL.Int),
    companyLogo: IDL.Opt(IDL.Text),
    companyName: IDL.Text,
    founderId: IDL.Text,
    launchDate: IDL.Opt(IDL.Int),
    expectedROI: IDL.Text,
    fundingGoal: IDL.Nat,
    founderPrincipal: IDL.Principal,
    marketOpportunity: IDL.Text,
    riskLevel: IDL.Text,
    location: IDL.Text,
    problem: IDL.Text,
    legalStructure: IDL.Opt(IDL.Text),
    industry: Industry,
    minimumFunding: IDL.Nat,
    milestones: IDL.Vec(Milestone),
    timeline: IDL.Text,
  });
  const ProjectResult = IDL.Variant({ ok: Project, err: IDL.Text });
  const ProjectUpdateResult = IDL.Variant({
    ok: IDL.Null,
    err: IDL.Text,
  });
  const Founder = IDL.Record({
    id: IDL.Text,
    principal: IDL.Principal,
    fullName: IDL.Text,
    email: IDL.Text,
    governmentId: IDL.Text,
    isVerified: IDL.Bool,
    registrationDate: IDL.Int,
    phoneNumber: IDL.Text,
  });
  const Investor = IDL.Record({
    id: IDL.Text,
    principal: IDL.Principal,
    fullName: IDL.Text,
    email: IDL.Text,
    isVerified: IDL.Bool,
    registrationDate: IDL.Int,
  });
  const InvestmentStatus = IDL.Variant({
    Failed: IDL.Null,
    Refunded: IDL.Null,
    Processing: IDL.Null,
    Completed: IDL.Null,
    Pending: IDL.Null,
  });
  const Investment = IDL.Record({
    id: IDL.Text,
    status: InvestmentStatus,
    transactionHash: IDL.Opt(IDL.Text),
    investorPrincipal: IDL.Principal,
    tokenIds: IDL.Vec(IDL.Nat),
    collectionId: IDL.Text,
    investorId: IDL.Text,
    projectId: IDL.Text,
    investmentDate: IDL.Int,
    quantity: IDL.Nat,
    founderId: IDL.Text,
    pricePerToken: IDL.Nat,
    founderPrincipal: IDL.Principal,
    amount: IDL.Nat,
  });
  const InvestmentSummary = IDL.Record({
    id: IDL.Text,
    status: InvestmentStatus,
    currentValue: IDL.Opt(IDL.Nat),
    projectTitle: IDL.Text,
    investmentDate: IDL.Int,
    quantity: IDL.Nat,
    amount: IDL.Nat,
  });
  const CollectionStats = IDL.Record({
    totalTokensMinted: IDL.Nat,
    activeCollections: IDL.Nat,
    totalValueLocked: IDL.Nat,
    totalCollections: IDL.Nat,
  });
  const PurchaseRequest = IDL.Record({
    collectionId: IDL.Text,
    projectId: IDL.Text,
    quantity: IDL.Nat,
    paymentAmount: IDL.Nat,
  });
  const PurchaseResult = IDL.Variant({ ok: Investment, err: IDL.Text });
  const FounderRegistrationRequest = IDL.Record({
    fullName: IDL.Text,
    email: IDL.Text,
    governmentId: IDL.Text,
    phoneNumber: IDL.Text,
  });
  const FounderRegistrationResult = IDL.Variant({
    ok: Founder,
    err: IDL.Text,
  });
  const InvestorRegistrationRequest = IDL.Record({
    fullName: IDL.Text,
    email: IDL.Text,
  });
  const InvestorRegistrationResult = IDL.Variant({
    ok: Investor,
    err: IDL.Text,
  });
  const ICPTransferRequest = IDL.Record({
    to: IDL.Principal,
    memo: IDL.Opt(IDL.Text),
    amount: IDL.Nat,
  });
  const TransferResult = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const FounderUpdateResult = IDL.Variant({
    ok: IDL.Null,
    err: IDL.Text,
  });
  const InvestorUpdateResult = IDL.Variant({
    ok: IDL.Null,
    err: IDL.Text,
  });
  const ProjectUpdateRequest = IDL.Record({
    projectType: ProjectType,
    companyValuation: IDL.Nat,
    pitchDeckUrl: IDL.Opt(IDL.Text),
    tags: IDL.Vec(IDL.Text),
    maxInvestment: IDL.Opt(IDL.Nat),
    minInvestment: IDL.Nat,
    productImages: IDL.Vec(IDL.Text),
    useOfFunds: IDL.Vec(UseOfFunds),
    website: IDL.Opt(IDL.Text),
    teamMembers: IDL.Vec(TeamMember),
    companyTagline: IDL.Text,
    jurisdiction: IDL.Opt(IDL.Text),
    demoVideoUrl: IDL.Opt(IDL.Text),
    solution: IDL.Text,
    targetDate: IDL.Opt(IDL.Int),
    companyLogo: IDL.Opt(IDL.Text),
    companyName: IDL.Text,
    expectedROI: IDL.Text,
    fundingGoal: IDL.Nat,
    marketOpportunity: IDL.Text,
    riskLevel: IDL.Text,
    location: IDL.Text,
    problem: IDL.Text,
    legalStructure: IDL.Opt(IDL.Text),
    industry: Industry,
    minimumFunding: IDL.Nat,
    milestones: IDL.Vec(Milestone),
    timeline: IDL.Text,
  });
  return IDL.Service({
    createNFTCollection: IDL.Func(
      [CreateCollectionRequest],
      [CollectionResult],
      []
    ),
    createProject: IDL.Func([ProjectCreateRequest], [ProjectResult], []),
    deleteProject: IDL.Func([IDL.Text], [ProjectUpdateResult], []),
    founderExistsByEmail: IDL.Func([IDL.Text], [IDL.Bool], ["query"]),
    getActiveNFTCollections: IDL.Func([], [IDL.Vec(NFTCollection)], ["query"]),
    getActiveProjects: IDL.Func([], [IDL.Vec(Project)], ["query"]),
    getAllFounders: IDL.Func([], [IDL.Vec(Founder)], ["query"]),
    getAllInvestors: IDL.Func([], [IDL.Vec(Investor)], ["query"]),
    getAllProjects: IDL.Func([], [IDL.Vec(Project)], ["query"]),
    getFounder: IDL.Func([IDL.Text], [IDL.Opt(Founder)], ["query"]),
    getFounderByEmail: IDL.Func([IDL.Text], [IDL.Opt(Founder)], ["query"]),
    getFounderCount: IDL.Func([], [IDL.Nat], ["query"]),
    getICPBalance: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    getICPTransferFee: IDL.Func([], [IDL.Nat], ["query"]),
    getInvestment: IDL.Func([IDL.Text], [IDL.Opt(Investment)], ["query"]),
    getInvestmentsForMyProjects: IDL.Func([], [IDL.Vec(Investment)], []),
    getInvestor: IDL.Func([IDL.Text], [IDL.Opt(Investor)], ["query"]),
    getInvestorByEmail: IDL.Func([IDL.Text], [IDL.Opt(Investor)], ["query"]),
    getInvestorCount: IDL.Func([], [IDL.Nat], ["query"]),
    getInvestorCountForProject: IDL.Func([IDL.Text], [IDL.Nat], ["query"]),
    getMyFounderProfile: IDL.Func([], [IDL.Opt(Founder)], []),
    getMyICPBalance: IDL.Func([], [IDL.Nat], []),
    getMyInvestmentSummaries: IDL.Func([], [IDL.Vec(InvestmentSummary)], []),
    getMyInvestments: IDL.Func([], [IDL.Vec(Investment)], []),
    getMyInvestorProfile: IDL.Func([], [IDL.Opt(Investor)], []),
    getMyProjects: IDL.Func([], [IDL.Vec(Project)], []),
    getNFTCollection: IDL.Func([IDL.Text], [IDL.Opt(NFTCollection)], ["query"]),
    getNFTCollectionsByProject: IDL.Func(
      [IDL.Text],
      [IDL.Vec(NFTCollection)],
      ["query"]
    ),
    getNFTStats: IDL.Func([], [CollectionStats], ["query"]),
    getPlatformStats: IDL.Func(
      [],
      [
        IDL.Record({
          totalFundingRaised: IDL.Nat,
          activeProjects: IDL.Nat,
          totalFounders: IDL.Nat,
          totalProjects: IDL.Nat,
          totalInvestments: IDL.Nat,
          totalInvestors: IDL.Nat,
        }),
      ],
      ["query"]
    ),
    getProject: IDL.Func([IDL.Text], [IDL.Opt(Project)], ["query"]),
    getProjectCount: IDL.Func([], [IDL.Nat], ["query"]),
    getProjectsByFounder: IDL.Func([IDL.Text], [IDL.Vec(Project)], ["query"]),
    getProjectsByStatus: IDL.Func(
      [ProjectStatus],
      [IDL.Vec(Project)],
      ["query"]
    ),
    getTotalFundingForProject: IDL.Func([IDL.Text], [IDL.Nat], ["query"]),
    healthCheck: IDL.Func([], [IDL.Text], ["query"]),
    investorExistsByEmail: IDL.Func([IDL.Text], [IDL.Bool], ["query"]),
    mintICPForTesting: IDL.Func([IDL.Nat], [IDL.Bool], []),
    purchaseNFTs: IDL.Func([PurchaseRequest], [PurchaseResult], []),
    registerFounder: IDL.Func(
      [FounderRegistrationRequest],
      [FounderRegistrationResult],
      []
    ),
    registerInvestor: IDL.Func(
      [InvestorRegistrationRequest],
      [InvestorRegistrationResult],
      []
    ),
    simulateICPTransfer: IDL.Func([ICPTransferRequest], [TransferResult], []),
    submitProjectForReview: IDL.Func([IDL.Text], [ProjectUpdateResult], []),
    transferICP: IDL.Func([ICPTransferRequest], [TransferResult], []),
    updateFounderVerification: IDL.Func(
      [IDL.Text, IDL.Bool],
      [FounderUpdateResult],
      []
    ),
    updateInvestorVerification: IDL.Func(
      [IDL.Text, IDL.Bool],
      [InvestorUpdateResult],
      []
    ),
    updateMyFounderProfile: IDL.Func(
      [IDL.Text, FounderRegistrationRequest],
      [FounderUpdateResult],
      []
    ),
    updateMyInvestorProfile: IDL.Func(
      [IDL.Text, InvestorRegistrationRequest],
      [InvestorUpdateResult],
      []
    ),
    updateProject: IDL.Func(
      [IDL.Text, ProjectUpdateRequest],
      [ProjectUpdateResult],
      []
    ),
    updateProjectStatus: IDL.Func(
      [IDL.Text, ProjectStatus],
      [ProjectUpdateResult],
      []
    ),
  });
};
export const init = ({}) => {
  return [];
};
