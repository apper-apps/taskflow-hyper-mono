import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import StatsOverview from "@/components/organisms/StatsOverview";
import QuickAddForm from "@/components/molecules/QuickAddForm";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const Dashboard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleTaskUpdate = useCallback(() => {
    // Trigger refresh of components that depend on task data
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const categories = await categoryService.getAll();
      
      const newTask = {
        ...taskData,
        completed: false,
        completedAt: null,
        createdAt: new Date().toISOString(),
        order: Date.now() // Simple ordering system
      };

      await taskService.create(newTask);
      handleTaskUpdate();
      
      return newTask;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar - Static */}
      <div className="hidden lg:block">
        <Sidebar
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
          className="h-screen sticky top-0"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          className="sticky top-0 z-40"
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Overview */}
          <StatsOverview key={refreshKey} />

          {/* Quick Add Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QuickAddForm onAddTask={handleAddTask} />
          </motion.div>

          {/* Task List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TaskList
              key={refreshKey}
              selectedCategoryId={selectedCategoryId}
              searchQuery={searchQuery}
              onTaskUpdate={handleTaskUpdate}
            />
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* This would be implemented as a slide-out overlay for mobile */}
        {/* For now, we'll use the responsive header for mobile navigation */}
      </div>
    </div>
  );
};

export default Dashboard;