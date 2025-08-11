import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"
import { useCategories } from "@/hooks/useCategories"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { categories, loading } = useCategories()

  const navigationItems = [
    { path: "/", label: "All Tasks", icon: "List", exact: true },
    { path: "/today", label: "Today", icon: "Calendar", exact: false },
    { path: "/upcoming", label: "Upcoming", icon: "Clock", exact: false },
    { path: "/overdue", label: "Overdue", icon: "AlertCircle", exact: false },
    { path: "/completed", label: "Completed", icon: "CheckSquare", exact: false },
  ]

  const priorityItems = [
    { path: "/priority/high", label: "High Priority", icon: "AlertTriangle", color: "text-red-600" },
    { path: "/priority/medium", label: "Medium Priority", icon: "Minus", color: "text-yellow-600" },
    { path: "/priority/low", label: "Low Priority", icon: "ArrowDown", color: "text-blue-600" },
  ]

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
          "hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50",
          "hover:scale-[1.02] hover:shadow-sm",
          isActive || (item.exact && location.pathname === item.path)
            ? "bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 shadow-md"
            : "text-gray-600 hover:text-gray-900"
        )
      }
    >
      <ApperIcon 
        name={item.icon} 
        className={cn("h-5 w-5", item.color)} 
      />
      <span>{item.label}</span>
      {item.count !== undefined && (
        <span className="ml-auto text-sm font-semibold text-gray-500">
          {item.count}
        </span>
      )}
    </NavLink>
  )

  const CategoryItem = ({ category, onClick }) => (
    <NavLink
      to={`/category/${category.Id}`}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
          "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100",
          "hover:scale-[1.02]",
          isActive
            ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
            : "text-gray-600 hover:text-gray-800"
        )
      }
    >
      <div className={cn("w-3 h-3 rounded-full", `category-${category.color}`)} />
      <span className="flex-1">{category.name}</span>
      <span className="text-xs font-semibold text-gray-500">
        {category.taskCount || 0}
      </span>
    </NavLink>
  )

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <ApperIcon name="CheckSquare" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
            <p className="text-xs text-gray-500 font-medium">Stay organized</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-thin">
        {/* Main Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Overview
          </h3>
          {navigationItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={onClose} />
          ))}
        </div>

        {/* Priority Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Priority
          </h3>
          {priorityItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={onClose} />
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Categories
          </h3>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-4 py-2.5">
                  <div className="skeleton-text w-3/4" />
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <CategoryItem 
                key={category.Id} 
                category={category} 
                onClick={onClose} 
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 px-2">
              No categories yet
            </p>
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </button>
          </div>
          
          {sidebarContent}
        </div>
      </div>
    </>
  )
}

export default Sidebar