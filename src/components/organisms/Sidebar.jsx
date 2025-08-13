import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import CategoryItem from "@/components/molecules/CategoryItem";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import categoryService from "@/services/api/categoryService";

const Sidebar = ({ 
  selectedCategoryId, 
  onCategorySelect, 
  className = "" 
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white border-r border-gray-200 p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white border-r border-gray-200 p-6 ${className}`}>
        <Error message={error} onRetry={loadCategories} />
      </div>
    );
  }

  return (
    <motion.div 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-80"
      } ${className}`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 320 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl text-gray-900">TaskFlow</h1>
                  <p className="text-xs text-gray-500">Smart task management</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex-shrink-0"
          >
            <ApperIcon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              className="w-4 h-4" 
            />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          {/* All Tasks */}
          <div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
                >
                  Overview
                </motion.h3>
              )}
            </AnimatePresence>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategorySelect(null)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                !selectedCategoryId 
                  ? "bg-gradient-to-r from-primary-100 to-primary-200 border border-primary-300 text-primary-800" 
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <ApperIcon 
                name="List" 
                className={`w-4 h-4 flex-shrink-0 ${
                  !selectedCategoryId ? "text-primary-600" : "text-gray-500"
                }`} 
              />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    All Tasks
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
                  >
                    Categories
                  </motion.h3>
                )}
              </AnimatePresence>
              
              <div className="space-y-2">
                <AnimatePresence>
                  {categories.map((category) => (
                    <motion.div
                      key={category.Id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {isCollapsed ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onCategorySelect(category.Id)}
                          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                            selectedCategoryId === category.Id
                              ? "bg-gradient-to-r from-primary-100 to-primary-200 border border-primary-300" 
                              : "hover:bg-gray-100"
                          }`}
                          title={category.name}
                        >
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                        </motion.button>
                      ) : (
                        <CategoryItem
                          category={category}
                          isActive={selectedCategoryId === category.Id}
                          onClick={onCategorySelect}
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 border-t border-gray-100"
          >
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ApperIcon name="Heart" className="w-4 h-4 text-red-400" />
              <span>Made with care for productivity</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;