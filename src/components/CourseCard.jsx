import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ onClick, title, instructor, duration, description, rating }) => {

  return (
    <div className="bg-bgColorTwo rounded-lg shadow-sm p-6 max-w-sm w-full">
      <h3 className="text-2xl font-bold text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 mb-1">Instructor: {instructor}</p>
      <p className="text-gray-500 mb-1">Duration: {duration}</p>
      <p className="text-gray-500 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <span className="bg-buttonBgColor bg-clip-text text-transparent bg-gradient font-semibold">{rating} ★</span>
      </div>
      <button
        className="w-full bg-gray-900  text-gray-100 py-2 rounded-lg font-semibold transition-colors hover:bg-gray-800"
        onClick={onClick}
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseCard;
