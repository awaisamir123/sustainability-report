import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

type RouteAccessLevel = 'public' | 'auth' | 'paid' | 'admin';

type AccessControlRouteProps = {
  path: string;
  component: React.ComponentType;
  accessLevel: RouteAccessLevel;
};

export function AccessControlRoute({ 
  path, 
  component: Component, 
  accessLevel 
}: AccessControlRouteProps) {
  const { user, isLoading } = useAuth();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  // Handle different access levels
  switch (accessLevel) {
    case 'public':
      // Public routes are accessible to everyone
      return (
        <Route path={path}>
          <Component />
        </Route>
      );

    case 'auth':
      // Auth routes require any logged in user
      if (!user) {
        return (
          <Route path={path}>
            <Redirect to="/auth" />
          </Route>
        );
      }
      return (
        <Route path={path}>
          <Component />
        </Route>
      );

    case 'paid':
      // Paid routes require logged in user with subscription
      if (!user) {
        return (
          <Route path={path}>
            <Redirect to="/auth" />
          </Route>
        );
      }
      
      // For now, simple authentication check, but would validate subscription in production
      return (
        <Route path={path}>
          <Component />
        </Route>
      );

    case 'admin':
      // Admin routes require admin role
      if (!user || user.role !== 'admin') {
        return (
          <Route path={path}>
            <Redirect to="/auth" />
          </Route>
        );
      }
      return (
        <Route path={path}>
          <Component />
        </Route>
      );
  }
}