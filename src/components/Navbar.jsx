import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";

import Hamburger from 'hamburger-react'

import { motion } from 'framer-motion'


function Navbar() {

    const { loggedInUser } = useContext(AuthContext)

    const location = useLocation();
    const hideNavbar = location.pathname === "/contributors" || location.pathname === "/all-courses";

    const hideNavbarPaths = /^\/course\/[a-zA-Z0-9]+$/; // Regex for '/course/someCourseId'
    const isFullCoursePage = hideNavbarPaths.test(location.pathname)


    const [showNotificationDiv, setShowNotificationDiv] = useState(true)


    function handleNotificationDivClose() {
        setShowNotificationDiv(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotificationDiv(false)

        }, 3000);
        return () => { clearTimeout(timer) }
    }, [])




    // --------------- CHECKING WINDOW SIZE -------------------

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleWindowResize() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)

        return () => { removeEventListener('resize', handleWindowResize) }

    }, [])

    // -----------------------------------------------------------------


    const [showNavbar, setShowNavbar] = useState(false)

    // Effect to handle body scroll behavior
    useEffect(() => {
        if (showNavbar) {
            // Prevent scrolling when navbar is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when navbar is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to reset body style
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showNavbar]);


    const handleNavLinkClick = () => {
        setShowNavbar(false); // Close the navbar
    };


    return (




        windowWidth < 640 ?

            // ----------------------------- MOBILE VIEW -----------------------------

            (


                <div className='bg-bgOne pb-20 w-full' >


                    <div className='fixed top-0 w-full flex h-16 z-50 gap-6  items-center px-4 bg-bgOne border-b border-border'>

                        <button
                            className='text-white text-2xl z-50'

                        >
                            <Hamburger size={24} toggled={showNavbar} toggle={setShowNavbar} />

                        </button>


                        <Link to={"/"} className='font-bold bg-gradientForBg text-xl bg-clip-text text-transparent '>BitByBit</Link>
                    </div>


                    {
                        showNavbar &&

                        (
                            <div className='w-full fixed z-50 bg-bgOne top-12 pt-20 min-h-screen flex flex-col text-gray uppercase font-bold text-4xl gap-2 px-8'>


                                <motion.div
                                    initial={{ y:50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0 }}
                                >
                                    <NavLink
                                        to="/all-courses"
                                        onClick={handleNavLinkClick}
                                        className={"hover:text-white transition-colors duration-400"}
                                    >
                                        Courses
                                    </NavLink>
                                </motion.div>

                                <motion.div
                                       initial={{ y: 50, opacity: 0 }}
                                       animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <NavLink
                                        to="/contributors"
                                        onClick={handleNavLinkClick}
                                        className={"hover:text-white transition-colors duration-400"}
                                    >
                                        Contributors
                                    </NavLink>
                                </motion.div>



                                <motion.div
                                     initial={{ y: 50, opacity: 0 }}
                                     animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <NavLink
                                        to="/vote-resources"
                                        onClick={handleNavLinkClick}
                                        className={"hover:text-white transition-colors duration-400"}
                                    >
                                        Vote
                                    </NavLink>
                                </motion.div>

                                <motion.div
                                      initial={{ y: 50, opacity: 0 }}
                                      animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <NavLink
                                        to="/about"
                                        onClick={handleNavLinkClick}
                                        className={"hover:text-white transition-colors duration-400"}
                                    >
                                        About
                                    </NavLink>
                                </motion.div>



                            </div>
                        )


                    }


                </div >
            )


            :

            // ------------------------- DSEKTOP VIEW -------------------

            (
                <div className={`${hideNavbar ? "hidden" : ""} ${isFullCoursePage ? "hidden" : ""} w-full flex flex-col justify-between items-center text-white text-sm font-medium fixed z-50 top-0 left-0 transition-all duration-300 bg-transparent backdrop-blur-2xl shadow-2xl shadow-bgOne`}>


                    {/* ------------------- notification banner ----------------- */}

                    {
                        showNotificationDiv &&

                        <div className='bg-gradientForBg w-full text-center py-3'>
                            <p className='text-bgOne'>This app is hosted on Render's free tier, so initial loading might take a few moments. Thank you for your patience!</p>


                            <button
                                className='absolute right-4 top-3 text-bgOne'
                                onClick={handleNotificationDivClose}><IoCloseSharp size={17} /></button>
                        </div>
                    }



                    <div className='w-full flex py-4'>

                        {/* -------------logo----------- */}
                        <div className='w-1/4 flex justify-center items-center'>
                            <Link className='font-semibold text-xl' to={"/"}>BitByBit</Link>
                        </div>

                        {/* --------------menu------------- */}
                        <div className='w-2/4 font-normal'>
                            <div className='w-fit mx-auto flex justify-center items-center gap-6 border border-border rounded-full px-8 py-2 text-gray'>

                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-medium'
                                            : 'hover:text-white active:text-white hover:font-medium transition-all duration-400'
                                    }
                                    to="/all-courses"
                                >
                                    Courses
                                </NavLink>


                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-medium'
                                            : 'hover:text-white active:text-white hover:font-medium transition-all duration-400'
                                    }
                                    to="/contributors"
                                >
                                    Contributers
                                </NavLink>



                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-medium'
                                            : 'hover:text-white active:text-white hover:font-medium transition-all duration-400'
                                    }
                                    to="/vote-resources"
                                >
                                    Vote
                                </NavLink>




                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-medium'
                                            : 'hover:text-white active:text-white hover:font-medium transition-all duration-400'
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
                            <Link to={"/course/create"} className={`${loggedInUser ? "" : "hidden"} bgTwo border border-green text-white font-semibold px-5 py-2 rounded-full  shadow-2xl shadow-lime-800`}>
                                Contribute
                            </Link>
                        </div>

                    </div>
                    {/* <div className='mt-5 gradient-line'></div> */}
                </div>

            )


    );
}

export default Navbar;
