import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaStarOfLife } from "react-icons/fa";

function Navbar() {
    const logo = <FaStarOfLife />

    const location = useLocation();
    const isAdd = location.pathname === '/add';

    return (

        <div className={`${isAdd ? '' : ''} text-gray-100 font-medium w-full fixed top-0 left-0 z-50`}>

            <div className='gradient-outer w-1/2 mt-4 mb-2 mx-auto shadow-2xl shadow-bgColorOne'>
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

                    <Link to={"/add"} className='bg-buttonGradient px-6 py-2 text-sm rounded-full font-bold'>Contribute</Link>
                </ul>
            </div>

            
            <div className='absolute w-12 h-12 bg-bgColorTwo rounded-full flex justify-center items-center border border-gray-800 right-10 top-4'>
                <Link
                to={"/user/profile"}
                className='text-lg font-semibold'
                >R</Link>
            </div>

        </div>
    )
}

export default Navbar