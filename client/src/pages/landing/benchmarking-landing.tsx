import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';

export default function BenchmarkingLanding() {
  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Industry Benchmarking
                </h1>
                <p className="text-xl mb-8 text-amber-100">
                  Compare your sustainability performance with industry peers and discover 
                  opportunities to gain competitive advantage through ESG excellence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-amber-800 hover:bg-amber-100"
                    asChild
                  >
                    <a href="https://calendly.com/naeem-ayesha512/30min" target="_blank" rel="noopener noreferrer">
                      Request Consultation
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-amber-400 bg-amber-400 text-white hover:bg-amber-500"
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="ESG Benchmarking Dashboard" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Benchmarking Solutions</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">compare</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Peer Comparison
                  </h3>
                  <p className="text-gray-600">
                    Compare your performance against industry averages and best-in-class companies in your sector
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">bar_chart</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    KPI Analysis
                  </h3>
                  <p className="text-gray-600">
                    Analyze key performance indicators across environmental, social, and governance dimensions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">military_tech</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Best Practice Identification
                  </h3>
                  <p className="text-gray-600">
                    Discover industry-leading approaches and technologies that drive sustainability excellence
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">public</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Global Insights
                  </h3>
                  <p className="text-gray-600">
                    Access benchmarking data from organizations across different regions and market segments
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">trending_up</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Performance Improvement
                  </h3>
                  <p className="text-gray-600">
                    Receive tailored recommendations to improve your sustainability performance and close gaps
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-amber-600">insights</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Trend Analysis
                  </h3>
                  <p className="text-gray-600">
                    Track performance trends over time to demonstrate continuous improvement to stakeholders
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benchmarking Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Benchmarking Process</h2>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-amber-600 text-2xl">assessment</span>
                </div>
                <div className="rounded-full bg-amber-700 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">
                  Data Collection
                </h3>
                <p className="text-gray-600">
                  We collect your sustainability data and identify relevant metrics
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-amber-600 text-2xl">business</span>
                </div>
                <div className="rounded-full bg-amber-700 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">
                  Peer Selection
                </h3>
                <p className="text-gray-600">
                  We identify peer companies based on industry, size, and geographic presence
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-amber-600 text-2xl">analytics</span>
                </div>
                <div className="rounded-full bg-amber-700 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">
                  Performance Analysis
                </h3>
                <p className="text-gray-600">
                  We analyze your performance against peers and industry best practices
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-amber-600 text-2xl">lightbulb</span>
                </div>
                <div className="rounded-full bg-amber-700 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h3 className="text-xl font-semibold mb-2">
                  Recommendations
                </h3>
                <p className="text-gray-600">
                  We deliver actionable insights and a roadmap for improvement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-gray-100 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <span className="material-icons text-amber-500">star star star star star</span>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "The benchmarking insights helped us identify key areas for improvement in our 
                    water management practices. Within a year, we reduced water consumption by 15%."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-3">
                      <span className="material-icons">person</span>
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Sustainability Director, Manufacturing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <span className="material-icons text-amber-500">star star star star star</span>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "Comparing our carbon footprint to industry peers revealed opportunities we hadn't 
                    considered. The consultative approach was highly valuable."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-3">
                      <span className="material-icons">person</span>
                    </div>
                    <div>
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-sm text-gray-500">CEO, Technology</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <span className="material-icons text-amber-500">star star star star star</span>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "The industry benchmarking report impressed our investors and helped us secure 
                    additional funding for our sustainability initiatives."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-3">
                      <span className="material-icons">person</span>
                    </div>
                    <div>
                      <p className="font-semibold">Rebecca Torres</p>
                      <p className="text-sm text-gray-500">Sustainability Manager, Retail</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Benchmark Your Performance?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of sustainability experts is ready to help you understand where you stand 
              compared to your peers and how to improve your performance
            </p>
            <Button 
              size="lg" 
              className="bg-white text-amber-800 hover:bg-amber-100"
              asChild
            >
              <Link href="/auth">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}