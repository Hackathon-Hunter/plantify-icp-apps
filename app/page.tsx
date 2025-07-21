'use client'

import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { CardVertical } from "@/components/ui/CardVertical"
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import Navbar from "@/components/ui/Navbar";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Sprout,
  DollarSign,
  BarChart3,
  Leaf,
  Search,
  BanknoteArrowUp,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateToFarmer = () => router.push('farmer/registration');
  const navigateToInvestor = () => router.push('investor/marketplace');

  const stats = [
    { value: "500+", label: "Active Projects", icon: Sprout },
    { value: "$2.5M", label: "Total Investment", icon: DollarSign },
    { value: "1,200+", label: "Happy Investors", icon: Users },
    { value: "22%", label: "Average ROI", icon: TrendingUp },
  ];

  const campaigns = [
    {
      imageUrl: "/images/campaign1.png",
      title: "Raise Capital, Build Community",
      description:
        "Use your fundraising page to showcase your product and vision. Set your terms, upload your pitch deck, and connect directly with investors.",
      buttonText: "Create a Campaign",
      buttonIcon: <Search />,
      reverse: false,
    },
    {
      imageUrl: "/images/campaign2.png",
      title: "Back the Next Big Thing",
      description:
        "Invest as little as $100 in early-stage startups. Own tokenized equity, access liquidity, and invest without waiting 10 years for IPO.",
      buttonText: "Explore Opportunities",
      buttonIcon: <Search />,
      reverse: true,
    },
  ];

  const fair = [
    {
      imageUrl: "/images/campaign1.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: false,
    },
    {
      imageUrl: "/images/campaign2.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: true,
    },
    {
      imageUrl: "/images/campaign2.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: true,
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Browse Projects",
      description:
        "Explore verified agricultural projects from trusted farmers worldwide.",
    },
    {
      step: "2",
      title: "Invest with NFTs",
      description:
        "Purchase NFT shares representing ownership in specific farming operations.",
    },
    {
      step: "3",
      title: "Track Progress",
      description:
        "Monitor your investments with real-time updates and farm photos.",
    },
    {
      step: "4",
      title: "Earn Returns",
      description:
        "Receive your share of profits when crops are harvested and sold.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Investor",
      content:
        "Plantify has made agricultural investing accessible and transparent. I've seen consistent returns on my investments.",
      rating: 5,
    },
    {
      name: "Ahmad Rizki",
      role: "Farmer",
      content:
        "As a farmer, Plantify connected me with investors who believe in sustainable agriculture. It transformed my business.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Portfolio Manager",
      content:
        "The platform provides excellent transparency and real-time tracking. Perfect for diversified investment strategies.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-36 sm:pt-44 md:pt-56 lg:pt-64 pb-16 md:pb-24 bg-black"
      >
        <div className="max-w-7xl px-4 mx-auto text-center lg:px-64">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white">
            Invest in the Future, <br /> One Startup at a Time.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
            Unlock access to high-growth startups using blockchain-powered equity.
            Built for everyday investors and visionary founders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              iconLeft={<Search />}
              size="lg"
              className="bg-white text-black hover:bg-gray-800 hover:text-white text-lg px-8 py-4"
              onClick={navigateToInvestor}
            >
              Explore Startups
            </Button>
            <Button
              iconLeft={<BanknoteArrowUp />}
              size="lg"
              className="bg-transparent text-white text-lg px-8 py-4 hover:bg-gray-800"
              onClick={navigateToInvestor}
            >
              Raise Capital
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="w-full h-full lg:pt-34 sm:pt-24 px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px]"
          style={{
            backgroundImage: "url('/assets/images/bg-gradient.png')"
          }}>
          <div className="relative max-w-7xl mx-auto sm:24 lg:pt-64 sm:px-12 lg:px-44">
            <div className="relative w-full h-full">
              <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] max-h-[80vh] bg-black rounded-xl border-2 sm:border-3 md:border-4 border-gray-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 rounded-lg"></div>
                <div className="text-gray-400 text-center z-10">
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-32 sm:py-44 md:py-56 lg:py-64 sm:px-12 lg:px-64 bg-black">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col gap-6 items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal text-white">
              Revolutionizing Venture Capital with Web3
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl">
              Venture capital has long been exclusive.{" "}
              <span className="text-white">Plantify</span> opens the gates—
              connecting startup founders with global investors through tokenized equity on the blockchain.
            </p>
            <p className="text-gray-400 pt-8 text-base sm:text-lg max-w-2xl">
              No <span className="text-white">gatekeepers</span>. No{" "}
              <span className="text-white">waiting</span>. Just{" "}
              <span className="text-white">innovation</span> and{" "}
              <span className="text-white">access</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Who Plantfy Section */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-start text-center md:text-left mb-12 md:mb-16 gap-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal">
              Who Plantify <br /> is Built For
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0">
              Whether you're building the next big thing or searching for early-stage opportunities,
              CryptoFund empowers both founders and investors with a transparent, blockchain-driven platform.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {campaigns.map((item, idx) => (
              <div key={idx} className="w-full lg:flex-1 flex">
                <CardVertical {...item} className="w-full h-full flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section
        className="relative py-64 px-4 text-white text-center bg-black overflow-hidden"
        style={{
          backgroundImage: `
          radial-gradient(ellipse 100% 80% at center, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 1) 100%),
          url('/assets/images/bg-compliance.png')
        `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >

        <div className="relative z-10 sm:px-12 lg:px-64">
          <h2 className="text-3xl md:text-4xl font-normal mb-6 tracking-tight">
            Compliance First, Always
          </h2>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            Every campaign is reviewed to comply with{" "}
            <span className="text-white font-medium">crowdfunding regulations</span>.
            We verify startup status, check founders, and ensure honest disclosures.
          </p>
          <p className="text-white font-medium text-lg">
            Your investment is protected by law and smart contracts.
          </p>
        </div>

        <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.85) 100%);
        }
      `}</style>
      </section>

      {/* Power Futures Section */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="flex flex-col gap-2 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Power Features That <br /> Set Plantify Apart
            </h2>
            <p className="text-xl text-gray-400">
              From compliance to liquidity, every detail of Plantify is <br className="hidden sm:block" />
              crafted to empower safe, seamless startup investing.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {/* Horizontal Card */}
            <CardHorizontal
              imageUrl="/images/sample.jpg"
              title="Built on Internet Computer (ICP)"
              description="Our platform runs on ICP’s high-speed, scalable, gasless blockchain—enabling real-time tokenization and secure smart contracts for every deal."
              iconPosition="right"
            />

            {/* Vertical Cards */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {campaigns.map((item, idx) => (
                <div key={idx} className="w-full lg:flex-1 flex">
                  <CardVertical {...item} className="w-full h-full flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fair Section */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 sm:px-12 lg:px-44 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-normal mb-6">
            Fair, Founder-Friendly Fees
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            {fair.map((item, idx) => (
              <div
                key={idx}
                className="w-full sm:flex-1 flex"
              >
                <CardVertical {...item} className="w-full h-full flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Journey Section */}
      <section className="relative pt-12 sm:pt-44 md:pt-56 lg:pt-64 pb-16 md:pb-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="max-w-[800px]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white">
                Start Your Jouney Today
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-16">
                <div className="flex flex-col gap-3">
                  <span className="text-white">For investors</span>
                  <Button
                    iconLeft={<Search />}
                    size="lg"
                    className="bg-white text-black hover:bg-gray-800 hover:text-white text-sm px-8 py-4"
                    onClick={navigateToInvestor}
                  >
                    Own the future, one NFT at a time
                  </Button>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-white">For founders</span>
                  <Button
                    iconLeft={<BanknoteArrowUp />}
                    size="lg"
                    className="bg-white text-black text-sm px-8 py-4 hover:bg-gray-800"
                    onClick={navigateToInvestor}
                  >
                    Turn your users into investors
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero seaction */}
        <div className="w-full h-full lg:pt-34 sm:pt-24 px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px]"
          style={{
            backgroundImage: "url('/assets/images/bg-gradient.png')"
          }}>
          <div className="relative max-w-7xl mx-auto sm:24 lg:pt-64 sm:px-12 lg:px-44">
            <div className="relative w-full h-full">
              <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] max-h-[80vh] bg-black rounded-xl border-2 sm:border-3 md:border-4 border-gray-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 rounded-lg"></div>
                <div className="text-gray-400 text-center z-10">
                </div>
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div >
  );
};

export default LandingPage;
