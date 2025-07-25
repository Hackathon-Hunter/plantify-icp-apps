'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { CardVertical } from "@/components/ui/CardVertical"
import { CardHorizontal } from "@/components/ui/CardHorizontal"
import Navbar from "@/components/ui/Navbar";
import { IcpLogo } from "@/components/icons";

import { calculateProjectedIncome } from '@/utils/returnCalculator';

import {
  ChevronDown,
  Search,
  BanknoteArrowUp,
  Menu,
  X,
} from "lucide-react";

const INDUSTRY_PRICING: Record<string, number> = {
  fintech: 1.2,
  health: 1.0,
  edtech: 0.8,
};

const LandingPage = () => {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [investment, setInvestment] = useState<number | string>('');
  const [period, setPeriod] = useState(5);
  const [yieldType, setYieldType] = useState<'last' | 'average'>('last');
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [plan, setPlan] = useState<'one-time' | 'monthly'>('one-time');
  const [projected, setProjected] = useState({ totalReturn: '0', totalAsset: '0' });

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
  }, [investment, period, yieldType, autoReinvest]);


  const navigateToFarmer = () => router.push('farmer/registration');
  const navigateToInvestor = () => router.push('investor/marketplace');

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

  const campaigns = [
    {
      imageUrl: "/assets/images/built-1.png",
      title: "Raise Capital, Build Community",
      description:
        "Use your fundraising page to showcase your product and vision. Set your terms, upload your pitch deck, and connect directly with investors.",
      buttonText: "Create a Campaign",
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

  const fair = [
    {
      imageUrl: "/assets/images/founder-1.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: false,
    },
    {
      imageUrl: "/assets/images/founder-2.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: true,
    },
    {
      imageUrl: "/assets/images/founder-3.png",
      description:
        "7.5% commission only if your campaign succeeds",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-36 sm:pt-44 md:pt-56 lg:pt-64 pb-0 md:pb-24 bg-black"
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
        <div className="w-full h-full lg:pt-34 sm:pt-24 pt-[100px] px-4 bg-cover bg-center bg-no-repeat overflow-hidden lg:mt-[-200px] sm:mt-[-10px] mt-[-100px]"
          style={{
            backgroundImage: "url('/assets/images/bg-gradient.png')"
          }}
        >
          <div className="relative max-w-7xl mx-auto sm:pt-0 lg:pt-64 sm:px-12 lg:px-44">
            <div className="relative w-full h-full">
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
              imageUrl="/assets/images/power-1.png"
              title="Built on Internet Computer (ICP)"
              description="Our platform runs on ICP’s high-speed, scalable, gasless blockchain—enabling real-time tokenization and secure smart contracts for every deal."
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

      {/* Return Calculator */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-44 bg-black text-white">
        <h2 className="text-center text-2xl font-semibold mb-8">Return Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
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

            <div>
              <label className="text-sm mb-2 block">Period ({period} year)</label>
              <input
                type="range"
                min={1}
                max={10}
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="w-full"
              />
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
                <div className="flex flex-col gap-3 sm:w-full w-full">
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
