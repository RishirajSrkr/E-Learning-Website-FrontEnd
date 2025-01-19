import React from 'react'
import { ThreeDot } from 'react-loading-indicators'
function Loader({ classname }) {
    return (

        //pass in a height like h-[700px] or h-screen in classname
        //and update color with accentColor
        <div className={` ${classname} flex items-center justify-center`}>
            <ThreeDot color="#FF4533" size="small" />
        </div>
    )
}

export default Loader