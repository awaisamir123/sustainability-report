import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Benchmark data for different metrics
const emissionsBenchmarkData = [
  { name: 'Your Company', scope1: 42150, scope2: 31740, scope3: 52000 },
  { name: 'Industry Avg', scope1: 37200, scope2: 29500, scope3: 58700 },
  { name: 'Industry Leader', scope1: 24800, scope2: 18500, scope3: 35600 },
];

const energyIntensityData = [
  { name: 'Your Company', value: 1.23 },
  { name: 'Industry Avg', value: 1.45 },
  { name: 'Industry Leader', value: 0.98 },
];

const waterIntensityData = [
  { name: 'Your Company', value: 2.84 },
  { name: 'Industry Avg', value: 3.12 },
  { name: 'Industry Leader', value: 1.95 },
];

const wasteIntensityData = [
  { name: 'Your Company', value: 0.63 },
  { name: 'Industry Avg', value: 0.85 },
  { name: 'Industry Leader', value: 0.41 },
];

// Company vs. Industry scores
const comparisonScores = [
  { category: 'Carbon Emissions', company: 65, industry: 58, best: 82 },
  { category: 'Renewable Energy', company: 45, industry: 42, best: 89 },
  { category: 'Water Management', company: 72, industry: 65, best: 90 },
  { category: 'Waste Reduction', company: 78, industry: 60, best: 85 },
  { category: 'Sustainability Reporting', company: 70, industry: 55, best: 92 },
];

// Historical performance data
const historicalData = [
  { year: '2018', emissions: 145000, energy: 52000, water: 220000, waste: 1500 },
  { year: '2019', emissions: 142000, energy: 50500, water: 225000, waste: 1450 },
  { year: '2020', emissions: 135000, energy: 48000, water: 228000, waste: 1400 },
  { year: '2021', emissions: 130000, energy: 47000, water: 232000, waste: 1350 },
  { year: '2022', emissions: 128000, energy: 46300, water: 235000, waste: 1300 },
  { year: '2023', emissions: 125890, energy: 45720, water: 238450, waste: 1250 },
];

// Peer companies data for comparison
const peerCompanies = [
  { id: 1, name: 'GreenTech Inc.', industry: 'Technology', ranking: 1, score: 92, change: 3 },
  { id: 2, name: 'EcoSolutions', industry: 'Technology', ranking: 2, score: 88, change: 1 },
  { id: 3, name: 'Your Company', industry: 'Technology', ranking: 3, score: 84, change: 5 },
  { id: 4, name: 'Sustainability Corp', industry: 'Technology', ranking: 4, score: 79, change: -1 },
  { id: 5, name: 'TechForward', industry: 'Technology', ranking: 5, score: 75, change: 2 },
  { id: 6, name: 'Digital Future', industry: 'Technology', ranking: 6, score: 72, change: -2 },
];

// Colors for charts
const COLORS = ['#1E88E5', '#43A047', '#FFC107', '#F44336'];

