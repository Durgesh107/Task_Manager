import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {title}
        </motion.h2>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
