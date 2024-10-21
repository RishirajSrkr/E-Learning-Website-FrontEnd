import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from '../config/axiosConfig'

function FullCoursePage() {

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);

    const { id } = useParams();
    console.log(id);

    const [course, setCourse] = useState(null)

    useEffect(() => {
        async function getCourse() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/course/${id}`);
                const data = await response.data;

                setCourse(data);
            }
            catch (e) {
                console.error("Error fetching course : ", e);
            }
        }
        getCourse();
    }, [id])


    console.log(course);


    if (!course) {
        return <div className='pt-32 min-h-screen bg-bgColorOne'>
            <h1 className='text-white'>Course not found.</h1>
        </div>
    }

    return (
        <div ref={ref} className='bg-bgColorOne text-gray-400 px-24 pb-10 min-h-screen'>

            <div className='w-2/3 pt-36'>

                <div className='flex gap-4 items-center mb-8'>
                    <h1 className='text-4xl font-bold '>{course.courseName}</h1>

                    <div className='bg-buttonGradient text-white w-fit px-6 py-2 rounded-full text-sm font-semibold'>{course.chapters.length} Chapters</div>
                </div>

                <div>
                    {
                        course.chapters.map((chapter, index) => (
                            <div key={index} className='mb-8'>

                                <h2
                                    className='font-bold text-xl '

                                >{chapter.chapterName}</h2>


                                <p>{chapter.chapterContent}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )


}

export default FullCoursePage