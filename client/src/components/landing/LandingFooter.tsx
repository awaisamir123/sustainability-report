import React from 'react';
import { Link } from 'wouter';
import logoImage from '@/assets/logo.png';

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={logoImage}
                alt="Sustainability Reporting Logo" 
                className="w-10 h-10 object-contain mr-2"
              />
              <span className="font-bold text-xl">Sustainability Reporting</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering organizations to track, analyze, and communicate their sustainability metrics with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">linkedin</span>
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/landing/report-generator">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Report Generator</div>
                </Link>
              </li>
              <li>
                <Link href="/landing/sustainability-statement">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Sustainability Statement Builder</div>
                </Link>
              </li>
              <li>
                <Link href="/landing/emissions-calculator">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Emissions Calculator</div>
                </Link>
              </li>
              <li>
                <Link href="/landing/benchmarking">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Industry Benchmarking</div>
                </Link>
              </li>
              <li>
                <Link href="/landing/compliance">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Compliance Tracking</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Blog</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <div className="text-gray-400 hover:text-white cursor-pointer">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Careers</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-400 hover:text-white cursor-pointer">Contact</div>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sustainability Reporting. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal/privacy">
                <div className="text-gray-400 hover:text-white text-sm cursor-pointer">Privacy Policy</div>
              </Link>
              <Link href="/legal/terms">
                <div className="text-gray-400 hover:text-white text-sm cursor-pointer">Terms of Service</div>
              </Link>
              <Link href="/legal/cookies">
                <div className="text-gray-400 hover:text-white text-sm cursor-pointer">Cookie Policy</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}