import { useState, useCallback } from "react"
import taskService from "@/services/api/taskService"

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      return newTask
    } catch (err) {
      console.error("Error creating task:", err)
      throw err
    }
  }, [])

  const updateTask = useCallback(async (updatedTask) => {
    try {
      const updated = await taskService.update(updatedTask.Id, updatedTask)
      setTasks(prev => prev.map(task => 
        task.Id === updated.Id ? updated : task
      ))
      return updated
    } catch (err) {
      console.error("Error updating task:", err)
      throw err
    }
  }, [])

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
    } catch (err) {
      console.error("Error deleting task:", err)
      throw err
    }
  }, [])

  const getTaskById = useCallback((taskId) => {
    return tasks.find(task => task.Id === taskId)
  }, [tasks])

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
  }
}