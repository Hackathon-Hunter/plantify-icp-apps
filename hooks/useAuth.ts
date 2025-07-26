"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "@/service/declarations/plantify-backend.did";
import type { _SERVICE } from "@/service/declarations/plantify-backend.did";

interface AuthContextType {
  isAuthenticated: boolean;
  principal: Principal | null;
  actor: ActorSubclass<_SERVICE> | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  authClient: AuthClient | null;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  actor: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  authClient: null,
  isInitialized: false,
});

const CANISTER_ID = "a5ptu-ryaaa-aaaai-q32cq-cai";

const getIdentityProviderUrl = () => {
  return "https://identity.ic0.app";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create({
          idleOptions: {
            disableIdle: true,
            disableDefaultIdleCallback: true,
          },
        });

        setAuthClient(client);

        const isAuth = await client.isAuthenticated();

        if (isAuth) {
          const identity = client.getIdentity();
          const userPrincipal = identity.getPrincipal();

          setIsAuthenticated(true);
          setPrincipal(userPrincipal);

          await createActor(identity);
        }
      } catch (error) {
        console.error("❌ Error initializing auth:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  const createActor = async (identity: Identity) => {
    try {
      const agent = new HttpAgent({
        identity,
        host: "https://ic0.app",
      });

      const newActor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: CANISTER_ID,
      });

      setActor(newActor);

      return newActor;
    } catch (error) {
      console.error("❌ Error creating actor:", error);
      throw error;
    }
  };

  const login = async () => {
    if (!authClient) {
      throw new Error("Auth client not initialized");
    }

    try {
      setIsLoading(true);

      const identityProviderUrl = getIdentityProviderUrl();

      await new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider: identityProviderUrl,
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            console.error("❌ Login failed:", error);
            reject(error);
          },
        });
      });

      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();

      setIsAuthenticated(true);
      setPrincipal(userPrincipal);

      await createActor(identity);
    } catch (error) {
      console.error("❌ Login error:", error);
      setIsAuthenticated(false);
      setPrincipal(null);
      setActor(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!authClient) return;

    try {
      await authClient.logout();

      setIsAuthenticated(false);
      setPrincipal(null);
      setActor(null);
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    principal,
    actor,
    login,
    logout,
    isLoading,
    authClient,
    isInitialized,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
