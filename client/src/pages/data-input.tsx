import React from 'react';
import { Metadata } from '@/components/Metadata';
import { AccessRestriction } from '@/components/access-control/AccessRestriction';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function DataInput() {
  const [activeTab, setActiveTab] = useState('scope1');
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState('All Year');
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Metadata
        title="GHG Emissions Calculator | Sustainability Reporting Platform"
        description="Track and calculate your organization's greenhouse gas emissions across all scopes"
      />
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">GHG Emissions Calculator</h1>
        <p className="text-gray-600 mb-8">
          Track and calculate your organization's greenhouse gas emissions data across all scopes
        </p>
        
        <AccessRestriction 
          serviceId="ghg-emissions" 
          serviceName="GHG Emissions Calculator" 
          serviceType="paid"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Emissions Data Input</h2>
                <p className="text-gray-600">
                  Enter your organization's emissions data for calculation and reporting
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-auto">
                  <Label htmlFor="year" className="mb-1 block">Reporting Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4].map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Label htmlFor="month" className="mb-1 block">Period</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Year">All Year</SelectItem>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="scope1">Scope 1 (Direct)</TabsTrigger>
                <TabsTrigger value="scope2">Scope 2 (Indirect)</TabsTrigger>
                <TabsTrigger value="scope3">Scope 3 (Value Chain)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="scope1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Stationary Combustion</CardTitle>
                    <CardDescription>
                      Emissions from fuel combustion in stationary equipment (e.g., boilers, furnaces, generators)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="natural-gas">Natural Gas (m³)</Label>
                        <Input id="natural-gas" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="diesel">Diesel (L)</Label>
                        <Input id="diesel" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="propane">Propane (L)</Label>
                        <Input id="propane" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="fuel-oil">Fuel Oil (L)</Label>
                        <Input id="fuel-oil" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile Combustion</CardTitle>
                    <CardDescription>
                      Emissions from fuel combustion in vehicles and equipment owned or controlled by your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="gasoline">Gasoline (L)</Label>
                        <Input id="gasoline" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="diesel-mobile">Diesel (L)</Label>
                        <Input id="diesel-mobile" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="jet-fuel">Jet Fuel (L)</Label>
                        <Input id="jet-fuel" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="lng">LNG/CNG (kg)</Label>
                        <Input id="lng" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Fugitive Emissions</CardTitle>
                    <CardDescription>
                      Emissions from unintentional leaks or releases (e.g., refrigerants, fire suppressants)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="r410a">R-410A (kg)</Label>
                        <Input id="r410a" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="r134a">R-134a (kg)</Label>
                        <Input id="r134a" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="r404a">R-404A (kg)</Label>
                        <Input id="r404a" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="sf6">SF6 (kg)</Label>
                        <Input id="sf6" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Clear All</Button>
                  <Button>Save Scope 1 Data</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="scope2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchased Electricity</CardTitle>
                    <CardDescription>
                      Emissions from electricity purchased and consumed by your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="electricity">Electricity (kWh)</Label>
                        <Input id="electricity" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="electricity-region">Grid Region</Label>
                        <Select defaultValue="average">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="average">National Average</SelectItem>
                            <SelectItem value="northeast">Northeast</SelectItem>
                            <SelectItem value="midwest">Midwest</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="west">West</SelectItem>
                            <SelectItem value="california">California</SelectItem>
                            <SelectItem value="texas">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Purchased Heat, Steam, and Cooling</CardTitle>
                    <CardDescription>
                      Emissions from other forms of purchased energy consumed by your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="steam">Steam (MMBtu)</Label>
                        <Input id="steam" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="heat">Heat (MMBtu)</Label>
                        <Input id="heat" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="cooling">Cooling (MMBtu)</Label>
                        <Input id="cooling" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Clear All</Button>
                  <Button>Save Scope 2 Data</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="scope3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchased Goods & Services</CardTitle>
                    <CardDescription>
                      Emissions from the production of goods and services purchased by your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="purchased-goods">Spend on Goods (USD)</Label>
                        <Input id="purchased-goods" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="purchased-services">Spend on Services (USD)</Label>
                        <Input id="purchased-services" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Travel & Employee Commuting</CardTitle>
                    <CardDescription>
                      Emissions from employee business travel and commuting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="air-travel">Air Travel (passenger-km)</Label>
                        <Input id="air-travel" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="hotel-stays">Hotel Stays (nights)</Label>
                        <Input id="hotel-stays" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="car-commuting">Car Commuting (km)</Label>
                        <Input id="car-commuting" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="public-transit">Public Transit (km)</Label>
                        <Input id="public-transit" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Waste & Water</CardTitle>
                    <CardDescription>
                      Emissions from waste disposal and water treatment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="landfill">Landfill Waste (tonnes)</Label>
                        <Input id="landfill" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="recycled">Recycled Waste (tonnes)</Label>
                        <Input id="recycled" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="incinerated">Incinerated Waste (tonnes)</Label>
                        <Input id="incinerated" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="water">Water Usage (m³)</Label>
                        <Input id="water" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <span className="font-medium">Calculated CO₂e:</span> 0.0 tCO₂e
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Clear All</Button>
                  <Button>Save Scope 3 Data</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Emissions Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-800">Scope 1 Emissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">0.0 <span className="text-base font-normal">tCO₂e</span></div>
                  <div className="text-xs text-blue-700 mt-1">Direct emissions from owned sources</div>
                </CardContent>
              </Card>
              <Card className="bg-teal-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-teal-800">Scope 2 Emissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-800">0.0 <span className="text-base font-normal">tCO₂e</span></div>
                  <div className="text-xs text-teal-700 mt-1">Indirect emissions from purchased energy</div>
                </CardContent>
              </Card>
              <Card className="bg-violet-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-violet-800">Scope 3 Emissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-800">0.0 <span className="text-base font-normal">tCO₂e</span></div>
                  <div className="text-xs text-violet-700 mt-1">Indirect emissions from value chain</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-4">
              <div className="mb-2 text-2xl font-bold">Total Carbon Footprint</div>
              <div className="text-4xl font-bold text-green-700">0.0 <span className="text-2xl font-normal">tCO₂e</span></div>
              <div className="text-sm text-gray-500 mt-2">Reporting period: {selectedYear} {selectedMonth !== 'All Year' ? `, Month: ${selectedMonth}` : ''}</div>
            </div>
          </div>
        </AccessRestriction>
      </div>
    </div>
  );
}