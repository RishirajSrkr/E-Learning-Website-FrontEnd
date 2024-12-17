import React from 'react';
import { FaEnvelope, FaBook, FaArrowRight, FaStar, FaUserPlus } from 'react-icons/fa';
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoChevronForward } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';

function ContributorProfile({ name, email, profileImage, bio, uploadedCourses, onClick }) {


    return (
        <div className='bg-white dark:bg-black border border-lightBorder dark:border-darkBorder text-black dark:text-white w-full px-8 py-4 flex justify-between items-center rounded-lg'>

            <div className='flex items-center justify-between w-full'>
                <div>
                <div className='flex gap-4 mb-2  items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={profileImage} alt="" />
                    <h2 className='font-semibold text-2xl'>{name}</h2>
                </div>


                <div className='flex items-start'>
                    <h4>{bio}</h4>
                </div>
                </div>
               

                <button
                    onClick={onClick}
                    className='flex items-center mt-2  font-medium text-sm'>
                    <div className='flex items-center gap-1'>
                        <p className='underline'>Contributions</p>
                        <p className='w-4'>{uploadedCourses}</p>
                    </div>
                </button>

            </div>

            {/* Follow Icon */}
            {/* <div>
                <FaUserPlus className='text-accentColor cursor-pointer transition-transform transform hover:scale-125' title="Follow" size={24} />
            </div> */}
        </div>
    );
}

export default ContributorProfile;
