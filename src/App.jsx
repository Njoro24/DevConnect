import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/Authcontext';

// Layout components
import Layout from './components/layout/layout';
import PrivateRoute from './components/common/PrivateRoute';

// Page components
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ProfilePage from './pages/profilepage';
import JobsPage from './pages/jobspage';
import JobDetailsPage from './pages/jobdetailspage';

// CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes - these don't need authentication */}
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
        
        {/* Protected Routes - these need authentication */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Layout>
                <HomePage />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/profile/:userId" 
          element={
            <PrivateRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/jobs" 
          element={
            <PrivateRoute>
              <Layout>
                <JobsPage />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/jobs/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <JobDetailsPage />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// Public Route component - redirects to home if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default App;
