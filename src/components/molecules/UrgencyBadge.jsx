import React from 'react'
import Badge from '@/components/atoms/Badge'
import { getUrgencyConfig, URGENCY_LABELS } from '@/utils/priority'
import { cn } from '@/utils/cn'

function UrgencyBadge({ 
  urgency, 
  showDot = false, 
  className,
  completed = false 
}) {
  const config = getUrgencyConfig(urgency)
  
  return (
    <Badge
      className={cn(
        config.bg,
        config.text,
        config.border,
        completed && "opacity-60",
        urgency === "urgent" && "animate-pulse-slow",
        "transition-all duration-200 hover:scale-105",
        className
      )}
    >
      {showDot && (
        <span className={cn("inline-block w-2 h-2 rounded-full mr-1", config.dot)} />
      )}
      {URGENCY_LABELS[urgency]}
    </Badge>
  )
}

export default UrgencyBadge