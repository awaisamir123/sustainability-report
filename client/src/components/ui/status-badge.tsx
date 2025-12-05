import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "completed" | "in-progress" | "failed" | "attention" | "not-started";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  className 
}) => {
  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-800",
      defaultLabel: "Complete"
    },
    "in-progress": {
      color: "bg-yellow-100 text-yellow-800",
      defaultLabel: "In Progress"
    },
    failed: {
      color: "bg-red-100 text-red-800",
      defaultLabel: "Failed"
    },
    attention: {
      color: "bg-red-100 text-red-800",
      defaultLabel: "Attention Needed"
    },
    "not-started": {
      color: "bg-blue-100 text-blue-800",
      defaultLabel: "Not Started"
    }
  };

  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full",
        config.color,
        className
      )}
    >
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
