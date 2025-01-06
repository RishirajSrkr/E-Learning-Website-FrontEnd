import React from 'react'
import { useParams } from 'react-router-dom'

function VideoResourcePage() {
  const { resourceId, redirect } = useParams();
  return (
    <div className='pt-32 min-h-screen w-full px-32'>

      {
        redirect == "redirect" && <div className='w-full p-4 border dark:border-darkBorder dark:bg-bgTwo rounded-md relative'>

          <div className='absolute font-medium text-sm bg-accentColor text-black px-3 py-1 rounded-md -top-4'>
            Please Note
          </div>



          <p>The Resource you trying to create already exists. Please UpVote it.</p>
        </div>
      }



      {resourceId}
    </div>
  )
}

export default VideoResourcePage