import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default",
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full border";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border-primary-300",
    success: "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300",
    warning: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300",
    danger: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300",
    outline: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
  };
  
  const sizes = {
    small: "px-2 py-0.5 text-xs",
    default: "px-2.5 py-1 text-xs",
    large: "px-3 py-1.5 text-sm"
  };
  
  return (
    <span
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;