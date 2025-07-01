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
  ChevronRight,
  CheckCircle,
  Briefcase,
  Globe,
  UsersRound,
  X,
  Heart,
  BookmarkPlus,
  Send,
  Linkedin,
  Mail,
  FileText,
  User,
} from 'lucide-react';
import defaultJobs from '../data/samplejobs';

// Application Modal Component
const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    linkedinUrl: '',
    coverLetter: '',
    fullName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.fullName) {
      toast.error('Please fill in all required fields', { autoClose: 3000 });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', { autoClose: 3000 });
      return;
    }

    // LinkedIn URL validation (if provided)
    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) {
      toast.error('Please enter a valid LinkedIn URL', { autoClose: 3000 });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit({
        ...formData,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedAt: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        email: '',
        linkedinUrl: '',
        coverLetter: '',
        fullName: ''
      });
      
      onClose();
      toast.success(`Successfully applied to ${job.title} at ${job.company}!`, { 
        autoClose: 4000,
        icon: <CheckCircle className="w-5 h-5" />
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.', { autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-start gap-4">
            <img
              src={job?.companyLogo || 'https://via.placeholder.com/60x60'}
              alt={`${job?.company} logo`}
              className="w-12 h-12 rounded-xl object-cover border border-gray-600/50"
            />
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Apply for {job?.title}</h2>
              <p className="text-gray-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {job?.company} • {job?.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">Optional but recommended</p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Optional - help stand out from other candidates</p>
          </div>

          {/* Job Details Summary */}
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Application Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Position:</span>
                <p className="text-white font-medium">{job?.title}</p>
              </div>
              <div>
                <span className="text-gray-400">Company:</span>
                <p className="text-white font-medium">{job?.company}</p>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <p className="text-white font-medium">{job?.location}</p>
              </div>
              <div>
                <span className="text-gray-400">Salary:</span>
                <p className="text-white font-medium">{job?.salary}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-600/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <nav className="bg-gray-900 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-blue-500 text-2xl">🔗</div>
            <span className="text-xl font-bold text-white">DevConnect</span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/jobs" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Jobs
            </a>
            <a 
              href="/job-details" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Job Details
            </a>
            <a 
              href="/profile" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Meshack Njoroge
            </a>
          </div>
          {/* Sign Out Button */}
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

const JobsPage = ({ jobs = defaultJobs }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [applicationModal, setApplicationModal] = useState({
    isOpen: false,
    job: null
  });
  const [applications, setApplications] = useState([]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType = !typeFilter || job.type === typeFilter;

    const matchesRemote =
      !remoteFilter ||
      (remoteFilter === 'remote' && job.remote) ||
      (remoteFilter === 'on-site' && !job.remote);

    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  const getStatusBadge = (status, priority) => {
    const baseClasses = 'px-3 py-1.5 rounded-full text-xs font-semibold';

    if (priority === 'urgent') {
      return `${baseClasses} bg-red-900/20 text-red-400 border border-red-800/30`;
    }

    switch (status) {
      case 'active':
        return `${baseClasses} bg-blue-900/20 text-blue-400 border border-blue-800/30`;
      case 'closing-soon':
        return `${baseClasses} bg-orange-900/20 text-orange-400 border border-orange-800/30`;
      default:
        return `${baseClasses} bg-gray-800/50 text-gray-300 border border-gray-700/50`;
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

  const handleJobClick = (job) => {
    toast.success(`Viewing details for ${job.title}`, { autoClose: 2000 });
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  const handleApply = (job) => {
    setApplicationModal({
      isOpen: true,
      job: job
    });
  };

  const handleApplicationSubmit = (applicationData) => {
    setApplications(prev => [...prev, applicationData]);
    // You can also send this data to your backend API here
    console.log('Application submitted:', applicationData);
  };

  const handleCloseModal = () => {
    setApplicationModal({
      isOpen: false,
      job: null
    });
  };

  const handleSaveJob = (jobId, e) => {
    e.stopPropagation();
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast.info('Job removed from saved', { autoClose: 2000 });
    } else {
      newSavedJobs.add(jobId);
      toast.success('Job saved successfully!', { autoClose: 2000 });
    }
    setSavedJobs(newSavedJobs);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setRemoteFilter('');
    toast.info('Filters cleared!', { autoClose: 2000 });
  };

  const hasActiveFilters = searchTerm || locationFilter || typeFilter || remoteFilter;
  const hasAppliedToJob = (jobId) => applications.some(app => app.jobId === jobId);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <Navigation />

      {/* Dark Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover amazing opportunities from top companies around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base text-white placeholder-gray-400 backdrop-blur-sm hover:bg-gray-800/70"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 backdrop-blur-sm text-white"
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gray-800/50 border border-gray-600/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                >
                  <option value="">Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
                <select
                  value={remoteFilter}
                  onChange={(e) => setRemoteFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                >
                  <option value="">Work Style</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <button
                  onClick={() => toast.success('Job alerts enabled!', { autoClose: 2000 })}
                  className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Job Alerts
                </button>
              </div>
              {hasActiveFilters && (
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                        Search: {searchTerm}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {locationFilter && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                        Location: {locationFilter}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setLocationFilter('')} />
                      </span>
                    )}
                    {typeFilter && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                        Type: {typeFilter}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setTypeFilter('')} />
                      </span>
                    )}
                    {remoteFilter && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                        Style: {remoteFilter}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setRemoteFilter('')} />
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors font-medium"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-400 mt-1">Updated just now</p>
          </div>
          <select className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium backdrop-blur-sm">
            <option>Most Relevant</option>
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
            <option>Company A-Z</option>
          </select>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:bg-gray-700/50 hover:border-blue-500/30 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative">
                        <img
                          src={job.companyLogo || 'https://via.placeholder.com/60x60'}
                          alt={`${job.company} logo`}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-600/50"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={getStatusBadge(job.status, job.priority)}>
                            {getStatusText(job.status, job.priority)}
                          </span>
                          {job.remote && (
                            <span className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-xs font-semibold border border-green-800/30">
                              Remote
                            </span>
                          )}
                          {hasAppliedToJob(job.id) && (
                            <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-800/30 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Applied
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-300 mb-3">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags?.slice(0, 4).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-blue-600/20 hover:text-blue-400 transition-colors cursor-pointer border border-gray-600/30"
                            >
                              {tag}
                            </span>
                          ))}
                          {job.tags?.length > 4 && (
                            <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-sm border border-gray-600/30">
                              +{job.tags.length - 4} more
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>{job.applicantCount} applicants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => handleSaveJob(job.id, e)}
                        className={`p-2 rounded-xl transition-colors ${
                          savedJobs.has(job.id) 
                            ? 'text-red-400 hover:bg-red-900/20' 
                            : 'text-gray-500 hover:text-red-400 hover:bg-red-900/20'
                        }`}
                        title="Save job"
                      >
                        <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job);
                        }}
                        disabled={hasAppliedToJob(job.id)}
                        className={`px-4 py-2 rounded-xl transition-colors font-medium text-sm ${
                          hasAppliedToJob(job.id)
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {hasAppliedToJob(job.id) ? 'Applied' : 'Apply'}
                      </button>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-bold text-white mb-3">No jobs found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Dark Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* Top Companies */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Top Companies
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Innovexa Labs', info: 'AI & Robotics', jobs: '15 jobs', logo: '🚀' },
                  { name: 'Globex Corp', info: 'Remote-first', jobs: '8 jobs', logo: '🌍' },
                  { name: 'PeopleHub', info: 'HR Tech', jobs: '12 jobs', logo: '👥' },
                ].map((company, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer group"
                  >
                    <div className="text-2xl">{company.logo}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover:text-blue-400">{company.name}</p>
                      <p className="text-sm text-gray-400">{company.info} • {company.jobs}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 px-4 border border-blue-500 text-blue-400 rounded-xl hover:bg-blue-600/10 transition-colors font-medium">
                View All Companies
              </button>
            </div>

            {/* Job Stats */}
            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold text-white mb-4">Job Market Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">New jobs this week</span>
                  <span className="font-semibold text-blue-400">+247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Remote positions</span>
                  <span className="font-semibold text-green-400">68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg. response time</span>
                  <span className="font-semibold text-orange-400">2.3 days</span>
                </div>
              </div>
            </div>

            {/* Applied Jobs Summary */}
            {applications.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-400" />
                  Your Applications
                </h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{applications.length}</div>
                    <div className="text-sm text-gray-400">Applications Submitted</div>
                  </div>
                  <div className="space-y-2">
                    {applications.slice(-3).map((app, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{app.jobTitle}</p>
                          <p className="text-xs text-gray-400">{app.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {applications.length > 3 && (
                    <div className="text-center text-sm text-gray-400">
                      +{applications.length - 3} more applications
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Application Modal */}
      <ApplicationModal
        job={applicationModal.job}
        isOpen={applicationModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleApplicationSubmit}
      />

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="dark"
        toastStyle={{
          backgroundColor: '#374151',
          color: '#f3f4f6',
          border: '1px solid #4b5563'
        }}
      />
    </div>
  );
};

export default JobsPage;