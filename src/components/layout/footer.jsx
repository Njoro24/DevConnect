import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <p>&copy; {new Date().getFullYear()} DevConnect. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          <Link to="/profile/1" className="hover:underline">Profile</Link>
          <a href="https://github.com/Njoro24/DevConnect" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub Repo
          </a>
        </div>
      </div>
    </footer>
  );
}
