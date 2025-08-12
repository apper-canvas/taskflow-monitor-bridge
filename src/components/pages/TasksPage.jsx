import React, { useState, useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import TaskList from "@/components/organisms/TaskList"
import TaskForm from "@/components/organisms/TaskForm"
import FilterBar from "@/components/organisms/FilterBar"
import QuickAdd from "@/components/organisms/QuickAdd"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { useTasks } from "@/hooks/useTasks"
import { useCategories } from "@/hooks/useCategories"
import { isOverdue, isDueToday, parseInputDate } from "@/utils/date"
import { toast } from "react-toastify"
import { cn } from "@/utils/cn"

const TasksPage = () => {
  const params = useParams()
  const { showQuickAdd, setShowQuickAdd } = useOutletContext()
  const { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask } = useTasks()
  const { categories } = useCategories()
  
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [showCompleted, setShowCompleted] = useState(true)
  const [sortBy, setSortBy] = useState("created")

  // Load tasks on mount and when params change
  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  // Filter tasks based on current route and filters
  const getFilteredTasks = () => {
    let filtered = [...tasks]

    // Route-based filtering
if (params.categoryId) {
      filtered = filtered.filter(task => 
        (task.category_id_c?.Id || task.category_id_c) === parseInt(params.categoryId)
      )
    } else if (params.priority) {
      filtered = filtered.filter(task => task.priority_c === params.priority)
    } else if (params[0] === "overdue") {
      filtered = filtered.filter(task => !task.completed_c && isOverdue(task.due_date_c))
    } else if (params[0] === "today") {
      filtered = filtered.filter(task => !task.completed_c && isDueToday(task.due_date_c))
    } else if (params[0] === "upcoming") {
      filtered = filtered.filter(task => 
        !task.completed_c && 
        task.due_date_c && 
        !isOverdue(task.due_date_c) && 
        !isDueToday(task.due_date_c)
      )
    } else if (params[0] === "completed") {
      filtered = filtered.filter(task => task.completed_c)
    }

    // Search filtering
if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title_c?.toLowerCase().includes(query) ||
        (task.description_c && task.description_c.toLowerCase().includes(query))
      )
    }

    // Priority filtering
if (selectedPriority) {
      filtered = filtered.filter(task => task.priority_c === selectedPriority)
    }

// Completed filtering
    if (!showCompleted) {
      filtered = filtered.filter(task => !task.completed)
    }

    // Sorting
filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority_c] || 1) - (priorityOrder[a.priority_c] || 1)
        case "dueDate":
          if (!a.due_date_c && !b.due_date_c) return 0
          if (!a.due_date_c) return 1
          if (!b.due_date_c) return -1
          return new Date(a.due_date_c) - new Date(b.due_date_c)
        case "title":
          return a.title_c?.localeCompare(b.title_c || "") || 0
        case "created":
        default:
          return new Date(b.created_at_c) - new Date(a.created_at_c)
      }
    })

    return filtered
  }

  const filteredTasks = getFilteredTasks()

  // Get page title based on current route
  const getPageTitle = () => {
    if (params.categoryId) {
const category = categories.find(c => c.Id === parseInt(params.categoryId))
      return category ? category.Name : "Category"
    }
    
    const routeTitles = {
      "overdue": "Overdue Tasks",
      "today": "Due Today", 
      "upcoming": "Upcoming Tasks",
      "completed": "Completed Tasks",
      "high": "High Priority Tasks",
      "medium": "Medium Priority Tasks", 
      "low": "Low Priority Tasks"
    }
    
    return routeTitles[params.priority] || routeTitles[params[0]] || "All Tasks"
  }

  const getEmptyMessage = () => {
    if (params[0] === "overdue") return "No overdue tasks"
    if (params[0] === "today") return "Nothing due today"
    if (params[0] === "upcoming") return "No upcoming tasks"
    if (params[0] === "completed") return "No completed tasks yet"
    if (params.priority) return `No ${params.priority} priority tasks`
    if (params.categoryId) return "No tasks in this category"
    if (searchQuery) return "No tasks match your search"
    return "No tasks yet"
  }

  const getEmptyDescription = () => {
    if (searchQuery) return "Try adjusting your search terms or create a new task."
    if (params[0] === "completed") return "Complete some tasks to see them here!"
    return "Create your first task to get started!"
  }

  // Handlers
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData)
      toast.success("Task created successfully!")
      setShowTaskForm(false)
    } catch (error) {
      toast.error("Failed to create task")
    }
  }

  const handleQuickAdd = async (taskData) => {
    try {
      await createTask(taskData)
      toast.success("Task added!")
    } catch (error) {
      toast.error("Failed to add task")
    }
  }

  const handleCompleteTask = async (task) => {
    try {
      await updateTask({
...task,
        completed_c: !task.completed_c,
        completed_at_c: !task.completed_c ? new Date().toISOString() : null
      })
      toast.success(task.completed ? "Task marked as incomplete" : "Task completed! 🎉")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask)
      toast.success("Task updated successfully!")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (task) => {
    try {
await deleteTask(task.Id)
      toast.success("Task deleted")
    } catch (error) {
      toast.error("Failed to delete task")
    }
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedPriority(null)
    setShowCompleted(true)
    setSortBy("created")
  }

  const hasActiveFilters = searchQuery || selectedPriority || !showCompleted || sortBy !== "created"

return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600">
{filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>

        <Button
          onClick={() => setShowTaskForm(!showTaskForm)}
          variant="primary"
          size="lg"
          className="transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          New Task
        </Button>
      </div>

      {/* Task Form */}
      {showTaskForm && (
        <div className="bg-white rounded-xl p-6 card-shadow border-2 border-primary-100 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold gradient-text">
              Create New Task
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTaskForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>
          
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
          />
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Task List */}
      <TaskList
tasks={filteredTasks}
        loading={loading}
        error={error}
        onRetry={loadTasks}
        onComplete={handleCompleteTask}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        emptyMessage={getEmptyMessage()}
        emptyDescription={getEmptyDescription()}
      />

      {/* Quick Add Modal */}
      <QuickAdd
        isVisible={showQuickAdd}
        onSubmit={handleQuickAdd}
        onCancel={() => setShowQuickAdd(false)}
      />
    </div>
  )
}

export default TasksPage