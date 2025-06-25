import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, CheckCircle, Star, TrendingUp } from 'lucide-react';
import '../index.css';
// JobCard Component
const JobCard = ({ title, budget, clientName, status, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300"
  >
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-1">{title}</h3>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'open' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold text-green-600">${budget}</p>
        <p className="text-sm text-gray-600">by {clientName}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  const featuredJobs = [
    {
      id: 1,
      title: 'React Frontend Developer Needed',
      budget: 500,
      clientName: 'John Doe',
      status: 'open'
    },
    {
      id: 2,
      title: 'Build a Flask API Backend',
      budget: 800,
      clientName: 'Jane Smith',
      status: 'open'
    },
    {
      id: 3,
      title: 'Mobile App UI/UX Design',
      budget: 1200,
      clientName: 'Tech Startup Inc.',
      status: 'open'
    },
    {
      id: 4,
      title: 'WordPress E-commerce Site',
      budget: 600,
      clientName: 'Small Business Owner',
      status: 'closed'
    }
  ];

  const handleJobClick = (job) => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  const stats = [
    { icon: Users, label: 'Active Developers', value: '10,000+' },
    { icon: Briefcase, label: 'Jobs Posted', value: '5,000+' },
    { icon: CheckCircle, label: 'Projects Completed', value: '3,000+' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%' }
  ];

  const steps = [
    {
      number: '01',
      title: 'Post Your Project',
      description: 'Clients post detailed job descriptions with clear requirements and budgets.'
    },
    {
      number: '02', 
      title: 'Get Applications',
      description: 'Skilled developers browse and apply for projects that match their expertise.'
    },
    {
      number: '03',
      title: 'Review & Hire',
      description: 'Review applications, check portfolios, and hire the perfect developer for your project.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-400">SkillSwap</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The premier platform where talented developers and visionary clients connect to build amazing digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/jobs" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Find Amazing Jobs
              </Link>
              <Link 
                to="/register" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
              >
                Post a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SkillSwap Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Follow these three easy steps to connect with the perfect match for your project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
              <p className="text-xl text-gray-600">
                Discover high-quality projects from trusted clients
              </p>
            </div>
            <Link 
              to="/jobs"
              className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              View All Jobs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                budget={job.budget}
                clientName={job.clientName}
                status={job.status}
                onClick={() => handleJobClick(job)}
              />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="text-center md:hidden">
            <Link 
              to="/jobs"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              View All Jobs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of developers and clients who trust SkillSwap for their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              Join as Developer
            </Link>
            <Link 
              to="/register" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg"
            >
              Post Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;