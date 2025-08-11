import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Error = ({ 
  message = "Something went wrong while loading your tasks.",
  onRetry,
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-6 text-center",
      "animate-fade-in",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          className="h-8 w-8 text-red-600" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error