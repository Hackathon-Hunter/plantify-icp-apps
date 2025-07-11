// Farm and Investment Project Data
export * from "./farmData";

// Investor Data
export * from "./investorData";

// NFT Data
export * from "./nftData";

// Dashboard and Platform Data
export * from "./dashboardData";

// Helper functions for mock data
export const generateMockFarmerId = (id: number): string => `farmer-${id}-principal`;
export const generateMockInvestorId = (id: number): string => `investor-${id}-principal`;
export const generateMockTokenId = (start: number, count: number): bigint[] => 
  Array.from({ length: count }, (_, i) => BigInt(start + i));

// Mock API delay function for realistic testing
export const mockApiDelay = (ms: number = 1000): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock error generator for testing error scenarios
export const mockError = (message: string): Error => new Error(`Mock Error: ${message}`);

// Mock successful response wrapper
export const mockSuccess = <T>(data: T): { ok: true; data: T } => ({ ok: true, data });

// Mock error response wrapper
export const mockErrorResponse = (message: string): { ok: false; error: string } => ({ 
  ok: false, 
  error: message 
}); 