import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with organizing your day.",
  onAction,
  actionLabel = "Add Task",
  icon = "CheckSquare",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">{description}</p>
      {onAction && (
        <Button onClick={onAction} variant="primary" className="flex items-center gap-2">
          <ApperIcon name="Plus" className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;