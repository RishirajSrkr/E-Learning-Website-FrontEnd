import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiZap } from "react-icons/fi";

function AddCoursePage() {
    const navigate = useNavigate();
    return (
        <div className='dark:bg-black bg-white text-black dark:text-white w-full min-h-screen  flex items-center justify-center flex-col '>

            <TipsComponent />

            <div className='flex gap-6 w-96 mt-4 text-sm'>
                {/* <button className='border border-lightBorder dark:border-darkBorder px-3 py-1.5 rounded-md' onClick={() => navigate("/resource/create/video")}>YouTube Video</button> */}

                <button className='border border-lightBorder dark:border-darkBorder px-5 py-1.5 rounded-md' onClick={() => navigate("/resource/create/text")}>Create</button>
            </div>
        </div>
    )
}


const TipsComponent = () => {
    return (
        <div className='w-96'>
            <p className='font-medium text-lg mb-4 flex items-center gap-1'><FiZap /> Tips for Creating a Great Course</p>
            <p >
                <li className=''>Share helpful, reliable resources.</li>
                <li className=''>Use clear titles and descriptions. </li>
                <li className=''>Avoid spam or copied content.</li>
            </p>
            <p className='mt-4'>Let’s make learning easy and fun for everyone!</p>
        </div>
    );
};


export default AddCoursePage