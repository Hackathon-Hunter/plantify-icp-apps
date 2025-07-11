import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  distributeProfits,
  getProjectsReadyForDistribution,
  getDistributionHistory,
  uploadProfitDocuments,
  type ProfitDistributionData,
  type ProfitDistributionResult,
  type ProjectProfitSummary,
  type DistributionHistory,
} from '@/service/profitDistributionService';

interface ProjectData {
  investmentId: number;
  name: string;
  crop: string;
  location: string;
  area: string;
  totalInvestors: number;
  nftsIssued: number;
  funding: number;
  lastUpdate: string;
}

interface Milestone {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProfitBreakdown {
  revenue: number;
  costs: number;
  grossProfit: number;
  platformFee: number;
  netProfit: number;
  profitMargin: string;
}

const mockProjectData: ProjectData = {
  investmentId: 1,
  name: "Organic Rice Farm Malang",
  crop: "Rice",
  location: "Batu, Malang, East Java",
  area: "2.5 hectares",
  totalInvestors: 12,
  nftsIssued: 60,
  funding: 4200,
  lastUpdate: "2 hours ago",
};

const mockMilestones: Milestone[] = [
  { title: "Harvest Completion", date: "2025-01-10", status: "completed" },
  { title: "Sales & Revenue Collection", date: "2025-01-12", status: "completed" },
  { title: "Cost Calculation", date: "", status: "current" },
  { title: "Profit Distribution", date: "", status: "pending" },
];

const requiredDocuments = [
  "Sales receipts/invoices",
  "Harvest quantity report",
  "Market price verification",
  "Operational cost breakdown",
];

export const useProfitDistribution = () => {
  // State management
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState("");
  const [operationalCosts, setOperationalCosts] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectProfitSummary[]>([]);
  const [distributionHistory, setDistributionHistory] = useState<DistributionHistory[]>([]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projects, history] = await Promise.all([
          getProjectsReadyForDistribution(),
          getDistributionHistory(),
        ]);
        setProjectsData(projects);
        setDistributionHistory(history);
      } catch (err) {
        setError('Failed to load project data');
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, []);

  // Computed values
  const profitBreakdown = useMemo((): ProfitBreakdown => {
    const revenue = parseFloat(totalRevenue) || 0;
    const costs = parseFloat(operationalCosts) || 0;
    const grossProfit = revenue - costs;
    const platformFee = grossProfit * 0.1;
    const netProfit = grossProfit - platformFee;
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : "0";

    return {
      revenue,
      costs,
      grossProfit,
      platformFee,
      netProfit,
      profitMargin,
    };
  }, [totalRevenue, operationalCosts]);

  // Form validation
  const isFormValid = useMemo(() => {
    return profitBreakdown.revenue > 0 && profitBreakdown.costs >= 0 && profitBreakdown.netProfit > 0;
  }, [profitBreakdown]);

  // Handlers
  const handleShowTransferModal = useCallback(() => {
    setShowTransferModal(true);
  }, []);

  const handleCloseTransferModal = useCallback(() => {
    setShowTransferModal(false);
  }, []);

  const handleRevenueChange = useCallback((value: string) => {
    setTotalRevenue(value);
  }, []);

  const handleCostsChange = useCallback((value: string) => {
    setOperationalCosts(value);
  }, []);

  const handleNotesChange = useCallback((value: string) => {
    setAdditionalNotes(value);
  }, []);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleTransferProfit = useCallback(async () => {
    if (!isFormValid) return;

    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Upload documents first if any
      if (uploadedFiles.length > 0) {
        const uploadResult = await uploadProfitDocuments(mockProjectData.investmentId, uploadedFiles);
        if (!uploadResult.success) {
          throw new Error('Failed to upload documents');
        }
      }

      // Prepare profit distribution data
      const distributionData: ProfitDistributionData = {
        investmentId: mockProjectData.investmentId,
        totalRevenue: profitBreakdown.revenue,
        operationalCosts: profitBreakdown.costs,
        grossProfit: profitBreakdown.grossProfit,
        platformFee: profitBreakdown.platformFee,
        netProfit: profitBreakdown.netProfit,
        profitMargin: parseFloat(profitBreakdown.profitMargin),
        additionalNotes,
        documents: uploadedFiles,
      };

      // Distribute profits
      const result: ProfitDistributionResult = await distributeProfits(distributionData);

      if ('Success' in result) {
        setSuccessMessage(
          `Successfully distributed $${result.Success.totalDistributed.toFixed(2)} to ${result.Success.investorsCount} investors!`
        );
        
        // Reset form after successful transfer
        setTotalRevenue("");
        setOperationalCosts("");
        setAdditionalNotes("");
        setUploadedFiles([]);
        setShowTransferModal(false);

        // Reload data to show updated information
        const [projects, history] = await Promise.all([
          getProjectsReadyForDistribution(),
          getDistributionHistory(),
        ]);
        setProjectsData(projects);
        setDistributionHistory(history);
      } else if ('Error' in result) {
        setError(`Distribution failed: ${result.Error}`);
      } else if ('InsufficientFunds' in result) {
        setError(`Insufficient funds: Required $${result.InsufficientFunds.required}, Available $${result.InsufficientFunds.available}`);
      } else if ('InvalidProject' in result) {
        setError(`Invalid project: ${result.InvalidProject}`);
      }
    } catch (err) {
      console.error("Error transferring profit:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [isFormValid, profitBreakdown, additionalNotes, uploadedFiles]);

  const handleCalculateProfits = useCallback(() => {
    // This could trigger a calculation modal or auto-fill based on project data
    console.log("Calculate profits for project:", mockProjectData.name);
  }, []);

  const handleTransferAllPending = useCallback(() => {
    // Handle transfer of all pending profits
    console.log("Transfer all pending profits");
    handleShowTransferModal();
  }, [handleShowTransferModal]);

  return {
    // State
    showTransferModal,
    totalRevenue,
    operationalCosts,
    additionalNotes,
    isProcessing,
    uploadedFiles,
    error,
    successMessage,
    projectsData,
    distributionHistory,

    // Computed values
    profitBreakdown,
    isFormValid,

    // Static data (keep for backward compatibility)
    projectData: mockProjectData,
    milestones: mockMilestones,
    requiredDocuments,

    // Handlers
    handleShowTransferModal,
    handleCloseTransferModal,
    handleRevenueChange,
    handleCostsChange,
    handleNotesChange,
    handleFileUpload,
    handleRemoveFile,
    handleTransferProfit,
    handleCalculateProfits,
    handleTransferAllPending,
    setError,
    setSuccessMessage,
  };
};

export type { ProjectData, Milestone, ProfitBreakdown }; 