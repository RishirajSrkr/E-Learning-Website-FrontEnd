import React from 'react'
import { RiArrowRightUpLine } from "react-icons/ri";

function Input({ className, type, name, value, placeholder, onChange, totalWidth, reloadButtonShowOrHide, onClick }) {


    const firstLetter = name.slice(0, 1).toUpperCase();
    const labelName = firstLetter + name.slice(1, name.length);

    return (
        <div className={`${totalWidth} flex flex-col items-start justify-center gap-2 `}>

            <label className=' text-white' htmlFor={name}>{labelName}</label>

            <div className='flex items-center justify-center w-full'>
                <input type={type}
                    name={name}
                    className={`p-0 pr-8 w-full text-white bg-transparent flex items-center justify-center border-none focus:border-none focus:ring-0 ${className}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />

                <button
                className={`active:scale-90 active:text-green-400 transition-all text-white text-xl ${reloadButtonShowOrHide ? "" : "hidden"}`}
                onClick={onClick}
                >
                    <RiArrowRightUpLine />
                </button>


            </div>



            <div className='line-1'></div>

        </div>
    )
}

export default Input