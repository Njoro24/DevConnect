dev
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
=======
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobDetailsPage from './pages/jobdetailspage';
import JobListPage from './pages/jobspage';
import NotFound from './pages/Notfound';


// Mock job listings for the job list page
const jobListings = [
  {
    id: 'frontend-developer-tech-corp',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: true,
    salary: '$120,000 - $160,000',
    postedDate: '2024-01-15',
    applicantCount: 47,
    status: 'active',
    priority: 'urgent',
    companyLogo: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=TC',
    tags: ['React', 'JavaScript', 'CSS', 'Node.js'],
    description: 'We are seeking a passionate Senior Frontend Developer to join our innovative team...'
  },
  {
    id: 'backend-engineer-data-systems',
    title: 'Backend Engineer',
    company: 'DataSystems Inc',
    location: 'New York, NY',
    type: 'Full-time',
    remote: false,
    salary: '$110,000 - $140,000',
    postedDate: '2024-01-12',
    applicantCount: 23,
    status: 'active',
    priority: 'normal',
    companyLogo: 'https://via.placeholder.com/80x80/10B981/FFFFFF?text=DS',
    tags: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    description: 'Join our backend team to build scalable data processing systems...'
  },
  {
    id: 'ui-ux-designer-creative-labs',
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    location: 'Los Angeles, CA',
    type: 'Contract',
    remote: true,
    salary: '$80,000 - $100,000',
    postedDate: '2024-01-10',
    applicantCount: 35,
    status: 'closing-soon',
    priority: 'normal',
    companyLogo: 'https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=CL',
    tags: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
    description: 'Design beautiful and intuitive user experiences for our mobile and web applications...'
  }
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to jobs list */}
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          
          {/* Jobs list page */}
          <Route 
            path="/jobs" 
            element={<JobListPage jobs={jobListings} />} 
          />
          
          {/* Job details page */}
          <Route 
            path="/jobs/:id" 
            element={<JobDetailsPage />} 
          />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
main
}

export default App;