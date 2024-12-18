import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../config/axiosConfig'
import { toast } from 'sonner';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/Loader'
import { CgMenuGridR } from "react-icons/cg";
import { motion } from 'framer-motion';

function FullCoursePage() {

    const navigate = useNavigate();
    const ref = useRef();
    const { courseId } = useParams();

    const { loggedInUser } = useContext(AuthContext)
    const [course, setCourse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showVoteAndOtherOptions, setShowVoteAndOtherOptions] = useState(false)

    //we need to store this info in localstorage
    const [markedChapters, setMarkedChapters] = useState([]);

    //when website loads up, load the marked chapters from localstorage to the markedChapters state
    useEffect(() => {
        const storedMarkedChapters = localStorage.getItem("marked_chapters");
        if (storedMarkedChapters) {
            setMarkedChapters(JSON.parse(storedMarkedChapters));
        }
    }, [])


    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);


    useEffect(() => {
        async function getCourse() {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/course/${courseId}`);
                const data = response.data;
                console.log(data);

                setCourse(data);
            }
            catch (e) {
                console.error("Error fetching course : ", e);
            }
            finally {
                setIsLoading(false)
            }
        }
        getCourse();
    }, [courseId])


    function convertDateToSuitableFormat(timestamp) {
        // Convert to Date object
        const date = new Date(timestamp);

        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    function handleMarkClick(chapterIndex) {

        //if the chapter is already marked complete, and the user clicks again it means the user is trying to mark it incomplete
        if (isChapterMarkedComplete(chapterIndex)) {
            const newMarkedChapters = markedChapters.filter(index => index != chapterIndex);
            setMarkedChapters(newMarkedChapters);
            localStorage.setItem("marked_chapters", JSON.stringify(newMarkedChapters))

        }


        else {
            const oldMarkedChapters = JSON.parse(localStorage.getItem("marked_chapters")) || [];
            const newMarkedChapters = [...oldMarkedChapters, chapterIndex];

            localStorage.setItem("marked_chapters", JSON.stringify(newMarkedChapters))

            setMarkedChapters(newMarkedChapters)
        }


    }
    function isChapterMarkedComplete(chapterIndex) {
        const ans = markedChapters?.filter(index => index == chapterIndex)
        return ans?.length != 0;
        //if length 0 it means chapterIndex is not present in markedChapters
    }

    console.log(markedChapters);


    async function handleVoteClick() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/${courseId}/vote-course`);

            const data = response.data;

            if (response.status == 200) {
                toast.success("Successfully voted")
            }


        }

        catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);

                toast.warn("Already voted")

            }
        }


    }


    async function handleEndCourse() {
        try {

            toast.success("Course removed successfully")

            navigate("/all-courses")

            await axios.post(`${import.meta.env.VITE_BASE_URL}/enrollments/end-course/${courseId}`)

        }
        catch (e) {
            toast.error("Failed to remove the course, try again")
            navigate(`/course/${courseId}`)

        }


    }


    function handleDiscussionsClick() {


        navigate(`/course/${courseId}/discussions`)
    }


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Staggering effect for children
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: -20 }, // Start above with 0 opacity
        visible: { opacity: 1, y: 0 },  // Slide down with full opacity
    };



    return (
        <div ref={ref} className='dark:bg-black bg-white text-black dark:text-white pb-10 min-h-screen w-full'>

            {
                isLoading ?

                    (
                        <Loader classname={"h-screen"} />
                    )

                    :

                    (


                        <div className='w-full relative px-24'>

                            {
                                course?.instructorName != loggedInUser && <button
                                    onClick={() => setShowVoteAndOtherOptions(prev => !prev)}
                                    className='fixed top-24 right-10 '
                                ><CgMenuGridR size={24} /></button>

                            }

                            {

                                showVoteAndOtherOptions && <div className='flex flex-col gap-1 fixed top-28 right-10  p-6 rounded-lg  text-sm font-medium'>

                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-1" // Adds spacing between buttons
                                    >
                                        <motion.button
                                            variants={buttonVariants}
                                            onClick={handleVoteClick}
                                            className="bg-gray-50 dark:bg-bgTwo px-6 py-2 flex gap-2 items-center justify-start w-32"
                                        >
                                            Up Vote
                                        </motion.button>

                                        <motion.button
                                            variants={buttonVariants}
                                            onClick={handleDiscussionsClick}
                                            className="bg-gray-50 dark:bg-bgTwo px-6 py-2 flex gap-2 items-center justify-start w-32"
                                        >
                                            Discussion
                                        </motion.button>

                                        <motion.button
                                            variants={buttonVariants}
                                            onClick={handleEndCourse}
                                            className="bg-gray-50 dark:bg-bgTwo px-6 py-2 flex gap-2 items-center justify-start w-32"
                                        >
                                            End Course
                                        </motion.button>
                                    </motion.div>


                                </div>
                            }



                            <div className='w-5/6 pt-24 '>

                                <div className='flex flex-col gap-4 mb-8'>
                                    <h1 className='text-5xl font-semibold '>{course?.courseName}</h1>

                                    <div className='mt-2 w-full h-[1px] bg-lightBorder dark:bg-darkBorder '></div>

                                    <div className='flex gap-10'>
                                        <div>
                                            <p className='text-gray font-medium'>Published on</p>
                                            <p className='font-semibold'>{convertDateToSuitableFormat(course?.createdAt)}</p>
                                        </div>

                                        <div>
                                            <p className='text-gray font-medium'>Last Updated</p>
                                            <p className='font-semibold'>{convertDateToSuitableFormat(course?.createdAt)}</p>
                                        </div>
                                    </div>

                                    {/* <div className='border border-lightBorder dark:border-darkBorder w-fit px-6 py-2 rounded-full text-sm font-semibold'>{course?.chapters.length} Chapters</div> */}
                                </div>

                                <div className='w-full'>
                                    {
                                        course?.chapters?.map((chapter, index) => (
                                            <div key={index} className={`relative mb-8 px-10 py-8 flex w-full flex-col gap-y-4 border border-lightBorder dark:border-darkBorder rounded-xl ${isChapterMarkedComplete(index) ? "opacity-40" : "opacity-100"}`}>


                                                <button onClick={() => handleMarkClick(index)} className=' absolute right-8 flex w-full items-center justify-end gap-2'>
                                                    <p>Mark Complete</p>
                                                    <span>{isChapterMarkedComplete(index) == true ? <MdCheckCircle /> : < MdRadioButtonUnchecked />}</span>
                                                </button>


                                                <div className='flex gap-4 items-center w-full'>
                                                    <div className='h-3 w-3 bg-accentColor rounded-full'></div>
                                                    <h2 className='font-semibold text-4xl break-words w-3/4'>{chapter.chapterName}</h2>
                                                </div>


                                                <div className=''>
                                                    <p className='text-lg'>{chapter.chapterContent}</p>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>




                        </div>
                    )


            }


        </div>

    )


}

export default FullCoursePage