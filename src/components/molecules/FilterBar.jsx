import React from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  categories = [], 
  className = "" 
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      category: "all",
      priority: "all"
    });
  };

  const hasActiveFilters = filters.status !== "all" || filters.category !== "all" || filters.priority !== "all";

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <ApperIcon name="Filter" className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[120px]">
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="min-w-[140px]">
            <Select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.Id} value={category.Id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-w-[120px]">
            <Select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="small"
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-700"
            >
              <ApperIcon name="X" className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;