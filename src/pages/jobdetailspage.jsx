import React, { useEffect, Component } from 'react';
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
} from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 text-white bg-red-900 bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-gray-300 mt-2">Error: {this.state.error.message}</p>
          <button
            onClick={() => window.location.href = '/jobs'}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all duration-300"
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
    console.log('Job data:', job);
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
      <div className="min-h-screen bg-[#1e1e2f] text-white relative overflow-hidden">
        <header className="bg-[#232334] border-b border-gray-700 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-[#2a2a3f] bg-opacity-95 rounded-xl shadow-xl p-6 border border-gray-600">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-5 h-5" />
                    {job.company}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-sky-800 text-sky-200 rounded-full text-xs font-medium">
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

            <p className="text-gray-300 mb-6">{job.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <DollarSign className="w-5 h-5 text-yellow-300" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>{job.applicantCount} applicants</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-300">
                {(job.responsibilities || ['No responsibilities listed']).map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-gray-300">
                {(job.requirements || ['No requirements listed']).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleApply}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg"
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
