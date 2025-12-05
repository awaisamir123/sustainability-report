import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ScopeCardProps {
  title: string;
  infoText: string;
  value: number | string;
  unit?: string;
  percentage?: number;
  chartComponent?: React.ReactNode;
  breakdownItems?: { label: string; value: string | number; color: string }[];
}

const ScopeCard: React.FC<ScopeCardProps> = ({
  title,
  infoText,
  value,
  unit = "tCO₂e",
  percentage,
  chartComponent,
  breakdownItems = []
}) => {
  return (
    <div className="p-4 bg-gradient-to-br from-white to-neutral-50 rounded-lg border-none shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gradient">{title}</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="material-icons text-neutral-400 text-[16px] ml-2 cursor-help">
                info
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs p-4 bg-neutral-800 text-white">
              <p className="font-medium mb-1">{title} Emissions</p>
              <p className="text-sm">{infoText}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="material-icons text-neutral-400 text-[18px]">more_vert</span>
      </div>

      <p className="text-xl font-semibold mt-3">
        {value} <span className="text-sm font-normal">{unit}</span>
      </p>

      {percentage !== undefined && (
        <p className="text-xs text-neutral-500 mt-1">{percentage.toFixed(1)}% of total emissions</p>
      )}

      {chartComponent && (
        <div className="mt-4 h-40">{chartComponent}</div>
      )}

      {breakdownItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {breakdownItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.label}</span>
              </div>
              <span className="font-medium">{item.value} {unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScopeCard;