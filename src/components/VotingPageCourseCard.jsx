import React from 'react'
import {Link} from 'react-router-dom'
function VotingPageCourseCard({courseName, instructor, index}) {
    return (


        <Link className='flex gap-2 border'>

            <div className='min-w-24 h-24 bg-maintextColor text-bgColorOne font-extrabold text-6xl flex justify-center items-center'>
                <h2>{`${index < 10 ? "0"+index : index}`}</h2>
            </div>

            <div className='relative bg-accentColorOne h-24  flex justify-center items-start flex-col px-6 w-fit'>
                <h2 className='text-maintextColor font-extrabold text-6xl uppercase text-nowrap '>{courseName}</h2>
                <p className='absolute px-4 py-1 rotate-6 -top-4 -right-16 bg-maintextColor text-bgColorOne font-semibold'>{instructor}</p>
            </div>

        </Link>


    )
}

export default VotingPageCourseCard