import React from 'react'

function SecondaryButton({text, classname,onClick}) {
  return (
    <button
    className={`${classname} text-sm font-medium rounded-lg h-8 px-4 bg-zinc-100 text-black dark:bg-bgThree dark:text-white`}
    onClick={onClick}
    >
        <p>
        {text}
        </p>
    </button>
  )
}

export default SecondaryButton