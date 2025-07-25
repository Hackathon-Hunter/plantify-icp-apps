'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { CardVertical } from "@/components/ui/CardVertical"
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import { CardProduct } from "@/components/ui/CardProduct"
import BadgeWarning from "@/components/ui/BadgeWarning";
import BadgeMuted from "@/components/ui/BadgeMuted";
import Navbar from "@/components/ui/Navbar";
import { IcpLogo } from "@/components/icons";

import { calculateProjectedIncome } from '@/utils/returnCalculator';
import { useAuth } from "@/hooks/useAuth";

import {
  ChevronDown,
  Search,
  BanknoteArrowUp,
  Clock
} from "lucide-react";

const INDUSTRY_PRICING: Record<string, number> = {
  fintech: 1.2,
  health: 1.0,
  edtech: 0.8,
};

const LandingPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/investor/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  // Section refs for smooth scroll
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const howItWorksRef = useRef<HTMLDivElement | null>(null);
  const raiseCapitalRef = useRef<HTMLDivElement | null>(null);
  const secondaryMarketRef = useRef<HTMLDivElement | null>(null);

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [investment, setInvestment] = useState<number | string>('');
  const [period, _setPeriod] = useState(5);
  const [yieldType, setYieldType] = useState<'last' | 'average'>('last');
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [plan, setPlan] = useState<'one-time' | 'monthly'>('one-time');
  const [projected, setProjected] = useState({ totalReturn: '0', totalAsset: '0' });
  const [value, setValue] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    const percentage = (newValue / 100) * 100;
    e.target.style.background = `linear-gradient(to right, white ${percentage}%, #262626 ${percentage}%)`;
  };

  const pricePerNFT = INDUSTRY_PRICING[selectedIndustry] || 1;
  const numericInvestment = typeof investment === 'string' ? parseFloat(investment) || 0 : investment;

  useEffect(() => {
    const result = calculateProjectedIncome({
      investment: numericInvestment,
      period,
      yieldType,
      autoReinvest,
    });

    setProjected(result);
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [investment, period, yieldType, autoReinvest, numericInvestment]);


  const navigateToInvestor = () => router.push('investor/explore');

  const power = [
    {
      imageUrl: "/assets/images/power-2.png",
      title: "Early-Stage Liquidity. Finally.",
      description:
        "Sell your shares anytime via our peer-to-peer secondary marketplace. No more waiting years for an IPO.",
      reverse: false,
    },
    {
      imageUrl: "/assets/images/power-3.png",
      title: "One Dashboard to Rule Them All",
      description:
        "Your investments, all in one place. View your equity NFTs, track startup progress, and manage your entire portfolio with ease.",
      reverse: true,
    },
  ];

  const projects = [
    {
      imageUrl: "/assets/images/built-1.png",
      title: "Raise Capital, Build Community",
      description:
        "Use your fundraising page to showcase your product and vision. Set your terms, upload your pitch deck, and connect directly with investors.",
      buttonText: "Create a Startup",
      buttonIcon: <Search />,
      reverse: false,
    },
    {
      imageUrl: "/assets/images/built-2.png",
      title: "Back the Next Big Thing",
      description:
        "Invest as little as $100 in early-stage startups. Own tokenized equity, access liquidity, and invest without waiting 10 years for IPO.",
      buttonText: "Explore Opportunities",
      buttonIcon: <Search />,
      reverse: true,
    },
  ];

  const startup = [
    {
      id: "startup-1",
      companyLogo: ["/assets/images/startup-1.png"],
      companyName: "Raise Capital, Build Community",
      companyTagline:
        "Use your fundraising page to showcase your product and vision. Set your terms, upload your pitch deck, and connect directly with investors.",
      industry: "Fintech",
      fundingRaised: 1_000_000_000,
      fundingGoal: 5_000_000_000,
      targetDate: [String((Date.now() + 1000 * 60 * 60 * 24 * 20) * 1_000_000)],
    },
    {
      id: "startup-2",
      companyLogo: ["/assets/images/startup-2.png"],
      companyName: "Back the Next Big Thing",
      companyTagline:
        "Invest as little as $100 in early-stage startups. Own tokenized equity, access liquidity, and invest without waiting 10 years for IPO.",
      industry: { Web3: true },
      fundingRaised: 3_000_000_000,
      fundingGoal: 6_000_000_000,
      targetDate: [String((Date.now() + 1000 * 60 * 60 * 24 * 12) * 1_000_000)],
    },
    {
      id: "startup-3",
      companyLogo: ["/assets/images/startup-3.png"],
      companyName: "Scale with Investor Liquidity",
      companyTagline:
        "Tokenize your equity, gain access to secondary markets, and open up new opportunities for continuous fundraising.",
      industry: "Healthtech",
      fundingRaised: 2_500_000_000,
      fundingGoal: 4_000_000_000,
      targetDate: [String((Date.now() + 1000 * 60 * 60 * 24 * 5) * 1_000_000)],
    },
    {
      id: "startup-4",
      companyLogo: ["/assets/images/startup-4.png"],
      companyName: "Scale with Investor Liquidity",
      companyTagline:
        "Tokenize your equity, gain access to secondary markets, and open up new opportunities for continuous fundraising.",
      industry: "Healthtech",
      fundingRaised: 2_500_000_000,
      fundingGoal: 4_000_000_000,
      targetDate: [String((Date.now() + 1000 * 60 * 60 * 24 * 5) * 1_000_000)],
    },
  ];

  const fair = [
    {
      imageUrl: "/assets/images/founder-1.png",
      description:
        "7.5% commission only if your startup succeeds",
      reverse: false,
    },
    {
      imageUrl: "/assets/images/founder-2.png",
      description:
        "7.5% commission only if your startup succeeds",
      reverse: true,
    },
    {
      imageUrl: "/assets/images/founder-3.png",
      description:
        "7.5% commission only if your startup succeeds",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar
        onScrollExplore={() => handleScroll(exploreRef)}
        onScrollHowItWorks={() => handleScroll(howItWorksRef)}
        onScrollRaiseCapital={() => handleScroll(raiseCapitalRef)}
        onScrollSecondaryMarket={() => handleScroll(secondaryMarketRef)}
      />

      {/* Hero Section */}
      <section ref={exploreRef} className="relative pt-36 sm:pt-44 md:pt-56 lg:pt-64 pb-0 md:pb-24 bg-black">
        <div className="max-w-7xl px-4 mx-auto text-center lg:px-64">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 sm:h-14 md:h-16 bg-gray-800 rounded w-3/4 mx-auto"></div>
              <div className="h-5 sm:h-6 bg-gray-700 rounded w-2/3 mx-auto"></div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <div className="h-12 bg-gray-800 rounded w-40"></div>
                <div className="h-12 bg-gray-800 rounded w-40"></div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white">
                Invest in the Future, <br /> One Startup at a Time.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
                Unlock access to high-growth startups using blockchain-powered equity.
                Built for everyday investors and visionary founders.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  onClick={() => router.push("/investor/explore")}
                  iconLeft={<Search />}
                  size="lg"
                  className="bg-white text-black hover:bg-transparent hover:border hover:border-white hover:text-white text-lg px-8 py-4"
                >
                  Explore Startups
                </Button>
                <Button
                  onClick={() => router.push("/register/founder")}
                  iconLeft={<BanknoteArrowUp />}
                  size="lg"
                  className="bg-transparent text-white text-lg px-8 py-4 hover:bg-white hover:text-black"
                >
                  Raise Capital
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Hero Visual */}
        <div className="w-full h-full lg:pt-34 sm:pt-24 pt-[100px] px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px] mt-[-100px]"
          style={{ backgroundImage: "url('/assets/images/bg-gradient.png')" }}
        >
          <div className="relative max-w-7xl mx-auto sm:pt-0 lg:pt-64 sm:px-12 lg:px-44">
            <div className="relative w-full h-full">
              {isLoading ? (
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[470px] bg-gray-800 rounded-xl animate-pulse"></div>
              ) : (
                <div className="w-full h-[170px] sm:h-[500px] md:h-[600px] lg:h-[470px] max-h-[80vh] bg-black rounded-xl border-2 sm:border-3 md:border-4 border-gray-700 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/assets/images/hero-1.png"
                    alt="Hero"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 rounded-lg"></div>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                    <button className="bg-[#2F1350] text-white px-4 py-2 border border-[#AF6DFF] hover:bg-neutral-200 transition flex gap-2">
                      <IcpLogo style={{ width: '30px', height: 'auto' }} />Build in ICP
                    </button>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section ref={howItWorksRef} className="py-32 sm:py-44 md:py-56 lg:py-64 sm:px-12 lg:px-64 bg-black">
        <div className="max-w-7xl mx-auto w-full px-4">
          {isLoading ? (
            <div className="flex flex-col gap-6 items-center text-center animate-pulse">
              <div className="h-10 sm:h-12 bg-gray-800 rounded w-3/4"></div>
              <div className="h-5 bg-gray-700 rounded w-[90%] max-w-2xl"></div>
              <div className="h-5 bg-gray-700 rounded w-2/3 max-w-xl"></div>
              <div className="h-5 bg-gray-700 rounded w-1/2 max-w-lg pt-8"></div>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Startup list */}
      <section ref={raiseCapitalRef} className="py-12 lg:pb-32 lg:py-0 px-4 sm:px-6 lg:px-44 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col text-center md:text-left mb-12 md:mb-16 gap-6">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-700 rounded w-2/3 mx-auto md:mx-0"></div>
                <div className="h-5 bg-gray-600 rounded w-full max-w-2xl mx-auto md:mx-0"></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal">
                  Built for Visionaries and Believers
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0">
                  CryptoFund bridges bold founders and visionary investors through trust and blockchain innovation.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-full animate-pulse bg-neutral-800 rounded-lg p-6 flex flex-col gap-4">
                <div className="h-40 bg-neutral-700 rounded w-full" />
                <div className="h-6 bg-neutral-600 rounded w-3/4" />
                <div className="h-4 bg-neutral-600 rounded w-full" />
                <div className="h-4 bg-neutral-600 rounded w-2/3" />
                <div className="flex gap-2 mt-4">
                  <div className="h-6 bg-neutral-700 rounded w-24" />
                  <div className="h-6 bg-neutral-700 rounded w-20" />
                </div>
              </div>
            ))
          ) : (
            startup.map((item, idx) => (
              <CardProduct
                key={item.id || idx}
                imageUrl={item.companyLogo?.[0] || "/assets/images/dummy-explore-1.png"}
                title={item.companyName}
                description={item.companyTagline}
                buttonText="View Detail"
                buttonIcon={<Search />}
                rightBadge={
                  ""}
                leftBadge={
                  <BadgeMuted
                    text={(() => {
                      if (typeof item.industry === "object") {
                        return Object.keys(item.industry)[0];
                      }
                      return item.industry;
                    })()}
                  />
                }
                raisedAmount={Number(item.fundingRaised) / 1e8}
                goalAmount={Number(item.fundingGoal) / 1e8}
                handleClick={() => {
                  router.push(`/investor/startup/detail?id=${item.id}`);
                }}
              />
            ))
          )}
        </div>
      </section>

      {/* Who Plantfy Section */}
      <section ref={secondaryMarketRef} className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-start text-center md:text-left mb-12 md:mb-16 gap-6">
            {isLoading ? (
              <div className="w-full flex flex-col gap-4 animate-pulse">
                <div className="h-8 w-2/3 bg-gray-700 rounded mx-auto md:mx-0" />
                <div className="h-5 w-full bg-gray-600 rounded max-w-2xl mx-auto md:mx-0" />
                <div className="h-5 w-4/5 bg-gray-600 rounded max-w-2xl mx-auto md:mx-0" />
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal">
                  Who Plantify <br /> is Built For
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0">
                  Whether you&apos;re building the next big thing or searching for early-stage opportunities,
                  CryptoFund empowers both founders and investors with a transparent, blockchain-driven platform.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full lg:flex-1 flex flex-col bg-neutral-800 animate-pulse rounded-xl p-6 gap-4"
                >
                  <div className="h-48 bg-neutral-700 rounded w-full" />
                  <div className="h-6 bg-neutral-600 rounded w-3/4" />
                  <div className="h-4 bg-neutral-600 rounded w-full" />
                  <div className="h-4 bg-neutral-600 rounded w-2/3" />
                  <div className="h-10 w-32 bg-neutral-700 rounded mt-auto" />
                </div>
              ))
              : projects.map((item, idx) => (
                <div key={idx} className="w-full lg:flex-1 flex">
                  <CardVertical {...item} className="w-full h-full flex-1" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="py-64 px-4 text-white text-center bg-black">
          <div className="relative z-10 sm:px-12 lg:px-64">
            <div className="animate-pulse mb-6">
              <div className="h-10 bg-neutral-700 rounded-lg w-3/4 mx-auto mb-2"></div>
            </div>

            <div className="animate-pulse mb-6 space-y-3">
              <div className="h-4 bg-neutral-600 rounded w-full max-w-2xl mx-auto"></div>
              <div className="h-4 bg-neutral-600 rounded w-5/6 max-w-xl mx-auto"></div>
              <div className="h-4 bg-neutral-600 rounded w-4/5 max-w-lg mx-auto"></div>
            </div>

            <div className="animate-pulse">
              <div className="h-5 bg-neutral-600 rounded w-2/3 max-w-md mx-auto"></div>
            </div>
          </div>
        </section>
      ) : (
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
              Every startup is reviewed to comply with {" "}
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
      )}

      {isLoading ? (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 text-center mb-16">
              <div className="animate-pulse mb-4">
                <div className="h-10 bg-neutral-700 rounded-lg w-4/5 max-w-md mx-auto mb-2"></div>
                <div className="h-10 bg-neutral-700 rounded-lg w-3/5 max-w-xs mx-auto"></div>
              </div>
              <div className="animate-pulse space-y-2">
                <div className="h-5 bg-neutral-600 rounded w-full max-w-lg mx-auto"></div>
                <div className="h-5 bg-neutral-600 rounded w-4/5 max-w-md mx-auto"></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="animate-pulse">
                <div className="bg-neutral-800 rounded-xl p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-full lg:w-1/2">
                      <div className="h-8 bg-neutral-700 rounded-lg w-3/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-600 rounded w-full"></div>
                        <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <div className="h-48 bg-neutral-700 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-full lg:flex-1 flex">
                    <div className="animate-pulse bg-neutral-800 rounded-xl p-6 w-full h-full flex flex-col">
                      <div className="h-40 bg-neutral-700 rounded-lg mb-6"></div>
                      <div className="h-6 bg-neutral-700 rounded-lg w-4/5 mb-4"></div>
                      <div className="space-y-2 flex-grow">
                        <div className="h-4 bg-neutral-600 rounded w-full"></div>
                        <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
                        <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Power Features That <br /> Set Plantify Apart
              </h2>
              <p className="text-xl text-gray-400">
                From compliance to liquidity, every detail of Plantify is <br className="hidden sm:block" />
                crafted to empower safe, seamless startup investing.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <CardHorizontal
                imageUrl="/assets/images/power-1.png"
                title="Built on Internet Computer (ICP)"
                description="Our platform runs on ICP's high-speed, scalable, gasless blockchain—enabling real-time tokenization and secure smart contracts for every deal."
                iconPosition="right"
              />

              {/* Vertical Cards */}
              <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                {power.map((item, idx) => (
                  <div key={idx} className="w-full lg:flex-1 flex">
                    <CardVertical {...item} className="w-full h-full flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {isLoading ? (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
          <div className="animate-pulse">
            <div className="text-center mb-8">
              <div className="h-8 bg-neutral-700 rounded-lg w-48 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-neutral-900 p-6 flex flex-col gap-4">
                <div>
                  <div className="h-4 bg-neutral-700 rounded w-24 mb-2"></div>
                  <div className="h-12 bg-neutral-700 rounded w-full"></div>
                </div>

                <div className="border border-dashed border-neutral-500" />

                <div className="flex gap-2">
                  <div className="h-10 bg-neutral-800 rounded w-20"></div>
                  <div className="h-10 bg-neutral-700 rounded w-20"></div>
                </div>

                <div>
                  <div className="h-4 bg-neutral-700 rounded w-48 mb-2"></div>
                  <div className="h-12 bg-neutral-700 rounded w-full"></div>
                </div>

                <div className="bg-neutral-900 text-white w-full max-w-lg">
                  <div className="h-4 bg-neutral-700 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-neutral-600 rounded w-full mb-2"></div>
                </div>

                <div className="border border-dashed border-neutral-500" />

                <div>
                  <div className="h-4 bg-neutral-700 rounded w-40 mb-2"></div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-neutral-700 rounded-full"></div>
                      <div className="h-4 bg-neutral-600 rounded w-20"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-neutral-700 rounded-full"></div>
                      <div className="h-4 bg-neutral-600 rounded w-16"></div>
                    </div>
                  </div>
                </div>

                <div className="border border-dashed border-neutral-500" />

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-neutral-700 rounded"></div>
                  <div className="h-4 bg-neutral-600 rounded w-40"></div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-neutral-900 p-4 flex flex-col gap-2">
                  <div className="h-7 bg-neutral-700 rounded w-40 mb-2"></div>

                  <div className="border border-dashed border-neutral-500" />

                  <div className="h-4 bg-neutral-600 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-neutral-600 rounded w-56 mb-4"></div>

                  <div className="border border-dashed border-neutral-500" />

                  <div className="h-10 bg-neutral-700 rounded w-32 mb-1"></div>
                  <div className="h-4 bg-neutral-600 rounded w-24"></div>
                </div>

                <div className="bg-green-950 p-4 flex flex-col gap-2">
                  <div className="h-5 bg-green-800 rounded w-44 mb-1"></div>
                  <div className="h-7 bg-green-700 rounded w-28 mb-1"></div>
                  <div className="h-4 bg-green-800 rounded w-52"></div>
                </div>

                <div className="h-12 bg-neutral-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
          <h2 className="text-center text-2xl font-semibold mb-8">Return Calculator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-neutral-900 p-6 flex flex-col gap-4">
              <div>
                <label className="text-sm mb-2 block">Select Startups</label>
                <Select
                  rightIcon={<ChevronDown />}
                  bgClass="bg-neutral-700 text-white w-full"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="" className="text-black">Select your industry</option>
                  <option value="fintech" className="text-black">Fintech</option>
                  <option value="health" className="text-black">Health</option>
                  <option value="edtech" className="text-black">EdTech</option>
                </Select>
              </div>

              <div className="border border-dashed border-neutral-500" />

              <div className="flex gap-2">
                <button
                  onClick={() => setPlan('one-time')}
                  className={`px-4 py-2 text-sm ${plan === 'one-time' ? 'bg-neutral-800 text-white' : 'text-white'}`}
                >
                  One Time
                </button>
                <button
                  onClick={() => setPlan('monthly')}
                  className={`px-4 py-2 text-sm ${plan === 'monthly' ? 'bg-neutral-800 text-white' : 'text-white'}`}
                >
                  Monthly
                </button>
              </div>

              <div>
                <label className="text-sm mb-2 block">Initial Investment Amount (USD)</label>
                <Input
                  placeholder="$0"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  bgClass="bg-neutral-700 text-white"
                />
              </div>

              <div className="bg-neutral-900 text-white w-full max-w-lg">
                <label className="block mb-2">Period ({value} year)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={handleSliderChange}
                  className="w-full h-2 appearance-none outline-none"
                  style={{
                    background: `linear-gradient(to right, white ${value}%, #262626 ${value}%)`,
                  }}
                />
                <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              height: 16px;
              width: 16px;
              background-color: #fff;
              border-radius: 0%;
              cursor: pointer;
              border: 2px solid white;
            }

            input[type='range']::-moz-range-thumb {
              height: 16px;
              width: 16px;
              background-color: #262626;
              border-radius: 50%;
              cursor: pointer;
              border: 2px solid white;
            }
          `}</style>
              </div>

              <div className="border border-dashed border-neutral-500" />

              <div>
                <label className="text-sm mb-2 block">Expected Rental Yield (ERY)</label>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="yield"
                      value="last"
                      checked={yieldType === 'last'}
                      onChange={() => setYieldType('last')}
                    />
                    Last Month
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="yield"
                      value="average"
                      checked={yieldType === 'average'}
                      onChange={() => setYieldType('average')}
                    />
                    Average
                  </label>
                </div>
              </div>

              <div className="border border-dashed border-neutral-500" />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoReinvest}
                  onChange={(e) => setAutoReinvest(e.target.checked)}
                />
                Auto reinvest rental income
              </label>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-4">
              <div className="bg-neutral-900 p-4 flex flex-col gap-2">
                <h3 className="text-xl mb-2 font-semibold">Projected Income</h3>

                <div className="border border-dashed border-neutral-500" />

                <p className="text-sm text-neutral-400 mb-2">
                  Investment of ${numericInvestment.toLocaleString()} = {(numericInvestment / pricePerNFT).toFixed(0)} NFT
                </p>
                <p className="text-sm text-neutral-400 mb-4">
                  Estimated rental yield to be received in {period} years
                </p>

                <div className="border border-dashed border-neutral-500" />

                <div className="text-3xl font-bold">${projected.totalReturn}</div>
                <div className="text-sm text-neutral-500">
                  ({(numericInvestment / pricePerNFT).toFixed(0)} NFT)
                </div>
              </div>

              <div className="bg-green-950 p-4 flex flex-col gap-2">
                <p className="font-semibold text-green-300">Total assets in {period} years</p>
                <div className="text-xl font-bold">${projected.totalAsset}</div>
                <div className="text-sm text-neutral-400">
                  ({projected.totalReturn} + {numericInvestment} = {projected.totalAsset} USD)
                </div>
              </div>

              <button className="bg-white text-black py-3 font-semibold hover:bg-transparent hover:border hover:border-white hover:text-white transition">
                Invest Now!
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Fair Section */}
      {isLoading ? (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 sm:px-12 lg:px-44 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
            <div className="animate-pulse mb-6">
              <div className="h-10 bg-neutral-700 rounded-lg w-80 mx-auto"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-full sm:flex-1 flex"
                >
                  <div className="animate-pulse bg-neutral-800 rounded-xl p-6 w-full h-full flex flex-col">
                    <div className="h-40 bg-neutral-700 rounded-lg mb-6"></div>
                    <div className="h-6 bg-neutral-700 rounded-lg w-4/5 mx-auto mb-4"></div>
                    <div className="space-y-2 flex-grow">
                      <div className="h-4 bg-neutral-600 rounded w-full"></div>
                      <div className="h-4 bg-neutral-600 rounded w-5/6 mx-auto"></div>
                      <div className="h-4 bg-neutral-600 rounded w-3/4 mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
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
      )}

      {/* Start Journey Section */}
      {isLoading ? (
        <section className="relative pt-12 sm:pt-44 md:pt-56 lg:pt-64 pb-16 md:pb-24 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center flex flex-col justify-center items-center">
              <div className="max-w-[800px]">
                <div className="animate-pulse mb-6">
                  <div className="h-16 bg-neutral-700 rounded-lg w-96 mx-auto"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-16">
                  <div className="flex flex-col gap-3 animate-pulse">
                    <div className="h-5 bg-neutral-600 rounded w-24"></div>
                    <div className="h-14 bg-neutral-700 rounded-lg w-72"></div>
                  </div>

                  <div className="flex flex-col gap-3 sm:w-full w-full animate-pulse">
                    <div className="h-5 bg-neutral-600 rounded w-24"></div>
                    <div className="h-14 bg-neutral-700 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full lg:pt-34 sm:pt-24 pt-[100px] px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px] mt-[-100px]"
            style={{
              backgroundImage: "url('/assets/images/bg-gradient.png')"
            }}>
            <div className="relative max-w-7xl mx-auto sm:24 lg:pt-64 sm:px-12 lg:px-62">
              <div className="relative w-full h-full">
                <div className="w-full h-[190px] sm:h-[500px] md:h-[600px] lg:h-[450px] max-h-[80vh] bg-black rounded-xl border-2 sm:border-3 md:border-4 border-gray-700 flex items-center justify-center relative overflow-hidden">
                  <div className="animate-pulse w-full h-full bg-neutral-800 rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-neutral-700 rounded-lg"></div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 rounded-lg"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
                      className="bg-white text-black hover:bg-transparent hover:border hover:border-white hover:text-white text-sm px-8 py-4"
                      onClick={navigateToInvestor}
                    >
                      Own the future, one NFT at a time
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3 sm:w-full w-full">
                    <span className="text-white">For founders</span>
                    <Button
                      iconLeft={<BanknoteArrowUp />}
                      size="lg"
                      className="bg-white text-black text-sm px-8 py-4 hover:bg-transparent hover:border hover:border-white hover:text-white"
                      onClick={navigateToInvestor}
                    >
                      Turn your users into investors
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full lg:pt-34 sm:pt-24 pt-[100px] px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px] mt-[-100px]"
            style={{
              backgroundImage: "url('/assets/images/bg-gradient.png')"
            }}>
            <div className="relative max-w-7xl mx-auto sm:24 lg:pt-64 sm:px-12 lg:px-62">
              <div className="relative w-full h-full">
                <div className="w-full h-[190px] sm:h-[500px] md:h-[600px] lg:h-[450px] max-h-[80vh] bg-black rounded-xl border-2 sm:border-3 md:border-4 border-gray-700 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/assets/images/hero-2.png"
                    alt="Hero"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30 rounded-lg"></div>
                  <div className="text-gray-400 text-center z-10">
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

    </div >
  );
};

export default LandingPage;
