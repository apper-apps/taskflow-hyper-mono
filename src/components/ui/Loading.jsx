import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {/* Quick add form skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Task cards skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full mt-1"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;