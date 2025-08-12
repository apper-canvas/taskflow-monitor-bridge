class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'task_c'
    this.lookupFields = ['category_id_c']
  }

  prepareLookupFields(data) {
    const prepared = { ...data }
    this.lookupFields.forEach(fieldName => {
      if (prepared[fieldName] !== undefined && prepared[fieldName] !== null) {
        prepared[fieldName] = prepared[fieldName]?.Id || prepared[fieldName]
      }
    })
    return prepared
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ],
        pagingInfo: { limit: 1000, offset: 0 }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error fetching tasks:", error.message)
      throw error
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error(`Error fetching task with ID ${id}:`, error.message)
      throw error
    }
  }

  async create(taskData) {
    try {
      const prepared = this.prepareLookupFields({
        Name: taskData.title_c || taskData.title,
        title_c: taskData.title_c || taskData.title,
        description_c: taskData.description_c || taskData.description || "",
        completed_c: false,
        priority_c: taskData.priority_c || taskData.priority || "medium",
        due_date_c: taskData.due_date_c || taskData.dueDate,
        category_id_c: taskData.category_id_c || taskData.categoryId,
        created_at_c: new Date().toISOString(),
        completed_at_c: null
      })
      
      const params = { records: [prepared] }
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create task records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error creating task:", error.message)
      throw error
    }
  }

  async update(id, updates) {
    try {
      const prepared = this.prepareLookupFields({
        Id: id,
        ...(updates.Name && { Name: updates.Name }),
        ...(updates.title_c !== undefined && { title_c: updates.title_c }),
        ...(updates.title !== undefined && { title_c: updates.title }),
        ...(updates.description_c !== undefined && { description_c: updates.description_c }),
        ...(updates.description !== undefined && { description_c: updates.description }),
        ...(updates.completed_c !== undefined && { completed_c: updates.completed_c }),
        ...(updates.completed !== undefined && { completed_c: updates.completed }),
        ...(updates.priority_c !== undefined && { priority_c: updates.priority_c }),
        ...(updates.priority !== undefined && { priority_c: updates.priority }),
        ...(updates.due_date_c !== undefined && { due_date_c: updates.due_date_c }),
        ...(updates.dueDate !== undefined && { due_date_c: updates.dueDate }),
        ...(updates.category_id_c !== undefined && { category_id_c: updates.category_id_c }),
        ...(updates.categoryId !== undefined && { category_id_c: updates.categoryId }),
        ...(updates.completed_at_c !== undefined && { completed_at_c: updates.completed_at_c }),
        ...(updates.completedAt !== undefined && { completed_at_c: updates.completedAt })
      })
      
      const params = { records: [prepared] }
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update task records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error updating task:", error.message)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = { RecordIds: [id] }
      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete task records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return true
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error deleting task:", error.message)
      throw error
    }
  }

  async getByCategory(categoryId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ],
        where: [
          {
            FieldName: "category_id_c",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error fetching tasks by category:", error.message)
      throw error
    }
  }

  async getByPriority(priority) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ],
        where: [
          {
            FieldName: "priority_c",
            Operator: "EqualTo", 
            Values: [priority]
          }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by priority:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error fetching tasks by priority:", error.message)
      throw error
}
  }

  async getTodayTasks() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ],
        where: [
          {
            FieldName: "due_date_c",
            Operator: "RelativeMatch",
            Values: ["Today"]
          }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching today's tasks:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error fetching today's tasks:", error.message)
      throw error
    }
  }

  async getOverdueTasks() {
    try {
      const today = new Date().toISOString().split('T')[0]
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "due_date_c",
                    operator: "LessThan",
                    values: [today]
                  }
                ],
                operator: "AND"
              },
              {
                conditions: [
                  {
                    fieldName: "completed_c",
                    operator: "EqualTo",
                    values: [false]
                  }
                ],
                operator: "AND"
              }
            ]
          }
        ],
        orderBy: [
          { fieldName: "due_date_c", sorttype: "ASC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching overdue tasks:", error?.response?.data?.message)
        throw new Error(error?.response?.data?.message)
      }
      console.error("Error fetching overdue tasks:", error.message)
      throw error
    }
  }
}

export default new TaskService()