import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Check, ArrowRight, BarChart2, LineChart, BookOpen } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import { Metadata } from '@/components/Metadata';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ESGRatingLanding() {
  const { user } = useAuth();
  const isPremiumUser = user?.servicesPurchased && Array.isArray(user.servicesPurchased) && 
    user.servicesPurchased.includes('esg-rating');
  
  return (
    <PublicLayout>
      <Metadata
        title="ESG Rating Assessment | Sustainability Reporting Platform"
        description="Evaluate your organization's Environmental, Social, and Governance performance with our comprehensive ESG rating tools"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ESG Rating Assessment</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evaluate your organization's Environmental, Social, and Governance performance and identify areas for improvement
            </p>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle>Comprehensive Assessment</CardTitle>
                <CardDescription className="text-gray-700">
                  Evaluate your company across all key ESG dimensions and metrics
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle>Benchmarking</CardTitle>
                <CardDescription className="text-gray-700">
                  Compare your performance against industry peers and best practices
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-700" />
                </div>
                <CardTitle>Improvement Roadmap</CardTitle>
                <CardDescription className="text-gray-700">
                  Get actionable recommendations to improve your ESG performance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {/* Main Content - Two Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Choose Your ESG Assessment Option</h2>
            
            <Tabs defaultValue="free" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="free">Free ESG Self-Assessment</TabsTrigger>
                <TabsTrigger value="premium">Premium ESG Rating Calculator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="free" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Free ESG Self-Assessment</CardTitle>
                    <CardDescription>
                      Get a basic understanding of your ESG performance with our quick self-assessment form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>20-question ESG assessment questionnaire</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Basic ESG score calculation</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>General improvement recommendations</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Email delivery of basic results</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">How it works:</h4>
                      <p className="text-gray-700 text-sm">
                        Complete our free ESG self-assessment form to receive a basic evaluation of your 
                        organization's ESG performance. No account required - just fill out the form 
                        and we'll email you the results.
                      </p>
                    </div>
                    
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                      <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdCxV5_CeiUANXAgWwmjkj06MEI6TKfC3mn_FYCV1H_orvBWA/viewform?embedded=true"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                      >
                        Loading ESG Self-Assessment Form...
                      </iframe>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdCxV5_CeiUANXAgWwmjkj06MEI6TKfC3mn_FYCV1H_orvBWA/viewform" target="_blank" rel="noopener noreferrer">
                        Start Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="premium" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Premium ESG Rating Calculator</CardTitle>
                    <CardDescription>
                      Get detailed insights and analytics with our comprehensive ESG rating tool
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">$60</span>
                        <span className="text-gray-500 ml-2">USD</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Premium Features:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>100+ ESG metrics across environmental, social, and governance categories</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Industry-specific benchmarking and scoring</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Detailed gap analysis and performance insights</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Interactive dashboards and visualization tools</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Customized improvement roadmap with actionable steps</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Exportable reports for stakeholders and investors</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Progress tracking and year-over-year comparison</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">Why Choose Premium:</h4>
                      <p className="text-gray-700 text-sm">
                        Our Premium ESG Rating Calculator provides in-depth analysis aligned with major ESG frameworks 
                        including SASB, GRI, and TCFD. Get the detailed insights you need to improve your ESG 
                        performance and communicate effectively with stakeholders.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isPremiumUser ? (
                      <Button className="w-full" asChild>
                        <Link href="/esg-rating">
                          Access ESG Rating Calculator <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : user ? (
                      <Button className="w-full" asChild>
                        <Link href="/services">
                          Try Premium Rating Tool <ArrowRight className="ml-2 h-4 w-4" />
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
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Benefits and Use Cases */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Why ESG Rating Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Investor Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    ESG ratings provide investors with quantifiable insights into your organization's 
                    sustainability practices. Strong ESG performance can attract responsible investors, 
                    lower cost of capital, and improve access to funding.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Identify and mitigate environmental, social, and governance risks before they impact 
                    your business. A systematic ESG assessment helps uncover vulnerabilities and prepare 
                    for regulatory changes and market shifts.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Advantage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Benchmark your ESG performance against industry peers to identify areas where you 
                    excel or lag behind. Use these insights to differentiate your organization and 
                    capitalize on sustainability as a competitive advantage.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Stakeholder Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Build trust with customers, employees, communities, and regulators by demonstrating 
                    your commitment to responsible business practices. Transparent ESG reporting strengthens 
                    your brand and social license to operate.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Assess Your ESG Performance?</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Choose the assessment option that best fits your organization's needs and start your ESG journey today.
            </p>
            {isPremiumUser ? (
              <Button size="lg" asChild>
                <Link href="/esg-rating">
                  Go to ESG Rating Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdCxV5_CeiUANXAgWwmjkj06MEI6TKfC3mn_FYCV1H_orvBWA/viewform" target="_blank" rel="noopener noreferrer">
                    Start Free Assessment
                  </a>
                </Button>
                <Button size="lg" asChild>
                  <Link href={user ? "/services" : "/auth"}>
                    Try Premium Rating Tool
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}