// src/App.jsx
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import JobDetailsPage from './pages/jobdetailspage';
import JobListPage from './pages/jobspage';
import NotFound from './pages/Notfound';

// Mock job listings
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
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobListPage jobs={jobListings} />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;