const Benchmarks: React.FC = () => {
  const { toast } = useToast();
  const [year, setYear] = useState("2023");
  const [industry, setIndustry] = useState("technology");
  const [region, setRegion] = useState("global");
  const [metricTab, setMetricTab] = useState("emissions");
  
  // Get organizations for context
  const { data: organizations } = useQuery({
    queryKey: ['/api/organizations']
  });
  
  const organization = organizations?.[0] || { name: "Demo Company", industry: "Technology" };
  
  const generatePDF = () => {
    toast({
      title: "Report Generated",
      description: "Benchmark report has been generated and is available for download.",
    });
  };
  
  const getPerformanceLabel = (company: number, industry: number) => {
    const diff = company - industry;
    if (diff >= 15) return { label: "Leading", color: "bg-green-100 text-green-800" };
    if (diff >= 5) return { label: "Above Average", color: "bg-blue-100 text-blue-800" };
    if (diff >= -5) return { label: "Average", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Below Average", color: "bg-red-100 text-red-800" };
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-800">Industry Benchmarking</h2>
        <p className="text-neutral-500">Compare your sustainability performance against industry peers</p>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                  <SelectItem value="latam">Latin America</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="ml-auto">
              <span className="material-icons text-[18px] mr-1">refresh</span>
              Update Benchmarks
            </Button>
            
            <Button variant="outline" onClick={generatePDF}>
              <span className="material-icons text-[18px] mr-1">download</span>
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            Your sustainability performance compared to industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {comparisonScores.map((score, index) => {
              const performance = getPerformanceLabel(score.company, score.industry);
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{score.category}</h3>
                      <Badge className={performance.color}>{performance.label}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Your Score</span>
                          <span className="font-medium">{score.company}/100</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${score.company}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Industry Average</span>
                          <span className="font-medium">{score.industry}/100</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div 
                            className="bg-neutral-400 h-2.5 rounded-full" 
                            style={{ width: `${score.industry}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Industry Best</span>
                          <span className="font-medium">{score.best}/100</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${score.best}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics Comparison</CardTitle>
          <CardDescription>
            Detailed comparison of specific sustainability metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="emissions" value={metricTab} onValueChange={setMetricTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="emissions">Carbon Emissions</TabsTrigger>
              <TabsTrigger value="energy">Energy Intensity</TabsTrigger>
              <TabsTrigger value="water">Water Management</TabsTrigger>
              <TabsTrigger value="waste">Waste Generation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emissions" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-4">Emissions by Scope (tCO₂e)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={emissionsBenchmarkData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scope1" name="Scope 1" fill="#1E88E5" />
                      <Bar dataKey="scope2" name="Scope 2" fill="#43A047" />
                      <Bar dataKey="scope3" name="Scope 3" fill="#FFC107" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="lg:w-1/3">
                  <h3 className="text-base font-medium mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary p-3 bg-primary/5 rounded-r-lg">
                      <h4 className="font-medium mb-1">Scope 1 Emissions</h4>
                      <p className="text-sm text-neutral-600">Your direct emissions are 13.3% higher than the industry average. Vehicle emissions are the primary contributor.</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Scope 2 Emissions</h4>
                      <p className="text-sm text-neutral-600">Your indirect emissions from purchased electricity are 7.6% higher than the industry average.</p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Scope 3 Emissions</h4>
                      <p className="text-sm text-neutral-600">Your value chain emissions are 11.4% lower than the industry average, showing strong supplier management.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="energy" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-4">Energy Intensity (MWh/unit)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={energyIntensityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Energy Intensity" fill="#1E88E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="lg:w-1/3">
                  <h3 className="text-base font-medium mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Energy Performance</h4>
                      <p className="text-sm text-neutral-600">Your energy intensity is 15.2% lower than the industry average, showing good energy efficiency practices.</p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Industry Leader Gap</h4>
                      <p className="text-sm text-neutral-600">There's a 25.5% gap between your company and the industry leader. Consider renewable energy investments.</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Improvement Trend</h4>
                      <p className="text-sm text-neutral-600">Your energy intensity has improved by 3.1% over the past year, continuing a positive trend.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="water" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-4">Water Intensity (m³/unit)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={waterIntensityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Water Intensity" fill="#2196F3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="lg:w-1/3">
                  <h3 className="text-base font-medium mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Water Performance</h4>
                      <p className="text-sm text-neutral-600">Your water intensity is 9.0% lower than the industry average, demonstrating good water management.</p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Improvement Opportunities</h4>
                      <p className="text-sm text-neutral-600">There's still a 45.6% gap to the industry leader. Consider implementing water recycling systems.</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 p-3 bg-red-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Water Risk</h4>
                      <p className="text-sm text-neutral-600">Your operations in water-stressed regions contribute to 35% of your total water consumption.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="waste" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-4">Waste Intensity (tonnes/unit)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={wasteIntensityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Waste Intensity" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="lg:w-1/3">
                  <h3 className="text-base font-medium mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Waste Performance</h4>
                      <p className="text-sm text-neutral-600">Your waste intensity is 25.9% lower than the industry average, showing strong waste management.</p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Recycling Rate</h4>
                      <p className="text-sm text-neutral-600">Your recycling rate of 72% is above the industry average of 65%, but below the leader's 88%.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded-r-lg">
                      <h4 className="font-medium mb-1">Circular Economy</h4>
                      <p className="text-sm text-neutral-600">Implementing circular economy principles could further reduce your waste generation by 15-20%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Historical Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Performance</CardTitle>
          <CardDescription>
            Your sustainability metrics trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#1E88E5" />
                <YAxis yAxisId="right" orientation="right" stroke="#43A047" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="emissions"
                  name="Carbon Emissions (tCO₂e)"
                  stroke="#1E88E5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="energy"
                  name="Energy Consumption (MWh)"
                  stroke="#43A047"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <Separator className="my-6" />
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#2196F3" />
                <YAxis yAxisId="right" orientation="right" stroke="#FF9800" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="water"
                  name="Water Usage (m³)"
                  stroke="#2196F3"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="waste"
                  name="Waste Generation (tonnes)"
                  stroke="#FF9800"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Peer Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Peer Comparison</CardTitle>
          <CardDescription>
            How you rank among similar companies in your industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-base font-medium mb-4">Industry Ranking</h3>
              <div className="space-y-4">
                {peerCompanies.map((company) => (
                  <div 
                    key={company.id} 
                    className={`p-4 rounded-lg border ${company.name === 'Your Company' ? 'border-primary bg-primary/5' : 'border-neutral-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 font-bold">
                          {company.ranking}
                        </div>
                        <div className="ml-3">
                          <h4 className={`font-medium ${company.name === 'Your Company' ? 'text-primary' : ''}`}>
                            {company.name}
                          </h4>
                          <p className="text-xs text-neutral-500">{company.industry}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-semibold">{company.score}</div>
                        <div className={`flex items-center text-xs ${company.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="material-icons text-[14px]">
                            {company.change > 0 ? 'arrow_upward' : 'arrow_downward'}
                          </span>
                          {Math.abs(company.change)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/5">
              <h3 className="text-base font-medium mb-4">ESG Performance Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={comparisonScores}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Your Company"
                      dataKey="company"
                      stroke="#1E88E5"
                      fill="#1E88E5"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Industry Average"
                      dataKey="industry"
                      stroke="#43A047"
                      fill="#43A047"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Industry Best"
                      dataKey="best"
                      stroke="#FFC107"
                      fill="#FFC107"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-4">Key Takeaways</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="material-icons text-green-600 text-[18px] mr-2 shrink-0">check_circle</span>
                    <span>Your waste reduction efforts are 30% better than industry average</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-amber-600 text-[18px] mr-2 shrink-0">info</span>
                    <span>Renewable energy adoption is on par with the industry but far behind leaders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-red-600 text-[18px] mr-2 shrink-0">priority_high</span>
                    <span>Carbon emissions remain a challenge area compared to top performers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto">
            <span className="material-icons text-[18px] mr-1">insights</span>
            Get Detailed Industry Benchmarks
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Benchmarks;
