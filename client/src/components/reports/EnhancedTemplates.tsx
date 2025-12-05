import React from 'react';
import CertificationBadges from '../../assets/images/icons/CertificationBadges';
import {
  EmissionsPieChart,
  EnergyConsumptionBarChart,
  EmissionsLineChart,
  SustainabilityRadarChart,
  SustainabilityRoadmap
} from '../../assets/images/charts';
import {
  genericCover,
  griCover,
  ghgCover,
  sasbCover,
  tcfdCover
} from '../../assets/images/covers';

// We'll use these components in the enhanced templates to show charts and visuals
// New TCFD-specific visualization components
const ExecutiveSummaryChart = () => (
  <div className="p-4 bg-muted/10 rounded-md">
    <h4 className="text-sm font-medium mb-3">Key Metrics Overview</h4>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-card rounded-md p-3 text-center border">
        <div className="text-xs text-muted-foreground mb-1">Scope 1+2</div>
        <div className="text-2xl font-bold text-primary">-15%</div>
        <div className="text-xs">YoY reduction</div>
      </div>
      <div className="bg-card rounded-md p-3 text-center border">
        <div className="text-xs text-muted-foreground mb-1">Renewable Energy</div>
        <div className="text-2xl font-bold text-emerald-500">45%</div>
        <div className="text-xs">of total energy</div>
      </div>
      <div className="bg-card rounded-md p-3 text-center border">
        <div className="text-xs text-muted-foreground mb-1">Climate Spend</div>
        <div className="text-2xl font-bold text-amber-500">$5.2M</div>
        <div className="text-xs">in investments</div>
      </div>
    </div>
    <div className="h-[180px] mt-4 flex items-center justify-center bg-muted/20 rounded border">
      <div className="text-center p-4">
        <div className="text-sm font-medium mb-1">Emissions Reduction Progress</div>
        <div className="text-xs text-muted-foreground">Progress bars showing reduction vs targets</div>
      </div>
    </div>
  </div>
);

const GovernanceStructureChart = () => (
  <div className="p-4 bg-muted/10 rounded-md">
    <h4 className="text-sm font-medium mb-3">Climate Governance Structure</h4>
    <div className="h-[220px] flex flex-col items-center justify-center border rounded-md bg-muted/5 p-4">
      <div className="border rounded-md px-4 py-2 mb-3 bg-card text-center w-3/4">
        <div className="font-medium">Board of Directors</div>
        <div className="text-xs text-muted-foreground">Sustainability Committee</div>
      </div>
      <div className="border-l-2 h-4"></div>
      <div className="border rounded-md px-4 py-2 mb-3 bg-card text-center w-3/4">
        <div className="font-medium">Executive Leadership Team</div>
        <div className="text-xs text-muted-foreground">Chief Sustainability Officer</div>
      </div>
      <div className="border-l-2 h-4"></div>
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="border rounded-md px-2 py-1 bg-card text-center text-xs">
          <div className="font-medium">Climate Risk Team</div>
        </div>
        <div className="border rounded-md px-2 py-1 bg-card text-center text-xs">
          <div className="font-medium">ESG Operations</div>
        </div>
        <div className="border rounded-md px-2 py-1 bg-card text-center text-xs">
          <div className="font-medium">Sustainability Working Group</div>
        </div>
      </div>
    </div>
  </div>
);

