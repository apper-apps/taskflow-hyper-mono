import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className = "", 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";
  const errorClasses = "border-red-300 focus:ring-red-500";
  
  return (
    <input
      type={type}
      className={cn(baseClasses, error && errorClasses, className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;