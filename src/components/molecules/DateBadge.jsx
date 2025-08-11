import React from "react"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { formatDateShort, isOverdue, isDueToday } from "@/utils/date"
import { cn } from "@/utils/cn"

const DateBadge = ({ 
  date, 
  completed,
  className,
  ...props 
}) => {
  if (!date) return null

  const overdue = !completed && isOverdue(date)
  const today = isDueToday(date)
  
  let variant = "default"
  let icon = "Calendar"
  
  if (overdue) {
    variant = "danger"
    icon = "AlertCircle"
  } else if (today) {
    variant = "warning"
    icon = "Clock"
  }
  
  return (
    <Badge
      variant={variant}
      size="sm"
      className={cn(
        "transition-all duration-200 hover:scale-105",
        className
      )}
      {...props}
    >
      <ApperIcon name={icon} className="h-3 w-3" />
      {formatDateShort(date)}
    </Badge>
  )
}

export default DateBadge