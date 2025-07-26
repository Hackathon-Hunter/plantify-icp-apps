'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import { CardProduct } from "@/components/ui/CardProduct"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BadgeWarning from "@/components/ui/BadgeWarning";
import BadgeMuted from "@/components/ui/BadgeMuted";
import Tabs from "@/components/ui/Tabs";

import {
  Search,
  MapPin,
  Clock,
  Settings2,
  UsersRound
} from "lucide-react";
import { getAllProjects } from "@/service/api/plantifyService";
import type { _SERVICE, Project } from "@/service/declarations/plantify-backend.did";
import { useAuth } from "@/hooks/useAuth";
import { ActorSubclass } from "@dfinity/agent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DarkVeil from "@/components/ui/DarkVeil/DarkVeil";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("All Startups");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { actor } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!actor) return;
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProjects(actor as ActorSubclass<_SERVICE>);
        setProjects(data);
      } catch (_err: unknown) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [actor]);

  console.log("projects", projects);
  const categories = React.useMemo(() => {
    const cats = projects.map((p) => {
      if (typeof p.industry === "object") {
        return Object.keys(p.industry)[0];
      }
      return p.industry;
    });
    return ["All Startups", ...Array.from(new Set(cats))];
  }, [projects]);

  const filteredProjects =
    activeTab === "All Startups"
      ? projects
      : projects.filter((p) => {
        const cat = typeof p.industry === "object" ? Object.keys(p.industry)[0] : p.industry;
        return cat === activeTab;
      });

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section
          className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-44 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24"
        >
          <Image
            src={filteredProjects[0]?.companyLogo?.[0] || "/assets/images/dummy-explore-1.png"}
            alt="Explore1"
            height={100}
            width={100}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Card Horizontal */}
            <div className="w-full lg:w-[60%]">
              {filteredProjects[0] ? (
                <CardHorizontal
                  title={filteredProjects[0].companyName}
                  description={filteredProjects[0].companyTagline}
                  iconPosition="left"
                  buttonText="View Detail"
                  buttonIcon={<Search size={15} />}
                  rightBadge={
                    <BadgeWarning
                      text={(() => {
                        const item = filteredProjects[0];
                        if (item.targetDate && item.targetDate[0]) {
                          const now = Date.now();
                          const target = Number(item.targetDate[0]) / 1_000_000;
                          const days = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
                          return `${days} days left`;
                        }
                        return "-";
                      })()}
                      icon={<Clock size={15} />}
                      iconPosition="left"
                    />
                  }
                  leftBadge={
                    <BadgeMuted
                      text={(() => {
                        const item = filteredProjects[0];
                        if (typeof item.industry === "object") {
                          return Object.keys(item.industry)[0];
                        }
                        return item.industry;
                      })()}
                    />
                  }
                />
              ) : null}
            </div>

            <div className="bg-neutral-900 text-white py-4 px-4 flex-grow border border-neutral-800 h-fit">
              {filteredProjects[0] ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Raised</span>
                    <span className="text-purple-500">
                      ${Number(filteredProjects[0].fundingRaised) / 1e8}
                    </span>
                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((Number(filteredProjects[0].fundingRaised) / Number(filteredProjects[0].fundingGoal)) * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <p>
                      <span className="text-white">
                        {Math.min(100, Math.round((Number(filteredProjects[0].fundingRaised) / Number(filteredProjects[0].fundingGoal)) * 100))}%
                      </span>{" "}
                      <span className="text-gray-500">funded</span>
                    </p>
                    <p>
                      <span className="text-gray-500">Goal:</span>{" "}
                      <span className="text-white">${Number(filteredProjects[0].fundingGoal) / 1e8}</span>
                    </p>
                  </div>

                  <div className="border-t border-dashed border-gray-700 my-4"></div>

                  <div className="flex justify-between text-sm">
                    <p className="flex gap-1 items-center text-gray-500">
                      <UsersRound size={15} />
                      Investors
                    </p>
                    <p className="flex gap-1 items-center">
                      <MapPin size={15} />
                      <span className="text-white">{filteredProjects[0].location}</span>
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <section className="relative flex flex-col gap-6 px-4 sm:px-6 md:px-12 lg:px-32 xl:px-64 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24 bg-black">
          <div className="flex flex-col">
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4 text-white">
                All Startups
              </h2>
              <p className="text-base sm:text-lg text-gray-400">
                Discover and invest in the next generation of innovative startups
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search startups, industries, or founders..."
              leftIcon={<Search size={16} />}
              className="flex-1"
            />
            <Button
              iconLeft={<Settings2 />}
              size="lg"
              className="bg-neutral-800 text-white hover:bg-transparent hover:border hover:border-white hover:text-white text-sm px-6 py-3 w-full sm:w-auto"
            >
              Advanced Filters
            </Button>
          </div>

          <Tabs
            tabs={categories.map((c) => ({ label: c, value: c }))}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {loading ? (
            <div className="text-white">Loading projects...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((item, idx) => (
                <CardProduct
                  key={item.id || idx}
                  imageUrl={item.companyLogo?.[0] || "/assets/images/dummy-explore-1.png"}
                  title={item.companyName}
                  description={item.companyTagline}
                  buttonText="View Detail"
                  buttonIcon={<Search />}
                  rightBadge={<BadgeWarning text={(() => {
                    // Calculate days left if targetDate exists
                    if (item.targetDate && item.targetDate[0]) {
                      const now = Date.now();
                      const target = Number(item.targetDate[0]) / 1_000_000;
                      const days = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
                      return `${days} days left`;
                    }
                    return "-";
                  })()} icon={<Clock size={15} />} iconPosition="left" />}
                  leftBadge={<BadgeMuted text={(() => {
                    if (typeof item.industry === "object") {
                      return Object.keys(item.industry)[0];
                    }
                    return item.industry;
                  })()} />}
                  raisedAmount={Number(item.fundingRaised) / 1e8}
                  goalAmount={Number(item.fundingGoal) / 1e8}
                  handleClick={() => {
                    router.push(`/investor/startup/detail?id=${item.id}`);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
