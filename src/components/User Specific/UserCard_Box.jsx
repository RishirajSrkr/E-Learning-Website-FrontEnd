import React from 'react'

function UserCard_Box({ name, email, profileImage }) {
    return (
        <div className='cursor-pointer text-white flex flex-col justify-center items-center gap-3 bg-bgTwo rounded-xl w-60 h-60 px-10 py-6 hover:bg-bgThree duration-300'>

            <div className='flex flex-col justify-center items-center gap-4'>
                <img className='h-12 w-12 rounded-full object-cover' src={profileImage} alt="User profile image" />

                <div className='flex flex-col text-center gap-2'>
                    <h3 className='font-semibold text-xl'>{name}</h3>
                    <h3>{email}</h3>
                </div>

            </div>
        </div>
    )
}

export default UserCard_Box