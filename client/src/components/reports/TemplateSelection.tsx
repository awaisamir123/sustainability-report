import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ReportTemplateCard } from './ReportTemplateCard';
import { getCoverByType, genericCover, griCover, ghgCover, sasbCover, tcfdCover } from '@/assets/images/covers';

// Define template data structure
export interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  framework: string;
  frameworkCategory: string;
  coverImage?: string;
  color?: string;
  sections: ReportSection[];
}

export interface ReportSection {
  title: string;
  content?: string;
  subsections?: ReportSubsection[];
  visual?: string;  // Name of the visual component to display
}

export interface ReportSubsection {
  title: string;
  content?: string;
  visual?: string;  // Name of the visual component to display
}

// Template frameworks
const FRAMEWORKS = [
  { value: 'all', label: 'All Frameworks' },
  { value: 'gri', label: 'GRI Standards' },
  { value: 'ghg', label: 'GHG Protocol' },
  { value: 'sasb', label: 'SASB Standards' },
  { value: 'tcfd', label: 'TCFD Recommendations' },
  { value: 'iso', label: 'ISO 14067' },
  { value: 'generic', label: 'Generic Format' },
];

// Sample templates based on the references
import { ENHANCED_TEMPLATES } from './EnhancedTemplates';

// Combine enhanced templates with existing templates
export const REPORT_TEMPLATES: ReportTemplate[] = [
  ...ENHANCED_TEMPLATES,
  {
    id: 'ifrs-sasb-template',
    title: 'IFRS S1 & S2 + SASB Report',
    description: 'Sustainability report template aligned with IFRS Sustainability Disclosure Standards (S1 & S2) and SASB industry-specific metrics.',
    framework: 'IFRS & SASB',
    frameworkCategory: 'sasb',
    coverImage: sasbCover,
    color: '#f59e0b', // amber
    sections: [
      {
        title: 'Executive Summary',
        content: 'Provide an overview of your organization\'s sustainability performance and its alignment with IFRS S1 (General Requirements) and S2 (Climate-related Disclosures).'
      },
      {
        title: 'Governance',
        content: 'Describe the governance bodies or individuals responsible for oversight of sustainability-related risks and opportunities.',
        subsections: [
          { title: 'Board Oversight', content: 'How the board oversees sustainability-related and climate-related risks and opportunities.' },
          { title: 'Management\'s Role', content: 'Management\'s role in assessing and managing sustainability-related and climate-related risks and opportunities.' },
          { title: 'Climate-related Incentives', content: 'How performance metrics and incentives are tied to climate-related goals.' }
        ]
      },
      {
        title: 'Strategy',
        content: 'Describe how sustainability-related risks and opportunities are integrated into the organization\'s strategy and decision-making processes.',
        subsections: [
          { title: 'Material Sustainability Topics', content: 'Identification of material sustainability topics for your industry sector.' },
          { title: 'Climate Resilience', content: 'How your business strategy is resilient to climate-related risks and responsive to opportunities.' },
          { title: 'Scenario Analysis', content: 'Analysis of business resilience under different climate scenarios (1.5°C and 2°C).' }
        ]
      },
      {
        title: 'Risk Management',
        content: 'Describe the processes used to identify, assess, prioritize, and monitor sustainability-related and climate-related risks.',
        subsections: [
          { title: 'Risk Identification Process', content: 'How sustainability and climate risks are identified and assessed.' },
          { title: 'Risk Mitigation Strategies', content: 'Approaches to mitigating identified sustainability and climate risks.' },
          { title: 'Integration with Overall Risk Management', content: 'How sustainability risk management is integrated into the organization\'s overall risk management.' }
        ]
      },
      {
        title: 'Metrics & Targets',
        content: 'Report on metrics and targets used to assess and manage relevant sustainability-related and climate-related risks and opportunities.',
        subsections: [
          { title: 'GHG Emissions', content: 'Scope 1, 2, and 3 greenhouse gas emissions in accordance with the GHG Protocol.' },
          { title: 'Energy Usage', content: 'Energy consumption, energy intensity, and percentage of renewable energy.' },
          { title: 'Emission Reduction Targets', content: 'Short, medium, and long-term GHG emission reduction targets and progress against them.' },
          { title: 'Transition Plan', content: 'Plans to transition to a low-carbon economy, including capital allocation plans.' }
        ]
      },
      {
        title: 'SASB Industry-Specific Metrics',
        content: 'Report on the industry-specific metrics as defined by the SASB Standards for your sector.',
        subsections: [
          { title: 'Sector-Specific Material Topics', content: 'The material sustainability topics specific to your industry sector as defined by SASB.' },
          { title: 'Quantitative Metrics', content: 'The quantitative metrics for each material topic, as defined by SASB Standards.' },
          { title: 'Discussion and Analysis', content: 'Qualitative discussion and analysis for each material topic.' }
        ]
      }
    ]
  },
  {
    id: 'gri-universal-2021',
    title: 'GRI Universal Standards 2021',
    description: 'Updated sustainability report template following the GRI Universal Standards 2021, with structured sections for all required disclosures.',
    framework: 'GRI Standards 2021',
    frameworkCategory: 'gri',
    coverImage: griCover,
    color: '#3b82f6', // blue
    sections: [
      {
        title: 'Statement of Use',
        content: 'Include your statement of use here. For example: "[Organization name] has reported in accordance with the GRI Standards for the period [reporting period]."'
      },
      {
        title: 'Executive Summary',
        content: 'Provide an overview of your organization\'s sustainability performance, key achievements, challenges, and future commitments.'
      },
      {
        title: 'GRI 2: General Disclosures',
        content: 'The information required under GRI 2 provides an overview of your organization\'s sustainability reporting practices, activities, governance, and strategy.',
        subsections: [
          { 
            title: 'GRI 2-1 to 2-5: Organization & Reporting Practices', 
            content: 'GRI 2-1: Organizational details (legal name, ownership, location of headquarters)\nGRI 2-2: Entities included in sustainability reporting\nGRI 2-3: Reporting period, frequency and contact point\nGRI 2-4: Restatements of information\nGRI 2-5: External assurance'
          },
          { 
            title: 'GRI 2-6 to 2-8: Activities & Workers', 
            content: 'GRI 2-6: Activities, value chain and other business relationships\nGRI 2-7: Employees (total number, gender breakdown, region, etc.)\nGRI 2-8: Workers who are not employees'
          },
          { 
            title: 'GRI 2-9 to 2-21: Governance', 
            content: 'GRI 2-9: Governance structure and composition\nGRI 2-10: Nomination and selection of the highest governance body\nGRI 2-11: Chair of the highest governance body\nGRI 2-12: Role in overseeing the management of impacts\nGRI 2-13: Delegation of responsibility for managing impacts\nGRI 2-14: Role in sustainability reporting\nGRI 2-15: Conflicts of interest\nGRI 2-16: Communication of critical concerns\nGRI 2-17: Collective knowledge of the highest governance body\nGRI 2-18: Evaluation of the performance of the highest governance body\nGRI 2-19: Remuneration policies\nGRI 2-20: Process to determine remuneration\nGRI 2-21: Annual total compensation ratio'
          },
          { 
            title: 'GRI 2-22 to 2-28: Strategy, Policies & Practices', 
            content: 'GRI 2-22: Statement on sustainable development strategy\nGRI 2-23: Policy commitments\nGRI 2-24: Embedding policy commitments\nGRI 2-25: Processes to remediate negative impacts\nGRI 2-26: Mechanisms for seeking advice and raising concerns\nGRI 2-27: Compliance with laws and regulations\nGRI 2-28: Membership associations'
          },
          { 
            title: 'GRI 2-29 to 2-30: Stakeholder Engagement', 
            content: 'GRI 2-29: Approach to stakeholder engagement\nGRI 2-30: Collective bargaining agreements'
          }
        ]
      },
      {
        title: 'GRI 3: Material Topics',
        content: 'This section outlines the reporting organization\'s material topics and how they are managed.',
        subsections: [
          { 
            title: 'GRI 3-1: Process to Determine Material Topics', 
            content: 'Describe the process followed to determine the material topics. Include details about how stakeholders were involved, how impacts were assessed, and how topics were prioritized.' 
          },
          { 
            title: 'GRI 3-2: List of Material Topics', 
            content: 'List all material topics identified for your organization. For each topic, provide a description and identify any changes compared to the previous reporting period.' 
          },
          { 
            title: 'GRI 3-3: Management of Material Topics', 
            content: 'For each material topic identified, describe:\na) Actual and potential impacts on the economy, environment, and people\nb) Whether the organization is involved with the impacts through its activities or business relationships\nc) Policies and commitments related to the topic\nd) Actions taken to manage the topic and related impacts\ne) Tracking the effectiveness of actions\nf) How engagement with stakeholders has informed actions taken\ng) Any targets set for the topic' 
          }
        ]
      },
      {
        title: 'Topic-Specific Disclosures',
        content: 'For each material topic identified, report the topic-specific disclosures from the applicable GRI Sector or Topic Standards.',
        subsections: [
          { 
            title: 'Economic Topics (200 series)', 
            content: 'Include relevant disclosures for material economic topics such as Economic Performance (GRI 201), Market Presence (GRI 202), Indirect Economic Impacts (GRI 203), Procurement Practices (GRI 204), Anti-corruption (GRI 205), and Anti-competitive Behavior (GRI 206).'
          },
          { 
            title: 'Environmental Topics (300 series)', 
            content: 'Include relevant disclosures for material environmental topics such as Materials (GRI 301), Energy (GRI 302), Water and Effluents (GRI 303), Biodiversity (GRI 304), Emissions (GRI 305), Waste (GRI 306), and Environmental Compliance (GRI 307).'
          },
          { 
            title: 'Social Topics (400 series)', 
            content: 'Include relevant disclosures for material social topics such as Employment (GRI 401), Labor/Management Relations (GRI 402), Occupational Health and Safety (GRI 403), Training and Education (GRI 404), Diversity and Equal Opportunity (GRI 405), Non-discrimination (GRI 406), and others.'
          }
        ]
      },
      {
        title: 'GRI Content Index',
        content: 'Provide a table that lists all GRI Standards used and disclosures included in the report, with page numbers or links to the information. For any required disclosure that has been omitted, include the reason for omission as permitted by GRI 1.'
      },
      {
        title: 'External Assurance Statement',
        content: 'If external assurance was obtained for any part of the report, include the external assurance statement here.'
      }
    ]
  },
  {
    id: 'gri-comprehensive',
    title: 'GRI Comprehensive Report (Legacy)',
    description: 'A complete sustainability report covering all GRI standards including environmental, social, and governance metrics.',
    framework: 'GRI Standards',
    frameworkCategory: 'gri',
    coverImage: griCover,
    color: '#3b82f6', // blue
    sections: [
      {
        title: 'Executive Summary',
        content: 'Provide an overview of your organization\'s sustainability performance, highlighting key achievements, challenges, and future goals.'
      },
      {
        title: 'Organizational Profile',
        content: 'Describe your organization, including size, primary activities, markets served, and operational structure.',
        subsections: [
          { title: 'Organizational Structure', content: 'Detail the structure of the organization including governance bodies.' },
          { title: 'Supply Chain Description', content: 'Overview of the supply chain and significant changes during the reporting period.' }
        ]
      },
      {
        title: 'Governance',
        content: 'Outline the governance structure of the organization, including committees responsible for decision-making on economic, environmental, and social impacts.',
        subsections: [
          { title: 'Board Composition', content: 'Details about the board of directors and their roles in sustainability oversight.' },
          { title: 'Ethics and Integrity', content: 'Information about values, principles, standards, and norms of behavior.' }
        ]
      },
      {
        title: 'Stakeholder Engagement',
        content: 'Identify stakeholder groups engaged by the organization, and approaches to stakeholder engagement.'
      },
      {
        title: 'Material Topics',
        content: 'List the material topics identified in the process for defining report content.',
        subsections: [
          { title: 'Materiality Assessment Process', content: 'Explanation of how material topics were identified and prioritized.' },
          { title: 'Material Topics List', content: 'List of topics determined to be material to the organization.' }
        ]
      },
      {
        title: 'Environmental Performance',
        content: 'Disclose information about environmental impacts, including energy consumption, water usage, emissions, and waste management.',
        subsections: [
          { title: 'Energy Consumption', content: 'Total energy consumption and energy intensity ratios.' },
          { title: 'Water Usage', content: 'Total water withdrawal by source and water recycling/reuse initiatives.' },
          { title: 'Emissions', content: 'Direct and indirect greenhouse gas emissions (Scope 1, 2, and 3).' },
          { title: 'Waste Management', content: 'Total waste by type and disposal method.' },
          { title: 'Biodiversity Impact', content: 'Significant impacts on biodiversity and habitats protected or restored.' }
        ]
      },
      {
        title: 'Social Performance',
        content: 'Report on social impacts, including labor practices, human rights, diversity, and community engagement.',
        subsections: [
          { title: 'Employment', content: 'Information on new employee hires, turnover, benefits, and parental leave.' },
          { title: 'Occupational Health and Safety', content: 'Types and rates of injury, occupational diseases, and work-related fatalities.' },
          { title: 'Training and Education', content: 'Average hours of training per employee and programs for skills management.' },
          { title: 'Diversity and Equal Opportunity', content: 'Diversity of governance bodies and employees.' },
          { title: 'Human Rights Assessment', content: 'Operations that have been subject to human rights reviews or impact assessments.' },
          { title: 'Local Communities', content: 'Operations with local community engagement, impact assessments, and development programs.' }
        ]
      },
      {
        title: 'Economic Performance',
        content: 'Disclose information about economic value generated and distributed, financial implications of climate change, and procurement practices.'
      },
      {
        title: 'GRI Content Index',
        content: 'Provide a table that lists all GRI Standards used and disclosures included in the report.'
      }
    ]
  },
  {
    id: 'ghg-protocol-standard',
    title: 'GHG Protocol Corporate Standard',
    description: 'Comprehensive GHG emissions inventory report aligned with the Greenhouse Gas Protocol Corporate Standard, with standardized sections and calculation methodology.',
    framework: 'GHG Protocol',
    frameworkCategory: 'ghg',
    coverImage: ghgCover,
    color: '#22c55e', // green
    sections: [
      {
        title: 'Cover Page',
        content: 'Include your company logo, report title (GHG Emissions Inventory Report – [Year]), reporting period, company name, and contact information.',
        subsections: [
          { title: 'Report Title', content: 'GHG Emissions Inventory Report – [Year]' },
          { title: 'Reporting Period', content: 'e.g., January 1, 2023 – December 31, 2023' },
          { title: 'Prepared By', content: 'Your organization name and any relevant departments' },
          { title: 'Contact Information', content: 'Name, email, and phone number of the responsible person/team' }
        ]
      },
      {
        title: 'Executive Summary',
        content: 'Provide a brief introduction to your organization\'s sustainability commitment, the purpose of the GHG inventory, a summary of your Scope 1, 2, and 3 emissions, and any year-over-year comparisons or key highlights.',
        subsections: [
          { title: 'Sustainability Commitment', content: 'Brief statement on your organization\'s commitment to sustainability and emissions reduction' },
          { title: 'Purpose of GHG Inventory', content: 'Explanation of why this inventory was conducted and how it will be used' },
          { title: 'Emissions Summary', content: 'Total GHG emissions for the reporting period, broken down by scope' },
          { title: 'Key Performance Highlights', content: 'Notable achievements, trends, or challenges in the reporting period' }
        ]
      },
      {
        title: 'Organizational Boundaries',
        content: 'Define the reporting entity and its subsidiaries, and specify which approach was used to define organizational boundaries (operational control, financial control, or equity share).',
        subsections: [
          { title: 'Reporting Entity Description', content: 'Description of the organization and its operations' },
          { title: 'Boundary Approach Selection', content: 'Specify which approach was used: Operational Control, Financial Control, or Equity Share, with justification' },
          { title: 'Included Entities and Facilities', content: 'Comprehensive list of all entities, facilities, and operations included in the inventory' },
          { title: 'Organizational Structure', content: 'Optional visual (org chart) showing the relationship between included entities' }
        ]
      },
      {
        title: 'Operational Boundaries',
        content: 'Describe how emissions are categorized into Scope 1 (direct), Scope 2 (indirect), and Scope 3 (other indirect) based on operational boundaries.',
        subsections: [
          { title: 'Scope 1 Definition', content: 'Explanation of direct emissions sources included in the inventory (fuel combustion, company vehicles, etc.)' },
          { title: 'Scope 2 Definition', content: 'Explanation of indirect emissions from purchased electricity, heat, steam, etc.' },
          { title: 'Scope 3 Definition', content: 'Explanation of other indirect emissions sources included and their relevance to your operations' },
          { title: 'Exclusions and Rationale', content: 'Any emissions sources that were excluded and why' }
        ]
      },
      {
        title: 'Emissions Factors & Methodology',
        content: 'Provide a detailed explanation of the methodologies, emission factors, assumptions, and tools used to calculate your GHG emissions.',
        subsections: [
          { title: 'Standards and Guidance Used', content: 'References to GHG Protocol, ISO standards, or other guidance followed' },
          { title: 'GHGs Included', content: 'List of greenhouse gases covered (CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃)' },
          { title: 'Global Warming Potentials', content: 'Reference to IPCC Assessment Report used for GWP values (e.g., AR5)' },
          { title: 'Emission Factors Sources', content: 'Sources of emission factors used (e.g., DEFRA, EPA, IEA, etc.)' },
          { title: 'Calculation Tools', content: 'Description of any tools, databases, or software used for calculations' },
          { title: 'Assumptions and Limitations', content: 'Key assumptions made and any limitations in the methodology' }
        ]
      },
      {
        title: 'Base Year Definition',
        content: 'Establish your organization\'s base year for tracking emissions performance over time, and explain the rationale for its selection.',
        subsections: [
          { title: 'Base Year Selection', content: 'The year chosen as the base year and reasons for its selection' },
          { title: 'Base Year Emissions', content: 'Summary of emissions in the base year by scope' },
          { title: 'Base Year Recalculation Policy', content: 'Policy for when and how the base year will be recalculated' }
        ]
      },
      {
        title: 'Scope 1: Direct Emissions',
        content: 'Report direct GHG emissions from sources owned or controlled by the organization, including fuel combustion, company vehicles, process emissions, and fugitive emissions.',
        subsections: [
          { title: 'Stationary Combustion', content: 'Emissions from burning fuels in stationary equipment like boilers, furnaces, and generators.' },
          { title: 'Mobile Combustion', content: 'Emissions from transportation sources like vehicles owned or controlled by the company.' },
          { title: 'Process Emissions', content: 'Emissions from physical or chemical processes specific to your industry.' },
          { title: 'Fugitive Emissions', content: 'Intentional and unintentional releases from equipment leaks, refrigerant systems, etc.' },
          { title: 'Data Collection Methods', content: 'Description of how activity data was collected for each source type' },
          { title: 'Scope 1 Total Emissions', content: 'Summary table of all Scope 1 emissions by source category' }
        ]
      },
      {
        title: 'Scope 2: Indirect Emissions',
        content: 'Report indirect GHG emissions from the generation of purchased electricity, heating, cooling, and steam consumed by the organization.',
        subsections: [
          { title: 'Location-Based Reporting', content: 'Emissions calculated using grid average emission factors for the locations of operations.' },
          { title: 'Market-Based Reporting', content: 'Emissions calculated using supplier-specific emission factors, RECs, and other contractual instruments.' },
          { title: 'Purchased Electricity', content: 'Emissions from electricity purchased from utilities or other suppliers.' },
          { title: 'Purchased Heating and Cooling', content: 'Emissions from district heating, cooling, or steam purchased for operations.' },
          { title: 'Data Collection Methods', content: 'Description of how activity data was collected for electricity and other energy purchases' },
          { title: 'Scope 2 Total Emissions', content: 'Summary table of all Scope 2 emissions by source category and reporting approach' }
        ]
      },
      {
        title: 'Scope 3: Other Indirect Emissions',
        content: 'Report other indirect GHG emissions that occur as a consequence of the organization\'s activities but from sources not owned or controlled by the organization.',
        subsections: [
          { title: 'Category Selection Process', content: 'Explanation of how relevant Scope 3 categories were selected for inclusion' },
          { title: 'Purchased Goods and Services (Category 1)', content: 'Emissions from production of purchased goods and services.' },
          { title: 'Capital Goods (Category 2)', content: 'Emissions from production of capital goods purchased.' },
          { title: 'Fuel and Energy-Related Activities (Category 3)', content: 'Emissions related to production of fuels and energy not included in Scope 1 or 2.' },
          { title: 'Upstream Transportation and Distribution (Category 4)', content: 'Emissions from transportation and distribution of products purchased by the organization.' },
          { title: 'Waste Generated in Operations (Category 5)', content: 'Emissions from waste disposal and treatment.' },
          { title: 'Business Travel (Category 6)', content: 'Emissions from employee business travel.' },
          { title: 'Employee Commuting (Category 7)', content: 'Emissions from employee commuting to and from work.' },
          { title: 'Downstream Transportation and Distribution (Category 9)', content: 'Emissions from transportation and distribution of products sold by the organization.' },
          { title: 'Use of Sold Products (Category 11)', content: 'Emissions from the use of goods and services sold by the organization.' },
          { title: 'End-of-Life Treatment of Sold Products (Category 12)', content: 'Emissions from disposal and treatment of products sold by the organization.' },
          { title: 'Other Relevant Categories', content: 'Discussion of any other relevant Scope 3 categories.' },
          { title: 'Data Collection Methods', content: 'Description of how activity data was collected for each category' },
          { title: 'Scope 3 Total Emissions', content: 'Summary table of all Scope 3 emissions by category' }
        ]
      },
      {
        title: 'Data Summary Tables',
        content: 'Provide comprehensive tables summarizing GHG emissions by scope, source, and GHG type.',
        subsections: [
          { title: 'Total Emissions by Scope', content: 'Table showing total emissions for Scope 1, 2, and 3, with percentages.' },
          { title: 'Scope 1 Emissions by Source', content: 'Detailed breakdown of Scope 1 emissions by source category.' },
          { title: 'Scope 2 Emissions by Source', content: 'Detailed breakdown of Scope 2 emissions by source category.' },
          { title: 'Scope 3 Emissions by Category', content: 'Detailed breakdown of Scope 3 emissions by category.' },
          { title: 'Emissions by Greenhouse Gas', content: 'Breakdown of emissions by individual greenhouse gases (CO₂, CH₄, N₂O, etc.).' },
          { title: 'Emissions Intensity Metrics', content: 'Emissions normalized by relevant business metrics (e.g., per revenue, per production unit, per employee).' }
        ]
      },
      {
        title: 'Charts & Visualizations',
        content: 'Include visual representations of GHG emissions data to enhance understanding and communication.',
        subsections: [
          { title: 'Emissions Breakdown by Scope', content: 'Pie chart showing the distribution of emissions across Scopes 1, 2, and 3.' },
          { title: 'Emissions by Source Category', content: 'Bar chart showing emissions by source category within each scope.' },
          { title: 'Emissions Trends', content: 'Line chart showing emissions trends over multiple reporting periods, if available.' },
          { title: 'Scope 3 Categories Breakdown', content: 'Visualization of the distribution of emissions across Scope 3 categories.' },
          { title: 'Emissions Intensity Trend', content: 'Chart showing how emissions intensity metrics have changed over time.' }
        ]
      },
      {
        title: 'Emissions Reduction Initiatives',
        content: 'Describe the organization\'s emissions reduction targets, strategies, and specific initiatives to reduce GHG emissions.',
        subsections: [
          { title: 'Emissions Reduction Targets', content: 'Short-term and long-term targets for emissions reduction, including base year, target year, and reduction amount.' },
          { title: 'Emissions Reduction Strategies', content: 'Overview of the strategic approach to reducing emissions across the organization.' },
          { title: 'Completed Reduction Initiatives', content: 'Description of emissions reduction initiatives completed during the reporting period, with estimated impact.' },
          { title: 'Planned Reduction Initiatives', content: 'Description of planned emissions reduction initiatives, with estimated impact.' },
          { title: 'Carbon Offsets and RECs', content: 'Information about any carbon offsets purchased or renewable energy certificates (RECs) retired.' }
        ]
      },
      {
        title: 'Verification & Assurance',
        content: 'Provide information about any third-party verification or assurance of the GHG emissions inventory.',
        subsections: [
          { title: 'Verification Status', content: 'Whether the inventory has been verified by a third party and the level of assurance provided.' },
          { title: 'Verification Provider', content: 'Name and credentials of the verification provider.' },
          { title: 'Verification Standard', content: 'Standard used for verification (e.g., ISO 14064-3, AA1000AS).' },
          { title: 'Verification Scope', content: 'Which parts of the inventory were included in the verification (e.g., Scope 1 and 2 only, all scopes).' },
          { title: 'Verification Statement', content: 'Statement from the verification provider regarding the results of the verification.' }
        ]
      },
      {
        title: 'Glossary & Abbreviations',
        content: 'Provide definitions for technical terms and abbreviations used in the report to enhance understanding for readers.',
        subsections: [
          { title: 'GHG Terminology', content: 'Definitions for key greenhouse gas accounting terms.' },
          { title: 'Abbreviations List', content: 'List of abbreviations used in the report and their meanings.' }
        ]
      },
      {
        title: 'Appendices',
        content: 'Include additional detailed information to support the main report.',
        subsections: [
          { title: 'Detailed Methodology', content: 'Detailed explanation of calculation methodologies for each emissions source.' },
          { title: 'Emission Factors Used', content: 'Comprehensive list of emission factors used, with sources and values.' },
          { title: 'GWP Values Used', content: 'List of global warming potential values used for each greenhouse gas.' },
          { title: 'Activity Data Summary', content: 'Summary of activity data collected for each emissions source.' },
          { title: 'Scope 3 Screening Assessment', content: 'Details of the screening assessment used to determine relevant Scope 3 categories.' }
        ]
      }
    ]
  },
  {
    id: 'sasb-industry',
    title: 'SASB Industry-Specific Report',
    description: 'Industry-specific sustainability reporting using SASB standards for consistent, comparable, and reliable data.',
    framework: 'SASB Standards',
    frameworkCategory: 'sasb',
    coverImage: sasbCover,
    color: '#f59e0b', // amber
    sections: [
      {
        title: 'Introduction and Industry Context',
        content: 'Provide an overview of your organization within the context of your industry and the sustainability challenges and opportunities specific to this sector.'
      },
      {
        title: 'Materiality Assessment',
        content: 'Explain how sustainability topics were identified as material to your organization based on SASB\'s industry-specific standards.'
      },
      {
        title: 'Environmental Topics',
        content: 'Report on industry-specific environmental metrics as defined by SASB standards.',
        subsections: [
          { title: 'GHG Emissions', content: 'Industry-specific metrics related to greenhouse gas emissions.' },
          { title: 'Air Quality', content: 'Metrics related to air pollutants specific to your industry.' },
          { title: 'Energy Management', content: 'Industry-specific energy management metrics and approaches.' },
          { title: 'Water Management', content: 'Industry-specific water management metrics and strategies.' },
          { title: 'Waste Management', content: 'Industry-specific waste metrics and reduction initiatives.' },
          { title: 'Ecological Impacts', content: 'Metrics related to biodiversity and ecological impacts specific to your industry.' }
        ]
      },
      {
        title: 'Social Capital',
        content: 'Report on industry-specific social capital metrics as defined by SASB standards.',
        subsections: [
          { title: 'Human Rights & Community Relations', content: 'Industry-specific metrics related to human rights and community engagement.' },
          { title: 'Customer Privacy', content: 'Metrics related to data security and customer privacy specific to your industry.' },
          { title: 'Data Security', content: 'Industry-specific metrics related to data security practices.' },
          { title: 'Access & Affordability', content: 'Metrics related to the accessibility and affordability of products/services.' },
          { title: 'Product Quality & Safety', content: 'Industry-specific metrics related to product quality and safety.' },
          { title: 'Customer Welfare', content: 'Metrics related to customer welfare specific to your industry.' }
        ]
      },
      {
        title: 'Human Capital',
        content: 'Report on industry-specific human capital metrics as defined by SASB standards.',
        subsections: [
          { title: 'Labor Practices', content: 'Industry-specific metrics related to labor relations and practices.' },
          { title: 'Employee Health & Safety', content: 'Metrics related to workplace health and safety specific to your industry.' },
          { title: 'Employee Engagement & Diversity', content: 'Industry-specific metrics related to employee engagement and diversity.' }
        ]
      },
      {
        title: 'Business Model & Innovation',
        content: 'Report on industry-specific business model and innovation metrics as defined by SASB standards.',
        subsections: [
          { title: 'Product Design & Lifecycle Management', content: 'Industry-specific metrics related to sustainable product design.' },
          { title: 'Business Model Resilience', content: 'Metrics related to business model resilience specific to your industry.' },
          { title: 'Supply Chain Management', content: 'Industry-specific metrics related to sustainable supply chain management.' },
          { title: 'Materials Sourcing & Efficiency', content: 'Metrics related to materials sourcing and efficiency specific to your industry.' },
          { title: 'Physical Impacts of Climate Change', content: 'Industry-specific metrics related to climate change adaptation.' }
        ]
      },
      {
        title: 'Leadership & Governance',
        content: 'Report on industry-specific leadership and governance metrics as defined by SASB standards.',
        subsections: [
          { title: 'Business Ethics', content: 'Industry-specific metrics related to business ethics.' },
          { title: 'Competitive Behavior', content: 'Metrics related to competitive behavior specific to your industry.' },
          { title: 'Management of the Legal & Regulatory Environment', content: 'Industry-specific metrics related to legal and regulatory compliance.' },
          { title: 'Critical Incident Risk Management', content: 'Metrics related to risk management specific to your industry.' },
          { title: 'Systemic Risk Management', content: 'Industry-specific metrics related to systemic risk management.' }
        ]
      },
      {
        title: 'SASB Content Index',
        content: 'Provide a table that lists all SASB metrics reported and where they can be found in the report.'
      }
    ]
  },
  {
    id: 'tcfd-framework',
    title: 'TCFD Climate Risk Report',
    description: 'Comprehensive climate-related financial risk disclosure report following the TCFD framework and best practices from industry leaders.',
    framework: 'TCFD Recommendations',
    frameworkCategory: 'tcfd',
    coverImage: tcfdCover,
    color: '#a855f7', // purple
    sections: [
      {
        title: 'Cover Page',
        content: 'Include your company logo, report title (Task Force on Climate-related Financial Disclosures (TCFD) Report), reporting year, and corporate information.',
        subsections: [
          { title: 'Report Title', content: 'Task Force on Climate-related Financial Disclosures (TCFD) Report – [Company Name]' },
          { title: 'Reporting Period', content: '[Year] (e.g., January 1 - December 31, 2023)' },
          { title: 'Company Information', content: 'Company name, headquarter location, sector/industry, website' },
          { title: 'Report Status', content: 'E.g., "TCFD-aligned since [year]" or "First TCFD Disclosure"' }
        ]
      },
      {
        title: 'Executive Summary',
        content: 'Provide a concise overview of your organization\'s approach to climate-related risks and opportunities, key findings from the TCFD reporting process, and a summary of your climate strategy and risk management approach.',
        subsections: [
          { title: 'Climate Strategy Overview', content: 'Brief explanation of the organization\'s climate strategy and its integration into business operations.' },
          { title: 'Key Climate Risks & Opportunities', content: 'Summary of the most material climate-related risks and opportunities identified.' },
          { title: 'Emissions & Targets Summary', content: 'High-level overview of GHG emissions performance and progress toward climate-related targets.' },
          { title: 'Key Achievements', content: 'Major climate-related initiatives, investments, and accomplishments during the reporting period.' }
        ],
        visual: 'ExecutiveSummaryChart'
      },
      {
        title: '1. Governance',
        content: 'Disclose the organization\'s governance around climate-related risks and opportunities, focusing on board oversight and management\'s role.',
        subsections: [
          { 
            title: 'a) Board Oversight', 
            content: 'Describe the board\'s oversight of climate-related risks and opportunities, including:\n• Board committee(s) responsible for climate oversight\n• Frequency of climate discussions at board level\n• How the board is informed about climate-related issues\n• How the board considers climate in strategy, risk management, and major decisions\n• How the board monitors and oversees progress on climate-related targets' 
          },
          { 
            title: 'b) Management\'s Role', 
            content: 'Describe management\'s role in assessing and managing climate-related risks and opportunities, including:\n• Climate-related responsibilities assigned to management positions/committees\n• Organizational structure for climate governance\n• Processes by which management is informed about climate issues\n• How management monitors climate-related issues\n• Whether performance metrics and compensation are tied to climate goals' 
          }
        ],
        visual: 'GovernanceStructureChart'
      },
      {
        title: '2. Strategy',
        content: 'Disclose the actual and potential impacts of climate-related risks and opportunities on the organization\'s businesses, strategy, and financial planning, including time horizons, materiality, and scenario analysis.',
        subsections: [
          { 
            title: 'a) Climate-Related Risks & Opportunities', 
            content: 'Identify the climate-related risks and opportunities over the short, medium, and long term, categorized as:\n• Physical risks (acute and chronic)\n  - Acute: Extreme weather events like floods, hurricanes, wildfires\n  - Chronic: Rising sea levels, changing precipitation patterns, increasing temperatures\n• Transition risks\n  - Policy and legal risks (e.g., carbon pricing, emission regulations)\n  - Technology risks (e.g., disruptive low-carbon alternatives)\n  - Market risks (e.g., changing customer behavior, supply chain disruptions)\n  - Reputation risks (e.g., stakeholder concerns, industry stigmatization)\n• Climate-related opportunities\n  - Resource efficiency\n  - New products and services\n  - Access to new markets\n  - Supply chain resilience\n  - Adaptation and mitigation solutions' 
          },
          { 
            title: 'b) Impact on Business, Strategy & Financial Planning', 
            content: 'Describe the impact of climate-related risks and opportunities on the organization\'s businesses, strategy, and financial planning, including:\n• Effects on products and services\n• Effects on supply chain and/or value chain\n• Adaptation and mitigation activities\n• Research and development investments\n• Operations (including types of operations and locations)\n• Acquisitions or divestments\n• Access to capital\n• Impact on financial planning process\n• Impact on capital allocation, capital expenditures, and operational expenditures' 
          },
          { 
            title: 'c) Climate Scenario Analysis', 
            content: 'Describe the resilience of the organization\'s strategy under different climate-related scenarios, including:\n• Description of scenarios used (e.g., 1.5°C, 2°C, and >2°C scenarios)\n• Methodologies and parameters used in the analysis\n• Time horizons considered\n• Key findings from the analysis\n• How the organization\'s strategies might change to address potential risks and opportunities\n• Areas of uncertainty and sensitivity in the analysis\n• Key implications for strategic and financial decisions' 
          },
          { 
            title: 'd) Integration into Strategic Planning', 
            content: 'Describe how climate considerations are embedded into strategic planning processes, including:\n• How climate risk assessment influences business objectives\n• Climate-related targets and their connection to strategy\n• Specific strategic changes made in response to climate-related risks and opportunities\n• Time horizons for strategic climate planning (short: 0-2 years, medium: 3-5 years, long: 5+ years)' 
          }
        ],
        visual: 'StrategyRiskHeatmap'
      },
      {
        title: '3. Risk Management',
        content: 'Disclose how the organization identifies, assesses, and manages climate-related risks, including integration into overall risk management processes.',
        subsections: [
          { 
            title: 'a) Risk Identification & Assessment Processes', 
            content: 'Describe the organization\'s processes for identifying and assessing climate-related risks, including:\n• Risk assessment methodologies and tools used\n• Data sources and climate science references\n• How materiality of climate risks is determined\n• Use of risk scoring or categorization systems\n• How relative significance of climate risks is determined compared to other risks\n• Process for monitoring emerging climate risks' 
          },
          { 
            title: 'b) Risk Management Processes', 
            content: 'Describe the organization\'s processes for managing climate-related risks, including:\n• Risk mitigation strategies and actions for identified risks\n• Processes for prioritizing climate risks\n• Risk acceptance, transfer, or control decisions\n• Physical risk adaptation measures\n• Transition risk management approaches\n• Decision-making process for implementing risk responses' 
          },
          { 
            title: 'c) Integration into Overall Risk Management', 
            content: 'Describe how processes for identifying, assessing, and managing climate-related risks are integrated into the organization\'s overall risk management, including:\n• Connection to Enterprise Risk Management (ERM) framework\n• Climate risk consideration in due diligence processes\n• How climate risks are considered in the organization\'s risk appetite statements\n• Cross-functional collaboration on climate risk management\n• Reporting of climate risks to relevant governance bodies\n• Connection to financial risk assessment processes' 
          }
        ],
        visual: 'RiskMatrixChart'
      },
      {
        title: '4. Metrics & Targets',
        content: 'Disclose the metrics and targets used to assess and manage relevant climate-related risks and opportunities, with particular focus on emissions data.',
        subsections: [
          { 
            title: 'a) Climate-Related Metrics', 
            content: 'Disclose the metrics used by the organization to assess climate-related risks and opportunities, including:\n• Energy usage and mix (total kWh, % renewable)\n• Water usage in water-stressed areas\n• Land use and ecological sensitivity\n• Climate-related investment (CapEx, R&D, acquisitions)\n• Revenue, assets, or business activities aligned with climate opportunities\n• Internal carbon price\n• Climate-adjusted financial metrics\n• Climate-related remuneration metrics\n• Historical data for comparison purposes\n• Methodology for calculating metrics' 
          },
          { 
            title: 'b) Greenhouse Gas Emissions', 
            content: 'Disclose Scope 1, Scope 2, and relevant Scope 3 greenhouse gas (GHG) emissions, including:\n• Absolute emissions (tCO₂e) for each scope\n• Emissions intensity metrics (e.g., tCO₂e per unit revenue, per employee, per product)\n• Historical emissions for trend analysis\n• Methodology and emission factors used\n• Base year definition and recalculation policy\n• Data quality and verification status\n• Breakdown of emissions by business unit, geography, or source\n• Scope 3 emissions by category where material (e.g., purchased goods and services, use of sold products)\n• Description of emission calculation approaches' 
          },
          { 
            title: 'c) Climate-Related Targets', 
            content: 'Describe the targets used by the organization to manage climate-related risks and opportunities, including:\n• Absolute and/or intensity emission reduction targets\n• Timeframes for targets (e.g., short, medium, long-term)\n• Base year for measuring progress\n• Key performance indicators to assess progress\n• Science-based targets alignment (e.g., SBTi validation)\n• Interim milestones and tracking methodology\n• Target scope (e.g., Scope 1, 2, and relevant Scope 3 emissions)\n• Net-zero or carbon neutral commitments and timeframes\n• Other climate-related targets (e.g., renewable energy, water, waste reduction)\n• Progress against targets during the reporting period' 
          }
        ],
        visual: 'EmissionsAndTargetsChart'
      },
      {
        title: '5. Appendices',
        content: 'Provide supporting information, methodologies, and additional context for the TCFD report.',
        subsections: [
          { 
            title: 'Methodologies & Standards', 
            content: 'Detailed explanation of methodologies, standards, and protocols used for:\n• GHG emissions calculation (e.g., GHG Protocol)\n• Scenario analysis (e.g., IEA scenarios, NGFS scenarios)\n• Climate risk assessment\n• Financial impact assessment' 
          },
          { 
            title: 'Climate Scenario Details', 
            content: 'Additional information about the climate scenarios used, including:\n• Scenario sources and references\n• Key assumptions and parameters\n• Time horizons considered\n• Detailed scenario analysis results' 
          },
          { 
            title: 'Glossary of Terms', 
            content: 'Definitions of key climate, TCFD, and industry-specific terminology used in the report.' 
          },
          { 
            title: 'External Verification Statement', 
            content: 'If applicable, include third-party verification or assurance statements related to the climate data reported.' 
          },
          { 
            title: 'TCFD Recommendations Index', 
            content: 'Cross-reference table showing where each TCFD recommended disclosure is addressed in the report.' 
          }
        ]
      }
    ]
  },
  {
    id: 'iso-carbon',
    title: 'ISO 14067 Carbon Footprint',
    description: 'Product carbon footprint assessment report following ISO 14067 standards.',
    framework: 'ISO 14067',
    frameworkCategory: 'iso',
    color: '#ec4899', // pink
    sections: [
      {
        title: 'Executive Summary',
        content: 'Provide an overview of the product carbon footprint assessment, its scope, and key findings.'
      },
      {
        title: 'Introduction',
        content: 'Introduce the purpose and scope of the carbon footprint assessment, the product being assessed, and the organization carrying out the assessment.'
      },
      {
        title: 'Methodology',
        content: 'Describe the methodology used for the carbon footprint assessment, including reference to ISO 14067 and any other relevant standards or guidelines.',
        subsections: [
          { title: 'System Boundaries', content: 'Define the system boundaries for the assessment, including lifecycle stages included and excluded.' },
          { title: 'Functional Unit', content: 'Define the functional unit for the assessment, which serves as the reference for all inputs and outputs.' },
          { title: 'Data Collection Methods', content: 'Describe the methods used to collect data for the assessment.' },
          { title: 'Calculation Methods', content: 'Explain the methods used to calculate the carbon footprint, including emission factors and global warming potential values used.' }
        ]
      },
      {
        title: 'Product Description',
        content: 'Provide a detailed description of the product being assessed, including its composition, manufacturing process, and use and end-of-life phases.',
        subsections: [
          { title: 'Product Specifications', content: 'Detailed specifications of the product, including materials and components.' },
          { title: 'Manufacturing Process', content: 'Description of the manufacturing process, including energy and resource inputs.' },
          { title: 'Use Phase', content: 'Description of how the product is used and any energy or resources consumed during use.' },
          { title: 'End-of-Life', content: 'Description of the end-of-life fate of the product, including disposal, recycling, or reuse options.' }
        ]
      },
      {
        title: 'Life Cycle Inventory Analysis',
        content: 'Present the data collected for each life cycle stage, including inputs (materials, energy, resources) and outputs (emissions, waste).',
        subsections: [
          { title: 'Raw Material Acquisition', content: 'Data on raw material extraction, processing, and transportation.' },
          { title: 'Production Phase', content: 'Data on manufacturing processes, energy use, and emissions.' },
          { title: 'Distribution Phase', content: 'Data on transportation and storage of the product.' },
          { title: 'Use Phase', content: 'Data on energy and resource consumption during product use.' },
          { title: 'End-of-Life Phase', content: 'Data on waste treatment, recycling, and disposal.' }
        ]
      },
      {
        title: 'Carbon Footprint Results',
        content: 'Present the results of the carbon footprint assessment, broken down by life cycle stage and emission source.',
        subsections: [
          { title: 'Total Carbon Footprint', content: 'Present the total carbon footprint of the product per functional unit.' },
          { title: 'Carbon Footprint by Life Cycle Stage', content: 'Break down the carbon footprint by life cycle stage.' },
          { title: 'Carbon Footprint by Emission Source', content: 'Break down the carbon footprint by emission source (e.g., energy, materials, transportation).' },
          { title: 'Contribution Analysis', content: 'Identify the main contributors to the carbon footprint.' }
        ]
      },
      {
        title: 'Interpretation',
        content: 'Interpret the results of the carbon footprint assessment, including identification of hotspots and opportunities for reduction.',
        subsections: [
          { title: 'Hotspot Analysis', content: 'Identify the life cycle stages and processes that contribute most significantly to the carbon footprint.' },
          { title: 'Uncertainty Analysis', content: 'Discuss the uncertainties associated with the assessment and their implications.' },
          { title: 'Sensitivity Analysis', content: 'Present the results of sensitivity analyses to test the robustness of the results.' },
          { title: 'Comparative Analysis', content: 'If applicable, compare the results with those of similar products or previous versions of the same product.' }
        ]
      },
      {
        title: 'Carbon Footprint Reduction Strategies',
        content: 'Propose strategies for reducing the carbon footprint of the product, based on the findings of the assessment.',
        subsections: [
          { title: 'Material Substitution', content: 'Strategies for replacing high-carbon materials with lower-carbon alternatives.' },
          { title: 'Energy Efficiency', content: 'Strategies for improving energy efficiency in production and use phases.' },
          { title: 'Supply Chain Optimization', content: 'Strategies for reducing emissions in the supply chain.' },
          { title: 'End-of-Life Management', content: 'Strategies for improving end-of-life management to reduce emissions.' }
        ]
      },
      {
        title: 'Carbon Offsetting and Neutrality',
        content: 'If applicable, discuss carbon offsetting options and the potential for achieving carbon neutrality for the product.'
      },
      {
        title: 'Verification Statement',
        content: 'Include a statement regarding any third-party verification of the carbon footprint assessment.'
      },
      {
        title: 'Appendices',
        content: 'Include detailed data, calculations, and any other supporting information.'
      }
    ]
  },
  {
    id: 'generic-sustainability',
    title: 'Generic Sustainability Report',
    description: 'A flexible and comprehensive sustainability report template suitable for organizations of any size or industry.',
    framework: 'Generic Format',
    frameworkCategory: 'generic',
    color: '#ef4444', // red
    sections: [
      {
        title: 'Letter from Leadership',
        content: 'A message from the CEO, Sustainability Director, or other leadership figure discussing the organization\'s commitment to sustainability.'
      },
      {
        title: 'About This Report',
        content: 'Information about the report scope, reporting period, and methodologies used.',
        subsections: [
          { title: 'Reporting Period', content: 'The time period covered by the report.' },
          { title: 'Reporting Boundaries', content: 'What is included in the report scope.' },
          { title: 'Reporting Framework', content: 'Any sustainability reporting frameworks referenced.' },
          { title: 'Contact Information', content: 'How to contact the organization for further information.' }
        ]
      },
      {
        title: 'Organizational Overview',
        content: 'A description of the organization, including its size, operations, products/services, and markets served.',
        subsections: [
          { title: 'Organization Profile', content: 'Basic information about the organization.' },
          { title: 'Vision and Mission', content: 'The organization\'s vision and mission statements.' },
          { title: 'Values and Principles', content: 'The core values and principles that guide the organization.' },
          { title: 'Business Model', content: 'A description of how the organization creates value.' }
        ]
      },
      {
        title: 'Sustainability Strategy',
        content: 'An overview of the organization\'s approach to sustainability, including goals, targets, and key initiatives.',
        subsections: [
          { title: 'Sustainability Vision', content: 'The organization\'s long-term vision for sustainability.' },
          { title: 'Strategic Priorities', content: 'The key focus areas for sustainability efforts.' },
          { title: 'Goals and Targets', content: 'Specific, measurable sustainability goals and targets.' },
          { title: 'Alignment with SDGs', content: 'How the strategy aligns with the UN Sustainable Development Goals.' }
        ]
      },
      {
        title: 'Stakeholder Engagement',
        content: 'Information about how the organization engages with its stakeholders on sustainability issues.',
        subsections: [
          { title: 'Stakeholder Identification', content: 'How key stakeholders are identified.' },
          { title: 'Engagement Methods', content: 'The methods used to engage with stakeholders.' },
          { title: 'Key Topics and Concerns', content: 'The main topics and concerns raised by stakeholders.' },
          { title: 'Response to Stakeholder Feedback', content: 'How the organization has responded to stakeholder feedback.' }
        ]
      },
      {
        title: 'Materiality Assessment',
        content: 'A description of the process used to identify and prioritize material sustainability topics.',
        subsections: [
          { title: 'Assessment Process', content: 'The method used to assess materiality.' },
          { title: 'Material Topics', content: 'The topics identified as material to the organization.' },
          { title: 'Materiality Matrix', content: 'A visual representation of material topics.' },
          { title: 'Changes from Previous Reports', content: 'Any changes in material topics from previous reports.' }
        ]
      },
      {
        title: 'Environmental Performance',
        content: 'Information about the organization\'s environmental impacts and initiatives.',
        subsections: [
          { title: 'Energy and Climate', content: 'Energy consumption, renewable energy, and greenhouse gas emissions.' },
          { title: 'Water Stewardship', content: 'Water withdrawal, consumption, discharge, and conservation efforts.' },
          { title: 'Materials and Waste', content: 'Material use, waste generation, recycling, and circular economy initiatives.' },
          { title: 'Biodiversity and Ecosystems', content: 'Impacts on biodiversity and ecosystem protection efforts.' },
          { title: 'Environmental Compliance', content: 'Compliance with environmental laws and regulations.' }
        ]
      },
      {
        title: 'Social Performance',
        content: 'Information about the organization\'s social impacts and initiatives.',
        subsections: [
          { title: 'Labor Practices and Decent Work', content: 'Employment, labor relations, and working conditions.' },
          { title: 'Diversity, Equity, and Inclusion', content: 'Diversity in the workforce and inclusive practices.' },
          { title: 'Occupational Health and Safety', content: 'Health and safety performance and initiatives.' },
          { title: 'Training and Development', content: 'Employee training and career development programs.' },
          { title: 'Human Rights', content: 'Human rights policies and due diligence processes.' },
          { title: 'Community Relations', content: 'Community engagement and investment programs.' },
          { title: 'Product Responsibility', content: 'Product quality, safety, and responsible marketing.' }
        ]
      },
      {
        title: 'Governance and Ethics',
        content: 'Information about the organization\'s governance structure and ethical practices.',
        subsections: [
          { title: 'Governance Structure', content: 'Board composition and committee structures.' },
          { title: 'Sustainability Governance', content: 'Oversight of sustainability at the board and management levels.' },
          { title: 'Ethical Business Practices', content: 'Code of conduct, anti-corruption, and business ethics.' },
          { title: 'Risk Management', content: 'Approach to identifying and managing sustainability risks.' },
          { title: 'Public Policy and Advocacy', content: 'Positions on public policy issues and advocacy activities.' }
        ]
      },
      {
        title: 'Economic Performance',
        content: 'Information about the organization\'s economic impacts and financial sustainability.',
        subsections: [
          { title: 'Economic Value Generated and Distributed', content: 'Overview of financial performance and value distribution.' },
          { title: 'Market Presence', content: 'Economic impact in local markets.' },
          { title: 'Indirect Economic Impacts', content: 'Broader economic contributions to society.' },
          { title: 'Procurement Practices', content: 'Approach to sustainable procurement.' },
          { title: 'Tax Transparency', content: 'Tax strategy and payments.' }
        ]
      },
      {
        title: 'Sustainable Innovation',
        content: 'Information about innovations to improve sustainability performance.',
        subsections: [
          { title: 'Sustainable Products and Services', content: 'Development of sustainable products and services.' },
          { title: 'Process Innovations', content: 'Improvements in production and operational processes.' },
          { title: 'Research and Development', content: 'R&D efforts focused on sustainability.' },
          { title: 'Partnerships and Collaboration', content: 'Collaborative initiatives for sustainable innovation.' }
        ]
      },
      {
        title: 'Future Outlook',
        content: 'The organization\'s vision for the future and upcoming sustainability initiatives.',
        subsections: [
          { title: 'Short-term Priorities', content: 'Sustainability priorities for the coming year.' },
          { title: 'Medium-term Strategy', content: 'Strategic direction for the next 3-5 years.' },
          { title: 'Long-term Vision', content: 'Vision for sustainability in the long term.' },
          { title: 'Emerging Challenges and Opportunities', content: 'Anticipated sustainability challenges and opportunities.' }
        ]
      },
      {
        title: 'Performance Data Tables',
        content: 'Comprehensive environmental, social, and governance performance data.'
      },
      {
        title: 'GRI/SASB/Other Content Index',
        content: 'A table linking report content to relevant reporting framework disclosures.'
      },
      {
        title: 'External Assurance Statement',
        content: 'Statement from external assurance provider, if applicable.'
      }
    ]
  }
];

