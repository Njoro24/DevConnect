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
