import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { HelpCircle, BarChart2, PieChart, LineChart, Download, Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const SASB_SECTORS = [
  "Consumer Goods",
  "Extractives & Minerals Processing",
  "Financials",
  "Food & Beverage",
  "Health Care",
  "Infrastructure",
  "Renewable Resources & Alternative Energy",
  "Resource Transformation",
  "Services",
  "Technology & Communications",
  "Transportation"
];

const S1_MATERIAL_TOPICS = {
  "Consumer Goods": [
    "Supply Chain Management",
    "Product Lifecycle Management",
    "Labor Practices",
    "Product Quality & Safety",
    "Materials Sourcing & Efficiency"
  ],
  "Technology & Communications": [
    "Data Privacy & Security",
    "Intellectual Property Protection",
    "Employee Engagement & Diversity",
    "Energy Management",
    "Business Ethics"
  ],
  "Financials": [
    "Systemic Risk Management",
    "Business Ethics",
    "Data Security & Customer Privacy",
    "Inclusive Finance",
    "Integration of ESG in Investment Analysis"
  ],
  // Additional sectors would follow the same pattern
};

const S2_MATERIAL_TOPICS = {
  "Consumer Goods": [
    "GHG Emissions",
    "Energy Management",
    "Water & Wastewater Management",
    "Climate Adaptation & Resilience",
    "Supply Chain Climate Impacts"
  ],
  "Technology & Communications": [
    "Energy Management",
    "GHG Emissions",
    "Hardware Lifecycle Management",
    "Data Center Climate Impacts",
    "Climate Transition Risks"
  ],
  "Financials": [
    "Financed Emissions",
    "Transition Risk Exposure",
    "Climate-Related Opportunities",
    "Climate Risk Management",
    "Portfolio Climate Alignment"
  ],
  // Additional sectors would follow the same pattern
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

type ReportDataType = {
  companyName: string;
  reportingYear: number;
  sector: string;
  s1MaterialTopics: string[];
  s2MaterialTopics: string[];
  ghgScope1: number;
  ghgScope2: number;
  ghgScope3: number;
  renewableEnergy: number;
  emissionsReductionTarget: number;
  currentEmissionsReduction: number;
  climateRisks: Array<{
    risk: string;
    probability: number;
    impact: number;
    mitigation: string;
  }>;
  governanceDescription: string;
  strategyDescription: string;
  riskManagementDescription: string;
  scenarioAnalysis: {
    scenario1_5C: string;
    scenario2C: string;
    businessResilience: string;
  };
};

const IFRSSASBTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [reportData, setReportData] = useState<ReportDataType>({
    companyName: '',
    reportingYear: new Date().getFullYear(),
    sector: '',
    s1MaterialTopics: [],
    s2MaterialTopics: [],
    ghgScope1: 1500,
    ghgScope2: 1000,
    ghgScope3: 8500,
    renewableEnergy: 25,
    emissionsReductionTarget: 50,
    currentEmissionsReduction: 15,
    climateRisks: [
      {
        risk: 'Physical risk from extreme weather events',
        probability: 3,
        impact: 4,
        mitigation: 'Insurance policies, facility upgrades, and supply chain diversification'
      },
      {
        risk: 'Transition risk from carbon pricing',
        probability: 4,
        impact: 3,
        mitigation: 'Internal carbon pricing, emissions reduction initiatives, and renewable energy investments'
      }
    ],
    governanceDescription: '',
    strategyDescription: '',
    riskManagementDescription: '',
    scenarioAnalysis: {
      scenario1_5C: '',
      scenario2C: '',
      businessResilience: ''
    }
  });

  const handleSectorChange = (sector: string) => {
    setReportData({
      ...reportData,
      sector,
      s1MaterialTopics: S1_MATERIAL_TOPICS[sector as keyof typeof S1_MATERIAL_TOPICS] || [],
      s2MaterialTopics: S2_MATERIAL_TOPICS[sector as keyof typeof S2_MATERIAL_TOPICS] || []
    });
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Data for emissions chart
  const emissionsData = [
    { name: 'Scope 1', value: reportData.ghgScope1 },
    { name: 'Scope 2', value: reportData.ghgScope2 },
    { name: 'Scope 3', value: reportData.ghgScope3 }
  ];

  // Data for energy mix chart
  const energyMixData = [
    { name: 'Renewable Energy', value: reportData.renewableEnergy },
    { name: 'Non-renewable Energy', value: 100 - reportData.renewableEnergy }
  ];

  // Simple data for emissions trend (normally would be historical data)
  const emissionsTrendData = [
    { year: (reportData.reportingYear - 2).toString(), emissions: reportData.ghgScope1 + reportData.ghgScope2 + reportData.ghgScope3 * 1.1 },
    { year: (reportData.reportingYear - 1).toString(), emissions: reportData.ghgScope1 + reportData.ghgScope2 + reportData.ghgScope3 * 1.05 },
    { year: reportData.reportingYear.toString(), emissions: reportData.ghgScope1 + reportData.ghgScope2 + reportData.ghgScope3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">IFRS S1 & S2 + SASB Sustainability Report</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export DOCX
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Report Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-6 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="risk">Risk Management</TabsTrigger>
              <TabsTrigger value="emissions">Emissions & Climate</TabsTrigger>
              <TabsTrigger value="metrics">Metrics & Targets</TabsTrigger>
            </TabsList>
            
            {/* General Info Tab */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={reportData.companyName} 
                        onChange={(e) => setReportData({...reportData, companyName: e.target.value})}
                        placeholder="Enter company name" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reportingYear">Reporting Year</Label>
                      <Input 
                        id="reportingYear" 
                        type="number"
                        value={reportData.reportingYear} 
                        onChange={(e) => setReportData({...reportData, reportingYear: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="sector">Industry Sector (SASB)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Select your primary industry sector according to SASB classification.
                              This will determine the material topics relevant for your disclosure.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Select 
                      onValueChange={handleSectorChange}
                      value={reportData.sector}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {SASB_SECTORS.map((sector) => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {reportData.sector && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>S1 Material Topics (Sustainability)</Label>
                        <div className="border rounded-md p-4 space-y-2">
                          {S1_MATERIAL_TOPICS[reportData.sector as keyof typeof S1_MATERIAL_TOPICS]?.map((topic) => (
                            <div key={topic} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                              <span>{topic}</span>
                            </div>
                          ))}
                          {!S1_MATERIAL_TOPICS[reportData.sector as keyof typeof S1_MATERIAL_TOPICS] && (
                            <p className="text-muted-foreground">No material topics available for this sector</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>S2 Material Topics (Climate)</Label>
                        <div className="border rounded-md p-4 space-y-2">
                          {S2_MATERIAL_TOPICS[reportData.sector as keyof typeof S2_MATERIAL_TOPICS]?.map((topic) => (
                            <div key={topic} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                              <span>{topic}</span>
                            </div>
                          ))}
                          {!S2_MATERIAL_TOPICS[reportData.sector as keyof typeof S2_MATERIAL_TOPICS] && (
                            <p className="text-muted-foreground">No material topics available for this sector</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Governance Tab */}
            <TabsContent value="governance" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="governanceDescription">Governance of Sustainability-related Risks and Opportunities</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Describe the governance bodies or individuals responsible for oversight
                              of sustainability-related risks and opportunities. Include information about
                              board committees, management roles, and reporting procedures.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea 
                      id="governanceDescription" 
                      value={reportData.governanceDescription} 
                      onChange={(e) => setReportData({...reportData, governanceDescription: e.target.value})}
                      placeholder="Describe your organization's governance structure for sustainability oversight..."
                      rows={6}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Climate-related Governance and Oversight (S2)</Label>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="board-oversight">
                        <AccordionTrigger>Board Oversight</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            placeholder="Describe how the board oversees climate-related risks and opportunities..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="management-role">
                        <AccordionTrigger>Management's Role</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            placeholder="Describe management's role in assessing and managing climate-related risks and opportunities..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="incentives">
                        <AccordionTrigger>Climate-related Incentives</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            placeholder="Describe any incentives for the management of climate-related issues..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Strategy Tab */}
            <TabsContent value="strategy" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="strategyDescription">Strategy and Decision-making</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Describe how sustainability-related risks and opportunities are integrated into 
                              the organization's strategy and decision-making processes. Include timeframes
                              for addressing these risks and opportunities.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea 
                      id="strategyDescription" 
                      value={reportData.strategyDescription} 
                      onChange={(e) => setReportData({...reportData, strategyDescription: e.target.value})}
                      placeholder="Describe how sustainability factors are integrated into your organization's strategy..."
                      rows={6}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Climate Resilience and Scenario Analysis (S2)</Label>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="scenario-1.5c">
                        <AccordionTrigger>1.5°C Scenario Analysis</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            value={reportData.scenarioAnalysis.scenario1_5C}
                            onChange={(e) => setReportData({
                              ...reportData, 
                              scenarioAnalysis: {
                                ...reportData.scenarioAnalysis,
                                scenario1_5C: e.target.value
                              }
                            })}
                            placeholder="Describe potential impacts under a 1.5°C warming scenario..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="scenario-2c">
                        <AccordionTrigger>2°C Scenario Analysis</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            value={reportData.scenarioAnalysis.scenario2C}
                            onChange={(e) => setReportData({
                              ...reportData, 
                              scenarioAnalysis: {
                                ...reportData.scenarioAnalysis,
                                scenario2C: e.target.value
                              }
                            })}
                            placeholder="Describe potential impacts under a 2°C warming scenario..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="business-resilience">
                        <AccordionTrigger>Business Resilience</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            value={reportData.scenarioAnalysis.businessResilience}
                            onChange={(e) => setReportData({
                              ...reportData, 
                              scenarioAnalysis: {
                                ...reportData.scenarioAnalysis,
                                businessResilience: e.target.value
                              }
                            })}
                            placeholder="Describe how your business strategy is resilient to climate-related risks..."
                            rows={4}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Risk Management Tab */}
            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="riskManagementDescription">Risk Management Processes</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Describe the processes used to identify, assess, prioritize, and monitor
                              sustainability-related risks and opportunities. Include information about
                              how these processes are integrated into the organization's overall risk management.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea 
                      id="riskManagementDescription" 
                      value={reportData.riskManagementDescription} 
                      onChange={(e) => setReportData({...reportData, riskManagementDescription: e.target.value})}
                      placeholder="Describe your organization's risk management processes for sustainability factors..."
                      rows={6}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Climate Risk Assessment (S2)</Label>
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-medium">
                          <div className="w-1/3">Climate Risk</div>
                          <div className="w-1/6 text-center">Probability (1-5)</div>
                          <div className="w-1/6 text-center">Impact (1-5)</div>
                          <div className="w-1/3">Mitigation Measures</div>
                        </div>
                        
                        {reportData.climateRisks.map((risk, index) => (
                          <div key={index} className="flex justify-between items-start space-x-2">
                            <Input 
                              className="w-1/3" 
                              value={risk.risk} 
                              onChange={(e) => {
                                const updatedRisks = [...reportData.climateRisks];
                                updatedRisks[index].risk = e.target.value;
                                setReportData({...reportData, climateRisks: updatedRisks});
                              }}
                            />
                            <Select 
                              value={risk.probability.toString()}
                              onValueChange={(value) => {
                                const updatedRisks = [...reportData.climateRisks];
                                updatedRisks[index].probability = parseInt(value);
                                setReportData({...reportData, climateRisks: updatedRisks});
                              }}
                            >
                              <SelectTrigger className="w-1/6">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Very Low</SelectItem>
                                <SelectItem value="2">2 - Low</SelectItem>
                                <SelectItem value="3">3 - Medium</SelectItem>
                                <SelectItem value="4">4 - High</SelectItem>
                                <SelectItem value="5">5 - Very High</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select 
                              value={risk.impact.toString()}
                              onValueChange={(value) => {
                                const updatedRisks = [...reportData.climateRisks];
                                updatedRisks[index].impact = parseInt(value);
                                setReportData({...reportData, climateRisks: updatedRisks});
                              }}
                            >
                              <SelectTrigger className="w-1/6">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Minimal</SelectItem>
                                <SelectItem value="2">2 - Minor</SelectItem>
                                <SelectItem value="3">3 - Moderate</SelectItem>
                                <SelectItem value="4">4 - Significant</SelectItem>
                                <SelectItem value="5">5 - Severe</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Textarea 
                              className="w-1/3" 
                              value={risk.mitigation} 
                              onChange={(e) => {
                                const updatedRisks = [...reportData.climateRisks];
                                updatedRisks[index].mitigation = e.target.value;
                                setReportData({...reportData, climateRisks: updatedRisks});
                              }}
                              rows={2}
                            />
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setReportData({
                            ...reportData, 
                            climateRisks: [
                              ...reportData.climateRisks, 
                              { risk: '', probability: 3, impact: 3, mitigation: '' }
                            ]
                          })}
                        >
                          + Add Risk
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Risk Matrix Visualization */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">Climate Risk Matrix</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              This risk matrix plots your climate risks based on their probability and impact ratings.
                              Risks in the top-right quadrant (high probability, high impact) require priority attention.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-muted/20">
                      <div className="h-[300px] w-full relative">
                        <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 border-t border-l">
                          {Array.from({ length: 25 }).map((_, i) => {
                            const row = Math.floor(i / 5);
                            const col = i % 5;
                            const bgColor = 
                              row >= 3 && col >= 3 ? 'bg-red-100 dark:bg-red-950/30' :
                              (row >= 3 || col >= 3) ? 'bg-amber-100 dark:bg-amber-950/30' :
                              'bg-green-100 dark:bg-green-950/30';
                            
                            return (
                              <div 
                                key={i} 
                                className={`border-r border-b ${bgColor}`} 
                              />
                            );
                          })}
                        </div>
                        
                        {/* Y-axis label */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium">
                          Impact
                        </div>
                        
                        {/* X-axis label */}
                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-xs font-medium">
                          Probability
                        </div>
                        
                        {/* Risk dots */}
                        {reportData.climateRisks.map((risk, index) => {
                          // Adjust position: risk.probability and risk.impact range from 1-5
                          // We need to convert to 0-4 range and adjust for visualization
                          const left = ((risk.probability - 1) / 4) * 100; // Convert to percentage
                          const bottom = ((risk.impact - 1) / 4) * 100; // Convert to percentage
                          
                          return (
                            <div 
                              key={index}
                              className="absolute w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold"
                              style={{ 
                                left: `calc(${left}% - 8px)`, 
                                bottom: `calc(${bottom}% - 8px)` 
                              }}
                              title={risk.risk}
                            >
                              {index + 1}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-950/30 mr-1 border"></div>
                          <span>Low Risk</span>
                          <div className="w-3 h-3 rounded-sm bg-amber-100 dark:bg-amber-950/30 mx-2 border"></div>
                          <span>Medium Risk</span>
                          <div className="w-3 h-3 rounded-sm bg-red-100 dark:bg-red-950/30 mx-2 border"></div>
                          <span>High Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Emissions & Climate Tab */}
            <TabsContent value="emissions" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="ghgScope1">Scope 1 Emissions (tCO₂e)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Scope 1 emissions are direct emissions from owned or controlled sources,
                                such as fuel combustion, company vehicles, and fugitive emissions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input 
                        id="ghgScope1" 
                        type="number"
                        value={reportData.ghgScope1} 
                        onChange={(e) => setReportData({...reportData, ghgScope1: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="ghgScope2">Scope 2 Emissions (tCO₂e)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Scope 2 emissions are indirect emissions from the generation of
                                purchased electricity, steam, heating, and cooling consumed by the company.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input 
                        id="ghgScope2" 
                        type="number"
                        value={reportData.ghgScope2} 
                        onChange={(e) => setReportData({...reportData, ghgScope2: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="ghgScope3">Scope 3 Emissions (tCO₂e)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Scope 3 emissions are all indirect emissions (not included in Scope 2)
                                that occur in the value chain, including both upstream and downstream emissions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input 
                        id="ghgScope3" 
                        type="number"
                        value={reportData.ghgScope3} 
                        onChange={(e) => setReportData({...reportData, ghgScope3: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="renewableEnergy">Renewable Energy Percentage</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Percentage of total energy consumption that comes from renewable sources
                              such as solar, wind, hydro, geothermal, or biomass.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[reportData.renewableEnergy]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setReportData({...reportData, renewableEnergy: value[0]})}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{reportData.renewableEnergy}%</span>
                    </div>
                  </div>
                  
                  {/* Charts */}
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-md font-medium flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2" />
                          GHG Emissions by Scope
                        </h3>
                      </div>
                      <div className="border rounded-md p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={emissionsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => formatNumber(value)} />
                            <ReTooltip formatter={(value) => [formatNumber(value as number), 'tCO₂e']} />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8">
                              {emissionsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-md font-medium flex items-center">
                          <PieChart className="h-4 w-4 mr-2" />
                          Energy Mix
                        </h3>
                      </div>
                      <div className="border rounded-md p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={energyMixData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              <Cell fill="#4ade80" />
                              <Cell fill="#f87171" />
                            </Pie>
                            <ReTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                            <Legend />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center mb-2">
                        <h3 className="text-md font-medium flex items-center">
                          <LineChart className="h-4 w-4 mr-2" />
                          Emissions Trend
                        </h3>
                      </div>
                      <div className="border rounded-md p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReLineChart data={emissionsTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={(value) => formatNumber(value)} />
                            <ReTooltip formatter={(value) => [formatNumber(value as number), 'tCO₂e']} />
                            <Legend />
                            <Line type="monotone" dataKey="emissions" stroke="#8884d8" activeDot={{ r: 8 }} />
                          </ReLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Metrics & Targets Tab */}
            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="emissionsReductionTarget">Emissions Reduction Target (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Percentage reduction in GHG emissions targeted by your organization,
                                usually compared to a baseline year. This should align with your transition plan.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[reportData.emissionsReductionTarget]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setReportData({...reportData, emissionsReductionTarget: value[0]})}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{reportData.emissionsReductionTarget}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="currentEmissionsReduction">Current Emissions Reduction (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Percentage reduction in GHG emissions already achieved by your organization,
                                compared to your baseline year.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[reportData.currentEmissionsReduction]}
                          min={0}
                          max={reportData.emissionsReductionTarget}
                          step={1}
                          onValueChange={(value) => setReportData({...reportData, currentEmissionsReduction: value[0]})}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{reportData.currentEmissionsReduction}%</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <h3 className="text-md font-medium">Emissions Reduction Progress</h3>
                      <div className="border rounded-md p-4">
                        <div className="h-6 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(reportData.currentEmissionsReduction / reportData.emissionsReductionTarget) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{reportData.currentEmissionsReduction}% complete</span>
                          <span>{reportData.emissionsReductionTarget}% target</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional SASB Material Topics */}
                    {reportData.sector && (
                      <div className="space-y-4 mt-6">
                        <h3 className="text-lg font-medium">SASB Material Metrics</h3>
                        <p className="text-sm text-muted-foreground">
                          The following metrics are specific to your selected industry sector ({reportData.sector}).
                          Add values for the metrics that are material to your organization.
                        </p>
                        
                        <div className="border rounded-md p-4">
                          <Accordion type="multiple" className="w-full">
                            {S1_MATERIAL_TOPICS[reportData.sector as keyof typeof S1_MATERIAL_TOPICS]?.map((topic) => (
                              <AccordionItem key={topic} value={topic}>
                                <AccordionTrigger>{topic}</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-4 p-2">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label>Metric Value</Label>
                                        <Input placeholder="Enter value" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Unit of Measure</Label>
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select unit" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="number">#</SelectItem>
                                            <SelectItem value="percentage">%</SelectItem>
                                            <SelectItem value="currency">$</SelectItem>
                                            <SelectItem value="tco2e">tCO₂e</SelectItem>
                                            <SelectItem value="mwh">MWh</SelectItem>
                                            <SelectItem value="m3">m³</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Notes or Context</Label>
                                      <Textarea placeholder="Provide additional context for this metric..." rows={2} />
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Preview Tab */}
        <TabsContent value="preview" className="p-4">
          <ScrollArea className="h-[800px] rounded-md border">
            <div className="p-8 max-w-4xl mx-auto space-y-8">
              {/* Header */}
              <div className="space-y-2 text-center border-b pb-6">
                <h1 className="text-3xl font-bold">{reportData.companyName || "Company Name"}</h1>
                <h2 className="text-xl text-muted-foreground">IFRS S1 & S2 Sustainability Report</h2>
                <p className="text-lg">{reportData.reportingYear || new Date().getFullYear()}</p>
              </div>
              
              {/* Executive Summary */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Executive Summary</h2>
                <p>
                  This report presents the sustainability performance of {reportData.companyName || "our organization"} 
                  for the year {reportData.reportingYear || new Date().getFullYear()}, in accordance with the 
                  IFRS S1 General Requirements for Disclosure of Sustainability-related Financial Information 
                  and IFRS S2 Climate-related Disclosures, along with the SASB Standards for the {reportData.sector || "[sector]"} industry.
                </p>
                
                <div className="grid grid-cols-3 gap-4 my-6">
                  <div className="p-4 border rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Total GHG Emissions</p>
                    <p className="text-3xl font-bold">
                      {formatNumber(reportData.ghgScope1 + reportData.ghgScope2 + reportData.ghgScope3)}
                    </p>
                    <p className="text-xs">tCO₂e</p>
                  </div>
                  <div className="p-4 border rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Renewable Energy</p>
                    <p className="text-3xl font-bold">{reportData.renewableEnergy}%</p>
                    <p className="text-xs">of total energy</p>
                  </div>
                  <div className="p-4 border rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Emissions Reduction</p>
                    <p className="text-3xl font-bold">{reportData.currentEmissionsReduction}%</p>
                    <p className="text-xs">towards {reportData.emissionsReductionTarget}% target</p>
                  </div>
                </div>
              </div>
              
              {/* Governance */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Governance</h2>
                <p>{reportData.governanceDescription || "Information about the governance bodies or individuals responsible for oversight of sustainability-related risks and opportunities..."}</p>
                
                <h3 className="text-xl font-medium mt-4">Climate-related Governance</h3>
                <p>Details about board and management oversight of climate-related issues...</p>
              </div>
              
              {/* Strategy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Strategy</h2>
                <p>{reportData.strategyDescription || "Information about how sustainability-related risks and opportunities are integrated into the organization's strategy and decision-making processes..."}</p>
                
                <h3 className="text-xl font-medium mt-4">Climate Resilience</h3>
                <p>Analysis of business resilience under different climate scenarios...</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium">1.5°C Scenario</h4>
                    <p className="text-sm mt-2">{reportData.scenarioAnalysis.scenario1_5C || "Analysis of impacts under a 1.5°C warming scenario..."}</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium">2°C Scenario</h4>
                    <p className="text-sm mt-2">{reportData.scenarioAnalysis.scenario2C || "Analysis of impacts under a 2°C warming scenario..."}</p>
                  </div>
                </div>
              </div>
              
              {/* Risk Management */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Risk Management</h2>
                <p>{reportData.riskManagementDescription || "Information about the processes used to identify, assess, prioritize, and monitor sustainability-related risks and opportunities..."}</p>
                
                <h3 className="text-xl font-medium mt-4">Climate Risk Assessment</h3>
                <div className="mt-2 border rounded-md">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Risk</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Probability</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Impact</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Mitigation Measures</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reportData.climateRisks.map((risk, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">{risk.risk}</td>
                          <td className="px-4 py-2">{risk.probability}/5</td>
                          <td className="px-4 py-2">{risk.impact}/5</td>
                          <td className="px-4 py-2">{risk.mitigation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Metrics & Targets */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Metrics & Targets</h2>
                
                <h3 className="text-xl font-medium">GHG Emissions</h3>
                <div className="grid grid-cols-3 gap-4 my-4">
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Scope 1</p>
                    <p className="text-2xl mt-1">{formatNumber(reportData.ghgScope1)}</p>
                    <p className="text-xs text-muted-foreground">tCO₂e</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Scope 2</p>
                    <p className="text-2xl mt-1">{formatNumber(reportData.ghgScope2)}</p>
                    <p className="text-xs text-muted-foreground">tCO₂e</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Scope 3</p>
                    <p className="text-2xl mt-1">{formatNumber(reportData.ghgScope3)}</p>
                    <p className="text-xs text-muted-foreground">tCO₂e</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mt-6">Emissions Reduction</h3>
                <div className="border rounded-md p-4 mt-2">
                  <div className="h-8 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(reportData.currentEmissionsReduction / reportData.emissionsReductionTarget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">Current: {reportData.currentEmissionsReduction}% reduction</span>
                    <span className="text-sm font-medium">Target: {reportData.emissionsReductionTarget}% reduction</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mt-6">Energy Mix</h3>
                <div className="flex items-center mt-2">
                  <div className="h-6 flex-1 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-green-500 h-full"
                      style={{ width: `${reportData.renewableEnergy}%` }}
                    ></div>
                    <div 
                      className="bg-red-500 h-full"
                      style={{ width: `${100 - reportData.renewableEnergy}%` }}
                    ></div>
                  </div>
                  <div className="ml-4 text-sm space-x-4">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span>{reportData.renewableEnergy}% Renewable</span>
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span>{100 - reportData.renewableEnergy}% Non-renewable</span>
                    </span>
                  </div>
                </div>
                
                {reportData.sector && (
                  <div className="mt-6">
                    <h3 className="text-xl font-medium">SASB Material Metrics for {reportData.sector}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      In accordance with SASB Standards for the {reportData.sector} industry,
                      we report on the following material topics.
                    </p>
                    
                    <div className="space-y-4">
                      {S1_MATERIAL_TOPICS[reportData.sector as keyof typeof S1_MATERIAL_TOPICS]?.map((topic) => (
                        <div key={topic} className="border rounded-md p-4">
                          <h4 className="font-medium">{topic}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Specific metrics and performance data for this material topic...
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IFRSSASBTemplate;