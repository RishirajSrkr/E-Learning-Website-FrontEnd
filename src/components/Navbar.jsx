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
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { useTheme } from '../context/ThemeContext';
import { MdFitbit } from "react-icons/md";
function Navbar() {

    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const { isMobile } = useContext(WindowWidthContext)
    const { loggedInUser } = useContext(AuthContext)
    const { user } = useContext(UserContext)


    const [showDropdown, setShowDropdown] = useState(false)
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


        <div className='relative w-full'>

            {
                isMobile ?

                    (


                        <div className='bg-bgOne pb-20 w-full' >


                            <div className='fixed top-0 w-full flex h-16 z-50 gap-6 items-center justify-between px-4 bg-bgOne border-b border-border'>


                                <Hamburger size={24} color='white' toggled={showNavbar} toggle={setShowNavbar} />

                                <Link to={"/"} className='font-semibold text-2xl'>BitByBit</Link>





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
                                                to="/all-resources"
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


                    (
                        <div className={`w-full flex flex-col justify-between items-center text-gray  text-sm font-medium fixed top-auto z-50 left-0   bg-transparent backdrop-blur-2xl transition-all duration-300 ease-out`}>



                            <div className='w-full flex py-3 border-b border-lightBorder dark:border-darkBorder'>

                                {/* -------------logo----------- */}
                                <div className='w-1/4 flex justify-center items-center'>
                                    <Link className='text-bgOne dark:text-offwhite font-semibold text-xl flex items-center gap-2' to={"/"}><MdFitbit/>BitByBit</Link>
                                </div>

                                {/* --------------menu------------- */}
                                <div className='w-2/4 font-normal flex items-center'>
                                    <div className='w-fit mx-auto flex justify-center items-center gap-8 font-medium  text-gray-500 bg-transparent py-2'>

                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'text-bgOne dark:text-offwhite'
                                                    :
                                                    'hover:text-bgOne dark:hover:text-offwhite  transition-all duration-300 '
                                            }
                                            to="/all-resources"
                                        >
                                            Resources
                                        </NavLink>


                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'text-bgOne dark:text-offwhite'
                                                    :
                                                    'hover:text-bgOne dark:hover:text-offwhite  transition-all duration-300 '
                                            }
                                            to="/vote-resources"
                                        >
                                            Top Voted
                                        </NavLink>



                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'text-bgOne dark:text-offwhite'
                                                    :
                                                    'hover:text-bgOne dark:hover:text-offwhite  transition-all duration-300 '
                                            }
                                            to="/contributors"
                                        >
                                            Contributors
                                        </NavLink>










                                        {/* ------------ hide this if user not logged in ------------- */}
                                        {
                                            loggedInUser && <NavLink
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'text-bgOne dark:text-offwhite'
                                                        :
                                                        'hover:text-bgOne dark:hover:text-offwhite  transition-all duration-300 '
                                                }
                                                to={"/resource/create"}
                                            >
                                                Contribute

                                            </NavLink>
                                        }



                                    </div>
                                </div>

                                {/* ------------------login--------------- */}
                                <div className='w-1/4 flex justify-center items-center gap-8'>


                                    {
                                        loggedInUser &&

                                        <div className='flex gap-3 justify-center items-center'>

                                            {/* profile Image */}
                                            <div className='h-8 w-8'>
                                                {
                                                    !user.profileImage ? <FaCircleUser className='w-full dark:text-bgThree h-full' /> : (
                                                        <img className='w-full h-full  rounded-full object-cover' src={user?.profileImage} />
                                                    )
                                                }
                                            </div>

                                            <Link className='text-bgOne dark:text-offwhite' onClick={handleToggleDropdown} >{loggedInUser}</Link>

                                            {
                                                showDropdown && <motion.div
                                                    ref={dropdownRef}

                                                    initial={{ y: 50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 100 }}
                                                    transition={{ delay: 0 }}

                                                    className='bg-gray-50 dark:bg-bgTwo px-8 py-4 rounded-lg absolute top-[53px] flex flex-col gap-2 items-start text-black dark:text-white'>

                                                    <Link onClick={handleDropDownClose} className='flex justify-center items-center gap-2' to={"/dashboard"}><RxDashboard /> Dashboard</Link>
                                                    <Link onClick={handleDropDownClose} className='flex justify-center items-center gap-2' to={"/my-profile"}><CgProfile />My Profile</Link>

                                                </motion.div>
                                            }

                                        </div>
                                    }

                                    {
                                        !loggedInUser &&
                                        <Link className='text-bgOne dark:text-offwhite' to={"/login"}>Login</Link>
                                    }







                                    <button className='text-gray-500 bg-gray-100 dark:bg-bgTwo p-2 rounded-full' onClick={toggleTheme}>
                                        {theme === "light" ? (
                                            <MdLightMode size={16} />
                                        ) : (
                                            <MdDarkMode size={16} />
                                        )}
                                    </button>



                                </div>

                            </div>

                        </div>

                    )

            }
        </div>

    );
}

export default Navbar;
