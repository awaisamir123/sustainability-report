import React from 'react';

const SustainabilityRadarChart: React.FC = () => {
  // Center point
  const cx = 200;
  const cy = 200;
  
  // Radius for the radar chart
  const radius = 150;
  
  // Data points (values from 0 to 1 representing performance in each area)
  const metrics = [
    { name: 'Carbon', value: 0.8 },
    { name: 'Energy', value: 0.7 },
    { name: 'Water', value: 0.9 },
    { name: 'Waste', value: 0.6 },
    { name: 'Social', value: 0.75 },
    { name: 'Governance', value: 0.85 }
  ];
  
  // Calculate points on the radar for axes and data points
  const calculatePoint = (index: number, value = 1) => {
    const angle = (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
    const x = cx + radius * value * Math.cos(angle);
    const y = cy + radius * value * Math.sin(angle);
    return { x, y };
  };
  
  // Generate the polygon points for the data shape
  const dataPoints = metrics.map((_, i) => {
    const point = calculatePoint(i, metrics[i].value);
    return `${point.x},${point.y}`;
  }).join(' ');
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <title>Sustainability Performance Radar Chart</title>
      
      {/* Background circles */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 0.75} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 0.5} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 0.25} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      
      {/* Axis lines */}
      {metrics.map((_, i) => {
        const point = calculatePoint(i);
        return (
          <line 
            key={i}
            x1={cx}
            y1={cy}
            x2={point.x}
            y2={point.y}
            stroke="#94a3b8"
            strokeWidth="1"
          />
        );
      })}
      
      {/* Data polygon */}
      <polygon 
        points={dataPoints}
        fill="#3b82f6"
        fillOpacity="0.5"
        stroke="#1d4ed8"
        strokeWidth="2"
      />
      
      {/* Data points */}
      {metrics.map((metric, i) => {
        const point = calculatePoint(i, metric.value);
        return (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#1d4ed8"
          />
        );
      })}
      
      {/* Labels */}
      {metrics.map((metric, i) => {
        const point = calculatePoint(i, 1.1);
        return (
          <text
            key={i}
            x={point.x}
            y={point.y}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {metric.name}
          </text>
        );
      })}
      
      {/* Title */}
      <text x={cx} y="30" fontSize="16" fontWeight="bold" textAnchor="middle">
        Sustainability Performance Overview
      </text>
    </svg>
  );
};

export default SustainabilityRadarChart;