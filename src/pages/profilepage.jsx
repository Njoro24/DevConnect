import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import PropTypes from 'prop-types';

const DeveloperProfile = ({ skills, appliedJobs }) => (
  <section aria-labelledby="skills-heading">
    <h2 id="skills-heading" className="text-xl font-semibold mb-2">Skills</h2>
    <ul role="list" className="mb-4 list-disc list-inside">
      {skills.map(skill => (
        <li key={skill.id}>
          {skill.name} — <span className="text-sm text-gray-500">{skill.level}</span>
        </li>
      ))}
    </ul>
    <h2 id="jobs-heading" className="text-xl font-semibold mb-2">Applied Jobs</h2>
    <ul role="list" className="list-disc list-inside">
      {appliedJobs.map(job => (
        <li key={job.id}>
          <Link to={`/jobs/${job.id}`} className="hover:underline">
            {job.title}
          </Link> at <span className="font-medium">{job.company}</span>
        </li>
      ))}
    </ul>
  </section>
);

const ClientProfile = ({ postedJobs }) => (
  <section aria-labelledby="jobs-heading">
    <h2 id="jobs-heading" className="text-xl font-semibold mb-2">Posted Jobs</h2>
    <ul role="list" className="list-disc list-inside">
      {postedJobs.map(job => (
        <li key={job.id}>
          <Link to={`/jobs/${job.id}`} className="hover:underline">
            {job.title}
          </Link> — <span className="text-sm text-green-600">{job.status}</span>
        </li>
      ))}
    </ul>
  </section>
);

const ProfilePage = () => {
  const { userId } = useParams();
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data } = await authAPI.getProfile(userId);
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    if (isAuthenticated) fetchProfile();
  }, [userId, isAuthenticated]);

  if (!isAuthenticated) return (
    <p role="alert" className="p-6 text-red-600">
      Please <Link to="/login" className="underline">log in</Link> to view profiles.
    </p>
  );
  if (isLoading) return <p className="p-6 text-gray-600">Loading profile...</p>;
  if (error) return <p role="alert" className="p-6 text-red-600">{error}</p>;
  if (!profile) return (
    <p role="alert" className="p-6 text-red-600">
      Profile not found for user ID: {userId}
    </p>
  );

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded shadow mt-6 sm:mt-10" aria-labelledby="profile-title">
      <h1 id="profile-title" className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">{profile.name}</h1>
      <p className="text-sm sm:text-base text-gray-600 italic mb-4">{profile.role}</p>
      <p className="text-sm sm:text-base mb-6">{profile.bio}</p>

      {profile.role === 'Developer' && (
        <DeveloperProfile skills={profile.skills} appliedJobs={profile.appliedJobs} />
      )}
      {profile.role === 'Client' && (
        <ClientProfile postedJobs={profile.postedJobs} />
      )}
    </main>
  );
};

DeveloperProfile.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired
    })
  ).isRequired,
  appliedJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired
    })
  ).isRequired
};

ClientProfile.propTypes = {
  postedJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired
};

ProfilePage.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['Developer', 'Client']).isRequired,
    bio: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired
      })
    ),
    appliedJobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired
      })
    ),
    postedJobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      })
    )
  })
};

export default ProfilePage;