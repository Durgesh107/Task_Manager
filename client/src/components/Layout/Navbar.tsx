import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.tsx';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border-b border-gray-700 px-6 py-4"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Task Manager
        </motion.div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-300">
            Welcome, <span className="text-purple-400 font-medium">{user.username}</span>
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
