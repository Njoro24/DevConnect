// HomePage.jsx
// Main landing page with platform intro, call-to-action buttons,
// how it works section, and featured jobs list.

import React from 'react'
import JobCard from '../components/JobCard'
import { Link } from 'react-router-dom'

const HomePage = () => {
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
      status: 'closed'
    }
  ]

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkillSwap</h1>
        <p className="text-gray-600 mb-6">
          The platform where developers and clients connect to build amazing things.
        </p>

       
        <div className="space-x-4">
          <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Find Jobs
          </Link>
          <Link to="/register" className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
            Post a Job
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          <li>Clients post jobs with details and budgets.</li>
          <li>Developers browse and apply for jobs.</li>
          <li>Clients review applications and hire.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              budget={job.budget}
              clientName={job.clientName}
              status={job.status}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
