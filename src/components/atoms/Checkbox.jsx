import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 checkbox-animation focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        checked 
          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-md transform scale-110" 
          : "border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {checked && (
        <ApperIcon name="Check" className="w-3 h-3" />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;