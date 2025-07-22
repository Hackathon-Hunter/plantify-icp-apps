'use client'

import React, { useState } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import WarningCard from "@/components/ui/WarningCard"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CheckboxWithLabel from "@/components/ui/CheckboxWithLabel";
import InternetIdentityModal from "@/components/ui/InternetIdentityModal";
import { IcpLogo } from "@/components/icons";

import {
    Wallet,
    X,
    Shield,
    Smartphone,
    Globe,
    Key
} from "lucide-react";

const Checkout = () => {
    const [currentDemo, setCurrentDemo] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-64 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs
                    segments={[
                        { label: "Explore Startups" },
                        { label: "LinguaLearn", active: true },
                    ]}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-3 w-full">
                        <div className="bg-neutral-900 p-4 w-full flex flex-col gap-3">
                            <span className="text-white">Investment Summary</span>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500">Company</span>
                                <span className="text-white">LinguaLearn</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500">Valuation</span>
                                <span className="text-white">$2.5M</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500">Security Type</span>
                                <span className="text-white">Tokanized SPV</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500">Price per NFT</span>
                                <span className="text-white">$1</span>
                            </div>
                        </div>

                        <div className="bg-neutral-900 p-4 w-full flex flex-col gap-3">
                            <span className="text-white">How Your Investment Works</span>
                            <div className="flex gap-2">
                                <span>1.</span>
                                <p className="text-neutral-500">
                                    <span className="text-white">Escrow</span><br />
                                    Your funds are held in a smart contract escrow until the campaign closes.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span>2.</span>
                                <p className="text-neutral-500">
                                    <span className="text-white">NFT Distribution</span><br />
                                    If successful, you receive NFTs representing your SPV membership interest.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span>3.</span>
                                <p className="text-neutral-500">
                                    <span className="text-white">Secondary Trading</span><br />
                                    Trade your NFTs on our compliant secondary marketplace for liquidity.
                                </p>
                            </div>
                        </div>

                        <WarningCard
                            title="Investment Risk"
                            description={[
                                "High Risk: Startups have a high failure rate. You could lose your entire investment.",
                                "Illiquidity: Your investment may be difficult to sell, even on the secondary market.",
                                "No Guarantee: There is no guarantee of returns or that the company will succeed.",
                                "Dilution: Your ownership percentage may decrease with future funding rounds."
                            ]}
                        />
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col gap-3 w-full">
                        <div className="bg-neutral-800 p-4 w-full flex flex-col gap-3">
                            <span className="text-2xl text-white">Invest in LinguaLearn</span>
                            <div className="flex justify-between">
                                <span className="text-neutral-500">Founded by</span>
                                <span className="text-white">Anya Rodriguez</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-500">Valued at</span>
                                <span className="text-white">$2.5M</span>
                            </div>

                            <div className="border-2 border-dashed border-neutral-600"></div>
                            <span className="text-white"></span>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                iconLeft={<IcpLogo style={{ width: '30px', height: 'auto' }} />}
                                size="lg"
                                className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-full"
                            >
                                Connect your ICP Wallet
                            </Button>

                            <div className="border-2 border-dashed border-neutral-600"></div>

                            <span className="text-white">Investment Amount (USD)</span>
                            <Input placeholder="Minimum $10" bgClass="bg-neutral-700 text-black" />
                            <CheckboxWithLabel
                                label={
                                    <>
                                        I agree to the{" "}
                                        <a href="/terms" className="underline text-white" target="_blank" rel="noopener noreferrer">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="/terms" className="underline text-white" target="_blank" rel="noopener noreferrer">
                                            Terms of Service
                                        </a>{" "}
                                        Subscription Agreement
                                    </>
                                }
                            />
                            <div className="border-2 border-dashed border-neutral-600"></div>
                            <Button
                                disabled
                                iconLeft={<Wallet size={25} />}
                                size="lg"
                                className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-full"
                            >
                                Invest
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <InternetIdentityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <Footer />
        </div>
    )
}

export default Checkout;