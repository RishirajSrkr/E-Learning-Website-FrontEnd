import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from '../config/axiosConfig'
import GoBack from '../components/GoBack';
import PrimaryButton from '../components/formComponents/PrimaryButton'

function FullCoursePage() {

    const ref = useRef();
    const { courseId } = useParams();

    const [course, setCourse] = useState(null)


    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);


    useEffect(() => {
        async function getCourse() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/course/${courseId}`);
                const data = await response.data;

                setCourse(data);
            }
            catch (e) {
                console.error("Error fetching course : ", e);
            }
        }
        getCourse();
    }, [])





    async function handleVoteClick(courseId) {
        try {
            console.log(courseId);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/${courseId}/vote-course`);

            const data = response.data;

            console.log(data);
            
        }

        catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);

            }
        }


    }


    if (!course) {
        return <div className='pt-32 min-h-screen bg-bgColorOne'>
            <h1 className='text-white'>Course not found.</h1>
        </div>
    }

    return (
        <div ref={ref} className='bg-bgColorOne text-gray-400 px-24 pb-10 min-h-screen'>

            <GoBack
                text={"Go Back"}
                goWhere={"/all-courses"}
            />

            <PrimaryButton
                text={"Up Vote"}
                classname={"fixed top-10 right-8"}
                onClick={() => handleVoteClick(courseId)}
            />

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