import React, { useEffect, useState } from 'react'
import CircleLoader from '../CircleLoader'
import { RiArrowRightLine } from "react-icons/ri";

function PrimaryButton({ text, classname, onClick, isLoading, arrow }) {

  const [theme, setTheme] = useState("light");

  const html = document.documentElement;

  useEffect(() => {
    if (html.classList.contains("dark")) {
      setTheme("dark");
    }
    else {
      setTheme("light")
    }
  }, [])


  return (
    <button

      className={`${classname}  rounded-full flex items-center h-10 bg-accentColor text-white group hover:opacity-90 transition-opacity duration-300`}
      onClick={onClick}
      type='button'
    >
      {isLoading &&
       <div className='w-full mx-auto'>
         <CircleLoader />
       </div>
      }

      {
        !isLoading && <div className='flex justify-center items-center  w-full'>
          <p className=' text-sm  text-center font-semibold -tracking-tight'>{text}</p>

          {arrow && <RiArrowRightLine className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />}
        </div>
      }

    </button>
  )
}

export default PrimaryButton
