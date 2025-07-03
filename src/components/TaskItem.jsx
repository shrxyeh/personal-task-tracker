import React, { useState } from 'react';
import { Check, Edit2, Trash2, Flag, Tag as TagIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask, darkMode }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const priorityColors = {
    high: 'red',
    medium: 'yellow',
    low: 'green'
  };

  const priorityIcons = {
    high: <Flag className="w-4 h-4 text-red-500" />,
    medium: <Flag className="w-4 h-4 text-yellow-500" />,
    low: <Flag className="w-4 h-4 text-green-500" />
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg shadow-md p-4 mb-4 border-l-4 transition-all duration-200 ${
        task.completed 
          ? `${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-gray-400`
          : `border-${priorityColors[task.priority]}-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : `border-${priorityColors[task.priority]}-500 hover:border-${priorityColors[task.priority]}-700`
            }`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              {priorityIcons[task.priority]}
              <h3 className={`font-medium ${task.completed ? 'line-through' : ''} ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {task.title}
              </h3>
            </div>
            
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? (darkMode ? 'text-gray-500' : 'text-gray-400') : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                {task.description}
              </p>
            )}
            
            {(task.dueDate || task.tags?.length > 0) && (
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {task.dueDate && (
                  <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(parseISO(task.dueDate), 'MMM dd, yyyy')}
                  </div>
                )}
                
                {task.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs flex items-center ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEditTask(task)}
            className={`p-1 rounded-full ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-gray-200'}`}
            title="Edit task"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className={`p-1 rounded-full ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-200'}`}
            title="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
        >
          <p className={`text-sm mb-3 ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
            Are you sure you want to delete this task?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;