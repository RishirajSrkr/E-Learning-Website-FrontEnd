import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaStarOfLife } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    // const logo = <FaStarOfLife />
    const logo = "BitByBit"

    const {isLoggedIn} = useContext(AuthContext);

    const location = useLocation();
    const hideNavbar = location.pathname === "/register" || location.pathname === "/login"

    return (

        <div className={`${hideNavbar ? 'hidden' : ''} text-gray-100 font-medium w-full fixed top-0 left-0 z-50`}>

            <div className='gradient-outer w-1/2 mt-4 mb-2 mx-auto shadow-2xl shadow-bgColorOne'>
                <ul className='flex w-full  rounded-full justify-between items-center bg-bgColorTwo px-3 pl-8 py-2'>

                    <div className='flex gap-3 justify-center items-center'>
                        <Link to={"/"} className='text-2xl font-extrabold'>{logo}</Link>
                    </div>

                    <div className='flex gap-10 px-4'>
                        <Link to={"/all-courses"}>All Courses</Link>
                        <Link to={"/contributers"}>Contributors</Link>
                        <Link to={"/vote"}>Vote</Link>
                        <Link to={"/about"}>About</Link>
                    </div>

                    <Link to={"/course/create"} className={`bg-buttonGradient px-6 py-2 text-sm rounded-full font-bold ${isLoggedIn ? "" : "hidden"}`}>Contribute</Link>
                </ul>
            </div>


            <Link to={"/user/profile"} className='absolute w-12 h-12 bg-bgColorTwo rounded-full flex justify-center items-center border border-gray-800 right-10 top-4'>
             R
            </Link>

        </div>
    )
}

export default Navbar