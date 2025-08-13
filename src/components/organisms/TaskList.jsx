import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import FilterBar from "@/components/molecules/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const TaskList = ({ 
  selectedCategoryId = null, 
  searchQuery = "",
  onTaskUpdate,
  className = "" 
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    priority: "all"
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setFilters(prev => ({
        ...prev,
        category: selectedCategoryId
      }));
    }
  }, [selectedCategoryId]);

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });

      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      onTaskUpdate?.();
      
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task reopened"
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      onTaskUpdate?.();
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    // This would open an edit modal in a full implementation
    toast.info("Edit functionality would open here");
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // Search filter
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (filters.status !== "all") {
        if (filters.status === "completed" && !task.completed) return false;
        if (filters.status === "active" && task.completed) return false;
      }
      
      // Category filter
      if (filters.category !== "all" && task.categoryId !== filters.category) {
        return false;
      }
      
      // Priority filter
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by completion status first, then by creation date
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const getTaskCategory = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId);
  };

  if (loading) return <Loading className={className} />;
  
  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadData} 
        className={className} 
      />
    );
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className={`space-y-6 ${className}`}>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
      />

      {filteredTasks.length === 0 ? (
        <Empty
          title={searchQuery ? "No matching tasks" : "No tasks found"}
          description={
            searchQuery 
              ? `No tasks match your search for "${searchQuery}"`
              : "Tasks matching your current filters will appear here."
          }
          icon={searchQuery ? "Search" : "CheckSquare"}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                category={getTaskCategory(task.categoryId)}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                className="group"
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;