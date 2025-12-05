import React from 'react';

const EmissionsPieChart: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <title>Emissions Breakdown by Scope</title>
      {/* Pie Chart */}
      <g transform="translate(200, 200)">
        {/* Scope 1 - 25% */}
        <path 
          d="M0 0 L0 -180 A180 180 0 0 1 155.88 90 Z" 
          fill="#3b82f6"
          stroke="white"
          strokeWidth="2"
        />
        {/* Scope 2 - 35% */}
        <path 
          d="M0 0 L155.88 90 A180 180 0 0 1 -155.88 90 Z" 
          fill="#22c55e"
          stroke="white"
          strokeWidth="2"
        />
        {/* Scope 3 - 40% */}
        <path 
          d="M0 0 L-155.88 90 A180 180 0 0 1 0 -180 Z" 
          fill="#f59e0b"
          stroke="white"
          strokeWidth="2"
        />
      </g>
      
      {/* Legend */}
      <g transform="translate(20, 330)">
        <rect width="20" height="20" fill="#3b82f6" />
        <text x="30" y="15" fontSize="14" fill="#333">Scope 1 Emissions (25%)</text>
      </g>
      <g transform="translate(20, 360)">
        <rect width="20" height="20" fill="#22c55e" />
        <text x="30" y="15" fontSize="14" fill="#333">Scope 2 Emissions (35%)</text>
      </g>
      <g transform="translate(220, 330)">
        <rect width="20" height="20" fill="#f59e0b" />
        <text x="30" y="15" fontSize="14" fill="#333">Scope 3 Emissions (40%)</text>
      </g>
    </svg>
  );
};

export default EmissionsPieChart;