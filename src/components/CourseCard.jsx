import React from 'react';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

import { IoPersonSharp } from "react-icons/io5";
import Button from './formComponents/Button';


const CourseCard = ({ onClick, title, instructor, description, rating }) => {

  return (
    <div className="course-card relative bg-bgColorOne  p-6 max-w-sm w-full overflow-hidden hover:bg-bgColorTwo border border-borderColor transition-all rounded-md">

      <h3 className="text-2xl font-bold mb-2 text-maintextColor">{title}</h3>


      <div className='text-subtextColor'>

        <div className=' flex gap-2 items-center mb-2'>
          <IoPersonSharp className='text-accentColorOne' size={14} />
          <p className="font-semibold">{instructor}</p>
        </div>

        <p className="mb-4">{description}</p>

        <div className="course-card-rating absolute top-0 right-0 flex items-center mb-4 bg-bgColorTwo min-w-4 min-h-4 p-2 m-2 rounded-sm">
          <span className='text-accentColorOne text-xs '>{rating} ★</span>
        </div>

      </div>

      <Button text={"Enroll"} classname={"text-subtextColor"} onClick={onClick} />
    </div>
  );
};

export default CourseCard;
