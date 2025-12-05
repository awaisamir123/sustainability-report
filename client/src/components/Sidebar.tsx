import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import logoImage from "@/assets/logo.png";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const isActive = (path: string) => {
    return location === path;
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <aside 
      className={cn(
        "fixed lg:relative w-64 h-screen bg-white shadow-md z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and brand */}
        <div className="px-4 py-6 flex items-center justify-between border-b border-neutral-200">
          <div className="flex items-center">
            <img 
              src={logoImage}
              alt="Sustainability Reporting Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="ml-3">
              <h1 className="text-lg font-bold text-primary">Sustainability Reporting</h1>
              <p className="text-xs text-neutral-500">ESG Reporting Platform</p>
            </div>
          </div>
          <button className="lg:hidden text-neutral-500" onClick={toggleSidebar}>
            <span className="material-icons">close</span>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-2">
              Core Features
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/landing/report-generator">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/landing/report-generator") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">auto_stories</span>
                    Sustainability Report Generator
                    <span className="ml-auto text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Free</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/dashboard">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/dashboard") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">dashboard</span>
                    Dashboard
                    <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Auth</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-2">
              Calculation Tools
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/ghg-protocol">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/ghg-protocol") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">cloud</span>
                    GHG Protocol Standard
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Paid</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/product-carbon-footprint">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/product-carbon-footprint") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">inventory_2</span>
                    Product Carbon Footprint
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Paid</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/esg-rating">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/esg-rating") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">equalizer</span>
                    ESG Rating Calculator
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Paid</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-2">
              Advanced Services
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/materiality">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/materiality") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">assignment</span>
                    Materiality Assessment
                    <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Consult</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/benchmarks">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/benchmarks") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">timeline</span>
                    Benchmarking
                    <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Consult</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/compliance">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/compliance") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">fact_check</span>
                    Compliance & Certification
                    <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Consult</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-2">
              Subscriptions
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/services">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/services") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">shopping_cart</span>
                    Premium Services
                    <span className="ml-auto text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Free</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/user-services">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/user-services") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">workspace_premium</span>
                    My Subscriptions
                    <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Auth</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-2">
              More
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/blog">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/blog") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">article</span>
                    Blog
                    <span className="ml-auto text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Free</span>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href="/settings">
                  <div className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                    isActive("/settings") 
                      ? "bg-primary/10 text-primary-900 font-semibold" 
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                  )}>
                    <span className="material-icons text-[20px] mr-3">settings</span>
                    Settings
                    <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Auth</span>
                  </div>
                </Link>
              </li>
              
              {user?.role === 'admin' && (
                <li>
                  <Link href="/admin">
                    <div className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                      isActive("/admin") 
                        ? "bg-primary/10 text-primary-900 font-semibold" 
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-900"
                    )}>
                      <span className="material-icons text-[20px] mr-3">admin_panel_settings</span>
                      Admin Panel
                      <span className="ml-auto text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Admin</span>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-8 px-4">
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Reporting Frameworks
              </h3>
              <ul className="mt-3 space-y-1">
                <li>
                  <div className="flex items-center text-sm px-4 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-primary-900 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    GRI
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-sm px-4 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-primary-900 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                    TCFD
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-sm px-4 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-primary-900 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                    ESRS
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-sm px-4 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-primary-900 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                    CDP
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        {/* User profile */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600">
              <span className="material-icons text-[16px]">person</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.displayName || user?.username}</p>
              <p className="text-xs text-neutral-500">
                {user?.role === 'admin' ? 'Administrator' : 
                 user?.role === 'super_admin' ? 'Super Admin' : 
                 'Sustainability Manager'}
              </p>
            </div>
            <button 
              className="ml-auto text-neutral-400 hover:text-neutral-600"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <span className="material-icons text-[20px] animate-spin">sync</span>
              ) : (
                <span className="material-icons text-[20px]">logout</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;