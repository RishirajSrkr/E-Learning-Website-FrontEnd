import React, { useContext, useEffect, useState } from 'react'
import { CourseCard } from '../../components/CourseCard'
import { CourseCardSkeleton } from '../../components/CourseCard'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import MobileCourseView from './MobileView/MobileCourseView'
import { GrPowerReset } from "react-icons/gr"
import Masonry from 'react-masonry-css'
import { UserContext } from '../../context/UserContext'
import { FaUser } from "react-icons/fa";

function AllCourses() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const name = searchParams.get("name")
    console.log(query);
    console.log(name);


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
    const { user, isLoading: loggedInUserIsLoading, fetchUser } = useContext(UserContext)

    useEffect(() => {

        //saving the url in session storage, to redirect the url here after login
        const redirectAfterLogin = window.location.href;
        sessionStorage.setItem("redirectAfterLogin", redirectAfterLogin)


        fetchUser();

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




    console.log(courses);


    async function handleCourseEnroll(courseId) {
        try {

            if (!loggedInUser) {
                navigate("/login")
            }
            else {

                if (searchQuery) {
                    if (filteredCourses[courseId].instructorEmail == user.email) {
                        navigate(`/course/${courseId}`)
                        return;
                    }
                } else {
                    if (courses[courseId].instructorEmail == user.email) {
                        navigate(`/course/${courseId}`)
                        return;
                    }
                }


                if (user.enrolledCourses.includes(courseId)) {
                    navigate(`/course/${courseId}`)
                    return;
                }
                else {
                    toast.success("Course enrolled")
                    navigate(`/course/${courseId}`)
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/enrollments/${courseId}`);
                    console.log(response.data);

                    fetchUser();
                }
            }
        }
        catch (error) {
            toast.error("Failed to enroll, try again")
            navigate("/all-resources")
            console.log(error);

        }

    }

    useEffect(() => {
        if (query) {
            setSearchQuery(query)
        }
    }, [])


    useEffect(() => {


        function handleFilter() {
            if (!courses || Object.keys(courses).length === 0) return;

           const filtered =  Object.keys(courses).reduce((acc,  key) => {
                const course = courses[key];
                if(course.courseName.toLowerCase().includes(searchQuery)
                    || course.courseDescription.toLowerCase().includes(searchQuery)
                || course.instructorEmail.split('@')[0].toLowerCase().includes(searchQuery)
                ){
                    acc[key] = course;
                }

                return acc;

            }, {})

            setFilteredCourses(filtered)
        }

        handleFilter();
    }, [searchQuery, courses]);


    console.log("Filtered :: ", filteredCourses);
    console.log("All :: ", courses);
    

    return (

        <div className='bg-white dark:bg-black min-h-screen flex flex-col relative overflow-hidden text-black dark:text-white w-full '>

            {

                isMobile ?
                    (

                        <MobileCourseView
                            courses={courses}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredCourses={filteredCourses}
                            handleCourseEnroll={handleCourseEnroll}
                            isLoading={isLoading}
                        />
                    )

                    :

                    (

                        <div className='w-full mb-12 pt-32'>



                            {/* ---------------------------- COURSES -------------------------------- */}
                            <div className='w-10/12 relative min-h-screen rounded-lg  px-20'>


                                {/* If user came to this page by clicking on "view courses" of a user card, then show a "go back" button that will take the user to the normal all resource page view */}
                                {

                                    query && <div className='w-full bg-zinc-50 dark:bg-bgTwo border border-lightBorder dark:border-darkBorder mb-8 flex items-center justify-between px-3 pl-6 h-[50px] rounded-lg'>
                                        <span className='flex items-center gap-5 font-medium '>
                                            <p>Resources uploaded by</p>
                                            <span className='flex items-center gap-2'> < FaUser size={12} className='text-zinc-500 -translate-y-[1px]' /> <p>{name}</p> </span>
                                        </span>
                                        <div
                                            onClick={() => {
                                                navigate("/all-resources");
                                                setSearchQuery("")
                                            }}
                                            className='cursor-pointer bg-accentColor px-3 text-white text-sm font-medium py-1 rounded-md'>Go back</div>
                                    </div>
                                }




                                {
                                    (isLoading || loggedInUserIsLoading) &&
                                    <div className='masonry w-full'>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className='masonry-item'>
                                                <CourseCardSkeleton />
                                            </div>
                                        ))}
                                    </div>

                                }

                                {

                                    !loggedInUserIsLoading && !isLoading &&

                                    <div>
                                        {
                                            courses.length == 0 && <p className='text-zinc-500 flex justify-center h-[600px] items-center'>No courses available.</p>
                                        }

                                        {

                                            courses.length != 0 &&

                                            <div>
                                                {searchQuery && filteredCourses.length == 0 &&
                                                    <p className='dark:text-zinc-500 flex flex-wrap justify-center items-center h-[500px]'>
                                                        No courses available.
                                                    </p>
                                                }

                                                <Masonry
                                                    breakpointCols={3}
                                                    className="flex" // compensate for padding
                                                    columnClassName="pl-4" // padding between columns
                                                >
                                                    {
                                                        Object.keys(searchQuery ? filteredCourses : courses).map((key, index) => (
                                                            <motion.div
                                                                key={key}
                                                                initial={{ y: (100), opacity: 0 }}
                                                                animate={{ y: 0, opacity: 100 }}
                                                                transition={{ delay: 0.1 * index }}
                                                                className='mb-4'
                                                            >
                                                                <CourseCard
                                                                    courseId={key}
                                                                    title={searchQuery ? filteredCourses[key].courseName : courses[key].courseName}
                                                                    imageUrl={searchQuery ? filteredCourses[key].imageUrl : courses[key].imageUrl}
                                                                    description={searchQuery ? filteredCourses[key].courseDescription : courses[key].courseDescription}
                                                                    votes={searchQuery ? filteredCourses[key].votes : courses[key].votes}
                                                                    onClick={() => handleCourseEnroll(key)}
                                                                    showCTA={true}
                                                                    uploadedBy={searchQuery ? filteredCourses[key].instructorEmail : courses[key].instructorEmail}
                                                                    firstChapter={searchQuery ? filteredCourses[key].chapters[0] : courses[key].chapters[0]}
                                                                />
                                                            </motion.div>
                                                        ))
                                                    }
                                                </Masonry>
                                            </div>
                                        }
                                    </div>



                                }

                            </div>


                            {/* ----------------------------------- filter -------------------------- */}

                            <div className='flex fixed right-0 top-14 bottom-0  bg-white  dark:bg-bgOneLight flex-col  w-2/12 border-l border-lightBorder dark:border-darkBorder p-4 '>



                                <div className='relative w-full mb-4'>

                                    <input
                                        type="text"
                                        placeholder="Search resources"
                                        className={`pl-10 w-full bg-white dark:bg-black pr-4 text-black dark:text-white  outline-none focus:ring-0 rounded-md py-2.5 placeholder-zinc-500 border border-lightBorder dark:border-darkBorder `}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />

                                    <div className='text-zinc-500 absolute  top-1/2 -translate-y-1/2 left-3'>
                                        <HiMiniDocumentMagnifyingGlass />
                                    </div>
                                </div>





                                <div className='h-full'>
                                    <form className=' text-black dark:text-white font-medium flex flex-col relative h-full'>


                                        <div className='w-full flex flex-col gap-1 '>



                                            <div onClick={() => setSearchQuery("react")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="react" checked={searchQuery === "react"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>React JS</label>
                                            </div>


                                            <div onClick={() => setSearchQuery("fullstack")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="fullstack" checked={searchQuery === "fullstack"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>Full Stack</label>
                                            </div>


                                            <div onClick={() => setSearchQuery("java")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="java" checked={searchQuery === "java"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>Core Java</label>
                                            </div>


                                            <div onClick={() => setSearchQuery("spring")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="spring" checked={searchQuery === "spring"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>Spring Boot</label>
                                            </div>



                                            <div onClick={() => setSearchQuery("javascript")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="javascript" checked={searchQuery === "javascript"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>JavaScript</label>
                                            </div>


                                            <div onClick={() => setSearchQuery("machine")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="machine" checked={searchQuery === "machine"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>AI / ML</label>
                                            </div>


                                            <div onClick={() => setSearchQuery("redis")} className=' flex items-center gap-2 w-full'>
                                                <input className='peer hidden cursor-pointer' type="radio" value="redis" checked={searchQuery === "redis"} onChange={handleOptionChange} multiple={true} />
                                                <label className='cursor-pointer dark:peer-checked:text-white peer-checked:text-black dark:peer-checked:bg-zinc-700 peer-checked:shadow-md shadow-sm bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'>Redis Caching</label>
                                            </div>





                                        </div>


                                        <div onClick={() => {

                                            setSearchQuery("");
                                            setFilteredCourses({});
                                            if (query) { navigate("/all-resources") }
                                        }}

                                            className='absolute right-0 bottom-0 flex items-center gap-2 w-full'>
                                            <label className='cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2 dark:hover:bg-zinc-800 transition-all duration-300 ease-in-out bg-white dark:bg-bgTwo px-5 py-2 rounded-md w-full'><GrPowerReset size={14} />Reset</label>
                                        </div>




                                    </form>

                                </div>




                            </div>
                        </div>
                    )
            }



            <Footer width={isMobile ? "w-full" : "w-10/12"} />
        </div >

    )

}

export default AllCourses