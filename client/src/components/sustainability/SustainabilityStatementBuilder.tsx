import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, FileDown, Image as ImageIcon, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import html2pdf from "html2pdf.js";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table as TableDocx,
  TableRow as TableRowDocx,
  TableCell as TableCellDocx,
  HeadingLevel,
  AlignmentType,
  WidthType,
  ImageRun, // <-- Add this
} from "docx";
import { saveAs } from "file-saver";

// SDG icons representing different UN Sustainable Development Goals
const SDGIcons = [
  { id: 1, name: "No Poverty", color: "bg-red-500" },
  { id: 2, name: "Zero Hunger", color: "bg-amber-500" },
  { id: 3, name: "Good Health", color: "bg-green-500" },
  { id: 4, name: "Quality Education", color: "bg-rose-600" },
  { id: 5, name: "Gender Equality", color: "bg-orange-500" },
  { id: 6, name: "Clean Water", color: "bg-blue-500" },
  { id: 7, name: "Clean Energy", color: "bg-yellow-400" },
  { id: 8, name: "Economic Growth", color: "bg-red-700" },
  { id: 9, name: "Industry & Innovation", color: "bg-orange-600" },
  { id: 10, name: "Reduced Inequalities", color: "bg-pink-500" },
  { id: 11, name: "Sustainable Cities", color: "bg-amber-600" },
  { id: 12, name: "Responsible Consumption", color: "bg-amber-800" },
  { id: 13, name: "Climate Action", color: "bg-green-600" },
  { id: 14, name: "Life Below Water", color: "bg-blue-600" },
  { id: 15, name: "Life On Land", color: "bg-green-700" },
  { id: 16, name: "Peace & Justice", color: "bg-blue-800" },
  { id: 17, name: "Partnerships", color: "bg-blue-700" },
];

// Initial form state for each template type
const initialFormState = {
  corporateSnapshot: {
    companyName: "",
    tagline: "",
    aboutUs: "",
    sustainabilityVision: "",
    selectedSdgs: [],
    metrics: {
      climate: [
        { name: "Total GHG Emissions (tCO₂e)", current: "", previous: "" },
        { name: "% Renewable Energy Used", current: "", previous: "" },
      ],
      social: [
        { name: "Female Leadership (%)", current: "", previous: "" },
        { name: "Community Investment ($)", current: "", previous: "" },
      ],
      governance: [
        { name: "ESG Board Oversight (Yes/No)", current: "", previous: "" },
        {
          name: "Ethics Hotline Cases Resolved (%)",
          current: "",
          previous: "",
        },
      ],
    },
    companyLogo: null as File | null,
    impactImage: null as File | null,
  },
  visualImpact: {
    companyName: "",
    climateStats: {
      emissions: "",
      renewableEnergy: "",
    },
    peopleStats: {
      womenWorkforce: "",
      trainingHours: "",
    },
    governanceStats: {
      policyAdopted: "",
      esgBonus: "",
    },
    futureTargets: {
      target1: "",
      target2: "",
    },
    journeyText: "",
    lookingAheadItems: ["", "", ""],
    commitments: "",
    selectedSdgs: [],
    images: {
      banner: null as File | null,
      small1: null as File | null,
      small2: null as File | null,
    },
  },
  esgStrategy: {
    companyName: "",
    sustainabilityStrategy: "",
    governanceRoles: [
      { role: "Board", responsibility: "" },
      { role: "ESG Committee", responsibility: "" },
      { role: "Executive Team", responsibility: "" },
    ],
    risksOpportunities: [
      { category: "Climate", risk: "", opportunity: "" },
      { category: "Social", risk: "", opportunity: "" },
      { category: "Governance", risk: "", opportunity: "" },
    ],
    climateTargets: [
      { year: "2025", target: "" },
      { year: "2030", target: "" },
      { year: "2040", target: "" },
    ],
    kpiMetrics: [
      { category: "Environmental", metric: "", value: "", target: "" },
      { category: "Social", metric: "", value: "", target: "" },
      { category: "Governance", metric: "", value: "", target: "" },
    ],
    materialTopics: ["", "", "", "", "", ""],
  },
};

// Sample data for preview (can be removed in production)
const sampleData = {
  corporateSnapshot: {
    companyName: "Greentech AI",
    tagline: "Empowering Sustainable Growth",
    aboutUs:
      "Greentech AI is a clean-tech software firm enabling smart energy optimization for factories.",
    sustainabilityVision:
      "We aim to reduce 1 million tonnes of CO₂e by 2030 through AI-powered interventions.",
    selectedSdgs: [7, 9, 13],
    metrics: {
      climate: [
        {
          name: "Total GHG Emissions (tCO₂e)",
          current: "1,245",
          previous: "1,400",
        },
        { name: "% Renewable Energy Used", current: "65%", previous: "42%" },
      ],
      social: [
        { name: "Female Leadership (%)", current: "52%", previous: "48%" },
        {
          name: "Community Investment ($)",
          current: "$120K",
          previous: "$85K",
        },
      ],
      governance: [
        {
          name: "ESG Board Oversight (Yes/No)",
          current: "Yes",
          previous: "Yes",
        },
        {
          name: "Ethics Hotline Cases Resolved (%)",
          current: "98%",
          previous: "96%",
        },
      ],
    },
    companyLogo: null,
    impactImage: null,
  },
  visualImpact: {
    companyName: "SolarX",
    climateStats: {
      emissions: "1,400 tCO₂e",
      renewableEnergy: "68%",
    },
    peopleStats: {
      womenWorkforce: "54%",
      trainingHours: "1,200 hrs",
    },
    governanceStats: {
      policyAdopted: "2022",
      esgBonus: "Introduced 2023",
    },
    futureTargets: {
      target1: "Net-Zero by 2040",
      target2: "Zero-waste packaging by 2026",
    },
    journeyText:
      "Since launching in 2019, SolarX has helped 400+ schools cut 1,200 tCO₂e. 68% of our HQ energy is solar-sourced.",
    lookingAheadItems: [
      "Launch Asia pilot by 2025",
      "Publish Scope 3 inventory",
      "Achieve net-zero by 2040",
    ],
    commitments:
      "54% of staff are women. In 2023, all employees received DEI training and mental wellness benefits.",
    selectedSdgs: [7, 11, 13],
  },
  esgStrategy: {
    companyName: "EcoWare",
    sustainabilityStrategy:
      "EcoWare's ESG program focuses on circular design, supplier traceability, and emissions reduction in packaging. We conduct annual risk mapping tied to material topics and TCFD guidance.",
    governanceRoles: [
      { role: "Board", responsibility: "Quarterly ESG reviews" },
      {
        role: "ESG Committee",
        responsibility: "Monthly implementation reviews",
      },
      { role: "Executive Team", responsibility: "Strategy integration" },
    ],
    risksOpportunities: [
      {
        category: "Climate",
        risk: "Supply disruption",
        opportunity: "New markets",
      },
      {
        category: "Social",
        risk: "Talent retention",
        opportunity: "Innovation",
      },
      {
        category: "Governance",
        risk: "Regulatory changes",
        opportunity: "Trust building",
      },
    ],
    climateTargets: [
      { year: "2025", target: "-15% Scope 1 & 2" },
      { year: "2030", target: "-30% Scope 1 & 2" },
      { year: "2040", target: "Net Zero" },
    ],
    kpiMetrics: [
      {
        category: "Environmental",
        metric: "Emissions reduction",
        value: "12%",
        target: "15%",
      },
      {
        category: "Social",
        metric: "Supplier audits",
        value: "85%",
        target: "100%",
      },
      {
        category: "Governance",
        metric: "ESG training",
        value: "92%",
        target: "100%",
      },
    ],
    materialTopics: [
      "Climate resilience",
      "Supplier human rights",
      "Packaging footprint",
      "Circular economy",
      "Inclusive workplace",
      "Data security",
    ],
  },
};

export const SustainabilityStatementBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("corporateSnapshot");
  const [formState, setFormState] = useState(initialFormState);
  const [useSampleData, setUseSampleData] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Data for the active display - either form values or sample values
  const activeData = useSampleData ? sampleData : formState;

  // Handle form field changes for all template types
  const handleInputChange = (template: string, field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [template]: {
        ...prev[template as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  // Handle nested field changes
  const handleNestedChange = (
    template: string,
    parent: string,
    field: string,
    value: any
  ) => {
    setFormState((prev) => ({
      ...prev,
      [template]: {
        ...prev[template as keyof typeof prev],
        [parent]: {
          ...prev[template as keyof typeof prev][
            parent as keyof (typeof prev)[keyof typeof prev]
          ],
          [field]: value,
        },
      },
    }));
  };

  // Handle array field changes
  const handleArrayChange = (
    template: string,
    parent: string,
    index: number,
    field: string,
    value: any
  ) => {
    setFormState((prev) => {
      const updatedTemplate = { ...prev[template as keyof typeof prev] };
      const parentArray = [
        ...(updatedTemplate[
          parent as keyof typeof updatedTemplate
        ] as unknown as any[]),
      ];
      parentArray[index] = { ...parentArray[index], [field]: value };

      return {
        ...prev,
        [template]: {
          ...updatedTemplate,
          [parent]: parentArray,
        },
      };
    });
  };

  // Handle metrics changes for corporate snapshot
  const handleMetricChange = (
    category: string,
    index: number,
    field: "current" | "previous",
    value: string
  ) => {
    setFormState((prev) => {
      const metrics = { ...prev.corporateSnapshot.metrics };
      metrics[category as keyof typeof metrics][index][field] = value;

      return {
        ...prev,
        corporateSnapshot: {
          ...prev.corporateSnapshot,
          metrics,
        },
      };
    });
  };

  // Handle SDG selection
  const handleSdgSelection = (template: string, sdgId: number) => {
    setFormState((prev) => {
      const templateData = prev[template as keyof typeof prev];
      let selectedSdgs = [...(templateData.selectedSdgs as number[])];

      if (selectedSdgs.includes(sdgId)) {
        selectedSdgs = selectedSdgs.filter((id) => id !== sdgId);
      } else {
        selectedSdgs.push(sdgId);
      }

      return {
        ...prev,
        [template]: {
          ...templateData,
          selectedSdgs,
        },
      };
    });
  };

  // Handle file uploads
  const handleFileUpload = (
    template: string,
    field: string,
    file: File | null
  ) => {
    setFormState((prev) => ({
      ...prev,
      [template]: {
        ...prev[template as keyof typeof prev],
        [field]: file,
      },
    }));
  };

  // Handle nested file uploads
  const handleNestedFileUpload = (
    template: string,
    parent: string,
    field: string,
    file: File | null
  ) => {
    setFormState((prev) => {
      const templateData = prev[template as keyof typeof prev];
      const parentData = {
        ...(templateData[parent as keyof typeof templateData] as Record<
          string,
          any
        >),
      };
      parentData[field] = file;

      return {
        ...prev,
        [template]: {
          ...templateData,
          [parent]: parentData,
        },
      };
    });
  };

  // Export functions
  const exportAsPdf = () => {
    if (!previewRef.current) {
      alert("Preview not available for export.");
      return;
    }
    // Optional: Hide buttons or UI not needed in PDF
    const element = previewRef.current;
    const opt = {
      margin: 0.5,
      filename: "SustainabilityStatement.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // const exportAsWord = () => {
  //   // This would use docx.js in a real implementation
  //   alert("Word export functionality would be implemented here using docx.js");
  // };
  // Helper to convert File to base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const exportAsWord = async () => {
    const data = activeData[selectedTemplate];
    const docChildren: any[] = [];

    // --- Page 1: Executive Summary ---
    // Logo image
    let logoImageRun = undefined;
    if (data.companyLogo) {
      const base64 = await fileToBase64(data.companyLogo);
      logoImageRun = new ImageRun({
        data: Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)),
        transformation: { width: 80, height: 80 },
      });
    }

    // Impact image
    let impactImageRun = undefined;
    if (data.impactImage) {
      const base64 = await fileToBase64(data.impactImage);
      impactImageRun = new ImageRun({
        data: Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)),
        transformation: { width: 400, height: 100 },
      });
    }

    // Header row: Logo + Company Name/Tagline
    docChildren.push(
      new TableDocx({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRowDocx({
            children: [
              new TableCellDocx({
                width: { size: 25, type: WidthType.PERCENTAGE },
                children: [
                  logoImageRun
                    ? new Paragraph({
                        children: [logoImageRun],
                        alignment: AlignmentType.CENTER,
                      })
                    : new Paragraph({
                        text: "Company Logo",
                        alignment: AlignmentType.CENTER,
                      }),
                ],
                verticalAlign: "center",
              }),
              new TableCellDocx({
                width: { size: 75, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    text: data.companyName || "Your Company Name",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.RIGHT,
                  }),
                  new Paragraph({
                    text: data.tagline || "Your Company Tagline",
                    italics: true,
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                verticalAlign: "center",
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ text: "" })
    );

    // About Us
    docChildren.push(
      new Paragraph({
        text: "About Us",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text:
          data.aboutUs ||
          "Your company description will appear here. This should be a brief overview of your organization, including size, primary activities, markets served, and operational structure.",
        spacing: { after: 200 },
      })
    );

    // Sustainability Vision
    docChildren.push(
      new Paragraph({
        text: "Sustainability Vision & Strategy",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text:
          data.sustainabilityVision ||
          "Your sustainability vision statement will appear here. This should outline your goals, commitments, and approach to environmental and social responsibility.",
        spacing: { after: 200 },
      })
    );

    // SDG Alignment
    docChildren.push(
      new Paragraph({
        text: "UN SDG Alignment",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text:
          data.selectedSdgs && data.selectedSdgs.length > 0
            ? `SDGs: ${data.selectedSdgs.join(", ")}`
            : "No SDGs selected",
        spacing: { after: 200 },
      })
    );

    // Impact Image
    docChildren.push(
      impactImageRun
        ? new Paragraph({
            children: [impactImageRun],
            alignment: AlignmentType.CENTER,
          })
        : new Paragraph({
            text: "Your impact image will appear here",
            alignment: AlignmentType.CENTER,
          }),
      new Paragraph({ text: "" })
    );

    // --- Page 2: ESG Snapshot Table ---
    docChildren.push(
      new Paragraph({
        text: "Page 2: ESG Snapshot",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
      })
    );

    // Build ESG Table
    const tableRows: TableRowDocx[] = [];

    // Climate
    // data?.metrics?.climate.forEach((metric: any, idx: number) => {
    //   tableRows.push(
    //     new TableRowDocx({
    //       children: [
    //         ...(idx === 0
    //           ? [
    //               new TableCellDocx({
    //                 rowSpan: data.metrics.climate.length,
    //                 children: [new Paragraph("Climate")],
    //                 verticalAlign: "center",
    //               }),
    //             ]
    //           : []),
    //         new TableCellDocx({ children: [new Paragraph(metric.name)] }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.current || "—")],
    //         }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.previous || "—")],
    //         }),
    //       ],
    //     })
    //   );
    // });
    if (data.metrics && data.metrics.climate) {
      data.metrics.climate.forEach((metric: any, idx: number) => {
        tableRows.push(
          new TableRowDocx({
            children: [
              ...(idx === 0
                ? [
                    new TableCellDocx({
                      rowSpan: data.metrics.climate.length,
                      children: [new Paragraph("Climate")],
                      verticalAlign: "center",
                    }),
                  ]
                : []),
              new TableCellDocx({ children: [new Paragraph(metric.name)] }),
              new TableCellDocx({
                children: [new Paragraph(metric.current || "—")],
              }),
              new TableCellDocx({
                children: [new Paragraph(metric.previous || "—")],
              }),
            ],
          })
        );
      });
    }
    // Social
    // data.metrics.social.forEach((metric: any, idx: number) => {
    //   tableRows.push(
    //     new TableRowDocx({
    //       children: [
    //         ...(idx === 0
    //           ? [
    //               new TableCellDocx({
    //                 rowSpan: data.metrics.social.length,
    //                 children: [new Paragraph("Social")],
    //                 verticalAlign: "center",
    //               }),
    //             ]
    //           : []),
    //         new TableCellDocx({ children: [new Paragraph(metric.name)] }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.current || "—")],
    //         }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.previous || "—")],
    //         }),
    //       ],
    //     })
    //   );
    // });
    if (data.metrics && data.metrics.social) {
      data.metrics.social.forEach((metric: any, idx: number) => {
        tableRows.push(
          new TableRowDocx({
            children: [
              ...(idx === 0
                ? [
                    new TableCellDocx({
                      rowSpan: data.metrics.social.length,
                      children: [new Paragraph("Social")],
                      verticalAlign: "center",
                    }),
                  ]
                : []),
              new TableCellDocx({ children: [new Paragraph(metric.name)] }),
              new TableCellDocx({
                children: [new Paragraph(metric.current || "—")],
              }),
              new TableCellDocx({
                children: [new Paragraph(metric.previous || "—")],
              }),
            ],
          })
        );
      });
    }

    // Governance
    // data.metrics.governance.forEach((metric: any, idx: number) => {
    //   tableRows.push(
    //     new TableRowDocx({
    //       children: [
    //         ...(idx === 0
    //           ? [
    //               new TableCellDocx({
    //                 rowSpan: data.metrics.governance.length,
    //                 children: [new Paragraph("Governance")],
    //                 verticalAlign: "center",
    //               }),
    //             ]
    //           : []),
    //         new TableCellDocx({ children: [new Paragraph(metric.name)] }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.current || "—")],
    //         }),
    //         new TableCellDocx({
    //           children: [new Paragraph(metric.previous || "—")],
    //         }),
    //       ],
    //     })
    //   );
    // });
    if (data.metrics && data.metrics.governance) {
      data.metrics.governance.forEach((metric: any, idx: number) => {
        tableRows.push(
          new TableRowDocx({
            children: [
              ...(idx === 0
                ? [
                    new TableCellDocx({
                      rowSpan: data.metrics.governance.length,
                      children: [new Paragraph("Governance")],
                      verticalAlign: "center",
                    }),
                  ]
                : []),
              new TableCellDocx({ children: [new Paragraph(metric.name)] }),
              new TableCellDocx({
                children: [new Paragraph(metric.current || "—")],
              }),
              new TableCellDocx({
                children: [new Paragraph(metric.previous || "—")],
              }),
            ],
          })
        );
      });
    }

    docChildren.push(
      new TableDocx({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRowDocx({
            children: [
              new TableCellDocx({
                children: [new Paragraph("Metric Category")],
              }),
              new TableCellDocx({ children: [new Paragraph("Indicator")] }),
              new TableCellDocx({ children: [new Paragraph("2023")] }),
              new TableCellDocx({ children: [new Paragraph("2022")] }),
            ],
          }),
          ...tableRows,
        ],
      })
    );

    // --- Build and Save ---
    const doc = new Document({
      sections: [{ children: docChildren }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "SustainabilityStatement.docx");
  };
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">
        Sustainability Statement Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Template selector and editor - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a template for your sustainability statement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="corporateSnapshot"
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="corporateSnapshot">
                    Corporate Snapshot
                  </TabsTrigger>
                  <TabsTrigger value="visualImpact">Visual Impact</TabsTrigger>
                  <TabsTrigger value="esgStrategy">ESG Strategy</TabsTrigger>
                </TabsList>

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Template Editor</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUseSampleData(!useSampleData)}
                    >
                      {useSampleData ? "Clear Sample Data" : "Use Sample Data"}
                    </Button>
                  </div>
                </div>

                <TabsContent value="corporateSnapshot" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={formState.corporateSnapshot.companyName}
                          onChange={(e) =>
                            handleInputChange(
                              "corporateSnapshot",
                              "companyName",
                              e.target.value
                            )
                          }
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={formState.corporateSnapshot.tagline}
                          onChange={(e) =>
                            handleInputChange(
                              "corporateSnapshot",
                              "tagline",
                              e.target.value
                            )
                          }
                          placeholder="E.g., Empowering Sustainable Growth"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <Label htmlFor="aboutUs">About Us</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Brief description of your company (50-75 words)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea
                        id="aboutUs"
                        value={formState.corporateSnapshot.aboutUs}
                        onChange={(e) =>
                          handleInputChange(
                            "corporateSnapshot",
                            "aboutUs",
                            e.target.value
                          )
                        }
                        placeholder="Brief description of your company (50-75 words)"
                        className="h-20"
                      />
                    </div>

                    <div>
                      <div className="flex items-center">
                        <Label htmlFor="vision">
                          Sustainability Vision & Strategy
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Your company's overall sustainability mission
                                and goals
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea
                        id="vision"
                        value={formState.corporateSnapshot.sustainabilityVision}
                        onChange={(e) =>
                          handleInputChange(
                            "corporateSnapshot",
                            "sustainabilityVision",
                            e.target.value
                          )
                        }
                        placeholder="Your company's overall sustainability mission and goals"
                        className="h-20"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">UN SDG Alignment</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {SDGIcons.map((sdg) => (
                          <TooltipProvider key={sdg.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`h-8 w-8 rounded flex items-center justify-center cursor-pointer ${
                                    formState.corporateSnapshot.selectedSdgs.includes(
                                      sdg.id
                                    )
                                      ? sdg.color + " text-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                  onClick={() =>
                                    handleSdgSelection(
                                      "corporateSnapshot",
                                      sdg.id
                                    )
                                  }
                                >
                                  {sdg.id}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{sdg.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">
                          Upload Company Logo
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            className="w-full h-24 flex flex-col items-center justify-center text-gray-500"
                            onClick={() =>
                              document.getElementById("logo-upload")?.click()
                            }
                          >
                            <ImageIcon className="h-6 w-6 mb-2" />
                            <span>Upload Logo</span>
                            <input
                              id="logo-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload(
                                    "corporateSnapshot",
                                    "companyLogo",
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </Button>
                          {formState.corporateSnapshot.companyLogo && (
                            <div className="text-sm text-gray-600">
                              {formState.corporateSnapshot.companyLogo.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">
                          Upload Impact Image
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            className="w-full h-24 flex flex-col items-center justify-center text-gray-500"
                            onClick={() =>
                              document.getElementById("impact-upload")?.click()
                            }
                          >
                            <ImageIcon className="h-6 w-6 mb-2" />
                            <span>Upload Image</span>
                            <input
                              id="impact-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload(
                                    "corporateSnapshot",
                                    "impactImage",
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </Button>
                          {formState.corporateSnapshot.impactImage && (
                            <div className="text-sm text-gray-600">
                              {formState.corporateSnapshot.impactImage.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">
                        ESG Metrics (Page 2)
                      </h4>

                      <div className="space-y-4">
                        <h5 className="text-sm font-semibold">
                          Climate Metrics
                        </h5>
                        {formState.corporateSnapshot.metrics.climate.map(
                          (metric, index) => (
                            <div key={index} className="grid grid-cols-6 gap-2">
                              <div className="col-span-4">
                                <Label className="text-xs">{metric.name}</Label>
                              </div>
                              <div>
                                <Input
                                  placeholder="2023"
                                  value={metric.current}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "climate",
                                      index,
                                      "current",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Input
                                  placeholder="2022"
                                  value={metric.previous}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "climate",
                                      index,
                                      "previous",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          )
                        )}

                        <h5 className="text-sm font-semibold">
                          Social Metrics
                        </h5>
                        {formState.corporateSnapshot.metrics.social.map(
                          (metric, index) => (
                            <div key={index} className="grid grid-cols-6 gap-2">
                              <div className="col-span-4">
                                <Label className="text-xs">{metric.name}</Label>
                              </div>
                              <div>
                                <Input
                                  placeholder="2023"
                                  value={metric.current}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "social",
                                      index,
                                      "current",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Input
                                  placeholder="2022"
                                  value={metric.previous}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "social",
                                      index,
                                      "previous",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          )
                        )}

                        <h5 className="text-sm font-semibold">
                          Governance Metrics
                        </h5>
                        {formState.corporateSnapshot.metrics.governance.map(
                          (metric, index) => (
                            <div key={index} className="grid grid-cols-6 gap-2">
                              <div className="col-span-4">
                                <Label className="text-xs">{metric.name}</Label>
                              </div>
                              <div>
                                <Input
                                  placeholder="2023"
                                  value={metric.current}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "governance",
                                      index,
                                      "current",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Input
                                  placeholder="2022"
                                  value={metric.previous}
                                  onChange={(e) =>
                                    handleMetricChange(
                                      "governance",
                                      index,
                                      "previous",
                                      e.target.value
                                    )
                                  }
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visualImpact" className="space-y-4">
                  {/* Visual Impact Report Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="viCompanyName">Company Name</Label>
                      <Input
                        id="viCompanyName"
                        value={formState.visualImpact.companyName}
                        onChange={(e) =>
                          handleInputChange(
                            "visualImpact",
                            "companyName",
                            e.target.value
                          )
                        }
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">Climate</h4>
                        <div>
                          <Label htmlFor="emissions">Net Emissions</Label>
                          <Input
                            id="emissions"
                            value={
                              formState.visualImpact.climateStats.emissions
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "climateStats",
                                "emissions",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 1,400 tCO₂e"
                          />
                        </div>
                        <div>
                          <Label htmlFor="renewableEnergy">
                            Renewable Energy
                          </Label>
                          <Input
                            id="renewableEnergy"
                            value={
                              formState.visualImpact.climateStats
                                .renewableEnergy
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "climateStats",
                                "renewableEnergy",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 68%"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">People</h4>
                        <div>
                          <Label htmlFor="womenWorkforce">
                            Women in Workforce
                          </Label>
                          <Input
                            id="womenWorkforce"
                            value={
                              formState.visualImpact.peopleStats.womenWorkforce
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "peopleStats",
                                "womenWorkforce",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 54%"
                          />
                        </div>
                        <div>
                          <Label htmlFor="trainingHours">Training Hours</Label>
                          <Input
                            id="trainingHours"
                            value={
                              formState.visualImpact.peopleStats.trainingHours
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "peopleStats",
                                "trainingHours",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 1,200 hrs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Governance
                        </h4>
                        <div>
                          <Label htmlFor="policyAdopted">
                            ESG Policy Adopted
                          </Label>
                          <Input
                            id="policyAdopted"
                            value={
                              formState.visualImpact.governanceStats
                                .policyAdopted
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "governanceStats",
                                "policyAdopted",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 2022"
                          />
                        </div>
                        <div>
                          <Label htmlFor="esgBonus">ESG-linked Bonus</Label>
                          <Input
                            id="esgBonus"
                            value={
                              formState.visualImpact.governanceStats.esgBonus
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "governanceStats",
                                "esgBonus",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Introduced 2023"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Future Targets
                        </h4>
                        <div>
                          <Label htmlFor="target1">Target 1</Label>
                          <Input
                            id="target1"
                            value={formState.visualImpact.futureTargets.target1}
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "futureTargets",
                                "target1",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Net-Zero by 2040"
                          />
                        </div>
                        <div>
                          <Label htmlFor="target2">Target 2</Label>
                          <Input
                            id="target2"
                            value={formState.visualImpact.futureTargets.target2}
                            onChange={(e) =>
                              handleNestedChange(
                                "visualImpact",
                                "futureTargets",
                                "target2",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Zero-waste packaging by 2026"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="journeyText">
                        Our Journey to Sustainability
                      </Label>
                      <Textarea
                        id="journeyText"
                        value={formState.visualImpact.journeyText}
                        onChange={(e) =>
                          handleInputChange(
                            "visualImpact",
                            "journeyText",
                            e.target.value
                          )
                        }
                        placeholder="Describe your sustainability journey"
                        className="h-20"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">Looking Ahead</Label>
                      <div className="space-y-2">
                        {formState.visualImpact.lookingAheadItems.map(
                          (item, index) => (
                            <Input
                              key={index}
                              value={item}
                              onChange={(e) => {
                                const newItems = [
                                  ...formState.visualImpact.lookingAheadItems,
                                ];
                                newItems[index] = e.target.value;
                                handleInputChange(
                                  "visualImpact",
                                  "lookingAheadItems",
                                  newItems
                                );
                              }}
                              placeholder={`Future milestone ${index + 1}`}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="commitments">Our Commitments</Label>
                      <Textarea
                        id="commitments"
                        value={formState.visualImpact.commitments}
                        onChange={(e) =>
                          handleInputChange(
                            "visualImpact",
                            "commitments",
                            e.target.value
                          )
                        }
                        placeholder="Describe your commitments"
                        className="h-20"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">UN SDG Alignment</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {SDGIcons.map((sdg) => (
                          <TooltipProvider key={sdg.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`h-8 w-8 rounded flex items-center justify-center cursor-pointer ${
                                    formState.visualImpact.selectedSdgs.includes(
                                      sdg.id
                                    )
                                      ? sdg.color + " text-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                  onClick={() =>
                                    handleSdgSelection("visualImpact", sdg.id)
                                  }
                                >
                                  {sdg.id}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{sdg.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">
                          Upload Banner Image
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            className="w-full h-24 flex flex-col items-center justify-center text-gray-500"
                            onClick={() =>
                              document.getElementById("banner-upload")?.click()
                            }
                          >
                            <ImageIcon className="h-6 w-6 mb-2" />
                            <span>Upload Banner</span>
                            <input
                              id="banner-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleNestedFileUpload(
                                    "visualImpact",
                                    "images",
                                    "banner",
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </Button>
                          {formState.visualImpact.images.banner && (
                            <div className="text-sm text-gray-600">
                              {formState.visualImpact.images.banner.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2 block">
                            Upload Small Image 1
                          </Label>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col items-center justify-center text-gray-500"
                            onClick={() =>
                              document.getElementById("small1-upload")?.click()
                            }
                          >
                            <ImageIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Upload Image</span>
                            <input
                              id="small1-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleNestedFileUpload(
                                    "visualImpact",
                                    "images",
                                    "small1",
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </Button>
                        </div>

                        <div>
                          <Label className="mb-2 block">
                            Upload Small Image 2
                          </Label>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col items-center justify-center text-gray-500"
                            onClick={() =>
                              document.getElementById("small2-upload")?.click()
                            }
                          >
                            <ImageIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Upload Image</span>
                            <input
                              id="small2-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleNestedFileUpload(
                                    "visualImpact",
                                    "images",
                                    "small2",
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="esgStrategy" className="space-y-4">
                  {/* ESG Strategy Template Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="esCompanyName">Company Name</Label>
                      <Input
                        id="esCompanyName"
                        value={formState.esgStrategy.companyName}
                        onChange={(e) =>
                          handleInputChange(
                            "esgStrategy",
                            "companyName",
                            e.target.value
                          )
                        }
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sustainabilityStrategy">
                        Sustainability Strategy
                      </Label>
                      <Textarea
                        id="sustainabilityStrategy"
                        value={formState.esgStrategy.sustainabilityStrategy}
                        onChange={(e) =>
                          handleInputChange(
                            "esgStrategy",
                            "sustainabilityStrategy",
                            e.target.value
                          )
                        }
                        placeholder="Describe your sustainability strategy (1-2 paragraphs)"
                        className="h-24"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="block">Governance Model</Label>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Role</TableHead>
                            <TableHead>Responsibility</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formState.esgStrategy.governanceRoles.map(
                            (role, index) => (
                              <TableRow key={index}>
                                <TableCell>{role.role}</TableCell>
                                <TableCell>
                                  <Input
                                    value={role.responsibility}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "governanceRoles",
                                        index,
                                        "responsibility",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter responsibility"
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-2">
                      <Label className="block">Risks & Opportunities</Label>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Risk</TableHead>
                            <TableHead>Opportunity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formState.esgStrategy.risksOpportunities.map(
                            (item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                  <Input
                                    value={item.risk}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "risksOpportunities",
                                        index,
                                        "risk",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter risk"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.opportunity}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "risksOpportunities",
                                        index,
                                        "opportunity",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter opportunity"
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-2">
                      <Label className="block">Climate Targets Timeline</Label>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Target</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formState.esgStrategy.climateTargets.map(
                            (item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>
                                  <Input
                                    value={item.target}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "climateTargets",
                                        index,
                                        "target",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter target"
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-2">
                      <Label className="block">KPIs & Metrics</Label>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Metric</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Target</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formState.esgStrategy.kpiMetrics.map(
                            (item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                  <Input
                                    value={item.metric}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "kpiMetrics",
                                        index,
                                        "metric",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter metric"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.value}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "kpiMetrics",
                                        index,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter value"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.target}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "esgStrategy",
                                        "kpiMetrics",
                                        index,
                                        "target",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter target"
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <Label className="mb-2 block">Material Topics</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {formState.esgStrategy.materialTopics.map(
                          (topic, index) => (
                            <Input
                              key={index}
                              value={topic}
                              onChange={(e) => {
                                const newTopics = [
                                  ...formState.esgStrategy.materialTopics,
                                ];
                                newTopics[index] = e.target.value;
                                handleInputChange(
                                  "esgStrategy",
                                  "materialTopics",
                                  newTopics
                                );
                              }}
                              placeholder={`Material topic ${index + 1}`}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={exportAsWord}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export to Word
                </Button>
                <Button onClick={exportAsPdf}>
                  <Download className="h-4 w-4 mr-2" />
                  Export to PDF
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Preview Panel - 7 columns */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                {showPreview
                  ? "This is how your sustainability statement will look"
                  : "Click 'Show Preview' to see how your statement will look"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                // ref={previewRef}
                className={`border rounded-md p-6 space-y-6 ${
                  showPreview ? "" : "hidden"
                }`}
                style={
                  !showPreview
                    ? {
                        position: "absolute",
                        left: "-9999px",
                        top: 0,
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                      }
                    : {}
                }
                aria-hidden={!showPreview}
              >
                {/* {showPreview && ( */}
                <div
                  ref={previewRef}
                  className="border rounded-md p-6 space-y-6"
                >
                  {/* Different Preview Templates */}
                  {selectedTemplate === "corporateSnapshot" && (
                    <div className="space-y-6">
                      {/* Page 1 Preview */}
                      <div className="border-b pb-6 mb-6">
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 1: Executive Summary
                        </h2>

                        <div className="flex justify-between items-start mb-6">
                          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                            {activeData?.corporateSnapshot?.companyLogo ? (
                              <>
                                <img
                                  src={URL.createObjectURL(
                                    activeData.corporateSnapshot.companyLogo
                                  )}
                                  alt="Company Logo"
                                  className="object-contain w-full h-full"
                                />

                                {/* <p className="text-xs text-gray-500">
                                  Logo Uploaded
                                </p> */}
                              </>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Company Logo
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <h3 className="text-lg font-semibold text-teal-700">
                              {activeData.corporateSnapshot.companyName ||
                                "Your Company Name"}
                            </h3>
                            <p className="text-sm italic text-gray-600">
                              {activeData.corporateSnapshot.tagline ||
                                "Your Company Tagline"}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">About Us</h4>
                          <p className="text-gray-700">
                            {activeData.corporateSnapshot.aboutUs ||
                              "Your company description will appear here. This should be a brief overview of your organization, including size, primary activities, markets served, and operational structure."}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Sustainability Vision & Strategy
                          </h4>
                          <p className="text-gray-700">
                            {activeData.corporateSnapshot
                              .sustainabilityVision ||
                              "Your sustainability vision statement will appear here. This should outline your goals, commitments, and approach to environmental and social responsibility."}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            UN SDG Alignment
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeData.corporateSnapshot.selectedSdgs.length >
                            0 ? (
                              activeData.corporateSnapshot.selectedSdgs.map(
                                (id) => {
                                  const sdg = SDGIcons.find((s) => s.id === id);
                                  return (
                                    <div
                                      key={id}
                                      className={`w-10 h-10 ${sdg?.color} text-white rounded flex items-center justify-center`}
                                    >
                                      {id}
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <p className="text-sm text-gray-500">
                                No SDGs selected
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                            {activeData.corporateSnapshot.impactImage ? (
                              <>
                                <img
                                  src={URL.createObjectURL(
                                    activeData.corporateSnapshot.impactImage
                                  )}
                                  alt="Impact"
                                  className="object-contain w-full h-full"
                                />
                                {/* <p className="text-sm text-gray-500">
                                  Impact Image Uploaded
                                </p> */}
                              </>
                            ) : (
                              <p className="text-sm text-gray-500">
                                Your impact image will appear here
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Page 2 Preview */}
                      <div>
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 2: ESG Snapshot
                        </h2>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Metric Category</TableHead>
                              <TableHead>Indicator</TableHead>
                              <TableHead>2023</TableHead>
                              <TableHead>2022</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* Climate Metrics */}
                            {activeData.corporateSnapshot.metrics.climate.map(
                              (metric, index) => (
                                <TableRow key={`climate-${index}`}>
                                  {index === 0 && (
                                    <TableCell
                                      rowSpan={
                                        activeData.corporateSnapshot.metrics
                                          .climate.length
                                      }
                                      className="align-middle"
                                    >
                                      Climate
                                    </TableCell>
                                  )}
                                  <TableCell>{metric.name}</TableCell>
                                  <TableCell>{metric.current || "—"}</TableCell>
                                  <TableCell>
                                    {metric.previous || "—"}
                                  </TableCell>
                                </TableRow>
                              )
                            )}

                            {/* Social Metrics */}
                            {activeData.corporateSnapshot.metrics.social.map(
                              (metric, index) => (
                                <TableRow key={`social-${index}`}>
                                  {index === 0 && (
                                    <TableCell
                                      rowSpan={
                                        activeData.corporateSnapshot.metrics
                                          .social.length
                                      }
                                      className="align-middle"
                                    >
                                      Social
                                    </TableCell>
                                  )}
                                  <TableCell>{metric.name}</TableCell>
                                  <TableCell>{metric.current || "—"}</TableCell>
                                  <TableCell>
                                    {metric.previous || "—"}
                                  </TableCell>
                                </TableRow>
                              )
                            )}

                            {/* Governance Metrics */}
                            {activeData.corporateSnapshot.metrics.governance.map(
                              (metric, index) => (
                                <TableRow key={`governance-${index}`}>
                                  {index === 0 && (
                                    <TableCell
                                      rowSpan={
                                        activeData.corporateSnapshot.metrics
                                          .governance.length
                                      }
                                      className="align-middle"
                                    >
                                      Governance
                                    </TableCell>
                                  )}
                                  <TableCell>{metric.name}</TableCell>
                                  <TableCell>{metric.current || "—"}</TableCell>
                                  <TableCell>
                                    {metric.previous || "—"}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {selectedTemplate === "visualImpact" && (
                    <div className="space-y-6">
                      {/* Page 1 Preview */}
                      <div className="border-b pb-6 mb-6">
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 1: Quadrant Summary
                        </h2>

                        <div className="text-center mb-6">
                          <h3 className="text-lg font-semibold text-teal-700">
                            {activeData.visualImpact.companyName ||
                              "Your Company Name"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Visual Impact Report 2023
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="border rounded-md p-4 bg-blue-50">
                            <h4 className="font-semibold text-blue-700 mb-2">
                              Climate
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-blue-200 rounded-full mr-2 flex-shrink-0 text-center text-blue-800 text-xs">
                                  🌱
                                </span>
                                <span>
                                  Net Emissions:{" "}
                                  {activeData.visualImpact.climateStats
                                    .emissions || "—"}
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-blue-200 rounded-full mr-2 flex-shrink-0 text-center text-blue-800 text-xs">
                                  ♻️
                                </span>
                                <span>
                                  Renewable Energy:{" "}
                                  {activeData.visualImpact.climateStats
                                    .renewableEnergy || "—"}
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="border rounded-md p-4 bg-green-50">
                            <h4 className="font-semibold text-green-700 mb-2">
                              People
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-green-200 rounded-full mr-2 flex-shrink-0 text-center text-green-800 text-xs">
                                  👩‍💼
                                </span>
                                <span>
                                  Women in Workforce:{" "}
                                  {activeData.visualImpact.peopleStats
                                    .womenWorkforce || "—"}
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-green-200 rounded-full mr-2 flex-shrink-0 text-center text-green-800 text-xs">
                                  🧑🏽‍💻
                                </span>
                                <span>
                                  Training Hours:{" "}
                                  {activeData.visualImpact.peopleStats
                                    .trainingHours || "—"}
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="border rounded-md p-4 bg-amber-50">
                            <h4 className="font-semibold text-amber-700 mb-2">
                              Governance
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-amber-200 rounded-full mr-2 flex-shrink-0 text-center text-amber-800 text-xs">
                                  ✅
                                </span>
                                <span>
                                  ESG Policy Adopted:{" "}
                                  {activeData.visualImpact.governanceStats
                                    .policyAdopted || "—"}
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="inline-block w-5 h-5 bg-amber-200 rounded-full mr-2 flex-shrink-0 text-center text-amber-800 text-xs">
                                  💼
                                </span>
                                <span>
                                  ESG-linked Bonus:{" "}
                                  {activeData.visualImpact.governanceStats
                                    .esgBonus || "—"}
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="border rounded-md p-4 bg-purple-50">
                            <h4 className="font-semibold text-purple-700 mb-2">
                              Future Targets
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li>
                                {activeData.visualImpact.futureTargets
                                  .target1 || "Target 1"}
                              </li>
                              <li>
                                {activeData.visualImpact.futureTargets
                                  .target2 || "Target 2"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Page 2 Preview */}
                      <div>
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 2: Story Section
                        </h2>

                        <div className="mb-6">
                          <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center mb-4">
                            {activeData.visualImpact?.images?.banner ? (
                              <img
                                src={URL.createObjectURL(
                                  activeData.visualImpact.images.banner
                                )}
                                alt="Banner"
                                className="w-full h-40 object-cover rounded mb-4"
                              />
                            ) : (
                              <p className="text-sm text-gray-500">
                                Your banner image will appear here
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Our Journey to Sustainability
                          </h4>
                          <p className="text-gray-700">
                            {activeData.visualImpact.journeyText ||
                              "Your sustainability journey narrative will appear here. This should describe your progress, milestones, and key achievements."}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">Looking Ahead</h4>
                          <div className="border-l-2 border-teal-500 pl-4 space-y-2">
                            {activeData.visualImpact.lookingAheadItems.map(
                              (item, index) => (
                                <div key={index} className="text-gray-700">
                                  {item || `Future milestone ${index + 1}`}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Our Commitments
                          </h4>
                          <p className="text-gray-700">
                            {activeData.visualImpact.commitments ||
                              "Your commitments statement will appear here."}
                          </p>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {activeData.visualImpact.selectedSdgs.length >
                              0 ? (
                                activeData.visualImpact.selectedSdgs.map(
                                  (id) => {
                                    const sdg = SDGIcons.find(
                                      (s) => s.id === id
                                    );
                                    return (
                                      <div
                                        key={id}
                                        className={`w-8 h-8 ${sdg?.color} text-white rounded flex items-center justify-center text-xs`}
                                      >
                                        {id}
                                      </div>
                                    );
                                  }
                                )
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No SDGs selected
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-gray-200 rounded flex items-center justify-center">
                            {activeData.visualImpact?.images?.small1 ? (
                              // <p className="text-xs text-gray-500">
                              //   Small Image 1 Uploaded
                              // </p>
                              <img
                                src={URL.createObjectURL(
                                  activeData.visualImpact.images.small1
                                )}
                                alt="Small 1"
                                className="w-32 h-20 object-cover rounded mr-2 inline-block"
                              />
                            ) : (
                              <p className="text-xs text-gray-500">
                                Small Image 1
                              </p>
                            )}
                          </div>
                          <div className="h-24 bg-gray-200 rounded flex items-center justify-center">
                            {activeData.visualImpact?.images?.small2 ? (
                              <img
                                src={URL.createObjectURL(
                                  activeData.visualImpact.images.small2
                                )}
                                alt="Small 2"
                                className="w-32 h-20 object-cover rounded inline-block"
                              />
                            ) : (
                              <p className="text-xs text-gray-500">
                                Small Image 2
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTemplate === "esgStrategy" && (
                    <div className="space-y-6">
                      {/* Page 1 Preview */}
                      <div className="border-b pb-6 mb-6">
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 1: Strategy & Governance
                        </h2>

                        <div className="text-center mb-6">
                          <h3 className="text-lg font-semibold text-teal-700">
                            {activeData.esgStrategy.companyName ||
                              "Your Company Name"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ESG Strategy & Targets Brief 2023
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Sustainability Strategy
                          </h4>
                          <p className="text-gray-700">
                            {activeData.esgStrategy.sustainabilityStrategy ||
                              "Your sustainability strategy description will appear here. This should outline your approach to ESG, key focus areas, and strategic priorities."}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Governance Model
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Role</TableHead>
                                  <TableHead>Responsibility</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {activeData.esgStrategy.governanceRoles.map(
                                  (role, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        {role.role}
                                      </TableCell>
                                      <TableCell>
                                        {role.responsibility || "—"}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Risks & Opportunities Summary
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Category</TableHead>
                                  <TableHead>Risk</TableHead>
                                  <TableHead>Opportunity</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {activeData.esgStrategy.risksOpportunities.map(
                                  (item, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        {item.category}
                                      </TableCell>
                                      <TableCell>{item.risk || "—"}</TableCell>
                                      <TableCell>
                                        {item.opportunity || "—"}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>

                      {/* Page 2 Preview */}
                      <div>
                        <h2 className="text-center text-xl font-bold mb-6">
                          Page 2: Targets & Metrics
                        </h2>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            Climate Targets Timeline
                          </h4>
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-end h-32 border-b border-gray-300 relative">
                              {activeData.esgStrategy.climateTargets.map(
                                (target, index) => {
                                  const height = 20 + index * 20; // Just for visualization
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col items-center"
                                    >
                                      <div
                                        className="w-12 bg-teal-600 rounded-t"
                                        style={{ height: `${height}px` }}
                                      ></div>
                                      <div className="text-xs mt-2 text-center w-16 break-words">
                                        <div className="font-semibold">
                                          {target.year}
                                        </div>
                                        <div>{target.target || "—"}</div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">
                            KPIs & Metrics Table
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Category</TableHead>
                                  <TableHead>Metric</TableHead>
                                  <TableHead>Value</TableHead>
                                  <TableHead>Target</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {activeData.esgStrategy.kpiMetrics.map(
                                  (item, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        {item.category}
                                      </TableCell>
                                      <TableCell>
                                        {item.metric || "—"}
                                      </TableCell>
                                      <TableCell>{item.value || "—"}</TableCell>
                                      <TableCell>
                                        {item.target || "—"}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Material Topics Matrix
                          </h4>
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {activeData.esgStrategy.materialTopics.map(
                                (topic, index) =>
                                  topic ? (
                                    <div
                                      key={index}
                                      className="border rounded p-2 text-sm bg-white shadow-sm"
                                    >
                                      {topic}
                                    </div>
                                  ) : (
                                    <div
                                      key={index}
                                      className="border border-dashed rounded p-2 text-sm text-gray-400"
                                    >
                                      Material topic {index + 1}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* )} */}
              </div>
              {!showPreview && (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">
                      Click "Show Preview" to see a live preview of your
                      sustainability statement
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(true)}
                    >
                      Show Preview
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
