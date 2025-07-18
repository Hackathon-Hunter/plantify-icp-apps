'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useAuth } from '@/lib/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoggedIn, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (isLoggedIn && !loading) {
      router.push('/');
    }
  }, [isLoggedIn, loading, router]);

  const handleIcpLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await login();
      if (success) {
        router.push('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-bold text-gray-800 opacity-30 select-none leading-none tracking-tighter text-center whitespace-nowrap">
          Plantify
        </div>
      </div>

      <Card className="w-full max-w-md bg-white shadow-lg border-0 z-10">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-black rounded flex items-center justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold">Sign In to Plantify</h1>
            <p className="text-gray-500 mt-2 text-center">
              Connect with Internet Computer to access your account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 py-6 flex items-center justify-center gap-3"
              onClick={handleIcpLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ShieldCheck className="h-5 w-5" />
              )}
              {isLoading ? 'Connecting...' : 'Connect with Internet Computer'}
            </Button>

                         <div className="text-center text-gray-500 text-sm">
              <p>
                Don&apos;t have an account?{' '}
                <a
                  href="/investor/registration"
                  className="text-black font-medium hover:underline"
                >
                  Register as Investor
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="/farmer/registration"
                  className="text-black font-medium hover:underline"
                >
                  Register as Farmer
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage; 