import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";

const QuickAddForm = ({ onAddTask, categories = [], className = "" }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    try {
      const newTask = {
        title: title.trim(),
        categoryId: categoryId || null,
        priority,
        dueDate: dueDate || null
      };

      await onAddTask(newTask);
      
      // Reset form
      setTitle("");
      setCategoryId("");
      setPriority("medium");
      setDueDate("");
      setIsExpanded(false);
      
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsExpanded(true)}
                className="text-base"
              />
            </div>
            <Button 
              type="submit" 
              variant="primary"
              disabled={!title.trim()}
              className="px-6"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Category">
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Priority">
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormField>

              <FormField label="Due Date">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormField>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="px-6 pb-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsExpanded(false)}
              className="text-sm"
            >
              <ApperIcon name="ChevronUp" className="w-4 h-4 mr-2" />
              Less options
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuickAddForm;