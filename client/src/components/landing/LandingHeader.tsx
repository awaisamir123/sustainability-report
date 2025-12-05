import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ArrowRight } from 'lucide-react';
import logoImage from '@/assets/logo.png';

export function LandingHeader() {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src={logoImage}
                  alt="Sustainability Reporting Logo" 
                  className="w-12 h-12 object-contain mr-2"
                />
                <span className="font-bold text-xl text-gray-900">Sustainability Reporting</span>
              </div>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/landing/report-generator">
              <div className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Report Generator</div>
            </Link>
            <Link href="/landing/sustainability-statement">
              <div className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Statement Builder</div>
            </Link>
            <Link href="/landing/emissions-calculator">
              <div className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Emissions Calculator</div>
            </Link>
            <Link href="/landing/benchmarking">
              <div className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Benchmarking</div>
            </Link>
            <Link href="/landing/compliance">
              <div className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Compliance</div>
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white hidden md:inline-flex" asChild>
                  <Link href="/dashboard">
                    Access Full Platform <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-600 hover:text-teal-600" asChild>
                  <Link href="/auth">
                    Login
                  </Link>
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 hidden md:inline-flex" asChild>
                  <Link href="/auth">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}