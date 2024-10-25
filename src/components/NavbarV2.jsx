import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

function NavbarV2() {

    const { loggedInUser } = useContext(AuthContext)

    const location = useLocation();
    const hideNavbar = location.pathname === "/contributors" || location.pathname === "/all-courses";

    const hideNavbarPaths = /^\/course\/[a-zA-Z0-9]+$/; // Regex for '/course/someCourseId'
    const isFullCoursePage = hideNavbarPaths.test(location.pathname)




    return (
        <div className={`${hideNavbar ? "hidden" : ""} ${isFullCoursePage ? "hidden" : ""} w-full flex flex-col justify-between items-center text-maintextColor text-sm font-medium p-5 fixed z-50 top-0 left-0 transition-all duration-300 bg-transparent backdrop-blur-2xl`}>

            <div className='w-full flex'>

                {/* -------------logo----------- */}
                <div className='w-1/4 flex justify-center items-center'>
                    <Link className='font-semibold text-xl' to={"/"}>BitByBit</Link>
                </div>

                {/* --------------menu------------- */}
                <div className='w-2/4 font-normal'>
                    <div className='w-fit mx-auto flex justify-center items-center gap-6 border border-borderColor rounded-full px-8 py-2 text-subtextColor'>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-maintextColor font-medium'
                                    : 'hover:text-white active:text-maintextColor hover:font-medium transition-all duration-400'
                            }
                            to="/all-courses"
                        >
                            Courses
                        </NavLink>


                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-maintextColor font-medium'
                                    : 'hover:text-white active:text-maintextColor hover:font-medium transition-all duration-400'
                            }
                            to="/contributors"
                        >
                            Contributers
                        </NavLink>



                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-maintextColor font-medium'
                                    : 'hover:text-white active:text-maintextColor hover:font-medium transition-all duration-400'
                            }
                            to="/vote-resources"
                        >
                            Vote
                        </NavLink>




                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-maintextColor font-medium'
                                    : 'hover:text-white active:text-maintextColor hover:font-medium transition-all duration-400'
                            }
                            to="/about"
                        >
                            About
                        </NavLink>

                    </div>
                </div>

                {/* ------------------login--------------- */}
                <div className='w-1/4 flex justify-center items-center gap-8'>


                    {
                        loggedInUser &&
                        <Link to={"/my-profile"}>{loggedInUser}</Link>
                    }

                    {
                        !loggedInUser &&
                        <Link to={"/login"}>Login</Link>
                    }



                    {/* ------------ hide this if user not logged in ------------- */}
                    <Link to={"/course/create"} className={`${loggedInUser ? "" : "hidden"} bg-bgColorThree border border-accentColorOne text-white font-semibold px-5 py-2 rounded-full  shadow-2xl shadow-blue-950`}>
                        Contribute
                    </Link>
                </div>

            </div>
            {/* <div className='mt-5 gradient-line'></div> */}
        </div>
    );
}

export default NavbarV2;
