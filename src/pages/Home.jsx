import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { FaSearch, FaShare, FaShareAlt, FaThumbsUp, FaUsers, FaVoteYea } from 'react-icons/fa';
import { IoArrowForwardSharp } from "react-icons/io5";
import { WindowWidthContext } from '../context/WindowWidthContext';
import PrimaryButton from '../components/formComponents/PrimaryButton';
import {Reviews} from '../components/Reviews';


function Home() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const { isMobile } = useContext(WindowWidthContext)

    function handleViewAllCourse() {
        navigate("/all-courses")
    }


    return (

        <div className=' relative bg-white dark:bg-bgOne text-bgOne dark:text-white  min-h-screen pb-12'>


            {/* --------------------------------- HEAD LINE --------------------------------- */}

            <div className='w-full px-4 sm:min-h-screen flex flex-col justify-center gap-4 sm:px-24 mb-6 sm:mb-0'>


                <div className='w-full p-8 flex flex-col gap-2 text-center rounded-lg sm:p-20 sm:gap-6'>


                    {/* ---------- headline ------------ */}
                    <div className='tracking-tight font-medium sm:text-7xl'>
                        <h2 className=' mb-1'>Discover the best</h2>
                        <h2>developer resources.</h2>
                    </div>

                    {/* ------------- subtext ------------ */}
                    <div className='text-gray-500 text-xl font-medium mb-4 sm:mb-0'>
                        <p>Voted by <span className='text-bgOne dark:text-white'>developers like you</span>, for you.</p>
                    </div>


                    {/* ------------ cta button ---------------- */}

                    <PrimaryButton
                        onClick={handleViewAllCourse}
                        text={"Explore Resources"}
                        classname={"w-44 h-10 mx-auto"}
                        arrow={false}
                    />

                </div>


                {/* ----------------- notification for mobile view ---------------- */}
                {
                    isMobile && isLoading && <div className='flex gap-2 text-xs items-center'>
                        <IoArrowForwardSharp className='text-green' />
                        <p className='text-gray'>Deployed on Render free tier, please be patient.</p>
                    </div>
                }

            </div>




            {/* ----------------------- DESCRIPTION -------------------------- */}

            <div className='min-h-screen'>
                <h2 className="text-3xl font-medium text-bgOne dark:text-gray-500 text-center mb-20">How it works?</h2>

                <div className='flex justify-center items-start w-2/3 gap-16 flex-wrap mx-auto text-center'>

                    <div className='text-bgOne dark:text-white flex flex-col gap-3 w-80 items-center '>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-xl rounded-full flex justify-center items-center text-white dark:text-gray-300'>
                            <FaSearch />
                        </div>
                        <div>
                            <h4 className='font-medium'>Search for Resources</h4>
                            <p className='text-gray-500 leading-tight'>Find quality learning resources easily by searching for specific topics.</p>
                        </div>
                    </div>


                    <div className='text-bgOne dark:text-white flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-xl rounded-full flex justify-center items-center text-white dark:text-gray-300'>
                            <FaShare />
                        </div>
                        <div>
                            <h4 className='font-medium'>Share Your Favorite Resources</h4>
                            <p className='text-gray-500 leading-tight'>Share valuable resources that helped you learn something new, from videos to articles.</p>
                        </div>
                    </div>


                    <div className='text-bgOne dark:text-white flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-xl rounded-full flex justify-center items-center text-white dark:text-gray-300'>
                            <FaUsers />
                        </div>
                        <div>
                            <h4 className='font-medium'>Community-Driven, Free Access</h4>
                            <p className='text-gray-500 leading-tight'>Join a growing community of learners, contribute freely, and gain access to high-quality resources.</p>
                        </div>
                    </div>




                    <div className='text-bgOne dark:text-white flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-xl rounded-full flex justify-center items-center text-white dark:text-gray-300'>
                            <FaThumbsUp />
                        </div>
                        <div>
                            <h4 className='font-medium'>Upvote and Curate the Best Content</h4>
                            <p className='text-gray-500 leading-tight'>Vote for resources that helped you the most and help others find the best content.</p>
                        </div>
                    </div>




                </div>

            </div>

            {/* ----------------------------------- REVIEWS ------------------------------------- */}


            <div className='px-32'>

                <h2 className="text-3xl font-medium text-bgOne dark:text-gray-500 text-center mb-16">Listen from our learners.</h2>

                <Reviews />

            </div>






        </div >

    )
}

export default Home