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
            <p className="text-sm text-gray-600">
                <strong>Budget:</strong> KES{budget}
            </p>
            {/* Status badge*/}
            <span 
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold 
                 ${status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
      >
        {status.toUpperCase()}
      </span>
        </div>
    )
}
export default Jobcard