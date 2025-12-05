import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Info, HelpCircle, PlusCircle, MinusCircle, Save, FileText, BarChart2, ChevronDown, ChevronUp, PieChart } from 'lucide-react';
import GHGReportVisualizations from './GHGReportVisualizations';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper component for guidance tooltips
const GuidanceTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm">
        <p className="text-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Define emission factor sources and default values
const EMISSION_FACTORS = {
  electricity: {
    coal: 0.95, // kg CO2e per kWh
    natural_gas: 0.38,
    renewable: 0,
    grid_average: 0.42
  },
  fuel: {
    gasoline: 2.32, // kg CO2e per liter
    diesel: 2.68,
    natural_gas: 2.03, // kg CO2e per m3
    propane: 1.53 // kg CO2e per liter
  },
  business_travel: {
    car: 0.17, // kg CO2e per km
    bus: 0.1,
    train: 0.04,
    short_haul_flight: 0.16,
    long_haul_flight: 0.21
  }
};

// Define the GHG data entry schema
const ghgDataSchema = z.object({
  // Report Information
  organizationName: z.string().min(2, { message: "Organization name is required" }),
  reportingPeriodStart: z.string().min(1, { message: "Start date is required" }),
  reportingPeriodEnd: z.string().min(1, { message: "End date is required" }),
  boundaryType: z.enum(["operational", "financial", "equity"], {
    required_error: "Please select a boundary approach",
  }),
  baseYear: z.string().min(1, { message: "Base year is required" }),
  verificationStatus: z.enum(["none", "limited", "reasonable", "pending"], {
    required_error: "Please select verification status",
  }).default("none"),
  verificationProvider: z.string().optional(),
  
  // Visualization related fields
  renewableEnergyPercent: z.number().min(0).max(100).default(30),
  reductionTarget: z.number().min(0).max(100).default(50),
});

// Types for emissions data
interface EmissionSource {
  id: string;
  name: string;
  category: string;
  scope: '1' | '2' | '3';
  activityData: number;
  activityUnit: string;
  emissionFactor: number;
  emissionFactorSource: string;
  emissions: number;
}

interface EmissionCategory {
  id: string;
  name: string;
  scope: '1' | '2' | '3';
  sources: EmissionSource[];
}

// Type definition for chart data
interface EmissionData {
  scope1: number;
  scope2: number;
  scope3: number;
  totalEmissions: number;
  yearlyData: {
    year: string;
    scope1: number;
    scope2: number;
    scope3: number;
  }[];
  scope3Breakdown: {
    category: string;
    value: number;
  }[];
  renewableEnergy: number;
  nonRenewableEnergy: number;
  targetReduction: number;
  currentReduction: number;
}

