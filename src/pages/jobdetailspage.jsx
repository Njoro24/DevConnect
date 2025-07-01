import React, { useEffect, useState } from 'react';
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
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Globe,
  Calendar,
  Star,
  Heart,
  Send,
  BookmarkPlus,
  Search,
  Filter,
  Briefcase
} from 'lucide-react';

const JobDetailPage = () => {
  const [currentView, setCurrentView] = useState('job-details');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample jobs list for the jobs view
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      remote: true,
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      applicantCount: 45,
      postedDate: '2025-06-18',
      status: 'active',
      priority: 'normal',
      description: 'We are looking for an experienced frontend developer to build responsive web applications using React and modern JavaScript frameworks.',
      companyLogo: 'https://via.placeholder.com/80x80',
      tags: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Git', 'Testing']
    },
    {
      id: 2,
      title: 'React Developer',
      company: 'StartupCo',
      salary: '$100,000 - $140,000',
      location: 'Remote',
      remote: true,
      applicantCount: 23,
      postedDate: '2025-06-19',
      status: 'active',
      priority: 'normal',
      companyLogo: 'https://via.placeholder.com/80x80',
      tags: ['React', 'Node.js', 'AWS'],
      description: 'Join our fast-growing startup as a React developer and help build the next generation of web applications.'
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
      status: 'active',
      priority: 'urgent',
      companyLogo: 'https://via.placeholder.com/80x80',
      tags: ['React', 'Python', 'PostgreSQL'],
      description: 'We need a talented full-stack developer to work on our cutting-edge fintech platform.'
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
      status: 'active',
      priority: 'normal',
      companyLogo: 'https://via.placeholder.com/80x80',
      tags: ['JavaScript', 'Vue.js', 'MongoDB'],
      description: 'Looking for a creative JavaScript engineer to join our dynamic development team.'
    }
  ];

  // Current job details
  const job = selectedJob || allJobs[0];

  // Enhanced job details for the selected job
  const getJobDetails = (jobId) => {
    const baseJob = allJobs.find(j => j.id === jobId) || allJobs[0];
    return {
      ...baseJob,
      responsibilities: [
        'Develop and maintain responsive web applications using React.js',
        'Collaborate with UI/UX designers to implement pixel-perfect designs',
        'Optimize applications for maximum speed and scalability',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and mentor junior developers',
        'Work with backend teams to integrate APIs and services',
        'Implement modern development practices and tools'
      ],
      requirements: [
        '5+ years of experience with React.js and modern JavaScript',
        'Strong understanding of HTML5, CSS3, and responsive design',
        'Experience with state management libraries (Redux, Zustand)',
        'Familiarity with testing frameworks (Jest, React Testing Library)',
        'Bachelor\'s degree in Computer Science or equivalent experience',
        'Experience with version control systems (Git)',
        'Knowledge of modern build tools and CI/CD pipelines'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements and remote options',
        'Professional development budget ($2,000/year)',
        'Unlimited PTO and flexible hours',
        'Modern equipment and home office setup',
        'Team building events and company retreats'
      ],
      companyInfo: {
        size: '500-1000 employees',
        founded: '2015',
        industry: 'Technology',
        website: 'https://techcorp.com',
        description: 'TechCorp Inc. is a leading technology company specializing in innovative web solutions and digital transformation services.'
      }
    };
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNavigate = (view, jobId = null) => {
    setCurrentView(view);
    if (jobId) {
      setSelectedJob(getJobDetails(jobId));
    }
  };

  const handleApply = () => {
    showToastMessage(`Applied to ${job.title} successfully!`, 'success');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToastMessage(
      isBookmarked ? 'Job removed from bookmarks' : 'Job bookmarked successfully!',
      'info'
    );
  };

  const handleShare = () => {
    showToastMessage('Job link copied to clipboard!', 'info');
  };

  const handleSimilarJobClick = (similarJobId) => {
    const similarJob = getJobDetails(similarJobId);
    setSelectedJob(similarJob);
    showToastMessage(`Viewing ${similarJob.title}`, 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Jobs List View Component
  const JobsListView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Find Your Dream Job</h1>
        <p className="text-gray-400 mb-6">Discover amazing opportunities from top companies</p>
        
        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {allJobs.map((jobItem) => (
          <div
            key={jobItem.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:bg-gray-700/30 transition-colors cursor-pointer group"
            onClick={() => handleNavigate('job-details', jobItem.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={jobItem.companyLogo}
                  alt={`${jobItem.company} logo`}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-600/50"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={getStatusBadge(jobItem.status, jobItem.priority)}>
                      {getStatusText(jobItem.status, jobItem.priority)}
                    </span>
                    {jobItem.remote && (
                      <span className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-xs font-semibold border border-green-800/30">
                        Remote
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {jobItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-3">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{jobItem.company}</span>
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-2">{jobItem.description}</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{jobItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{jobItem.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">{formatDate(jobItem.postedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">{jobItem.applicantCount} applicants</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {jobItem.tags?.slice(0, 4).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {jobItem.tags?.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-sm border border-gray-600/30">
                        +{jobItem.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Job Details View Component
  const JobDetailsView = () => {
    const similarJobs = allJobs.filter(j => j.id !== job.id).slice(0, 3);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => handleNavigate('jobs')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Jobs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-600/50"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={getStatusBadge(job.status, job.priority)}>
                        {getStatusText(job.status, job.priority)}
                      </span>
                      {job.remote && (
                        <span className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-xs font-semibold border border-green-800/30">
                          Remote
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Building className="w-5 h-5" />
                      <span className="font-medium text-lg">{job.company}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBookmark}
                    className={`p-3 rounded-xl transition-colors ${
                      isBookmarked 
                        ? 'bg-red-900/20 text-red-400 border border-red-800/30' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 border border-gray-600/50'
                    }`}
                    title="Bookmark job"
                  >
                    <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-gray-700/50 text-gray-400 rounded-xl hover:bg-gray-600/50 transition-colors border border-gray-600/50"
                    title="Share job"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Job Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-semibold text-white">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-900/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Salary</p>
                    <p className="font-semibold text-white">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Posted</p>
                    <p className="font-semibold text-white">{formatDate(job.postedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-900/20 rounded-lg">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Applicants</p>
                    <p className="font-semibold text-white">{job.applicantCount}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-blue-600/20 hover:text-blue-400 transition-colors cursor-pointer border border-gray-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities?.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-800/30">
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Apply Now
              </button>
              <div className="text-center text-sm text-gray-400">
                <p className="mb-2">Quick apply with your profile</p>
                <p className="text-blue-400">Response rate: 85%</p>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4">About {job.company}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {job.companyInfo?.description}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Industry</span>
                    <span className="text-white">{job.companyInfo?.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Company Size</span>
                    <span className="text-white">{job.companyInfo?.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Founded</span>
                    <span className="text-white">{job.companyInfo?.founded}</span>
                  </div>
                </div>
                <button 
                  onClick={() => showToastMessage('Opening company website...', 'info')}
                  className="w-full mt-4 py-3 px-4 border border-blue-500 text-blue-400 rounded-xl hover:bg-blue-600/10 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </button>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    onClick={() => handleSimilarJobClick(similarJob.id)}
                    className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-600/30 transition-colors cursor-pointer group border border-gray-600/30"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={similarJob.companyLogo}
                        alt={`${similarJob.company} logo`}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                          {similarJob.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-1">{similarJob.company}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{similarJob.location}</span>
                          <span>•</span>
                          <span>{similarJob.salary}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {similarJob.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-600/50 text-gray-300 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-blue-500 text-2xl">🔗</div>
              <span className="text-xl font-bold text-white">DevConnect</span>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigate('jobs')}
                className={`transition-colors font-medium ${
                  currentView === 'jobs' 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Jobs
              </button>
              <button 
                onClick={() => handleNavigate('job-details')}
                className={`transition-colors font-medium ${
                  currentView === 'job-details' 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Job Details
              </button>
              <button 
                onClick={() => handleNavigate('profile')}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Meshack Njoroge
              </button>
            </div>
            {/* Sign Out Button */}
            <button 
              onClick={() => showToastMessage('Signed out successfully', 'info')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border ${
            toastType === 'success' ? 'bg-green-900/80 border-green-700 text-green-100' :
            toastType === 'error' ? 'bg-red-900/80 border-red-700 text-red-100' :
            'bg-blue-900/80 border-blue-700 text-blue-100'
          }`}>
            <div className="flex items-center gap-2">
              {toastType === 'success' && <CheckCircle className="w-5 h-5" />}
              {toastType === 'error' && <AlertCircle className="w-5 h-5" />}
              {toastType === 'info' && <ExternalLink className="w-5 h-5" />}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'jobs' && <JobsListView />}
      {currentView === 'job-details' && <JobDetailsView />}
      {currentView === 'profile' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">MN</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Meshack Njoroge</h1>
            <p className="text-gray-400 mb-6">Full Stack Developer</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Applications</h3>
                <p className="text-2xl font-bold text-blue-400">12</p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Interviews</h3>
                <p className="text-2xl font-bold text-green-400">3</p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Saved Jobs</h3>
                <p className="text-2xl font-bold text-orange-400">8</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobDetailPage;