import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

interface PublicLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingHeader />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      
      {showFooter && <LandingFooter />}
    </div>
  );
};

export default PublicLayout;