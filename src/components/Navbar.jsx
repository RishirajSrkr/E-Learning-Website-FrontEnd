import React from 'react'
import { Link } from 'react-router-dom'
import { FaStarOfLife } from "react-icons/fa";

function Navbar() {
    const logo = <FaStarOfLife />

    return (

        <div className='text-gray-100 font-medium w-full fixed top-0 left-0 z-50'>

            <div className='gradient-outer w-1/2 mt-4 mb-2 mx-auto'>
                <ul className='flex w-full  rounded-full justify-between items-center bg-bgColorTwo px-3 pl-8 py-2'>

                    <div className='flex gap-3 justify-center items-center'>
                        <div className='animate-spin-slow'>{logo}</div>
                        <Link to={"/"} className='text-2xl font-extrabold'>ARC</Link>
                    </div>

                    <div className='flex gap-10'>
                        <Link to={"/courses"}>All Courses</Link>
                        <Link to={"/contributers"}>Contributers</Link>
                        <Link to={"/vote"}>Vote</Link>
                        <Link to={"/about"}>About</Link>
                    </div>

                    <Link className='bg-buttonGradient px-6 py-2 text-sm rounded-full font-bold'>Contribute</Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar