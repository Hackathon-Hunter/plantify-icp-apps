'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description:
        "Blockchain-powered platform ensures complete transparency and security for all transactions.",
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description:
        "Connect with agricultural projects worldwide and diversify your investment portfolio.",
    },
    {
      icon: BarChart3,
      title: "Real-time Tracking",
      description:
        "Monitor your investments with live updates on crop growth and harvest progress.",
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description:
        "Support eco-friendly agricultural practices while earning competitive returns.",
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <Sprout size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">PLANTIFY</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-black">
              How it Works
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Projects
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
              onClick={navigateToInvestor}
            >
              Sign In
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800" onClick={navigateToInvestor}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#" className="text-gray-700">
                How it Works
              </a>
              <a href="#" className="text-gray-700">
                Projects
              </a>
              <a href="#" className="text-gray-700">
                About
              </a>
              <a href="#" className="text-gray-700">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="border-black text-black">
                  Sign In
                </Button>
                <Button className="bg-black text-white">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridging Farmers and Investors
            <br />
            <span className="text-gray-600">Through NFTs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Invest in the harvest. Discover Agriculture with Plantify! Tokens,
            flows, and grow with NFT-driven farming projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4"
              onClick={navigateToInvestor}
            >
              Connect Wallet
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-gray-100 text-lg px-8 py-4"
              onClick={navigateToInvestor}
            >
              Explore Projects
            </Button>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative">
            <div className="w-full h-96 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-lg font-medium text-gray-700">
                  Platform Demo Visualization
                </p>
                <p className="text-gray-500">
                  Interactive farming dashboard mockup
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 left-4 bg-white border border-black rounded-lg p-3 shadow-sm">
              <div className="text-2xl mb-1">🌾</div>
              <p className="text-xs font-medium">Rice Farm</p>
              <p className="text-xs text-green-600">+15% ROI</p>
            </div>

            <div className="absolute top-4 right-4 bg-white border border-black rounded-lg p-3 shadow-sm">
              <div className="text-2xl mb-1">☕</div>
              <p className="text-xs font-medium">Coffee Plantation</p>
              <p className="text-xs text-green-600">+22% ROI</p>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-lg p-3 shadow-sm">
              <div className="text-2xl mb-1">🍎</div>
              <p className="text-xs font-medium">Apple Orchard</p>
              <p className="text-xs text-green-600">+18% ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent size={32} className="mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Plantify?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of agricultural investment with our
              innovative blockchain platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-black text-center p-6"
                >
                  <CardContent className="p-0">
                    <IconComponent size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Start your agricultural investment journey in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight
                    size={24}
                    className="mx-auto mt-6 text-gray-400 hidden lg:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied farmers and investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Investment?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Plantify today and start investing in sustainable agriculture
            with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4"
              onClick={navigateToInvestor}
            >
              Start Investing
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black text-lg px-8 py-4"
              onClick={navigateToFarmer}
            >
              List Your Farm
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                  <Sprout size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold">PLANTIFY</span>
              </div>
              <p className="text-gray-600 text-sm">
                Connecting farmers and investors through blockchain technology
                for sustainable agriculture.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Browse Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Plantify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
