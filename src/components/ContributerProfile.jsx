import React from 'react';
import { FaEnvelope, FaBook, FaStar, FaUserPlus } from 'react-icons/fa';

function ContributerProfile({ name, email, bio, uploadedCourse}) {
    return (
        <div className='bg-bgColorOne border border-borderColor w-full px-6 py-4 flex justify-between items-center hover:bg-bgColorTwo transition-colors rounded-md'>
            
            <div className='text-subtextColor'>
                <div className='flex gap-4 text-maintextColor'>
                    <h2 className='font-bold text-2xl'>{name}</h2>
                </div>

                <div className='flex items-center mt-2'>
                    <FaEnvelope className="mr-2" />
                    <h4>{email}</h4>
                </div>
                <div className='flex items-center mt-2'>
                    <FaBook className="mr-2" />
                    <h4>{bio}</h4>
                </div>
                <div className='flex items-center mt-2'>
                    <FaStar className="mr-2" />
                    <h4>Courses: {uploadedCourse}</h4>
                </div>
            </div>

            {/* Follow Icon */}
            <div>
                <FaUserPlus className='text-accentColorOne cursor-pointer transition-transform transform hover:scale-125' title="Follow" size={24} />
            </div>
        </div>
    );
}

export default ContributerProfile;
