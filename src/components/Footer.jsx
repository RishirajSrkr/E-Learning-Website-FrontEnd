import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

function Footer() {

  const location = useLocation();
  const hideFooter = location.pathname === "/register" || location.pathname === "/login" || location.pathname.includes("discussions")


  return (
    <div className={`w-full ${hideFooter ? 'hidden' : ''} bg-bgOne flex justify-center items-center py-4 sm:py-6 border-t border-border `}>


      <ul className='flex gap-2 sm:w-1/5  justify-between items-center text-sm sm:text-sm mx-auto text-gray'>

        <p>Developer by @Rishiraj Sarkar</p>
        <Link to='https://github.com/RishirajSrkr' target='_blank'>
          <div className='flex gap-2 items-center'>
            <FaGithub />
          </div>
        </Link>
        <Link to='https://www.linkedin.com/in/rishiraj-sarkar/' target='_blank'>
          <div className='flex gap-2 items-center'>
            <FaLinkedin />
          </div>
        </Link>
        <Link to='mailto:rishirajsarkar.jpg@gmail.com' target='_blank'>
          <div className='flex gap-2 items-center'>
            <FaEnvelope />
          </div>
        </Link>
      </ul>
    </div>
  );
}

export default Footer;
