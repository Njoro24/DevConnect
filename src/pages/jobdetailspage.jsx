import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/common/usercard';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call to fetch job details based on ID
    const fetchJobDetails = async () => {
      try {
        // Replace with actual API call
        const mockJobData = {
          id,
          title: 'Senior Frontend Developer',
          description: 'We are looking for an experienced frontend developer to build a responsive web application using React and Tailwind CSS. The candidate should have strong expertise in modern JavaScript frameworks and UI/UX best practices.',
          budget: '$5,000 - $7,000',
          duration: '3 months',
          skills: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
          postedDate: '2025-06-15',
          client: {
            name: 'Jane Doe',
            company: 'TechCorp Inc.',
            rating: 4.8,
            reviews: 12,
            location: 'Remote',
          },
        };
        setJob(mockJobData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load job details');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    // Replace with actual apply logic (e.g., API call or navigation)
    alert('Application submitted for job ID: ' + id);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse text-gray-700 text-lg">Loading...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white shadow-lg rounded-lg p-6">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-700 text-lg font-medium">Job not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Job Details Section */}
        <div className="bg-white shadow-xl rounded-xl p-8 mb-8 transform hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{job.title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-600 mb-6">
            <div>
              <p className="font-semibold text-gray-800">Budget</p>
              <p>{job.budget}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Duration</p>
              <p>{job.duration}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Posted</p>
              <p>{job.postedDate}</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-200 transition duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Client Info Section */}
        <div className="bg-white shadow-xl rounded-xl p-8 mb-8 transform hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Information</h2>
          <UserCard
            name={job.client.name}
            company={job.client.company}
            rating={job.client.rating}
            reviews={job.client.reviews}
            location={job.client.location}
          />
        </div>

        {/* Apply Button */}
        <div className="text-center">
          <button
            onClick={handleApply}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Apply for this Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;