import React from 'react'
import 'ldrs/dotPulse'



function LoaderButton({theme}) {
    return (
        <l-dot-pulse
            size="25"
            speed="1.3"
            color={theme == "dark" ? "white" : "black"}
        ></l-dot-pulse>
    )
}

export default LoaderButton