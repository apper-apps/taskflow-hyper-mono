import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay(200);
    const task = this.tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay(400);
    
    const newId = Math.max(...this.tasks.map(t => t.Id), 0) + 1;
    const newTask = {
      Id: newId,
      ...taskData,
      createdAt: taskData.createdAt || new Date().toISOString(),
      order: taskData.order || Date.now()
    };
    
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await this.delay(300);
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...taskData,
      Id: parseInt(id)
    };
    
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await this.delay(250);
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks.splice(index, 1);
    return { success: true };
  }

  async getByCategory(categoryId) {
    await this.delay(300);
    return this.tasks.filter(task => task.categoryId === parseInt(categoryId));
  }

  async getByStatus(completed = false) {
    await this.delay(300);
    return this.tasks.filter(task => task.completed === completed);
  }

  async getByPriority(priority) {
    await this.delay(300);
    return this.tasks.filter(task => task.priority === priority);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new TaskService();