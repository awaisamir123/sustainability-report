import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Calendar } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  type: 'paid' | 'consultation';
  price: number;
}

export function UserServices() {
  const { user, isLoading } = useAuth();
  
  // Fetch available services
  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!user,
  });
  
  if (isLoading || !user) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your services...</p>
      </div>
    );
  }
  
  // Get purchased and booked services
  const purchasedServices = (user.servicesPurchased as string[] || [])
    .map(id => services?.find(s => s.id === id))
    .filter(Boolean) as Service[];
    
  const bookedConsultations = (user.consultationsBooked as string[] || [])
    .map(id => services?.find(s => s.id === id))
    .filter(Boolean) as Service[];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="purchased">
          <TabsList className="mb-4">
            <TabsTrigger value="purchased">
              <CreditCard className="h-4 w-4 mr-2" />
              Purchased Services
              {purchasedServices.length > 0 && (
                <Badge className="ml-2 bg-primary">{purchasedServices.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="consultations">
              <Calendar className="h-4 w-4 mr-2" />
              Consultations
              {bookedConsultations.length > 0 && (
                <Badge className="ml-2 bg-indigo-600">{bookedConsultations.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchased" className="space-y-4">
            {purchasedServices.length === 0 ? (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500">You haven't purchased any services yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {purchasedServices.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">Premium access</p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="consultations" className="space-y-4">
            {bookedConsultations.length === 0 ? (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500">You haven't booked any consultations yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {bookedConsultations.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">Expert consultation</p>
                    </div>
                    <Badge className="bg-indigo-600">Scheduled</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}