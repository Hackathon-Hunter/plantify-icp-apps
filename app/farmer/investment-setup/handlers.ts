import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createInvestmentProject,
  CreateInvestmentRequest,
  InvestmentProjectResult,
  CropType,
  LandOwnership,
  AccessRoadCondition,
  ExperienceLevel,
  CultivationMethod,
  HarvestTimeline,
  MarketDistribution,
  InvestmentDocument,
} from "@/service";

interface FormData {
  // Farm Info
  cropType: CropType | null;
  country: string;
  stateProvince: string;
  cityDistrict: string;
  gpsCoordinates: string;
  farmSize: string;
  landOwnership: LandOwnership | null;
  waterSource: string;
  accessRoads: AccessRoadCondition | null;
  fundingRequired: string;
  farmPhotos: File[];

  // Experience
  farmingExperience: ExperienceLevel | null;
  harvestTimeline: HarvestTimeline | null;
  expectedYield: string;
  cultivationMethod: CultivationMethod | null;
  investmentDescription: string;
  marketDistribution: MarketDistribution[];

  // Budget
  budgetAllocation: {
    seeds: number;
    fertilizers: number;
    labor: number;
    equipment: number;
    operational: number;
    infrastructure: number;
    insurance: number;
  };
  expectedMinROI: string;
  expectedMaxROI: string;
  hasBusinessBankAccount: boolean;
  previousFarmingLoans: boolean | null;
  emergencyContactName: string;
  emergencyContactPhone: string;

  // Documents & Agreements
  documents: InvestmentDocument[];
  agreements: boolean[];
}

const initialFormData: FormData = {
  // Farm Info
  cropType: null,
  country: "",
  stateProvince: "",
  cityDistrict: "",
  gpsCoordinates: "",
  farmSize: "",
  landOwnership: null,
  waterSource: "",
  accessRoads: null,
  fundingRequired: "",
  farmPhotos: [],

  // Experience
  farmingExperience: null,
  harvestTimeline: null,
  expectedYield: "",
  cultivationMethod: null,
  investmentDescription: "",
  marketDistribution: [],

  // Budget
  budgetAllocation: {
    seeds: 15,
    fertilizers: 20,
    labor: 30,
    equipment: 15,
    operational: 10,
    infrastructure: 5,
    insurance: 5,
  },
  expectedMinROI: "",
  expectedMaxROI: "",
  hasBusinessBankAccount: false,
  previousFarmingLoans: null,
  emergencyContactName: "",
  emergencyContactPhone: "",

  // Documents & Agreements
  documents: [],
  agreements: [false, false, false, false, false],
};

