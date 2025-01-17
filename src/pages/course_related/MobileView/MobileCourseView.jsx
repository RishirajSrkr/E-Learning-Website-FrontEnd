import React, { useState } from 'react';
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import { motion } from 'framer-motion';
import { CourseCardSkeleton } from '../../../components/CourseCard';
import { CourseCard } from '../../../components/CourseCard';
const MobileCourseView = ({ 
  courses, 
  searchQuery, 
  setSearchQuery, 
  filteredCourses, 
  handleCourseEnroll, 
  isLoading 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOptionChange = (value) => {
    setSearchQuery(value);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col w-full px-4">
      {/* Search and Filter Section */}
      <div className=" z-10 bg-white dark:bg-black pt-4 pb-2">
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search courses"
            className="pl-10 w-full bg-gray-100 dark:bg-black pr-4 text-black dark:text-white outline-none focus:ring-0 rounded-md py-2.5 placeholder-gray-500 border border-lightBorder dark:border-darkBorder"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <div className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-3">
            <HiMiniDocumentMagnifyingGlass />
          </div>
        </div>

        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-900 rounded-md text-left text-black dark:text-white mb-2"
        >
          Filter Courses
        </button>

        {isFilterOpen && (
          <div className="bg-white dark:bg-black rounded-md p-4 shadow-lg border border-lightBorder dark:border-darkBorder">
            <div className="flex flex-col gap-3">
              {["JavaScript", "React JS", "Java", "Spring Boot", "Machine Learning"].map((item) => (
                <div 
                  key={item} 
                  onClick={() => handleOptionChange(item.toLowerCase())}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-black dark:text-white">{item}</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      searchQuery === item.toLowerCase()
                        ? "border-accentColor bg-accentColor"
                        : "border-gray"
                    }`}
                  />
                </div>
              ))}
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setIsFilterOpen(false);
                }} 
                className="text-sm text-gray underline mt-2"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Course Cards Section */}
      <div className="flex flex-col gap-4 pb-16">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-full">
                <CourseCardSkeleton />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No courses available.</p>
        ) : (
          <>
            {searchQuery && filteredCourses.length === 0 ? (
              <p className="dark:text-gray-500 text-center py-8">
                No course found with the name: {searchQuery}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {Object.keys(searchQuery ? filteredCourses : courses).map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <CourseCard
                      title={searchQuery ? filteredCourses[key].courseName : courses[key].courseName}
                      imageUrl={searchQuery ? filteredCourses[key].imageUrl : courses[key].imageUrl}
                      instructor={searchQuery ? filteredCourses[key].instructorName : courses[key].instructorName}
                      description={searchQuery ? filteredCourses[key].courseDescription : courses[key].courseDescription}
                      votes={searchQuery ? filteredCourses[key].votes : courses[key].votes}
                      onClick={() => handleCourseEnroll(key)}
                      showCTA={true}
                      text="Enroll"
                      firstChapter={searchQuery ? filteredCourses[key].chapters[0] : courses[key].chapters[0]}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileCourseView;