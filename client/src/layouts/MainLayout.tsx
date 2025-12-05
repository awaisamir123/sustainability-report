import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const [location] = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // If we're on the auth page, just render the children without the dashboard layout
  if (location === "/auth") {
    return <>{children}</>;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - only show if user is authenticated */}
      {user && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar - only show if user is authenticated */}
        {user && <DashboardHeader toggleSidebar={toggleSidebar} />}
        
        {/* Main content area */}
        <main className={`flex-1 overflow-y-auto ${user ? 'p-4 lg:p-6 bg-neutral-100' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
