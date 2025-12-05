import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';

export default function EmissionsCalculatorLanding() {
  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  GHG Emissions Calculator
                </h1>
                <p className="text-xl mb-8 text-indigo-100">
                  Calculate, track, and reduce your organization's greenhouse gas emissions with 
                  our comprehensive calculator aligned with the GHG Protocol.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-indigo-800 hover:bg-indigo-100"
                    asChild
                  >
                    <Link href="/auth">
                      Try Premium Features
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-indigo-400 bg-indigo-400 text-white hover:bg-indigo-500"
                    asChild
                  >
                    <a href="#features">
                      Learn More
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    asChild
                  >
                    <Link href="/auth">
                      Access Full Platform <span className="ml-2">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1569511166187-97eb6e387e19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
                  alt="Carbon emissions visualization" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Emissions Management</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">analytics</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Scope 1, 2 & 3 Emissions
                  </h3>
                  <p className="text-gray-600">
                    Calculate direct and indirect emissions across your entire value chain following the GHG Protocol
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">insert_chart</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Data Visualization
                  </h3>
                  <p className="text-gray-600">
                    Interactive charts and graphs to visualize your emissions by source, location, and time period
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">trending_down</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Reduction Planning
                  </h3>
                  <p className="text-gray-600">
                    Set science-based targets and track your progress towards emissions reduction goals
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">content_copy</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Automated Data Collection
                  </h3>
                  <p className="text-gray-600">
                    Connect to utility providers, fleet management systems, and other data sources to streamline emission calculations
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">compare_arrows</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Scenario Analysis
                  </h3>
                  <p className="text-gray-600">
                    Model different reduction scenarios to identify the most cost-effective strategies for your organization
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-indigo-600">description</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Compliance-Ready Reporting
                  </h3>
                  <p className="text-gray-600">
                    Generate reports ready for submission to TCFD, CDP, and other regulatory frameworks
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-indigo-600 text-2xl">upload_file</span>
                </div>
                <div className="rounded-full bg-indigo-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">
                  Input Your Data
                </h3>
                <p className="text-gray-600">
                  Enter energy consumption, transportation, and other activity data
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-indigo-600 text-2xl">calculate</span>
                </div>
                <div className="rounded-full bg-indigo-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">
                  Calculate Emissions
                </h3>
                <p className="text-gray-600">
                  Our algorithms convert your data into CO2 equivalent emissions
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-indigo-600 text-2xl">insights</span>
                </div>
                <div className="rounded-full bg-indigo-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">
                  Analyze Results
                </h3>
                <p className="text-gray-600">
                  Visualize emissions data and identify hotspots for reduction
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-indigo-600 text-2xl">co2</span>
                </div>
                <div className="rounded-full bg-indigo-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h3 className="text-xl font-semibold mb-2">
                  Reduce & Report
                </h3>
                <p className="text-gray-600">
                  Implement reduction strategies and track progress over time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Carbon Reduction Journey</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of organizations worldwide using our platform to measure, 
              manage, and reduce their carbon footprint
            </p>
            <Button 
              size="lg" 
              className="bg-white text-indigo-800 hover:bg-indigo-100"
              asChild
            >
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}