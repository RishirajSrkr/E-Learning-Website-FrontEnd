import React from 'react'
import { BsArrowUpRightCircle } from "react-icons/bs";
import { motion } from 'framer-motion'


function HomePageComponent({ textOne, textTwo, onClick }) {
  return (

    <motion.div
    
    initial={{ y: (100), opacity: 0 }}
    animate={{ y: 0, opacity: 100 }}
    transition={{ delay: 0.20 }}
    
    
    className='w-72 rounded-xl text-white bg-bgTwo p-10 font-medium' >
      <h3 >{textOne}</h3>

      <button onClick={onClick} className='mt-4 bg-gradientForBg bg-clip-text text-transparent flex gap-3 items-center '>

        <BsArrowUpRightCircle className='text-accentColor' />
        <h3>{textTwo}</h3>

      </button>
    </motion.div>
  )
}

export default HomePageComponent