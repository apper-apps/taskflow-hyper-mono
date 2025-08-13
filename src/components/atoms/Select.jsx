import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className = "", 
  children,
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";
  const errorClasses = "border-red-300 focus:ring-red-500";
  
  return (
    <div className="relative">
      <select
        className={cn(baseClasses, error && errorClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;