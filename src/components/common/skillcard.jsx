import React from 'react';
import PropTypes from 'prop-types';

const SkillCard = ({ name, level, category }) => {
  // Map skill level to progress bar width and color
  const getLevelStyles = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return { width: '33%', bgColor: 'bg-blue-200' };
      case 'intermediate':
        return { width: '66%', bgColor: 'bg-blue-400' };
      case 'advanced':
        return { width: '100%', bgColor: 'bg-blue-600' };
      default:
        return { width: '0%', bgColor: 'bg-gray-200' };
    }
  };

  // Map category to an icon (using Heroicons)
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'software':
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        ); // Code icon for software engineering
      case 'design':
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20V4M4 12h16" />
          </svg>
        ); // Design cross icon for UX/UI
      case 'analytics':
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5m6 0a2 2 0 002-2v-3m6 5v-8a2 2 0 00-2-2h-2a2 2 0 00-2 2v8m6 0a2 2 0 002-2v-1" />
          </svg>
        ); // Bar chart icon for data analytics
      default:
        return null;
    }
  };

  const { width, bgColor } = getLevelStyles(level);

  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-200 flex items-start space-x-4">
      {getCategoryIcon(category)}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="mt-2">
          <span className="text-sm text-gray-500 capitalize">{level}</span>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
            <div
              className={`h-2.5 rounded-full ${bgColor}`}
              style={{ width }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
  category: PropTypes.oneOf(['software', 'design', 'analytics']),
};

SkillCard.defaultProps = {
  category: null,
};

export default SkillCard;