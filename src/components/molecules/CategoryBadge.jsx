import React from "react"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const CategoryBadge = ({ 
  category,
  className,
  size = "sm",
  showDot = true,
  ...props 
}) => {
  if (!category) return null
  
  return (
    <Badge
      size={size}
      className={cn(
        "transition-all duration-200 hover:scale-105",
        "bg-gray-100 text-gray-700 border-gray-200",
        className
      )}
      {...props}
    >
      {showDot && (
        <span 
className={cn("w-2 h-2 rounded-full", `category-${category.color_c}`)}
        />
      )}
{category.Name}
    </Badge>
  )
}

export default CategoryBadge