'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  TrendingUp,
  DollarSign,
  Clock,
  Sprout,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Project = {
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
};

const InvestorMarketplace = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Farms");
  const [sortBy, setSortBy] = useState("Recently Listed");

  const navigateToDetails = () => router.push('/investor/farm-details');
  const navigateToPurchase = () => router.push('/investor/farm-purchase');
  // const navigateToTracking = () => router.push('/investor/farm-tracking');

  const projects: Project[] = [
    {
      id: 1,
      title: "Apple Orchard #001",
      location: "Batu, Malang, East Java",
      crop: "Apple",
      area: "2.5 ICP",
      minInvestment: "0.1 ICP",
      totalValue: "2.5 ICP",
      funded: 68,
      investors: 24,
      timeline: "8 months",
      roi: "+18%",
      status: "Active",
      icon: "🍎",
      tags: ["Organic", "Premium"],
    },
    {
      id: 2,
      title: "Rice Field #003",
      location: "Kediri, East Java",
      crop: "Rice",
      area: "1.2 ICP",
      minInvestment: "0.05 ICP",
      totalValue: "1.2 ICP",
      funded: 85,
      investors: 42,
      timeline: "4 months",
      roi: "+12%",
      status: "Active",
      icon: "🌾",
      tags: ["Traditional", "Sustainable"],
    },
    {
      id: 3,
      title: "Coffee Bean #108",
      location: "Jember, East Java",
      crop: "Coffee",
      area: "3.1 ICP",
      minInvestment: "0.2 ICP",
      totalValue: "3.1 ICP",
      funded: 45,
      investors: 18,
      timeline: "12 months",
      roi: "+25%",
      status: "Active",
      icon: "☕",
      tags: ["Premium", "Export"],
    },
    {
      id: 4,
      title: "Durian King #025",
      location: "Blitar, East Java",
      crop: "Durian",
      area: "1.8 ICP",
      minInvestment: "0.15 ICP",
      totalValue: "1.8 ICP",
      funded: 72,
      investors: 35,
      timeline: "6 months",
      roi: "+20%",
      status: "Active",
      icon: "🍈",
      tags: ["Exotic", "Premium"],
    },
    {
      id: 5,
      title: "Chili Red #045",
      location: "Lumajang, East Java",
      crop: "Chili",
      area: "0.8 ICP",
      minInvestment: "0.05 ICP",
      totalValue: "0.8 ICP",
      funded: 90,
      investors: 52,
      timeline: "3 months",
      roi: "+15%",
      status: "Active",
      icon: "🌶️",
      tags: ["Spicy", "Local"],
    },
    {
      id: 6,
      title: "Vanilla Pod #078",
      location: "Bali, Indonesia",
      crop: "Vanilla",
      area: "2.2 ICP",
      minInvestment: "0.25 ICP",
      totalValue: "2.2 ICP",
      funded: 55,
      investors: 28,
      timeline: "18 months",
      roi: "+35%",
      status: "Active",
      icon: "🌺",
      tags: ["Premium", "Rare"],
    },
  ];

  const filterOptions = [
    "All Farms",
    "Rice",
    "Coffee",
    "Fruits",
    "Vegetables",
    "Spices",
  ];
  const sortOptions = [
    "Recently Listed",
    "Highest ROI",
    "Most Funded",
    "Ending Soon",
    "Lowest Investment",
  ];

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="border-2 border-black hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Left side - Icon and basic info */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 border-2 border-black rounded-lg flex items-center justify-center text-2xl bg-gray-50">
              {project.icon}
            </div>
          </div>

          {/* Middle - Project details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin size={12} />
                  <span>{project.location}</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 p-1"
              >
                <Heart size={14} />
              </Button>
            </div>

            {/* Investment details in row */}
            <div className="grid grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <span className="text-gray-600 block">Min Investment</span>
                <span className="font-semibold">{project.minInvestment}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Total Value</span>
                <span className="font-semibold">{project.totalValue}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Timeline</span>
                <span className="font-semibold">{project.timeline}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Est. ROI</span>
                <span className="font-semibold text-green-600">
                  {project.roi}
                </span>
              </div>
            </div>

            {/* Progress section */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Funding Progress</span>
                <span className="font-semibold">
                  {project.funded}% • {project.investors} investors
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${project.funded}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-black text-black hover:bg-gray-100 min-w-24"
              onClick={navigateToDetails}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 min-w-24"
              onClick={navigateToPurchase}
            >
              Invest Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">PLANTIFY</h1>
              <p className="text-gray-600">
                InvestorMarketplace • Agricultural NFTs
              </p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 border border-black">
              Connect Wallet
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-black focus:ring-black focus:border-black"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-black rounded px-3 py-2 focus:ring-black focus:border-black"
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-black rounded px-3 py-2 focus:ring-black focus:border-black"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sprout size={20} />
                <span className="text-2xl font-bold">24</span>
              </div>
              <p className="text-sm text-gray-600">Active Projects</p>
            </CardContent>
          </Card>

          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <DollarSign size={20} />
                <span className="text-2xl font-bold">156</span>
              </div>
              <p className="text-sm text-gray-600">Total Investors</p>
            </CardContent>
          </Card>

          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp size={20} />
                <span className="text-2xl font-bold">18.2%</span>
              </div>
              <p className="text-sm text-gray-600">Avg. ROI</p>
            </CardContent>
          </Card>

          <Card className="border border-black">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock size={20} />
                <span className="text-2xl font-bold">8.5</span>
              </div>
              <p className="text-sm text-gray-600">Months Avg.</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Available Investment Opportunities
            <span className="text-gray-500 text-sm ml-2">
              ({projects.length} projects)
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span className="text-sm">Filter: {selectedFilter}</span>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Load More Projects
          </Button>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <Sprout size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("All Farms");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorMarketplace;
