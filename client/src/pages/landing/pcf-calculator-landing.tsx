import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Check, ArrowRight, Layers, Database, Share2 } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import { Metadata } from '@/components/Metadata';

export default function PCFCalculatorLanding() {
  const { user } = useAuth();
  const isPremiumUser = user?.servicesPurchased && Array.isArray(user.servicesPurchased) && 
    user.servicesPurchased.includes('product-carbon-footprint');
  
  return (
    <PublicLayout>
      <Metadata
        title="Product Carbon Footprint Calculator | Sustainability Reporting Platform"
        description="Calculate the carbon footprint of your products throughout their lifecycle following ISO 14067 and GHG Protocol standards"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Carbon Footprint Calculator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the carbon impact of your products throughout their entire lifecycle
            </p>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle>Lifecycle Analysis</CardTitle>
                <CardDescription className="text-gray-700">
                  Analyze emissions from raw materials to end-of-life disposal
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader>
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-teal-700" />
                </div>
                <CardTitle>Standards Compliant</CardTitle>
                <CardDescription className="text-gray-700">
                  Aligned with ISO 14067 and GHG Protocol Product Standard
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader>
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle>Shareable Reports</CardTitle>
                <CardDescription className="text-gray-700">
                  Create consumer-facing carbon labels and detailed technical reports
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {/* Main Content and Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-4">Understand Your Products' Carbon Footprint</h2>
              <p className="text-gray-700 mb-4">
                Our Product Carbon Footprint (PCF) Calculator helps you measure and understand the 
                greenhouse gas emissions associated with your products throughout their entire lifecycle. 
                From raw material extraction to manufacturing, distribution, use, and end-of-life disposal, 
                get a complete picture of your product's climate impact.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete cradle-to-grave lifecycle assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Industry-specific emission factors database</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Customizable product components and processes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Multi-tier supplier emissions mapping</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Product carbon hotspot identification</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Scenario modeling for reduction strategies</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consumer-facing carbon labels and technical reports</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Standards Compliance</h3>
              <p className="text-gray-700 mb-4">
                Our PCF Calculator is built to comply with international standards for product carbon footprinting:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ISO 14067 - Carbon footprint of products</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>GHG Protocol Product Standard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>PAS 2050 compatibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Product Environmental Footprint (PEF) methodology</span>
                </li>
              </ul>
            </div>
            
            {/* Pricing Card */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24 border-2 border-primary shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-2xl">Access Full PCF Calculator</CardTitle>
                  <CardDescription className="text-primary-foreground opacity-90">
                    Complete product lifecycle carbon assessment
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
                      <span>Full lifecycle assessment capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Access to emission factors database</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Carbon label generation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Technical report exports</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {isPremiumUser ? (
                    <Button className="w-full" asChild>
                      <Link href="/product-carbon-footprint">
                        Access Calculator <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : user ? (
                    <Button className="w-full" asChild>
                      <Link href="/services">
                        Buy Access <ArrowRight className="ml-2 h-4 w-4" />
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
          
          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Product Carbon Footprinting Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Design Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Identify carbon hotspots in your product design and manufacturing processes. 
                    Use this data to redesign products with lower carbon materials and processes, 
                    driving innovation and reducing climate impact.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Map emissions across your supply chain tiers to identify high-impact suppliers. 
                    Set reduction targets and collaborate with suppliers to implement emission 
                    reduction initiatives throughout your value chain.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Consumer Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Create accurate carbon labels and climate impact information for your products. 
                    Transparent communication builds consumer trust and differentiates your products 
                    in an increasingly climate-conscious marketplace.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Meet emerging product carbon disclosure requirements and prepare for future 
                    regulations. Stay ahead of policy developments with accurate, standards-compliant 
                    product carbon footprint assessments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Understand Your Products' Climate Impact?</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Join forward-thinking companies using our Product Carbon Footprint Calculator to drive sustainable innovation.
            </p>
            {isPremiumUser ? (
              <Button size="lg" asChild>
                <Link href="/product-carbon-footprint">
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