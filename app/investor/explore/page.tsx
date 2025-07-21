'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import { CardProduct } from "@/components/ui/CardProduct"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BadgeWarning from "@/components/ui/BadgeWarning";
import BadgeMuted from "@/components/ui/BadgeMuted";
import Tabs from "@/components/ui/Tabs";

import {
  Search,
  Filter,
  Heart,
  MapPin,
  TrendingUp,
  DollarSign,
  Clock,
  Sprout,
  Settings2,
  UsersRound
} from "lucide-react";
import { useMarketplaceHandlers, type MarketplaceProject } from "./handlers";

const campaigns = [
  {
    imageUrl: "/images/campaign1.png",
    title: "GreenTech Solutions",
    description:
      "Sustainable packaging solutions for e-commerce",
    buttonText: "View Detail",
    buttonIcon: <Search />,
    reverse: false,
    rightBadge: <BadgeWarning
      text="23 days left"
      icon={<Clock size={15} />}
      iconPosition="left"
    />,
    leftBadge: <BadgeMuted text="EdTech" />,
    raisedAmount: 100,
    goalAmount: 1,
    category: "Sustainability",
  },
  {
    imageUrl: "/images/campaign2.png",
    title: "HealthTrack Pro",
    description:
      "Wearable health monitoring for chronic disease management",
    buttonText: "View Detail",
    buttonIcon: <Search />,
    reverse: true,
    rightBadge: <BadgeWarning
      text="23 days left"
      icon={<Clock size={15} />}
      iconPosition="left"
    />,
    leftBadge: <BadgeMuted text="EdTech" />,
    raisedAmount: 100,
    goalAmount: 1,
    category: "Health Tech",
  },
  {
    imageUrl: "/images/campaign2.png",
    title: "FoodieBot",
    description:
      "AI-powered restaurant recommendation and food delivery optimization",
    buttonText: "View Detail",
    buttonIcon: <Search />,
    reverse: true,
    rightBadge: <BadgeWarning
      text="23 days left"
      icon={<Clock size={15} />}
      iconPosition="left"
    />,
    leftBadge: <BadgeMuted text="EdTech" />,
    raisedAmount: 100,
    goalAmount: 1,
    category: "Food Tech",
  },
  {
    imageUrl: "/images/campaign2.png",
    title: "CryptoSecure",
    description:
      "Enterprise blockchain security and audit platform",
    buttonText: "View Detail",
    buttonIcon: <Search />,
    reverse: true,
    rightBadge: <BadgeWarning
      text="23 days left"
      icon={<Clock size={15} />}
      iconPosition="left"
    />,
    leftBadge: <BadgeMuted text="EdTech" />,
    raisedAmount: 100,
    goalAmount: 1,
    category: "Cybersecurity",
  }
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState("All Startups");
  const categories = ["All Startups", ...new Set(campaigns.map(c => c.category))];
  const filteredCampaigns =
    activeTab === "All Startups"
      ? campaigns
      : campaigns.filter(c => c.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section
        className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-44 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950"
      >
        <img
          src="/assets/images/dummy-explore-1.png"
          alt="Explore1"
          className="w-full h-auto object-cover"
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Card Horizontal */}
          <div className="w-full lg:w-[60%]">
            <CardHorizontal
              title="LinguaLearn"
              description="AI-powered language learning app with personalized curriculum"
              iconPosition="left"
              buttonText="View Detail"
              buttonIcon={<Search size={15} />}
              rightBadge={
                <BadgeWarning
                  text="23 days left"
                  icon={<Clock size={15} />}
                  iconPosition="left"
                />
              }
              leftBadge={<BadgeMuted text="EdTech" />}
            />
          </div>

          <div className="bg-neutral-900 text-white py-4 px-4 flex-grow border border-neutral-800 h-fit">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white">Raised</span>
              <span className="text-purple-500">$85,000</span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "57%" }}
              />
            </div>

            <div className="flex justify-between text-sm mb-4">
              <p>
                <span className="text-white">57%</span>{" "}
                <span className="text-gray-500">funded</span>
              </p>
              <p>
                <span className="text-gray-500">Goal:</span>{" "}
                <span className="text-white">$150,000</span>
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
                <span className="text-white">San Francisco, CA</span>
              </p>
            </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((item, idx) => (
            <CardProduct key={idx} {...item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
