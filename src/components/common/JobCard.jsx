//reusable component to display job preview card

import React from 'react'

const Jobcard = ({ title, budget, clientName, status}) => {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
            {/* Job title */}
            <h3 className="text-lg font-bold mb-2">{title}</h3>

            {/* client/Budget */}
            <p className="text-sm text gray-600">
                <strong>Client:</strong> {clientName} 

            </p>
            
        </div>
    )
}