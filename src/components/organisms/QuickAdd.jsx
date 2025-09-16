import React, { useState } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { PRIORITY_LEVELS } from "@/utils/priority"
import { getTodayString } from "@/utils/date"
import { useCategories } from "@/hooks/useCategories"
import { cn } from "@/utils/cn"

const QuickAdd = ({ 
  onSubmit, 
  onCancel,
  isVisible = false,
  className 
}) => {
  const { categories } = useCategories()
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM)
const [dueToday, setDueToday] = useState(false)
  const [urgency, setUrgency] = useState("normal")
const [categoryId, setCategoryId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) return

    setIsSubmitting(true)

    try {
await onSubmit({
        title_c: title.trim(),
        priority_c: priority,
        due_date_c: dueToday ? getTodayString() : null,
category_id_c: categoryId ? parseInt(categoryId) : null,
        urgency_c: urgency
      })
      
      // Reset form
      setTitle("")
      setPriority(PRIORITY_LEVELS.MEDIUM)
      setDueToday(false)
setCategoryId("")
      setUrgency("normal")
      onCancel?.()
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={cn(
        "bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl",
        "transform animate-scale-in",
        className
      )}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold gradient-text">
            Quick Add Task
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={isSubmitting}
            autoFocus
            className="text-base"
          />

          {/* Quick Options */}
          <div className="grid grid-cols-2 gap-3">
            {/* Priority */}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300"
            >
              <option value={PRIORITY_LEVELS.HIGH}>High Priority</option>
              <option value={PRIORITY_LEVELS.MEDIUM}>Medium Priority</option>
              <option value={PRIORITY_LEVELS.LOW}>Low Priority</option>
            </select>

            {/* Category */}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300"
            >
              <option value="">No Category</option>
{categories.map(category => (
                <option key={category.Id} value={category.Id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
<select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          {/* Due Today Toggle */}
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={dueToday}
              onChange={(e) => setDueToday(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
            />
            <div className="flex items-center gap-2">
              <ApperIcon name="Calendar" className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Due today
              </span>
            </div>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting || !title.trim()}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuickAdd