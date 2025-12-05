import React from 'react';

const SustainabilityRoadmap: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
      <title>Sustainability Roadmap</title>
      
      {/* Timeline path */}
      <path 
        d="M 100,150 L 700,150" 
        stroke="#94a3b8"
        strokeWidth="4"
        fill="none"
      />
      
      {/* 2023 */}
      <g>
        <circle cx="150" cy="150" r="20" fill="#3b82f6" />
        <text x="150" y="155" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">2023</text>
        
        <line x1="150" y1="180" x2="150" y2="200" stroke="#3b82f6" strokeWidth="2" />
        <rect x="100" y="200" width="100" height="80" rx="5" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
        <text x="150" y="220" fontSize="12" fontWeight="bold" fill="#1e40af" textAnchor="middle">Baseline Assessment</text>
        <text x="150" y="240" fontSize="10" fill="#1e40af" textAnchor="middle">• Carbon Emissions Audit</text>
        <text x="150" y="255" fontSize="10" fill="#1e40af" textAnchor="middle">• Energy Efficiency Review</text>
        <text x="150" y="270" fontSize="10" fill="#1e40af" textAnchor="middle">• Sustainability Strategy</text>
      </g>
      
      {/* 2024 */}
      <g>
        <circle cx="300" cy="150" r="20" fill="#22c55e" />
        <text x="300" y="155" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">2024</text>
        
        <line x1="300" y1="180" x2="300" y2="200" stroke="#22c55e" strokeWidth="2" />
        <rect x="250" y="200" width="100" height="80" rx="5" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="300" y="220" fontSize="12" fontWeight="bold" fill="#166534" textAnchor="middle">Implementation</text>
        <text x="300" y="240" fontSize="10" fill="#166534" textAnchor="middle">• 30% Renewable Energy</text>
        <text x="300" y="255" fontSize="10" fill="#166534" textAnchor="middle">• 20% Emission Reduction</text>
        <text x="300" y="270" fontSize="10" fill="#166534" textAnchor="middle">• Waste Reduction Program</text>
      </g>
      
      {/* 2026 */}
      <g>
        <circle cx="450" cy="150" r="20" fill="#f59e0b" />
        <text x="450" y="155" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">2026</text>
        
        <line x1="450" y1="180" x2="450" y2="200" stroke="#f59e0b" strokeWidth="2" />
        <rect x="400" y="200" width="100" height="80" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="450" y="220" fontSize="12" fontWeight="bold" fill="#854d0e" textAnchor="middle">Scale Up</text>
        <text x="450" y="240" fontSize="10" fill="#854d0e" textAnchor="middle">• 60% Renewable Energy</text>
        <text x="450" y="255" fontSize="10" fill="#854d0e" textAnchor="middle">• 50% Emission Reduction</text>
        <text x="450" y="270" fontSize="10" fill="#854d0e" textAnchor="middle">• Circular Economy Model</text>
      </g>
      
      {/* 2030 */}
      <g>
        <circle cx="600" cy="150" r="20" fill="#a855f7" />
        <text x="600" y="155" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">2030</text>
        
        <line x1="600" y1="180" x2="600" y2="200" stroke="#a855f7" strokeWidth="2" />
        <rect x="550" y="200" width="100" height="80" rx="5" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
        <text x="600" y="220" fontSize="12" fontWeight="bold" fill="#6b21a8" textAnchor="middle">Net Zero Target</text>
        <text x="600" y="240" fontSize="10" fill="#6b21a8" textAnchor="middle">• 100% Renewable Energy</text>
        <text x="600" y="255" fontSize="10" fill="#6b21a8" textAnchor="middle">• Carbon Neutral Operations</text>
        <text x="600" y="270" fontSize="10" fill="#6b21a8" textAnchor="middle">• Full Supply Chain Focus</text>
      </g>
      
      {/* Title */}
      <text x="400" y="50" fontSize="20" fontWeight="bold" textAnchor="middle">
        Sustainability Roadmap to Net Zero
      </text>
      <text x="400" y="75" fontSize="14" fill="#64748b" textAnchor="middle">
        Our journey to carbon neutrality and sustainable operations
      </text>
    </svg>
  );
};

export default SustainabilityRoadmap;