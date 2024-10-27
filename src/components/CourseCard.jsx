import React from 'react';
import { BiSolidUpvote } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import SecondaryButton from './formComponents/SecondaryButton';


const CourseCard = ({ onClick, title, instructor, description, vote, showCTA, text, imageUrl }) => {

  return (
    <div className="course-card relative bg-bgTwo p-6 max-w-sm w-96 overflow-hidden hover:border-2 hover:border-border border-2 border-bgTwo transition-all rounded-md h-fit">

      {imageUrl && (
        <img
          src={imageUrl}
          alt="courseThumbnailImage"
          className="w-full h-48 object-cover rounded-sm mb-6"
        />
      )}


      <h3 className="text-2xl font-bold mb-2 text-maintextColor">{title}</h3>


      <div className='text-subtextColor'>


        {
          instructor && <div className=' flex gap-2 items-center mb-2'>
            <IoPersonSharp className='text-green' size={14} />
            <p className="font-semibold">{instructor}</p>
          </div>
        }


        <p className="mb-4">{description}</p>

        <div className="course-card-rating absolute top-0 right-0 flex items-center bg-gradientForBg min-w-4 min-h-4 p-2 m-2 rounded">
          <div className='flex gap-2 justify-center items-center text-bgOne font-semibold text-xs '>{vote} <BiSolidUpvote className='-mt-0.5' /></div>
        </div>

      </div>

      {
        showCTA && <SecondaryButton text={text} classname={"text-gray"} onClick={onClick} />
      }
    </div>
  );
};

export default CourseCard;