const StrategyRiskHeatmap = () => (
  <div className="p-4 bg-muted/10 rounded-md">
    <h4 className="text-sm font-medium mb-3">Climate Risk Heatmap</h4>
    <div className="h-[220px] flex items-center justify-center border rounded-md bg-muted/5 p-4">
      <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex items-center justify-center font-medium text-xs">Likelihood</div>
        <div className="col-start-5 col-end-6 row-start-5 row-end-6 flex items-center justify-center font-medium text-xs">Impact</div>
        
        {/* Heatmap cells */}
        <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-green-100 border rounded-sm"></div>
        <div className="col-start-3 col-end-4 row-start-2 row-end-3 bg-green-200 border rounded-sm flex items-center justify-center text-xs">Water stress</div>
        <div className="col-start-4 col-end-5 row-start-2 row-end-3 bg-yellow-100 border rounded-sm"></div>
        <div className="col-start-5 col-end-6 row-start-2 row-end-3 bg-amber-200 border rounded-sm"></div>
        
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-green-200 border rounded-sm"></div>
        <div className="col-start-3 col-end-4 row-start-3 row-end-4 bg-yellow-100 border rounded-sm flex items-center justify-center text-xs">Supply chain</div>
        <div className="col-start-4 col-end-5 row-start-3 row-end-4 bg-amber-200 border rounded-sm flex items-center justify-center text-xs">Carbon pricing</div>
        <div className="col-start-5 col-end-6 row-start-3 row-end-4 bg-amber-300 border rounded-sm"></div>
        
        <div className="col-start-2 col-end-3 row-start-4 row-end-5 bg-yellow-100 border rounded-sm"></div>
        <div className="col-start-3 col-end-4 row-start-4 row-end-5 bg-amber-200 border rounded-sm"></div>
        <div className="col-start-4 col-end-5 row-start-4 row-end-5 bg-amber-300 border rounded-sm"></div>
        <div className="col-start-5 col-end-6 row-start-4 row-end-5 bg-red-300 border rounded-sm flex items-center justify-center text-xs">Extreme weather</div>
        
        <div className="col-start-2 col-end-3 row-start-5 row-end-6 bg-amber-200 border rounded-sm"></div>
        <div className="col-start-3 col-end-4 row-start-5 row-end-6 bg-amber-300 border rounded-sm flex items-center justify-center text-xs">Technology shift</div>
        <div className="col-start-4 col-end-5 row-start-5 row-end-6 bg-red-300 border rounded-sm"></div>
        <div className="col-start-5 col-end-6 row-start-5 row-end-6 bg-red-500 border rounded-sm flex items-center justify-center text-xs text-white">Market changes</div>
      </div>
    </div>
  </div>
);

const RiskMatrixChart = () => (
  <div className="p-4 bg-muted/10 rounded-md">
    <h4 className="text-sm font-medium mb-3">Risk Assessment Matrix</h4>
    <div className="h-[200px] flex flex-col border rounded-md bg-muted/5 p-4">
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="border rounded-md px-2 py-2 bg-card">
          <div className="font-medium text-xs mb-1">Risk Identification</div>
          <div className="text-xs text-muted-foreground">
            • Climate science reports
            <br />• Industry benchmarks
            <br />• Stakeholder input
            <br />• Site assessments
          </div>
        </div>
        <div className="border rounded-md px-2 py-2 bg-card">
          <div className="font-medium text-xs mb-1">Risk Assessment</div>
          <div className="text-xs text-muted-foreground">
            • Probability × Impact
            <br />• Financial materiality
            <br />• Time horizon analysis
            <br />• Scenario planning
          </div>
        </div>
        <div className="border rounded-md px-2 py-2 bg-card">
          <div className="font-medium text-xs mb-1">Risk Management</div>
          <div className="text-xs text-muted-foreground">
            • Mitigation strategies
            <br />• Adaptation planning
            <br />• Business continuity
            <br />• Capital allocation
          </div>
        </div>
      </div>
      <div className="flex-1 border rounded-md px-3 py-2 bg-card">
        <div className="font-medium text-xs mb-1">Integration with Enterprise Risk Management (ERM)</div>
        <div className="text-xs text-muted-foreground">
          Climate risks are fully integrated into our ERM framework, with quarterly reporting to the Risk Committee and annual reviews by the Board. Climate-related risks are assessed using the same methodology as other business risks, ensuring consistency in approach and prioritization.
        </div>
      </div>
    </div>
  </div>
);

