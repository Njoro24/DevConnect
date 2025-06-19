import React from 'react'
import JobCard from '../components/common/JobCard'
import { Link} from 'react-router-dom'

const Homepage = () => {
    const featuredJobs = [
        {
            id: 1,
            title: 'Web Developer Needed',
            budget: 50000,
            clientName: 'Tech Solutions',
            status: 'open'
        },
        {
            id: 2,
            title: 'Graphic Designer for Branding',
            budget: 30000,
            clientName: 'Creative Agency',
            status: 'closed'
        },
    {
        id: 3,
        title: 'Content Writer for Blog',
        budget: 20000,
        clientName: 'Marketing Co.',
        status: 'open'
    }
]
    return (
        <div className="px- py-10 ma-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome to Skillswap</h1>
            <p className= "text=gray-600 mb-6">
                 The platform where developers and clients connect to build amazing things.
        </p>
        
        </div>
        

