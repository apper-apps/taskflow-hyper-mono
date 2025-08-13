import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CategoryItem = ({ 
  category, 
  isActive = false, 
  onClick, 
  className = "" 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(category.Id)}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
        isActive 
          ? "bg-gradient-to-r from-primary-100 to-primary-200 border border-primary-300 text-primary-800" 
          : "hover:bg-gray-100 text-gray-700"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />
        <ApperIcon 
          name={category.icon} 
          className={`w-4 h-4 ${isActive ? "text-primary-600" : "text-gray-500"}`} 
        />
        <span className="font-medium">{category.name}</span>
      </div>
      
      <Badge 
        variant={isActive ? "primary" : "default"} 
        size="small"
      >
        {category.taskCount}
      </Badge>
    </motion.button>
  );
};

export default CategoryItem;