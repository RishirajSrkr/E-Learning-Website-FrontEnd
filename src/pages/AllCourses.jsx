import React, { useEffect, useState } from 'react'
import { courses as allCourseData } from '../data/courses'
import CourseCard from '../components/CourseCard'
import { useNavigate } from 'react-router-dom'

function AllCourses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        setCourses(allCourseData)
    }, [])

    const navigate = useNavigate();

    function handleCourseCardClick(id){
        console.log("clicked", id);
        
        navigate(`/course/${id}`)
    }

    const headline = "</ Learn for Free />"
    return (


        <div className='bg-bgColorOne mt-20'>

            <h3 className='text-6xl font-bold text-center pt-10 bg-gradient bg-clip-text text-transparent'>{headline}</h3>


            <h5 className='text-xl font-semibold text-center mt-2 mb-12 text-gray-400 '>Unlock Your Future Today!</h5>


            <div className='gradient-line mb-16'></div>
            <div className='flex flex-wrap gap-4 justify-center items-start'>
                {
                    courses.map((course, index) => {
                        return <CourseCard

                            key={index}
                            title={course.title}
                            instructor={course.instructor}
                            duration={course.duration}
                            description={course.description}
                            rating={course.rating}
                            id={course.id}
                            onClick={() => handleCourseCardClick(course.id)}


                        />
                    })
                }

            </div>
        </div>

    )
}

export default AllCourses