const EmissionsAndTargetsChart = () => (
  <div className="p-4 bg-muted/10 rounded-md">
    <h4 className="text-sm font-medium mb-3">GHG Emissions & Targets</h4>
    <div className="grid grid-cols-3 gap-3 mb-3">
      <div className="bg-card rounded-md p-3 border">
        <div className="text-xs text-muted-foreground mb-1">Scope 1</div>
        <div className="text-xl font-bold">25,400</div>
        <div className="text-xs">tonnes CO₂e</div>
        <div className="text-xs text-emerald-500">-8% vs 2022</div>
      </div>
      <div className="bg-card rounded-md p-3 border">
        <div className="text-xs text-muted-foreground mb-1">Scope 2</div>
        <div className="text-xl font-bold">38,600</div>
        <div className="text-xs">tonnes CO₂e</div>
        <div className="text-xs text-emerald-500">-12% vs 2022</div>
      </div>
      <div className="bg-card rounded-md p-3 border">
        <div className="text-xs text-muted-foreground mb-1">Scope 3</div>
        <div className="text-xl font-bold">142,800</div>
        <div className="text-xs">tonnes CO₂e</div>
        <div className="text-xs text-emerald-500">-5% vs 2022</div>
      </div>
    </div>
    
    <div className="h-[150px] flex items-center justify-center border rounded-md bg-muted/5 p-4 mb-3">
      <div className="text-center">
        <div className="text-sm font-medium">Emissions Trend (2020-2023)</div>
        <div className="text-xs text-muted-foreground">Bar chart showing emissions by scope and year</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-card rounded-md p-3 border">
        <div className="text-xs font-medium mb-1">2030 Target</div>
        <div className="text-xs text-muted-foreground">
          Reduce absolute Scope 1 & 2 emissions by 50% and Scope 3 by 30% from 2019 baseline
        </div>
      </div>
      <div className="bg-card rounded-md p-3 border">
        <div className="text-xs font-medium mb-1">2050 Target</div>
        <div className="text-xs text-muted-foreground">
          Net-zero emissions across entire value chain, aligned with Science Based Targets
        </div>
      </div>
    </div>
  </div>
);

// All template visual components
export const TemplateVisuals: Record<string, React.ComponentType> = {
  'CertificationBadges': CertificationBadges,
  'EmissionsPieChart': EmissionsPieChart,
  'EnergyConsumptionBarChart': EnergyConsumptionBarChart, 
  'EmissionsLineChart': EmissionsLineChart,
  'SustainabilityRadarChart': SustainabilityRadarChart,
  'SustainabilityRoadmap': SustainabilityRoadmap,
  // TCFD-specific visualizations
  'ExecutiveSummaryChart': ExecutiveSummaryChart,
  'GovernanceStructureChart': GovernanceStructureChart,
  'StrategyRiskHeatmap': StrategyRiskHeatmap,
  'RiskMatrixChart': RiskMatrixChart,
  'EmissionsAndTargetsChart': EmissionsAndTargetsChart
};

