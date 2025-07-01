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
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl animate-pulse">
            <div className="h-8 bg-slate-700 rounded mb-4 w-48"></div>
            <div className="h-4 bg-slate-700 rounded mb-2 w-24"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-red-400 mb-3">Error Loading Profile</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* User Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {user?.name || 'Unknown User'}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-300 border border-blue-800 capitalize">
                  {user?.role || 'No role'}
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed">
            {user?.bio || 'No bio provided.'}
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Skills
          </h2>
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
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">No skills listed yet.</p>
              <p className="text-slate-500 text-sm mt-2">Add your skills to showcase your expertise</p>
            </div>
          )}
        </div>

        {/* Jobs Section for Clients */}
        {user.role === 'client' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              Posted Jobs
            </h2>
            {postedJobs.length > 0 ? (
              <div className="grid gap-6">
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
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">You haven't posted any jobs yet.</p>
                <p className="text-slate-500 text-sm mt-2">Create your first job posting to find talented developers</p>
              </div>
            )}
          </div>
        )}

        {/* Applied Jobs Section for Developers */}
        {user.role === 'developer' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              Applied Jobs
            </h2>
            {appliedJobs.length > 0 ? (
              <div className="grid gap-6">
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
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">You haven't applied to any jobs yet.</p>
                <p className="text-slate-500 text-sm mt-2">Browse available jobs and start applying to build your career</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;