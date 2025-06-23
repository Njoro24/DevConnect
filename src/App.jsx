// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/homepage.jsx';
import JobsPage from './pages/jobspage.jsx'
import JobDetailsPage from './pages/jobdetailspage.jsx'
import RegisterPage from './pages/registerpage.jsx'

const App = () => {
  return (
    <Routes> {/* Routes must be a direct child of a Router */}
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App