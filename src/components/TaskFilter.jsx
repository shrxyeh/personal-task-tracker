import React from 'react';
import { motion } from 'framer-motion';

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts, darkMode }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg shadow-md p-4 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
    >
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeFilter === filter.key
                ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskFilter;