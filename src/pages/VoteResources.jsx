import React, { useEffect, useState } from 'react'
import VotingPageCourseCard from '../components/VotingPageCourseCard';

function VoteResources() {

    const [courses, setCourses] = useState([]);

    const data = [
        {
            courseName: "React JS",
            instructor: "Rahul Kumar"
        },
        {
            courseName: "Java Basics",
            instructor: "Alice Johnson"
        },
        {
            courseName: "Data Science",
            instructor: "John Doe"
        },
        {
            courseName: "Machine Learning",
            instructor: "Sara Wilson"
        },
        {
            courseName: "Node.js",
            instructor: "David Lee"
        },
        {
            courseName: "Algorithms",
            instructor: "Emma Brown"
        },
        {
            courseName: "Cloud Computing",
            instructor: "Sophia Miller"
        }
    ];


    useEffect(() => {
        setCourses(data)
    }, [])


    return (

        <div className='w-fill min-h-screen bg-bgColorOne flex justify-center items-center flex-col'>

            {/* -------------- headline -------------- */}
            <div className='min-h-screen flex flex-col uppercase justify-center items-center text-center'>

                <h2 className='font-semibold text-accentColorOne font-md text-8xl tracking-tighter'>Discover, Vote, <br /> Elevate <span className='font-light text-maintextColor'>the Best </span></h2>

                <h2 className='-mt-1 text-maintextColor font-light font-md text-8xl tracking-tighter'>Courses.</h2>


            </div>


            {/* ----------------- open votes ---------------- */}



            <div>
                <h2 className='text-maintextColor font-extrabold text-2xl tracking-tighter'>Course of the Week!</h2>
            </div>


            <div className='w-full flex gap-x-32 px-32 justify-center items-center flex-wrap text-subtextColor min-h-screen tracking-tighter'>

                {
                    courses.map((course, index) => {
                        return <VotingPageCourseCard
                            key={index}
                            courseName={course.courseName}
                            instructor={course.instructor}
                            index={index + 1}
                        />
                    })
                }

            </div>
        </div>
    )
}

export default VoteResources