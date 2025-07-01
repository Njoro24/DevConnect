import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { getAuthHeaders } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        const result = await response.json();
        setProfile(result.user);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading)
    return <div className="text-center text-white py-10">Loading profile...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!profile)
    return <div className="text-center text-gray-400 py-10">No profile data found.</div>;

  return (
    <main className="bg-gray-900 min-h-screen text-gray-100 px-6 py-10 font-inter">
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
        <p className="text-blue-400 mb-4 italic">{profile.role}</p>
        <p className="text-gray-300 mb-6">{profile.bio || 'No bio added yet.'}</p>

        {/* Developer View */}
        {profile.role === 'Developer' && (
          <>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-blue-700 px-4 py-2 rounded-full text-sm shadow"
                    >
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No skills listed.</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">Applied Jobs</h2>
              <ul className="list-disc list-inside space-y-1">
                {profile.applications?.length > 0 ? (
                  profile.applications.map((app) =>
                    app.job ? (
                      <li key={app.id}>
                        <Link
                          to={`/jobs/${app.job.id}`}
                          className="text-blue-400 hover:underline"
                        >
                          {app.job.title}
                        </Link>{' '}
                        <span className="text-sm text-gray-400">({app.status})</span>
                      </li>
                    ) : null
                  )
                ) : (
                  <p className="text-sm text-gray-400">No job applications yet.</p>
                )}
              </ul>
            </section>
          </>
        )}

        {/* Client View */}
        {profile.role === 'Client' && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Posted Jobs</h2>
            <ul className="list-disc list-inside space-y-1">
              {profile.posted_jobs?.length > 0 ? (
                profile.posted_jobs.map((job) => (
                  <li key={job.id}>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {job.title}
                    </Link>{' '}
                    <span className="text-sm text-green-400">({job.status})</span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-400">No posted jobs yet.</p>
              )}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
