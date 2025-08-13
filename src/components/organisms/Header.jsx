import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  tasksToday = 0, 
  completedToday = 0,
  className = "" 
}) => {
  const completionPercentage = tasksToday > 0 ? Math.round((completedToday / tasksToday) * 100) : 0;

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left side - Search */}
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search your tasks..."
            />
          </div>

          {/* Right side - Stats and Actions */}
          <div className="flex items-center gap-6">
            {/* Today's Progress */}
            <motion.div 
              className="hidden md:flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray={87.96}
                      strokeDashoffset={87.96 - (87.96 * completionPercentage) / 100}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-700">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-800">Today's Progress</p>
                  <p className="text-xs text-primary-600">
                    {completedToday} of {tasksToday} tasks
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="small" title="View Calendar">
                <ApperIcon name="Calendar" className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="small" title="Settings">
                <ApperIcon name="Settings" className="w-4 h-4" />
              </Button>
              <Button variant="primary" size="small" className="hidden md:flex">
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;