import React from 'react';

const CertificationBadges: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      {/* ISO 14001 Badge */}
      <div className="badge flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#0c4a6e" />
          <circle cx="50" cy="50" r="40" fill="#0ea5e9" />
          <text x="50" y="45" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">ISO</text>
          <text x="50" y="65" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">14001</text>
        </svg>
        <span className="text-xs mt-1 font-semibold">ISO 14001 Certified</span>
      </div>
      
      {/* Carbon Neutral Badge */}
      <div className="badge flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#166534" />
          <circle cx="50" cy="50" r="40" fill="#16a34a" />
          <path d="M 35,40 L 65,40 L 50,65 Z" fill="white" />
          <circle cx="50" cy="30" r="8" fill="white" />
          <text x="50" y="75" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">CARBON NEUTRAL</text>
        </svg>
        <span className="text-xs mt-1 font-semibold">Carbon Neutral</span>
      </div>
      
      {/* LEED Badge */}
      <div className="badge flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#65a30d" />
          <text x="50" y="50" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">LEED</text>
          <text x="50" y="70" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PLATINUM</text>
        </svg>
        <span className="text-xs mt-1 font-semibold">LEED Platinum</span>
      </div>
      
      {/* GRI Badge */}
      <div className="badge flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="40" fill="#0891b2" />
          <text x="50" y="55" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">GRI</text>
        </svg>
        <span className="text-xs mt-1 font-semibold">GRI Compliant</span>
      </div>
    </div>
  );
};

export default CertificationBadges;