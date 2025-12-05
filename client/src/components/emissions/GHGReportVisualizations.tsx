import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Area,
} from 'recharts';

interface GHGReportVisualizationsProps {
  // If no data is provided, we'll use placeholder data
  scope1?: number;
  scope2?: number;
  scope3?: number;
  totalEmissions?: number;
  yearlyData?: {
    year: string;
    scope1: number;
    scope2: number;
    scope3: number;
  }[];
  scope3Breakdown?: {
    category: string;
    value: number;
  }[];
  renewableEnergy?: number;
  nonRenewableEnergy?: number;
  targetReduction?: number;
  currentReduction?: number;
}

const GHGReportVisualizations: React.FC<GHGReportVisualizationsProps> = ({
  scope1 = 1500,
  scope2 = 1200,
  scope3 = 6300,
  totalEmissions = 9000,
  yearlyData = [
    { year: '2024', scope1: 1500, scope2: 1200, scope3: 6300 },
    { year: '2023', scope1: 1600, scope2: 1300, scope3: 6500 },
    { year: '2022', scope1: 1700, scope2: 1400, scope3: 6800 },
  ],
  scope3Breakdown = [
    { category: 'Purchased Goods', value: 2500 },
    { category: 'Business Travel', value: 800 },
    { category: 'Employee Commuting', value: 600 },
    { category: 'Waste', value: 400 },
    { category: 'Other', value: 2000 },
  ],
  renewableEnergy = 30,
  nonRenewableEnergy = 70,
  targetReduction = 50,
  currentReduction = 15,
}) => {
  // For our pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Format numbers to show with commas and up to 1 decimal place
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    });
  };

  // Prepare data for charts
  const emissionsByScopeData = [
    { name: 'Scope 1', value: scope1 },
    { name: 'Scope 2', value: scope2 },
    { name: 'Scope 3', value: scope3 },
  ];
  
  const energyMixData = [
    { name: 'Renewable Energy', value: renewableEnergy },
    { name: 'Non-renewable Energy', value: nonRenewableEnergy },
  ];
  
  const reductionTargetData = [
    { name: 'Current Reduction', value: currentReduction },
    { name: 'Remaining to Target', value: targetReduction - currentReduction > 0 ? targetReduction - currentReduction : 0 }
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emissions">Emissions by Scope</TabsTrigger>
          <TabsTrigger value="trends">Emission Trends</TabsTrigger>
          <TabsTrigger value="scope3">Scope 3 Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Total GHG Emissions</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionsByScopeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {emissionsByScopeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${formatNumber(value as number)} tCO₂e`, 'Emissions']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-2">
                  Total: {formatNumber(totalEmissions)} tCO₂e
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Energy Mix</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={energyMixData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-2">
                  {renewableEnergy}% renewable energy in operations
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Emission Reduction Progress</h3>
              <ResponsiveContainer width="100%" height={100}>
                <ComposedChart
                  data={[{
                    currentReduction, 
                    targetReduction,
                    remaining: (targetReduction - currentReduction > 0) ? targetReduction - currentReduction : 0
                  }]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis tick={false} />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'currentReduction') return [`${value}%`, 'Current Reduction'];
                      if (name === 'targetReduction') return [`${value}%`, 'Target'];
                      return [`${value}%`, 'Remaining to Target'];
                    }}
                  />
                  <Bar dataKey="currentReduction" stackId="a" fill="#4ade80" name="Current Reduction" />
                  <Bar dataKey="remaining" stackId="a" fill="#d1d5db" name="Remaining to Target" />
                  <Line type="monotone" dataKey="targetReduction" stroke="#ef4444" strokeWidth={2} name="Target" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="flex justify-between items-center mt-2">
                <span>Current: {currentReduction}% reduction</span>
                <span className="text-red-500">Target: {targetReduction}% reduction</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="emissions">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">GHG Emissions by Scope (tCO₂e)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={emissionsByScopeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip formatter={(value) => [`${formatNumber(value as number)} tCO₂e`, 'Emissions']} />
                  <Legend />
                  <Bar dataKey="value" name="Emissions (tCO₂e)" fill="#8884d8">
                    {emissionsByScopeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-muted-foreground">Scope 1</p>
                  <p className="text-2xl font-bold text-blue-600">{formatNumber(scope1)}</p>
                  <p className="text-xs text-muted-foreground">tCO₂e</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-md">
                  <p className="text-sm text-muted-foreground">Scope 2</p>
                  <p className="text-2xl font-bold text-green-600">{formatNumber(scope2)}</p>
                  <p className="text-xs text-muted-foreground">tCO₂e</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-md">
                  <p className="text-sm text-muted-foreground">Scope 3</p>
                  <p className="text-2xl font-bold text-amber-600">{formatNumber(scope3)}</p>
                  <p className="text-xs text-muted-foreground">tCO₂e</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Emission Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip formatter={(value) => [`${formatNumber(value as number)} tCO₂e`, 'Emissions']} />
                  <Legend />
                  <Line type="monotone" dataKey="scope1" stroke="#0088FE" name="Scope 1" strokeWidth={2} />
                  <Line type="monotone" dataKey="scope2" stroke="#00C49F" name="Scope 2" strokeWidth={2} />
                  <Line type="monotone" dataKey="scope3" stroke="#FFBB28" name="Scope 3" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  This chart shows the emission trends over time by scope. Historical data helps track progress towards reduction targets.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scope3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Scope 3 Emissions Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={scope3Breakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="category"
                    label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {scope3Breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${formatNumber(value as number)} tCO₂e`, 'Emissions']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-6">
                <h4 className="text-base font-medium mb-2">Scope 3 Categories</h4>
                <div className="space-y-2">
                  {scope3Breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                        />
                        <span>{item.category}</span>
                      </div>
                      <span>{formatNumber(item.value)} tCO₂e</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  Scope 3 emissions often represent the largest portion of an organization's carbon footprint. 
                  This breakdown helps identify hotspots and prioritize reduction efforts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GHGReportVisualizations;