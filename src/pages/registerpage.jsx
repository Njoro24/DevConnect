import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { User, Mail, Lock, ArrowRight, Github, Twitter, Linkedin, Link, UserCheck, FileText } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.error || 'Registration failed' });
      }
    } catch (err) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
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

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Register Card */}
          <div className="bg-slate-800/90 border border-slate-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Join DevConnect
              </h1>
              <p className="text-gray-400">Create your account and start connecting</p>
            </div>

            {/* Error message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm">
                {errors.general}
              </div>
            )}

            {/* Register form */}
            <form className="space-y-6" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
              {/* Name field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'name' ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'name'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

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
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'password'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                    placeholder="Create a strong password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Role field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('role')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-4 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                      errors.role 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'role'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                  >
                    <option value="" className="bg-slate-700 text-gray-400">Select your role</option>
                    <option value="developer" className="bg-slate-700 text-white">Developer</option>
                    <option value="recruiter" className="bg-slate-700 text-white">Recruiter</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              {/* Bio field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                    <FileText className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'bio' ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                  </div>
                  <textarea
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('bio')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      errors.bio 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : focusedField === 'bio'
                        ? 'border-blue-500/50 focus:ring-blue-500/50 bg-slate-700/70'
                        : 'border-slate-600/50 hover:border-slate-500/50'
                    }`}
                    placeholder="Tell us about yourself and your experience..."
                  />
                </div>
                {errors.bio && (
                  <p className="mt-2 text-sm text-red-400">{errors.bio}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </button>
            </form>

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

            {/* Login link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign in
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

export default RegisterPage;