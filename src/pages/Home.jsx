import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'
import { ThreeDot } from 'react-loading-indicators'
import HomeV2 from './HomeV2';


function Home() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getAllCourses() {
            try {
                setIsLoading(true)
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



    function handleCourseCardClick(id) {
        console.log("id :: ", id);

        navigate(`/course/${id}`)
    }


    return (

        <div className='relative bg-bgColorOne min-h-screen pb-12 '>

            <div className='overflow-hidden bg-blend-multiply absolute top-0 translate-x-1/2 left-0 w-1/2 h-4/5'>
                <HomeV2 />

            </div>

            <div className='h-screen'>
                <div className='flex justify-center h-full items-center' style={{ position: "relative" }}>
                    <div className="text-center">

                        <div className='text-accentColorOne font-md text-8xl tracking-tighter'>Discover the Best</div>

                        <div className='text-maintextColor font-md text-8xl tracking-tighter mb-10'>Developer Resources.</div>


                        <div className='flex gap-2 items-center justify-center border border-borderColor px-4 py-1 rounded-full w-fit mx-auto'>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColorOne opacity-75"></span>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColorOne  opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentColorOne "></span>

                            </span>

                            <span className='text text-center lowercase text-accentColorOne font-medium'>Voted by Developers Like You.</span>
                        </div>
                    </div>
                </div>

                <div className='animate-bounce' style={{ position: "absolute", bottom: "10%", left: "50%" }}>
                    <IoChevronDownSharp
                        className='text-offWhite text-xl'
                    />
                </div>

            </div>


            {
                isLoading ?
                    (
                        <div className='text-center'>
                            <ThreeDot color="#E85533" size="small" />
                        </div>
                    )

                    :

                    (
                        <div className='masonry'>
                            {
                                Object.keys(courses).map((key) => {
                                    return <div key={key} className="masonry-item">

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

export default Home