import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

// Error Boundary using hooks
const useErrorBoundary = () => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resetErrorBoundary = () => {
    setHasError(false);
    setError(null);
  };

  return { hasError, error, setHasError, setError, resetErrorBoundary };
};

const JobDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasError, error, setHasError, setError } = useErrorBoundary();

  const job = location.state?.job || {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    remote: true,
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    applicantCount: 45,
    postedDate: '2025-06-18',
    description: 'We are looking for an experienced frontend developer to build responsive web applications using React and modern JavaScript frameworks.',
    responsibilities: [
      'Develop and maintain responsive web applications using React.js',
      'Collaborate with UI/UX designers to implement pixel-perfect designs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers'
    ],
    requirements: [
      '5+ years of experience with React.js and modern JavaScript',
      'Strong understanding of HTML5, CSS3, and responsive design',
      'Experience with state management libraries (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Bachelor\'s degree in Computer Science or equivalent experience'
    ],
    companyLogo: 'https://via.placeholder.com/50x50',
  };

  const similarJobs = [
    {
      id: 2,
      title: 'React Developer',
      company: 'StartupCo',
      salary: '$100,000 - $140,000',
      location: 'Remote',
      remote: true,
      applicantCount: 23,
      postedDate: '2025-06-19',
      logo: 'https://via.placeholder.com/40x40'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      salary: '$130,000 - $170,000',
      location: 'New York, NY',
      remote: false,
      applicantCount: 67,
      postedDate: '2025-06-17',
      logo: 'https://via.placeholder.com/40x40'
    },
    {
      id: 4,
      title: 'JavaScript Engineer',
      company: 'WebSolutions',
      salary: '$110,000 - $150,000',
      location: 'Austin, TX',
      remote: true,
      applicantCount: 34,
      postedDate: '2025-06-16',
      logo: 'https://via.placeholder.com/40x40'
    },
    {
      id: 5,
      title: 'Frontend Architect',
      company: 'BigTech Corp',
      salary: '$150,000 - $200,000',
      location: 'Seattle, WA',
      remote: false,
      applicantCount: 89,
      postedDate: '2025-06-15',
      logo: 'https://via.placeholder.com/40x40'
    }
  ];

  useEffect(() => {
    if (!job) {
      toast.error('Job details not found!', { autoClose: 2000 });
      navigate('/jobs');
    }
  }, [job, navigate]);

  const handleApply = () => {
    toast.success(`Applied to ${job.title} successfully!`, { autoClose: 3000 });
  };

  const handleSimilarJobClick = (similarJob) => {
    navigate('/job-details', { state: { job: similarJob } });
  };

  const handleBookmark = () => {
    toast.info('Job bookmarked!', { autoClose: 2000 });
  };

  const handleShare = () => {
    toast.info('Job link copied to clipboard!', { autoClose: 2000 });
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center py-12 text-white bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-gray-300 mt-2">Error: {error.message}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* your full JSX structure continues... */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.3)',
        }}
      />
    </div>
  );
};

export default JobDetailPage;