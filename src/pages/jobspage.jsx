import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building2,
  Filter,
  Star,
  Briefcase,
  ChevronRight
} from 'lucide-react';

const JobListPage = ({ jobs = [] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');

  // Filter jobs based on search criteria
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
      return `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
    }
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
      case 'closing-soon':
        return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
    }
  };

  const getStatusText = (status, priority) => {
    if (priority === 'urgent') return 'Urgent';
    
    switch (status) {
      case 'active':
        return 'Active';
      case 'closing-soon':
        return 'Closing Soon';
      default:
        return 'Open';
    }
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Find Your Dream Job</h1>
            <p className="text-lg text-gray-700">Discover amazing opportunities from top companies</p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-base bg-white shadow-sm text-gray-900"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 bg-white shadow-sm text-gray-900"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 bg-white shadow-sm text-gray-900"
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>

              <select
                value={remoteFilter}
                onChange={(e) => setRemoteFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 bg-white shadow-sm text-gray-900"
              >
                <option value="">Work Style</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-site</option>
              </select>

              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md">
                <Filter className="w-5 h-5" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-700 text-sm">
              {searchTerm && `Results for "${searchTerm}"`}
            </p>
          </div>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm text-gray-900">
            <option>Most Relevant</option>
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobClick(job.id)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-5 flex-1">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="w-14 h-14 rounded-lg object-cover ring-2 ring-white shadow-md"
                      />
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={getStatusBadge(job.status, job.priority)}>
                          {getStatusText(job.status, job.priority)}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Remote
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-700 mb-3">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium text-lg">{job.company}</span>
                      </div>

                      <p className="text-gray-800 mb-4 text-base line-clamp-2">
                        {job.description}
                      </p>

                      {/* Tags */}
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.slice(0, 4).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {job.tags.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                              +{job.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Job Meta */}
                      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-5 h-5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-5 h-5" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-5 h-5" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-5 h-5" />
                          <span>{job.applicantCount} applicants</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-5 h-5" />
                          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 ml-6">
                    <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                      <Star className="w-6 h-6" />
                    </button>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white/70 rounded-2xl shadow-lg">
              <div className="text-6xl mb-6 text-blue-500">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No jobs found</h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setTypeFilter('');
                  setRemoteFilter('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white/70 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium shadow-sm">
              Load More Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobListPage;
