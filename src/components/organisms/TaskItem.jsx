import React, { useState } from "react"
import Button from "@/components/atoms/Button"
import Checkbox from "@/components/atoms/Checkbox"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import DateBadge from "@/components/molecules/DateBadge"
import CategoryBadge from "@/components/molecules/CategoryBadge"
import ApperIcon from "@/components/ApperIcon"
import { formatDate } from "@/utils/date"
import { useCategories } from "@/hooks/useCategories"
import { cn } from "@/utils/cn"

const TaskItem = ({ 
  task, 
  onComplete, 
  onEdit, 
  onDelete,
  isCompleting = false,
  className 
}) => {
  const [showActions, setShowActions] = useState(false)
  const { categories } = useCategories()
  
const category = categories.find(c => c.Id === (task.category_id_c?.Id || task.category_id_c))

  const handleComplete = () => {
    // Show confetti animation
    if (!task.completed) {
      showConfetti()
    }
    onComplete()
  }

  const showConfetti = () => {
    const colors = ["#10B981", "#5B21B6", "#8B5CF6", "#F59E0B"]
    const particleCount = 12
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "confetti-particle"
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 0.3 + "s"
      
      document.body.appendChild(particle)
      
      setTimeout(() => {
        document.body.removeChild(particle)
      }, 600)
    }
  }

  return (
    <div
      className={cn(
        "group bg-white rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-200",
        "hover:scale-[1.01] hover:-translate-y-0.5",
task.completed_c && "opacity-75",
        isCompleting && "animate-scale-in",
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            className="transform hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className={cn(
"font-semibold text-gray-900 mb-2 leading-tight",
            task.completed_c && "line-through text-gray-500"
          )}>
            {task.title}
          </h3>

          {/* Description */}
{task.description_c && (
            <p className={cn(
              "text-gray-600 text-sm mb-3 line-clamp-2",
              task.completed_c && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
<PriorityBadge 
              priority={task.priority_c}
              dueDate={task.due_date_c}
              completed={task.completed_c}
              showDot
            />
            
{task.due_date_c && (
              <DateBadge 
                date={task.due_date_c}
                completed={task.completed_c}
              />
            )}
            
            {category && (
              <CategoryBadge category={category} />
            )}

{task.completed_c && task.completed_at_c && (
              <div className="text-xs text-gray-500 ml-auto">
                Completed {formatDate(task.completed_at_c)}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={cn(
          "flex items-center gap-1 transition-all duration-200",
          showActions || window.innerWidth < 768 ? "opacity-100" : "opacity-0"
        )}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-gray-400 hover:text-primary-600"
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                onDelete()
              }
            }}
            className="text-gray-400 hover:text-red-600"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem