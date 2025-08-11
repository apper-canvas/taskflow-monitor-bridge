import React from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search tasks...",
  className,
  ...props 
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          className="h-4 w-4 text-gray-400" 
        />
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-4"
        {...props}
      />
      {value && (
        <button
          onClick={() => onChange?.({ target: { value: "" } })}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar