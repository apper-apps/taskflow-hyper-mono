import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import taskService from "@/services/api/taskService";

const StatsOverview = ({ className = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const today = new Date();
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return isToday(taskDate);
    });

    const completedToday = todayTasks.filter(task => task.completed).length;
    const totalActive = tasks.filter(task => !task.completed).length;
    const totalCompleted = tasks.filter(task => task.completed).length;
    
    // Week data
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    const weekData = weekDays.map(day => {
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        return format(taskDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });
      const dayCompleted = tasks.filter(task => {
        if (!task.completedAt) return false;
        const completedDate = new Date(task.completedAt);
        return format(completedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });
      
      return {
        day: format(day, 'EEE'),
        date: format(day, 'd'),
        created: dayTasks.length,
        completed: dayCompleted.length,
        isToday: isToday(day)
      };
    });

    return {
      todayTasks: todayTasks.length,
      completedToday,
      totalActive,
      totalCompleted,
      completionRate: todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0,
      weekData
    };
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadTasks} 
        className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`} 
      />
    );
  }

  const stats = getStats();

  return (
    <motion.div 
      className={`bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg text-white overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Your Progress</h2>
            <p className="text-primary-200">Keep up the great work!</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              className="w-5 h-5" 
            />
          </button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{stats.todayTasks}</div>
            <div className="text-sm text-primary-200">Today's Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-emerald-300">{stats.completedToday}</div>
            <div className="text-sm text-primary-200">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{stats.totalActive}</div>
            <div className="text-sm text-primary-200">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{stats.completionRate}%</div>
            <div className="text-sm text-primary-200">Success Rate</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{stats.completedToday} / {stats.todayTasks}</span>
          </div>
          <div className="w-full bg-primary-800 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.completionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Week Overview - Expandable */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-primary-500">
            <h3 className="text-sm font-medium mb-3">This Week</h3>
            <div className="grid grid-cols-7 gap-2">
              {stats.weekData.map((day, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-2 rounded-lg transition-colors ${
                    day.isToday 
                      ? "bg-white/20 border border-white/30" 
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xs text-primary-200 mb-1">{day.day}</div>
                  <div className="text-lg font-bold mb-1">{day.date}</div>
                  <div className="text-xs">
                    <div className="text-emerald-300">{day.completed}</div>
                    <div className="text-primary-300">/{day.created}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsOverview;