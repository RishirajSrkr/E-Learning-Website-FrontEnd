import React from 'react'

function Search({ classname, onSearch, placeholder, icon, rounded }) {

    return (
        <div className={` ${classname}`}>


            <div className='relative w-full'>

                <input
                    type="text"
                    placeholder={placeholder}
                    className={`pl-10 w-full bg-bgTwo pr-4 text-white border-border focus:border-border focus:ring-0 ${rounded} py-2.5 placeholder-gray `}
                    onChange={(e) => onSearch(e.target.value)}
                />

                <div className='text-accentColor absolute  top-1/2 -translate-y-1/2 left-3'>
                    {icon}
                </div>
            </div>

        </div>
    )
}

export default Search