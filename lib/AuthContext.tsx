'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, login, logout, getIdentity } from '@/service/authService';
import { Identity } from '@dfinity/agent';

type AuthContextType = {
  isLoggedIn: boolean;
  identity: Identity | null;
  loading: boolean;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsLoggedIn(authenticated);
        
        if (authenticated) {
          const userIdentity = await getIdentity();
          setIdentity(userIdentity);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const success = await login();
      if (success) {
        setIsLoggedIn(true);
        const userIdentity = await getIdentity();
        setIdentity(userIdentity);
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setIdentity(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        identity,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 