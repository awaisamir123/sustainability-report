import React from 'react';
import { Route } from 'wouter';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

type PublicRouteProps = {
  path: string;
  component: React.ComponentType;
};

export function PublicRoute({ path, component: Component }: PublicRouteProps) {
  return (
    <Route path={path}>
      <div className="min-h-screen flex flex-col bg-white">
        <LandingHeader />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <Component />
          </div>
        </main>
        
        <LandingFooter />
      </div>
    </Route>
  );
}