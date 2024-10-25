import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'
import Search from '../components/Search'
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import GoBack from '../components/GoBack';

function AllCourses() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [courses, setCourses] = useState({})

    const [searchQuery, setSearchQuery] = useState("");

    // function setQuery(query) {
    //     setSearchQuery(query)
    // }

    console.log(searchQuery);



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
        console.log("id :: ", id);

        //take me to the full course page
        navigate(`/course/${id}`)

        const s = `${import.meta.env.VITE_BASE_URL}/course/${id}/enroll-course`
        console.log(s);


        //add this course to the users enrolled course list
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/${id}/enroll-course`)

        const data = await response.data;

        console.log(data);


    }



    const headline = "</ Learn for Free />"


    return (

        <div className='bg-bgColorOne min-h-screen flex flex-col items-center relative overflow-hidden'>

            <GoBack text={"Go Back"} goWhere={"/"} />

            <div className='w-full aspect-square rounded-full bg-accentColorOne blur-3xl absolute top-2/4 opacity-5'></div>

            <h3 className='text-6xl font-bold text-center pt-10 text-maintextColor'>{headline}</h3>


            <h5 className='text-lg font-medium text-center mt-4 mb-12 text-subtextColor'>Unlock Your Future Today!</h5>

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
                            <ThreeDot color="#E85533" size="small" />
                        </div>
                    )
                    :

                    (

                        <div className='mt-12 relative'>

                            {/* <SecondaryButton text={"Completed Courses"} classname={"text-maintextColor absolute -top-10 -right-0"} /> */}

                            {

                                searchQuery ?

                                    (
                                        Object.keys(filteredCourses).length > 0 ?

                                            (
                                                Object.keys(filteredCourses).map(key => {
                                                    return <CourseCard

                                                        title={filteredCourses[key].courseName}
                                                        instructor={filteredCourses[key].instructorName}
                                                        description={filteredCourses[key].courseDescription}
                                                        vote={filteredCourses[key].vote}
                                                        onClick={() => handleCourseCardClick(key)}
                                                        showCTA={true}
                                                        text={"Enroll"}

                                                    />
                                                })
                                            )

                                            :

                                            (
                                                <p className=' mt-60 flex justify-center items-center text-subtextColor'>No contributors found!</p>
                                            )
                                    )

                                    :

                                    (

                                        <div className='masonry'>
                                            {Object.keys(courses).map(key => {
                                                return <div className='masonry-item'>
                                                    <CourseCard

                                                        title={courses[key].courseName}
                                                        instructor={courses[key].instructorName}
                                                        description={courses[key].courseDescription}
                                                        vote={courses[key].vote}
                                                        onClick={() => handleCourseCardClick(key)}
                                                        showCTA={true}
                                                        text={"Enroll"}

                                                    />
                                                </div>
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