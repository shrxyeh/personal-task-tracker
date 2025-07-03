import React, { useState, useEffect } from 'react';
import { Plus, X, Tag as TagIcon, Flag, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit, categories, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority || 'medium');
      setDueDate(editingTask.dueDate || '');
      setTags(editingTask.tags || []);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setNewTag('');
    setSelectedCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        tags: selectedCategory ? [...tags, selectedCategory] : tags
      };
      
      if (editingTask) {
        onUpdateTask(editingTask.id, taskData);
      } else {
        onAddTask(taskData);
      }
      
      resetForm();
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg shadow-md p-6 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
    >
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows="3"
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add custom tag"
              className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
            />
            <button
              type="button"
              onClick={addTag}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-200 text-blue-600 hover:bg-gray-300'}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <div
                  key={tag}
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  <TagIcon className="w-4 h-4 mr-1" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingTask ? 'Update Task' : 'Add Task'}</span>
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;