// Enhanced templates based on the provided list
export const ENHANCED_TEMPLATES = [
  {
    id: 'one-page-summary',
    title: 'One-Page Executive Summary',
    description: 'A concise single-page report providing key sustainability metrics and vision, ideal for quick stakeholder updates.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    coverImage: genericCover,
    color: '#ef4444', // red
    sections: [
      {
        title: 'Annual Sustainability Report',
        content: 'This one-page summary provides a snapshot of our sustainability performance and goals.',
        visual: 'EmissionsPieChart'
      },
      {
        title: 'Mission Statement',
        content: 'Our mission is to achieve sustainable operations and minimize our environmental impact while maximizing social responsibility. We are committed to transparent reporting and continuous improvement across all sustainability metrics.'
      },
      {
        title: 'Key Sustainability Highlights',
        subsections: [
          { 
            title: 'Carbon Emissions', 
            content: 'Total Scope 1, 2, and 3 emissions for the year, with comparison to targets.',
            visual: 'EmissionsPieChart'
          },
          { 
            title: 'Water Usage', 
            content: 'Total water consumed, with comparison to the previous year.'
          },
          { 
            title: 'Energy Efficiency', 
            content: 'Energy consumption by renewable and non-renewable sources.',
            visual: 'EnergyConsumptionBarChart'
          }
        ]
      },
      {
        title: 'Key Achievements',
        content: 'We have achieved several important sustainability milestones this year:',
        subsections: [
          { 
            title: 'Certifications',
            content: 'We have obtained ISO 14001 certification and verified carbon neutral status for our operations.',
            visual: 'CertificationBadges'
          }
        ]
      },
      {
        title: 'Sustainability Targets for Next Year',
        content: 'Our goals for the coming year include reducing emissions by 5%, increasing renewable energy use to 50%, and implementing a circular economy program across all operations.',
        visual: 'EmissionsLineChart'
      },
      {
        title: 'CEO Statement',
        content: 'We remain committed to building a sustainable future through responsible business practices and transparent reporting. Our journey toward net-zero emissions continues with renewed focus and dedication to environmental stewardship.'
      }
    ]
  },
  {
    id: 'two-page-executive-summary',
    title: 'Two-Page Executive Summary',
    description: 'An extended summary with detailed performance data and strategy overview, ideal for management review.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    coverImage: genericCover,
    color: '#ef4444', // red
    sections: [
      {
        title: 'Annual Sustainability Report',
        content: 'This two-page summary provides key information about our sustainability performance and strategic initiatives.',
        visual: 'EnergyConsumptionBarChart'
      },
      {
        title: 'Company Overview',
        content: 'Founded in 2005, our company operates in the technology sector with facilities across North America, Europe, and Asia. Our sustainability mission focuses on carbon reduction, renewable energy adoption, and social responsibility.',
        subsections: [
          { 
            title: 'Company Profile',
            content: 'Global technology provider with operations in 15 countries serving over 1,000 clients.'
          }
        ]
      },
      {
        title: 'Environmental Impact',
        subsections: [
          { 
            title: 'Carbon Emissions', 
            content: 'In 2023, we achieved a 15% reduction in overall emissions compared to 2022, with decreases across all scopes.',
            visual: 'EmissionsPieChart'
          },
          { 
            title: 'Energy Usage', 
            content: '45% of our energy now comes from renewable sources, up from 32% in the previous year.',
            visual: 'EnergyConsumptionBarChart'
          },
          { 
            title: 'Water Consumption', 
            content: 'Water use decreased by 8% through efficiency measures and recycling initiatives.'
          }
        ]
      },
      {
        title: 'Social Impact',
        subsections: [
          { 
            title: 'Employee Diversity', 
            content: 'Our workforce is 42% female with 38% representation from underrepresented groups.'
          },
          { 
            title: 'Community Engagement', 
            content: 'Employees contributed 10,000+ volunteer hours and we donated $2.5M to charitable initiatives.'
          }
        ]
      },
      {
        title: 'Sustainability Goals',
        content: 'Our roadmap for sustainability includes both short-term and long-term targets:',
        subsections: [
          { 
            title: 'Short-term Goals (2025)', 
            content: 'Reduce emissions by 25%, achieve 60% renewable energy, implement water recycling in all facilities.'
          },
          { 
            title: 'Long-term Goals (2030)', 
            content: 'Achieve carbon neutrality, 100% renewable energy, zero waste to landfill.',
            visual: 'SustainabilityRoadmap'
          }
        ]
      }
    ]
  },
  {
    id: 'full-sustainability-report',
    title: 'Full Sustainability Report',
    description: 'A comprehensive 6-7 page report with detailed sections on environmental, social, and governance performance.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    coverImage: genericCover,
    color: '#ef4444', // red
    sections: [
      {
        title: 'Sustainability Report 2023',
        content: 'A comprehensive overview of our sustainability journey, performance, and goals.',
        visual: 'SustainabilityRadarChart'
      },
      {
        title: 'CEO Message',
        content: 'As we navigate the challenges of a changing climate and evolving stakeholder expectations, our commitment to sustainability remains unwavering. Over the past year, we have accelerated our efforts to reduce our environmental footprint, enhance our social impact, and strengthen our governance practices. This report reflects our progress and our ambitions for the future.'
      },
      {
        title: 'Company Overview',
        content: 'Our company operates in 25 countries with over 5,000 employees, providing technology solutions to diverse industries. Our sustainability approach is integrated into our business strategy and operations, with oversight from a dedicated Sustainability Committee reporting to the Board of Directors.',
        subsections: [
          { 
            title: 'Business Areas', 
            content: 'Software solutions, hardware manufacturing, and consulting services.'
          },
          { 
            title: 'Key Markets', 
            content: 'Finance, healthcare, education, and government sectors.'
          }
        ]
      },
      {
        title: 'Sustainability Strategy',
        content: 'Our sustainability strategy is built on three pillars: environmental stewardship, social responsibility, and ethical governance. We align our goals with the UN Sustainable Development Goals and industry best practices.',
        visual: 'SustainabilityRoadmap'
      },
      {
        title: 'Environmental Performance',
        subsections: [
          { 
            title: 'Carbon Emissions', 
            content: 'Total emissions: 120,000 tCO2e, representing a 15% reduction from 2022. Our reduction targets are aligned with the Paris Agreement 1.5°C pathway.',
            visual: 'EmissionsPieChart'
          },
          { 
            title: 'Energy Use', 
            content: 'Total energy consumption: 250,000 MWh, with 45% from renewable sources. Our energy efficiency programs have reduced consumption by 8% year-over-year.',
            visual: 'EnergyConsumptionBarChart'
          },
          { 
            title: 'Water Management', 
            content: 'Total water withdrawal: 500,000 m³, with 30% recycled and reused. Water-saving initiatives have been implemented at all major facilities.'
          },
          { 
            title: 'Waste Reduction', 
            content: 'Total waste generated: 5,000 tonnes, with 70% diverted from landfill through recycling and composting programs.'
          }
        ]
      },
      {
        title: 'Social Responsibility',
        subsections: [
          { 
            title: 'Workforce Diversity', 
            content: 'Our workforce is 42% female, 38% from underrepresented groups, with 35% diversity in leadership positions.'
          },
          { 
            title: 'Health & Safety', 
            content: 'LTIR (Lost Time Injury Rate) of 0.5, representing a 20% improvement over 2022. Zero fatalities and serious injuries.'
          },
          { 
            title: 'Employee Development', 
            content: 'Average 40 hours of training per employee, with 85% participation in career development programs.'
          },
          { 
            title: 'Community Investment', 
            content: '$2.5M in charitable donations and 10,000+ employee volunteer hours contributed to communities where we operate.'
          }
        ]
      },
      {
        title: 'Sustainability Metrics & KPIs',
        content: 'Our performance against key sustainability metrics shows progress in most areas, with opportunities for improvement identified for future action.',
        visual: 'SustainabilityRadarChart'
      },
      {
        title: 'Compliance with Standards',
        content: 'Our reporting follows GRI Standards (Core option), SASB Technology & Communications Sector standards, and TCFD recommendations for climate-related disclosures.',
        subsections: [
          { 
            title: 'External Assurance', 
            content: 'Environmental data has been verified by a third-party assurance provider, ensuring accuracy and reliability.'
          },
          { 
            title: 'Certifications', 
            content: 'ISO 14001 (Environmental Management), ISO 45001 (Occupational Health & Safety), and ISO 50001 (Energy Management) certifications maintained at key facilities.',
            visual: 'CertificationBadges'
          }
        ]
      },
      {
        title: 'Future Outlook',
        content: 'Our sustainability journey continues with ambitious targets for carbon reduction, renewable energy adoption, diversity and inclusion, and community impact. We are committed to transparent reporting and continuous improvement in all areas of sustainability.',
        subsections: [
          { 
            title: '2030 Vision', 
            content: 'Carbon neutrality, 100% renewable energy, zero waste to landfill, and industry-leading diversity metrics across all levels of the organization.',
            visual: 'EmissionsLineChart'
          }
        ]
      }
    ]
  },
  {
    id: 'comprehensive-sustainability-report',
    title: 'Comprehensive Sustainability Report',
    description: 'An extensive 15-20 page report with in-depth analysis across all sustainability dimensions, suitable for large organizations.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    coverImage: genericCover,
    color: '#ef4444', // red
    sections: [
      {
        title: 'Table of Contents',
        content: 'A comprehensive guide to sections included in this report.'
      },
      {
        title: 'Message from the CEO',
        content: 'As we navigate unprecedented global challenges, sustainability has moved from a peripheral consideration to the core of our business strategy. Our commitment to sustainable development has never been stronger, as we recognize the vital importance of environmental stewardship, social responsibility, and ethical governance in creating long-term value for all stakeholders.'
      },
      {
        title: 'Company Overview & Business Model',
        content: 'With operations spanning 30 countries and over 10,000 employees worldwide, our company delivers innovative solutions across multiple sectors. Our sustainability approach is fully integrated into our business model, influencing everything from product design to supply chain management and operational practices.',
        visual: 'SustainabilityRadarChart'
      },
      {
        title: 'Materiality Matrix',
        content: 'Through extensive stakeholder engagement, we have identified and prioritized the sustainability topics most material to our business and stakeholders. This matrix guides our strategy, goal-setting, and reporting practices.'
      },
      {
        title: 'Sustainability Strategy & Governance',
        content: 'Our sustainability strategy is overseen by a dedicated Sustainability Committee of the Board, with executive accountability for implementation. We have established clear governance structures, policies, and management systems to drive progress toward our sustainability goals.',
        visual: 'SustainabilityRoadmap'
      },
      {
        title: 'Environmental Impact: Carbon Emissions',
        content: 'In 2023, our total carbon emissions (Scopes 1, 2, and 3) amounted to 350,000 tCO2e, a 12% reduction from 2022. Our science-based targets align with a 1.5°C pathway, with a commitment to net-zero emissions by 2040.',
        subsections: [
          { 
            title: 'Scope 1 Emissions', 
            content: '50,000 tCO2e from direct operations, down 10% from 2022.'
          },
          { 
            title: 'Scope 2 Emissions', 
            content: '100,000 tCO2e from purchased electricity, down 15% from 2022.'
          },
          { 
            title: 'Scope 3 Emissions', 
            content: '200,000 tCO2e from value chain activities, down 10% from 2022.'
          }
        ],
        visual: 'EmissionsPieChart'
      },
      {
        title: 'Environmental Impact: Energy Use',
        content: 'Total energy consumption of 500,000 MWh, with 55% from renewable sources (up from 40% in 2022). Energy efficiency measures have reduced energy intensity by 10% year-over-year.',
        visual: 'EnergyConsumptionBarChart'
      },
      {
        title: 'Environmental Impact: Water & Waste',
        content: 'Water withdrawal of 1,000,000 m³, with 40% recycled or reused. Total waste generation of 15,000 tonnes, with 75% diverted from landfill through recycling, reuse, and composting programs.',
        subsections: [
          { 
            title: 'Water Risk Management', 
            content: 'Assessment of facilities in water-stressed regions and implementation of water conservation measures.'
          },
          { 
            title: 'Circular Economy Initiatives', 
            content: 'Product design for recyclability, take-back programs, and partnerships for material recovery.'
          }
        ]
      },
      {
        title: 'Social Responsibility: Diversity & Inclusion',
        content: 'Our global workforce is 45% female, with 40% of leadership positions held by women and 38% by individuals from underrepresented groups. We have implemented targeted recruitment, development, and retention programs to enhance diversity at all levels.',
        subsections: [
          { 
            title: 'Gender Pay Equity', 
            content: 'Annual analysis shows 99% equity in pay across genders, with ongoing efforts to close remaining gaps.'
          },
          { 
            title: 'Inclusive Policies', 
            content: 'Enhanced parental leave, flexible working arrangements, and accessibility accommodations to support all employees.'
          }
        ]
      },
      {
        title: 'Social Responsibility: Employee Well-being',
        content: 'Comprehensive wellness programs, mental health support, and COVID-19 response measures have maintained employee engagement scores of 85% (industry benchmark: 78%).',
        subsections: [
          { 
            title: 'Health & Safety', 
            content: 'LTIR of 0.4, down 25% from 2022, with zero fatalities and serious injuries.'
          },
          { 
            title: 'Training & Development', 
            content: 'Average 50 hours of training per employee, with 90% participation in career development programs.'
          }
        ]
      },
      {
        title: 'Social Responsibility: Community Engagement',
        content: '$5M in charitable donations, 25,000+ employee volunteer hours, and strategic partnerships with NGOs to address community needs in education, healthcare, and environmental conservation.',
        subsections: [
          { 
            title: 'STEM Education', 
            content: 'Programs reaching 100,000+ students, with emphasis on underrepresented groups.'
          },
          { 
            title: 'Digital Inclusion', 
            content: 'Initiatives to bridge the digital divide through technology access and skills development.'
          }
        ]
      },
      {
        title: 'Sustainability Performance Metrics',
        content: 'Comprehensive performance data across environmental, social, and governance dimensions, with year-over-year comparisons and progress against targets.',
        visual: 'SustainabilityRadarChart'
      },
      {
        title: 'Risk & Opportunity Assessment',
        content: 'Systematic assessment of climate-related risks and opportunities, regulatory developments, and market trends affecting our sustainability performance and strategy.',
        subsections: [
          { 
            title: 'Physical Climate Risks', 
            content: 'Vulnerability assessment of facilities to extreme weather events and chronic climate impacts.'
          },
          { 
            title: 'Transition Risks', 
            content: 'Analysis of policy, legal, technology, market, and reputation risks associated with the transition to a low-carbon economy.'
          },
          { 
            title: 'Opportunities', 
            content: 'Identification of business opportunities in climate solutions, circular economy, and sustainable products and services.'
          }
        ]
      },
      {
        title: 'Compliance & Regulatory Alignment',
        content: 'Our reporting aligns with leading sustainability frameworks and standards, including GRI (Comprehensive option), SASB (sector-specific standards), TCFD recommendations, and emerging regulations like the EU Corporate Sustainability Reporting Directive (CSRD).',
        subsections: [
          { 
            title: 'External Assurance', 
            content: 'Independent assurance of environmental, social, and governance data by a third-party provider.'
          },
          { 
            title: 'Certifications', 
            content: 'Maintenance of ISO 14001, ISO 45001, ISO 50001, and other relevant certifications across global operations.',
            visual: 'CertificationBadges'
          }
        ]
      },
      {
        title: 'Future Goals & Strategic Plans',
        content: 'Our long-term sustainability vision includes:',
        subsections: [
          { 
            title: '2030 Goals', 
            content: '70% reduction in absolute emissions (Scopes 1, 2, and 3), 90% renewable energy, 50% reduction in water intensity, zero waste to landfill.'
          },
          { 
            title: '2040 Goals', 
            content: 'Net-zero emissions across all scopes, 100% renewable energy, water positivity, circular economy leadership.'
          },
          { 
            title: 'Implementation Strategy', 
            content: 'Detailed roadmap with interim targets, investment plans, and accountability mechanisms to achieve our long-term sustainability vision.',
            visual: 'EmissionsLineChart'
          }
        ]
      }
    ]
  },
  {
    id: 'hybrid-executive-summary-report',
    title: 'Hybrid Executive Summary + Full Report',
    description: 'A 6-7 page report that combines an executive summary with detailed sections on key sustainability initiatives.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    coverImage: genericCover,
    color: '#ef4444', // red
    sections: [
      {
        title: 'Annual Sustainability Report 2023',
        content: 'This report presents a concise yet comprehensive overview of our sustainability performance and ambitions.',
        visual: 'EmissionsPieChart'
      },
      {
        title: 'Executive Summary',
        content: 'In 2023, we made significant progress toward our sustainability goals, achieving a 15% reduction in carbon emissions, increasing renewable energy use to 45%, and enhancing our diversity metrics across all levels of the organization. We maintained our ISO certifications, expanded our community engagement programs, and aligned our climate strategy with the Paris Agreement 1.5°C pathway.',
        subsections: [
          { 
            title: 'Key Performance Indicators', 
            content: 'Carbon emissions: -15% year-over-year\nRenewable energy: 45% of total consumption\nWater usage: -8% year-over-year\nWaste diverted from landfill: 70%\nWorkforce diversity: 42% female, 38% underrepresented groups\nCommunity investment: $2.5M in donations, 10,000+ volunteer hours',
            visual: 'SustainabilityRadarChart'
          }
        ]
      },
      {
        title: 'Sustainability Metrics & Goals',
        content: 'Our performance against key metrics demonstrates progress toward our sustainability goals, with opportunities for improvement identified in specific areas.',
        subsections: [
          { 
            title: 'Environmental Metrics', 
            content: 'Total emissions (Scopes 1, 2, and 3): 120,000 tCO2e\nEnergy consumption: 250,000 MWh (45% renewable)\nWater usage: 500,000 m³ (30% recycled/reused)\nWaste generation: 5,000 tonnes (70% diverted from landfill)',
            visual: 'EmissionsPieChart'
          },
          { 
            title: 'Social Metrics', 
            content: 'Employee diversity: 42% female, 38% underrepresented groups\nLeadership diversity: 35% female, 30% underrepresented groups\nEmployee engagement score: 85% (industry benchmark: 78%)\nLost Time Injury Rate: 0.5 (20% improvement from 2022)',
          },
          { 
            title: 'Governance Metrics', 
            content: 'Board diversity: 40% female, 35% underrepresented groups\nESG criteria integrated into executive compensation\nSupplier code of conduct: 95% compliance rate\nWhistleblower program: 100% of reports investigated and resolved',
          }
        ]
      },
      {
        title: 'Environmental Impact',
        subsections: [
          { 
            title: 'Carbon Emissions Management', 
            content: 'Our emissions reduction strategy focuses on energy efficiency, renewable energy adoption, and supply chain engagement. In 2023, we achieved a 15% reduction in total emissions through a combination of operational improvements and strategic initiatives.',
            visual: 'EmissionsLineChart'
          },
          { 
            title: 'Energy Transition', 
            content: 'Renewable energy now accounts for 45% of our total energy consumption, up from 32% in 2022. We have installed on-site solar at five major facilities and signed power purchase agreements for wind and solar energy in key markets.',
            visual: 'EnergyConsumptionBarChart'
          },
          { 
            title: 'Water Conservation', 
            content: 'Water-saving technologies and process improvements have reduced our water intensity by 8%. Water recycling systems at three facilities have enabled the reuse of 30% of our total water withdrawal.',
          },
          { 
            title: 'Circular Economy', 
            content: 'Our zero-waste initiative has achieved a 70% diversion rate through comprehensive recycling, composting, and material recovery programs. Product design changes have increased recyclability by 25%.',
          }
        ]
      },
      {
        title: 'Social Responsibility',
        subsections: [
          { 
            title: 'Diversity & Inclusion', 
            content: 'Targeted recruitment, development, and retention programs have enhanced diversity across all levels of the organization. Employee resource groups and mentoring programs support an inclusive culture.',
          },
          { 
            title: 'Employee Development', 
            content: 'Investment in training and development averaged $1,500 per employee, with 40 hours of formal learning opportunities and expanded leadership development programs.',
          },
          { 
            title: 'Community Impact', 
            content: 'Strategic community investments focus on education, digital inclusion, and environmental conservation. Employee volunteer programs engage 75% of our workforce in giving back to communities where we operate.',
          }
        ]
      },
      {
        title: 'Future Outlook',
        content: 'Our sustainability roadmap outlines ambitious targets for the coming decade, with a clear pathway to net-zero emissions, 100% renewable energy, water positivity, and industry-leading diversity metrics.',
        subsections: [
          { 
            title: '2025 Targets', 
            content: '25% reduction in emissions\n60% renewable energy\n20% reduction in water intensity\n80% waste diversion rate\n45% women in leadership positions',
          },
          { 
            title: '2030 Vision', 
            content: '70% reduction in emissions\n90% renewable energy\n50% reduction in water intensity\nZero waste to landfill\n50% women in leadership positions',
            visual: 'SustainabilityRoadmap'
          }
        ]
      },
      {
        title: 'Certifications & Standards',
        content: 'Our sustainability practices and reporting align with leading international standards and frameworks:',
        subsections: [
          { 
            title: 'Environmental Management', 
            content: 'ISO 14001 certification maintained at all major facilities',
            visual: 'CertificationBadges'
          },
          { 
            title: 'Reporting Frameworks', 
            content: 'Alignment with GRI Standards, SASB Technology & Communications Sector standards, and TCFD recommendations',
          },
          { 
            title: 'External Assurance', 
            content: 'Independent verification of environmental data and selected social metrics',
          }
        ]
      }
    ]
  }  
];