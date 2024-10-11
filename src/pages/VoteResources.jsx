import React from 'react'
import { IoIosNotifications } from "react-icons/io";
function VoteResources() {

    function notifyNewFeature() {

    }

    return (
        <div className='mt-2 flex flex-col h-screen justify-center items-center gap-8 text-white'>
            <h1 className='text-5xl font-bold '>Something Different is coming!</h1>

            <h1 className='text-2xl  flex gap-2 justify-center items-center'>Click <span><button
                className=' rounded-full text-2xl w-8 h-8 flex justify-center items-center bg-buttonGradient hover:scale-125  hover:rotate-6 transition-all ease-in-out'
                onClick={notifyNewFeature}
            ><IoIosNotifications /></button></span> & we will update you.</h1>


        </div>
    )
}

export default VoteResources