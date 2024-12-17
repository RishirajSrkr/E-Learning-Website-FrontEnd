import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { MdFitbit } from "react-icons/md";
import { AuthContext } from '../context/AuthContext'
import { div } from 'framer-motion/client';

function Footer() {

  const { loggedInUser } = useContext(AuthContext)

  const location = useLocation();
  const hideFooter = location.pathname === "/register" || location.pathname === "/login" || location.pathname.includes("discussions")

  const socials = [
    {
      name: "Github",
      link: "https://github.com/RishirajSrkr",
      icon: <FaGithub />
    },

    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/rishiraj-sarkar/",
      icon: <FaLinkedin />
    },

    {
      name: "Email",
      link: "mailto:rishirajsarkar.jpg@gmail.co",
      icon: <FaEnvelope />
    },
  ]

  return (
    <div className={`w-full ${hideFooter ? 'hidden' : ''} bg-white dark:bg-black flex justify-center items-center px-32 py-4 sm:py-6 border-t border-lightBorder dark:border-darkBorder text-sm `}>


      <div className='w-1/3 flex flex-col text-black dark:text-white '>

        <Link className='text-xl font-bold flex items-center gap-2 mb-3'>
          <MdFitbit />
          <p>BitByBit</p>
        </Link>

        <div className='flex items-center gap-1 mb-2'>
          <p>Build by</p>
          <Link>@RishirajSarkar</Link>
        </div>


        <button className='w-fit bg-bgThree text-white  px-4 py-2 rounded-md mb-4'>Share Your Feedback</button>

        <p> &copy; {new Date().getFullYear()} BitByBit. All rights reserved.</p>

      </div>

      <div className='w-2/3 flex gap-16 items-start justify-end'>

        <div className='flex flex-col text-black dark:text-white'>
          <p className='mb-3 font-semibold'>Pages</p>
          <div className='flex flex-col gap-2'>
            <Link>Resources</Link>
            <Link>Top Voted</Link>
            <Link>Contributers</Link>
            {loggedInUser && <Link>Contribute</Link>}
          </div>
        </div>

        <div className='flex flex-col gap-2 text-black dark:text-white'>
          <p className='mb-3 font-semibold'>Socials</p>
          {
            socials.map((social, index) => (
              <Link target='_blank' to={social.link} key={index} className='flex items-center gap-2'>
                {social.icon}
               <p>{social.name}</p>
              </Link>
            ))
          }
        </div>


        <div className='flex flex-col gap-2 text-black dark:text-white'>
          <p className='mb-3 font-semibold'>Legal</p>
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
          <Link to={"/tos"}>Terms of Service</Link>
        </div>

      </div>

    </div>
  );
}

export default Footer;





