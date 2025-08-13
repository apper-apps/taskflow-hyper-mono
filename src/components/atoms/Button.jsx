import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className = "", 
  variant = "primary", 
  size = "default", 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-md hover:shadow-lg focus:ring-primary-500 transform hover:scale-[1.02] hover:-translate-y-0.5",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary-500 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg focus:ring-red-500 transform hover:scale-[1.02] hover:-translate-y-0.5",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-500 transform hover:scale-[1.02] hover:-translate-y-0.5"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    default: "px-4 py-2.5 text-sm",
    large: "px-6 py-3 text-base"
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;