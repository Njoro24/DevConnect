import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import SkillCard from '../components/common/skillcard';
import JobCard from '../components/common/JobCard';

// Add base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProfilePage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Debug logging
        console.log('🔍 Profile fetch debug:', {
          userId: user.id,
          userRole: user.role,
          hasToken: !!token,
          tokenLength: token?.length,
          apiBaseUrl: API_BASE_URL
        });

        // Fetch user profile with enhanced error handling
        // Use /profile endpoint for complete user data including skills
        const userUrl = `${API_BASE_URL}/api/users/${user.id}/profile`;
        console.log('📡 Fetching user profile from:', userUrl);

        const userResponse = await fetch(userUrl, { headers });
        
        if (!userResponse.ok) {
          let errorMessage = `HTTP ${userResponse.status}: ${userResponse.statusText}`;
          
          try {
            const errorData = await userResponse.text();
            console.error('❌ Server error response:', {
              status: userResponse.status,
              statusText: userResponse.statusText,
              url: userUrl,
              responseBody: errorData
            });
            
            // Try to parse as JSON for structured error
            try {
              const parsedError = JSON.parse(errorData);
              errorMessage = parsedError.message || parsedError.error || errorMessage;
            } catch {
              // Use raw text if not JSON
              errorMessage = errorData || errorMessage;
            }
          } catch (parseError) {
            console.error('❌ Could not read error response:', parseError);
          }
          
          throw new Error(`Failed to fetch user profile: ${errorMessage}`);
        }

        const userData = await userResponse.json();
        console.log('✅ User data received:', userData);
        
        setSkills(Array.isArray(userData.skills) ? userData.skills : []);

        // Fetch additional data based on user role
        const additionalRequests = [];
        
        if (user.role === 'client') {
          const jobsUrl = `${API_BASE_URL}/api/users/${user.id}/jobs`;
          additionalRequests.push(
            fetch(jobsUrl, { headers })
              .then(async (res) => {
                if (res.ok) {
                  const jobsData = await res.json();
                  setPostedJobs(Array.isArray(jobsData) ? jobsData : []);
                } else {
                  console.warn('⚠️ Failed to fetch posted jobs:', res.status, res.statusText);
                  setPostedJobs([]);
                }
              })
              .catch(err => {
                console.error('❌ Error fetching posted jobs:', err);
                setPostedJobs([]);
              })
          );
        }

        if (user.role === 'developer') {
          const appsUrl = `${API_BASE_URL}/api/users/${user.id}/applications`;
          additionalRequests.push(
            fetch(appsUrl, { headers })
              .then(async (res) => {
                if (res.ok) {
                  const appsData = await res.json();
                  setAppliedJobs(Array.isArray(appsData) ? appsData : []);
                } else {
                  console.warn('⚠️ Failed to fetch applied jobs:', res.status, res.statusText);
                  setAppliedJobs([]);
                }
              })
              .catch(err => {
                console.error('❌ Error fetching applied jobs:', err);
                setAppliedJobs([]);
              })
          );
        }

        // Wait for additional requests to complete (but don't fail if they error)
        if (additionalRequests.length > 0) {
          await Promise.allSettled(additionalRequests);
        }

        console.log('✅ Profile data loaded successfully');

      } catch (err) {
        console.error('❌ Error loading profile:', err);
        setError(err.message || 'An unexpected error occurred while loading your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl p-6 shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Profile</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-2">{user?.name || 'Unknown User'}</h1>
        <p className="text-sm text-gray-500 mb-1 capitalize">{user?.role || 'No role'}</p>
        <p className="text-gray-700">{user?.bio || 'No bio provided.'}</p>
      </div>

      {/* Skills Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        {skills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <SkillCard 
                key={skill.id || i} 
                name={skill.name || 'Unknown Skill'} 
                level={skill.level || 'Beginner'} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills listed yet.</p>
        )}
      </div>

      {/* Jobs Section for Clients */}
      {user.role === 'client' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
          {postedJobs.length > 0 ? (
            <div className="grid gap-4">
              {postedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title || 'Untitled Job'}
                  budget={job.budget || 'Not specified'}
                  clientName={user.name}
                  status={job.status || 'Unknown'}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          )}
        </div>
      )}

      {/* Applied Jobs Section for Developers */}
      {user.role === 'developer' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
          {appliedJobs.length > 0 ? (
            <div className="grid gap-4">
              {appliedJobs.map((application, index) => {
                const job = application.job || application;
                return (
                  <JobCard
                    key={job.id || index}
                    title={job.title || 'Untitled Job'}
                    budget={job.budget || 'Not specified'}
                    clientName={job.client?.name || 'Unknown Client'}
                    status={job.status || 'Unknown'}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">You haven't applied to any jobs yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;