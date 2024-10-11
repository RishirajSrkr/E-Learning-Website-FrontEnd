import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses } from '../data/courses';

function FullCoursePage() {
    const { id } = useParams();

    const course = courses.find(course => course.id == parseInt(id));


    if (!course) {
        return <h1>Course not found.</h1>
    }

    return (
        <div className='bg-bgColorOne text-gray-400 px-24 py-12 mt-20'>
            <div className='w-2/3'>

                <div className='flex gap-4 items-center'>
                    <h1 className='text-4xl font-bold'>{course.title}</h1>

                    <div className='bg-buttonGradient text-white w-fit px-6 py-2 rounded-full text-sm font-semibold'>{course.chapters.length} Chapters</div>
                </div>

                <div className='gradient-line-left'></div>
                <div>
                    {
                        course.chapters.map((_, index) => (
                            <div key={index} className='mb-8'>

                                <h2
                                    className='font-bold text-xl '

                                >{_.chapter.title}</h2>


                                <p>{_.chapter.content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default FullCoursePage