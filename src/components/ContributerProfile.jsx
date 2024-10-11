import React from 'react';
import { FaEnvelope, FaBook, FaStar, FaUserPlus } from 'react-icons/fa';

function ContributerProfile({ name, email, major, gpa }) {
    return (
        <div className='bg-bgColorTwo border border-gray-700 w-1/2 px-6 py-4 flex justify-between items-center rounded-lg mb-4'>
            <div className='text-white'>
                <div className='flex gap-4'>
                    <h2 className='text-gray-400 font-bold text-2xl'>{name}</h2>
                </div>

                <div className='flex items-center mt-2'>
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <h4 className='text-gray-500'>{email}</h4>
                </div>
                <div className='flex items-center mt-2'>
                    <FaBook className="text-gray-500 mr-2" />
                    <h4 className='text-gray-500'>{major}</h4>
                </div>
                <div className='flex items-center mt-2'>
                    <FaStar className="text-gray-500 mr-2" />
                    <h4 className='text-gray-500'>GPA: {gpa}</h4>
                </div>
            </div>

            {/* Follow Icon */}
            <div>
                <FaUserPlus className='text-gray-500 cursor-pointer transition-transform transform hover:scale-125' title="Follow" size={24} />
            </div>
        </div>
    );
}

export default ContributerProfile;
