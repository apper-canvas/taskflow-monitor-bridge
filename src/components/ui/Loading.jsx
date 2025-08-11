import React from "react"
import { cn } from "@/utils/cn"

const Loading = ({ className, rows = 3 }) => {
  return (
    <div className={cn("space-y-4 animate-fade-in", className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-6 card-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="skeleton w-5 h-5 rounded" />
            <div className="flex-1 space-y-3">
              <div className="skeleton-text w-3/4" />
              <div className="flex items-center space-x-3">
                <div className="skeleton-text w-16" />
                <div className="skeleton-text w-20" />
                <div className="skeleton-text w-24" />
              </div>
            </div>
            <div className="skeleton w-8 h-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading