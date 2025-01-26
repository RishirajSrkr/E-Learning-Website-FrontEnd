import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidUpvote } from "react-icons/bi";
import { invariant, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'
import { FaRegCopy } from "react-icons/fa6";
import { toast } from 'sonner';

function VotingPageCourseCard({ courseName, index, imageUrl, vote, courseId }) {

    const navigate = useNavigate();

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    function copyText(text){
        navigator.clipboard.writeText(text)
        toast.success("Course name copied!")
    }
    return (

        <motion.div

            initial={{ x: (-300), opacity: 0 }}
            animate={inView ? { x: 0, opacity: 100 } : {}}
            transition={{ delay: 0.1 * index }}


            className='flex justify-start items-center w-full h-fit' >

            <div ref={ref} className='w-full bg-gradient-to-b from-gray-100 to-white  dark:bg-gradient-to-b dark:from-bgTwo dark:to-bgOne rounded-xl px-4 py-4 text-black dark:text-white'>

                <div className='w-full bg-gray-50 dark:bg-bgTwo rounded-lg p-0.5 relative'>



                    <div
                    className='cursor-pointer absolute right-4 top-4 bg-zinc-100 dark:bg-bgThree p-2.5 text-zinc-700 dark:text-zinc-400 rounded-full'
                    onClick={() => copyText(courseName)}
                    >
                        < FaRegCopy size={12} />
                    </div>


                    <div className='w-full bg-white dark:bg-bgOne rounded-lg gap-4 px-4  flex justify-between'>

                        <div className='w-1/6 flex justify-center'>
                            <h4 className='flex gap-3 font-semibold text-accentColor text-5xl justify-start items-center'>{index}</h4>
                        </div>


                        <div className='w-4/6 flex justify-center'>
                            <h4 className='py-10 text-4xl w-full tracking-tighter font-semibold flex justify-start items-center'>{courseName}</h4>
                        </div>

                        <div className='w-1/6 flex justify-center '>
                            <h4 className='flex gap-3 font-semibold text-xl justify-start items-center'> <BiSolidUpvote size={15} className='text-accentColor' /> {vote}</h4>
                        </div>



                    </div>
                </div>

            </div>

        </motion.div >


    )
}

export default VotingPageCourseCard