export default function GHGDataEntryForm() {
  const [activeTab, setActiveTab] = useState('report-info');
  const [showCharts, setShowCharts] = useState(true);
  const [chartData, setChartData] = useState<EmissionData>({
    scope1: 0,
    scope2: 0,
    scope3: 0,
    totalEmissions: 0,
    yearlyData: [
      { year: new Date().getFullYear().toString(), scope1: 0, scope2: 0, scope3: 0 },
      { year: (new Date().getFullYear() - 1).toString(), scope1: 0, scope2: 0, scope3: 0 },
    ],
    scope3Breakdown: [],
    renewableEnergy: 30,
    nonRenewableEnergy: 70,
    targetReduction: 50,
    currentReduction: 0,
  });
  const [emissionCategories, setEmissionCategories] = useState<EmissionCategory[]>([
    {
      id: 'stationary-combustion',
      name: 'Stationary Combustion',
      scope: '1',
      sources: [
        {
          id: 'natural-gas-boiler',
          name: 'Natural Gas Boiler',
          category: 'stationary-combustion',
          scope: '1',
          activityData: 0,
          activityUnit: 'm³',
          emissionFactor: EMISSION_FACTORS.fuel.natural_gas,
          emissionFactorSource: 'DEFRA 2023',
          emissions: 0
        }
      ]
    },
    {
      id: 'mobile-combustion',
      name: 'Mobile Combustion',
      scope: '1',
      sources: [
        {
          id: 'company-vehicles',
          name: 'Company Vehicles (Gasoline)',
          category: 'mobile-combustion',
          scope: '1',
          activityData: 0,
          activityUnit: 'liters',
          emissionFactor: EMISSION_FACTORS.fuel.gasoline,
          emissionFactorSource: 'DEFRA 2023',
          emissions: 0
        }
      ]
    },
    {
      id: 'purchased-electricity',
      name: 'Purchased Electricity',
      scope: '2',
      sources: [
        {
          id: 'grid-electricity',
          name: 'Grid Electricity',
          category: 'purchased-electricity',
          scope: '2',
          activityData: 0,
          activityUnit: 'kWh',
          emissionFactor: EMISSION_FACTORS.electricity.grid_average,
          emissionFactorSource: 'IEA 2023',
          emissions: 0
        }
      ]
    },
    {
      id: 'business-travel',
      name: 'Business Travel',
      scope: '3',
      sources: [
        {
          id: 'flights',
          name: 'Air Travel',
          category: 'business-travel',
          scope: '3',
          activityData: 0,
          activityUnit: 'passenger-km',
          emissionFactor: EMISSION_FACTORS.business_travel.short_haul_flight,
          emissionFactorSource: 'DEFRA 2023',
          emissions: 0
        }
      ]
    }
  ]);
  
  // Create form
  const form = useForm<z.infer<typeof ghgDataSchema>>({
    resolver: zodResolver(ghgDataSchema),
    defaultValues: {
      organizationName: '',
      reportingPeriodStart: new Date().getFullYear() + '-01-01',
      reportingPeriodEnd: new Date().getFullYear() + '-12-31',
      boundaryType: 'operational',
      baseYear: (new Date().getFullYear() - 1).toString(),
      verificationStatus: 'none',
      verificationProvider: '',
      renewableEnergyPercent: 30,
      reductionTarget: 50,
    },
  });

  // Calculate emissions for a source
  const calculateEmissions = (source: EmissionSource): number => {
    return source.activityData * source.emissionFactor;
  };

  // Update activity data for a source
  const updateActivityData = (
    categoryId: string,
    sourceId: string,
    activityData: number
  ) => {
    setEmissionCategories(prev => {
      return prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            sources: category.sources.map(source => {
              if (source.id === sourceId) {
                const emissions = activityData * source.emissionFactor;
                return {
                  ...source,
                  activityData,
                  emissions
                };
              }
              return source;
            })
          };
        }
        return category;
      });
    });
  };

  // Add new emission source to a category
  const addEmissionSource = (categoryId: string) => {
    setEmissionCategories(prev => {
      return prev.map(category => {
        if (category.id === categoryId) {
          // Find the category to determine default values based on scope
          let defaultEmissionFactor = 0;
          let defaultUnit = '';
          let defaultSource = '';
          
          if (category.scope === '1') {
            defaultEmissionFactor = EMISSION_FACTORS.fuel.natural_gas;
            defaultUnit = 'm³';
            defaultSource = 'DEFRA 2023';
          } else if (category.scope === '2') {
            defaultEmissionFactor = EMISSION_FACTORS.electricity.grid_average;
            defaultUnit = 'kWh';
            defaultSource = 'IEA 2023';
          } else {
            defaultEmissionFactor = EMISSION_FACTORS.business_travel.car;
            defaultUnit = 'km';
            defaultSource = 'DEFRA 2023';
          }
          
          return {
            ...category,
            sources: [
              ...category.sources,
              {
                id: `source-${Date.now()}`,
                name: `New ${category.name} Source`,
                category: category.id,
                scope: category.scope,
                activityData: 0,
                activityUnit: defaultUnit,
                emissionFactor: defaultEmissionFactor,
                emissionFactorSource: defaultSource,
                emissions: 0
              }
            ]
          };
        }
        return category;
      });
    });
  };
  
  // Remove emission source
  const removeEmissionSource = (categoryId: string, sourceId: string) => {
    setEmissionCategories(prev => {
      return prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            sources: category.sources.filter(source => source.id !== sourceId)
          };
        }
        return category;
      });
    });
  };
  
  // Add new emission category
  const addEmissionCategory = (scope: '1' | '2' | '3') => {
    const newCategory: EmissionCategory = {
      id: `category-${Date.now()}`,
      name: `New ${scope === '1' ? 'Scope 1' : scope === '2' ? 'Scope 2' : 'Scope 3'} Category`,
      scope,
      sources: []
    };
    
    setEmissionCategories(prev => [...prev, newCategory]);
  };
  
  // Calculate emissions totals by scope
  const calculateTotalsByScope = () => {
    const totals = {
      scope1: 0,
      scope2: 0,
      scope3: 0,
      total: 0
    };
    
    emissionCategories.forEach(category => {
      category.sources.forEach(source => {
        const emissions = source.emissions;
        
        if (category.scope === '1') totals.scope1 += emissions;
        else if (category.scope === '2') totals.scope2 += emissions;
        else if (category.scope === '3') totals.scope3 += emissions;
      });
    });
    
    totals.total = totals.scope1 + totals.scope2 + totals.scope3;
    return totals;
  };
  
  const emissionTotals = calculateTotalsByScope();
  
  // Update chart data whenever emission categories change
  useEffect(() => {
    const totals = calculateTotalsByScope();
    
    // Create Scope 3 breakdown data
    const scope3Categories: {category: string, value: number}[] = [];
    emissionCategories
      .filter(cat => cat.scope === '3')
      .forEach(category => {
        const totalCategoryEmissions = category.sources.reduce((sum, source) => sum + source.emissions, 0);
        if (totalCategoryEmissions > 0) {
          scope3Categories.push({
            category: category.name,
            value: totalCategoryEmissions / 1000 // Convert to tCO2e
          });
        }
      });
    
    // Get the base year data (simulate previous year data for demo purposes)
    const baseYear = form.getValues().baseYear || (new Date().getFullYear() - 1).toString();
    const currentYear = new Date().getFullYear().toString();
    
    // Generate yearly data - current year from form, base year is estimated higher
    const yearlyData = [
      {
        year: currentYear,
        scope1: totals.scope1 / 1000, // Convert to tCO2e
        scope2: totals.scope2 / 1000,
        scope3: totals.scope3 / 1000
      },
      {
        year: baseYear,
        scope1: (totals.scope1 * 1.1) / 1000, // Assume 10% higher emissions in base year
        scope2: (totals.scope2 * 1.15) / 1000, // Assume 15% higher emissions in base year
        scope3: (totals.scope3 * 1.12) / 1000, // Assume 12% higher emissions in base year
      }
    ];
    
    // Calculate current reduction from base year
    const baseYearTotal = yearlyData[1].scope1 + yearlyData[1].scope2 + yearlyData[1].scope3;
    const currentYearTotal = totals.total / 1000;
    const reductionPercent = baseYearTotal > 0 
      ? Math.round(((baseYearTotal - currentYearTotal) / baseYearTotal) * 100) 
      : 0;
    
    // Update chart data state
    setChartData({
      scope1: totals.scope1 / 1000,
      scope2: totals.scope2 / 1000,
      scope3: totals.scope3 / 1000,
      totalEmissions: totals.total / 1000,
      yearlyData: yearlyData,
      scope3Breakdown: scope3Categories.length > 0 ? scope3Categories : [
        { category: 'Purchased Goods', value: 10 },
        { category: 'Business Travel', value: 5 },
        { category: 'Employee Commuting', value: 3 }
      ],
      renewableEnergy: form.getValues().renewableEnergyPercent || 30,
      nonRenewableEnergy: 100 - (form.getValues().renewableEnergyPercent || 30),
      targetReduction: form.getValues().reductionTarget || 50,
      currentReduction: reductionPercent > 0 ? reductionPercent : 5,
    });
  }, [emissionCategories, form.watch('renewableEnergyPercent'), form.watch('reductionTarget')]);
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof ghgDataSchema>) => {
    // Combine form data with emissions data
    const completeData = {
      ...data,
      emissionCategories,
      emissionTotals: calculateTotalsByScope(),
      visualizations: showCharts ? chartData : null,
      includeCharts: showCharts
    };
    
    // In a real app, you would save this data to a database or state management
    console.log('GHG Data Submitted:', completeData);
    
    // Log chart data for export to PDF/DOCX
    if (showCharts) {
      console.log('Chart data for export:', chartData);
    }
    
    // TODO: Send data to backend or update global state
  };

  return (
    <div className="space-y-6 pb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">GHG Protocol Emissions Inventory</CardTitle>
          <CardDescription>
            Enter your organization's greenhouse gas emissions data following the GHG Protocol Corporate Standard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="report-info">
                <FileText className="mr-2 h-4 w-4" />
                Report Information
              </TabsTrigger>
              <TabsTrigger value="emission-data">
                <BarChart2 className="mr-2 h-4 w-4" />
                Emissions Data
              </TabsTrigger>
              <TabsTrigger value="visualizations">
                <PieChart className="mr-2 h-4 w-4" />
                Visualizations
              </TabsTrigger>
              <TabsTrigger value="summary">
                <Save className="mr-2 h-4 w-4" />
                Summary & Save
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualizations">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Emission Charts & Visualizations</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="show-charts" className="text-sm">Show charts in report</Label>
                    <Switch 
                      id="show-charts" 
                      checked={showCharts} 
                      onCheckedChange={setShowCharts} 
                    />
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  These visualizations will be included in your exported GHG Protocol report. The charts update automatically based on your emissions data.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Visual Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="renewable-energy">Renewable Energy Percentage (%)</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="renewable-energy"
                              type="number"
                              min="0"
                              max="100"
                              value={form.watch('renewableEnergyPercent')}
                              onChange={(e) => {
                                const value = Math.min(100, Math.max(0, Number(e.target.value)));
                                form.setValue('renewableEnergyPercent', value);
                              }}
                              className="w-24"
                            />
                            <span>%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">The percentage of energy from renewable sources</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reduction-target">Emission Reduction Target (%)</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="reduction-target"
                              type="number"
                              min="0"
                              max="100"
                              value={form.watch('reductionTarget')}
                              onChange={(e) => {
                                const value = Math.min(100, Math.max(0, Number(e.target.value)));
                                form.setValue('reductionTarget', value);
                              }}
                              className="w-24"
                            />
                            <span>%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Your organization's emissions reduction target from the base year</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Chart Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Total GHG Emissions:</p>
                            <p className="text-xl font-bold">{(emissionTotals.total / 1000).toFixed(2)} <span className="text-sm font-normal">tCO₂e</span></p>
                          </div>
                          <div>
                            <p className="font-medium">Reporting Period:</p>
                            <p>{form.getValues().reportingPeriodStart} to {form.getValues().reportingPeriodEnd}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="font-medium">Charts Included:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Emissions by Scope (Pie Chart)</li>
                            <li>Year-over-Year Comparison (Bar Chart)</li>
                            <li>Scope 3 Category Breakdown (Pie Chart)</li>
                            <li>Renewable Energy Mix (Donut Chart)</li>
                            <li>Target Progress (Progress Bar)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-xs text-muted-foreground">
                            These charts will be included in PDF and DOCX exports. For optimal printing, consider using landscape orientation.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`transition-all duration-300 ${showCharts ? 'opacity-100' : 'opacity-40'}`}>
                  <GHGReportVisualizations 
                    scope1={emissionTotals.scope1 / 1000}
                    scope2={emissionTotals.scope2 / 1000}
                    scope3={emissionTotals.scope3 / 1000}
                    totalEmissions={emissionTotals.total / 1000}
                    renewableEnergy={form.watch('renewableEnergyPercent')}
                    nonRenewableEnergy={100 - form.watch('renewableEnergyPercent')}
                    targetReduction={form.watch('reductionTarget')}
                    currentReduction={chartData.currentReduction}
                    yearlyData={chartData.yearlyData}
                    scope3Breakdown={chartData.scope3Breakdown}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('emission-data')}>
                    Back to Emissions Data
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('summary')}>
                    Continue to Summary
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="report-info">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Organization Information</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter basic information about your organization and the reporting period.
                      </p>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="organizationName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your organization name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="boundaryType"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel>Boundary Approach</FormLabel>
                                <GuidanceTooltip content="Operational Control: Report emissions from operations where you have control. Financial Control: Report emissions from operations where you have financial control. Equity Share: Report emissions based on ownership percentage." />
                              </div>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select boundary approach" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="operational">Operational Control</SelectItem>
                                  <SelectItem value="financial">Financial Control</SelectItem>
                                  <SelectItem value="equity">Equity Share</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Reporting Period</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="reportingPeriodStart"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reporting Period Start</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="reportingPeriodEnd"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reporting Period End</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Base Year & Verification</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="baseYear"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel>Base Year</FormLabel>
                                <GuidanceTooltip content="The base year is used as a reference point for tracking emissions over time. It should be a representative year with reliable data." />
                              </div>
                              <FormControl>
                                <Input placeholder="e.g., 2022" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="verificationStatus"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel>Verification Status</FormLabel>
                                <GuidanceTooltip content="Indicate whether your emissions inventory has been or will be verified by a third party. Limited assurance provides moderate confidence, while reasonable assurance provides high confidence." />
                              </div>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select verification status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="none">Not Verified</SelectItem>
                                  <SelectItem value="limited">Limited Assurance</SelectItem>
                                  <SelectItem value="reasonable">Reasonable Assurance</SelectItem>
                                  <SelectItem value="pending">Verification Pending</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {form.watch('verificationStatus') !== 'none' && (
                          <FormField
                            control={form.control}
                            name="verificationProvider"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Verification Provider</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name of verification provider" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab('emission-data')}>
                      Continue to Emissions Data
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="emission-data">
              <div className="space-y-8">
                {/* Scope 1 Emissions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Scope 1: Direct Emissions</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addEmissionCategory('1')}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {emissionCategories
                      .filter(category => category.scope === '1')
                      .map(category => (
                        <Card key={category.id} className="overflow-hidden">
                          <CardHeader className="pb-3 bg-muted/30">
                            <CardTitle className="text-md">{category.name}</CardTitle>
                          </CardHeader>
                          
                          <CardContent className="pt-4">
                            <div className="space-y-4">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[250px]">Source</TableHead>
                                      <TableHead className="w-[150px]">Activity Data</TableHead>
                                      <TableHead className="w-[100px]">Unit</TableHead>
                                      <TableHead className="w-[150px]">Emission Factor</TableHead>
                                      <TableHead className="w-[150px]">Factor Source</TableHead>
                                      <TableHead className="w-[150px]">Emissions (tCO₂e)</TableHead>
                                      <TableHead className="w-[80px]"></TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  
                                  <TableBody>
                                    {category.sources.map(source => (
                                      <TableRow key={source.id}>
                                        <TableCell>
                                          <Input 
                                            value={source.name} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, name: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.activityData} 
                                            onChange={(e) => updateActivityData(
                                              category.id,
                                              source.id,
                                              parseFloat(e.target.value) || 0
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Select 
                                            value={source.activityUnit}
                                            onValueChange={(value) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, activityUnit: value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          >
                                            <SelectTrigger className="w-[90px]">
                                              <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="kWh">kWh</SelectItem>
                                              <SelectItem value="MWh">MWh</SelectItem>
                                              <SelectItem value="GJ">GJ</SelectItem>
                                              <SelectItem value="m³">m³</SelectItem>
                                              <SelectItem value="liters">liters</SelectItem>
                                              <SelectItem value="kg">kg</SelectItem>
                                              <SelectItem value="tonnes">tonnes</SelectItem>
                                              <SelectItem value="km">km</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.emissionFactor} 
                                            onChange={(e) => {
                                              const newFactor = parseFloat(e.target.value) || 0;
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { 
                                                                ...src, 
                                                                emissionFactor: newFactor,
                                                                emissions: src.activityData * newFactor
                                                              }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            value={source.emissionFactorSource} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, emissionFactorSource: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                          {(source.emissions / 1000).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                          <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => removeEmissionSource(category.id, source.id)}
                                          >
                                            <MinusCircle className="h-4 w-4 text-destructive" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addEmissionSource(category.id)}
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Source
                                </Button>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">Category Total:</span>
                                  <span className="text-sm font-bold">
                                    {(category.sources.reduce((sum, source) => sum + source.emissions, 0) / 1000).toFixed(2)} tCO₂e
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                {/* Scope 2 Emissions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Scope 2: Indirect Emissions from Purchased Energy</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addEmissionCategory('2')}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {emissionCategories
                      .filter(category => category.scope === '2')
                      .map(category => (
                        <Card key={category.id} className="overflow-hidden">
                          <CardHeader className="pb-3 bg-muted/30">
                            <CardTitle className="text-md">{category.name}</CardTitle>
                          </CardHeader>
                          
                          <CardContent className="pt-4">
                            <div className="space-y-4">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[250px]">Source</TableHead>
                                      <TableHead className="w-[150px]">Activity Data</TableHead>
                                      <TableHead className="w-[100px]">Unit</TableHead>
                                      <TableHead className="w-[150px]">Emission Factor</TableHead>
                                      <TableHead className="w-[150px]">Factor Source</TableHead>
                                      <TableHead className="w-[150px]">Emissions (tCO₂e)</TableHead>
                                      <TableHead className="w-[80px]"></TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  
                                  <TableBody>
                                    {category.sources.map(source => (
                                      <TableRow key={source.id}>
                                        <TableCell>
                                          <Input 
                                            value={source.name} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, name: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.activityData} 
                                            onChange={(e) => updateActivityData(
                                              category.id,
                                              source.id,
                                              parseFloat(e.target.value) || 0
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Select 
                                            value={source.activityUnit}
                                            onValueChange={(value) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, activityUnit: value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          >
                                            <SelectTrigger className="w-[90px]">
                                              <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="kWh">kWh</SelectItem>
                                              <SelectItem value="MWh">MWh</SelectItem>
                                              <SelectItem value="GJ">GJ</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.emissionFactor} 
                                            onChange={(e) => {
                                              const newFactor = parseFloat(e.target.value) || 0;
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { 
                                                                ...src, 
                                                                emissionFactor: newFactor,
                                                                emissions: src.activityData * newFactor
                                                              }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            value={source.emissionFactorSource} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, emissionFactorSource: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                          {(source.emissions / 1000).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                          <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => removeEmissionSource(category.id, source.id)}
                                          >
                                            <MinusCircle className="h-4 w-4 text-destructive" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addEmissionSource(category.id)}
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Source
                                </Button>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">Category Total:</span>
                                  <span className="text-sm font-bold">
                                    {(category.sources.reduce((sum, source) => sum + source.emissions, 0) / 1000).toFixed(2)} tCO₂e
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                {/* Scope 3 Emissions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Scope 3: Other Indirect Emissions</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addEmissionCategory('3')}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {emissionCategories
                      .filter(category => category.scope === '3')
                      .map(category => (
                        <Card key={category.id} className="overflow-hidden">
                          <CardHeader className="pb-3 bg-muted/30">
                            <CardTitle className="text-md">{category.name}</CardTitle>
                          </CardHeader>
                          
                          <CardContent className="pt-4">
                            <div className="space-y-4">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[250px]">Source</TableHead>
                                      <TableHead className="w-[150px]">Activity Data</TableHead>
                                      <TableHead className="w-[100px]">Unit</TableHead>
                                      <TableHead className="w-[150px]">Emission Factor</TableHead>
                                      <TableHead className="w-[150px]">Factor Source</TableHead>
                                      <TableHead className="w-[150px]">Emissions (tCO₂e)</TableHead>
                                      <TableHead className="w-[80px]"></TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  
                                  <TableBody>
                                    {category.sources.map(source => (
                                      <TableRow key={source.id}>
                                        <TableCell>
                                          <Input 
                                            value={source.name} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, name: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.activityData} 
                                            onChange={(e) => updateActivityData(
                                              category.id,
                                              source.id,
                                              parseFloat(e.target.value) || 0
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Select 
                                            value={source.activityUnit}
                                            onValueChange={(value) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, activityUnit: value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          >
                                            <SelectTrigger className="w-[90px]">
                                              <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="km">km</SelectItem>
                                              <SelectItem value="miles">miles</SelectItem>
                                              <SelectItem value="passenger-km">passenger-km</SelectItem>
                                              <SelectItem value="kg">kg</SelectItem>
                                              <SelectItem value="tonnes">tonnes</SelectItem>
                                              <SelectItem value="$">$</SelectItem>
                                              <SelectItem value="units">units</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            value={source.emissionFactor} 
                                            onChange={(e) => {
                                              const newFactor = parseFloat(e.target.value) || 0;
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { 
                                                                ...src, 
                                                                emissionFactor: newFactor,
                                                                emissions: src.activityData * newFactor
                                                              }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            value={source.emissionFactorSource} 
                                            onChange={(e) => {
                                              setEmissionCategories(prev => 
                                                prev.map(cat => 
                                                  cat.id === category.id 
                                                    ? {
                                                        ...cat,
                                                        sources: cat.sources.map(src => 
                                                          src.id === source.id 
                                                            ? { ...src, emissionFactorSource: e.target.value }
                                                            : src
                                                        )
                                                      }
                                                    : cat
                                                )
                                              );
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                          {(source.emissions / 1000).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                          <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => removeEmissionSource(category.id, source.id)}
                                          >
                                            <MinusCircle className="h-4 w-4 text-destructive" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addEmissionSource(category.id)}
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Source
                                </Button>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">Category Total:</span>
                                  <span className="text-sm font-bold">
                                    {(category.sources.reduce((sum, source) => sum + source.emissions, 0) / 1000).toFixed(2)} tCO₂e
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab('summary')}>
                    Continue to Summary
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="visualizations">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">GHG Emissions Visualizations</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="show-charts" className="text-sm">Include charts in report</Label>
                    <Switch 
                      id="show-charts" 
                      checked={showCharts} 
                      onCheckedChange={setShowCharts} 
                    />
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  These visualizations will be included in your exported GHG Protocol report (PDF and DOCX). The charts update automatically based on your emissions data.
                </p>
                
                {/* Import our newly created visualization component */}
                <div className={`transition-all duration-300 ${showCharts ? 'opacity-100' : 'opacity-40'}`}>
                  <GHGReportVisualizations 
                    scope1={emissionTotals.scope1 / 1000}
                    scope2={emissionTotals.scope2 / 1000}
                    scope3={emissionTotals.scope3 / 1000}
                    totalEmissions={emissionTotals.total / 1000}
                    renewableEnergy={form.watch('renewableEnergyPercent')}
                    nonRenewableEnergy={100 - form.watch('renewableEnergyPercent')}
                    targetReduction={form.watch('reductionTarget')}
                    currentReduction={chartData.currentReduction}
                    yearlyData={chartData.yearlyData}
                    scope3Breakdown={chartData.scope3Breakdown}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('emission-data')}>
                    Back to Emissions Data
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('summary')}>
                    Continue to Summary
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Emissions Summary</h3>
                  
                  <Card className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm font-medium mb-2">Organization</div>
                          <div className="text-lg">{form.getValues().organizationName || '-'}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Reporting Period</div>
                          <div className="text-lg">
                            {form.getValues().reportingPeriodStart || '-'} to {form.getValues().reportingPeriodEnd || '-'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-md font-medium mb-4">GHG Emissions by Scope</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <Card className="bg-muted/30">
                              <CardContent className="pt-6 pb-4 px-6">
                                <div className="text-sm text-muted-foreground">Scope 1 Emissions</div>
                                <div className="text-2xl font-bold">{(emissionTotals.scope1 / 1000).toFixed(2)} <span className="text-sm font-normal">tCO₂e</span></div>
                                <div className="text-sm text-muted-foreground">Direct emissions from owned sources</div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-muted/30">
                              <CardContent className="pt-6 pb-4 px-6">
                                <div className="text-sm text-muted-foreground">Scope 2 Emissions</div>
                                <div className="text-2xl font-bold">{(emissionTotals.scope2 / 1000).toFixed(2)} <span className="text-sm font-normal">tCO₂e</span></div>
                                <div className="text-sm text-muted-foreground">Indirect emissions from purchased energy</div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-muted/30">
                              <CardContent className="pt-6 pb-4 px-6">
                                <div className="text-sm text-muted-foreground">Scope 3 Emissions</div>
                                <div className="text-2xl font-bold">{(emissionTotals.scope3 / 1000).toFixed(2)} <span className="text-sm font-normal">tCO₂e</span></div>
                                <div className="text-sm text-muted-foreground">Other indirect emissions</div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        <div>
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-6 pb-4 px-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm text-muted-foreground">Total GHG Emissions</div>
                                  <div className="text-3xl font-bold">{(emissionTotals.total / 1000).toFixed(2)} <span className="text-sm font-normal">tCO₂e</span></div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-sm text-muted-foreground">Verification Status</div>
                                  <div className="text-md">
                                    {form.getValues().verificationStatus === 'none' ? 'Not Verified' : 
                                     form.getValues().verificationStatus === 'limited' ? 'Limited Assurance' :
                                     form.getValues().verificationStatus === 'reasonable' ? 'Reasonable Assurance' :
                                     'Verification Pending'}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-md font-medium mb-4">Emissions by Category</h4>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Scope</TableHead>
                                <TableHead>Emissions (tCO₂e)</TableHead>
                                <TableHead className="text-right">% of Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {emissionCategories
                                .filter(category => category.sources.length > 0)
                                .map(category => {
                                  const categoryTotal = category.sources.reduce((sum, source) => sum + source.emissions, 0);
                                  const percentage = emissionTotals.total ? (categoryTotal / emissionTotals.total) * 100 : 0;
                                  
                                  return (
                                    <TableRow key={category.id}>
                                      <TableCell className="font-medium">{category.name}</TableCell>
                                      <TableCell>Scope {category.scope}</TableCell>
                                      <TableCell>{(categoryTotal / 1000).toFixed(2)}</TableCell>
                                      <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Add Visualizations to Summary if enabled */}
                {showCharts && (
                  <div className="mt-8 mb-8 border-t pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium">Report Visualizations</h3>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="summary-show-charts" className="text-sm">Include charts in export</Label>
                        <Switch 
                          id="summary-show-charts" 
                          checked={showCharts} 
                          onCheckedChange={setShowCharts} 
                        />
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      The following visualizations will be included in your PDF and DOCX exports. These charts reflect your current emissions data.
                    </p>
                    
                    <GHGReportVisualizations 
                      scope1={emissionTotals.scope1 / 1000}
                      scope2={emissionTotals.scope2 / 1000}
                      scope3={emissionTotals.scope3 / 1000}
                      totalEmissions={emissionTotals.total / 1000}
                      renewableEnergy={form.watch('renewableEnergyPercent')}
                      nonRenewableEnergy={100 - form.watch('renewableEnergyPercent')}
                      targetReduction={form.watch('reductionTarget')}
                      currentReduction={chartData.currentReduction}
                      yearlyData={chartData.yearlyData}
                      scope3Breakdown={chartData.scope3Breakdown}
                    />
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setActiveTab('visualizations')}
                  >
                    Back to Visualizations
                  </Button>
                  
                  <div className="space-x-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>Generate GHG Report</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}