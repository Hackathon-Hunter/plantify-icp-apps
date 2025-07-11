import { Principal } from "@dfinity/principal";

// Mock data for investor-related functionality
export const mockInvestorId = Principal.anonymous();

export const mockInvestorProfile = {
  investorId: mockInvestorId,
  fullName: "Michael Johnson",
  email: "michael.johnson@example.com",
  registrationDate: BigInt(Date.now() - 90 * 24 * 60 * 60 * 1000),
  lastUpdated: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
  status: { Active: null },
  isActive: true,
  totalInvestmentAmount: BigInt(50000000),
  portfolioValue: BigInt(55000000),
  activeInvestments: BigInt(3),
};

export const mockInvestorInvestment = {
  investmentId: BigInt(1),
  investmentAmount: BigInt(25000000),
  currentValue: BigInt(27500000),
  purchaseDate: BigInt(Date.now() - 45 * 24 * 60 * 60 * 1000),
  status: { Active: null },
  nftTokenIds: [BigInt(101), BigInt(102), BigInt(103)],
};

// Completed investment with actual returns
export const mockCompletedInvestment = {
  investmentId: BigInt(4), // Matches the completed fruit project
  investmentAmount: BigInt(2000000), // 2M IDR investment
  currentValue: BigInt(2600000), // 2.6M IDR current value (30% ROI)
  purchaseDate: BigInt(Date.now() - 150 * 24 * 60 * 60 * 1000), // 5 months ago
  status: { Matured: null }, // Investment has matured/completed
  nftTokenIds: [BigInt(401), BigInt(402)],
};

export const mockInvestorPortfolio = {
  investor: mockInvestorProfile,
  investments: [mockInvestorInvestment, mockCompletedInvestment],
  totalValue: BigInt(57600000), // Updated to include completed investment value
  totalReturns: BigInt(5600000), // Updated to include returns from completed investment  
  roiPercentage: 12.0, // Updated average ROI
};

export const mockTopInvestors = [
  {
    ...mockInvestorProfile,
    totalInvestmentAmount: BigInt(100000000),
    portfolioValue: BigInt(125000000),
    activeInvestments: BigInt(8),
  },
  {
    ...mockInvestorProfile,
    investorId: Principal.anonymous(),
    fullName: "Sarah Williams",
    email: "sarah.williams@example.com",
    totalInvestmentAmount: BigInt(75000000),
    portfolioValue: BigInt(90000000),
    activeInvestments: BigInt(5),
  },
]; 