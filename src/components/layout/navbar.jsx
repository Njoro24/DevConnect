import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Get user name from localStorage
  const getUserName = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedUserName = localStorage.getItem('userName');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return userData.name || userData.firstName || userData.username || userData.email || 'User';
      }
      
      if (storedUserName) {
        return storedUserName;
      }
      
      return 'User';
    } catch (error) {
      console.log('Error getting user name:', error);
      return 'User';
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear all stored data
      localStorage.clear();
      sessionStorage.clear();
      
      // Small delay to show loading state
      setTimeout(() => {
        setIsLoggingOut(false);
        navigate('/login', { replace: true });
      }, 1000);
      
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoggingOut(false);
      // Force navigation even if there's an error
      navigate('/login', { replace: true });
    }
  };

  const userName = getUserName();

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-blue-500 text-2xl">🔗</div>
            <span className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              DevConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/jobs" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Jobs
            </Link>
            <Link 
              to="/job-details" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Job Details
            </Link>
            
            {/* User Profile Button */}
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <User size={16} />
              {userName}
            </button>
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isLoggingOut 
                  ? 'bg-red-400 text-white cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  Sign Out
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/jobs"
                className="block px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/job-details"
                className="block px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Details
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/profile');
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium transition-colors"
              >
                <User size={16} />
                {userName}
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
                disabled={isLoggingOut}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isLoggingOut 
                    ? 'text-red-400 cursor-not-allowed' 
                    : 'text-red-400 hover:text-red-300'
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full"></div>
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut size={16} />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;