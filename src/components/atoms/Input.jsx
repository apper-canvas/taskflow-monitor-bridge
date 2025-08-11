import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2",
        "text-sm font-medium text-gray-900 placeholder:text-gray-400",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300",
        "hover:border-gray-300",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-300 focus:border-red-300 focus:ring-red-500",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input