import { Principal } from "@dfinity/principal";

// Mock data for NFT-related functionality
export const mockNFTCollection = {
  investmentId: BigInt(1),
  totalSupply: BigInt(100),
  availableSupply: BigInt(25),
  soldSupply: BigInt(75),
  nftPrice: BigInt(500000),
  tokenIds: Array.from({ length: 100 }, (_, i) => BigInt(i + 1)),
  createdAt: BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000),
};

export const mockFarmNFTMetadata = {
  investmentId: BigInt(1),
  farmerId: Principal.anonymous(),
  nftPrice: BigInt(500000),
  totalSupply: BigInt(100),
  availableSupply: BigInt(25),
  soldSupply: BigInt(75),
  fundingAmount: BigInt(50000000),
  area: "5.5 hectares",
  location: "Magelang, Central Java",
  cropType: "Premium Organic Rice",
  expectedYield: "7 tons per hectare",
  harvestTimeline: "4-5 months",
  projectStatus: "Active",
  createdAt: BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000),
  imageUrl: ["https://example.com/images/farm1.jpg"] as [string],
};

export const mockPurchaseResult = {
  Success: {
    tokenIds: [BigInt(1), BigInt(2), BigInt(3)],
    totalPaid: BigInt(1500000),
    remainingAvailable: BigInt(22),
  },
};

export const mockNFTStats = {
  totalSupply: BigInt(225),
  totalCollections: BigInt(3),
  averagePrice: BigInt(500000),
};

export const mockPricingInfo = {
  nftPrice: BigInt(500000),
  totalSupply: BigInt(100),
  availableSupply: BigInt(25),
  soldSupply: BigInt(75),
  fundingRequired: BigInt(50000000),
  priceInICP: 2.5,
};

export const mockMyNFTs = [
  BigInt(1), BigInt(2), BigInt(3),
  BigInt(101), BigInt(102),
  BigInt(201),
]; 