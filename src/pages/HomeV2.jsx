import React from 'react'

function HomeV2() {
    return (
        <div className='grid-bg bg-bgColorOne min-h-screen w-full justify-center items-center flex relative scale-125'>

            <div className='relative flex flex-col justify-evenly min-h-screen  w-2/5'>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
            </div>

            <div className=' absolute top-0 rotate-90 flex flex-col justify-evenly min-h-screen w-2/5'>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
                <div className='w-full h-px bg-bgColorThree'></div>
            </div>





            <div className='w-20 h-px bg-buttonGradient absolute top-1/4 left-0 run-animation-1 '></div>

            <div className='w-20 h-px bg-buttonGradient absolute top-2/4 left-0 run-animation-2'></div>


            <div className='w-20 h-px bg-buttonGradient absolute top-3/4 left-0 run-animation-3 '></div>



           <div className='bg-accentColorOne h-20 w-px absolute top-0 left-[584px] run-animation-4 bg-buttonGradientY'></div>
           
           <div className='bg-accentColorOne h-20 w-px absolute top-0 left-1/2 run-animation-5 bg-buttonGradientY'></div>

           <div className='bg-accentColorOne h-20 w-px absolute top-0 left-[949px] run-animation-6 bg-buttonGradientY'></div>
        </div>
    )
}

export default HomeV2