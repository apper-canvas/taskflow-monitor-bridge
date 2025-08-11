import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Checkbox = forwardRef(({ 
  className, 
  checked,
  disabled,
  onChange,
  ...props 
}, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        "custom-checkbox",
        "hover:border-accent-400 focus:ring-accent-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox