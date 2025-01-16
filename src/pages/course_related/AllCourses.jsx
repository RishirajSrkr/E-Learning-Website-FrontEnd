import React, { useContext, useEffect, useState } from 'react'
import { CourseCard } from '../../components/CourseCard'
import { CourseCardSkeleton } from '../../components/CourseCard'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axiosConfig'
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import { motion } from 'framer-motion'
import { WindowWidthContext } from '../../context/WindowWidthContext';
import { toast } from 'sonner'
import Loader from '../../components/Loader'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { AuthContext } from '../../context/AuthContext';
import Footer from '../../components/Footer';
// import required modules




function AllCourses() {

    const navigate = useNavigate();




    function handleOptionChange(e) {
        console.log(e.target.value);
        setSearchQuery(e.target.value)
    }


    const [isLoading, setIsLoading] = useState(true);


    const [courses, setCourses] = useState({})

    const [searchQuery, setSearchQuery] = useState("");

    const [filteredCourses, setFilteredCourses] = useState({});

    const { isMobile } = useContext(WindowWidthContext)

    const { loggedInUser } = useContext(AuthContext)


    useEffect(() => {

        //saving the url in session storage, to redirect the url here after login
        const redirectAfterLogin = window.location.href;
        sessionStorage.setItem("redirectAfterLogin", redirectAfterLogin)


        async function getAllCourses() {
            try {
                setIsLoading(true);

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/all-courses`);
                setCourses(response.data)
                console.log(response.data);


            }
            catch (e) {
                console.error("Error fetching courses : ", e);
            }
            finally {
                setTimeout(() => {

                }, 5000);
                setIsLoading(false)
            }
        }
        getAllCourses();


    }, [])





    async function handleCourseEnroll(id) {
        try {

            if (!loggedInUser) {
                navigate("/login")
            }

            else {
                toast.success("Course enrolled")

                //take me to the full course page
                navigate(`/course/${id}`)


                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/enrollments/${id}`);
                console.log(response.data);


            }

        }
        catch (error) {
            toast.error("Failed to enroll, try again")
            navigate("/all-courses")
            console.log(error);

        }

    }


    useEffect(() => {

        console.log("search query", searchQuery);

        const filteredCourses = Object.keys(courses).filter(key =>
            courses[key].courseName.toLowerCase().includes(searchQuery.toLowerCase())
            ||
            courses[key].courseDescription.toLowerCase().includes(searchQuery.toLowerCase())

        ).map(key => courses[key]);

        setFilteredCourses(filteredCourses);

    }, [searchQuery])



    const headline = "</ Learn for Free />"


    return (

        <div className='bg-white dark:bg-black min-h-screen flex flex-col relative overflow-hidden text-black dark:text-white w-full pt-32 '>




            <div className='w-full mb-12'>

                {/* ---------------------------- COURSES -------------------------------- */}
                <div className='w-10/12 relative min-h-screen rounded-lg  px-20'>
                    {
                        isLoading &&
                        <div className='masonry w-full'>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className='masonry-item'>
                                    <CourseCardSkeleton />
                                </div>
                            ))}
                        </div>

                    }

                    {!isLoading && courses.length == 0 ?
                        (
                            <p className='text-gray-500 flex justify-center h-[600px] items-center'>No courses available.</p>
                        )

                        :

                        (


                            <div>

                                {searchQuery && filteredCourses.length == 0 && <p className='dark:text-gray-500 flex flex-wrap justify-center items-center h-[600px]'>No course found with the name : {searchQuery}</p>}

                                <div className='masonry'>
                                    {
                                        Object.keys(searchQuery ? filteredCourses : courses).map((key, index) => {
                                            return <motion.div
                                                key={key}
                                                initial={{ y: (100), opacity: 0 }}
                                                animate={{ y: 0, opacity: 100 }}
                                                transition={{ delay: 0.1 * index }}
                                                className='masonry-item'
                                            >
                                                <CourseCard
                                                    title={searchQuery ? filteredCourses[key].courseName : courses[key].courseName}
                                                    imageUrl={searchQuery ? filteredCourses[key].imageUrl : courses[key].imageUrl}
                                                    instructor={searchQuery ? filteredCourses[key].instructorName : courses[key].instructorName}
                                                    description={searchQuery ? filteredCourses[key].courseDescription : courses[key].courseDescription}
                                                    votes={searchQuery ? filteredCourses[key].votes : courses[key].votes}
                                                    onClick={() => handleCourseEnroll(key)}
                                                    showCTA={true}
                                                    text={"Enroll"}
                                                    firstChapter={searchQuery ? filteredCourses[key].chapters[0] : courses[key].chapters[0]}
                                                />

                                            </motion.div>


                                        })
                                    }
                                </div>

                            </div>
                        )


                    }

                </div>


                {/* ----------------------------------- filter -------------------------- */}

                <div className='flex fixed right-0 top-14 bottom-0  bg-white  dark:bg-black flex-col items-start gap-8 w-2/12 border-l border-lightBorder dark:border-darkBorder p-4 '>



                    <div className='relative w-full'>

                        <input
                            type="text"
                            placeholder="Search courses"
                            className={`pl-10 w-full bg-gray-100 dark:bg-black pr-4 text-black dark:text-white  outline-none focus:ring-0 rounded-md py-2.5 placeholder-gray-500 border border-lightBorder dark:border-darkBorder `}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <div className='text-gray-500 absolute  top-1/2 -translate-y-1/2 left-3'>
                            <HiMiniDocumentMagnifyingGlass />
                        </div>
                    </div>





                    <div>
                        <form className='flex flex-col items-start gap-1.5 text-black dark:text-white font-medium'>

                            <div onClick={() => setSearchQuery("javascript")} className=' flex flex-row-reverse items-center justify-center gap-2'>
                                <label className='cursor-pointer'>JavaScript</label>
                                <input className='peer hidden cursor-pointer' type="radio" value="javascript" checked={searchQuery === "javascript"} onChange={handleOptionChange} multiple={true} />
                                <span
                                    class="w-3.5 h-3.5 rounded-full border-2 border-gray peer-checked:border-accentColor peer-checked:bg-accentColor"
                                ></span>
                            </div>

                            <div onClick={() => setSearchQuery("react")} className=' flex flex-row-reverse items-center justify-center gap-2'>
                                <label className='cursor-pointer'>React JS</label>
                                <input className='peer hidden cursor-pointer' type="radio" value="react" checked={searchQuery === "react"} onChange={handleOptionChange} multiple={true} />
                                <span
                                    class="w-3.5 h-3.5 rounded-full border-2 border-gray peer-checked:border-accentColor peer-checked:bg-accentColor"
                                ></span>
                            </div>

                            <div onClick={() => setSearchQuery("java")} className=' flex flex-row-reverse items-center justify-center gap-2'>
                                <label className='cursor-pointer'>Java</label>
                                <input className='peer hidden cursor-pointer' type="radio" value="java" checked={searchQuery === "java"} onChange={handleOptionChange} multiple={true} />
                                <span
                                    class="w-3.5 h-3.5 rounded-full border-2 border-gray peer-checked:border-accentColor peer-checked:bg-accentColor"
                                ></span>
                            </div>

                            <div onClick={() => setSearchQuery("spring")} className=' flex flex-row-reverse items-center justify-center gap-2'>
                                <label className='cursor-pointer'>Spring Boot</label>
                                <input className='peer hidden cursor-pointer' type="radio" value="spring" checked={searchQuery === "spring"} onChange={handleOptionChange} multiple={true} />
                                <span
                                    class="w-3.5 h-3.5 rounded-full border-2 border-gray peer-checked:border-accentColor peer-checked:bg-accentColor"
                                ></span>
                            </div>

                            <div onClick={() => setSearchQuery("machine")} className=' flex flex-row-reverse items-center justify-center gap-2'>
                                <label className='cursor-pointer'>Machine Learning</label>
                                <input className='peer hidden cursor-pointer' type="radio" value="machine" checked={searchQuery === "machine"} onChange={handleOptionChange} multiple={true} />
                                <span
                                    class="w-3.5 h-3.5 rounded-full border-2 border-gray peer-checked:border-accentColor peer-checked:bg-accentColor"
                                ></span>
                            </div>



                            <button onClick={() => setSearchQuery("")} className='text-sm text-gray underline'>Reset</button>


                        </form>

                    </div>




                </div>
            </div>



            <Footer width={"w-10/12"} />
        </div >

    )

}

export default AllCourses