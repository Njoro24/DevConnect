import React from 'react';
import { useParams } from 'react-router-dom';

const mockProfiles = {
  malik: {
    name: 'Malik Dev',
    role: 'Developer',
    bio: 'Frontend dev who builds delightful UIs with React and Tailwind.',
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Intermediate' }
    ],
    appliedJobs: [
      { title: 'Build DevConnect landing page', company: 'DevPro Labs' },
      { title: 'Join remote React team', company: 'CodeSprint' }
    ]
  },
  clientco: {
    name: 'Client Co.',
    role: 'Client',
    bio: 'Startup hiring frontend and backend devs for rapid prototyping.',
    postedJobs: [
      { title: 'React dashboard build', status: 'Open' },
      { title: 'Bug fixes in Django API', status: 'In Progress' }
    ]
  }
};

export default function ProfilePage() {
  const { userId } = useParams();
  const profile = mockProfiles[userId];

  if (!profile) return <p className="p-6 text-red-600">User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{profile.name}</h1>
      <p className="text-gray-600 italic mb-4">{profile.role}</p>
      <p className="mb-6">{profile.bio}</p>

      {profile.role === 'Developer' && (
        <>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="mb-4 list-disc list-inside">
            {profile.skills.map((skill, i) => (
              <li key={i}>
                {skill.name} — <span className="text-sm text-gray-500">{skill.level}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2">Applied Jobs</h2>
          <ul className="list-disc list-inside">
            {profile.appliedJobs.map((job, i) => (
              <li key={i}>
                {job.title} at <span className="font-medium">{job.company}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {profile.role === 'Client' && (
        <>
          <h2 className="text-xl font-semibold mb-2">Posted Jobs</h2>
          <ul className="list-disc list-inside">
            {profile.postedJobs.map((job, i) => (
              <li key={i}>
                {job.title} — <span className="text-sm text-green-600">{job.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
