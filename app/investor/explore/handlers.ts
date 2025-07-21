import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getInvestmentOpportunities,
  searchInvestmentProjects,
  getMarketplaceOverview,
} from '@/service/marketplaceService';
import { InvestmentProject, CropType } from '@/service/types';
import { getCropTypeString, getStatusString } from '@/service/utils';

// Transformed types for UI
export interface MarketplaceProject {
  id: number;
  title: string;
  location: string;
  crop: string;
  area: string;
  minInvestment: string;
  totalValue: string;
  funded: number;
  investors: number;
  timeline: string;
  roi: string;
  status: string;
  icon: string;
  tags: string[];
  rawProject: InvestmentProject;
}

export interface MarketplaceStats {
  activeProjects: number;
  totalInvestors: number;
  averageROI: string;
  averageMonths: string;
}

export interface MarketplaceFilters {
  searchQuery: string;
  cropType: string;
  sortBy: string;
}

// Transform raw project data to UI format
const transformProjectToUI = (project: InvestmentProject): MarketplaceProject => {
  const cropType = getCropTypeString(project.farmInfo.cropType);
  const status = getStatusString(project.status);
  const location = `${project.farmInfo.cityDistrict}, ${project.farmInfo.stateProvince}`;
  
  // Calculate funding percentage (mock for now)
  const funded = Math.floor(Math.random() * 90) + 10;
  const investors = Math.floor(Math.random() * 50) + 5;
  
  // Generate timeline based on harvest timeline
  const timelineMap = {
    'Short': '3-4 months',
    'Medium': '6-8 months', 
    'Long': '12-18 months'
  };
  
  let timeline = '6-8 months';
  if ('Short' in project.experience.harvestTimeline) timeline = timelineMap.Short;
  else if ('Medium' in project.experience.harvestTimeline) timeline = timelineMap.Medium;
  else if ('Long' in project.experience.harvestTimeline) timeline = timelineMap.Long;
  
  // Generate ROI range
  const minROI = Number(project.budget.expectedMinROI);
  const maxROI = Number(project.budget.expectedMaxROI);
  const roi = `+${minROI}-${maxROI}%`;
  
  // Convert funding to ICP format
  const fundingInICP = Number(project.farmInfo.fundingRequired) / 100000000; // Convert to ICP
  const minInvestment = `${(fundingInICP * 0.1).toFixed(2)} ICP`;
  const totalValue = `${fundingInICP.toFixed(2)} ICP`;
  
  // Generate crop icon
  const cropIcons: { [key: string]: string } = {
    'Rice': '🌾',
    'Coffee': '☕',
    'Vegetables': '🥕',
    'Fruits': '🍎',
    'Corn': '🌽',
    'Wheat': '🌾',
    'Soybean': '🌱',
    'Cocoa': '🍫',
    'Tea': '🍵',
    'Spices': '🌶️',
    'Herbs': '🌿',
    'Nuts': '🥜',
  };
  
  const icon = cropIcons[cropType] || '🌱';
  
  // Generate tags based on cultivation method and experience
  const tags: string[] = [];
  if ('Organic' in project.experience.cultivationMethod) tags.push('Organic');
  if ('Experienced' in project.experience.farmingExperience) tags.push('Premium');
  if (status === 'Active') tags.push('Quality');
  
  return {
    id: Number(project.id),
    title: `${cropType} Farm #${String(project.id).padStart(3, '0')}`,
    location,
    crop: cropType,
    area: `${fundingInICP.toFixed(1)} ICP`,
    minInvestment,
    totalValue,
    funded,
    investors,
    timeline,
    roi,
    status: status === 'Active' ? 'Active' : 'Pending',
    icon,
    tags,
    rawProject: project,
  };
};

// Convert UI filter to service filter
const convertCropFilter = (uiFilter: string): CropType | undefined => {
  const cropMapping: { [key: string]: CropType } = {
    'Rice': { Rice: null },
    'Coffee': { Coffee: null },
    'Fruits': { Fruits: null },
    'Vegetables': { Vegetables: null },
    'Corn': { Corn: null },
  };
  
  return cropMapping[uiFilter];
};

