import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

function Footer() {

  const location = useLocation();
  const isAdd = location.pathname === "/add"

  return (
    <div className={`py-6 w-full ${isAdd ? 'bg-bgColorOne' : 'bg-bgColorOne'}`}>

      <div className='gradient-line'></div>

      <ul className='mt-6 flex gap-4 w-1/3 justify-between items-center font-medium mx-auto text-gray-500'>
        <Link to='#'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaGithub size={16} />
            <h4>Github</h4>
          </div>
        </Link>
        <Link to='#'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaLinkedin size={16} />
            <h4>LinkedIn</h4>
          </div>
        </Link>
        <Link to='#'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaEnvelope size={16} />
            <h4>Email</h4>
          </div>
        </Link>
        <Link to='#'>
          <div className='flex gap-2 jusc
           items-center'>
            <FaInstagram size={16} />
            <h4>Instagram</h4>
          </div>
        </Link>
      </ul>
    </div>
  );
}

export default Footer;
