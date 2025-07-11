import { 
  getDetailedPortfolio
} from "@/service/portfolioService";
import { 
  getInvestmentProjectSummary
} from "@/service/marketplaceService";
import { 
  getInvestmentProject
} from "@/service/investmentProjectService";
import { 
  getCropTypeString, 
  getStatusString 
} from "@/service/utils";
import { 
  InvestmentProject
} from "@/service/types";
import {
  getFarmPhotos,
  getWeatherData,
  getFarmActivities,
  WeatherData,
  FarmActivity,
  FarmPhoto
} from "@/service/farmerService";
import {
  getVerificationTracker,
  transformVerificationStepsToActivities
} from "@/service/verificationService";

export interface ProjectTrackingData {
  projectId: number;
  title: string;
  location: string;
  status: string;
  statusColor: string;
  completionPercentage: number;
  currentStage: string;
  expectedYield: string;
  yieldProgress: string;
  estimatedValue: string;
  valueChange: string;
  cropType: string;
  farmSize: string;
  harvestTimeline: string;
  roi: string;
  investmentAmount: number;
  currentValue: number;
  nftTokenIds: bigint[];
}

export interface GrowthTimelineStage {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface FinancialProjection {
  totalInvestment: number;
  projectedRevenue: number;
  projectedProfit: number;
  roi: number;
  payoutDate: string;
  marketPrice: number;
  priceChange: number;
}

export class FarmTrackingHandlers {
  private projectData: ProjectTrackingData | null = null;
  private isLoading = false;
  private error: string | null = null;

