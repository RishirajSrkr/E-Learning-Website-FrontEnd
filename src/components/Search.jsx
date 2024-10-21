import React from 'react'
import { IoPersonSharp } from "react-icons/io5";

function Search({classname, onSearch}) {

    return (
        <div className={`w-1/3 ${classname}`}>


            <div className='relative w-full'>

                <input
                    type="text"
                    placeholder='Search contributers'
                    className='pl-12 w-full bg-bgColorThree text-white border-borderColor focus:border-borderColor focus:ring-0 rounded-full py-3 placeholder-subtextColor '
                    onChange={(e) => onSearch(e.target.value)}
                />

                <div className='text-accentColorOne absolute top-1/2 -translate-y-1/2 left-5'>
                    <IoPersonSharp />
                </div>
            </div>

        </div>
    )
}

export default Search