interface TemplateSelectionProps {
  onSelectTemplate: (template: ReportTemplate) => void;
}

export function TemplateSelection({ onSelectTemplate }: TemplateSelectionProps) {
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Filter templates based on framework and search query
  const filteredTemplates = REPORT_TEMPLATES.filter(template => {
    // Filter by framework
    const frameworkMatch = selectedFramework === 'all' || template.frameworkCategory === selectedFramework;
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return frameworkMatch && searchMatch;
  });

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
    const template = REPORT_TEMPLATES.find(t => t.id === id);
    if (template) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedFramework} onValueChange={setSelectedFramework}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Framework" />
          </SelectTrigger>
          <SelectContent>
            {FRAMEWORKS.map((framework) => (
              <SelectItem key={framework.value} value={framework.value}>
                {framework.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <ReportTemplateCard
              key={template.id}
              id={template.id}
              title={template.title}
              description={template.description}
              framework={template.framework}
              coverImage={template.coverImage}
              color={template.color}
              onClick={handleSelectTemplate}
              isSelected={selectedTemplateId === template.id}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button 
          size="lg" 
          disabled={!selectedTemplateId}
          onClick={() => {
            const template = REPORT_TEMPLATES.find(t => t.id === selectedTemplateId);
            if (template) {
              onSelectTemplate(template);
            }
          }}
        >
          Continue with Selected Template
        </Button>
      </div>
    </div>
  );
}