'use client';

import { useState } from 'react';
import { Sprout, Menu, X, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigateToInvestor = () => {
        console.log('Navigating to investor page...');
    };

    return (
        <nav className="p-4 bg-transparent absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <Logo />
                    </div>
                    <span className="text-xl font-bold">PLANTIFY</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-white hover:text-gray-500">Explore</a>
                    <a href="#" className="text-white hover:text-gray-500">How it Works</a>
                    <a href="#" className="text-white hover:text-gray-500">Raise Capital</a>
                    <a href="#" className="text-white hover:text-gray-500">Secondary Market</a>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Button
                        iconLeft={<LogIn />}
                        variant="outline"
                        className="border-white text-white hover:bg-gray-500"
                        onClick={navigateToInvestor}
                    >
                        Sign In
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden border-black"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
                    <div className="flex flex-col space-y-4 mt-4">
                        <a href="#" className="text-white">Explore</a>
                        <a href="#" className="text-white">How it Works</a>
                        <a href="#" className="text-white">Raise Capital</a>
                        <a href="#" className="text-white">Secondary Market</a>
                        <div className="flex flex-col gap-2 pt-4">
                            <Button variant="outline" className="border-white text-white">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
