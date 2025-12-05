import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

interface PublicReportLayoutProps {
  children: React.ReactNode;
}

const PublicReportLayout: React.FC<PublicReportLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default PublicReportLayout;