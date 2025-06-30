import React from 'react';

const SkillCard = ({ skill }) => {
  if (!skill || !skill.name) return null;

  return (
    <div className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-blue-700 transition duration-200">
      {skill.name}
    </div>
  );
};

export default SkillCard;
