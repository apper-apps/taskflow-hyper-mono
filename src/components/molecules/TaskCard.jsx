import React from "react";
import { format, isToday, isTomorrow, isPast, isValid } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const TaskCard = React.forwardRef(({ 
  task, 
  category,
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = "" 
}, ref) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return { 
          color: "bg-red-500", 
          label: "High", 
          className: "priority-high" 
        };
      case "medium":
        return { 
          color: "bg-amber-500", 
          label: "Medium", 
          className: "priority-medium" 
        };
      case "low":
        return { 
          color: "bg-gray-400", 
          label: "Low", 
          className: "priority-low" 
        };
      default:
        return { 
          color: "bg-gray-400", 
          label: "Low", 
          className: "priority-low" 
        };
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (!isValid(date)) return null;
    
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-gray-500";
    
    const date = new Date(dueDate);
    if (!isValid(date)) return "text-gray-500";
    
    if (isPast(date) && !isToday(date)) return "text-red-500";
    if (isToday(date)) return "text-amber-600";
    return "text-gray-600";
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const dueDate = formatDueDate(task.dueDate);
  const dueDateColor = getDueDateColor(task.dueDate);

  return (
<motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 task-item ${task.completed ? "opacity-75" : ""} ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-1 text-sm text-gray-600 ${task.completed ? "line-through" : ""}`}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="small"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => onDelete(task.Id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            {category && (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1.5"
                style={{ 
                  backgroundColor: `${category.color}15`,
                  borderColor: `${category.color}40`,
                  color: category.color 
                }}
              >
                <ApperIcon name={category.icon} className="w-3 h-3" />
                {category.name}
              </Badge>
            )}
            
            <div className={`flex items-center gap-1.5 ${priorityConfig.className}`}>
              <div 
                className={`w-2 h-2 rounded-full priority-dot ${priorityConfig.color}`}
              />
              <span className="text-xs font-medium text-gray-600">
                {priorityConfig.label}
              </span>
            </div>
            
            {dueDate && (
              <div className="flex items-center gap-1.5">
                <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
                <span className={`text-xs font-medium ${dueDateColor}`}>
                  {dueDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;