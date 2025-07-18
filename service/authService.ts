import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';
import { createActor } from './declarations';

// Default auth configuration
const AUTH_CONFIG = {
  identityProvider: 'https://identity.ic0.app/#authorize',
  maxTimeToLive: BigInt(7) * BigInt(24) * BigInt(60) * BigInt(60) * BigInt(1000 * 1000 * 1000), // 7 days in nanoseconds
};

// Singleton instance of AuthClient
let authClient: AuthClient | null = null;

// Initialize the auth client
export const initAuth = async (): Promise<AuthClient> => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const client = await initAuth();
  return await client.isAuthenticated();
};

// Get the current identity
export const getIdentity = async (): Promise<Identity | null> => {
  const client = await initAuth();
  if (await client.isAuthenticated()) {
    return client.getIdentity();
  }
  return null;
};

// Login with Internet Computer
export const login = async (): Promise<boolean> => {
  const client = await initAuth();
  
  return new Promise((resolve) => {
    client.login({
      ...AUTH_CONFIG,
      onSuccess: () => {
        resolve(true);
      },
      onError: (error?: string) => {
        console.error('Login failed:', error);
        resolve(false);
      },
    });
  });
};

// Logout
export const logout = async (): Promise<void> => {
  const client = await initAuth();
  await client.logout();
};

// Create an authenticated actor
export const createAuthenticatedActor = async (canisterId: string) => {
  const identity = await getIdentity();
  if (!identity) {
    throw new Error('Not authenticated');
  }
  
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}; 