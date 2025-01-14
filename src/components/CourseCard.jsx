import React from 'react';
import { BiSolidUpvote } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import SecondaryButton from './formComponents/SecondaryButton';


const CourseCard = ({ onClick, title, instructor, description, votes, showCTA, text, imageUrl, isLoading }) => {

  return (
    <div className="course-card relative bg-white dark:bg-black p-3 max-w-96 overflow-hidden  border border-lightBorder dark:border-darkBorder  rounded-md h-fit text-sm sm:w-full sm:text-base sm:96 sm:p-6">

      {imageUrl && (
        <img
          src={imageUrl}
          alt="courseThumbnailImage"
          className="w-full h-40 object-cover rounded-sm mb-6 sm:h-48"
        />
      )}


      <h3 className="text-xl font-semibold mb-2 text-black dark:text-white sm:text-2xl">{title}</h3>


      <div className='text-gray'>


        {
          instructor && <div className=' flex gap-2 items-center mb-2'>
            <IoPersonSharp className='text-accentColor text-sm' />
            <p className="font-semibold ">{instructor}</p>
          </div>
        }


        <p className="mb-4">{description}</p>

        <div className="course-card-rating absolute top-0 right-0 flex items-center bg-gray-200 text-black min-w-4 min-h-4 p-2 m-2 rounded">
          <div className='flex gap-2 justify-center items-center font-semibold text-xs '>{votes} <BiSolidUpvote className='-mt-0.5' /></div>
        </div>

      </div>

      {
        showCTA && <SecondaryButton  text={text} classname={"text-white dark:text-black bg-black  dark:bg-white"} onClick={onClick} />
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

      {/* Instructor Placeholder */}
      <div className="flex gap-2 items-center mb-2">
        <div className="h-5 w-5 bg-zinc-300 dark:bg-bgTwo rounded-full"></div>
        <div className="w-1/2 h-5 bg-zinc-300 dark:bg-bgTwo rounded"></div>
      </div>

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



export {CourseCard, CourseCardSkeleton};
