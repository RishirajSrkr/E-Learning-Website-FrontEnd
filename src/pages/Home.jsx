import React, { useContext, useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'
import Reviews from '../components/Reviews'
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
function Home() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const { isMobile } = useContext(WindowWidthContext)

    function handleViewAllCourse() {
        navigate("/all-courses")
    }


    return (

        <div className='relative bg-bgOne min-h-screen pb-12'>


            {/* --------------------------------- HEAD LINE --------------------------------- */}

            <div className='w-full px-4 sm:min-h-screen bg-bgOne flex flex-col justify-center gap-4 sm:px-24 mb-6 sm:mb-0'>


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
                        text={"View courses"}
                        classname={"w-40 h-10 mx-auto"}
                        arrow={true}
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

            {/* ----------------------------------- REVIEWS ------------------------------------- */}

            {/* <div className='w-full px-4 sm:px-24'>

                <div className='bg-bgTwo w-full p-8 sm:p-20 flex flex-col gap-6 sm:gap-16 h-fit sm:h-screen rounded-lg border border-border'>

                    <div className='w-full flex flex-col'>


                        <div className='text-white text-3xl sm:text-7xl tracking-tight font-semibold'>
                            <h2>Success Stories</h2>
                            <h2>from our Community.</h2>
                        </div>


                    </div>

                    <Reviews />

                </div>
            </div> */}






        </div >

    )
}

export default Home