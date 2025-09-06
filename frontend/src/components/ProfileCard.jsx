import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import { FiMail, FiCode, FiArrowRight } from 'react-icons/fi';

const ProfileCard = ({ profile }) => {
  // A small helper to get initials from a full name for the avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col h-full">
      {/* Card Header: Avatar and Name */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mr-4 flex-shrink-0">
          {getInitials(profile.fullName)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{profile.fullName}</h2>
          {/* Email with Icon */}
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <FiMail className="w-4 h-4" />
            <p className="text-sm truncate">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-4 flex-grow">
        {/* Section Header with Icon */}
        <div className="flex items-center gap-2 mb-2">
          <FiCode className="w-5 h-5 text-gray-600" />
          <h3 className="text-md font-semibold text-gray-700">Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills && profile.skills.length > 0 ? (
            profile.skills.slice(0, 5).map((skill, index) => ( // Show up to 5 skills
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400">No skills listed.</p>
          )}
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        {/* 2. Replace the <button> with a <Link> component */}
        <Link
          // 3. Set the 'to' prop to the correct dynamic URL
          to={`/profile/${profile._id}`}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center gap-2"
        >
          <span>View Full Profile</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;