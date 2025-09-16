import React, { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import { PRIORITY_LEVELS, PRIORITY_LABELS } from "@/utils/priority"
import { formatDateInput, parseInputDate } from "@/utils/date"
import { useCategories } from "@/hooks/useCategories"
import { cn } from "@/utils/cn"

const TaskForm = ({ 
  task, 
  onSubmit, 
  onCancel,
  submitLabel = "Create Task",
  className 
}) => {
  const { categories } = useCategories()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: PRIORITY_LEVELS.MEDIUM,
dueDate: "",
    urgency: "normal",
    categoryId: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form with task data for editing
  useEffect(() => {
    if (task) {
      setFormData({
title: task.title_c || "",
        description: task.description_c || "",
        priority: task.priority_c || PRIORITY_LEVELS.MEDIUM,
dueDate: task.due_date_c ? formatDateInput(task.due_date_c) : "",
        urgency: task.urgency_c || "normal",
        categoryId: task.category_id_c?.Id || task.category_id_c || ""
      })
    }
  }, [task])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }
    
    if (formData.title.length > 200) {
      newErrors.title = "Task title must be less than 200 characters"
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

try {
      const taskData = {
        title_c: formData.title,
        description_c: formData.description,
priority_c: formData.priority,
        urgency_c: formData.urgency,
        due_date_c: formData.dueDate || null,
        category_id_c: formData.categoryId ? parseInt(formData.categoryId) : null
      }

      await onSubmit(taskData)
      
      // Reset form if creating new task
      if (!task) {
        setFormData({
          title: "",
          description: "",
          priority: PRIORITY_LEVELS.MEDIUM,
          dueDate: "",
categoryId: "",
          urgency: "normal"
        })
      }
    } catch (error) {
      console.error("Error submitting task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("space-y-6", className)}
    >
      {/* Title */}
      <FormField
        label="Task Title"
        required
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="What needs to be done?"
        error={errors.title}
        disabled={isSubmitting}
      />

      {/* Description */}
      <FormField
        label="Description"
        error={errors.description}
      >
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add any additional details..."
          rows={3}
          disabled={isSubmitting}
          className="flex w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </FormField>

      {/* Priority and Due Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Priority */}
        <FormField label="Priority">
          <select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Object.values(PRIORITY_LEVELS).map(priority => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </FormField>

        {/* Due Date */}
        <FormField label="Due Date">
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </FormField>
<FormField label="Urgency">
          <select
            value={formData.urgency}
            onChange={(e) => handleChange("urgency", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </FormField>
      </div>

      {/* Category */}
      <FormField label="Category">
        <select
          value={formData.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-primary-300 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">No Category</option>
          {categories.map(category => (
<option key={category.Id} value={category.Id}>
              {category.Name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          variant="accent"
          disabled={isSubmitting || !formData.title.trim()}
          className="flex-1 sm:flex-none"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
              {task ? "Saving..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={task ? "Save" : "Plus"} className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default TaskForm