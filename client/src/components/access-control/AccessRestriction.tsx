import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Link } from 'wouter';
import { LockKeyhole, ArrowRight } from 'lucide-react';

type ServiceType = 'paid' | 'consultation';

interface AccessRestrictionProps {
  children: React.ReactNode;
  serviceId: string;
  serviceName: string;
  serviceType: ServiceType;
  description?: string;
}

export const AccessRestriction: React.FC<AccessRestrictionProps> = ({
  children,
  serviceId,
  serviceName,
  serviceType,
  description
}) => {
  const { user, hasServiceAccess, hasConsultationBooked } = useAuth();
  
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Card className="border-2 border-orange-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg text-orange-700">Authentication Required</CardTitle>
          </div>
          <CardDescription>
            You need to sign in to access {serviceName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Please sign in or create an account to access this feature.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/auth">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Check if user has access to paid service
  if (serviceType === 'paid' && !hasServiceAccess(serviceId)) {
    return (
      <Card className="border-2 border-amber-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg text-amber-700">Premium Feature</CardTitle>
          </div>
          <CardDescription>
            This feature requires a premium subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {description || `${serviceName} is a premium feature. Purchase this feature to unlock full access.`}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/services">
              View Premium Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Check if user has booked a consultation
  if (serviceType === 'consultation' && !hasConsultationBooked(serviceId)) {
    return (
      <Card className="border-2 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg text-purple-700">Consultation Required</CardTitle>
          </div>
          <CardDescription>
            This feature requires expert consultation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {description || `${serviceName} requires professional assistance. Book a consultation with our experts to unlock access.`}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/services">
              Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // If user has access, render children
  return <>{children}</>;
};