import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';

// Import icons
import { FileText, BarChart, CheckSquare, FileBarChart, PieChart, Layout, ArrowRight } from 'lucide-react';

export default function HomeLanding() {
  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sustainability Reporting Made Simple
              </h1>
              <p className="text-xl mb-10 text-teal-100">
                All-in-one platform for tracking, analyzing, and communicating your organization's 
                sustainability metrics with confidence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-teal-800 hover:bg-teal-100"
                  asChild
                >
                  <a href="https://calendly.com/naeem-ayesha512/30min" target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-teal-400 bg-teal-700 text-white hover:bg-teal-600"
                  asChild
                >
                  <a href="#features">
                    Explore Features
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
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Comprehensive Sustainability Tools</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Our platform offers a complete suite of tools to help you manage every aspect of your sustainability reporting
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Report Generator */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Report Generator</h3>
                  <p className="text-gray-600 mb-4">
                    Create professional sustainability reports with customizable templates following 
                    frameworks like GRI, GHG Protocol, SASB, and TCFD.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/landing/report-generator">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Sustainability Statement Builder - HIGHLIGHTED */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-500">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-rose-100 w-16 h-16 flex items-center justify-center mb-4">
                    <Layout className="h-8 w-8 text-rose-600" />
                  </div>
                  <div className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded absolute top-3 right-3">
                    NEW
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability Statement Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Quickly create professional 2-page sustainability statements using intuitive templates tailored 
                    for different stakeholder communications.
                  </p>
                  <Button variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50" asChild>
                    <Link href="/landing/sustainability-statement">Explore Templates</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Emissions Calculator */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mb-4">
                    <BarChart className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Emissions Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Calculate, track, and reduce your organization's greenhouse gas emissions 
                    with our comprehensive GHG Protocol aligned tool.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/landing/emissions-calculator">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Benchmarking */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-4">
                    <PieChart className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Industry Benchmarking</h3>
                  <p className="text-gray-600 mb-4">
                    Compare your sustainability performance with industry peers and gain
                    insights to improve your ESG metrics and reputation.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/landing/benchmarking">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Compliance Tracking */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mb-4">
                    <CheckSquare className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compliance Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Stay ahead of regulations with our compliance management tools and
                    expert consulting on sustainability certifications.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/landing/compliance">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* ESG Ratings */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                    <FileBarChart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">ESG Rating Assessment</h3>
                  <p className="text-gray-600 mb-4">
                    Simulate and improve your ESG ratings with our assessment tools 
                    designed to identify opportunities for improvement.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth">Try It Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sustainability Statement Builder Feature Highlight */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-rose-100 text-rose-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  NEW FEATURE
                </div>
                <h2 className="text-3xl font-bold mb-4">Sustainability Statement Builder</h2>
                <p className="text-gray-600 mb-6">
                  Create beautiful, professional sustainability statements in minutes with our intuitive builder. 
                  Choose from three elegant templates designed for different communication needs.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="rounded-full bg-rose-100 p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700"><span className="font-medium">Corporate Snapshot</span> - A clean, two-page format ideal for SMEs and startups</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-rose-100 p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700"><span className="font-medium">Visual Impact Report</span> - An infographic-style layout perfect for visual storytelling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-rose-100 p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700"><span className="font-medium">ESG Strategy Brief</span> - A detailed template for comprehensive sustainability strategies</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-rose-600 hover:bg-rose-700" asChild>
                    <Link href="/sustainability-statement">Build Your Statement</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/landing/sustainability-statement">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white p-6 rounded-lg shadow-xl transform rotate-1">
                  <div className="border-2 border-dashed border-rose-200 p-6 rounded h-72 flex flex-col justify-center items-center">
                    <div className="text-center">
                      <Layout className="h-20 w-20 mx-auto mb-4 text-rose-600" />
                      <h3 className="text-2xl font-bold text-rose-700">Sustainability Statement</h3>
                      <p className="text-sm text-gray-600 mt-2">Elegant, impactful communication of your sustainability efforts</p>
                      <div className="flex justify-center gap-2 mt-4">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Organizations Worldwide</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-teal-600">G</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">GreenTech Solutions</p>
                    <p className="text-sm text-gray-500">Renewable Energy</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The platform has transformed our sustainability reporting process. What used to take weeks 
                  now takes days, with better results and more insightful data visualization."
                </p>
                <div className="flex text-amber-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">E</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">EcoManufacturing Inc.</p>
                    <p className="text-sm text-gray-500">Manufacturing</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The emissions calculator has given us unprecedented visibility into our carbon footprint and 
                  helped us identify reduction opportunities we would have missed otherwise."
                </p>
                <div className="flex text-amber-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-rose-600">S</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Sustainable Retail Group</p>
                    <p className="text-sm text-gray-500">Retail</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The Statement Builder has simplified how we communicate our sustainability efforts to stakeholders.
                  Professional-looking reports in minutes rather than hours."
                </p>
                <div className="flex text-amber-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Sustainability Journey Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of organizations using our platform to track, report, and improve 
              their sustainability performance
            </p>
            <Button 
              size="lg" 
              className="bg-white text-teal-800 hover:bg-teal-100"
              asChild
            >
              <Link href="/auth">
                Get Started Free
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}