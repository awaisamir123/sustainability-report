import React from 'react';
import { useLocation } from 'wouter';
import { Metadata } from '@/components/Metadata';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  type: 'paid' | 'consultation';
  price: number;
  features: string[];
  popular?: boolean;
}

export default function ServicesPage() {
  const { user, purchaseService, bookConsultation, hasServiceAccess, hasConsultationBooked } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const navigate = (path: string) => setLocation(path);

  const paidServices: Service[] = [
    {
      id: 'esg-rating',
      name: 'ESG Rating Calculator',
      description: 'Calculate and benchmark your organization\'s ESG performance against industry standards and peers.',
      type: 'paid',
      price: 149,
      features: [
        'Comprehensive ESG scoring',
        'Industry benchmarking',
        'Performance trend analysis',
        'Improvement recommendations',
        'Exportable reports'
      ],
      popular: true
    },
    {
      id: 'ghg-emissions',
      name: 'GHG Emissions Calculator',
      description: 'Track and calculate your organization\'s greenhouse gas emissions across all scopes.',
      type: 'paid',
      price: 199,
      features: [
        'Scope 1, 2, and 3 emissions tracking',
        'Carbon offset calculations',
        'Historical data comparison',
        'Reduction scenario planning',
        'Compliance reporting templates'
      ]
    },
    {
      id: 'product-carbon-footprint',
      name: 'Product Carbon Footprint',
      description: 'Calculate the carbon footprint of individual products across their lifecycle.',
      type: 'paid',
      price: 129,
      features: [
        'Lifecycle assessment',
        'Supply chain emissions mapping',
        'Comparative product analysis',
        'Carbon labeling support',
        'Reduction opportunity identification'
      ]
    }
  ];

  const consultationServices: Service[] = [
    {
      id: 'materiality',
      name: 'Materiality Assessment',
      description: 'Expert-led evaluation to identify and prioritize the sustainability issues most relevant to your business.',
      type: 'consultation',
      price: 299,
      features: [
        'Stakeholder engagement guidance',
        '90-minute expert consultation',
        'Customized materiality matrix',
        'Sector-specific insights',
        'Strategic recommendations'
      ],
      popular: true
    },
    {
      id: 'benchmarks',
      name: 'Competitive Benchmarking',
      description: 'Compare your sustainability performance against industry leaders and competitors.',
      type: 'consultation',
      price: 349,
      features: [
        'Peer performance analysis',
        'Best practice identification',
        'Gap assessment',
        'Strategic positioning advice',
        'Improvement roadmap development'
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance & Certification',
      description: 'Navigate complex regulatory requirements and certification processes with expert guidance.',
      type: 'consultation',
      price: 399,
      features: [
        'Regulatory landscape assessment',
        'Compliance gap analysis',
        'Certification readiness review',
        'Documentation preparation guidance',
        'Audit preparation support'
      ]
    }
  ];

  const handlePurchase = (service: Service) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase this service.",
        variant: "destructive"
      });
      return;
    }

    if (service.type === 'paid') {
      purchaseService.mutate(
        { serviceName: service.id },
        {
          onSuccess: () => {
            toast({
              title: "Service Purchased",
              description: `You now have access to ${service.name}.`,
              variant: "default"
            });
            navigate(`/${service.id}`);
          },
          onError: (error) => {
            toast({
              title: "Purchase Failed",
              description: error.message,
              variant: "destructive"
            });
          }
        }
      );
    } else if (service.type === 'consultation') {
      bookConsultation.mutate(
        { serviceName: service.id },
        {
          onSuccess: () => {
            toast({
              title: "Consultation Booked",
              description: `Your consultation for ${service.name} has been booked.`,
              variant: "default"
            });
            navigate(`/${service.id}`);
          },
          onError: (error) => {
            toast({
              title: "Booking Failed",
              description: error.message,
              variant: "destructive"
            });
          }
        }
      );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Metadata
        title="Premium Services | Sustainability Reporting Platform"
        description="Browse and purchase premium sustainability services and expert consultations"
      />
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium Services</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Unlock advanced sustainability tools and expert consultations to accelerate your organization's ESG journey. 
          Choose from our range of specialized services designed to help you measure, report, and improve your sustainability performance.
        </p>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Premium Tools & Calculators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidServices.map((service) => (
              <Card key={service.id} className={`overflow-hidden ${service.popular ? 'border-primary' : ''}`}>
                {service.popular && (
                  <div className="bg-primary text-white text-center py-1 text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{service.name}</CardTitle>
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                      Paid Service
                    </Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${service.price}</span>
                    <span className="text-gray-500 ml-1">one-time</span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-2">
                  {hasServiceAccess(service.id) ? (
                    <Button className="w-full" variant="outline" onClick={() => navigate(`/${service.id}`)}>
                      Access Tool
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handlePurchase(service)}
                      disabled={purchaseService.isPending}
                    >
                      {purchaseService.isPending ? 'Processing...' : 'Purchase Access'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Expert Consultations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultationServices.map((service) => (
              <Card key={service.id} className={`overflow-hidden ${service.popular ? 'border-primary' : ''}`}>
                {service.popular && (
                  <div className="bg-primary text-white text-center py-1 text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{service.name}</CardTitle>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Consultation
                    </Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${service.price}</span>
                    <span className="text-gray-500 ml-1">per session</span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-2">
                  {hasConsultationBooked(service.id) ? (
                    <Button className="w-full" variant="outline" onClick={() => navigate(`/${service.id}`)}>
                      View Consultation
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handlePurchase(service)}
                      disabled={bookConsultation.isPending}
                    >
                      {bookConsultation.isPending ? 'Processing...' : 'Book Consultation'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}