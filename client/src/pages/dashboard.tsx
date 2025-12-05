import React from 'react';
import { Metadata } from '@/components/Metadata';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Link } from 'wouter';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  CalendarDays, 
  BarChart2, 
  ArrowUpCircle, 
  FileText, 
  CheckCircle2, 
  Award, 
  Users, 
  TreeDeciduous,
  Droplets,
  Trash2,
  Zap,
  ChevronRight
} from 'lucide-react';

// Sample data for charts
const emissionsData = [
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 22 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 28 },
  { month: 'May', value: 26 },
  { month: 'Jun', value: 29 },
  { month: 'Jul', value: 32 },
  { month: 'Aug', value: 30 },
  { month: 'Sep', value: 28 },
  { month: 'Oct', value: 25 },
  { month: 'Nov', value: 22 },
  { month: 'Dec', value: 20 },
];

const emissionsDistribution = [
  { name: 'Scope 1', value: 30 },
  { name: 'Scope 2', value: 40 },
  { name: 'Scope 3', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const resourceData = [
  { month: 'Jan', energy: 220, water: 240, waste: 180 },
  { month: 'Feb', energy: 210, water: 230, waste: 170 },
  { month: 'Mar', energy: 240, water: 250, waste: 190 },
  { month: 'Apr', energy: 280, water: 260, waste: 200 },
  { month: 'May', energy: 250, water: 240, waste: 195 },
  { month: 'Jun', energy: 260, water: 250, waste: 185 },
  { month: 'Jul', energy: 280, water: 270, waste: 200 },
  { month: 'Aug', energy: 270, water: 260, waste: 190 },
  { month: 'Sep', energy: 250, water: 240, waste: 180 },
  { month: 'Oct', energy: 230, water: 230, waste: 170 },
  { month: 'Nov', energy: 220, water: 220, waste: 165 },
  { month: 'Dec', energy: 210, water: 210, waste: 160 },
];

const recentActivities = [
  { id: 1, description: 'Emissions data updated for Q2', date: '2 hours ago', type: 'update' },
  { id: 2, description: 'Annual sustainability report generated', date: '1 day ago', type: 'report' },
  { id: 3, description: 'New water consumption data added', date: '2 days ago', type: 'data' },
  { id: 4, description: 'ESG rating assessment completed', date: '3 days ago', type: 'assessment' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata
        title="Dashboard | Sustainability Reporting Platform"
        description="Your central hub for sustainability metrics, reports, and insights"
      />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {isAdmin ? 'Admin Dashboard' : 'Your Sustainability Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin 
              ? 'Manage users, monitor platform usage, and oversee sustainability reporting' 
              : 'Track your organization\'s sustainability metrics and manage reports'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/report-generator">Create New Report</Link>
          </Button>
          {isAdmin && (
            <Button variant="outline" asChild>
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          )}
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Carbon Footprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">247.3</div>
              <div className="ml-1 text-xs text-gray-500">tCO₂e</div>
              <div className="ml-auto text-xs flex items-center text-green-600">
                <ArrowUpCircle className="h-3 w-3 mr-1" />
                <span>4.3%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. previous year</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">12</div>
              <div className="ml-auto text-xs flex items-center text-green-600">
                <ArrowUpCircle className="h-3 w-3 mr-1" />
                <span>2</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">in the last 30 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Data Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">89%</div>
              <div className="ml-auto text-xs flex items-center text-amber-600">
                <ArrowUpCircle className="h-3 w-3 mr-1" />
                <span>7%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">across all metrics</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {isAdmin ? 'Total Users' : 'Active Templates'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">{isAdmin ? '28' : '4'}</div>
              <div className="ml-auto text-xs flex items-center text-green-600">
                <ArrowUpCircle className="h-3 w-3 mr-1" />
                <span>{isAdmin ? '3' : '1'}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isAdmin ? 'new this month' : 'custom templates'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content area - differs for admin and user */}
      {isAdmin ? (
        <AdminDashboardContent />
      ) : (
        <UserDashboardContent />
      )}
      
      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start p-4">
                  <div className="mr-4 mt-0.5">
                    {activity.type === 'update' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'report' && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'data' && (
                      <div className="bg-amber-100 p-2 rounded-full">
                        <CalendarDays className="h-4 w-4 text-amber-600" />
                      </div>
                    )}
                    {activity.type === 'assessment' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboardContent() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Usage */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Platform Usage</CardTitle>
            <CardDescription>
              Feature usage across the platform in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Report Generator', value: 42 },
                    { name: 'GHG Calculator', value: 38 },
                    { name: 'Statement Builder', value: 27 },
                    { name: 'ESG Rating', value: 23 },
                    { name: 'Materiality', value: 12 },
                    { name: 'Product Footprint', value: 10 },
                  ]}
                  margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* User Analytics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              New user registrations over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: 'Jan', users: 15 },
                    { month: 'Feb', users: 18 },
                    { month: 'Mar', users: 20 },
                    { month: 'Apr', users: 22 },
                    { month: 'May', users: 24 },
                    { month: 'Jun', users: 25 },
                    { month: 'Jul', users: 28 },
                    { month: 'Aug', users: 28 },
                    { month: 'Sep', users: 28 },
                  ]}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Sign-ups & Premium Service Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sign-ups</CardTitle>
            <CardDescription>New users who joined in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                { name: 'Jamie Smith', company: 'EcoTech Solutions', date: '2 hours ago' },
                { name: 'Maria Garcia', company: 'Green Innovations', date: '1 day ago' },
                { name: 'Alex Johnson', company: 'Sustainable Corp', date: '2 days ago' },
                { name: 'Emma Williams', company: 'Future Energy', date: '3 days ago' },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.company}</p>
                  </div>
                  <div className="text-xs text-gray-500">{user.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Premium Service Sales</CardTitle>
            <CardDescription>Recent premium service purchases</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                { service: 'GHG Emissions Calculator', company: 'EcoTech Solutions', revenue: '$299', date: '1 day ago' },
                { service: 'ESG Rating Calculator', company: 'Green Innovations', revenue: '$199', date: '3 days ago' },
                { service: 'Materiality Assessment', company: 'Sustainable Corp', revenue: '$499', date: '5 days ago' },
                { service: 'Product Carbon Footprint', company: 'Future Energy', revenue: '$249', date: '1 week ago' },
              ].map((sale, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{sale.service}</p>
                    <p className="text-xs text-gray-500 truncate">{sale.company}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{sale.revenue}</span>
                    <span className="text-xs text-gray-500">{sale.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function UserDashboardContent() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emissions Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Emissions Trend</CardTitle>
            <CardDescription>
              Monthly carbon emissions for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={emissionsData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Emissions Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Emissions Distribution</CardTitle>
            <CardDescription>
              Breakdown by emission scope
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionsDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {emissionsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Resource Consumption */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resource Consumption</h2>
        <Card>
          <CardHeader>
            <CardTitle>Annual Resource Usage</CardTitle>
            <CardDescription>
              Track energy, water, and waste trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resourceData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="energy" name="Energy (kWh)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="water" name="Water (m³)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="waste" name="Waste (kg)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Water Management</h3>
                <p className="text-sm text-gray-600 mb-3">Track and reduce water consumption</p>
                <Button size="sm" variant="outline" className="bg-white">
                  Enter Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <TreeDeciduous className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Carbon Offsets</h3>
                <p className="text-sm text-gray-600 mb-3">Manage your carbon offset projects</p>
                <Button size="sm" variant="outline" className="bg-white">
                  View Projects
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Energy Tracking</h3>
                <p className="text-sm text-gray-600 mb-3">Monitor and optimize energy usage</p>
                <Button size="sm" variant="outline" className="bg-white">
                  View Metrics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}