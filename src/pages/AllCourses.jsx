import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'
import Search from '../components/Search'
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import GoBack from '../components/GoBack';
import { motion } from 'framer-motion'
function AllCourses() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [courses, setCourses] = useState({})

    const [searchQuery, setSearchQuery] = useState("");



    useEffect(() => {

        async function getAllCourses() {
            try {
                setIsLoading(true);
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




    const filteredCourses = Object.keys(courses).filter(key =>
        courses[key].courseName.toLowerCase().includes(searchQuery.toLowerCase())
        ||
        courses[key].courseDescription.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(key => courses[key]);






    async function handleCourseCardClick(id) {

        //take me to the full course page
        navigate(`/course/${id}`)

        const s = `${import.meta.env.VITE_BASE_URL}/course/${id}/enroll-course`


        //add this course to the users enrolled course list
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/${id}/enroll-course`)

        const data = await response.data;



    }



    const headline = "</ Learn for Free />"


    return (

        <div className='bg-bgOne min-h-screen px-24 flex flex-col items-center relative overflow-hidden py-12'>

            <GoBack text={"Go Back"} goWhere={"/"} />


            <h3 className='text-6xl font-bold text-center pt-10 text-white'>{headline}</h3>


            <h5 className='text-lg font-medium text-center mt-4 mb-12 text-gray'>Unlock Your Future Today!</h5>

            <Search
                classname={""}
                placeholder={"Search Courses"}
                onSearch={setSearchQuery}
                icon={<HiMiniDocumentMagnifyingGlass size={18} />}
            />




            {
                isLoading ?
                    (
                        <div className='mt-40 text-center'>
                            <ThreeDot color="#9CF57F" size="small" />
                        </div>
                    )
                    :

                    (

                        <div className='mt-12 relative'>

                            {/* <SecondaryButton text={"Completed Courses"} classname={"text-white absolute -top-10 -right-0"} /> */}

                            {

                                searchQuery ?

                                    (
                                        Object.keys(filteredCourses).length > 0 ?

                                            (
                                                <div className='masonry'>
                                                    {
                                                        Object.keys(filteredCourses).map((key, index) => {
                                                            return <motion.div
                                                                initial={{ y: (100), opacity: 0 }}
                                                                animate={{ y: 0, opacity: 100 }}
                                                                transition={{ delay: 0.1 * index }}
                                                                className='masonry-item'
                                                            >
                                                                <CourseCard
                                                                    title={filteredCourses[key].courseName}
                                                                    imageUrl={filteredCourses[key].imageUrl}
                                                                    instructor={filteredCourses[key].instructorName}
                                                                    description={filteredCourses[key].courseDescription}
                                                                    vote={filteredCourses[key].vote}
                                                                    onClick={() => handleCourseCardClick(key)}
                                                                    showCTA={true}
                                                                    text={"Enroll"}

                                                                />
                                                            </motion.div>


                                                        })
                                                    }
                                                </div>
                                            )

                                            :

                                            (
                                                <p className=' mt-40 flex justify-center items-center text-gray'>No courses found!</p>
                                            )
                                    )

                                    :

                                    (

                                        <div className='masonry'>
                                            {Object.keys(courses).map((key, index) => {
                                                return <motion.div
                                                    key={key}
                                                    initial={{ y: (100), opacity: 0 }}
                                                    animate={{ y: 0, opacity: 100 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className='masonry-item'>
                                                    <CourseCard
                                                        imageUrl={courses[key].imageUrl}
                                                        title={courses[key].courseName}
                                                        instructor={courses[key].instructorName}
                                                        description={courses[key].courseDescription}
                                                        vote={courses[key].vote}
                                                        onClick={() => handleCourseCardClick(key)}
                                                        showCTA={true}
                                                        text={"Enroll"}

                                                    />
                                                </motion.div>
                                            })}
                                        </div>
                                    )
                            }

                        </div>
                    )
            }
        </div>

    )

}

export default AllCourses