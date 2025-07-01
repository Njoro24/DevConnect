import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Twitter, Linkedin, Link } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate(); // Replace the demo function
  const { login } = useAuth();   // Replace the demo function

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (err) {
        console.warn('⚠️ Invalid JSON from server:', raw);
      }

      if (response.ok && data.user && data.access_token) {
        const result = await login(data.user, data.access_token);
        if (result.success) {
          navigate('/');
        } else {
          setErrors({ general: 'Login failed. Please try again.' });
        }
      } else {
        setErrors({ general: data.message || 'Invalid email or password' });
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Link className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">DevConnect</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Jobs</a>
          <a href="#" className="hover:text-white transition-colors">Job Details</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </nav>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-slate-800/90 border border-slate-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
                <Link className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">Sign in to your DevConnect account</p>
            </div>

            {/* Error message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm">
                {errors.general}
              </div>
            )}

            {/* Login form */}
            <div className="space-y-6" onKeyPress={handleKeyPress}>
              {/* Email field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'email'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'password' ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'password'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500/50 focus:ring-2" 
                  />
                  <span className="text-gray-300">Remember me</span>
                </label>
                <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full group relative bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-slate-600/50"></div>
              <span className="px-4 text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 border-t border-slate-600/50"></div>
            </div>

            {/* Social login */}
            <div className="flex space-x-3">
              {[
                { icon: Github, name: 'GitHub' },
                { icon: Twitter, name: 'Twitter' },
                { icon: Linkedin, name: 'LinkedIn' }
              ].map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  type="button"
                  className="flex-1 flex items-center justify-center py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-gray-300 hover:bg-slate-700/70 hover:border-slate-500/50 transition-all duration-200 transform hover:scale-105"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Register link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Create one now
                </button>
              </p>
            </div>
          </div>

          {/* Back to home link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to DevConnect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;