export const useMarketplaceHandlers = () => {
  const router = useRouter();
  
  // State
  const [projects, setProjects] = useState<MarketplaceProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<MarketplaceProject[]>([]);
  const [stats, setStats] = useState<MarketplaceStats>({
    activeProjects: 0,
    totalInvestors: 0,
    averageROI: '0%',
    averageMonths: '0',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Farms');
  const [sortBy, setSortBy] = useState('Recently Listed');

  // Load initial data
  const loadMarketplaceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [opportunitiesData, overviewData] = await Promise.all([
        getInvestmentOpportunities(),
        getMarketplaceOverview(),
      ]);
      
      // Transform projects
      const transformedProjects = opportunitiesData.map(transformProjectToUI);
      setProjects(transformedProjects);
      
      // Set stats
      setStats({
        activeProjects: Number(overviewData.activeProjects),
        totalInvestors: 156, // Mock for now - this data would come from investor service
        averageROI: `${overviewData.averageROI}%`,
        averageMonths: '8.5', // Mock for now - this data would come from project analysis
      });
      
    } catch (err) {
      console.error('Error loading marketplace data:', err);
      setError('Failed to load marketplace data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search and filter projects
  const searchProjects = useCallback(async (
    query: string,
    cropFilter: string,
    sortOption: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let searchResults: InvestmentProject[];
      
      if (query || cropFilter !== 'All Farms') {
        // Use search API with filters
        const cropType = convertCropFilter(cropFilter);
        searchResults = await searchInvestmentProjects(
          cropType,
          query || undefined,
          undefined,
          undefined,
          { Active: null } // Only active projects in marketplace
        );
      } else {
        // Get all opportunities
        searchResults = await getInvestmentOpportunities();
      }
      
      // Transform and sort
      let transformedResults = searchResults.map(transformProjectToUI);
      
      // Apply text search on transformed data
      if (query) {
        const lowerQuery = query.toLowerCase();
        transformedResults = transformedResults.filter(project =>
          project.title.toLowerCase().includes(lowerQuery) ||
          project.location.toLowerCase().includes(lowerQuery) ||
          project.crop.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Apply sorting
      switch (sortOption) {
        case 'Highest ROI':
          transformedResults.sort((a, b) => {
            const aROI = parseInt(a.roi.replace(/[^\d]/g, ''));
            const bROI = parseInt(b.roi.replace(/[^\d]/g, ''));
            return bROI - aROI;
          });
          break;
        case 'Most Funded':
          transformedResults.sort((a, b) => b.funded - a.funded);
          break;
        case 'Lowest Investment':
          transformedResults.sort((a, b) => {
            const aInvestment = parseFloat(a.minInvestment.replace(/[^\d.]/g, ''));
            const bInvestment = parseFloat(b.minInvestment.replace(/[^\d.]/g, ''));
            return aInvestment - bInvestment;
          });
          break;
        case 'Recently Listed':
        default:
          transformedResults.sort((a, b) => 
            Number(b.rawProject.createdAt) - Number(a.rawProject.createdAt)
          );
          break;
      }
      
      setFilteredProjects(transformedResults);
      
    } catch (err) {
      console.error('Error searching projects:', err);
      setError('Failed to search projects');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    searchProjects(searchQuery, selectedFilter, sortBy);
  }, [searchQuery, selectedFilter, sortBy, searchProjects]);

  // Load data on mount
  useEffect(() => {
    loadMarketplaceData();
  }, [loadMarketplaceData]);

  // Navigation handlers
  const navigateToDetails = useCallback((projectId: number) => {
    router.push(`/investor/farm-details?projectId=${projectId}`);
  }, [router]);

  const navigateToPurchase = useCallback((projectId: number) => {
    router.push(`/investor/farm-purchase?projectId=${projectId}`);
  }, [router]);

  // Action handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilter('All Farms');
    setSortBy('Recently Listed');
  }, []);

  const handleLoadMore = useCallback(async () => {
    // TODO: Implement pagination
    console.log('Load more projects');
  }, []);

  return {
    // State
    projects: filteredProjects.length > 0 ? filteredProjects : projects,
    stats,
    isLoading,
    error,
    
    // Filter state
    searchQuery,
    selectedFilter,
    sortBy,
    
    // Handlers
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handleClearFilters,
    handleLoadMore,
    navigateToDetails,
    navigateToPurchase,
    
    // Actions
    refreshData: loadMarketplaceData,
  };
}; 