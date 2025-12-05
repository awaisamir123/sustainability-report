import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  chartComponent?: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  chartComponent,
  className
}) => {
  const isPositiveChange = change !== undefined && change < 0;
  const isNegativeChange = change !== undefined && change > 0;

  return (
    <Card className={cn("bg-gradient-to-br from-white to-neutral-50 p-5 border-none shadow-lg hover:shadow-xl transition-shadow duration-200", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <span className="material-icons text-neutral-400 text-[18px]">more_horiz</span>
      </div>
      <div className="flex items-end">
        <p className="text-2xl font-semibold">{value}</p>
        {unit && <p className="ml-2 text-sm">{unit}</p>}
      </div>
      {change !== undefined && (
        <div className="flex items-center mt-2">
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
              isPositiveChange
                ? "bg-green-100 text-green-800"
                : isNegativeChange
                ? "bg-red-100 text-red-800"
                : "bg-neutral-100 text-neutral-800"
            )}
          >
            <span className="material-icons text-[14px] mr-0.5">
              {isPositiveChange ? "arrow_downward" : "arrow_upward"}
            </span>
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="ml-2 text-xs text-neutral-500">from previous year</span>
        </div>
      )}
      {chartComponent && <div className="mt-4 chart-container">{chartComponent}</div>}
    </Card>
  );
};

export default MetricCard;
