import React from 'react'
import { dotStream } from 'ldrs'
import { RiArrowRightLine } from "react-icons/ri";
dotStream.register()

function PrimaryButton({ text, classname, onClick, isLoading, arrow}) {
  return (
    <button
   
      className={`${classname} font-medium rounded-full flex items-center h-10 bg-gradientForBg text-bgOne group hover:opacity-90 transition-opacity duration-300`}
      onClick={onClick}
    >
      {isLoading &&
        <div className='mx-auto w-full'>
          <l-dot-stream
            size="36"
            speed="3.5"
            color="black"
          ></l-dot-stream>
        </div>
      }

      {
        !isLoading && <div className='flex justify-center items-center  w-full'>
          <p className=' text-sm  text-center font-semibold'>{text}</p>

          {arrow && <RiArrowRightLine className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />}
        </div>
      }

    </button>
  )
}

export default PrimaryButton
