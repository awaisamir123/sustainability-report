import React, { useState } from 'react';
import { Metadata } from '@/components/Metadata';
import GHGDataEntryForm from '@/components/emissions/GHGDataEntryForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function GHGProtocolPage() {
  const { user, hasServiceAccess } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  // Admin users have access by default, regular users need to purchase
  const hasAccess = user?.role === 'admin' || hasServiceAccess('ghg-emissions');
  
  return (
    <>
      <Metadata
        title="GHG Protocol Corporate Standard | Sustainability Reporting Platform"
        description="Create comprehensive GHG emissions inventories following the GHG Protocol Corporate Standard methodology."
      />
      
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">GHG Protocol Corporate Standard</h1>
          <p className="text-muted-foreground">
            Create standardized greenhouse gas emissions inventories following the GHG Protocol methodology
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory-tool" disabled={!hasAccess}>
              {!hasAccess && <Lock className="mr-2 h-4 w-4" />}
              Inventory Tool
            </TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the GHG Protocol Corporate Standard</CardTitle>
                <CardDescription>
                  The global standard for measuring and managing greenhouse gas emissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Greenhouse Gas Protocol Corporate Standard provides requirements and guidance for companies and other organizations
                  preparing a corporate-level GHG emissions inventory. It covers the accounting and reporting of the seven greenhouse
                  gases covered by the Kyoto Protocol.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">What is included?</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Scope 1: Direct emissions from owned or controlled sources</li>
                      <li>Scope 2: Indirect emissions from purchased electricity, steam, heating, and cooling</li>
                      <li>Scope 3: All other indirect emissions in the value chain</li>
                      <li>Base year calculations and recalculation policies</li>
                      <li>Verification and assurance guidance</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Benefits of using the GHG Protocol</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Internationally recognized methodology</li>
                      <li>Comparable and consistent emissions tracking</li>
                      <li>Clear framework for identifying reduction opportunities</li>
                      <li>Foundation for regulatory compliance</li>
                      <li>Support for emissions reduction goals and targets</li>
                    </ul>
                  </div>
                </div>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Access to the full GHG Inventory Tool requires a premium subscription. The overview, methodology,
                    and resources sections are available to all users.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory-tool" className="space-y-6">
            {hasAccess ? (
              <div className="space-y-6">
                <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                  <AlertTitle className="flex items-center text-green-800 dark:text-green-400">
                    Premium Access Enabled
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-500">
                    You have full access to the GHG Protocol Corporate Standard inventory tools and calculations.
                  </AlertDescription>
                </Alert>
                
                <Card>
                  <CardHeader>
                    <CardTitle>GHG Emissions Inventory Tool</CardTitle>
                    <CardDescription>
                      Use this tool to calculate and report your organization's GHG emissions following the GHG Protocol methodology
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GHGDataEntryForm />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Premium Feature: GHG Emissions Inventory Tool</CardTitle>
                  <CardDescription>
                    Upgrade to access our comprehensive GHG emissions inventory tool.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The GHG Emissions Inventory Tool provides everything you need to calculate, track, and report your 
                    organization's greenhouse gas emissions in accordance with the GHG Protocol Corporate Standard.
                  </p>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Premium Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Scope 1, 2, and 3 emissions calculators with built-in emission factors</li>
                      <li>Data management system for tracking emissions over time</li>
                      <li>Visual dashboards and reporting templates</li>
                      <li>Export capabilities for sustainability reporting</li>
                      <li>Base year recalculation tools</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="lg" onClick={() => console.log('Purchase access')}>
                    Purchase Access ($99)
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="methodology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GHG Protocol Methodology</CardTitle>
                <CardDescription>
                  Understanding the accounting principles and calculation approaches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accounting Principles</h3>
                  <p>
                    The GHG Protocol Corporate Standard is built on the following accounting principles to ensure
                    that GHG inventories represent a fair and true account of a company's emissions.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Relevance</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure the GHG inventory appropriately reflects the company's emissions and serves the
                        decision-making needs of users.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Completeness</h4>
                      <p className="text-sm text-muted-foreground">
                        Account for and report on all GHG emission sources and activities within the chosen
                        inventory boundary.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Consistency</h4>
                      <p className="text-sm text-muted-foreground">
                        Use consistent methodologies to allow for meaningful comparisons of emissions over time.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Transparency</h4>
                      <p className="text-sm text-muted-foreground">
                        Address all relevant issues in a factual and coherent manner, based on a clear audit trail.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Accuracy</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure that the quantification of GHG emissions is systematically neither over nor under
                        actual emissions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Organizational Boundaries</h3>
                  <p>
                    Companies can choose between two approaches for organizational boundaries:
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Equity Share Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Account for GHG emissions from operations according to the company's share of equity in the operation.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Control Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Account for 100% of the GHG emissions from operations over which the company has control.
                        Control can be defined in either financial or operational terms.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GHG Protocol Resources</CardTitle>
                <CardDescription>
                  Helpful guidance, tools, and references for GHG emissions accounting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Documents</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <a href="https://ghgprotocol.org/corporate-standard" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard (Revised Edition)
                      </a>
                    </li>
                    <li>
                      <a href="https://ghgprotocol.org/scope-2-guidance" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        GHG Protocol Scope 2 Guidance
                      </a>
                    </li>
                    <li>
                      <a href="https://ghgprotocol.org/scope3_standard" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Corporate Value Chain (Scope 3) Accounting and Reporting Standard
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Calculation Tools</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <a href="https://ghgprotocol.org/calculation-tools" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Cross-Sector Tools
                      </a>
                    </li>
                    <li>
                      <a href="https://ghgprotocol.org/calculation-tools" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Sector-Specific Tools
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Verification Resources</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <a href="https://ghgprotocol.org/verification" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        GHG Protocol Verification Guidance
                      </a>
                    </li>
                    <li>
                      <a href="https://www.iso.org/standard/66453.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        ISO 14064-3: Specification with guidance for the verification and validation of greenhouse gas statements
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}