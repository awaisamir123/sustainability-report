import React from 'react';
import { Link } from 'wouter';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Metadata } from '@/components/Metadata';
import { ExternalLink, ArrowRight, BarChart2, FileText, Building2, GanttChart, PieChart, Shield } from 'lucide-react';

export default function TCFDLandingPage() {
  return (
    <PublicLayout>
      <Metadata
        title="TCFD Climate Risk Reporting | Sustainability Reporting Platform"
        description="Generate comprehensive climate-related financial disclosures aligned with the Task Force on Climate-related Financial Disclosures (TCFD) framework."
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-100 to-white dark:from-purple-950/40 dark:to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                TCFD Climate Risk Reporting
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Generate comprehensive climate-related financial disclosures aligned with the Task Force on Climate-related Financial Disclosures (TCFD) framework.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/report-generator?template=tcfd-framework">
                    Create TCFD Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://www.fsb-tcfd.org/" target="_blank" rel="noopener noreferrer">
                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 dark:bg-purple-900/30 rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-300 dark:bg-purple-800/30 rounded-lg"></div>
                <div className="relative z-10 bg-white dark:bg-card p-6 rounded-lg shadow-lg border">
                  <h3 className="text-lg font-semibold mb-3">TCFD Report Structure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Building2 className="mr-2 h-4 w-4 text-purple-600" />
                      Governance
                    </li>
                    <li className="flex items-center text-sm">
                      <GanttChart className="mr-2 h-4 w-4 text-purple-600" />
                      Strategy
                    </li>
                    <li className="flex items-center text-sm">
                      <Shield className="mr-2 h-4 w-4 text-purple-600" />
                      Risk Management
                    </li>
                    <li className="flex items-center text-sm">
                      <BarChart2 className="mr-2 h-4 w-4 text-purple-600" />
                      Metrics & Targets
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use TCFD Reporting?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The TCFD framework has become the global standard for climate-related financial disclosures, helping organizations assess and disclose climate risks and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-purple-600" />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Disclose your organization's governance around climate-related risks and opportunities, including board oversight and management's role.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GanttChart className="mr-2 h-5 w-5 text-purple-600" />
                  Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Communicate actual and potential impacts of climate-related risks and opportunities on your business, strategy, and financial planning.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-purple-600" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Describe how your organization identifies, assesses, and manages climate-related risks, including integration into overall risk management.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
                  Metrics & Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Report on the metrics and targets used to assess and manage relevant climate-related risks and opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-purple-600" />
                  Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Includes pre-built visualization components like risk heatmaps, emissions charts, and governance structure diagrams.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-purple-600" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate professional reports in PDF and DOCX formats with styled layouts that maintain all visualizations and data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* TCFD Framework Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TCFD Framework Overview</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Task Force on Climate-related Financial Disclosures (TCFD) developed recommendations to help companies disclose decision-useful information about climate-related risks and opportunities.
            </p>
          </div>
          
          <Tabs defaultValue="governance" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="risk">Risk Management</TabsTrigger>
              <TabsTrigger value="metrics">Metrics & Targets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="governance" className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Governance</h3>
              <p className="mb-4">Disclose the organization's governance around climate-related risks and opportunities.</p>
              
              <h4 className="text-lg font-medium mt-6 mb-2">Recommended Disclosures:</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">a</div>
                  <div>
                    <p className="font-medium">Board Oversight</p>
                    <p className="text-sm text-muted-foreground">Describe the board's oversight of climate-related risks and opportunities.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">b</div>
                  <div>
                    <p className="font-medium">Management's Role</p>
                    <p className="text-sm text-muted-foreground">Describe management's role in assessing and managing climate-related risks and opportunities.</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="strategy" className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Strategy</h3>
              <p className="mb-4">Disclose the actual and potential impacts of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.</p>
              
              <h4 className="text-lg font-medium mt-6 mb-2">Recommended Disclosures:</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">a</div>
                  <div>
                    <p className="font-medium">Climate-Related Risks & Opportunities</p>
                    <p className="text-sm text-muted-foreground">Describe the climate-related risks and opportunities the organization has identified over the short, medium, and long term.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">b</div>
                  <div>
                    <p className="font-medium">Impact on Business, Strategy & Financial Planning</p>
                    <p className="text-sm text-muted-foreground">Describe the impact of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">c</div>
                  <div>
                    <p className="font-medium">Resilience of Strategy</p>
                    <p className="text-sm text-muted-foreground">Describe the resilience of the organization's strategy, taking into consideration different climate-related scenarios, including a 2°C or lower scenario.</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="risk" className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Risk Management</h3>
              <p className="mb-4">Disclose how the organization identifies, assesses, and manages climate-related risks.</p>
              
              <h4 className="text-lg font-medium mt-6 mb-2">Recommended Disclosures:</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">a</div>
                  <div>
                    <p className="font-medium">Risk Identification & Assessment Processes</p>
                    <p className="text-sm text-muted-foreground">Describe the organization's processes for identifying and assessing climate-related risks.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">b</div>
                  <div>
                    <p className="font-medium">Risk Management Processes</p>
                    <p className="text-sm text-muted-foreground">Describe the organization's processes for managing climate-related risks.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">c</div>
                  <div>
                    <p className="font-medium">Integration into Overall Risk Management</p>
                    <p className="text-sm text-muted-foreground">Describe how processes for identifying, assessing, and managing climate-related risks are integrated into the organization's overall risk management.</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="metrics" className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Metrics and Targets</h3>
              <p className="mb-4">Disclose the metrics and targets used to assess and manage relevant climate-related risks and opportunities.</p>
              
              <h4 className="text-lg font-medium mt-6 mb-2">Recommended Disclosures:</h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">a</div>
                  <div>
                    <p className="font-medium">Climate-Related Metrics</p>
                    <p className="text-sm text-muted-foreground">Disclose the metrics used by the organization to assess climate-related risks and opportunities in line with its strategy and risk management process.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">b</div>
                  <div>
                    <p className="font-medium">Scope 1, 2, 3 GHG Emissions</p>
                    <p className="text-sm text-muted-foreground">Disclose Scope 1, Scope 2, and, if appropriate, Scope 3 greenhouse gas (GHG) emissions, and the related risks.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">c</div>
                  <div>
                    <p className="font-medium">Targets</p>
                    <p className="text-sm text-muted-foreground">Describe the targets used by the organization to manage climate-related risks and opportunities and performance against targets.</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TCFD Resources</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore these resources to learn more about TCFD recommendations and best practices for climate-related financial disclosures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Official TCFD Resources</CardTitle>
                <CardDescription>
                  Resources from the Task Force on Climate-related Financial Disclosures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • TCFD Final Recommendations Report
                </p>
                <p className="text-sm">
                  • Implementing the TCFD Recommendations
                </p>
                <p className="text-sm">
                  • TCFD Knowledge Hub
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.fsb-tcfd.org/publications/" target="_blank" rel="noopener noreferrer">
                    Visit TCFD Website
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Industry Guidance</CardTitle>
                <CardDescription>
                  Sector-specific guidance for implementing TCFD recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • Financial Sector Guide
                </p>
                <p className="text-sm">
                  • Energy Sector Guide
                </p>
                <p className="text-sm">
                  • Manufacturing Sector Guide
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.tcfdhub.org/resource/tcfd-good-practice-handbook/" target="_blank" rel="noopener noreferrer">
                    View Sector Guides
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Implementation Examples</CardTitle>
                <CardDescription>
                  Real-world examples of TCFD-aligned disclosures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • Example Reports & Case Studies
                </p>
                <p className="text-sm">
                  • Best Practice Examples
                </p>
                <p className="text-sm">
                  • Scenario Analysis Examples
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.tcfdhub.org/case-study/" target="_blank" rel="noopener noreferrer">
                    View Examples
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-purple-100 dark:bg-purple-950/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your TCFD Report?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Our TCFD Report Generator makes it easy to create comprehensive climate-related financial disclosures aligned with TCFD recommendations.
          </p>
          
          <Button size="lg" asChild>
            <Link href="/report-generator?template=tcfd-framework">
              Create TCFD Report <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}