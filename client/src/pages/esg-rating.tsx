import React from 'react';
import { Metadata } from '@/components/Metadata';
import { AccessRestriction } from '@/components/access-control/AccessRestriction';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function ESGRating() {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Metadata
        title="ESG Rating & Assessment | Sustainability Reporting Platform"
        description="Calculate and analyze your organization's ESG rating using industry-standard methodologies"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">ESG Rating & Assessment</h1>
        <p className="text-gray-600 mb-8">
          Evaluate and benchmark your organization's Environmental, Social, and Governance performance
        </p>
        
        <Tabs defaultValue="assessment" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="assessment">Free ESG Assessment</TabsTrigger>
            <TabsTrigger value="calculator">Premium ESG Rating Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assessment">
            <Card>
              <CardHeader>
                <CardTitle>Free ESG Self-Assessment</CardTitle>
                <CardDescription>
                  Get a basic understanding of your ESG performance with our quick self-assessment form
                </CardDescription>
              </CardHeader>
              <CardContent>
                
                
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2">How it works:</h4>
                  <p className="text-gray-700 text-sm">
                    Complete our free ESG self-assessment form to receive a basic evaluation of your 
                    organization's ESG performance. No account required - just fill out the form 
                    and we'll email you the results.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeppqtefBZreQLhqGd0xoCxyHl4NAkkrDuzFS57Rpy7yID56g/viewform" target="_blank" rel="noopener noreferrer">
                    Start Free Assessment <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculator">
            <AccessRestriction 
              serviceId="esg-rating" 
              serviceName="ESG Rating Calculator" 
              serviceType="paid"
              description="Our premium ESG Rating Calculator provides detailed analysis of your organization's ESG performance with comprehensive metrics, benchmarking against peers, and actionable improvement recommendations."
            >
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Your ESG Rating</h2>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-4xl font-bold text-green-600">B+</span>
                      <span className="ml-2 text-gray-500">(63/100)</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Industry Average: C (51/100)</p>
                      <p className="text-sm text-green-600 font-medium">You're outperforming 72% of peers</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="border rounded-lg p-4 text-center">
                      <h3 className="text-sm text-gray-500 mb-1">Environmental</h3>
                      <p className="text-2xl font-bold text-blue-600">B</p>
                      <p className="text-sm text-gray-500">68/100</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h3 className="text-sm text-gray-500 mb-1">Social</h3>
                      <p className="text-2xl font-bold text-purple-600">B-</p>
                      <p className="text-sm text-gray-500">62/100</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h3 className="text-sm text-gray-500 mb-1">Governance</h3>
                      <p className="text-2xl font-bold text-amber-600">C+</p>
                      <p className="text-sm text-gray-500">58/100</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Improvement Opportunities</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Governance</span>
                        <span>Enhance board diversity and independence measures</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Environmental</span>
                        <span>Improve disclosure of Scope 3 emissions data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Social</span>
                        <span>Expand community engagement programs and reporting</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Rating Methodology</h2>
                  <p className="text-gray-600 mb-4">
                    Your ESG rating is calculated using a proprietary methodology aligned with leading ESG rating agencies,
                    including MSCI, Sustainalytics, and S&P Global.
                  </p>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-2">Data Sources Used</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Your sustainability reporting data</li>
                      <li>Public disclosures and financial reports</li>
                      <li>Industry benchmarks and peer comparisons</li>
                      <li>Regulatory compliance information</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Rating History</h2>
                  <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500 italic">Rating history chart will appear here</p>
                  </div>
                </div>
              </div>
            </AccessRestriction>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}