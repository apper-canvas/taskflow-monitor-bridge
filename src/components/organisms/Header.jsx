import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import LogoutButton from "@/components/atoms/LogoutButton";
const Header = ({ onMenuClick, onQuickAdd }) => {
  return (
    <header className="lg:ml-80 bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button and title */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <ApperIcon name="Menu" className="h-5 w-5" />
            </Button>
            
            <div className="lg:hidden">
              <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
            </div>
          </div>

          {/* Desktop title and actions */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back! 
                <span className="gradient-text ml-2">Let&apos;s get things done.</span>
              </h1>
              <p className="text-gray-600 mt-1">
                {new Date().toLocaleDateString("en-US", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </div>
<div className="flex items-center gap-3">
              <Button
                onClick={onQuickAdd}
                variant="accent"
                size="lg"
                className="shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ApperIcon name="Plus" className="h-5 w-5" />
                Quick Add
              </Button>
              <LogoutButton />
            </div>
          </div>

          {/* Mobile quick add */}
<div className="lg:hidden flex items-center gap-2">
            <Button
              onClick={onQuickAdd}
              variant="accent"
              size="sm"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header