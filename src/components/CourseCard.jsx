import React, { useContext, useEffect, useState } from 'react';
import { BiSolidUpvote } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import SecondaryButton from './formComponents/SecondaryButton';
import { UserContext } from '../context/UserContext'
import { div } from 'framer-motion/client';
import { BiSolidLike } from "react-icons/bi";

const CourseCard = ({ onClick, title, description, votes, showCTA, imageUrl, firstChapter, uploadedBy, courseId }) => {


  const { user, isLoading } = useContext(UserContext)
  const [text, setText] = useState("");


  useEffect(() => {

    console.log(user.enrolledCourses);


    if (!isLoading && user) {
      if (user?.email == uploadedBy) {
        setText("View"); // User is the uploader
      } else if (user?.enrolledCourses.includes(courseId)) {
        setText("Continue"); // User is enrolled
      } else {
        setText("Start Learning"); // Default state
      }
    }

  }, [isLoading])


  function extractVideoIdFromURL(url) {
    const videoIdMatch = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      return thumbnailUrl;
    }
    else return null;
  }




  return (
    <div className="course-card relative bg-white dark:bg-black p-3 max-w-96 overflow-hidden  border border-lightBorder dark:border-darkBorder  rounded-md h-fit text-sm sm:w-full sm:text-base sm:96 sm:p-6">

      {imageUrl && (
        <div className='relative w-full'>
          <img
            src={imageUrl}
            alt="courseThumbnailImage"
            className="w-full h-40 object-cover rounded-sm mb-6 sm:h-48"
          />

          <div className='absolute -top-4 -right-4 flex  gap-2 justify-center items-center font-semibold text-xs h-8 bg-zinc-50 dark:bg-bgTwo rounded-md px-3 '><BiSolidLike size={12} className='-mt-0.5' /> {votes}</div>

        </div>
      )}

      {!imageUrl && (
        <div className='relative w-full'>

          <img
            src={extractVideoIdFromURL(firstChapter.videoLink)}
            alt="courseThumbnailImage"
            className="w-full h-40 object-cover rounded-sm mb-6 sm:h-48"
          />


          <div className='absolute -top-4 -right-4 flex  gap-2 justify-center items-center font-semibold text-xs h-8 bg-zinc-50 dark:bg-bgTwo rounded-md px-3 '><BiSolidLike size={12} className='-mt-0.5' /> {votes}</div>

        </div>

      )}


      <h3 className="text-xl font-semibold mb-2 text-black dark:text-white sm:text-2xl">{title}</h3>


      <div className='text-gray'>
        <p className="mb-4">{description}</p>
      </div>

      {
        showCTA && <SecondaryButton text={text} onClick={onClick} />
      }




    </div>
  );
};




const CourseCardSkeleton = () => {
  return (
    <div className="relative p-3 max-w-96 overflow-hidden border border-zinc-300 dark:border-bgTwo rounded-md h-fit text-sm sm:w-full sm:text-base sm:p-6 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-40 sm:h-48 bg-zinc-300 dark:bg-bgTwo rounded-sm mb-6"></div>

      {/* Title Placeholder */}
      <div className="w-3/4 h-6 bg-zinc-300 dark:bg-bgTwo rounded mb-4"></div>

      {/* Description Placeholder */}
      <div className="w-full h-4 bg-zinc-300 dark:bg-bgTwo rounded mb-2"></div>
      <div className="w-5/6 h-4 bg-zinc-300 dark:bg-bgTwo rounded mb-4"></div>

      {/* Votes Placeholder */}
      <div className="absolute top-0 right-0 flex items-center bg-zinc-200 dark:bg-bgTwo text-black min-w-4 min-h-4 p-2 m-2 rounded">
        <div className="w-8 h-4 bg-zinc-300 dark:bg-bgOneLight rounded"></div>
      </div>

      {/* Button Placeholder */}
      <div className="w-32 h-8 bg-zinc-300 dark:bg-bgTwo rounded"></div>
    </div>
  );
};



export { CourseCard, CourseCardSkeleton };
