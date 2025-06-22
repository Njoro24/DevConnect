import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const Navbar = () => {
  const { isAuthenticated, logout, getUserName } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 rounded-b-2xl border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 48 48"
              className="text-blue-700"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.319 14.318c-1.397-.295-1.905-1.712-1.22-2.965c2.923-5.349 6.424-8.2 8.382-9.484a2.74 2.74 0 0 1 3.038 0c1.958 1.285 5.459 4.135 8.382 9.484c.685 1.253.177 2.67-1.22 2.965c-1.647.347-4.355.682-8.681.682s-7.034-.335-8.681-.682m23.784 13.3c.91-1.003 2.266-.728 3.017.413c3.453 5.246 4.525 9.676 4.852 12.151c.176 1.328-.492 2.552-1.667 3.055c-2.19.938-6.355 2.17-12.376 1.631c-1.31-.117-2.213-1.221-1.847-2.556c.43-1.57 1.366-4.046 3.38-7.733c2.012-3.687 3.572-5.782 4.641-6.961M5.88 28.03c.75-1.14 2.107-1.416 3.017-.413c1.07 1.179 2.63 3.274 4.642 6.961s2.948 6.164 3.379 7.733c.366 1.335-.537 2.439-1.847 2.556c-6.021.54-10.186-.693-12.376-1.631c-1.175-.503-1.843-1.727-1.667-3.055c.327-2.475 1.4-6.905 4.852-12.15M24 17.5c-1.9 0-3.517-.063-4.89-.165c.264 2.844.591 6.132.938 9.027a358 358 0 0 0-6.708 2.999a57 57 0 0 1 2.393 4.02a57 57 0 0 1 2.207 4.457a377 377 0 0 0 5.66-4.088c2.066 1.526 4.3 3.127 6.273 4.522c.577-1.367 1.353-2.985 2.394-4.891a58 58 0 0 1 2.209-3.738a389 389 0 0 0-6.565-2.95c.362-2.974.705-6.406.978-9.359A66 66 0 0 1 24 17.5"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
              DevConnect
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8 text-base font-medium">
            {isAuthenticated ? (
              <>
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/jobdetails" className="nav-link">Job Details</Link>
                <span className="text-gray-800 font-semibold">{getUserName()}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link
                  to="/register"
                  className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hover underline styling */}
      <style>
        {`
          .nav-link {
            position: relative;
            color: #1f2937; /* text-gray-800 */
            padding: 6px 12px;
            border-radius: 9999px;
            transition: all 0.3s ease;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0%;
            height: 3px;
            left: 12%;
            bottom: -3px;
            background-color: #1d4ed8; /* blue-700 */
            border-radius: 9999px;
            transition: width 0.3s ease;
          }

          .nav-link:hover {
            background-color: #e0f2fe;
            color: #1d4ed8;
          }

          .nav-link:hover::after {
            width: 75%;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
