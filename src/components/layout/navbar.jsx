import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const Navbar = () => {
  const { isAuthenticated, logout, getUserName } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          DevConnect
        </Link>

        {/* Nav Links */}
        <div className="space-x-4 text-sm">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                {getUserName()}
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
                Jobs
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
