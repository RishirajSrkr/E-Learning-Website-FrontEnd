import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'

function AllCourses() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [courses, setCourses] = useState({})

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

        <div className='bg-bgColorOne py-20 min-h-screen'>

            <h3 className='text-6xl font-bold text-center pt-10 text-maintextColor opacity-90'>{headline}</h3>


            <h5 className='text-lg font-medium text-center mt-2 mb-12 text-subtextColor'>Unlock Your Future Today!</h5>


            {
                isLoading ?
                    (
                        <div className='mt-40 text-center'>
                            <ThreeDot color="#E85533" size="small" />
                        </div>
                    )
                    :

                    (
                        <div className='masonry'>
                            {
                                Object.keys(courses).map((key) => {
                                    return <div className='masonry-item' key={key}>
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
                                })
                            }

                        </div>
                    )
            }
        </div>

    )

}

export default AllCourses