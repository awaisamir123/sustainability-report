import React from 'react';
import { Metadata } from '@/components/Metadata';
import { AccessRestriction } from '@/components/access-control/AccessRestriction';

export default function MaterialityAssessment() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Metadata
        title="Materiality Assessment | Sustainability Reporting Platform"
        description="Identify and prioritize the sustainability topics that matter most to your organization and stakeholders"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Materiality Assessment</h1>
        <p className="text-gray-600 mb-8">
          Identify, assess, and prioritize the sustainability topics that matter most to your organization and stakeholders
        </p>
        
        <AccessRestriction 
          serviceId="materiality" 
          serviceName="Materiality Assessment" 
          serviceType="consultation"
        >
          {/* This content will only be visible to users who have booked a consultation */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Expert Session is Confirmed</h2>
                  <p className="text-gray-600">Our sustainability expert will guide you through the materiality assessment process</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Session Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">May 25, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium">10:00 AM - 11:30 AM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Format:</span>
                      <span className="font-medium">Video Conference</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Meeting ID:</span>
                      <span className="font-medium">824 5963 0172</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Your Consultant</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Sustainability Strategist</p>
                      <p className="text-sm text-blue-600">15+ years experience</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Preparation Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-700 rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <p className="font-medium">Stakeholder List</p>
                      <p className="text-sm text-gray-600">Identify key internal and external stakeholders for the assessment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div>
                      <p className="font-medium">Industry Benchmarks</p>
                      <p className="text-sm text-gray-600">Gather information on material topics for your industry</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div>
                      <p className="font-medium">Business Strategy</p>
                      <p className="text-sm text-gray-600">Prepare an overview of your business strategy and priorities</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Materiality Assessment Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-medium mb-1">Identification</h3>
                    <p className="text-sm text-gray-600">Identify potential material topics through research, stakeholder engagement, and industry analysis</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-medium mb-1">Prioritization</h3>
                    <p className="text-sm text-gray-600">Assess the importance of each topic to stakeholders and its impact on your business</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-medium mb-1">Validation</h3>
                    <p className="text-sm text-gray-600">Review and validate the results with key decision-makers in your organization</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-medium mb-1">Implementation</h3>
                    <p className="text-sm text-gray-600">Develop strategies to address material topics and integrate them into your business</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Post-Session Deliverables</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  <span>Materiality Matrix with prioritized topics</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  <span>Documentation of methodology and results</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  <span>Recommended actions for each material topic</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-0.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  <span>Integration strategy for sustainability reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </AccessRestriction>
      </div>
    </div>
  );
}