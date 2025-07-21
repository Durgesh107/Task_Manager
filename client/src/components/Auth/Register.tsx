import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '../../generated/graphql';
import { toast, ToastContainer } from 'react-toastify';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  onSwitchToLogin: () => void; 
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => { 
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [register, { loading }] = useRegisterMutation();
  const { refetchUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await register({
        variables: {
          input: {
            email: formData.email,
            username: formData.username,
            password: formData.password
          }
        }
      });
      
      toast.success('Registration successful!');
      refetchUser();
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          />
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`w-full p-4 rounded-lg font-bold text-white transition-all duration-300 ${
            loading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <span className="text-gray-400">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin} 
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Sign In
          </button>
        </motion.div>
      </form>
      <ToastContainer />
    </AuthLayout>
  );
};

export default Register;
