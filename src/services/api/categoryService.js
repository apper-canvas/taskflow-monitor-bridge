import categoriesData from "@/services/mockData/categories.json"

class CategoryService {
  constructor() {
    this.categories = [...categoriesData]
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.categories]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const category = this.categories.find(c => c.Id === id)
    if (!category) throw new Error("Category not found")
    return { ...category }
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || "blue",
      taskCount: 0
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.categories.findIndex(c => c.Id === id)
    if (index === -1) throw new Error("Category not found")
    
    this.categories[index] = {
      ...this.categories[index],
      ...updates,
      Id: id
    }
    
    return { ...this.categories[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.categories.findIndex(c => c.Id === id)
    if (index === -1) throw new Error("Category not found")
    
    this.categories.splice(index, 1)
    return true
  }
}

export default new CategoryService()