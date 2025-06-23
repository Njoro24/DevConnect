import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/Authcontext';

// Layout components
import Layout from './components/layout/layout';
import PrivateRoute from './components/common/PrivateRoute';

// Create PublicRoute component for routes that should only be accessible when not authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

// Page components
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ProfilePage from './pages/profilepage';
import JobsPage from './pages/jobspage';
import JobDetailsPage from './pages/jobdetailspage';
import NotFound from './pages/Notfound';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Layout>
        <Routes>
          {/* Public Routes - accessible without authentication */}
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

          {/* Protected Routes - require authentication */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
feature/profile-footer
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/profile/:userId" 
          element={
            <PrivateRoute>
              <Layout>

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

          {/* Redirect root to home if authenticated, otherwise to login */}
          <Route 
            path="/home" 
            element={<Navigate to="/" replace />} 
          />

          {/* 404 route - should be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      
      {/* Toast Container - should be outside Layout but inside main div */}
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