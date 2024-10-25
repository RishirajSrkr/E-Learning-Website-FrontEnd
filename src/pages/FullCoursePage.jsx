import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from '../config/axiosConfig'
import GoBack from '../components/GoBack';
import { toast } from 'react-hot-toast';
import PrimaryButton from '../components/formComponents/PrimaryButton'
import { ThreeDot } from 'react-loading-indicators';

function FullCoursePage() {

    const ref = useRef();
    const { courseId } = useParams();

    const [course, setCourse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


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
                const data = await response.data;

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
    }, [])





    async function handleVoteClick(courseId) {
        try {
            console.log(courseId);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/${courseId}/vote-course`);

            const data = response.data;

            if (response.status == 200) {
                toast.success("Successfully Voted!", {
                    position: "top-right",
                    style: {
                        background: "#1C1210",
                        color: "#E5E6E6",
                    }
                })
            }

            console.log(data);

        }

        catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);

                toast.error("Already Voted!", {
                    position: "top-right",
                    style: {
                        background: "#1C1210",
                        color: "#E5E6E6",
                    }
                })

            }
        }


    }


    function handleEndCourse() {

    }




    return (
        <div ref={ref} className='bg-bgColorOne text-gray-400 px-24 pb-10 min-h-screen'>

            <GoBack
                text={"Go Back"}
                goWhere={"/all-courses"}
            />


            {
                isLoading ?

                    (

                        <div className='flex justify-center items-center min-h-screen text-center'>
                            <ThreeDot color="#E85533" size="small" />
                        </div>
                    )

                    :

                    (
                        


                        <div>
                            <PrimaryButton
                                text={"Up Vote"}
                                classname={"fixed top-10 right-8"}
                                onClick={() => handleVoteClick(courseId)}
                            />

                            <div className='w-2/3 pt-36'>

                                <div className='flex gap-4 items-center mb-8'>
                                    <h1 className='text-4xl font-bold '>{course?.courseName}</h1>

                                    <div className='bg-buttonGradient text-white w-fit px-6 py-2 rounded-full text-sm font-semibold'>{course?.chapters.length} Chapters</div>
                                </div>

                                <div>
                                    {
                                        course?.chapters?.map((chapter, index) => (
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


                            {/* when a user ends a course, course will be removed from the user's 'Enrolled course list' and now this course will be visbile in the 'all-course' page but under the filter - 'view finished courses' */}

                            <button
                                onClick={handleEndCourse}
                            >End Course</button>
                        </div>
                    )


            }


        </div>
    )


}

export default FullCoursePage