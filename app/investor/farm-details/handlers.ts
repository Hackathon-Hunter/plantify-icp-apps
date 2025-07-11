import { 
  getInvestmentProjectSummary
} from '@/service/marketplaceService';
import { 
  InvestmentProject,
  NFTCollection,
  BudgetAllocation,
  HarvestTimeline
} from '@/service/types';
import { 
  getCropTypeString, 
  getStatusString 
} from '@/service/utils';

// Interface for transformed project data suitable for UI
export interface ProjectDisplayData {
  id: string;
  title: string;
  location: string;
  crop: string;
  farmer: string;
  area: string;
  status: string;
  tags: string[];
  description: string;
  totalValue: string;
  minInvestment: string;
  currentPrice: string;
  priceChange: string;
  funded: number;
  investors: number;
  timeline: string;
  expectedROI: string;
  fundingProgress: {
    current: number;
    target: number;
    percentage: number;
  };
  breakdown: Record<string, { amount: number; percentage: number }>;
  milestones: Array<{ title: string; date: string; status: string }>;
  risks: Array<{ factor: string; level: string; description: string }>;
}

// Investment calculation interface
export interface InvestmentCalculation {
  amount: number;
  estimatedReturn: number;
  profit: number;
  platformFee: number;
  netReturn: number;
}

export class FarmDetailsHandlers {
  
  /**
   * Fetch complete project details from the service
   */
  async fetchProjectDetails(projectId: string): Promise<ProjectDisplayData> {
    try {
      const investmentId = BigInt(projectId);
      const summary = await getInvestmentProjectSummary(investmentId);
      
      if (!summary || !summary.project) {
        throw new Error('Project not found');
      }

      return this.transformProjectData(summary.project, summary.nftCollection, summary.pricing);
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw new Error('Failed to load project details');
    }
  }

  /**
   * Calculate investment returns and fees
   */
  calculateInvestment(amount: number): InvestmentCalculation {
    const baseROI = 0.18; // 18% expected ROI
    const platformFeeRate = 0.10; // 10% platform fee
    
    const grossReturn = amount * (1 + baseROI);
    const platformFee = grossReturn * platformFeeRate;
    const netReturn = grossReturn - platformFee;
    const profit = netReturn - amount;

    return {
      amount,
      estimatedReturn: grossReturn,
      profit,
      platformFee,
      netReturn
    };
  }

  /**
   * Save project to user favorites (placeholder)
   */
  async saveProject(projectId: string): Promise<void> {
    try {
      // TODO: Implement actual save functionality
      console.log('Saving project to favorites:', projectId);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error saving project:', error);
      throw new Error('Failed to save project');
    }
  }

