import React, { useEffect, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Building, CheckCircle } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 text-custom-text bg-custom-dark bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-gray-400 mt-2">Error: {this.state.error.message}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="mt-4 px-4 py-2 bg-neon-blue text-custom-light rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Back to Jobs
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const JobDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    responsibilities: ['No responsibilities listed'],
    requirements: ['No requirements listed'],
    companyLogo: 'https://via.placeholder.com/50x50',
  };

  useEffect(() => {
    console.log('Job data:', job); // Debug log to check job structure
    if (!job) {
      toast.error('Job details not found!', { autoClose: 2000 });
      navigate('/jobs');
    }
  }, [job, navigate]);

  const handleApply = () => {
    toast.success(`Applied to ${job.title} successfully!`, { autoClose: 3000 });
    // Add your apply logic here (e.g., API call)
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-custom-dark relative overflow-hidden text-custom-text">
        {/* Removed gradient and background image for plain color */}

        <header className="relative z-10 bg-custom-dark bg-opacity-80 backdrop-blur-md shadow-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-custom-text rounded-lg hover:bg-gray-700 transition-all duration-300 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </button>
          </div>
        </header>

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-custom-light bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-custom-text mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-5 h-5" />
                    {job.company}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
              </div>
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover ring-2 ring-gray-700 shadow-md"
              />
            </div>

            <p className="text-gray-500 mb-6">{job.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-5 h-5 text-neon-purple" />
                <span>{new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Users className="w-5 h-5 text-neon-purple" />
                <span>{job.applicantCount} applicants</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-custom-text mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-500">
                {(job.responsibilities || ['No responsibilities listed']).map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-custom-text mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-gray-500">
                {(job.requirements || ['No requirements listed']).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleApply}
              className="w-full px-6 py-3 bg-neon-blue text-custom-light rounded-lg hover:bg-blue-700 transition-all duration-300 drop-shadow-neon-glow font-medium"
            >
              Apply for this Job
            </button>
          </div>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </ErrorBoundary>
  );
};

export default JobDetailPage;