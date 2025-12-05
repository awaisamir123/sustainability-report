import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CareersPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 mb-8">
          Help us transform how organizations approach sustainability reporting and drive positive environmental impact.
        </p>
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
            alt="Team collaborating" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
            <div className="text-white ml-12 max-w-md">
              <h2 className="text-3xl font-bold mb-4">Make an Impact</h2>
              <p className="text-lg mb-6">Join a purpose-driven team working to accelerate the transition to a more sustainable future.</p>
              <Button className="bg-white text-teal-700 hover:bg-gray-100">View Open Positions</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Culture</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              At Sustainability Reporting, we're building more than just software – we're creating a movement to make sustainability reporting accessible, actionable, and impactful for organizations of all sizes.
            </p>
            <p className="text-gray-600 mb-4">
              Our team is composed of passionate individuals from diverse backgrounds – environmental scientists, software engineers, designers, and sustainability consultants – all united by a common mission to drive positive environmental change.
            </p>
            <p className="text-gray-600">
              We value innovation, collaboration, and impact, and we're committed to creating a workplace where everyone can thrive professionally while making a difference in the world.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="material-icons text-green-600">psychology</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Continuous Learning</h3>
                <p className="text-gray-600">We invest in our team's growth through professional development opportunities, learning stipends, and knowledge sharing.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="material-icons text-blue-600">diversity_3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Inclusive Environment</h3>
                <p className="text-gray-600">We celebrate diversity of thought, background, and experience, and work to ensure all voices are heard and valued.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <span className="material-icons text-purple-600">work_life_balance</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Work-Life Balance</h3>
                <p className="text-gray-600">We promote flexible work arrangements and prioritize wellbeing to ensure sustainable high performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Benefits & Perks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">health_and_safety</span>
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Healthcare</h3>
              <p className="text-sm text-gray-600">Medical, dental, and vision coverage for you and your dependents</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">schedule</span>
              </div>
              <h3 className="font-semibold mb-2">Flexible Work</h3>
              <p className="text-sm text-gray-600">Remote-first with flexible hours to accommodate your life</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">school</span>
              </div>
              <h3 className="font-semibold mb-2">Learning Stipend</h3>
              <p className="text-sm text-gray-600">Annual budget for courses, books, and conferences</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">volunteer_activism</span>
              </div>
              <h3 className="font-semibold mb-2">Volunteer Time</h3>
              <p className="text-sm text-gray-600">Paid time off for volunteering with environmental causes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">emoji_nature</span>
              </div>
              <h3 className="font-semibold mb-2">Climate Benefit</h3>
              <p className="text-sm text-gray-600">Annual stipend for sustainable lifestyle choices</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">savings</span>
              </div>
              <h3 className="font-semibold mb-2">401(k) Matching</h3>
              <p className="text-sm text-gray-600">Competitive retirement plan with company matching</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">groups</span>
              </div>
              <h3 className="font-semibold mb-2">Team Retreats</h3>
              <p className="text-sm text-gray-600">Quarterly team gatherings in beautiful eco-friendly locations</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-teal-600">paid</span>
              </div>
              <h3 className="font-semibold mb-2">Equity Options</h3>
              <p className="text-sm text-gray-600">Share in the company's success with generous equity packages</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Open Positions</h2>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Departments</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              <JobCard 
                title="Senior Full Stack Developer"
                department="Engineering"
                location="Remote (US)"
                description="Lead the development of our core sustainability reporting platform, working with React, Node.js, and PostgreSQL."
              />
              
              <JobCard 
                title="UX/UI Designer"
                department="Product"
                location="Remote (Global)"
                description="Create intuitive, beautiful interfaces that make complex sustainability data accessible and actionable."
              />
              
              <JobCard 
                title="Sustainability Standards Specialist"
                department="Sustainability"
                location="Remote (Europe)"
                description="Guide our implementation of ESRS, GRI, and other reporting frameworks, ensuring our platform stays current with regulatory requirements."
              />
              
              <JobCard 
                title="Content Marketing Manager"
                department="Marketing"
                location="Remote (US)"
                description="Develop thought leadership content that positions us as experts in sustainability reporting and ESG."
              />
              
              <JobCard 
                title="Data Scientist"
                department="Engineering"
                location="Remote (Global)"
                description="Build models and algorithms to help companies analyze their sustainability data and identify improvement opportunities."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="engineering">
            <div className="space-y-4">
              <JobCard 
                title="Senior Full Stack Developer"
                department="Engineering"
                location="Remote (US)"
                description="Lead the development of our core sustainability reporting platform, working with React, Node.js, and PostgreSQL."
              />
              
              <JobCard 
                title="Data Scientist"
                department="Engineering"
                location="Remote (Global)"
                description="Build models and algorithms to help companies analyze their sustainability data and identify improvement opportunities."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="product">
            <div className="space-y-4">
              <JobCard 
                title="UX/UI Designer"
                department="Product"
                location="Remote (Global)"
                description="Create intuitive, beautiful interfaces that make complex sustainability data accessible and actionable."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="sustainability">
            <div className="space-y-4">
              <JobCard 
                title="Sustainability Standards Specialist"
                department="Sustainability"
                location="Remote (Europe)"
                description="Guide our implementation of ESRS, GRI, and other reporting frameworks, ensuring our platform stays current with regulatory requirements."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="marketing">
            <div className="space-y-4">
              <JobCard 
                title="Content Marketing Manager"
                department="Marketing"
                location="Remote (US)"
                description="Develop thought leadership content that positions us as experts in sustainability reporting and ESG."
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">Don't see a role that matches your skills and interests?</p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Submit General Application
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">From Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "Working at Sustainability Reporting has been the most fulfilling experience of my career. I get to use my engineering skills to solve real environmental challenges, and I'm surrounded by people who are passionate about making a difference."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team member portrait" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-500">Software Engineer, 2 years at Sustainability Reporting</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "I've never worked at a company that so perfectly blends purpose with innovation. The flexible work policy allows me to do my best work while maintaining balance, and I know that what we're building is helping companies make meaningful environmental improvements."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team member portrait" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Kim</h4>
                  <p className="text-sm text-gray-500">Product Manager, 3 years at Sustainability Reporting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interview Process */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Interview Process</h2>
        <p className="text-gray-600 mb-8">
          We've designed a thoughtful interview process to ensure alignment with our values, culture, and technical requirements. Here's what to expect:
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-teal-200"></div>
          
          <div className="space-y-8">
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  1
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Application Review</h3>
                <p className="text-gray-600">Our recruiting team reviews your application and reaches out if your experience and skills align with our needs.</p>
              </div>
            </div>
            
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  2
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Initial Conversation</h3>
                <p className="text-gray-600">A 30-minute video call with a recruiter to discuss your background, interests, and answer any questions about the role and company.</p>
              </div>
            </div>
            
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  3
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Technical Assessment</h3>
                <p className="text-gray-600">A role-specific exercise that mimics the actual work you'd be doing, designed to be completed in 2-3 hours at your convenience.</p>
              </div>
            </div>
            
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  4
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Team Interviews</h3>
                <p className="text-gray-600">A series of conversations with future teammates and cross-functional partners to assess technical skills and cultural alignment.</p>
              </div>
            </div>
            
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  5
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Final Conversation</h3>
                <p className="text-gray-600">Meet with a company leader to discuss the bigger picture of our mission and your potential contribution to it.</p>
              </div>
            </div>
            
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center relative z-10">
                  6
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-2">Offer & Onboarding</h3>
                <p className="text-gray-600">We aim to make decisions quickly. If selected, you'll receive an offer and begin our comprehensive onboarding program.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to make an impact?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our team of passionate professionals working to transform how organizations approach sustainability.
          </p>
          <Button className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  );
};

// Job Card Component
interface JobCardProps {
  title: string;
  department: string;
  location: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, department, location, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">{department}</span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{location}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="mr-2">Learn More</Button>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CareersPage;