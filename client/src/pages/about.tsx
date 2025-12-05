
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 mb-8">
          We redefine how organizations approach sustainability. Our platform is designed to simplify and elevate sustainability reporting, empowering businesses to track, measure, and communicate their environmental and social impact seamlessly.
        </p>
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-8 text-white shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            We aim to make sustainability accessible for organizations of all sizes by providing innovative tools that transform complex reporting requirements into actionable insights. With a commitment to accuracy, transparency, and ease of use, we help businesses thrive in a sustainable future.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Founded by Ayesha Naeem, a sustainability consultant with extensive experience in ESG, and GHG accounting, our platform emerged from a deep understanding of industry challenges.
            </p>
            <p className="text-gray-600">
              Having worked with startups, multinationals, and public organisations, we recognised the need for an intuitive, affordable solution to navigate frameworks like GRI, SASB, TCFD, and ESRS. Thus, we created a platform tailored for simplicity, adaptability, and results.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/src/assets/images/photos/sustainability-team.jpg" 
              alt="Our sustainability team" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="mb-4 text-green-600">
                <span className="material-icons text-3xl">eco</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Environmental Stewardship</h3>
              <p className="text-gray-700">
                We minimize our footprint and champion sustainable practices in all we do.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="mb-4 text-blue-600">
                <span className="material-icons text-3xl">analytics</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Integrity</h3>
              <p className="text-gray-700">
                Accurate, transparent data forms the core of our solutions, ensuring meaningful progress.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="mb-4 text-purple-600">
                <span className="material-icons text-3xl">diversity_3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p className="text-gray-700">
                Our tools are designed to empower organizations of all sizes, from startups to enterprises.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="mb-4 text-orange-600">
                <span className="material-icons text-3xl">lightbulb</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-700">
                We embrace cutting-edge technology to deliver user-friendly solutions for evolving needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Leadership Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="/src/assets/images/photos/ceo.jpg" 
                alt="CEO portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Ayesha Naeem</h3>
            <p className="text-teal-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              Sustainability expert specializing in ESG frameworks, GHG accounting, and reporting standards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="/src/assets/images/photos/cto.jpg" 
                alt="CTO portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Muhammad Ali Hassan</h3>
            <p className="text-teal-600 mb-2">CTO & Co-Founder</p>
            <p className="text-gray-600 text-sm">
              Software architecture expert ensuring our platform remains robust, secure, and adaptive.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
        <div className="bg-gray-50 rounded-lg p-8 shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">description</span>
                  <span>Report Generator: Align with GRI, SASB, TCFD, and ESRS frameworks</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">calculate</span>
                  <span>Emissions Calculator: Track and analyze carbon footprint</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">trending_up</span>
                  <span>Benchmarking Tools: Compare against industry standards</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">gavel</span>
                  <span>Compliance Monitoring: Stay ahead of requirements</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">autorenew</span>
                  <span>Automating data collection and verification</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">insights</span>
                  <span>Providing actionable recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">brush</span>
                  <span>Crafting visually compelling reports</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-600 mr-2">support</span>
                  <span>Supporting companies at every stage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "The platform transformed our ESG reporting. We went from months of effort to delivering high-quality reports in weeks."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Jessica Miller</h4>
                  <p className="text-sm text-gray-500">Sustainability Director, GreenTech Solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "As a mid-sized company, we needed a comprehensive yet simple solution. This platform exceeded our expectations."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Michael Torres</h4>
                  <p className="text-sm text-gray-500">CEO, Innovative Manufacturing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us on the Journey to Sustainability</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Ready to simplify your sustainability reporting and drive impactful change? Let us guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/report-generator" 
              className="bg-teal-500 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-400 transition-colors"
            >
              Try Our Report Generator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