export const useInvestmentSetupForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Utility functions
  const getCropTypeFromString = useCallback(
    (value: string): CropType | null => {
      switch (value) {
        case "Rice":
          return { Rice: null };
        case "Corn":
          return { Corn: null };
        case "Vegetables":
          return { Vegetables: null };
        case "Fruits":
          return { Fruits: null };
        case "Coffee":
          return { Coffee: null };
        default:
          return null;
      }
    },
    []
  );

  const getLandOwnershipFromString = useCallback(
    (value: string): LandOwnership | null => {
      switch (value) {
        case "Owned":
          return { Owned: null };
        case "Leased":
          return { Leased: null };
        case "Partnership":
          return { Partnership: null };
        default:
          return null;
      }
    },
    []
  );

  const getAccessRoadFromString = useCallback(
    (value: string): AccessRoadCondition | null => {
      switch (value) {
        case "Good":
          return { Good: null };
        case "Fair":
          return { Fair: null };
        case "Poor":
          return { Poor: null };
        default:
          return null;
      }
    },
    []
  );

  const getExperienceLevelFromString = useCallback(
    (value: string): ExperienceLevel | null => {
      switch (value) {
        case "Beginner":
          return { Beginner: null };
        case "Intermediate":
          return { Intermediate: null };
        case "Experienced":
          return { Experienced: null };
        default:
          return null;
      }
    },
    []
  );

  const getHarvestTimelineFromString = useCallback(
    (value: string): HarvestTimeline | null => {
      switch (value) {
        case "Short":
          return { Short: null };
        case "Medium":
          return { Medium: null };
        case "Long":
          return { Long: null };
        default:
          return null;
      }
    },
    []
  );

  const getCultivationMethodFromString = useCallback(
    (value: string): CultivationMethod | null => {
      switch (value) {
        case "Organic":
          return { Organic: null };
        case "Conventional":
          return { Conventional: null };
        case "Hydroponic":
          return { Hydroponic: null };
        default:
          return null;
      }
    },
    []
  );

  const getMarketDistributionOption = useCallback(
    (option: string): MarketDistribution | null => {
      switch (option) {
        case "Local markets":
          return { LocalMarkets: null };
        case "Export buyers":
          return { ExportBuyers: null };
        case "Direct-to-consumer":
          return { DirectToConsumer: null };
        case "Cooperatives":
          return { Cooperatives: null };
        case "Processing industries":
          return { ProcessingIndustries: null };
        case "Contract farming agreements":
          return { ContractFarming: null };
        default:
          return null;
      }
    },
    []
  );

  const isEqualMarketDistribution = useCallback(
    (a: MarketDistribution, b: MarketDistribution): boolean => {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    []
  );

  // Form validation
  const validateStep = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return !!(
            formData.cropType &&
            formData.country &&
            formData.stateProvince &&
            formData.cityDistrict &&
            formData.farmSize &&
            formData.landOwnership &&
            formData.waterSource &&
            formData.accessRoads &&
            formData.fundingRequired &&
            formData.farmPhotos.length >= 3 &&
            formData.farmPhotos.length <= 5
          );
        case 2:
          return !!(
            formData.farmingExperience &&
            formData.harvestTimeline &&
            formData.expectedYield &&
            formData.cultivationMethod &&
            formData.investmentDescription &&
            formData.marketDistribution.length > 0
          );
        case 3:
          return !!(
            formData.expectedMinROI &&
            formData.expectedMaxROI &&
            formData.emergencyContactName &&
            formData.emergencyContactPhone &&
            formData.previousFarmingLoans !== null
          );
        case 4:
          return formData.agreements.every((agreement) => agreement === true);
        default:
          return true;
      }
    },
    [formData]
  );

  // Form handlers
  const handleInputChange = useCallback(
    (field: keyof FormData, value: FormData[keyof FormData]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const handleBudgetChange = useCallback((category: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      budgetAllocation: {
        ...prev.budgetAllocation,
        [category]: value,
      },
    }));
  }, []);

  const handleAgreementChange = useCallback(
    (index: number, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        agreements: prev.agreements.map((agreement, i) =>
          i === index ? checked : agreement
        ),
      }));
    },
    []
  );

  const handleMarketDistributionChange = useCallback(
    (option: string, checked: boolean) => {
      const marketOption = getMarketDistributionOption(option);
      if (!marketOption) return;

      setFormData((prev) => ({
        ...prev,
        marketDistribution: checked
          ? [...prev.marketDistribution, marketOption]
          : prev.marketDistribution.filter(
              (item) => !isEqualMarketDistribution(item, marketOption)
            ),
      }));
    },
    [getMarketDistributionOption, isEqualMarketDistribution]
  );

  // Photo upload handlers
  const handlePhotoUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setFormData((prev) => {
      const currentPhotos = prev.farmPhotos;
      const totalPhotos = currentPhotos.length + newFiles.length;

      if (totalPhotos > 5) {
        setError("Maximum 5 photos allowed");
        return prev;
      }

      return {
        ...prev,
        farmPhotos: [...currentPhotos, ...newFiles],
      };
    });

    setError(null);
  }, []);

  const handleRemovePhoto = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      farmPhotos: prev.farmPhotos.filter((_, i) => i !== index),
    }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;
      handlePhotoUpload(files);
    },
    [handlePhotoUpload]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  }, [currentStep, validateStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  }, [currentStep]);

  const navigateToDashboard = useCallback(
    () => router.push("/farmer/dashboard"),
    [router]
  );

  // Form submission
  const handleSubmit = useCallback(async () => {
    if (!validateStep(4)) {
      setError("Please accept all legal agreements before submitting.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData: CreateInvestmentRequest = {
        farmInfo: {
          farmSize: formData.farmSize,
          country: formData.country,
          gpsCoordinates: formData.gpsCoordinates
            ? [formData.gpsCoordinates]
            : [],
          stateProvince: formData.stateProvince,
          cityDistrict: formData.cityDistrict,
          accessRoads: formData.accessRoads!,
          landOwnership: formData.landOwnership!,
          cropType: formData.cropType!,
          waterSource: formData.waterSource,
          fundingRequired: BigInt(
            parseFloat(formData.fundingRequired) * 1000000
          ),
        },
        experience: {
          farmingExperience: formData.farmingExperience!,
          cultivationMethod: formData.cultivationMethod!,
          harvestTimeline: formData.harvestTimeline!,
          investmentDescription: formData.investmentDescription,
          marketDistribution: formData.marketDistribution,
          expectedYield: formData.expectedYield,
        },
        budget: {
          budgetAllocation: {
            seeds: BigInt(
              Math.round(
                (formData.budgetAllocation.seeds / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            fertilizers: BigInt(
              Math.round(
                (formData.budgetAllocation.fertilizers / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            equipment: BigInt(
              Math.round(
                (formData.budgetAllocation.equipment / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            labor: BigInt(
              Math.round(
                (formData.budgetAllocation.labor / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            infrastructure: BigInt(
              Math.round(
                (formData.budgetAllocation.infrastructure / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            operational: BigInt(
              Math.round(
                (formData.budgetAllocation.operational / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
            insurance: BigInt(
              Math.round(
                (formData.budgetAllocation.insurance / 100) *
                  parseFloat(formData.fundingRequired) *
                  1000000
              )
            ),
          },
          expectedMinROI: BigInt(parseFloat(formData.expectedMinROI)),
          expectedMaxROI: BigInt(parseFloat(formData.expectedMaxROI)),
          hasBusinessBankAccount: formData.hasBusinessBankAccount,
          previousFarmingLoans: formData.previousFarmingLoans
            ? [formData.previousFarmingLoans]
            : [],
          emergencyContactName: formData.emergencyContactName,
          emergencyContactPhone: formData.emergencyContactPhone,
        },
        documents: formData.documents,
        agreements: formData.agreements,
      };

      const result: InvestmentProjectResult = await createInvestmentProject(
        requestData
      );

      if ("Success" in result) {
        setSuccess(true);
        setCurrentStep(5);
        console.log(
          "Investment project created successfully with ID:",
          result.Success
        );
      } else if ("Error" in result) {
        setError(`Submission failed: ${result.Error}`);
      } else if ("FarmerNotVerified" in result) {
        setError(
          "Your farmer profile needs to be verified before creating investment projects."
        );
      } else if ("InvalidData" in result) {
        setError(`Invalid data: ${result.InvalidData}`);
      }
    } catch (err) {
      console.error("Error submitting investment project:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formData, validateStep]);

  return {
    // State
    currentStep,
    loading,
    error,
    success,
    formData,
    fileInputRef,

    // Utility functions
    getCropTypeFromString,
    getLandOwnershipFromString,
    getAccessRoadFromString,
    getExperienceLevelFromString,
    getHarvestTimelineFromString,
    getCultivationMethodFromString,
    getMarketDistributionOption,
    isEqualMarketDistribution,

    // Form handlers
    handleInputChange,
    handleBudgetChange,
    handleAgreementChange,
    handleMarketDistributionChange,
    handlePhotoUpload,
    handleRemovePhoto,
    handleDragOver,
    handleDrop,

    // Navigation
    handleNext,
    handlePrevious,
    navigateToDashboard,

    // Form submission
    handleSubmit,

    // Validation
    validateStep,
  };
};

export type { FormData };