  /**
   * Generate shareable project URL
   */
  async shareProject(projectId: string): Promise<string> {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const shareUrl = `${baseUrl}/investor/farm-details?projectId=${projectId}`;
      
      // Copy to clipboard if available
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      
      return shareUrl;
    } catch (error) {
      console.error('Error sharing project:', error);
      throw new Error('Failed to generate share link');
    }
  }

  /**
   * Transform raw project data into UI-friendly format
   */
  private transformProjectData(
    project: InvestmentProject, 
    nftCollections: NFTCollection[], 
    pricing: unknown[]
  ): ProjectDisplayData {
    const cropType = getCropTypeString(project.farmInfo.cropType);
    const status = getStatusString(project.status);
    const nft = nftCollections[0];
    const priceInfo = pricing[0] as { priceInICP?: number };

    // Calculate funding progress
    const fundingProgress = this.calculateFundingProgress(project, nft, priceInfo);

    // Transform budget allocation for breakdown
    const breakdown = this.transformBudgetBreakdown(project.budget.budgetAllocation);

    // Generate milestones from project data
    const milestones = this.generateMilestones(project);

    // Standard risk assessment
    const risks = this.generateRiskAssessment(cropType);

    return {
      id: project.id.toString(),
      title: project.experience.investmentDescription || `${cropType} Farm Project`,
      location: `${project.farmInfo.cityDistrict}, ${project.farmInfo.stateProvince}`,
      crop: cropType,
      farmer: "Farm Owner", // TODO: Get from farmer profile
      area: project.farmInfo.farmSize,
      status: status,
      tags: this.generateTags(project),
      description: project.experience.investmentDescription || `Sustainable ${cropType.toLowerCase()} farming project`,
      totalValue: `${(Number(project.farmInfo.fundingRequired) / 1000000).toFixed(1)} ICP`,
      minInvestment: "0.1 ICP",
      currentPrice: `${priceInfo?.priceInICP || 0.5} ICP`,
      priceChange: "+2%", // TODO: Calculate actual price change
      funded: fundingProgress.percentage,
      investors: Number(nft?.soldSupply || 0),
      timeline: this.getTimelineString(project.experience.harvestTimeline),
      expectedROI: `+${Number(project.budget.expectedMinROI)}%`,
      fundingProgress,
      breakdown,
      milestones,
      risks
    };
  }

  /**
   * Calculate funding progress from project and NFT data
   */
  private calculateFundingProgress(project: InvestmentProject, nft?: NFTCollection, pricing?: unknown) {
    const target = Number(project.farmInfo.fundingRequired) / 1000000;
    
    if (nft && pricing) {
      const soldAmount = Number(nft.soldSupply * nft.nftPrice) / 1000000;
      const percentage = Math.round((Number(nft.soldSupply) / Number(nft.totalSupply)) * 100);
      
      return {
        current: soldAmount,
        target,
        percentage: Math.min(percentage, 100)
      };
    }

    // Default values if no NFT data
    return {
      current: target * 0.68, // 68% funded as example
      target,
      percentage: 68
    };
  }

  /**
   * Transform budget allocation into breakdown format
   */
  private transformBudgetBreakdown(allocation: BudgetAllocation) {
    const total = Object.values(allocation).reduce((sum: number, val: unknown) => sum + Number(val), 0);
    
    return {
      seeds: {
        amount: Number(allocation.seeds) / 1000000,
        percentage: Math.round((Number(allocation.seeds) / total) * 100)
      },
      equipment: {
        amount: Number(allocation.equipment) / 1000000,
        percentage: Math.round((Number(allocation.equipment) / total) * 100)
      },
      labor: {
        amount: Number(allocation.labor) / 1000000,
        percentage: Math.round((Number(allocation.labor) / total) * 100)
      },
      infrastructure: {
        amount: Number(allocation.infrastructure) / 1000000,
        percentage: Math.round((Number(allocation.infrastructure) / total) * 100)
      },
      operational: {
        amount: Number(allocation.operational) / 1000000,
        percentage: Math.round((Number(allocation.operational) / total) * 100)
      }
    };
  }

  /**
   * Generate project milestones
   */
  private generateMilestones(project: InvestmentProject) {
    const createdDate = new Date(Number(project.createdAt)).toLocaleDateString();
    const lastUpdated = new Date(Number(project.lastUpdated)).toLocaleDateString();
    
    return [
      { title: "Project Created", date: createdDate, status: "completed" },
      { title: "Document Verification", date: lastUpdated, status: "completed" },
      { title: "Funding Phase", date: "TBD", status: "current" },
      { title: "Implementation", date: "TBD", status: "upcoming" },
      { title: "Harvest & Returns", date: "TBD", status: "upcoming" }
    ];
  }

  /**
   * Generate risk assessment based on crop type
   */
  private generateRiskAssessment(cropType: string) {
    const baseRisks = [
      { factor: "Weather Risk", level: "Low", description: "Stable climate conditions" },
      { factor: "Market Risk", level: "Medium", description: `Fluctuating ${cropType.toLowerCase()} prices` },
      { factor: "Operational Risk", level: "Low", description: "Experienced farming practices" }
    ];

    // Add crop-specific risks
    if (cropType === "Coffee") {
      baseRisks.push({ 
        factor: "Disease Risk", 
        level: "Medium", 
        description: "Coffee leaf rust vulnerability" 
      });
    }

    return baseRisks;
  }

  /**
   * Generate project tags
   */
  private generateTags(project: InvestmentProject): string[] {
    const tags = [];
    
    if ("Organic" in project.experience.cultivationMethod) {
      tags.push("Organic");
    }
    
    if ("Experienced" in project.experience.farmingExperience) {
      tags.push("Experienced Farmer");
    }

    tags.push("Verified");
    
    return tags;
  }

  /**
   * Convert harvest timeline to readable string
   */
  private getTimelineString(timeline: HarvestTimeline): string {
    if ("Short" in timeline) return "2-3 months";
    if ("Medium" in timeline) return "4-6 months"; 
    if ("Long" in timeline) return "6+ months";
    return "TBD";
  }
}

// Export singleton instance
export const farmDetailsHandlers = new FarmDetailsHandlers();

// Export hook for React components
export const useFarmDetailsHandlers = () => farmDetailsHandlers; 