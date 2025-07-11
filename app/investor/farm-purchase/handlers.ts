import { 
  purchaseNFT
} from "@/service/purchaseService";
import { 
  getInvestmentProjectSummary,
  getPricingInfo
} from "@/service/marketplaceService";
import { 
  PurchaseNFTRequest
} from "@/service/types";
import { 
  getCropTypeString, 
  getStatusString 
} from "@/service/utils";

export interface PurchaseProjectData {
  projectId: number;
  title: string;
  location: string;
  timeline: string;
  cropType: string;
  quantity: number;
  availableNFTs: number;
  nftPrice: number;
  platformFee: number;
  networkFee: number;
  total: number;
  expectedROI: string;
  riskLevel: string;
  harvestPeriod: string;
  yourShare: string;
  status: string;
  priceInICP: number;
}

export interface TransactionData {
  hash: string;
  blockNumber: string;
  network: string;
  totalPaid: string;
  yourShares: string;
  tokenIds: string[];
  remainingAvailable: number;
}

export interface PurchaseCalculation {
  nftPrice: number;
  platformFee: number;
  networkFee: number;
  total: number;
  yourShare: string;
}

export class FarmPurchaseHandlers {
  private projectData: PurchaseProjectData | null = null;
  private transactionData: TransactionData | null = null;
  private isLoading = false;

  async fetchProjectDetails(projectId: number): Promise<PurchaseProjectData> {
    this.isLoading = true;
    
    try {
      // Fetch project summary and pricing info in parallel
      const [projectSummary, pricingInfo] = await Promise.all([
        getInvestmentProjectSummary(BigInt(projectId)),
        getPricingInfo(BigInt(projectId))
      ]);

      if (!projectSummary) {
        throw new Error("Project not found");
      }

      // Extract crop type and other details from the project data
      const project = projectSummary.project;
      const cropType = getCropTypeString(project.farmInfo.cropType);
      const status = getStatusString(project.status);
      
      // Calculate basic pricing
      const basePrice = pricingInfo?.priceInICP || 0.42;
      const platformFeeRate = 0.025; // 2.5%
      const networkFeeAmount = 0.002; // Fixed network fee
      
      const nftPrice = basePrice;
      const platformFee = basePrice * platformFeeRate;
      const networkFee = networkFeeAmount;
      const total = nftPrice + platformFee + networkFee;

      // Calculate investment metrics
      const expectedROI = "18%"; // Base ROI
      const riskLevel = this.calculateRiskLevel(project);
      const harvestPeriod = `${this.getHarvestTimeline(project.experience.harvestTimeline)} months`;
      const yourShare = "1% of harvest"; // Base share for 1 NFT

      this.projectData = {
        projectId,
        title: project.experience.investmentDescription || `${cropType} Farm Project`,
        location: `${project.farmInfo.cityDistrict}, ${project.farmInfo.stateProvince}`,
        timeline: harvestPeriod,
        cropType,
        quantity: 1,
        availableNFTs: Number(pricingInfo?.availableSupply || 57),
        nftPrice,
        platformFee,
        networkFee,
        total,
        expectedROI,
        riskLevel,
        harvestPeriod,
        yourShare,
        status,
        priceInICP: basePrice,
      };

      return this.projectData;
    } catch (error) {
      console.error("Error fetching project details:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async updateQuantity(newQuantity: number): Promise<PurchaseCalculation> {
    if (!this.projectData) {
      throw new Error("Project data not loaded");
    }

    if (newQuantity < 1 || newQuantity > this.projectData.availableNFTs) {
      throw new Error("Invalid quantity");
    }

    // Recalculate pricing based on quantity
    const nftPrice = this.projectData.priceInICP * newQuantity;
    const platformFee = nftPrice * 0.025; // 2.5%
    const networkFee = 0.002; // Fixed network fee
    const total = nftPrice + platformFee + networkFee;
    const yourShare = `${newQuantity}% of harvest`;

    // Update project data
    this.projectData = {
      ...this.projectData,
      quantity: newQuantity,
      nftPrice,
      platformFee,
      total,
      yourShare,
    };

    return {
      nftPrice,
      platformFee,
      networkFee,
      total,
      yourShare,
    };
  }

  async processPurchase(): Promise<TransactionData> {
    if (!this.projectData) {
      throw new Error("Project data not loaded");
    }

    this.isLoading = true;

    try {
      // Prepare purchase request
      const purchaseRequest: PurchaseNFTRequest = {
        investmentId: BigInt(this.projectData.projectId),
        quantity: BigInt(this.projectData.quantity),
        paymentAmount: BigInt(Math.round(this.projectData.total * 1000000)), // Convert to smallest unit
      };

      // Process the purchase
      const result = await purchaseNFT(purchaseRequest);

      if ('Error' in result) {
        throw new Error(result.Error);
      }

      if ('InsufficientPayment' in result) {
        throw new Error(`Insufficient payment: provided ${result.InsufficientPayment.provided}, required ${result.InsufficientPayment.required}`);
      }

      if ('InsufficientSupply' in result) {
        throw new Error(`Insufficient supply: requested ${result.InsufficientSupply.requested}, available ${result.InsufficientSupply.available}`);
      }

      if ('InvalidQuantity' in result) {
        throw new Error("Invalid quantity specified");
      }

      if ('ProjectNotFound' in result) {
        throw new Error("Project not found");
      }

      // Handle successful purchase
      if ('Success' in result) {
        const successData = result.Success;
        
        // Generate transaction hash (mock for now)
        const transactionHash = this.generateTransactionHash();
        const blockNumber = this.generateBlockNumber();

        this.transactionData = {
          hash: transactionHash,
          blockNumber,
          network: "Internet Computer Protocol",
          totalPaid: `${this.projectData.total} ICP`,
          yourShares: this.projectData.yourShare,
          tokenIds: successData.tokenIds.map(id => id.toString()),
          remainingAvailable: Number(successData.remainingAvailable),
        };

        return this.transactionData;
      }

      throw new Error("Unexpected purchase result");
    } catch (error) {
      console.error("Error processing purchase:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async simulateWalletConnection(): Promise<{ address: string; balance: number }> {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      address: "0x7d3a...4819",
      balance: 5.64,
    };
  }

  async trackTransactionStatus(_transactionHash: string): Promise<{
    status: 'pending' | 'confirming' | 'completed' | 'failed';
    confirmations: number;
    estimatedTime: string;
  }> {
    // Mock transaction tracking
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'completed',
      confirmations: 12,
      estimatedTime: '2-3 minutes',
    };
  }

  private calculateRiskLevel(_project: unknown): string {
    // Mock risk calculation based on project data
    // In real implementation, this would analyze various factors
    return "Low";
  }

  private getHarvestTimeline(timeline: unknown): number {
    // Extract harvest timeline from timeline variant
    if (timeline && typeof timeline === 'object') {
      if ('Short' in timeline) return 3;
      if ('Medium' in timeline) return 6;
      if ('Long' in timeline) return 12;
    }
    return 8; // Default
  }

  private generateTransactionHash(): string {
    // Generate a mock transaction hash
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash.slice(0, 10) + '...' + hash.slice(-8);
  }

  private generateBlockNumber(): string {
    // Generate a mock block number
    return (1000000 + Math.floor(Math.random() * 500000)).toLocaleString();
  }

  // Getters for component state
  getProjectData(): PurchaseProjectData | null {
    return this.projectData;
  }

  getTransactionData(): TransactionData | null {
    return this.transactionData;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }
}

// Export a singleton instance
export const purchaseHandlers = new FarmPurchaseHandlers(); 