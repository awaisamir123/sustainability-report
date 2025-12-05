import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/ui/status-badge";

const reportFormSchema = z.object({
  organizationId: z.coerce.number().min(1, "Organization is required"),
  reportName: z.string().min(2, "Report name is required"),
  reportType: z.string().min(1, "Report type is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  status: z.string().default("draft"),
  data: z.any().optional(),
  createdBy: z.coerce.number().min(1, "User ID is required")
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get user info for form defaults
  const { data: userData } = useQuery<{ id: number }>({
    queryKey: ['/api/me']
  });
  
  // Get organizations for dropdown
  const { data: organizations } = useQuery({
    queryKey: ['/api/organizations']
  });
  
  // Get reports
  const { data: reports, isLoading: isLoadingReports } = useQuery({
    queryKey: ['/api/reports', { organizationId: 1 }]
  });
  
  // Report form
  const form = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      organizationId: 1,
      reportName: "",
      reportType: "GRI",
      startDate: new Date(new Date().getFullYear(), 0, 1), // Jan 1st of current year
      endDate: new Date(),
      status: "draft",
      createdBy: userData?.id || 1
    }
  });
  
  // Create report mutation
  const createReportMutation = useMutation({
    mutationFn: (data: z.infer<typeof reportFormSchema>) => {
      return apiRequest('POST', '/api/reports', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Report has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create report: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Update report status mutation
  const updateReportStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return apiRequest('PATCH', `/api/reports/${id}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Report status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update report status: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Download report as PDF
  const downloadReport = async (id: number, reportName: string) => {
    try {
      const response = await fetch(`/api/reports/${id}/pdf`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      // Create a blob from the PDF stream
      const blob = await response.blob();
      // Create a link to download it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      toast({
        title: "Success",
        description: "Report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report.",
        variant: "destructive",
      });
    }
  };
  
  // Export report as CSV
  const exportReportAsCSV = async (orgId: number, year: number) => {
    try {
      const response = await fetch(`/api/export/emissions?organizationId=${orgId}&year=${year}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      // Create a blob from the CSV stream
      const blob = await response.blob();
      // Create a link to download it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emissions_${year}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      toast({
        title: "Success",
        description: "Data has been exported to CSV.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data.",
        variant: "destructive",
      });
    }
  };
  
  // Form submission
  const onSubmit = (data: z.infer<typeof reportFormSchema>) => {
    createReportMutation.mutate(data);
  };
  
  // Filter reports based on active tab
  const getFilteredReports = () => {
    if (!reports) return [];
    
    if (activeTab === 'all') {
      return reports;
    }
    
    return reports.filter((report: any) => report.status === activeTab);
  };
  
  // Get report type badge color
  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'GRI':
        return 'bg-green-100 text-green-800';
      case 'TCFD':
        return 'bg-blue-100 text-blue-800';
      case 'ESRS':
        return 'bg-purple-100 text-purple-800';
      case 'CDP':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sustainability Reports</h2>
          <p className="text-neutral-500">Create and manage your sustainability reports</p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/report-generator">
            <Button variant="outline" className="gap-1">
              <span className="material-icons text-[18px]">auto_stories</span>
              Report Generator
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <span className="material-icons text-[18px] mr-1">add</span>
                New Report
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Report</DialogTitle>
              <DialogDescription>
                Create a new sustainability report based on your collected data.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="organizationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {organizations?.map((org: any) => (
                            <SelectItem key={org.id} value={org.id.toString()}>
                              {org.name}
                            </SelectItem>
                          )) || <SelectItem value="1">Demo Company</SelectItem>}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reportName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Annual Sustainability Report 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Framework</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select framework" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GRI">GRI Standards</SelectItem>
                          <SelectItem value="TCFD">TCFD</SelectItem>
                          <SelectItem value="ESRS">ESRS</SelectItem>
                          <SelectItem value="CDP">CDP</SelectItem>
                          <SelectItem value="SASB">SASB</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full pl-3 text-left font-normal"
                                }
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full pl-3 text-left font-normal"
                                }
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="mt-6">
                  <Button 
                    type="submit" 
                    disabled={createReportMutation.isPending}
                  >
                    {createReportMutation.isPending ? "Creating..." : "Create Report"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {isLoadingReports ? (
            <div className="flex items-center justify-center h-60">
              <p className="text-neutral-500">Loading reports...</p>
            </div>
          ) : getFilteredReports().length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60">
              <div className="rounded-full bg-neutral-100 p-3 mb-4">
                <span className="material-icons text-neutral-400 text-3xl">description</span>
              </div>
              <h3 className="text-lg font-medium mb-1">No reports found</h3>
              <p className="text-neutral-500 mb-4">
                {activeTab === 'all' 
                  ? "You haven't created any reports yet."
                  : `You don't have any ${activeTab} reports.`
                }
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>Create your first report</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredReports().map((report: any) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.reportType)}`}>
                          {report.reportType}
                        </span>
                        <CardTitle className="mt-2">{report.reportName}</CardTitle>
                      </div>
                      <StatusBadge status={report.status as any} />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-neutral-500 mb-2">
                      <p>Period: {format(new Date(report.startDate), "MMM d, yyyy")} - {format(new Date(report.endDate), "MMM d, yyyy")}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {report.status === 'completed' && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          <span className="material-icons text-[14px] mr-0.5">check_circle</span>
                          Verified
                        </span>
                      )}
                      {report.status === 'in-progress' && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="material-icons text-[14px] mr-0.5">pending</span>
                          In review
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between gap-2">
                    <Button variant="outline" size="sm" onClick={() => downloadReport(report.id, report.reportName)}>
                      <span className="material-icons text-[16px] mr-1">download</span>
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => exportReportAsCSV(report.organizationId, new Date(report.startDate).getFullYear())}
                    >
                      <span className="material-icons text-[16px] mr-1">file_download</span>
                      CSV
                    </Button>
                    {report.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateReportStatusMutation.mutate({ id: report.id, status: 'in-progress' })}
                      >
                        <span className="material-icons text-[16px] mr-1">send</span>
                        Submit
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Templates & Resources</CardTitle>
          <CardDescription>
            Access standardized templates and guidelines for sustainability reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-green-100 p-2 mr-3">
                    <span className="material-icons text-green-600">description</span>
                  </div>
                  <h3 className="font-medium">GRI Standards</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Global Reporting Initiative standards for sustainability reporting.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">file_open</span>
                  Use Template
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <span className="material-icons text-blue-600">description</span>
                  </div>
                  <h3 className="font-medium">TCFD Framework</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Task Force on Climate-related Financial Disclosures framework.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">file_open</span>
                  Use Template
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-purple-100 p-2 mr-3">
                    <span className="material-icons text-purple-600">description</span>
                  </div>
                  <h3 className="font-medium">ESRS Template</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  European Sustainability Reporting Standards compliance.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">file_open</span>
                  Use Template
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-yellow-100 p-2 mr-3">
                    <span className="material-icons text-yellow-600">description</span>
                  </div>
                  <h3 className="font-medium">CDP Questionnaire</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Carbon Disclosure Project climate change questionnaire.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">file_open</span>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
