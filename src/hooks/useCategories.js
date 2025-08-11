import { useState, useEffect } from "react"
import categoryService from "@/services/api/categoryService"

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError("Failed to load categories")
      console.error("Error loading categories:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      console.error("Error creating category:", err)
      throw err
    }
  }

  const updateCategory = async (updatedCategory) => {
    try {
      const updated = await categoryService.update(updatedCategory.Id, updatedCategory)
      setCategories(prev => prev.map(cat => 
        cat.Id === updated.Id ? updated : cat
      ))
      return updated
    } catch (err) {
      console.error("Error updating category:", err)
      throw err
    }
  }

  const deleteCategory = async (categoryId) => {
    try {
      await categoryService.delete(categoryId)
      setCategories(prev => prev.filter(cat => cat.Id !== categoryId))
    } catch (err) {
      console.error("Error deleting category:", err)
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}