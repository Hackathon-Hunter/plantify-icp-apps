"use client";

import React, { useState, useEffect } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Tabs from "@/components/ui/Tabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";

import Overview from "./partial/Overview";
import CampaignEditor from "./partial/CampaignEditor";
import Compliance from "./partial/Compliance";
import Updates from "./partial/Updates";
import ProfitDistribution from "./partial/ProfitDistribution";

import {
  TrendingUp,
  BanknoteArrowUp,
  Users,
  Calendar,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getMyProjects,
  getInvestorCountForProject,
  getMyFounderProfile,
} from "@/service/api/plantifyService";
import { Project, Founder } from "@/service/declarations/plantify-backend.did";

export default function DashboardFounder() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [investorCount, setInvestorCount] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(true);
  const [founderProfile, setFounderProfile] = useState<Founder | null>();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const extraTabs = [
    "Overview",
    "Startup Editor",
    "Compliance",
    "Updates",
    "Profit Distribution",
    "Investors",
  ];
  const tabs = [...extraTabs];
  const { actor, isAuthenticated, principal } = useAuth();

  useEffect(() => {
    const checkFounderProfile = async () => {
      if (!actor || !isAuthenticated || !principal) {
        return;
      }

      setProfileLoading(true);
      setProfileError(null);

      try {
        const profile = await getMyFounderProfile(actor);

        setFounderProfile(profile);

        if (!profile) {
          setProfileError(
            "You need to register as a founder to access this dashboard."
          );
        }
      } catch (error) {
        console.error("❌ Error checking founder profile:", error);
        setProfileError("Failed to verify founder status. Please try again.");
      } finally {
        setProfileLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      checkFounderProfile();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [actor, isAuthenticated, principal]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!actor || !isAuthenticated || !founderProfile) {
        return;
      }

      try {
        setLoading(true);

        const myProjects = await getMyProjects(actor);

        setProjects(myProjects);

        if (myProjects.length > 0) {
          setCurrentProject(myProjects[0]);

          const investors = await getInvestorCountForProject(
            actor,
            myProjects[0].id
          );
          setInvestorCount(investors);
        }
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [actor, isAuthenticated, founderProfile]);

  const calculateProgress = () => {
    if (!currentProject) return 0;

    const raised = Number(currentProject.fundingRaised);
    const goal = Number(currentProject.fundingGoal);

    if (goal === 0) return 0;
    return Math.round((raised / goal) * 100);
  };

  if (profileLoading || (!actor && isAuthenticated)) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950">
          <div className="flex justify-center items-center p-10">
            <Loader2 className="animate-spin text-white mr-2" size={24} />
            <span className="text-white">
              {profileLoading
                ? "Verifying founder profile..."
                : "Initializing connection..."}
            </span>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (profileError || !founderProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950">
          <Breadcrumbs segments={[{ label: "Back to Home" }]} />

          <div className="flex flex-col items-center justify-center p-8 bg-red-950 rounded-lg border border-red-700">
            <AlertTriangle className="text-red-400 mb-4" size={48} />
            <div className="text-red-300 text-xl mb-4 text-center font-semibold">
              Founder Registration Required
            </div>
            <p className="text-red-200 mb-6 text-center max-w-md">
              {profileError ||
                "You need to register as a founder to access this dashboard. Please complete your founder registration first."}
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => (window.location.href = "/register/founder")}
                className="bg-white text-black hover:bg-neutral-200 px-6 py-2 rounded-md"
              >
                Register as Founder
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="border-red-400 text-red-300 hover:bg-red-900/20 px-6 py-2 rounded-md"
              >
                Go Home
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950">
        <Breadcrumbs segments={[{ label: "Back to Home" }]} />

        <div className="flex flex-col gap-2">
          <h2 className="text-white text-4xl">Founder Dashboard</h2>
          <span className="text-neutral-500">
            Welcome back, {founderProfile.fullName}
          </span>
        </div>

        {loading ? (
          <div className="w-full">
            {/* Shimmer effect for project name */}
            <div className="h-8 w-64 bg-neutral-800 rounded-md mb-2 animate-pulse"></div>
            <div className="h-4 w-96 bg-neutral-800 rounded-md mb-6 animate-pulse"></div>

            {/* Shimmer for stats cards */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Shimmer for second row of stats */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : !currentProject ? (
          <div className="flex flex-col items-center justify-center p-8 bg-neutral-900 rounded-lg">
            <div className="text-white text-xl mb-4">No projects found.</div>
            <p className="text-neutral-400 mb-6 text-center">
              You haven&apos;t created any projects yet. Start by creating your
              first project.
            </p>
            <Button
              onClick={() => (window.location.href = "/startup/create")}
              className="bg-white text-black hover:bg-neutral-200 px-6 py-2 rounded-md"
            >
              Create Project
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-white text-2xl">
                {currentProject.companyName}
              </span>
              <span className="text-neutral-500">
                {currentProject.companyTagline}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <span className="text-white">Amount Raised</span>
                  <BanknoteArrowUp />
                </div>
                <span className="text-white text-3xl">
                  ${Number(currentProject.fundingRaised || 0).toLocaleString()}
                </span>
                <small className="text-neutral-500">
                  Of ${Number(currentProject.fundingGoal).toLocaleString()}{" "}
                  target
                </small>
              </div>
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <span className="text-white">Investor</span>
                  <Users />
                </div>
                <span className="text-white text-3xl">
                  {investorCount.toString()}
                </span>
                <small className="text-neutral-500">Total backers</small>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <span className="text-white">Progress</span>
                  <TrendingUp />
                </div>
                <span className="text-white text-3xl">
                  {calculateProgress()}%
                </span>
                <small className="text-neutral-500">Funding complete</small>
              </div>
              <div className="bg-neutral-800 flex flex-col gap-3 w-full p-4">
                <div className="flex justify-between">
                  <span className="text-white">NFT Left</span>
                  <Calendar />
                </div>
                <span className="text-white text-3xl">23</span>
              </div>
            </div>

            {projects.length > 1 && (
              <div className="mt-4">
                <select
                  className="bg-neutral-800 text-white p-2 rounded"
                  value={currentProject.id}
                  onChange={async (e) => {
                    const selectedProject = projects.find(
                      (p) => p.id === e.target.value
                    );
                    if (selectedProject && actor) {
                      setCurrentProject(selectedProject);
                      const investors = await getInvestorCountForProject(
                        actor,
                        selectedProject.id
                      );
                      setInvestorCount(investors);
                    }
                  }}
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.companyName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="border-2 border-dashed border-neutral-600" />

            <Tabs
              tabs={tabs.map((c) => ({ label: c, value: c }))}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="mt-6">
              {activeTab === "Overview" && (
                <Overview project={currentProject} />
              )}
              {activeTab === "Startup Editor" && (
                <CampaignEditor project={currentProject} />
              )}
              {activeTab === "Compliance" && (
                <Compliance project={currentProject} />
              )}
              {activeTab === "Updates" && <Updates project={currentProject} />}
              {activeTab === "Profit Distribution" && (
                <ProfitDistribution project={currentProject} />
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
