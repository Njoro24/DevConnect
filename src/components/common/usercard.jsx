import React from 'react';

const UserCard = ({ name, company, rating, reviews, location }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      {/* Avatar Placeholder */}
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
        {name ? name[0].toUpperCase() : 'U'}
      </div>
      
      {/* User Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name || 'Unknown User'}</h3>
        <p className="text-gray-600 text-sm">{company || 'No Company'}</p>
        <p className="text-gray-600 text-sm">{location || 'Unknown Location'}</p>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500 text-sm">{'★'.repeat(Math.floor(rating || 0))}</span>
          <span className="text-gray-600 text-sm ml-1">
            {rating ? rating.toFixed(1) : 'N/A'} ({reviews || 0} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;