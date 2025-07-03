import React, { useState, useEffect } from 'react';
import { Search, Filter, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilter from './components/TaskFilter';
import { getStoredData, setStoredData } from './utils/localStorage';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping']);

  useEffect(() => {
    const storedUser = getStoredData('username');
    const storedTasks = getStoredData('tasks') || [];
    const storedDarkMode = getStoredData('darkMode');
    
    if (storedUser) setUser(storedUser);
    if (storedTasks.length > 0) setTasks(storedTasks);
    if (storedDarkMode !== null) setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    setStoredData('tasks', tasks);
    setStoredData('darkMode', darkMode);
  }, [tasks, darkMode]);

  useEffect(() => {
    let filtered = tasks;

    if (activeFilter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (activeFilter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered = filtered.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    setFilteredTasks(filtered);
  }, [tasks, activeFilter, searchTerm]);

  const handleLogin = (username) => {
    setUser(username);
    setStoredData('username', username);
  };

  const handleLogout = () => {
    setUser(null);
    setStoredData('username', null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || '',
      tags: taskData.tags || [],
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  if (!user) {
    return <Login onLogin={handleLogin} darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg shadow-md p-6 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold">Task Tracker</h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome back, {user}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className={`rounded-lg shadow-md p-4 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
            />
          </div>
        </div>

        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
          darkMode={darkMode}
        />

        <TaskForm
          onAddTask={addTask}
          editingTask={editingTask}
          onUpdateTask={updateTask}
          onCancelEdit={cancelEdit}
          categories={categories}
          darkMode={darkMode}
        />

        <AnimatePresence>
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-lg border text-center py-16 ${darkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              >
                <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium">
                  {searchTerm ? 'No tasks match your search.' : 'No tasks found.'}
                </p>
                <p className="text-base mt-2">
                  {searchTerm ? 'Try adjusting your search term.' : 'Create your first task above!'}
                </p>
              </motion.div>
            ) : (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onDeleteTask={deleteTask}
                  onEditTask={editTask}
                  darkMode={darkMode}
                />
              ))
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;