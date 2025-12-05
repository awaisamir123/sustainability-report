import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  // Determine page title based on current route
  const getPageTitle = () => {
    switch (location) {
      case '/':
        return 'Dashboard';
      case '/data-input':
        return 'Data Input';
      case '/emissions':
        return 'Emissions Tracking';
      case '/reports':
        return 'Reports';
      case '/benchmarks':
        return 'Benchmarks';
      case '/compliance':
        return 'Compliance';
      case '/collaboration':
        return 'Collaboration';
      case '/settings':
        return 'Settings';
      case '/materiality':
        return 'Materiality Assessment';
      case '/esg-rating':
        return 'ESG Rating Calculator';
      case '/product-carbon-footprint':
        return 'Product Carbon Footprint';
      default:
        return 'Dashboard';
    }
  };
  
  // Page subtitle based on title
  const getPageSubtitle = () => {
    switch (getPageTitle()) {
      case 'Dashboard':
        return 'Overview of your sustainability metrics';
      case 'Data Input':
        return 'Input and manage your sustainability data';
      case 'Emissions Tracking':
        return 'Track and analyze your carbon emissions';
      case 'Reports':
        return 'Generate and manage sustainability reports';
      case 'Benchmarks':
        return 'Compare your performance against industry benchmarks';
      case 'Compliance':
        return 'Manage your regulatory compliance';
      case 'Collaboration':
        return 'Collaborate with your team on sustainability';
      case 'Settings':
        return 'Configure your sustainability reporting preferences';
      case 'Materiality Assessment':
        return 'Identify and prioritize sustainability topics';
      case 'ESG Rating Calculator':
        return 'Calculate and analyze ESG performance scores';
      case 'Product Carbon Footprint':
        return 'Calculate product lifecycle emissions';
      default:
        return 'Overview of your sustainability metrics';
    }
  };
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button className="text-neutral-500 lg:hidden" onClick={toggleSidebar}>
            <span className="material-icons">menu</span>
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            <p className="text-sm text-neutral-500">{getPageSubtitle()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 text-neutral-500 hover:text-neutral-700 rounded-full">
              <span className="material-icons">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center text-sm text-neutral-700 focus:outline-none">
              <span>EN</span>
              <span className="material-icons text-neutral-400 text-[18px] ml-1">arrow_drop_down</span>
            </button>
          </div>
          
          <div className="hidden md:flex">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <span className="material-icons text-[18px] mr-1">add</span>
              New Report
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-1 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors">
                <span className="material-icons text-[24px]">account_circle</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center space-x-3 py-2">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-medium text-xl">
                    {user?.displayName?.charAt(0) || user?.username?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">{user?.displayName || user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">{user?.email || ""}</p>
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded mt-1 inline-block">
                      {user?.role || "User"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <span className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <span className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  Settings
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <span className="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </span>
                    Admin Panel
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer"
                onClick={() => logoutMutation.mutate()}
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </span>
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
