import React from 'react';
import { useLocation } from 'wouter';
import { Metadata } from '@/components/Metadata';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserServicesPage() {
  const { user, hasServiceAccess, hasConsultationBooked } = useAuth();
  const [, setLocation] = useLocation();
  
  const navigate = (path: string) => setLocation(path);
  
  // Define the services information
  const paidServices = [
    {
      id: 'esg-rating',
      name: 'ESG Rating Calculator',
      description: 'Calculate and benchmark your organization\'s ESG performance against industry standards and peers.',
      icon: 'equalizer'
    },
    {
      id: 'ghg-emissions',
      name: 'GHG Emissions Calculator',
      description: 'Track and calculate your organization\'s greenhouse gas emissions across all scopes.',
      icon: 'trending_up'
    },
    {
      id: 'product-carbon-footprint',
      name: 'Product Carbon Footprint',
      description: 'Calculate the carbon footprint of individual products across their lifecycle.',
      icon: 'inventory_2'
    }
  ];

  const consultationServices = [
    {
      id: 'materiality',
      name: 'Materiality Assessment',
      description: 'Expert-led evaluation to identify and prioritize the sustainability issues most relevant to your business.',
      icon: 'assignment',
      sessionDate: 'May 25, 2025',
      sessionTime: '10:00 AM - 11:30 AM EST'
    },
    {
      id: 'benchmarks',
      name: 'Competitive Benchmarking',
      description: 'Compare your sustainability performance against industry leaders and competitors.',
      icon: 'timeline',
      sessionDate: 'May 27, 2025',
      sessionTime: '2:00 PM - 3:30 PM EST'
    },
    {
      id: 'compliance',
      name: 'Compliance & Certification',
      description: 'Navigate complex regulatory requirements and certification processes with expert guidance.',
      icon: 'fact_check',
      sessionDate: 'May 29, 2025',
      sessionTime: '11:00 AM - 12:30 PM EST'
    }
  ];

  // Filter out services that the user has purchased
  const userPaidServices = paidServices.filter(service => hasServiceAccess(service.id));
  const userConsultations = consultationServices.filter(service => hasConsultationBooked(service.id));

  // Check if user has no subscribed services at all
  const hasNoServices = userPaidServices.length === 0 && userConsultations.length === 0;
  
  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 p-4 rounded-full bg-amber-100 inline-block">
            <span className="material-icons text-amber-600 text-4xl">lock</span>
          </div>
          <h1 className="text-2xl font-bold mb-3">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your subscribed services and booked consultations.
          </p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Metadata
        title="My Subscriptions | Sustainability Reporting Platform"
        description="View and manage your purchased premium services and booked consultations"
      />
      
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Subscriptions</h1>
            <p className="text-gray-600 max-w-2xl">
              View and access all the premium services and consultations you've subscribed to.
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            variant="outline" 
            onClick={() => navigate('/services')}
          >
            <span className="material-icons text-[20px] mr-2">add</span>
            Browse More Services
          </Button>
        </div>
        
        {hasNoServices ? (
          <div className="bg-white border rounded-lg p-8 text-center my-8">
            <div className="mb-4 p-4 rounded-full bg-gray-100 inline-block">
              <span className="material-icons text-gray-500 text-4xl">workspace_premium</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">No Subscriptions Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't purchased any premium services or booked consultations yet. 
              Explore our offerings to enhance your sustainability reporting capabilities.
            </p>
            <Button onClick={() => navigate('/services')}>
              Browse Available Services
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="premium-tools" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="premium-tools" className="flex items-center">
                <span className="material-icons text-[18px] mr-2">build_circle</span>
                Premium Tools
                {userPaidServices.length > 0 && (
                  <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                    {userPaidServices.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="consultations" className="flex items-center">
                <span className="material-icons text-[18px] mr-2">person</span>
                Booked Consultations
                {userConsultations.length > 0 && (
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    {userConsultations.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="premium-tools" className="mt-0">
              {userPaidServices.length === 0 ? (
                <div className="bg-white border rounded-lg p-8 text-center my-4">
                  <p className="text-gray-600 mb-4">
                    You haven't purchased any premium tools yet.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/services')}>
                    Browse Premium Tools
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPaidServices.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                              <span className="material-icons">{service.icon}</span>
                            </div>
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm mb-2">
                          <span className="material-icons text-green-600 text-[16px] mr-1">check_circle</span>
                          <span className="text-green-800">Unlimited access</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="material-icons text-green-600 text-[16px] mr-1">calendar_today</span>
                          <span className="text-gray-600">Purchased on May 15, 2025</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => navigate(`/${service.id}`)}>
                          Launch Tool
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="consultations" className="mt-0">
              {userConsultations.length === 0 ? (
                <div className="bg-white border rounded-lg p-8 text-center my-4">
                  <p className="text-gray-600 mb-4">
                    You haven't booked any expert consultations yet.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/services')}>
                    Browse Consultations
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userConsultations.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="bg-amber-100 text-amber-800 p-2 rounded-lg mr-3">
                              <span className="material-icons">{service.icon}</span>
                            </div>
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Booked
                          </Badge>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm mb-2">
                          <span className="material-icons text-amber-600 text-[16px] mr-1">event</span>
                          <span className="text-gray-800">{service.sessionDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="material-icons text-amber-600 text-[16px] mr-1">schedule</span>
                          <span className="text-gray-800">{service.sessionTime}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => navigate(`/${service.id}`)}>
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}