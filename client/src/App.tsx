import React, { useState } from 'react';
import './App.css';
import Task from './Tasks/Task';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-3xl font-bold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return isLogin ? (
      <Login onSwitchToRegister={() => setIsLogin(false)} />
    ) : (
      <Register onSwitchToLogin={() => setIsLogin(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <Task />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
