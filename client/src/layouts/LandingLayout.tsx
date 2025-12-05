import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-grow">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}