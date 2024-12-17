import React from 'react'
import { RiArrowRightUpLine } from "react-icons/ri";

function Input({ className, type, name, value, placeholder, onChange, totalWidth}) {


    const firstLetter = name.slice(0, 1).toUpperCase();
    const labelName = firstLetter + name.slice(1, name.length);

    return (
        <div className={`${totalWidth} flex flex-col items-start justify-center gap-2 `}>

            <label className=' text-black dark:text-white' htmlFor={name}>{labelName}</label>

            <div className='flex items-center justify-center w-full border border-lightBorder dark:border-darkBorder px-4 py-2 rounded-md'>
                <input type={type}
                    name={name}
                    className={`placeholder-gray p-0 w-full outline-none  bg-transparent flex border-none focus:border-none focus:ring-0 ${className}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />



            </div>




        </div>
    )
}

export default Input