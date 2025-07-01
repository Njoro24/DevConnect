import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/Authcontext';

import Layout from './components/layout/layout';
import PrivateRoute from './components/common/PrivateRoute';

import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ProfilePage from './pages/profilepage';
import JobsPage from './pages/jobspage';
import JobDetailsPage from './pages/jobdetailspage';
import NotFound from './pages/Notfound';

// PublicRoute wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <PrivateRoute>
                <JobDetailsPage />
              </PrivateRoute>
            }
          />

          {/* Redirect root aliases */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
