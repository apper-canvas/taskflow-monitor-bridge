import tasksData from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.tasks]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = this.tasks.find(t => t.Id === id)
    if (!task) throw new Error("Task not found")
    return { ...task }
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      categoryId: taskData.categoryId || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    this.tasks.unshift(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 350))
    
    const index = this.tasks.findIndex(t => t.Id === id)
    if (index === -1) throw new Error("Task not found")
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      Id: id // Ensure ID doesn't change
    }
    
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.tasks.findIndex(t => t.Id === id)
    if (index === -1) throw new Error("Task not found")
    
    this.tasks.splice(index, 1)
    return true
  }

  async getByCategory(categoryId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(t => t.categoryId === categoryId)
  }

  async getByPriority(priority) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(t => t.priority === priority)
  }
}

export default new TaskService()