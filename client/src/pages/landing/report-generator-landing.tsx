import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import LandingLayout from '@/layouts/LandingLayout';
import { genericCover, griCover, ghgCover, sasbCover, tcfdCover } from '@/assets/images/covers';
import newBannerImage from '@/assets/new-banner.png';

export default function ReportGeneratorLanding() {
  const { user } = useAuth();
  
  const templates = [
    // Framework-based templates
    {
      id: 'gri',
      name: 'GRI Standard',
      description: 'Comprehensive sustainability reporting using Global Reporting Initiative standards',
      image: griCover,
      color: 'bg-blue-500',
      category: 'framework'
    },
    {
      id: 'ghg',
      name: 'GHG Protocol',
      description: 'Focused on greenhouse gas emissions reporting and climate impact',
      image: ghgCover,
      color: 'bg-green-500',
      category: 'framework'
    },
    {
      id: 'sasb',
      name: 'SASB Framework',
      description: 'Industry-specific sustainability reporting standards',
      image: sasbCover,
      color: 'bg-amber-500',
      category: 'framework'
    },
    {
      id: 'tcfd',
      name: 'TCFD Disclosure',
      description: 'Climate-related financial risk and opportunity disclosures',
      image: tcfdCover,
      color: 'bg-purple-500',
      category: 'framework'
    },
    // Generic templates
    {
      id: 'one-page-summary',
      name: 'One-Page Summary',
      description: 'A concise single-page report for key sustainability metrics and vision',
      image: genericCover,
      color: 'bg-red-500',
      category: 'generic'
    },
    {
      id: 'two-page-executive-summary',
      name: 'Two-Page Summary',
      description: 'An extended summary with detailed performance data and strategy overview',
      image: genericCover,
      color: 'bg-red-500',
      category: 'generic'
    },
    {
      id: 'full-sustainability-report',
      name: 'Full Report',
      description: 'A comprehensive 6-7 page report with detailed sustainability sections',
      image: genericCover,
      color: 'bg-red-500',
      category: 'generic'
    }
  ];
  
  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Sustainability Report Generator
                </h1>
                <p className="text-xl mb-8 text-teal-100">
                  Create professional sustainability reports following major frameworks with our intuitive, 
                  customizable templates. No technical expertise required.
                </p>
                <div className="flex flex-wrap gap-4">
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
                    className="border-teal-400 bg-teal-400 text-white hover:bg-teal-500"
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
                <img 
                  src={newBannerImage} 
                  alt="Sustainability Report Templates" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Report Generator?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-teal-600">check_circle</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Frameworks
                  </h3>
                  <p className="text-gray-600">
                    Supports GRI, SASB, GHG Protocol, TCFD, ESRS, and ISO 14067 standards
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-teal-600">article</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ready-Made Templates
                  </h3>
                  <p className="text-gray-600">
                    Professional templates for SMEs, Corporates, Manufacturers and Consultants
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-teal-600">edit</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Customizable Editor
                  </h3>
                  <p className="text-gray-600">
                    User-friendly WYSIWYG editor to tailor reports to your specific needs
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-teal-600">download</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Export Formats
                  </h3>
                  <p className="text-gray-600">
                    Export your reports as PDF or Word documents for easy sharing
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Browse Report Templates</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose from our diverse range of professional templates designed for different reporting frameworks and sustainability goals
            </p>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gri">GRI</TabsTrigger>
                <TabsTrigger value="ghg">GHG</TabsTrigger>
                <TabsTrigger value="sasb">SASB</TabsTrigger>
                <TabsTrigger value="tcfd">TCFD</TabsTrigger>
                <TabsTrigger value="generic">Generic</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {templates.map(template => (
                    <div key={template.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={template.image} 
                          alt={`${template.name} Template`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-4">
                        <div className={`inline-block px-2 py-1 rounded text-xs text-white ${template.color} mb-2`}>
                          {template.name}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{template.name} Report</h3>
                        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                        <Button className="w-full" asChild>
                          <Link href={`/report-generator?template=${template.id}`}>Use This Template</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Individual framework tabs would filter the templates */}
              {['gri', 'ghg', 'sasb', 'tcfd', 'generic'].map(id => (
                <TabsContent key={id} value={id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.filter(t => 
                      (id === 'generic' && t.category === 'generic') ||
                      (id !== 'generic' && t.id === id)
                    ).map(template => (
                      <div key={template.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={`${template.name} Template`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-4">
                          <div className={`inline-block px-2 py-1 rounded text-xs text-white ${template.color} mb-2`}>
                            {template.name}
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{template.name} Report</h3>
                          <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                          <Button className="w-full" asChild>
                            <Link href={`/report-generator?template=${template.id}`}>Use This Template</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-teal-600 text-2xl">assignment</span>
                </div>
                <div className="rounded-full bg-teal-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">
                  Choose a Template
                </h3>
                <p className="text-gray-600">
                  Select from our library of professional templates designed for different frameworks
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-teal-600 text-2xl">edit_note</span>
                </div>
                <div className="rounded-full bg-teal-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">
                  Customize Content
                </h3>
                <p className="text-gray-600">
                  Edit text, add your data, and customize visuals using our intuitive editor
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-teal-600 text-2xl">cloud_download</span>
                </div>
                <div className="rounded-full bg-teal-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">
                  Generate & Download
                </h3>
                <p className="text-gray-600">
                  Export your report in PDF or Word format to share with stakeholders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Sustainability Journey Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Generate your first sustainability report for free and take the first step towards 
              transparent ESG reporting
            </p>
            <Button 
              size="lg" 
              className="bg-white text-teal-800 hover:bg-teal-100"
              asChild
            >
              <Link href="/report-generator">
                Generate Your First Report Free
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}