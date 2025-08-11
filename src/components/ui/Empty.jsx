import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Empty = ({ 
  title = "No tasks yet",
  description = "Create your first task to get started with TaskFlow!",
  actionLabel = "Add your first task",
  onAction,
  icon = "CheckSquare",
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-6 text-center",
      "animate-fade-in",
      className
    )}>
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mb-6">
        <ApperIcon 
          name={icon} 
          className="h-10 w-10 text-primary-600" 
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 gradient-text">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction} 
          variant="accent" 
          size="lg"
          className="transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty