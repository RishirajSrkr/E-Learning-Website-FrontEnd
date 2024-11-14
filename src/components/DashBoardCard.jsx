import React from 'react'
import { MdArrowOutward } from "react-icons/md";
import { TiStarOutline } from "react-icons/ti";
function DashBoardCard({user, headtext, onClick, subtext, value, icon}) {
    return (
    
          <div onClick={onClick} className='cursor-pointer bg-bgTwo border border-border px-10 py-8 rounded-xl w-80 text-white flex flex-col gap-4'>
    
            <div className='flex justify-between items-center'>
              <h3 className='text-5xl font-semibold'>{`${value < 10 ? "0" + value : value}`}</h3>
              <div className='bg-bgOne w-fit p-3 rounded-full'>
              {icon}
              </div>
            </div>
    
            <div>
              <h3 className='font-medium mb-1 text-lg'>{headtext}</h3>
    
              <div className='flex gap-1 items-center'>
                <div className='p-1 bg-bgOne rounded-full'>
                  <TiStarOutline className='text-green text-xs' />
                </div>
                <p className='text-sm text-gray'>{subtext}</p>
              </div>
    
            </div>
          </div>
    
    
      )
}

export default DashBoardCard