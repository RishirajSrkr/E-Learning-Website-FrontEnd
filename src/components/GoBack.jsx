import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

function GoBack({ text, goWhere }) {
    return (
        <Link to={goWhere}
            className='fixed top-10 left-8 text-subtextColor flex justify-center items-center gap-2'
        >
            <IoIosArrowRoundBack size={18} />
            <p className='text-sm'>{text}</p>
        </Link>
    )
}

export default GoBack