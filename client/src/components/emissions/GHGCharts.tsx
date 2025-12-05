import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

// Type definitions
export type EmissionData = {
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
};

interface GHGChartsProps {
  data: EmissionData;
}

// Helper function to generate consistent chart colors
const getChartColors = (isDarkMode: boolean) => {
  return {
    scope1: isDarkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.8)', // red
    scope2: isDarkMode ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.8)', // orange
    scope3: isDarkMode ? 'rgba(234, 179, 8, 0.8)' : 'rgba(234, 179, 8, 0.8)', // yellow
    renewable: isDarkMode ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.8)', // green
    nonRenewable: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)', // gray
    targetBackground: isDarkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)', // light gray background
    border: isDarkMode ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)', // border color
    text: isDarkMode ? 'rgba(229, 231, 235, 1)' : 'rgba(17, 24, 39, 1)', // text color
  };
};

export const GHGCharts: React.FC<GHGChartsProps> = ({ data }) => {
  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');
  const colors = getChartColors(isDarkMode);
  
  // Set default ChartJS font color based on theme
  ChartJS.defaults.color = colors.text;
  
  // Emissions by Scope Pie Chart
  const emissionsByScopeData = {
    labels: ['Scope 1', 'Scope 2', 'Scope 3'],
    datasets: [
      {
        data: [data.scope1, data.scope2, data.scope3],
        backgroundColor: [colors.scope1, colors.scope2, colors.scope3],
        borderColor: [colors.border, colors.border, colors.border],
        borderWidth: 1,
      },
    ],
  };

  // Year-over-year Emissions Bar Chart
  const yearlyData = {
    labels: data.yearlyData.map(item => item.year),
    datasets: [
      {
        label: 'Scope 1',
        data: data.yearlyData.map(item => item.scope1),
        backgroundColor: colors.scope1,
        stack: 'Stack 0',
      },
      {
        label: 'Scope 2',
        data: data.yearlyData.map(item => item.scope2),
        backgroundColor: colors.scope2,
        stack: 'Stack 0',
      },
      {
        label: 'Scope 3',
        data: data.yearlyData.map(item => item.scope3),
        backgroundColor: colors.scope3,
        stack: 'Stack 0',
      },
    ],
  };

  // Year-over-year Line Chart
  const yearlyLineData = {
    labels: data.yearlyData.map(item => item.year),
    datasets: [
      {
        label: 'Total Emissions',
        data: data.yearlyData.map(item => item.scope1 + item.scope2 + item.scope3),
        borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Scope 3 Breakdown Chart
  const scope3BreakdownData = {
    labels: data.scope3Breakdown.map(item => item.category),
    datasets: [
      {
        data: data.scope3Breakdown.map(item => item.value),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // red
          'rgba(249, 115, 22, 0.8)',  // orange
          'rgba(234, 179, 8, 0.8)',   // yellow
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(139, 92, 246, 0.8)',  // purple
          'rgba(236, 72, 153, 0.8)',  // pink
        ],
        borderColor: Array(data.scope3Breakdown.length).fill(colors.border),
        borderWidth: 1,
      },
    ],
  };

  // Renewable Energy Donut Chart
  const energyMixData = {
    labels: ['Renewable Energy', 'Non-Renewable Energy'],
    datasets: [
      {
        data: [data.renewableEnergy, data.nonRenewableEnergy],
        backgroundColor: [colors.renewable, colors.nonRenewable],
        borderColor: [colors.border, colors.border],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value.toFixed(2)} tCO₂e (${percentage}%)`;
          }
        }
      },
    },
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Emissions (tCO₂e)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)} tCO₂e`;
          }
        }
      },
    },
  };

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Total Emissions (tCO₂e)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)} tCO₂e`;
          }
        }
      },
    },
  };

  return (
    <div className="space-y-10 print:space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-6">📊 Emissions Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emissions by Scope</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <Pie data={emissionsByScopeData} options={pieOptions} />
              </div>
              <div className="text-sm text-center text-muted-foreground mt-2">
                Total Emissions: {data.totalEmissions.toFixed(2)} tCO₂e
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Scope 3 Emissions Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {data.scope3Breakdown.length > 0 ? (
                  <Pie data={scope3BreakdownData} options={pieOptions} />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>No Scope 3 category data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">📈 Historical Emissions</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Year-over-Year Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {data.yearlyData.length > 1 ? (
                  <Bar data={yearlyData} options={barOptions} />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>At least two years of data required for comparison</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {data.yearlyData.length > 1 ? (
                  <Line data={yearlyLineData} options={lineOptions} />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>At least two years of data required for trend analysis</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">🎯 Target Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emission Reduction Target Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 py-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Current Progress ({data.currentReduction}%)</span>
                    <span className="text-sm font-medium">Target ({data.targetReduction}%)</span>
                  </div>
                  <Progress value={(data.currentReduction / data.targetReduction) * 100} className="h-4" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Current reduction: {data.currentReduction}% from base year</p>
                  <p>Target reduction: {data.targetReduction}% from base year</p>
                  <p>Progress: {Math.round((data.currentReduction / data.targetReduction) * 100)}% of target achieved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Energy Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <Doughnut data={energyMixData} options={pieOptions} />
              </div>
              <div className="text-sm text-center text-muted-foreground mt-2">
                Renewable Energy: {data.renewableEnergy}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Create a component that generates mock data when no real data is available
// This is useful for previewing the charts while developing
export const GHGChartsDemoData = () => {
  const mockData: EmissionData = {
    scope1: 25400,
    scope2: 38600,
    scope3: 142800,
    totalEmissions: 206800,
    yearlyData: [
      { year: '2021', scope1: 28000, scope2: 42000, scope3: 150000 },
      { year: '2022', scope1: 26500, scope2: 40000, scope3: 146000 },
      { year: '2023', scope1: 25400, scope2: 38600, scope3: 142800 },
    ],
    scope3Breakdown: [
      { category: 'Purchased Goods', value: 58000 },
      { category: 'Business Travel', value: 15000 },
      { category: 'Employee Commuting', value: 12800 },
      { category: 'Waste', value: 5000 },
      { category: 'Transportation', value: 32000 },
      { category: 'Other', value: 20000 },
    ],
    renewableEnergy: 45,
    nonRenewableEnergy: 55,
    targetReduction: 50,
    currentReduction: 15,
  };

  return <GHGCharts data={mockData} />;
};

export default GHGCharts;