  async fetchProjectTracking(projectId: number): Promise<ProjectTrackingData> {
    this.isLoading = true;
    this.error = null;

    try {
      const [portfolio, projectSummary] = await Promise.all([
        getDetailedPortfolio(),
        getInvestmentProjectSummary(BigInt(projectId))
      ]);

      if (!projectSummary) {
        throw new Error("Project not found");
      }

      const project = projectSummary.project;
      const investment = portfolio?.investments.find(
        inv => Number(inv.investment.investmentId) === projectId
      );

      if (!investment) {
        throw new Error("Investment not found in portfolio");
      }

      const cropType = getCropTypeString(project.farmInfo.cropType);
      const status = getStatusString(project.status);
      const completionPercentage = this.calculateCompletionPercentage(status);
      const currentStage = this.getCurrentStage(status, completionPercentage);

      const investmentAmount = Number(investment.investment.investmentAmount) / 1000000;
      const currentValue = Number(investment.investment.currentValue) / 1000000;
      const valueChange = ((currentValue - investmentAmount) / investmentAmount) * 100;

      this.projectData = {
        projectId,
        title: project.experience.investmentDescription || `${cropType} Farm Project`,
        location: `${project.farmInfo.cityDistrict}, ${project.farmInfo.stateProvince}`,
        status,
        statusColor: this.getStatusColor(status),
        completionPercentage,
        currentStage,
        expectedYield: project.experience.expectedYield,
        yieldProgress: "+4% vs projection",
        estimatedValue: `IDR ${currentValue.toLocaleString()}`,
        valueChange: `${valueChange > 0 ? '+' : ''}${valueChange.toFixed(1)}% YTD`,
        cropType,
        farmSize: project.farmInfo.farmSize,
        harvestTimeline: this.getHarvestTimeline(project.experience.harvestTimeline),
        roi: `${investment.roiPercentage.toFixed(1)}%`,
        investmentAmount,
        currentValue,
        nftTokenIds: investment.investment.nftTokenIds,
      };

      return this.projectData;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to fetch project tracking';
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async fetchGrowthTimeline(projectId: number): Promise<GrowthTimelineStage[]> {
    try {
      const project = await getInvestmentProject(BigInt(projectId));
      if (!project) {
        throw new Error("Project not found");
      }

      const status = getStatusString(project.status);
      const completionPercentage = this.calculateCompletionPercentage(status);

      return this.generateGrowthTimeline(completionPercentage, project);
    } catch (error) {
      console.error('Error fetching growth timeline:', error);
      return this.getDefaultGrowthTimeline();
    }
  }

  async fetchWeatherData(location?: string): Promise<WeatherData> {
    try {
      return await getWeatherData(location);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return {
        temperature: 28,
        humidity: 75,
        rainfall: 12,
        condition: "Partly Cloudy",
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    }
  }

  async fetchFarmActivities(projectId: number): Promise<FarmActivity[]> {
    try {
      const [activities, verificationTracker] = await Promise.all([
        getFarmActivities(projectId),
        getVerificationTracker(BigInt(projectId))
      ]);

      // Combine regular activities with verification activities
      const verificationActivities = verificationTracker ? 
        transformVerificationStepsToActivities(verificationTracker.steps) : [];

      return [...activities, ...verificationActivities.map(step => ({
        id: step.id + 100, // Offset to avoid ID conflicts
        date: new Date().toISOString().split('T')[0],
        activity: step.title,
        description: step.description,
        status: step.status === 'completed' ? 'completed' as const : 
                step.status === 'in-progress' ? 'scheduled' as const : 'scheduled' as const
      }))];
    } catch (error) {
      console.error('Error fetching farm activities:', error);
      // Return fallback activities
      return await getFarmActivities(projectId);
    }
  }

  async fetchFarmPhotos(projectId: number): Promise<FarmPhoto[]> {
    try {
      return await getFarmPhotos(projectId);
    } catch (error) {
      console.error('Error fetching farm photos:', error);
      return [
        {
          id: 1,
          date: "June 2, 2024",
          description: "Early flowering stage"
        },
        {
          id: 2,
          date: "May 15, 2024",
          description: "Healthy plant growth"
        },
        {
          id: 3,
          date: "June 8, 2024",
          description: "Full bloom development"
        }
      ];
    }
  }

  async fetchFinancialProjection(projectId: number): Promise<FinancialProjection> {
    try {
      const portfolio = await getDetailedPortfolio();
      const investment = portfolio?.investments.find(
        inv => Number(inv.investment.investmentId) === projectId
      );

      if (!investment) {
        throw new Error("Investment not found");
      }

      const totalInvestment = Number(investment.investment.investmentAmount) / 1000000;
      const currentValue = Number(investment.investment.currentValue) / 1000000;
      const projectedRevenue = totalInvestment * 1.25;
      const projectedProfit = projectedRevenue - totalInvestment;
      const roi = (projectedProfit / totalInvestment) * 100;

      return {
        totalInvestment,
        projectedRevenue,
        projectedProfit,
        roi,
        payoutDate: "2024-09-15",
        marketPrice: currentValue,
        priceChange: 2.5
      };
    } catch (error) {
      console.error('Error fetching financial projection:', error);
      throw error;
    }
  }

  private calculateCompletionPercentage(status: string): number {
    switch (status) {
      case 'Active':
        return 65;
      case 'Approved':
        return 45;
      case 'Completed':
        return 100;
      case 'In Verification':
        return 25;
      default:
        return 0;
    }
  }

  private getCurrentStage(status: string, completionPercentage: number): string {
    if (completionPercentage >= 100) return 'Harvest Ready';
    if (completionPercentage >= 80) return 'Maturation';
    if (completionPercentage >= 65) return 'Flowering';
    if (completionPercentage >= 45) return 'Fruit Development';
    if (completionPercentage >= 25) return 'Vegetative Growth';
    return 'Germination';
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Approved':
        return 'text-blue-600';
      case 'Completed':
        return 'text-purple-600';
      case 'In Verification':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }

  private getHarvestTimeline(timeline: unknown): string {
    if (timeline && typeof timeline === 'object') {
      if ('Short' in timeline) return '2-3 months';
      if ('Medium' in timeline) return '4-6 months';
      if ('Long' in timeline) return '6+ months';
    }
    return '4-6 months';
  }

  private generateGrowthTimeline(completionPercentage: number, _project: InvestmentProject): GrowthTimelineStage[] {
    const stages = [
      {
        id: 1,
        title: "Planting",
        description: "Seeds planted successfully",
        date: "2024-01-15",
        status: 'completed' as const
      },
      {
        id: 2,
        title: "Germination",
        description: "First shoots emerged",
        date: "2024-02-01",
        status: completionPercentage >= 20 ? 'completed' as const : 'upcoming' as const
      },
      {
        id: 3,
        title: "Vegetative Growth",
        description: "Healthy leaf development observed",
        date: "2024-03-15",
        status: completionPercentage >= 40 ? 'completed' as const : 
               completionPercentage >= 20 ? 'current' as const : 'upcoming' as const
      },
      {
        id: 4,
        title: "Flowering",
        description: "Flowering stage, good pollination expected",
        date: "2024-05-01",
        status: completionPercentage >= 60 ? 'completed' as const : 
               completionPercentage >= 40 ? 'current' as const : 'upcoming' as const
      },
      {
        id: 5,
        title: "Fruit Development",
        description: "Fruit formation in progress",
        date: "2024-06-15",
        status: completionPercentage >= 80 ? 'completed' as const : 
               completionPercentage >= 60 ? 'current' as const : 'upcoming' as const
      },
      {
        id: 6,
        title: "Maturation",
        description: "Final ripening phase",
        date: "2024-08-01",
        status: completionPercentage >= 95 ? 'completed' as const : 
               completionPercentage >= 80 ? 'current' as const : 'upcoming' as const
      },
      {
        id: 7,
        title: "Harvest",
        description: "Ready for harvest",
        date: "2024-09-15",
        status: completionPercentage >= 100 ? 'completed' as const : 
               completionPercentage >= 95 ? 'current' as const : 'upcoming' as const
      }
    ];

    return stages;
  }

  private getDefaultGrowthTimeline(): GrowthTimelineStage[] {
    return [
      {
        id: 1,
        title: "Planting",
        description: "Seeds planted successfully",
        date: "2024-01-15",
        status: "completed"
      },
      {
        id: 2,
        title: "Germination",
        description: "First shoots emerged",
        date: "2024-02-01",
        status: "completed"
      },
      {
        id: 3,
        title: "Vegetative Growth",
        description: "Healthy leaf development observed",
        date: "2024-03-15",
        status: "completed"
      },
      {
        id: 4,
        title: "Flowering",
        description: "Flowering stage, good pollination expected",
        date: "2024-05-01",
        status: "current"
      },
      {
        id: 5,
        title: "Fruit Development",
        description: "Fruit formation expected",
        date: "2024-06-15",
        status: "upcoming"
      },
      {
        id: 6,
        title: "Maturation",
        description: "Final ripening phase",
        date: "2024-08-01",
        status: "upcoming"
      },
      {
        id: 7,
        title: "Harvest",
        description: "Ready for harvest",
        date: "2024-09-15",
        status: "upcoming"
      }
    ];
  }

  async saveToFavorites(projectId: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Project ${projectId} saved to favorites`);
  }

  async generateAnalytics(projectId: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Analytics generated for project ${projectId}`);
  }

  getProjectData(): ProjectTrackingData | null {
    return this.projectData;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  getError(): string | null {
    return this.error;
  }
}

export const farmTrackingHandlers = new FarmTrackingHandlers(); 