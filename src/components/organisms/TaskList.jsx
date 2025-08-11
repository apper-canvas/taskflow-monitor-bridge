import React, { useState } from "react"
import TaskItem from "@/components/organisms/TaskItem"
import TaskForm from "@/components/organisms/TaskForm"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { sortByPriority } from "@/utils/priority"
import { cn } from "@/utils/cn"

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onRetry,
  onComplete,
  onDelete,
  onUpdate,
  onReorder,
  filter = {},
  emptyMessage = "No tasks found",
  emptyDescription = "Try adjusting your filters or create a new task."
}) => {
  const [editingTask, setEditingTask] = useState(null)
  const [completingTasks, setCompletingTasks] = useState(new Set())

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const handleSaveEdit = async (updatedTask) => {
    await onUpdate(updatedTask)
    setEditingTask(null)
  }

  const handleComplete = async (task) => {
    setCompletingTasks(prev => new Set(prev).add(task.Id))
    
    // Add a small delay for animation
    setTimeout(async () => {
      await onComplete(task)
      setCompletingTasks(prev => {
        const newSet = new Set(prev)
newSet.delete(task.Id)
        return newSet
      })
    }, 400)
  }

  if (loading) {
    return <Loading rows={5} />
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
      />
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty
        title={emptyMessage}
        description={emptyDescription}
        icon="CheckSquare"
      />
    )
  }

  // Sort tasks by priority and completion status
  const sortedTasks = sortByPriority(tasks).sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return 0
  })

  return (
    <div className="space-y-4">
      {/* Task Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{tasks.length}</span> 
          {tasks.length === 1 ? " task" : " tasks"}
          {filter && Object.keys(filter).length > 0 && " found"}
        </div>
        
        {tasks.length > 0 && (
          <div className="text-xs text-gray-500">
            {tasks.filter(t => !t.completed).length} active, {" "}
            {tasks.filter(t => t.completed).length} completed
          </div>
        )}
      </div>

      {/* Task Items */}
      <div className="space-y-3">
        {sortedTasks.map((task, index) => {
          const isCompleting = completingTasks.has(task.Id)
const isEditing = editingTask?.Id === task.Id
          return (
            <div
              key={task.Id}
              className={cn(
                "transform transition-all duration-300",
                isCompleting && "task-completing",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isEditing ? (
                <div className="bg-white rounded-xl p-6 card-shadow border-2 border-primary-200">
                  <TaskForm
                    task={editingTask}
                    onSubmit={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    submitLabel="Save Changes"
                  />
                </div>
              ) : (
                <TaskItem
                  task={task}
                  onComplete={() => handleComplete(task)}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => onDelete(task)}
                  isCompleting={isCompleting}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Bulk Actions */}
      {tasks.length > 0 && (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
const incompleteTasks = tasks.filter(t => !t.completed_c)
              incompleteTasks.forEach(task => handleComplete(task))
            }}
            disabled={tasks.every(t => t.completed)}
          >
            <ApperIcon name="CheckCheck" className="h-4 w-4" />
            Complete All
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
if (window.confirm(`Are you sure you want to delete all ${tasks.length} tasks?`)) {
                tasks.forEach(task => onDelete(task))
              }
            }}
          >
            <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
            Delete All
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskList