import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist. The job ID might be invalid or the job has been removed.
        </p>
        <Link
          to="/jobs"
          className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Back to Jobs
        </Link>
      </div>
    </div>
  );
};

export default NotFound;