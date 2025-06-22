import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const JobsPage = ({ jobs = defaultJobs }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !locationFilter || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = !typeFilter || job.type === typeFilter;
    
    const matchesRemote = !remoteFilter || 
      (remoteFilter === 'remote' && job.remote) ||
      (remoteFilter === 'on-site' && !job.remote);

    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  const getStatusBadge = (status, priority) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    
    if (priority === 'urgent') {
      return `${baseClasses} bg-red-800 text-red-200 border border-red-900`;
    }
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-800 text-green-200 border border-green-900`;
      case 'closing-soon':
        return `${baseClasses} bg-yellow-800 text-yellow-200 border border-yellow-900`;
      default:
        return `${baseClasses} bg-gray-800 text-gray-200 border border-gray-900`;
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

  const handleApply = (job) => {
    toast.success(`Applied to ${job.title} successfully!`, { autoClose: 3000 });
    // Add your apply logic here
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setRemoteFilter('');
    toast.info('Filters cleared!', { autoClose: 2000 });
  };

  return (
    <div className="min-h-screen animated-background relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10 z-0"></div>

      {/* Header */}
      <header className="relative z-10 bg-dark-purple bg-opacity-80 backdrop-blur-md shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold drop-shadow-neon-glow">Find Your Dream Job</h1>
            <p className="text-lg text-gray-300">Discover amazing opportunities from top companies</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300 text-base bg-gray-800 text-white placeholder-gray-500 shadow-md"
              />
            </div>
            <button
              onClick={() => toast.success('Job alerts enabled!', { autoClose: 2000 })}
              className="px-6 py-3 bg-neon-purple text-white rounded-xl hover:bg-purple-700 transition-all duration-300 drop-shadow-neon-glow"
            >
              Get Job Alerts
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-gray-800 text-white placeholder-gray-500 shadow-md"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-gray-800 text-white placeholder-gray-500 shadow-md"
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <select
              value={remoteFilter}
              onChange={(e) => setRemoteFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-gray-800 text-white placeholder-gray-500 shadow-md"
            >
              <option value="">Work Style</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-neon-blue text-white rounded-xl hover:bg-blue-700 transition-all duration-300 drop-shadow-neon-glow"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg shadow-lg">
              {/* Additional filters can go here */}
              <button onClick={clearFilters} className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
          <div className="p-4">
            <h3 className="text-3xl font-bold text-neon-blue drop-shadow-neon-glow">123,012</h3>
            <p className="text-gray-400">Jobs Added</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-neon-purple drop-shadow-neon-glow">187,432</h3>
            <p className="text-gray-400">Active Candidates</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-bold text-neon-blue drop-shadow-neon-glow">140,312</h3>
            <p className="text-gray-400">Positions Matched</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
          </h2>
          <select className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md">
            <option>Most Relevant</option>
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
          </select>
        </div>

        {/* Job Categories */}
        <section className="mb-8 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Popular Job Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Technology', 'Construction', 'Automotive', 'Accounting', 'Healthcare', 'Marketing'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobClick(job)}
                className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-5 flex-1">
                    <img
                      src={job.companyLogo || 'https://via.placeholder.com/50x50'}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 rounded-lg object-cover ring-2 ring-gray-900 shadow-md"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={getStatusBadge(job.status, job.priority)}>
                          {getStatusText(job.status, job.priority)}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">
                            Remote
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 hover:text-neon-blue transition-colors duration-300">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-400 mb-3">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">{job.company}</span>
                      </div>

                      <p className="text-gray-300 mb-4 text-base line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags?.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-sm hover:bg-gray-600 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags?.length > 4 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-500 rounded-full text-sm">
                            +{job.tags.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-5 h-5 text-neon-blue" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-5 h-5 text-neon-purple" />
                          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-5 h-5 text-yellow-400" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-5 h-5 text-neon-purple" />
                          <span>{job.applicantCount} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <ChevronRight className="w-6 h-6 text-gray-400 hover:text-neon-blue transition-colors duration-200" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-900 bg-opacity-80 rounded-xl shadow-lg">
              <div className="text-4xl mb-6 text-neon-blue">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-3">No jobs found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-md"
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
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default JobsPage;
