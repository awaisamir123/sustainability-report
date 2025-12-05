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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/ui/status-badge";

// Compliance framework data
const frameworks = [
  {
    id: 1,
    name: "GRI Standards",
    description: "Core option compliance",
    status: "completed",
    progress: 100,
    icon: "check_circle",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    requirements: [
      { id: 1, name: "Economic Performance Disclosures", status: "completed", progress: 100 },
      { id: 2, name: "Environmental Disclosures", status: "completed", progress: 100 },
      { id: 3, name: "Social Disclosures", status: "completed", progress: 100 },
      { id: 4, name: "Governance Disclosures", status: "completed", progress: 100 }
    ]
  },
  {
    id: 2,
    name: "TCFD Framework",
    description: "Climate-related disclosures",
    status: "in-progress",
    progress: 65,
    icon: "warning",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    requirements: [
      { id: 1, name: "Governance", status: "completed", progress: 100 },
      { id: 2, name: "Strategy", status: "in-progress", progress: 70 },
      { id: 3, name: "Risk Management", status: "in-progress", progress: 45 },
      { id: 4, name: "Metrics and Targets", status: "in-progress", progress: 40 }
    ]
  },
  {
    id: 3,
    name: "ESRS Requirements",
    description: "European Sustainability Reporting",
    status: "attention",
    progress: 30,
    icon: "highlight_off",
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
    requirements: [
      { id: 1, name: "Environmental Standards", status: "in-progress", progress: 45 },
      { id: 2, name: "Social Standards", status: "in-progress", progress: 35 },
      { id: 3, name: "Governance Standards", status: "attention", progress: 20 },
      { id: 4, name: "Cross-cutting Standards", status: "not-started", progress: 0 }
    ]
  },
  {
    id: 4,
    name: "CDP Disclosure",
    description: "Climate Change Questionnaire",
    status: "not-started",
    progress: 0,
    icon: "pending",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    requirements: [
      { id: 1, name: "Governance", status: "not-started", progress: 0 },
      { id: 2, name: "Risks and Opportunities", status: "not-started", progress: 0 },
      { id: 3, name: "Strategy", status: "not-started", progress: 0 },
      { id: 4, name: "Targets and Performance", status: "not-started", progress: 0 },
      { id: 5, name: "Emissions Methodology", status: "not-started", progress: 0 }
    ]
  }
];

// Upcoming regulations data
const upcomingRegulations = [
  {
    id: 1,
    name: "EU Corporate Sustainability Reporting Directive (CSRD)",
    authority: "European Union",
    effectiveDate: "January 2024",
    impactLevel: "High",
    description: "Expands sustainability reporting requirements for large EU companies and introduces mandatory reporting standards.",
    readiness: 45
  },
  {
    id: 2,
    name: "UK Sustainability Disclosure Requirements (SDR)",
    authority: "UK Financial Conduct Authority",
    effectiveDate: "June 2024",
    impactLevel: "Medium",
    description: "New disclosure requirements for companies, asset managers, and asset owners about their sustainability risks, opportunities, and impacts.",
    readiness: 30
  },
  {
    id: 3,
    name: "SEC Climate Disclosure Rule",
    authority: "U.S. Securities and Exchange Commission",
    effectiveDate: "December 2023",
    impactLevel: "High",
    description: "Requires public companies to disclose climate-related risks, emissions, and net-zero transition plans.",
    readiness: 20
  }
];

