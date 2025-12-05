import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Check, ArrowRight, LineChart, BarChart2, PieChart } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import { Metadata } from '@/components/Metadata';

export default function GHGCalculatorLanding() {
  const { user } = useAuth();
  const isPremiumUser = user?.servicesPurchased && Array.isArray(user.servicesPurchased) && 
    user.servicesPurchased.includes('ghg-emissions');
  
  return (
    <PublicLayout>
      <Metadata
        title="GHG Emission Calculator | Sustainability Reporting Platform"
        description="Track, calculate, and report your organization's greenhouse gas emissions across all scopes with our comprehensive calculator"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">GHG Emission Calculator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track, calculate, and report your organization's greenhouse gas emissions accurately across all scopes
            </p>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle>Scope 1, 2 & 3 Coverage</CardTitle>
                <CardDescription className="text-gray-700">
                  Comprehensive calculations for all emission scopes following the GHG Protocol
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription className="text-gray-700">
                  Generate comprehensive GHG reports and track your progress over time
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-purple-700" />
                </div>
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription className="text-gray-700">
                  Visualize your emissions data with customizable charts and analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {/* Main Content and Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-4">Calculate Your Carbon Footprint</h2>
              <p className="text-gray-700 mb-4">
                Our GHG Emission Calculator helps you measure and manage your organization's greenhouse 
                gas emissions across all scopes in accordance with the GHG Protocol. Track your carbon 
                footprint, identify reduction opportunities, and report your progress to stakeholders.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive data collection for Scope 1, 2, and 3 emissions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regular updates to emission factors from trusted sources</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Detailed breakdown of emission sources and categories</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Year-over-year tracking and progress monitoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Customizable reports for different stakeholders and frameworks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Data visualization with interactive charts and graphs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Export options for sustainability reports and disclosures</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Why Calculate Your GHG Emissions?</h3>
              <p className="text-gray-700 mb-4">
                Accurately measuring your greenhouse gas emissions is the first step toward effective climate action. 
                With growing regulatory requirements and stakeholder expectations, having reliable emissions data 
                helps you:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Meet regulatory reporting requirements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Identify emission reduction opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Demonstrate environmental commitment to stakeholders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Support science-based target setting</span>
                </li>
              </ul>
            </div>
            
            {/* Pricing Card */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24 border-2 border-primary shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-2xl">Unlock GHG Emission Calculator</CardTitle>
                  <CardDescription className="text-primary-foreground opacity-90">
                    Comprehensive carbon accounting for your organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-500 ml-2">USD</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full access to all emission scopes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Export and reporting capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Data visualization and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>One full year of updates</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {isPremiumUser ? (
                    <Button className="w-full" asChild>
                      <Link href="/data-input">
                        Access Calculator <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : user ? (
                    <Button className="w-full" asChild>
                      <Link href="/services">
                        Buy Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link href="/auth">
                        Sign In to Purchase <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Carbon Management Journey?</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Join organizations worldwide using our GHG Emission Calculator to track, report, and reduce their carbon footprint.
            </p>
            {isPremiumUser ? (
              <Button size="lg" asChild>
                <Link href="/data-input">
                  Go to My Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href={user ? "/services" : "/auth"}>
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}