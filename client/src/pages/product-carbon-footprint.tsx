import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for product carbon footprint
const productStages = [
  { name: 'Raw Materials', carbon: 35 },
  { name: 'Manufacturing', carbon: 25 },
  { name: 'Transportation', carbon: 15 },
  { name: 'Use Phase', carbon: 20 },
  { name: 'End of Life', carbon: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9146FF'];

const ProductCarbonFootprint: React.FC = () => {
  const { toast } = useToast();
  const [productType, setProductType] = useState('electronics');
  const [lifecycle, setLifecycle] = useState('cradle-to-gate');
  const [category, setCategory] = useState('all');
  
  const handleCalculate = () => {
    toast({
      title: "Calculation Complete",
      description: "Carbon footprint for the selected product has been calculated.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Successful",
      description: "Carbon footprint report has been exported to PDF.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-800">Product Carbon Footprint</h2>
        <p className="text-neutral-500">Calculate and analyze carbon emissions for your products</p>
      </div>
      
      {/* Product Selection and Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Product Configuration</CardTitle>
          <CardDescription>
            Select a product type and lifecycle analysis boundary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Lifecycle Boundary</Label>
              <Select value={lifecycle} onValueChange={setLifecycle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lifecycle boundary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cradle-to-gate">Cradle-to-Gate</SelectItem>
                  <SelectItem value="cradle-to-grave">Cradle-to-Grave</SelectItem>
                  <SelectItem value="gate-to-gate">Gate-to-Gate</SelectItem>
                  <SelectItem value="gate-to-grave">Gate-to-Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Product SKU / ID</Label>
              <Input placeholder="Enter product ID" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <Label>Production Units</Label>
              <Input placeholder="Enter quantity" type="number" />
            </div>
            
            <div className="space-y-2">
              <Label>Functional Unit</Label>
              <Select defaultValue="unit">
                <SelectTrigger>
                  <SelectValue placeholder="Select functional unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit">Per Unit</SelectItem>
                  <SelectItem value="kg">Per Kg</SelectItem>
                  <SelectItem value="ton">Per Ton</SelectItem>
                  <SelectItem value="m2">Per m²</SelectItem>
                  <SelectItem value="m3">Per m³</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Analysis Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="materials">Raw Materials</SelectItem>
                  <SelectItem value="energy">Energy Use</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline">Reset</Button>
            <Button onClick={handleCalculate}>
              <span className="material-icons text-[18px] mr-1">calculate</span>
              Calculate Footprint
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Results & Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Results & Analysis</CardTitle>
          <CardDescription>
            Carbon footprint breakdown for the selected product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Total Carbon Footprint</h3>
                  <div className="text-2xl font-bold text-primary">100 <span className="text-sm text-gray-500 font-normal">kg CO₂e</span></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Per product unit, cradle-to-gate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Carbon Intensity</h3>
                  <div className="text-2xl font-bold text-amber-500">4.2 <span className="text-sm text-gray-500 font-normal">kg CO₂e/kg</span></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Per kg of product</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Industry Average</h3>
                  <div className="text-2xl font-bold text-green-500">-15% <span className="text-sm text-gray-500 font-normal">below avg.</span></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Compared to industry benchmark</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="breakdown">Lifecycle Breakdown</TabsTrigger>
              <TabsTrigger value="materials">Materials Analysis</TabsTrigger>
              <TabsTrigger value="reduction">Reduction Potential</TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown" className="mt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium mb-4">Carbon Footprint by Lifecycle Stage</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={productStages}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="carbon" name="Carbon Footprint (kg CO₂e)" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium mb-4">Percentage Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productStages}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="carbon"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {productStages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="mt-0">
              <div className="space-y-4">
                <p className="text-gray-600">Detailed analysis of carbon emissions from materials used in the product.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Material</th>
                        <th className="border p-2 text-left">Weight (kg)</th>
                        <th className="border p-2 text-left">Emission Factor (kg CO₂e/kg)</th>
                        <th className="border p-2 text-left">Total Emissions (kg CO₂e)</th>
                        <th className="border p-2 text-left">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Aluminum</td>
                        <td className="border p-2">0.45</td>
                        <td className="border p-2">8.24</td>
                        <td className="border p-2">3.71</td>
                        <td className="border p-2">10.6%</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Plastic (ABS)</td>
                        <td className="border p-2">1.2</td>
                        <td className="border p-2">3.3</td>
                        <td className="border p-2">3.96</td>
                        <td className="border p-2">11.3%</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Steel</td>
                        <td className="border p-2">0.78</td>
                        <td className="border p-2">1.85</td>
                        <td className="border p-2">1.44</td>
                        <td className="border p-2">4.1%</td>
                      </tr>
                      <tr>
                        <td className="border p-2">PCB</td>
                        <td className="border p-2">0.12</td>
                        <td className="border p-2">80</td>
                        <td className="border p-2">9.6</td>
                        <td className="border p-2">27.4%</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Glass</td>
                        <td className="border p-2">0.35</td>
                        <td className="border p-2">0.85</td>
                        <td className="border p-2">0.3</td>
                        <td className="border p-2">0.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reduction" className="mt-0">
              <div className="space-y-4">
                <p className="text-gray-600">Potential carbon reduction opportunities for this product.</p>
                
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700">Reduction Opportunities</CardTitle>
                    <CardDescription>
                      Implementing these changes could reduce the product's carbon footprint
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2">trending_down</span>
                        <div>
                          <p className="font-medium">Replace aluminum with recycled aluminum</p>
                          <p className="text-sm text-gray-600">Potential reduction: 2.2 kg CO₂e (6.3%)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2">trending_down</span>
                        <div>
                          <p className="font-medium">Optimize PCB design and manufacturing</p>
                          <p className="text-sm text-gray-600">Potential reduction: 3.8 kg CO₂e (10.9%)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2">trending_down</span>
                        <div>
                          <p className="font-medium">Switch to local suppliers to reduce transportation</p>
                          <p className="text-sm text-gray-600">Potential reduction: 1.5 kg CO₂e (4.3%)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2">trending_down</span>
                        <div>
                          <p className="font-medium">Implement energy efficiency measures in manufacturing</p>
                          <p className="text-sm text-gray-600">Potential reduction: 2.9 kg CO₂e (8.3%)</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-medium">Total potential reduction:</p>
                        <p className="text-2xl font-bold text-green-600">10.4 kg CO₂e (29.8%)</p>
                      </div>
                      <Button>
                        Generate Reduction Plan
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">
            <span className="material-icons text-[18px] mr-1">save</span>
            Save Results
          </Button>
          <Button onClick={handleExport}>
            <span className="material-icons text-[18px] mr-1">download</span>
            Export Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCarbonFootprint;