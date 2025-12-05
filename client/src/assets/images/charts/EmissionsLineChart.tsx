import React from 'react';

const EmissionsLineChart: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
      <title>Emissions Reduction Progress</title>
      
      {/* Axes */}
      <line x1="60" y1="250" x2="450" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="60" y1="250" x2="60" y2="50" stroke="#333" strokeWidth="2" />
      
      {/* X-axis labels */}
      <text x="100" y="270" fontSize="12" textAnchor="middle">2020</text>
      <text x="175" y="270" fontSize="12" textAnchor="middle">2021</text>
      <text x="250" y="270" fontSize="12" textAnchor="middle">2022</text>
      <text x="325" y="270" fontSize="12" textAnchor="middle">2023</text>
      <text x="400" y="270" fontSize="12" textAnchor="middle">2024</text>
      
      {/* Y-axis labels */}
      <text x="45" y="250" fontSize="12" textAnchor="end">0</text>
      <text x="45" y="200" fontSize="12" textAnchor="end">25</text>
      <text x="45" y="150" fontSize="12" textAnchor="end">50</text>
      <text x="45" y="100" fontSize="12" textAnchor="end">75</text>
      <text x="45" y="50" fontSize="12" textAnchor="end">100</text>
      <text x="25" y="150" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 25, 150)">tCO2e (thousands)</text>
      
      {/* Actual emissions line */}
      <polyline 
        points="100,200 175,180 250,150 325,120 400,100" 
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
      />
      
      {/* Target emissions line */}
      <polyline 
        points="100,200 175,170 250,140 325,110 400,70" 
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeDasharray="5,5"
      />
      
      {/* Data points for actual emissions */}
      <circle cx="100" cy="200" r="5" fill="#3b82f6" />
      <circle cx="175" cy="180" r="5" fill="#3b82f6" />
      <circle cx="250" cy="150" r="5" fill="#3b82f6" />
      <circle cx="325" cy="120" r="5" fill="#3b82f6" />
      <circle cx="400" cy="100" r="5" fill="#3b82f6" />
      
      {/* Data points for target emissions */}
      <circle cx="100" cy="200" r="5" fill="#f59e0b" />
      <circle cx="175" cy="170" r="5" fill="#f59e0b" />
      <circle cx="250" cy="140" r="5" fill="#f59e0b" />
      <circle cx="325" cy="110" r="5" fill="#f59e0b" />
      <circle cx="400" cy="70" r="5" fill="#f59e0b" />
      
      {/* Title */}
      <text x="250" y="30" fontSize="16" fontWeight="bold" textAnchor="middle">Emissions Reduction Progress vs Target</text>
      
      {/* Legend */}
      <rect x="100" y="280" width="15" height="4" fill="#3b82f6" />
      <text x="125" y="285" fontSize="12">Actual Emissions</text>
      
      <line x1="250" y1="282" x2="270" y2="282" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
      <text x="280" y="285" fontSize="12">Target Emissions</text>
    </svg>
  );
};

export default EmissionsLineChart;