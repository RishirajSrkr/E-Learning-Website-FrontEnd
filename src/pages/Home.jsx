import React, { useContext, useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FaSearch, FaShare, FaShareAlt, FaThumbsUp, FaUsers, FaVoteYea } from 'react-icons/fa';
import { IoArrowForwardSharp } from "react-icons/io5";
import { WindowWidthContext } from '../context/WindowWidthContext';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import PrimaryButton from '../components/formComponents/PrimaryButton';

import HomePageComponent from '../components/Home pages/HomePageComponent'
import Reviews from '../components/Reviews';
function Home() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const { isMobile } = useContext(WindowWidthContext)

    function handleViewAllCourse() {
        navigate("/all-courses")
    }


    return (

        <div className='  relative bg-bgOne min-h-screen pb-12'>


            {/* --------------------------------- HEAD LINE --------------------------------- */}

            <div className='w-full px-4 sm:min-h-screen flex flex-col justify-center gap-4 sm:px-24 mb-6 sm:mb-0'>


                <div className='w-full  p-8 flex flex-col gap-2 text-center rounded-lg sm:p-20 sm:gap-6'>


                    {/* ---------- headline ------------ */}
                    <div className='bg-gradient-to-r from-gray to-offwhite bg-clip-text text-transparent tracking-tight font-medium sm:text-7xl'>
                        <h2 className=' mb-1'>Discover the best</h2>
                        <h2>developer resources.</h2>
                    </div>

                    {/* ------------- subtext ------------ */}
                    <div className='text-gray text-xl font-medium mb-4 sm:mb-0'>
                        <p>Voted by <span className='text-offwhite'>developers like you</span>, for <span className='text-offwhite'>you.</span></p>
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
                <h2 className="text-3xl font-medium text-gray text-center mb-20">How it works?</h2>

                <div className='flex justify-center items-start w-2/3 gap-16 flex-wrap mx-auto text-center'>

                    <div className='text-offwhite flex flex-col gap-3 w-80 items-center '>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-2xl rounded-lg flex justify-center items-center'>
                            <FaSearch />
                        </div>
                        <div>
                            <h4 className='font-medium'>Search for Resources</h4>
                            <p className='text-gray leading-tight'>Find quality learning resources easily by searching for specific topics.</p>
                        </div>
                    </div>


                    <div className='text-offwhite flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-2xl rounded-lg flex justify-center items-center'>
                            <FaShare />
                        </div>
                        <div>
                            <h4 className='font-medium'>Share Your Favorite Resources</h4>
                            <p className='text-gray leading-tight'>Share valuable resources that helped you learn something new, from videos to articles.</p>
                        </div>
                    </div>


                    <div className='text-offwhite flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-2xl rounded-lg flex justify-center items-center'>
                            <FaUsers />
                        </div>
                        <div>
                            <h4 className='font-medium'>Community-Driven, Free Access</h4>
                            <p className='text-gray leading-tight'>Join a growing community of learners, contribute freely, and gain access to high-quality resources.</p>
                        </div>
                    </div>




                    <div className='text-offwhite flex flex-col gap-3 w-80 items-center'>
                        <div className='bg-bgTwo w-fit h-fit p-4 text-2xl rounded-lg flex justify-center items-center'>
                            <FaThumbsUp />
                        </div>
                        <div>
                            <h4 className='font-medium'>Upvote and Curate the Best Content</h4>
                            <p className='text-gray leading-tight'>Vote for resources that helped you the most and help others find the best content.</p>
                        </div>
                    </div>




                </div>

            </div>

            {/* ----------------------------------- REVIEWS ------------------------------------- */}


            <div className='px-32'>

                <h2 className="text-3xl font-medium text-gray text-center mb-16"><span className='text-offwhite'>1200+</span> active learners.</h2>

                <Reviews />

            </div>






        </div >

    )
}

export default Home