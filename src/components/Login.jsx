import React, { useState } from 'react';
import { User } from 'lucide-react';
import { setStoredData } from '../utils/localStorage';
import { motion } from 'framer-motion';

const Login = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setStoredData('username', username.trim());
      onLogin(username.trim());
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md p-8 rounded-xl shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="text-center mb-8">
          <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
            <User className="text-white w-8 h-8" />
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Task Tracker</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enter your username to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border`}
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;