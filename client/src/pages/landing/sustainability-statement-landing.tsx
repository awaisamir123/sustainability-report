import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';
import { useAuth } from '@/hooks/use-auth';

// Import icons
import { FileText, Layout, PenTool, Download, Copy, Target } from 'lucide-react';

export default function SustainabilityStatementLanding() {
  const { user } = useAuth();

  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Sustainability Statement Builder
                </h1>
                <p className="text-xl mb-8 text-rose-100">
                  Create professional 2-page sustainability statements in minutes with our intuitive builder. 
                  Choose from three beautiful templates designed for different communication needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-rose-800 hover:bg-rose-100"
                    asChild
                  >
                    <Link href="/sustainability-statement">
                      Build Your Statement
                    </Link>
                  </Button>
                  <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-rose-400 bg-rose-400 text-white hover:bg-rose-500"
                      asChild
                    >
                      <a href="#templates">
                        View Templates
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
                <div className="bg-white p-4 rounded-lg shadow-xl transform rotate-1">
                  <div className="border-2 border-dashed border-rose-200 p-5 rounded">
                    <div className="text-center text-rose-800">
                      <FileText className="h-16 w-16 mx-auto mb-3 text-rose-600" />
                      <h3 className="text-xl font-bold">Sustainability Statement</h3>
                      <p className="mt-2 text-sm text-rose-600">Professional 2-page documents with customizable sections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Layout className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Templates
                  </h3>
                  <p className="text-gray-600">
                    Choose from three professionally designed template layouts tailored for different stakeholder needs
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mb-4">
                    <PenTool className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Easy Customization
                  </h3>
                  <p className="text-gray-600">
                    Intuitive editor with simple form fields to add your company data, metrics, and descriptions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Export Options
                  </h3>
                  <p className="text-gray-600">
                    Export your finished statement as PDF or Word document for easy sharing and distribution
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Template Showcase Section */}
        <section id="templates" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Choose Your Template</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Our templates are designed for different communication needs, from quick snapshots to detailed ESG strategy briefs
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Template 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 bg-blue-50 flex flex-col items-center justify-center p-4">
                  <FileText className="h-12 w-12 text-blue-500 mb-3" />
                  <h3 className="font-bold text-lg text-blue-700">Corporate Snapshot</h3>
                  <p className="text-center text-sm text-blue-600 mt-1">Ideal for SMEs and startups</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    A clean, two-page format with company overview on page one and an ESG metrics table on page two. 
                    Perfect for clear, concise communication of key sustainability data.
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                    <Link href="/sustainability-statement">Use This Template</Link>
                  </Button>
                </div>
              </div>

              {/* Template 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 bg-green-50 flex flex-col items-center justify-center p-4">
                  <Layout className="h-12 w-12 text-green-500 mb-3" />
                  <h3 className="font-bold text-lg text-green-700">Visual Impact Report</h3>
                  <p className="text-center text-sm text-green-600 mt-1">Ideal for impact storytelling</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    An infographic-style layout with quadrant summary for climate, people, governance and targets. 
                    Visually engaging format perfect for external communications.
                  </p>
                  <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                    <Link href="/sustainability-statement">Use This Template</Link>
                  </Button>
                </div>
              </div>

              {/* Template 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 bg-amber-50 flex flex-col items-center justify-center p-4">
                  <Target className="h-12 w-12 text-amber-500 mb-3" />
                  <h3 className="font-bold text-lg text-amber-700">ESG Strategy Brief</h3>
                  <p className="text-center text-sm text-amber-600 mt-1">Ideal for B2B proposals</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    A structured format with governance models, risk/opportunity tables, and target timelines. 
                    Perfect for more detailed sustainability strategy communication.
                  </p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" asChild>
                    <Link href="/sustainability-statement">Use This Template</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-rose-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
                <p className="text-gray-600">
                  Select from Corporate Snapshot, Visual Impact Report, or ESG Strategy Brief
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-rose-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Enter Your Data</h3>
                <p className="text-gray-600">
                  Fill in the simple form fields with your company information and ESG metrics
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-rose-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Preview & Adjust</h3>
                <p className="text-gray-600">
                  See a live preview of your statement and make adjustments in real-time
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-rose-600">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Export & Share</h3>
                <p className="text-gray-600">
                  Download your finished statement as PDF or Word to share with stakeholders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center">
                    <Copy className="h-12 w-12 text-rose-500" />
                  </div>
                </div>
                <div>
                  <p className="text-lg italic text-gray-700 mb-4">
                    "The Sustainability Statement Builder has transformed how we communicate our ESG metrics. 
                    What used to take days now takes minutes, and the professional templates have helped us 
                    clearly communicate our progress to investors and customers alike."
                  </p>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Sustainability Director, GreenTech Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-rose-700 to-rose-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Create Your Sustainability Statement Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Professional, customizable 2-page statements for your organization's sustainability communication
            </p>
            <Button 
              size="lg" 
              className="bg-white text-rose-800 hover:bg-rose-100"
              asChild
            >
              <a href="https://calendly.com/naeem-ayesha512/30min" target="_blank" rel="noopener noreferrer">
                Schedule a Consultation
              </a>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}