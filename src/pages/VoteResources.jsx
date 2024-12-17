import React, { useEffect, useState } from 'react'
import VotingPageCourseCard from '../components/VotingPageCourseCard';
import axios from '../config/axiosConfig'

import { motion } from "framer-motion"


function VoteResources() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {

        async function getTopVotedCourses() {
            try {

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/top-voted`);

                const data = response.data;
                setCourses(data)
                console.log(data);




            }
            catch (error) {
                if (response.data && response.data.error) {
                    console.log(error);

                }
            }
        }

        getTopVotedCourses();

    }, [])






    return (

        <div className='w-fill min-h-screen bg-white text-black dark:bg-black dark:text-white flex justify-center items-center flex-col pb-32'>


            <motion.div animate={{ x: 100 }} />


            {/* -------------- headline -------------- */}
            <div className='min-h-screen flex flex-col justify-center items-center text-center'>

                <div className='flex gap-0 w-full'>
                    <motion.h2
                        initial={{ y: (100), opacity: 0 }}
                        animate={{ y: 0, opacity: 100 }}
                        transition={{ delay: 0.1 }}
                        className='font-semibold  p-4 w-full font-md text-7xl tracking-tighter'>Discover,</motion.h2>

                    <motion.h2
                        initial={{ y: (100), opacity: 0 }}
                        animate={{ y: 0, opacity: 100 }}
                        transition={{ delay: 0.15 }}
                        className='font-semibold -mx-4  p-4 w-full text-7xl tracking-tighter text'
                    >
                        Vote,
                    </motion.h2>

                    <motion.h2
                        initial={{ y: (100), opacity: 0 }}
                        animate={{ y: 0, opacity: 100 }}
                        transition={{ delay: 0.20 }}
                        className='font-semibold  p-4 w-full   text-7xl tracking-tighter text'
                    >
                        Elevate
                    </motion.h2>

                </div>

                <motion.h2
                    initial={{ y: (100), opacity: 0 }}
                    animate={{ y: 0, opacity: 100 }}
                    transition={{ delay: 0.25 }}

                    className=' bg-white dark:bg-black mt-0 font-medium text-3xl tracking-tighter'>the best courses.
                </motion.h2>


            </div>




            <div className='w-full flex flex-col px-40 overflow-y-hidden'>

                {

                    courses?.map((course, index) => {
                        return <VotingPageCourseCard
                            key={index}
                            courseName={course.courseName}
                            instructor={course.instructorName}
                            imageUrl={course.imageUrl}
                            index={index + 1}
                            vote={course.votes}
                        />
                    })
                }

            </div>
        </div>
    )
}

export default VoteResources