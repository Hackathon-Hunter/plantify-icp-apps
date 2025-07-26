"use client";

import React, { useState, useEffect } from "react";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WarningCard from "@/components/ui/WarningCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CheckboxWithLabel from "@/components/ui/CheckboxWithLabel";
import InternetIdentityModal from "@/components/ui/InternetIdentityModal";
import { IcpLogo } from "@/components/icons";

import { Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ActorSubclass } from "@dfinity/agent";
import {
  purchaseNFTs,
  getProject,
  getNFTCollectionsByProject,
  getMyInvestorProfile,
} from "@/service/api/plantifyService";
import type {
  _SERVICE,
  NFTCollection,
  PurchaseResult,
  Project,
  Investor,
} from "@/service/declarations/plantify-backend.did";

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_success, setSuccess] = useState<string | null>(null);
  const [collection, setCollection] = useState<NFTCollection | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [investorProfile, setInvestorProfile] = useState<Investor | null>(null);
  const [checkingInvestor, setCheckingInvestor] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState<
    "ready" | "processing" | "success" | "error"
  >("ready");
  const [transactionDetails, setTransactionDetails] = useState<{
    investmentId?: string;
    tokenIds?: string[];
    totalAmount?: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { actor, isAuthenticated, login, principal } = useAuth();
  const projectId = searchParams.get("id");

  // Check authentication and investor profile when component mounts or auth changes
  useEffect(() => {
    const checkUserStatus = async () => {
      console.log("🔍 Checkout Debug - Auth Status:", {
        isAuthenticated,
        actor: !!actor,
      });

      // If not authenticated, show the Internet Identity modal
      if (!isAuthenticated) {
        setIsModalOpen(true);
        return;
      }

      // If authenticated but no actor yet, wait
      if (!actor) {
        return;
      }

      // Check if user is registered as investor
      setCheckingInvestor(true);
      try {
        console.log("🔍 Checkout Debug - Checking investor profile...");
        const profile = await getMyInvestorProfile(
          actor as ActorSubclass<_SERVICE>
        );

        console.log("🔍 Checkout Debug - Investor profile:", profile);

        if (!profile) {
          // User is authenticated but not registered as investor
          // Redirect to investor registration
          console.log(
            "🔍 Checkout Debug - No investor profile, redirecting to registration"
          );
          router.push("/register/investor");
          return;
        }

        setInvestorProfile(profile);
        console.log("🔍 Checkout Debug - Investor profile set successfully");
      } catch (err) {
        console.error(
          "🔍 Checkout Debug - Error checking investor profile:",
          err
        );
        // If there's an error checking profile, assume they need to register
        router.push("/register/investor");
      } finally {
        setCheckingInvestor(false);
      }
    };

    checkUserStatus();
  }, [isAuthenticated, actor, router]);

  // Load project data
  React.useEffect(() => {
    if (!actor || !projectId || !investorProfile) return;

    console.log("🔍 Checkout Debug - Loading project data for:", projectId);
    setProjectLoading(true);
    setProjectError(null);

    getProject(actor as ActorSubclass<_SERVICE>, projectId)
      .then((data) => {
        console.log("🔍 Checkout Debug - Project loaded:", data);
        setProject(data || null);
      })
      .catch((err) => {
        console.error("🔍 Checkout Debug - Failed to load project:", err);
        setProjectError("Failed to load project");
      })
      .finally(() => setProjectLoading(false));
  }, [actor, projectId, investorProfile]);

  // Load NFT collection
  React.useEffect(() => {
    if (!actor || !projectId || !investorProfile) return;

    console.log(
      "🔍 Checkout Debug - Loading NFT collections for project:",
      projectId
    );
    getNFTCollectionsByProject(actor as ActorSubclass<_SERVICE>, projectId)
      .then((collections) => {
        console.log("🔍 Checkout Debug - Collections loaded:", collections);
        setCollection(collections[0] || null);
      })
      .catch((err) => {
        console.error("🔍 Checkout Debug - Failed to load collections:", err);
        setCollection(null);
      });
  }, [actor, projectId, investorProfile]);

  React.useEffect(() => {
    setAgreed(false);
  }, [projectId, collection]);

  const handleLogin = async () => {
    try {
      console.log("🔍 Checkout Debug - Starting login...");
      await login();
      setIsModalOpen(false);
      console.log("🔍 Checkout Debug - Login successful");
    } catch (error) {
      console.error("🔍 Checkout Debug - Login failed:", error);
      setError("Failed to connect with Internet Identity. Please try again.");
    }
  };

  const validatePurchase = () => {
    if (!actor) {
      setError("Not connected to blockchain. Please refresh and try again.");
      return false;
    }

    if (!projectId) {
      setError("Invalid project ID.");
      return false;
    }

    if (!collection) {
      setError("NFT collection not found.");
      return false;
    }

    if (!investorProfile) {
      setError("Investor profile not found. Please register first.");
      return false;
    }

    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      return false;
    }

    if (!agreed) {
      setError("Please agree to the terms and conditions.");
      return false;
    }

    // Check if enough NFTs are available
    const remainingSupply =
      Number(collection.maxSupply) - Number(collection.totalSupply);
    if (quantity > remainingSupply) {
      setError(
        `Only ${remainingSupply} NFTs remaining. Please reduce your quantity.`
      );
      return false;
    }

    return true;
  };

  const handleInvest = async () => {
    console.log("🔍 Checkout Debug - Starting investment...");

    // Reset states
    setError(null);
    setSuccess(null);
    setPurchaseStep("processing");

    // Validate purchase
    if (!validatePurchase()) {
      setPurchaseStep("error");
      return;
    }

    setLoading(true);

    try {
      console.log("🔍 Checkout Debug - Purchase details:", {
        projectId,
        collectionId: collection!.id,
        quantity,
        pricePerToken: collection!.pricePerToken.toString(),
        investorId: investorProfile!.id,
        principal: principal,
      });

      // Calculate payment amount
      const paymentAmount = collection!.pricePerToken * BigInt(quantity);
      console.log(
        "🔍 Checkout Debug - Payment amount:",
        paymentAmount.toString()
      );

      // Create purchase request
      const purchaseRequest = {
        collectionId: collection!.id,
        projectId: projectId!,
        quantity: BigInt(quantity),
        paymentAmount,
      };

      console.log(
        "🔍 Checkout Debug - Calling purchaseNFTs with:",
        purchaseRequest
      );

      // Call the purchase function
      const result: PurchaseResult = await purchaseNFTs(
        actor as ActorSubclass<_SERVICE>,
        purchaseRequest
      );

      console.log("🔍 Checkout Debug - Purchase result:", result);

      if ("ok" in result) {
        // Success case
        const investment = result.ok;

        setTransactionDetails({
          investmentId: investment.id,
          tokenIds: investment.tokenIds.map((id) => id.toString()),
          totalAmount: (Number(paymentAmount) / 1e8).toFixed(2),
        });

        setSuccess(
          `Investment successful! You've purchased ${quantity} NFT${
            quantity > 1 ? "s" : ""
          } for $${(Number(paymentAmount) / 1e8).toFixed(2)}`
        );
        setPurchaseStep("success");

        console.log("🔍 Checkout Debug - Investment successful:", {
          investmentId: investment.id,
          tokenIds: investment.tokenIds,
          amount: investment.amount.toString(),
        });
      } else {
        // Error case
        const errorMessage = result.err || "Investment failed";
        console.error("🔍 Checkout Debug - Investment failed:", errorMessage);
        setError(errorMessage);
        setPurchaseStep("error");
      }
    } catch (err) {
      console.error("🔍 Checkout Debug - Investment error:", err);
      setError(
        "Investment failed due to an unexpected error. Please try again."
      );
      setPurchaseStep("error");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPortfolio = () => {
    router.push("/investor/dashboard");
  };

  const handleInvestMore = () => {
    // Reset states for another investment
    setError(null);
    setSuccess(null);
    setTransactionDetails(null);
    setPurchaseStep("ready");
    setQuantity(1);
    setAgreed(false);
  };

  // Show loading state while checking investor status
  if (checkingInvestor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-64 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950">
          <div className="flex justify-center items-center p-10">
            <Loader2 className="animate-spin text-white mr-2" size={24} />
            <span className="text-white">Verifying your account...</span>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Don't render the main content if not authenticated or not an investor
  if (!isAuthenticated || !investorProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <InternetIdentityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          buttons={[
            {
              text: "Sign In with Internet Identity",
              onClick: handleLogin,
              variant: "primary" as const,
              icon: undefined,
            },
            {
              text: "Cancel",
              onClick: () => router.push("/"),
              variant: "secondary" as const,
              icon: undefined,
            },
          ]}
        />

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-64 pt-20 sm:pt-32 md:pt-44 pb-16 md:pb-24 bg-neutral-950">
        <Breadcrumbs
          segments={[
            { label: "Explore Startups" },
            { label: project?.companyName || "-", active: true },
          ]}
        />

        {projectLoading ? (
          <div className="flex justify-center items-center p-10">
            <Loader2 className="animate-spin text-white mr-2" size={24} />
            <span className="text-white">Loading project...</span>
          </div>
        ) : projectError ? (
          <div className="text-red-500 text-center p-6">{projectError}</div>
        ) : !project ? (
          <div className="text-gray-400 text-center p-6">
            Project not found.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            {/* col 1 */}
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-neutral-900 p-4 w-full flex flex-col gap-3">
                <span className="text-white">Investment Summary</span>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Company</span>
                  <span className="text-white">{project.companyName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Valuation</span>
                  <span className="text-white">
                    ${Number(project.companyValuation) / 1e8}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Security Type</span>
                  <span className="text-white">Tokenized SPV</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Price per NFT</span>
                  <span className="text-white">
                    {collection
                      ? `$${Number(collection.pricePerToken) / 1e8}`
                      : "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Available NFTs</span>
                  <span className="text-white">
                    {collection
                      ? `${
                          Number(collection.maxSupply) -
                          Number(collection.totalSupply)
                        } / ${Number(collection.maxSupply)}`
                      : "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Investor</span>
                  <span className="text-white">{investorProfile.fullName}</span>
                </div>
              </div>

              {/* Success Transaction Details */}
              {purchaseStep === "success" && transactionDetails && (
                <div className="bg-green-950 p-4 w-full flex flex-col gap-3 border border-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={20} />
                    <span className="text-green-300 font-semibold">
                      Investment Successful!
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Investment ID</span>
                    <span className="text-white font-mono text-sm">
                      {transactionDetails.investmentId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">NFTs Purchased</span>
                    <span className="text-white">{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Total Amount</span>
                    <span className="text-white">
                      ${transactionDetails.totalAmount}
                    </span>
                  </div>
                  {transactionDetails.tokenIds &&
                    transactionDetails.tokenIds.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-green-200">Token IDs</span>
                        <span className="text-white font-mono text-sm">
                          {transactionDetails.tokenIds.slice(0, 3).join(", ")}
                          {transactionDetails.tokenIds.length > 3 && "..."}
                        </span>
                      </div>
                    )}
                </div>
              )}

              <div className="bg-neutral-900 p-4 w-full flex flex-col gap-3">
                <span className="text-white">How Your Investment Works</span>
                <div className="flex gap-2">
                  <span>1.</span>
                  <p className="text-neutral-500">
                    <span className="text-white">Escrow</span>
                    <br />
                    Your funds are held in a smart contract escrow until the
                    startup closes.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span>2.</span>
                  <p className="text-neutral-500">
                    <span className="text-white">NFT Distribution</span>
                    <br />
                    If successful, you receive NFTs representing your SPV
                    membership interest.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span>3.</span>
                  <p className="text-neutral-500">
                    <span className="text-white">Secondary Trading</span>
                    <br />
                    Trade your NFTs on our compliant secondary marketplace for
                    liquidity.
                  </p>
                </div>
              </div>

              <WarningCard
                title="Investment Risk"
                description={[
                  "High Risk: Startups have a high failure rate. You could lose your entire investment.",
                  "Illiquidity: Your investment may be difficult to sell, even on the secondary market.",
                  "No Guarantee: There is no guarantee of returns or that the company will succeed.",
                  "Dilution: Your ownership percentage may decrease with future funding rounds.",
                ]}
              />
            </div>

            {/* col 2 */}
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-neutral-800 p-4 w-full flex flex-col gap-3">
                <span className="text-2xl text-white">
                  Invest in {project.companyName}
                </span>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Founded by</span>
                  <span className="text-white">{project.founderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Valued at</span>
                  <span className="text-white">
                    ${Number(project.companyValuation) / 1e8}
                  </span>
                </div>

                <div className="border-2 border-dashed border-neutral-600"></div>

                {/* Wallet Connection Status */}
                <div className="bg-green-950 p-3 rounded-md flex items-center gap-2">
                  <IcpLogo style={{ width: "20px", height: "auto" }} />
                  <span className="text-green-300 text-sm">
                    ✓ Connected as {investorProfile.fullName}
                  </span>
                </div>

                <div className="border-2 border-dashed border-neutral-600"></div>

                {purchaseStep === "success" ? (
                  // Success state - show action buttons
                  <div className="flex flex-col gap-3">
                    <div className="text-center py-4">
                      <CheckCircle
                        className="mx-auto text-green-400 mb-2"
                        size={48}
                      />
                      <h3 className="text-white text-xl font-semibold mb-2">
                        Investment Complete!
                      </h3>
                      <p className="text-neutral-400">
                        Your NFTs have been successfully purchased and added to
                        your portfolio.
                      </p>
                    </div>

                    <Button
                      onClick={handleViewPortfolio}
                      size="lg"
                      className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-full"
                    >
                      View My Portfolio
                    </Button>

                    <Button
                      onClick={handleInvestMore}
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-black text-sm px-4 py-4 w-full"
                    >
                      Invest More
                    </Button>
                  </div>
                ) : (
                  // Investment form
                  <>
                    <span className="text-white">
                      Investment Amount (NFT Quantity)
                    </span>
                    <Input
                      placeholder="Enter quantity"
                      bgClass="bg-neutral-700 text-white"
                      type="number"
                      min={1}
                      max={
                        collection
                          ? Number(collection.maxSupply) -
                            Number(collection.totalSupply)
                          : undefined
                      }
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      disabled={loading || purchaseStep === "processing"}
                    />

                    {collection && (
                      <div className="text-sm text-neutral-400">
                        Total: $
                        {(
                          (Number(collection.pricePerToken) / 1e8) *
                          quantity
                        ).toFixed(2)}
                      </div>
                    )}

                    <CheckboxWithLabel
                      label={
                        <>
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="underline text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="/subscription-agreement"
                            className="underline text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Subscription Agreement
                          </a>
                        </>
                      }
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={loading || purchaseStep === "processing"}
                    />

                    <div className="border-2 border-dashed border-neutral-600"></div>

                    {error && (
                      <div className="bg-red-950 p-3 rounded-md flex items-center gap-2">
                        <AlertCircle className="text-red-400" size={16} />
                        <span className="text-red-300">{error}</span>
                      </div>
                    )}

                    <Button
                      iconLeft={
                        loading || purchaseStep === "processing" ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Wallet size={20} />
                        )
                      }
                      size="lg"
                      className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-full"
                      onClick={handleInvest}
                      disabled={
                        loading ||
                        purchaseStep === "processing" ||
                        !actor ||
                        !projectId ||
                        !collection ||
                        quantity < 1 ||
                        !agreed ||
                        !investorProfile
                      }
                    >
                      {purchaseStep === "processing"
                        ? "Processing Investment..."
                        : loading
                        ? "Connecting..."
                        : "Invest Now"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
