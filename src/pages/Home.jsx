import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import { IoChevronDownSharp } from "react-icons/io5";
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'
import HomeV2 from './HomeV2';
import Reviews from '../components/Reviews'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Home() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState({});
    const [isLoading, setIsLoading] = useState(false)


    const { ref, inView } = useInView({
        triggerOnce: true, // Animates only the first time it enters the viewport
        threshold: 0.0,    // Trigger animation when 10% of the component is visible
    })


    useEffect(() => {
        async function getAllCourses() {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/all-courses`);
                setCourses(response.data)
            }
            catch (e) {
                console.error("Error fetching courses : ", e);
            }
            finally {
                setIsLoading(false)
            }
        }
        getAllCourses();

    }, [])



    function handleCourseCardClick(id) {
        console.log("id :: ", id);

        navigate(`/course/${id}`)
    }



    return (

        <div className='relative bg-bgOne min-h-screen pb-12'>


            {/* <div className='overflow-hidden bg-blend-multiply absolute top-0 translate-x-1/2 left-0 w-1/2 h-4/5'>
                <HomeV2 />

            </div> */}

            {/* <div className='h-screen'>
                <div className='flex justify-center h-full items-center' style={{ position: "relative" }}>
                    <div className="text-center">

                        <div className='flex gap-6 justify-center '>
                            <div className='flex gap-6 justify-center'>
                                <motion.h2
                                    initial={{ x: (-200), opacity: 0 }}
                                    animate={{ x: 0, opacity: 100 }}
                                    transition={{ delay: 0.1 }}
                                    className='text-maintextColor font-light text-8xl tracking-tighter'>DISCOVER
                                </motion.h2>

                                <motion.h2
                                    initial={{ x: (-200), opacity: 0 }}
                                    animate={{ x: 0, opacity: 100 }}
                                    transition={{ delay: 0.15 }}
                                    className='text-maintextColor font-light text-8xl tracking-tighter'>THE
                                </motion.h2>


                            </div>
                            <motion.h2
                                initial={{ x: (-200), opacity: 0 }}
                                animate={{ x: 0, opacity: 100 }}
                                transition={{ delay: 0.20 }}
                                className='font-semibold text-accentColorOne text-8xl tracking-tighter text'
                            >
                                BEST
                            </motion.h2>
                        </div>


                        <div className='flex gap-6 justify-center'>
                            <motion.h2
                                initial={{ x: (-200), opacity: 0 }}
                                animate={{ x: 0, opacity: 100 }}
                                transition={{ delay: 0.25 }}

                                className='-mt-1 text-accentColorOne font-semibold font-md text-8xl tracking-tighter'>DEVELOPER
                            </motion.h2>

                            <motion.h2
                                initial={{ x: (-200), opacity: 0 }}
                                animate={{ x: 0, opacity: 100 }}
                                transition={{ delay: 0.30 }}

                                className='-mt-1 text-maintextColor font-light font-md text-8xl tracking-tighter'>RESOURCES.
                            </motion.h2>

                        </div>



                        <motion.div
                            animate={{ y: 10, opacity: 100 }}
                            initial={{ y: -200, opacity: 0 }}
                            transition={{ delay: 0.20 }}

                            className='flex gap-2 items-center justify-center border mt-8 border-borderColor px-4 py-1 rounded-full w-fit mx-auto'>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColorOne opacity-75"></span>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColorOne  opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentColorOne "></span>

                            </span>

                            <span className='text text-center lowercase text-accentColorOne font-medium'>Voted by Developers Like You.</span>
                        </motion.div>
                    </div>
                </div>

                <div className='animate-bounce absolute left-1/2 -mt-20'>
                    <IoChevronDownSharp
                        className='text-offWhite text-xl'
                    />
                </div>

            </div> */}



            <div className='w-full px-24 min-h-screen bg-bgOne flex justify-center items-center'>


                <div className='w-full bg-bgTwo p-20 flex flex-col items-start gap-6 border border-border rounded-lg '>

                    {/* ---------- headline ------------ */}
                    <div className='text-white text-7xl tracking-tight font-semibold'>
                        <h2>Discover the Best</h2>
                        <h2>Developer Resources.</h2>
                    </div>

                    {/* ------------- subtext ------------ */}
                    <div className='text-gray'>
                        <p>Voted by developers like you, for you.</p>
                    </div>


                    {/* ------------ cta button ---------------- */}
                    <Link to={"/all-courses"} className='text-bgOne bg-gradientForBg px-5 py-2 rounded-full text-sm font-semibold'>View Courses</Link>
                </div>


            </div>


            {/* -------------------------------- COURSES ---------------------------------- */}
            <div className='w-full mb-20  min-h-screen flex justify-center items-center'>

                {
                    isLoading ?
                        (
                            <div className='text-center'>
                                <ThreeDot color="#9CF57F" size="small" />
                            </div>
                        )

                        :

                        (
                            <div ref={ref} className='masonry'>
                                {
                                    Object.keys(courses).map((key, index) => {

                                        return <motion.div
                                            initial={{ y: (100), opacity: 0 }}
                                            animate={inView ? { y: 0, opacity: 100 } : {}}
                                            transition={{ delay: 0.1 * index }}

                                            key={key} className="masonry-item">

                                            <CourseCard
                                                title={courses[key].courseName}
                                                imageUrl={courses[key].imageUrl}
                                                instructor={courses[key].instructorName}
                                                description={courses[key].courseDescription}
                                                vote={courses[key].vote}
                                                onClick={() => handleCourseCardClick(key)}
                                                showCTA={true}
                                                text={"Enroll"}

                                            />
                                        </motion.div>

                                    })
                                }

                            </div>
                        )
                }


            </div>





            <div className='w-full px-24'>

                <div className='bg-bgTwo w-full py-20 px-20 flex flex-col gap-16 h-screen rounded-lg border border-border'>

                    <div className='w-full flex flex-col'>


                        <div className='text-white text-7xl tracking-tight font-semibold'>
                            <h2>Success Stories</h2>
                            <h2>from our Community.</h2>
                        </div>


                    </div>

                    <Reviews />

                </div>
            </div>



        </div>

    )
}

export default Home