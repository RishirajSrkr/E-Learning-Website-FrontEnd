import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import Hamburger from 'hamburger-react'
import { IoArrowForwardSharp } from "react-icons/io5";
import { motion } from 'framer-motion'
import { WindowWidthContext } from '../context/WindowWidthContext';
import { UserContext } from '../context/UserContext';
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";


function Navbar() {

    const location = useLocation();

    const hideNavbar = location.pathname === "/contributors";
    const hideNavbarPaths = /^\/course\/[a-zA-Z0-9]+$/; // Regex for '/course/someCourseId'
    const isFullCoursePage = hideNavbarPaths.test(location.pathname)


    const { isMobile } = useContext(WindowWidthContext)
    const { loggedInUser } = useContext(AuthContext)
    const { user } = useContext(UserContext)


    const [showDropdown, setShowDropdown] = useState(false)
    const [showNotificationDiv, setShowNotificationDiv] = useState(true)
    const [showNavbar, setShowNavbar] = useState(false)



    function handleNotificationDivClose() {
        setShowNotificationDiv(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotificationDiv(false)

        }, 60000);
        return () => { clearTimeout(timer) }
    }, [])




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



    function handleToggleDropdown() {
        setShowDropdown(prev => !prev)

    }
    function handleDropDownClose() {
        setShowDropdown(false)
    }



    const dropdownRef = useRef();

    const handleClickOutside = (event) => {
        // Close dropdown if the click is outside of the dropdown element
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        // Attach the event listener to handle clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);





    return (




        isMobile ?

            // ----------------------------- MOBILE VIEW -----------------------------

            (


                <div className='bg-bgOne pb-20 w-full' >


                    <div className='fixed top-0 w-full flex h-16 z-50 gap-6 items-center justify-between px-4 bg-bgOne border-b border-border'>


                        <Hamburger size={24} color='white' toggled={showNavbar} toggle={setShowNavbar} />

                        <Link to={"/"} className='font-bold bg-gradientForBg text-2xl bg-clip-text text-transparent '>BitByBit</Link>





                        <Link to={`${loggedInUser ? "/my-profile" : "/login"}`} className='pr-2 text-white font-medium'><MdAccountCircle size={23} /></Link>


                    </div>


                    {
                        showNavbar &&

                        (
                            <div className='w-full fixed z-50 bg-bgOne top-12 pt-20 min-h-screen flex flex-col text-white uppercase font-bold text-4xl gap-2 px-8'>

                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0 }}
                                >
                                    <Link
                                        to="/"
                                        onClick={handleNavLinkClick}
                                        className=' flex gap-2 items-center'

                                    >
                                        <span className=''>
                                            <IoArrowForwardSharp size={20} />
                                        </span>
                                        Home
                                    </Link>
                                </motion.div>




                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        to="/all-courses"
                                        onClick={handleNavLinkClick}
                                        className=' flex gap-2 items-center'

                                    >
                                        <span className=''>
                                            <IoArrowForwardSharp size={20} />
                                        </span>
                                        Courses
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link
                                        to="/contributors"
                                        onClick={handleNavLinkClick}
                                        className=' flex gap-2 items-center'

                                    >
                                        <span className=''>
                                            <IoArrowForwardSharp size={20} />
                                        </span>
                                        Contributors
                                    </Link>
                                </motion.div>



                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link
                                        to="/vote-resources"
                                        onClick={handleNavLinkClick}
                                        className=' flex gap-2 items-center'

                                    >
                                        <span className=''>
                                            <IoArrowForwardSharp size={20} />
                                        </span>
                                        Vote
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 100 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link
                                        to="/about"
                                        onClick={handleNavLinkClick}
                                        className=' flex gap-2 items-center'

                                    >
                                        <span className=''>
                                            <IoArrowForwardSharp size={20} />
                                        </span>
                                        About
                                    </Link>
                                </motion.div>


                                {

                                    loggedInUser && <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 100 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Link
                                            to="/course/create"
                                            onClick={handleNavLinkClick}
                                            className='bg-gradientForBg bg-clip-text text-transparent flex gap-2 items-center'
                                        >
                                            <span className='text-accentColor'>
                                                <IoArrowForwardSharp size={20} />
                                            </span>
                                            Contribute

                                        </Link>
                                    </motion.div>


                                }



                            </div>
                        )


                    }


                </div >
            )


            :

            // ------------------------- DSEKTOP VIEW -------------------

            (
                <div className={`${hideNavbar ? "hidden" : ""} ${isFullCoursePage ? "hidden" : ""}  w-full flex flex-col justify-between items-center text-white text-sm font-medium fixed z-50 top-0 left-0 transition-all duration-300 bg-transparent backdrop-blur-2xl shadow-2xl shadow-bgOne`}>


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
                            <div className='w-fit mx-auto flex justify-center items-center gap-1 border border-border rounded-full font-medium p-2 text-gray bg-transparent'>

                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-medium px-5 py-2.5 rounded-full border border-border'
                                            :
                                            'hover:text-white active:text-white transition-all duration-300 border hover:border hover:border-border border-transparent px-5 py-2.5 rounded-full'
                                    }
                                    to="/all-courses"
                                >
                                    {({ isActive }) => (
                                        <div className='flex gap-2 items-center justify-center'>
                                            <div className={`h-2 w-2 ${!isActive ? "bg-bgThree" : "bg-accentColor"}  rounded-full`}></div>
                                            Resources
                                        </div>
                                    )}
                                </NavLink>


                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ?  'text-white font-medium px-5 py-2.5 rounded-full border border-border'
                                            : 'hover:text-white active:text-white transition-all duration-300 border hover:border hover:border-border border-transparent px-5 py-2.5 rounded-full'
                                    }
                                    to="/contributors"
                                >
                                     {({ isActive }) => (
                                        <div className='flex gap-2 items-center justify-center'>
                                            <div className={`h-2 w-2 ${!isActive ? "bg-bgThree" : "bg-accentColor"}  rounded-full`}></div>
                                            Contributor
                                        </div>
                                    )}
                                </NavLink>



                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ?  'text-white font-medium px-5 py-2.5 rounded-full border border-border'
                                            : 'hover:text-white active:text-white transition-all duration-300 border hover:border hover:border-border border-transparent px-5 py-2.5 rounded-full'
                                    }
                                    to="/vote-resources"
                                >
                                     {({ isActive }) => (
                                        <div className='flex gap-2 items-center justify-center'>
                                            <div className={`h-2 w-2 ${!isActive ? "bg-bgThree" : "bg-accentColor"}  rounded-full`}></div>
                                            Vote
                                        </div>
                                    )}
                                </NavLink>




                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ?  'text-white font-medium px-5 py-2.5 rounded-full border border-border'
                                            : 'hover:text-white active:text-white transition-all duration-300 border hover:border hover:border-border border-transparent px-5 py-2.5 rounded-full'
                                    }
                                    to="/doc"
                                >
                                     {({ isActive }) => (
                                        <div className='flex gap-2 items-center justify-center'>
                                            <div className={`h-2 w-2 ${!isActive ? "bg-bgThree" : "bg-accentColor"}  rounded-full`}></div>
                                            Docs
                                        </div>
                                    )}
                                </NavLink>



                                {/* ------------ hide this if user not logged in ------------- */}
                                {
                                    loggedInUser && <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ?  'text-white font-medium px-5 py-2.5 rounded-full border border-border'
                                                : 'hover:text-white active:text-white transition-all duration-300 border hover:border hover:border-border border-transparent px-5 py-2.5 rounded-full'
                                        }
                                        to={"/course/create"}
                                    >
                                         {({ isActive }) => (
                                        <div className='flex gap-2 items-center justify-center'>
                                            <div className={`h-2 w-2 ${!isActive ? "bg-bgThree" : "bg-accentColor"}  rounded-full`}></div>
                                            Contribute
                                        </div>
                                    )}
                                    </NavLink>
                                }



                            </div>
                        </div>

                        {/* ------------------login--------------- */}
                        <div className='w-1/4 flex justify-center items-center gap-8'>


                            {
                                loggedInUser &&

                                <div className='flex gap-3 justify-center items-center'>

                                    <img className='h-10 w-10 rounded-full border border-border object-cover' src={user?.profileImage} alt="" />
                                    <Link onClick={handleToggleDropdown} >{loggedInUser}</Link>

                                    {
                                        showDropdown && <motion.div
                                            ref={dropdownRef}

                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 100 }}
                                            transition={{ delay: 0 }}

                                            className='bg-bgTwo px-8 py-4 rounded-lg absolute top-16 flex flex-col gap-2 items-start'>

                                            <Link onClick={handleDropDownClose} className='flex justify-center items-center gap-2' to={"/dashboard"}><RxDashboard /> Dashboard</Link>
                                            <Link onClick={handleDropDownClose} className='flex justify-center items-center gap-2' to={"/my-profile"}><CgProfile />My Profile</Link>

                                        </motion.div>
                                    }

                                </div>
                            }

                            {
                                !loggedInUser &&
                                <Link to={"/login"}>Login</Link>
                            }


                            {/* ------------ hide this if user not logged in ------------- */}
                            {/* {
                                loggedInUser && <Link to={"/course/create"} className={` bgTwo border border-accentColor text-white font-semibold px-5 py-2 rounded-full  shadow-2xl shadow-lime-800`}>
                                    Contribute
                                </Link>
                            } */}



                        </div>

                    </div>
                    {/* <div className='mt-5 gradient-line'></div> */}
                </div>

            )


    );
}

export default Navbar;
