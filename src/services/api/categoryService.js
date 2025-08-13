import categoriesData from "@/services/mockData/categories.json";
import tasksData from "@/services/mockData/tasks.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
    this.tasks = [...tasksData];
  }

  async getAll() {
    await this.delay(250);
    
    // Update task counts
    const categoriesWithCounts = this.categories.map(category => ({
      ...category,
      taskCount: this.tasks.filter(task => task.categoryId === category.Id && !task.completed).length
    }));
    
    return categoriesWithCounts;
  }

  async getById(id) {
    await this.delay(200);
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    
    const taskCount = this.tasks.filter(task => task.categoryId === parseInt(id) && !task.completed).length;
    
    return { 
      ...category,
      taskCount
    };
  }

  async create(categoryData) {
    await this.delay(350);
    
    const newId = Math.max(...this.categories.map(c => c.Id), 0) + 1;
    const newCategory = {
      Id: newId,
      taskCount: 0,
      ...categoryData
    };
    
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await this.delay(300);
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...categoryData,
      Id: parseInt(id)
    };
    
    const taskCount = this.tasks.filter(task => task.categoryId === parseInt(id) && !task.completed).length;
    this.categories[index].taskCount = taskCount;
    
    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay(250);
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    // Check if category has tasks
    const tasksInCategory = this.tasks.filter(task => task.categoryId === parseInt(id));
    if (tasksInCategory.length > 0) {
      throw new Error("Cannot delete category with existing tasks");
    }
    
    this.categories.splice(index, 1);
    return { success: true };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new CategoryService();