const Compliance: React.FC = () => {
  const { toast } = useToast();
  const [activeFramework, setActiveFramework] = useState<number | null>(null);
  
  // Get organizations for context
  const { data: organizations } = useQuery({
    queryKey: ['/api/organizations']
  });
  
  const organization = organizations?.[0] || { name: "Demo Company", industry: "Technology" };

  const calculateOverallCompliance = () => {
    const total = frameworks.reduce((acc, framework) => acc + framework.progress, 0);
    return Math.round(total / frameworks.length);
  };
  
  const handleRemediationAction = (frameworkId: number, requirementId: number) => {
    toast({
      title: "Remediation Action",
      description: "Task created to address compliance gap.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-800">Compliance & Certification</h2>
        <p className="text-neutral-500">Track and manage regulatory compliance across frameworks</p>
      </div>
      
      {/* Overall Compliance Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Overall Compliance Status</CardTitle>
          <CardDescription>
            Compliance overview for {organization.name} ({organization.industry})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{calculateOverallCompliance()}%</span>
                </div>
                <svg className="h-32 w-32" viewBox="0 0 100 100">
                  <circle
                    className="text-neutral-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="10"
                    strokeDasharray={`${calculateOverallCompliance() * 2.51} 251.2`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm text-neutral-500">Overall Compliance</p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {frameworks.map((framework) => (
                <div 
                  key={framework.id} 
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveFramework(framework.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${framework.bgColor}`}>
                        <span className={`material-icons ${framework.iconColor}`}>{framework.icon}</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{framework.name}</h4>
                        <p className="text-xs text-neutral-500">{framework.description}</p>
                      </div>
                    </div>
                    <StatusBadge status={framework.status as any} />
                  </div>
                  <Progress value={framework.progress} className="h-2" />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-500">Progress</span>
                    <span className="text-xs font-medium">{framework.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Framework Details */}
      {activeFramework !== null && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{frameworks.find(f => f.id === activeFramework)?.name}</CardTitle>
                <CardDescription>{frameworks.find(f => f.id === activeFramework)?.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setActiveFramework(null)}>
                <span className="material-icons text-[18px] mr-2">arrow_back</span>
                Back to Overview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frameworks.find(f => f.id === activeFramework)?.requirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.name}</TableCell>
                    <TableCell>
                      <StatusBadge status={req.status as any} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={req.progress} className="h-2 w-24" />
                        <span className="text-xs font-medium">{req.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status !== "completed" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRemediationAction(activeFramework, req.id)}
                        >
                          <span className="material-icons text-[16px] mr-1">build</span>
                          Remediate
                        </Button>
                      )}
                      {req.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <span className="material-icons text-[16px] mr-1">visibility</span>
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto">
              <span className="material-icons text-[18px] mr-1">play_circle</span>
              Start Compliance Assessment
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Upcoming Regulations */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Regulations</CardTitle>
          <CardDescription>
            Stay ahead of regulatory changes that may impact your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {upcomingRegulations.map((reg) => (
              <AccordionItem key={reg.id} value={`regulation-${reg.id}`}>
                <AccordionTrigger>
                  <div className="flex items-center flex-wrap">
                    <span className="font-medium">{reg.name}</span>
                    <div className="ml-auto flex items-center gap-2 mr-4">
                      <Badge 
                        variant="outline" 
                        className="ml-2 shrink-0"
                      >
                        {reg.effectiveDate}
                      </Badge>
                      <Badge 
                        className={`shrink-0 ${
                          reg.impactLevel === "High" 
                            ? "bg-red-100 text-red-800 hover:bg-red-100" 
                            : reg.impactLevel === "Medium" 
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }`}
                      >
                        {reg.impactLevel} Impact
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p className="text-neutral-600">{reg.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">Readiness: {reg.readiness}%</p>
                        <Progress value={reg.readiness} className="h-2 w-full sm:w-40 mt-1" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <span className="material-icons text-[16px] mr-1">info</span>
                          Learn More
                        </Button>
                        <Button size="sm">
                          <span className="material-icons text-[16px] mr-1">task_alt</span>
                          Prepare
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      {/* Compliance Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Resources</CardTitle>
          <CardDescription>
            Tools and resources to help you stay compliant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
                    <span className="material-icons text-primary">policy</span>
                  </div>
                  <h3 className="font-medium">Compliance Library</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Access guides, templates, and best practices for regulatory compliance.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">menu_book</span>
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-green-100 p-2 mr-3">
                    <span className="material-icons text-green-600">chat</span>
                  </div>
                  <h3 className="font-medium">Expert Assistance</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Connect with ESG compliance experts for personalized guidance.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">support_agent</span>
                  Get Help
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <span className="material-icons text-blue-600">notifications</span>
                  </div>
                  <h3 className="font-medium">Regulatory Alerts</h3>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Sign up for alerts about upcoming regulatory changes in your industry.
                </p>
                <Button variant="outline" className="w-full">
                  <span className="material-icons text-[16px] mr-1">notification_add</span>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;
