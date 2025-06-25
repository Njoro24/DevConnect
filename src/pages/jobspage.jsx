import '../index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jobAPI } from '../services/api';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building2,
  Filter,
  Star,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import defaultJobs from '../data/samplejobs';

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch jobs from backend when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobAPI.getAllJobs();
      setJobs(response.data);
      toast.success('Jobs loaded successfully!', { autoClose: 2000 });
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs from server');
      // Fallback to default jobs if backend fails
      setJobs(defaultJobs);
      toast.error('Failed to load jobs from server. Showing sample data.', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !locationFilter || 
      job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = !typeFilter || job.type === typeFilter;
    
    const matchesRemote = !remoteFilter || 
      (remoteFilter === 'remote' && job.remote) ||
      (remoteFilter === 'on-site' && !job.remote);

    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  const getStatusBadge = (status, priority) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold transition-all";
    
    if (priority === 'urgent') {
      return `${baseClasses} bg-red-700 text-white border border-red-800`;
    }
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-600 text-white border border-green-700`;
      case 'closing-soon':
        return `${baseClasses} bg-yellow-500 text-black border border-yellow-600`;
      default:
        return `${baseClasses} bg-gray-600 text-white border border-gray-700`;
    }
  };

  const getStatusText = (status, priority) => {
    if (priority === 'urgent') return 'Urgent';
    switch (status) {
      case 'active': return 'Active';
      case 'closing-soon': return 'Closing Soon';
      default: return 'Open';
    }
  };

  const handleJobClick = (job) => {
    toast.success(`Viewing details for ${job.title}`, { autoClose: 2000 });
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  const handleApply = async (job) => {
    try {
      // You can add API call here for job application
      // await jobAPI.applyToJob(job.id);
      toast.success(`Applied to ${job.title} successfully!`, { autoClose: 3000 });
    } catch (err) {
      toast.error('Failed to apply to job. Please try again.', { autoClose: 3000 });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setRemoteFilter('');
    toast.info('Filters cleared!', { autoClose: 2000 });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold">Loading Jobs...</h2>
          <p className="text-gray-300">Please wait while we fetch the latest opportunities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 text-white relative overflow-hidden">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-600 text-white p-3 text-center">
          <span>{error}</span>
          <button 
            onClick={fetchJobs}
            className="ml-4 px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition duration-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold drop-shadow-sm">Find Your Dream Job</h1>
            <p className="text-lg text-gray-300">Discover amazing opportunities from top companies</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-full focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gray-900 placeholder-gray-600"
              />
            </div>
            <button
              onClick={() => toast.success('Job alerts enabled!', { autoClose: 3000 })}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Get Job Alerts
            </button>
          </div>

          {/* Filter Section */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-700 rounded-full focus:ring-2 focus:ring-blue-400 bg-gray-900 placeholder-gray-600"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-full bg-gray-900 text-white"
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <select
              value={remoteFilter}
              onChange={(e) => setRemoteFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-full bg-gray-900 text-white"
            >
              <option value="">Work Style</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
              <button onClick={clearFilters} className="mt-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <div className="p-4">
            <h3 className="text-3xl font-bold text-blue-400">{jobs.length}</h3>
            <p className="text-gray-400">Jobs Available</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-purple-400">{187432}</h3>
            <p className="text-gray-400">Active Candidates</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-blue-400">{140312}</h3>
            <p className="text-gray-400">Positions Matched</p>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchJobs}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Refresh
            </button>
            <select className="px-4 py-2 border border-gray-700 rounded-full bg-gray-900 text-white">
              <option>Most Relevant</option>
              <option>Most Recent</option>
              <option>Salary: High to Low</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobClick(job)}
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-5 flex-1">
                    <img
                      src={job.companyLogo || job.company_logo || 'https://via.placeholder.com/50x50'}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={getStatusBadge(job.status, job.priority)}>
                          {getStatusText(job.status, job.priority)}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-medium">Remote</span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors duration-300">{job.title}</h3>

                      <div className="flex items-center gap-2 text-gray-400 mb-3">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">{job.company}</span>
                      </div>

                      <p className="text-gray-300 mb-4 text-base line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags?.slice(0, 4).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-sm hover:bg-gray-600 transition duration-200">
                            {tag}
                          </span>
                        ))}
                        {job.tags?.length > 4 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-500 rounded-full text-sm">+{job.tags.length - 4} more</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-5 h-5 text-blue-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <span>{job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recently posted'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-5 h-5 text-yellow-500" />
                          <span>{job.salary || 'Competitive'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-5 h-5 text-blue-500" />
                          <span>{job.applicantCount || job.applicant_count || 0} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                      className="p-2 text-gray-400 hover:text-green-400 transition duration-200"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <ChevronRight className="w-6 h-6 text-gray-400 hover:text-blue-400 transition duration-200" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-900 bg-opacity-80 rounded-xl shadow-lg">
              <div className="text-4xl mb-6 text-blue-400">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-3">No jobs found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-medium shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
};

export default JobsPage;