import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

function Footer() {

  const location = useLocation();
  const hideFooter = location.pathname === "/register" || location.pathname === "/login"


  return (
    <div className={`pb-6 w-full ${hideFooter ? 'hidden' : ''} bg-bgOne`}>

      <div className='gradient-line mx-auto'></div>

      <ul className='mt-6 flex gap-4 w-1/4 justify-between items-center font text-sm mx-auto text-gray'>
        <Link to='https://github.com/RishirajSrkr' target='_blank'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaGithub size={16} />
            <h4>Github</h4>
          </div>
        </Link>
        <Link to='https://www.linkedin.com/in/rishiraj-sarkar/' target='_blank'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaLinkedin size={16} />
            <h4>LinkedIn</h4>
          </div>
        </Link>
        <Link to='mailto:rishirajsarkar.jpg@gmail.com' target='_blank'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaEnvelope size={16} />
            <h4>Email</h4>
          </div>
        </Link>
      </ul>
    </div>
  );
}

export default Footer;
