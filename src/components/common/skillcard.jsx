import React from 'react';

const SkillTag = ({ skill, experience }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-blue-700 transition duration-200 cursor-default select-none">
      <span>{skill}</span>
      {experience && (
        <span className="bg-blue-800 rounded-full px-2 py-0.5 text-xs font-normal">
          {experience} yrs
        </span>
      )}
    </div>
  );
};

export default SkillTag;
