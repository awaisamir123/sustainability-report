import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';

export default function ComplianceLanding() {
  return (
    <LandingLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-900 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Compliance & Certification
                </h1>
                <p className="text-xl mb-8 text-purple-100">
                  Navigate complex sustainability regulations and certification requirements with our 
                  expert consulting services and compliance management tools.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-800 hover:bg-purple-100"
                    asChild
                  >
                    <a href="https://calendly.com/naeem-ayesha512/30min" target="_blank" rel="noopener noreferrer">
                      Request Consultation
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-purple-400 bg-purple-400 text-white hover:bg-purple-500"
                    asChild
                  >
                    <a href="#services">
                      Our Services
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
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Compliance Certification" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Compliance Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">gavel</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Regulatory Gap Analysis
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive assessment of your compliance status against applicable sustainability regulations
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">verified</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Certification Support
                  </h3>
                  <p className="text-gray-600">
                    End-to-end guidance for obtaining key certifications like ISO 14001, B Corp, and LEED
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">assignment</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Reporting Assistance
                  </h3>
                  <p className="text-gray-600">
                    Expert guidance for TCFD, GRI, SASB, CDP, and other framework-aligned reporting
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">policy</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Policy Development
                  </h3>
                  <p className="text-gray-600">
                    Creation of sustainability policies and procedures to ensure ongoing compliance
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">school</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Staff Training
                  </h3>
                  <p className="text-gray-600">
                    Customized training programs for staff to ensure compliance with sustainability requirements
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons text-purple-600">track_changes</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ongoing Monitoring
                  </h3>
                  <p className="text-gray-600">
                    Continuous tracking of regulatory changes and compliance status with regular updates
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frameworks & Certifications We Support</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">GRI</span>
                </div>
                <p className="font-semibold">Global Reporting Initiative</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">SASB</span>
                </div>
                <p className="font-semibold">Sustainability Accounting Standards Board</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">TCFD</span>
                </div>
                <p className="font-semibold">Task Force on Climate-related Financial Disclosures</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">CDP</span>
                </div>
                <p className="font-semibold">Carbon Disclosure Project</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">ISO</span>
                </div>
                <p className="font-semibold">ISO 14001, 50001</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">B Corp</span>
                </div>
                <p className="font-semibold">B Corporation Certification</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">LEED</span>
                </div>
                <p className="font-semibold">Leadership in Energy and Environmental Design</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-800">CSRD</span>
                </div>
                <p className="font-semibold">Corporate Sustainability Reporting Directive</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Compliance Process</h2>
            
            <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-purple-600 text-2xl">search</span>
                </div>
                <div className="rounded-full bg-purple-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">
                  Assessment
                </h3>
                <p className="text-gray-600">
                  Identify applicable regulations and current compliance status
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-purple-600 text-2xl">architecture</span>
                </div>
                <div className="rounded-full bg-purple-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">
                  Planning
                </h3>
                <p className="text-gray-600">
                  Create a roadmap for achieving compliance and certification goals
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-purple-600 text-2xl">settings</span>
                </div>
                <div className="rounded-full bg-purple-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">
                  Implementation
                </h3>
                <p className="text-gray-600">
                  Put systems and processes in place to achieve compliance
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-purple-600 text-2xl">fact_check</span>
                </div>
                <div className="rounded-full bg-purple-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h3 className="text-xl font-semibold mb-2">
                  Verification
                </h3>
                <p className="text-gray-600">
                  Audit processes to ensure they meet compliance requirements
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-purple-600 text-2xl">autorenew</span>
                </div>
                <div className="rounded-full bg-purple-800 w-8 h-8 flex items-center justify-center mx-auto mb-4 text-white font-bold">5</div>
                <h3 className="text-xl font-semibold mb-2">
                  Maintenance
                </h3>
                <p className="text-gray-600">
                  Ongoing management to ensure continued compliance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-purple-700 to-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of Regulatory Changes</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of compliance experts will help you navigate complex sustainability regulations 
              and achieve your certification goals
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-800 hover:bg-purple-100"
              asChild
            >
              <Link href="/contact">
                Contact Our Compliance Team
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}