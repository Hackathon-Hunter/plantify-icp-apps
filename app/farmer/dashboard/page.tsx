'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Sprout,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Clock,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getMyInvestmentProjects, getMyDashboardData, UIProjectData, UIDashboardStats } from "@/service";

const FarmerDashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Projects");
  const [projects, setProjects] = useState<UIProjectData[]>([]);
  const [dashboardStats, setDashboardStats] = useState<UIDashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalFundingRaised: 0,
    totalInvestors: 0,
    averageROI: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [farmerName] = useState("Farmer");

  const navigateToInvestmentSetup = () => router.push('/farmer/investment-setup');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectsData, dashboardData] = await Promise.all([
        getMyInvestmentProjects(),
        getMyDashboardData()
      ]);

      setProjects(projectsData);
      setDashboardStats(dashboardData);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All Projects" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchDashboardData} className="bg-black text-white hover:bg-gray-800">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {farmerName}! 👋
              </h1>
              <p className="text-gray-600 text-sm">
                Farmer • Indonesia
              </p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 border border-black" onClick={navigateToInvestmentSetup}>
              + Create New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Summary Cards - Column Direction */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Total Projects */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {dashboardStats.totalProjects}
                  </p>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-xs text-gray-500">
                    {dashboardStats.activeProjects} active
                  </p>
                </div>
                <Sprout size={24} className="text-black" />
              </div>
            </CardContent>
          </Card>

          {/* Total Funding */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ${dashboardStats.totalFundingRaised.toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-600">Total Funding Raised</p>
                  <p className="text-xs text-gray-500">+23% this month</p>
                </div>
                <DollarSign size={24} className="text-black" />
              </div>
            </CardContent>
          </Card>

          {/* Total Investors */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {dashboardStats.totalInvestors}
                  </p>
                  <p className="text-sm text-gray-600">Total Investors</p>
                  <p className="text-xs text-gray-500">Rating: 4.7/5.0</p>
                </div>
                <Users size={24} className="text-black" />
              </div>
            </CardContent>
          </Card>

          {/* Average ROI */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {dashboardStats.averageROI.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">Average ROI</p>
                  <p className="text-xs text-gray-500">Above market avg</p>
                </div>
                <TrendingUp size={24} className="text-black" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full bg-black text-white hover:bg-gray-800 text-xs"
                >
                  View Analytics
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-100 text-xs"
                >
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Farm Projects Section */}
        <Card className="border-2 border-black">
          <CardHeader className="border-b border-black">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                My Farm Projects
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
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
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-black rounded px-3 py-2 focus:ring-black focus:border-black"
                >
                  <option>All Projects</option>
                  <option>Active</option>
                  <option>In Verification</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600">{filteredProjects.length} projects</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border border-black">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${project.statusColor}`}
                          />
                          <span className="text-xs bg-black text-white px-2 py-1 rounded">
                            {project.status}
                          </span>
                          <h3 className="text-lg font-semibold">
                            {project.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{project.location}</span>
                          </div>
                          <span>•</span>
                          <span>
                            {project.crop} • {project.area}
                          </span>
                        </div>

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {/* Funding Progress */}
                          {project.fundingProgress && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Funding Progress
                              </p>
                              <p className="font-semibold">
                                $
                                {project.fundingProgress.current.toFixed(1)}M{" "}
                                / $
                                {project.fundingProgress.target.toFixed(1)}M
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-black h-2 rounded-full"
                                  style={{
                                    width: `${project.fundingProgress.percentage}%`,
                                  }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {project.investors} investors •{" "}
                                {project.fundingProgress.percentage}% funded
                              </p>
                            </div>
                          )}

                          {/* Verification Status */}
                          {project.verificationStatus && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Verification Status
                              </p>
                              <p className="font-semibold">
                                {project.verificationStatus}
                              </p>
                            </div>
                          )}

                          {/* Timeline */}
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Timeline
                            </p>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <p className="text-sm">{project.timeline}</p>
                            </div>
                          </div>

                          {/* Expected Yield & ROI */}
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Expected Yield
                            </p>
                            <p className="font-semibold text-lg">
                              {project.expectedYield.amount}{" "}
                              {project.expectedYield.unit}
                            </p>
                            <p className="text-sm text-gray-600">
                              Est. ROI: {project.roi}
                            </p>
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            {project.status === "Active" && (
                              <span className="flex items-center gap-1 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Growing
                              </span>
                            )}
                            {project.status === "In Verification" && (
                              <span className="flex items-center gap-1 text-sm">
                                <Clock size={14} />
                                Planning
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              • {project.lastUpdate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-black text-black hover:bg-gray-100"
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            {project.status === "Active" && (
                              <Button
                                size="sm"
                                className="bg-black text-white hover:bg-gray-800"
                              >
                                <Edit size={14} className="mr-1" />
                                Update
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-black p-2"
                            >
                              <MoreHorizontal size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && projects.length > 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">
                  No projects match your search
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}

            {/* No Projects State */}
            {projects.length === 0 && (
              <div className="text-center py-12">
                <Sprout size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first farm investment project to get started
                </p>
                <Button
                  className="bg-black text-white hover:bg-gray-800 border border-black"
                  onClick={navigateToInvestmentSetup}
                >
                  + Create New Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
