import React from "react"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { PRIORITY_LEVELS, PRIORITY_LABELS } from "@/utils/priority"
import { cn } from "@/utils/cn"

const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  showCompleted,
  onShowCompletedChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
  className
}) => {
const sortOptions = [
    { value: "created", label: "Date Created" },
    { value: "priority", label: "Priority" },
    { value: "due", label: "Due Date" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "today", label: "Due Today" },
    { value: "overdue", label: "Overdue" }
  ]

  return (
    <div className={cn(
      "bg-white rounded-xl p-6 card-shadow space-y-4",
      className
    )}>
      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full"
      />

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">
            Priority:
          </label>
          <select
            value={selectedPriority || ""}
            onChange={(e) => onPriorityChange(e.target.value || null)}
            className="text-sm border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
          >
            <option value="">All Priorities</option>
            {Object.values(PRIORITY_LEVELS).map(priority => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Show Completed Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => onShowCompletedChange(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-600">
            Show completed
          </span>
        </label>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default FilterBar