// src/App.jsx
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobDetailsPage from './pages/jobdetailspage'; 
import JobsPage from './pages/jobspage';             
import NotFound from './pages/Notfound';
import defaultJobs from './data/samplejobs';        

function App() {
  return (
    <div className="App min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobsPage jobs={defaultJobs} />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;