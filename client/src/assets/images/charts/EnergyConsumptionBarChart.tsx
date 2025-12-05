import React from 'react';

const EnergyConsumptionBarChart: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
      <title>Energy Consumption by Source</title>
      
      {/* Axes */}
      <line x1="60" y1="250" x2="450" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="60" y1="250" x2="60" y2="50" stroke="#333" strokeWidth="2" />
      
      {/* Y-axis labels */}
      <text x="20" y="250" fontSize="12" textAnchor="middle">0</text>
      <text x="20" y="200" fontSize="12" textAnchor="middle">25</text>
      <text x="20" y="150" fontSize="12" textAnchor="middle">50</text>
      <text x="20" y="100" fontSize="12" textAnchor="middle">75</text>
      <text x="20" y="50" fontSize="12" textAnchor="middle">100</text>
      <text x="20" y="25" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 10, 150)">MWh</text>
      
      {/* Bars for 2022 */}
      <g transform="translate(120, 0)">
        {/* Non-renewable */}
        <rect x="0" y="100" width="30" height="150" fill="#f87171" />
        {/* Renewable */}
        <rect x="0" y="170" width="30" height="80" fill="#34d399" />
        <text x="15" y="270" fontSize="12" textAnchor="middle">2022</text>
      </g>
      
      {/* Bars for 2023 */}
      <g transform="translate(220, 0)">
        {/* Non-renewable */}
        <rect x="0" y="130" width="30" height="120" fill="#f87171" />
        {/* Renewable */}
        <rect x="0" y="130" width="30" height="120" fill="#34d399" />
        <text x="15" y="270" fontSize="12" textAnchor="middle">2023</text>
      </g>
      
      {/* Bars for 2024 (Target) */}
      <g transform="translate(320, 0)">
        {/* Non-renewable */}
        <rect x="0" y="180" width="30" height="70" fill="#f87171" />
        {/* Renewable */}
        <rect x="0" y="80" width="30" height="170" fill="#34d399" />
        <text x="15" y="270" fontSize="12" textAnchor="middle">2024 (Target)</text>
      </g>
      
      {/* Title */}
      <text x="250" y="30" fontSize="16" fontWeight="bold" textAnchor="middle">Energy Consumption by Source</text>
      
      {/* Legend */}
      <g transform="translate(90, 310)">
        <rect width="15" height="15" fill="#f87171" />
        <text x="25" y="12" fontSize="12">Non-renewable Energy</text>
        <rect x="180" width="15" height="15" fill="#34d399" />
        <text x="205" y="12" fontSize="12">Renewable Energy</text>
      </g>
    </svg>
  );
};

export default EnergyConsumptionBarChart;