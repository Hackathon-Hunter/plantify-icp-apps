"use client";

import React from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";

import { CircleCheckBig, ArrowRight } from "lucide-react";
import DarkVeil from "@/components/ui/DarkVeil/DarkVeil";

export default function Register() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950">
          <div className="flex justify-center">
            <Breadcrumbs segments={[{ label: "Back to Home" }]} />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Investor Card */}
            <div className="bg-neutral-800 p-6 flex flex-col gap-5 w-full rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-white text-xl font-semibold">
                  I&apos;m an Investor
                </span>
                <small className="text-neutral-500">
                  Discover and invest in promising startups with as little as $100
                </small>
              </div>

              <div className="border border-dashed border-neutral-500"></div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Browse vetted startup projects</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Own tokenized equity NFTs</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Trade on secondary marketplace</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Track portfolio performance</span>
                </div>
              </div>

              <div className="border border-dashed border-neutral-500"></div>

              <Button
                iconRight={<ArrowRight />}
                size="lg"
                justify="center"
                className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-full"
              >
                Sign Up as Investor
              </Button>
            </div>

            {/* Founder Card */}
            <div className="bg-neutral-800 p-6 flex flex-col gap-5 w-full rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-white text-xl font-semibold">
                  I’m a Startup Founder
                </span>
                <small className="text-neutral-500">
                  Raise capital from a global community of investors
                </small>
              </div>

              <div className="border border-dashed border-neutral-500"></div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Raise capital from a global community of investors</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Access global investor network</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Compliant fundraising process</span>
                </div>
                <div className="flex gap-2 text-white">
                  <CircleCheckBig />
                  <span>Manage investor relations</span>
                </div>
              </div>

              <div className="border border-dashed border-neutral-500"></div>

              <Button
                iconRight={<ArrowRight />}
                size="lg"
                justify="center"
                className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-full"
              >
                Sign Up as Founder
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
