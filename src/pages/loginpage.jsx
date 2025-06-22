import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        const result = await login(data.user, data.token);
        if (result.success) navigate('/');
      } else {
        setErrors({ general: data.message || 'Login failed' });
      }
    } catch {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => navigate('/register');

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Welcome to DevConnect</h2>
            <p className="mt-3 text-base text-gray-500 font-medium">Sign in to your account</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm animate-fade-in">
              {errors.general}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.email ? 'border-red-300' : ''
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.password ? 'border-red-300' : ''
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">
              Don't have an account?{' '}
              <button
                onClick={handleRegisterClick}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Updated Image */}
      <div className="hidden md:block relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1733317391601-b1651d6d4be9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default LoginPage;