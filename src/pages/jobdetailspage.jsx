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

// Error Boundary Component using hooks
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

  // Mock similar jobs data
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
      <header className="relative z-10 bg-gray-900 bg-opacity-40 backdrop-blur-md shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 bg-opacity-60 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 hover:bg-opacity-80 transition-all duration-300 border border-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-5 h-5" />
                      {job.company}
                    </span>
                    {job.remote && (
                      <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-xs font-medium">
                        Remote
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={handleBookmark}
                    className="p-2 bg-gray-800 bg-opacity-60 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-gray-800 bg-opacity-60 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-600 shadow-lg bg-gray-800"
                  />
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <span className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <Users className="w-6 h-6 text-pink-400" />
                  <span className="font-medium">{job.applicantCount} applicants</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Responsibilities</h2>
                <div className="bg-gray-800 bg-opacity-40 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-300">
                    {(job.responsibilities || ['No responsibilities listed']).map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Requirements</h2>
                <div className="bg-gray-800 bg-opacity-40 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-300">
                    {(job.requirements || ['No requirements listed']).map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply for this Job
              </button>
            </div>
          </div>

          {/* Similar Jobs Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-gray-700 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Similar Jobs</h3>
                <button
                  onClick={() => navigate('/jobs')}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                >
                  View All
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    onClick={() => handleSimilarJobClick(similarJob)}
                    className="bg-gray-800 bg-opacity-50 rounded-lg p-4 cursor-pointer hover:bg-opacity-70 transition-all duration-300 border border-gray-700 hover:border-gray-600 group"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={similarJob.logo}
                        alt={`${similarJob.company} logo`}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1 truncate group-hover:text-cyan-300 transition-colors duration-300">
                          {similarJob.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2">{similarJob.company}</p>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{similarJob.location}</span>
                          {similarJob.remote && (
                            <span className="px-2 py-0.5 bg-blue-600 text-blue-100 rounded text-xs">Remote</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-400 font-medium">{similarJob.salary}</span>
                          <span className="text-gray-500">{similarJob.applicantCount} applicants</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => navigate('/jobs')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                >
                  Explore More Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

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