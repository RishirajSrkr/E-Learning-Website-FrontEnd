import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import { courses as coursesData } from '../data/courses';
import { FaStarOfLife } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
function Home() {

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        setCourses(coursesData)
    }, [])


    return (

        <div className='bg-bgColorOne'>

            <div className='gradient-section h-screen'>
                <div className='flex justify-center h-full items-center' style={{ position: "relative" }}>
                    <div className='bg-buttonGradient w-fit bg-clip-text text-transparent  flex flex-col mx-auto uppercase justify-start scale-150'>

                        <div className='flex  items-center gap-8'>
                            <span className='text-9xl font-extrabold '>Best</span>
                            <FaStarOfLife
                                className='text-white text-6xl animate-spin-slow'
                            />
                        </div>

                        <span style={{ marginTop: "-20px" }} className='text-7xl font-extrabold'>Resources</span>


                        <div className='flex gap-2 items-center'>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>

                            </span>

                            <span className='text-sm lowercase text-gray-500 font-medium'>Voted by Developers Like You.</span>
                        </div>
                    </div>
                </div>

                <div className='animate-bounce' style={{ position: "absolute", bottom: "10%", left: "50%" }}>
                    <IoChevronDownSharp
                        className='text-gray-500 text-xl'
                    />
                </div>

            </div>



            <div className='gradient-line mb-24'></div>

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
                            
                        />
                    })
                }

            </div>

        </div>

    )
}

export default Home