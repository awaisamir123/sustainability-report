import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import DataInput from "@/pages/data-input";
import Reports from "@/pages/reports";
import ReportGenerator from "@/pages/report-generator";
import Compliance from "@/pages/compliance";
import Benchmarks from "@/pages/benchmarks";
import Settings from "@/pages/settings";
import AuthPage from "@/pages/auth-page";
import ProductCarbonFootprint from "@/pages/product-carbon-footprint";
import ESGRating from "@/pages/esg-rating";
import MaterialityAssessment from "@/pages/materiality";
import GHGProtocolPage from "@/pages/ghg-protocol";
import Blog from "@/pages/blog";
import AboutUsPage from "@/pages/about";
import CareersPage from "@/pages/careers";
import ContactPage from "@/pages/contact";
import SustainabilityStatementPage from "@/pages/sustainability-statement";
import ServicesPage from "@/pages/services";
import UserServicesPage from "@/pages/user-services";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import MainLayout from "@/layouts/MainLayout";
import PublicReportLayout from "@/layouts/PublicReportLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Landing pages for public access
import HomeLanding from "@/pages/landing/home-landing";
import ReportGeneratorLanding from "@/pages/landing/report-generator-landing";
import EmissionsCalculatorLanding from "@/pages/landing/emissions-calculator-landing";
import BenchmarkingLanding from "@/pages/landing/benchmarking-landing";
import ComplianceLanding from "@/pages/landing/compliance-landing";
import SustainabilityStatementLanding from "@/pages/landing/sustainability-statement-landing";
import TCFDLanding from "@/pages/landing/tcfd-landing";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Switch>
            {/* Public landing pages - use their own layouts */}
            <Route path="/landing/report-generator" component={ReportGeneratorLanding} />
            <Route path="/landing/sustainability-statement" component={SustainabilityStatementLanding} />
            <Route path="/landing/emissions-calculator" component={EmissionsCalculatorLanding} />
            <Route path="/landing/benchmarking" component={BenchmarkingLanding} />
            <Route path="/landing/compliance" component={ComplianceLanding} />
            <Route path="/landing/tcfd" component={TCFDLanding} />
            <Route path="/blog" component={() => (
              <PublicLayout>
                <Blog />
              </PublicLayout>
            )} />
            <Route path="/about" component={() => (
              <PublicLayout>
                <AboutUsPage />
              </PublicLayout>
            )} />
            <Route path="/careers" component={() => (
              <PublicLayout>
                <CareersPage />
              </PublicLayout>
            )} />
            <Route path="/contact" component={() => (
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            )} />
            
            {/* Public route to report generator - without dashboard header */}
            <Route path="/report-generator" component={() => (
              <PublicReportLayout>
                <ReportGenerator />
              </PublicReportLayout>
            )} />
            
            {/* Sustainability Statement Builder - public route */}
            <Route path="/sustainability-statement" component={SustainabilityStatementPage} />
            
            {/* Services pages - public can view but requires login to purchase */}
            <Route path="/services" component={ServicesPage} />
            
            {/* Authentication - no layout */}
            <Route path="/auth" component={AuthPage} />
            
            {/* Public home page */}
            <Route path="/" component={HomeLanding} />
            
            {/* Protected routes - with dashboard layout */}
            <Route>
              <MainLayout>
                <Switch>
                  <ProtectedRoute path="/dashboard" component={Dashboard} />
                  <ProtectedRoute path="/data-input" component={DataInput} />
                  <ProtectedRoute path="/reports" component={Reports} />
                  <ProtectedRoute path="/compliance" component={Compliance} />
                  <ProtectedRoute path="/benchmarks" component={Benchmarks} />
                  <ProtectedRoute path="/product-carbon-footprint" component={ProductCarbonFootprint} />
                  <ProtectedRoute path="/esg-rating" component={ESGRating} />
                  <ProtectedRoute path="/materiality" component={MaterialityAssessment} />
                  <ProtectedRoute path="/ghg-protocol" component={GHGProtocolPage} />
                  <ProtectedRoute path="/blog" component={Blog} />
                  <ProtectedRoute path="/settings" component={Settings} />
                  <ProtectedRoute path="/user-services" component={UserServicesPage} />
                  
                  {/* Fallback */}
                  <Route component={NotFound} />
                </Switch>
              </MainLayout>
            </Route>
          </Switch>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
