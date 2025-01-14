import React from 'react';

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



function ContributorProfileSkeleton() {
    return (
        <div className="bg-white dark:bg-black border border-lightBorder dark:border-darkBorder text-black dark:text-white w-full px-8 py-4 flex justify-between items-center rounded-lg">
            <div className="flex items-center justify-between w-full">
              
                <div className='flex flex-col animate-pulse'>
                    <div className="flex gap-4 mb-2 items-center">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-bgThree rounded-full"></div>
                        <div className="w-32 h-6 bg-gray-300 dark:bg-bgThree rounded "></div>
                    </div>
                    <div className="w-72 h-6 rounded bg-gray-300 dark:bg-bgThree"></div>
                </div>
            </div>

         
            <div className="flex items-center mt-2 animate-pulse">
                <div className="w-32 h-6 bg-gray-300 dark:bg-bgThree rounded"></div>
            </div>
        </div>
    );
}





export { ContributorProfileSkeleton, ContributorProfile };
