import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/Authcontext'; 

const Navigation = ({ handleSignOut, userName }) => {
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
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Jobs
            </button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Job Details
            </button>
            <Link
            to="/profile"
            className="bg-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
               {userName}
            </Link>
          </div>
          {/* Sign Out Button */}
          <button 
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  
  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};


const MessageBox = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-gray-100 text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const services = [
  { title: "Web Development", image: "https://placehold.co/80x80/1E40AF/ffffff?text=Web" },
  { title: "UI/UX Design", image: "https://placehold.co/80x80/1E40AF/ffffff?text=UI/UX" },
  { title: "Mobile Apps", image: "https://placehold.co/80x80/1E40AF/ffffff?text=Mobile" },
  { title: "Backend Development", image: "https://placehold.co/80x80/1E40AF/ffffff?text=Backend" },
  { title: "DevOps & Cloud", image: "https://placehold.co/80x80/1E40AF/ffffff?text=DevOps" },
  { title: "AI & Machine Learning", image: "https://placehold.co/80x80/1E40AF/ffffff?text=AI/ML" },
  { title: "Game Development", image: "https://placehold.co/80x80/1E40AF/ffffff?text=Game" },
  { title: "Cybersecurity", image: "https://placehold.co/80x80/1E40AF/ffffff?text=Security" },
];

const Homepage = () => {
  const navigate = useNavigate();
  const { logout, getUserName } = useAuth(); // Use the auth context
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Updated sign-out function that uses the auth context
  const handleSignOut = async () => {
    try {
      setLoading(true);
      setToast({ message: 'Signing out...', type: 'success' });
      
      console.log('Starting sign out process...');
      
      // Use the logout function from auth context
      logout();
      
      console.log('Auth context logout completed');
      
      // Clear the toast
      setToast({ message: '', type: '' });
      setLoading(false);
      
      // Navigate to login page
      navigate('/login', { replace: true });
      
      console.log('Navigation to login completed');
      
    } catch (error) {
      console.error('Sign out error:', error);
      setLoading(false);
      setToast({ message: 'Error signing out. Please try again.', type: 'error' });
      
      // Even if there's an error, try to navigate to login
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }
  };

  const handleBrowseJobsClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Jobs page would load here in the full application!');
    }, 2000);
  };

  const closeMessageBox = () => setMessage(null);
  const closeToast = () => setToast({ message: '', type: '' });

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-inter">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <MessageBox message={message} onClose={closeMessageBox} />

      {/* Navigation */}
      <Navigation handleSignOut={handleSignOut} userName={getUserName()} />

      {/* Hero Section */}
      <section className="pt-20 pb-24 bg-gradient-to-br from-gray-900 to-gray-800 text-center px-6">
        <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Connecting Elite Developers with Stellar Opportunities
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          DevConnect is your premier platform to discover top-tier development talent or secure your next groundbreaking project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            onClick={handleBrowseJobsClick}
            disabled={loading}
            className={`bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition duration-300 transform ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105'
            } flex items-center justify-center`}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Loading Jobs...' : 'Browse Jobs'}
          </button>
          <button className="bg-transparent border-2 border-blue-600 text-blue-400 px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg transform hover:scale-105">
            Post a Job
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-extrabold text-center mb-16 text-white">Our Core Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 flex flex-col items-center border border-gray-700">
              <img src={service.image} alt={service.title} className="w-24 h-24 mx-auto mb-6 object-contain rounded-full border-4 border-blue-500 p-2 bg-gray-900" />
              <h4 className="font-semibold text-gray-200 text-xl text-center">{service.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white text-center py-20 px-6">
        <h3 className="text-4xl font-extrabold mb-6">Ready to Connect?</h3>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Join DevConnect today and elevate your career or find the perfect developer for your team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
            Get Started - It's Free!
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-700 transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-sm text-gray-400 text-center py-8 px-6">
        <p className="mb-4">© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <button className="hover:underline text-gray-400 hover:text-blue-300 transition duration-300">About Us</button>
          <button className="hover:underline text-gray-400 hover:text-blue-300 transition duration-300">Contact Support</button>
          <button className="hover:underline text-gray-400 hover:text-blue-300 transition duration-300">Privacy Policy</button>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;