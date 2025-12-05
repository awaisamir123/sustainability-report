import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Form schema for profile settings
const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

// Form schema for organization settings
const organizationFormSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  size: z.string().min(1, "Size is required"),
});

// Form schema for security settings
const securityFormSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmNewPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

// Mock user list for admin view
const usersMock = [
  { id: 1, username: "admin", displayName: "Admin User", email: "admin@example.com", role: "admin" },
  { id: 2, username: "demo", displayName: "Alex Morgan", email: "alex@example.com", role: "admin" },
  { id: 3, username: "jsmith", displayName: "John Smith", email: "john@example.com", role: "user" },
  { id: 4, username: "mjohnson", displayName: "Maria Johnson", email: "maria@example.com", role: "user" },
  { id: 5, username: "tlee", displayName: "Tim Lee", email: "tim@example.com", role: "user" },
];

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Get user info for form defaults
  const { data: userData } = useQuery<{ id: number, username: string, displayName?: string, email?: string, role: string }>({
    queryKey: ['/api/me']
  });
  
  // Get organization data
  const { data: organization } = useQuery({
    queryKey: ['/api/organizations'],
  });
  
  const isAdmin = userData?.role === "admin" || userData?.role === "super_admin";
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userData?.username || "",
      displayName: userData?.displayName || "",
      email: userData?.email || "",
    },
  });
  
  // Update when userData changes
  React.useEffect(() => {
    if (userData) {
      profileForm.setValue("username", userData.username);
      profileForm.setValue("displayName", userData.displayName || "");
      profileForm.setValue("email", userData.email || "");
    }
  }, [userData, profileForm]);
  
  // Organization form
  const organizationForm = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: organization?.[0]?.name || "",
      industry: organization?.[0]?.industry || "",
      size: organization?.[0]?.size || "",
    },
  });
  
  // Update when organization changes
  React.useEffect(() => {
    if (organization?.[0]) {
      organizationForm.setValue("name", organization[0].name);
      organizationForm.setValue("industry", organization[0].industry || "");
      organizationForm.setValue("size", organization[0].size || "");
    }
  }, [organization, organizationForm]);
  
  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [complianceNotifications, setComplianceNotifications] = useState(true);
  
  // API integration settings
  const [apiKey, setApiKey] = useState("sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  
  // Form submission handlers
  const updateProfileMutation = useMutation({
    mutationFn: (data: z.infer<typeof profileFormSchema>) => {
      return apiRequest('PATCH', '/api/user/profile', data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/me'] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const updateOrganizationMutation = useMutation({
    mutationFn: (data: z.infer<typeof organizationFormSchema>) => {
      return apiRequest('PATCH', '/api/organizations/1', data);
    },
    onSuccess: () => {
      toast({
        title: "Organization Updated",
        description: "Organization settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/organizations'] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const updatePasswordMutation = useMutation({
    mutationFn: (data: z.infer<typeof securityFormSchema>) => {
      return apiRequest('PATCH', '/api/user/password', data);
    },
    onSuccess: () => {
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
      securityForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const regenerateApiKey = () => {
    setApiKey(`sk_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`);
    toast({
      title: "API Key Regenerated",
      description: "Your API key has been regenerated successfully.",
    });
  };
  
  // Form submission handlers
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    updateProfileMutation.mutate(data);
  };
  
  const onOrganizationSubmit = (data: z.infer<typeof organizationFormSchema>) => {
    updateOrganizationMutation.mutate(data);
  };
  
  const onSecuritySubmit = (data: z.infer<typeof securityFormSchema>) => {
    updatePasswordMutation.mutate(data);
  };
  
  // User role management (admin only)
  const updateUserRole = (userId: number, newRole: string) => {
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${newRole}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-800">Settings</h2>
        <p className="text-neutral-500">Manage your account preferences and organization settings</p>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is how your name will appear in the app.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll use this email for notifications and password resets.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
              <CardDescription>
                Your account type and role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Type</h4>
                    <p className="text-sm text-neutral-500">Your current account type</p>
                  </div>
                  <Badge variant="secondary" className="text-sm font-normal">
                    {organization?.[0]?.size === "Enterprise" ? "Enterprise" : "Business"}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">User Role</h4>
                    <p className="text-sm text-neutral-500">Your permissions in the system</p>
                  </div>
                  <Badge className="text-sm font-normal bg-primary">
                    {userData?.role === "super_admin" ? "Super Admin" : userData?.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Organization Settings */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>
                Update your organization's details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...organizationForm}>
                <form onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)} className="space-y-6">
                  <FormField
                    control={organizationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={organizationForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Energy">Energy</SelectItem>
                            <SelectItem value="Financial Services">Financial Services</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={organizationForm.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organization size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Small">Small (1-50 employees)</SelectItem>
                            <SelectItem value="Medium">Medium (51-500 employees)</SelectItem>
                            <SelectItem value="Large">Large (501-5000 employees)</SelectItem>
                            <SelectItem value="Enterprise">Enterprise (5000+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={updateOrganizationMutation.isPending}
                  >
                    {updateOrganizationMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reporting Preferences</CardTitle>
              <CardDescription>
                Configure default reporting settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Default Reporting Framework</h4>
                    <p className="text-sm text-neutral-500">Select your primary reporting framework</p>
                  </div>
                  <Select defaultValue="GRI">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GRI">GRI</SelectItem>
                      <SelectItem value="TCFD">TCFD</SelectItem>
                      <SelectItem value="ESRS">ESRS</SelectItem>
                      <SelectItem value="CDP">CDP</SelectItem>
                      <SelectItem value="SASB">SASB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reporting Period</h4>
                    <p className="text-sm text-neutral-500">Set default reporting period</p>
                  </div>
                  <Select defaultValue="Annual">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Units of Measurement</h4>
                    <p className="text-sm text-neutral-500">Set your preferred units</p>
                  </div>
                  <Select defaultValue="metric">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="mt-4">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                  <FormField
                    control={securityForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Password must be at least 6 characters long.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={updatePasswordMutation.isPending}
                  >
                    {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage your API keys for integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Your API Key</h4>
                  <div className="flex">
                    <Input 
                      type="password" 
                      value={apiKey} 
                      readOnly 
                      className="font-mono"
                    />
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast({
                          title: "Copied",
                          description: "API key copied to clipboard",
                        });
                      }}
                    >
                      <span className="material-icons">content_copy</span>
                    </Button>
                  </div>
                  <p className="text-sm text-neutral-500 mt-2">
                    Use this key to authenticate API requests. Keep it secret.
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={regenerateApiKey}
                >
                  <span className="material-icons mr-2">refresh</span>
                  Regenerate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure how and when you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-neutral-500">Receive emails for important updates</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Report Notifications</h4>
                    <p className="text-sm text-neutral-500">Get notified when reports are generated or need attention</p>
                  </div>
                  <Switch 
                    checked={reportNotifications} 
                    onCheckedChange={setReportNotifications} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compliance Alerts</h4>
                    <p className="text-sm text-neutral-500">Receive alerts for compliance status changes</p>
                  </div>
                  <Switch 
                    checked={complianceNotifications} 
                    onCheckedChange={setComplianceNotifications} 
                  />
                </div>
              </div>
              
              <Button className="mt-6">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>
                Set thresholds for automated alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Emissions Alert Threshold</h4>
                  <p className="text-sm text-neutral-500 mb-2">
                    Get notified when emissions exceed this percentage of your target
                  </p>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80">80% of target</SelectItem>
                      <SelectItem value="90">90% of target</SelectItem>
                      <SelectItem value="100">100% of target</SelectItem>
                      <SelectItem value="110">110% of target</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Compliance Alert Timing</h4>
                  <p className="text-sm text-neutral-500 mb-2">
                    Get notified before compliance reporting deadlines
                  </p>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days before</SelectItem>
                      <SelectItem value="14">14 days before</SelectItem>
                      <SelectItem value="30">30 days before</SelectItem>
                      <SelectItem value="60">60 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="mt-2">
                  Save Alert Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Admin Settings */}
        {isAdmin && (
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users and their access levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Display Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersMock.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.displayName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select 
                              defaultValue={user.role}
                              onValueChange={(value) => updateUserRole(user.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                {userData?.role === "super_admin" && (
                                  <SelectItem value="super_admin">Super Admin</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <span className="material-icons">more_vert</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="mr-2">
                    <span className="material-icons mr-2">person_add</span>
                    Invite User
                  </Button>
                  <Button>
                    <span className="material-icons mr-2">group_add</span>
                    Manage Teams
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure global system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Data Import API</h4>
                      <p className="text-sm text-neutral-500">Allow data to be imported via API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Data Export API</h4>
                      <p className="text-sm text-neutral-500">Allow data to be exported via API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Default Organization Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="text-sm font-medium">Default Reporting Framework</label>
                        <Select defaultValue="GRI">
                          <SelectTrigger>
                            <SelectValue placeholder="Select framework" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GRI">GRI</SelectItem>
                            <SelectItem value="TCFD">TCFD</SelectItem>
                            <SelectItem value="ESRS">ESRS</SelectItem>
                            <SelectItem value="CDP">CDP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Default Units</label>
                        <Select defaultValue="tCO2e">
                          <SelectTrigger>
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tCO2e">tCO2e</SelectItem>
                            <SelectItem value="kgCO2e">kgCO2e</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mt-4">
                    Save System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;