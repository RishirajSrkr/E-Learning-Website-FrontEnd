import React from 'react';

const CourseCardSkeleton = () => {
  return (
    <div className="relative p-3 max-w-96 overflow-hidden border border-gray-300 dark:border-bgTwo rounded-md h-fit text-sm sm:w-full sm:text-base sm:p-6 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-40 sm:h-48 bg-bgThree dark:bg-bgTwo rounded-sm mb-6"></div>

      {/* Title Placeholder */}
      <div className="w-3/4 h-6 bg-gray-300 dark:bg-bgTwo rounded mb-4"></div>

      {/* Instructor Placeholder */}
      <div className="flex gap-2 items-center mb-2">
        <div className="h-5 w-5 bg-gray-300 dark:bg-bgTwo rounded-full"></div>
        <div className="w-1/2 h-5 bg-gray-300 dark:bg-bgTwo rounded"></div>
      </div>

      {/* Description Placeholder */}
      <div className="w-full h-4 bg-gray-300 dark:bg-bgTwo rounded mb-2"></div>
      <div className="w-5/6 h-4 bg-gray-300 dark:bg-bgTwo rounded mb-4"></div>

      {/* Votes Placeholder */}
      <div className="absolute top-0 right-0 flex items-center bg-gray-200 dark:bg-bgTwo text-black min-w-4 min-h-4 p-2 m-2 rounded">
        <div className="w-8 h-4 bg-gray-300 dark:bg-bgOneLight rounded"></div>
      </div>

      {/* Button Placeholder */}
      <div className="w-32 h-8 bg-gray-300 dark:bg-bgTwo rounded"></div>
    </div>
  );
};

export default CourseCardSkeleton;
