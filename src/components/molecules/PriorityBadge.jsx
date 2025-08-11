import React from "react"
import Badge from "@/components/atoms/Badge"
import { getPriorityConfig, PRIORITY_LABELS } from "@/utils/priority"
import { isOverdue } from "@/utils/date"
import { cn } from "@/utils/cn"

const PriorityBadge = ({ 
  priority, 
  dueDate, 
  completed,
  className,
  showDot = false 
}) => {
  const config = getPriorityConfig(priority)
  const overdue = !completed && isOverdue(dueDate)
  
  return (
    <Badge
      className={cn(
        config.bg,
        config.text,
        config.border,
        overdue && priority === "high" && "animate-pulse-slow",
        "transition-all duration-200 hover:scale-105",
        className
      )}
      size="sm"
    >
      {showDot && (
        <span className={cn("w-2 h-2 rounded-full", config.dot)} />
      )}
      {PRIORITY_LABELS[priority]}
    </Badge>
  )
}

export default PriorityBadge