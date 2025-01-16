import React, { useEffect, useRef, useState } from 'react'
import PrimaryButton from '../../components/formComponents/PrimaryButton'
import axios from '../../config/axiosConfig'
import { useParams } from 'react-router-dom';
import { ThreeDot } from 'react-loading-indicators';
import { PiWarningCircleBold } from "react-icons/pi";
import { TbReload } from "react-icons/tb";

function CourseDiscussionPage() {

  const latestCommentRef = useRef();

  const { courseId } = useParams();

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState({
    content: "",
    courseId: courseId,
  });

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRecentComments, setIsLoadingRecentComments] = useState(false)

  useEffect(() => {
    fetchAllComments();
  }, [])


  async function fetchAllComments() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${courseId}`);

    setComments(response.data)

    console.log(response.data);
  }


  async function handlePostCommentClick() {

    console.log("handlePostCommentClick called");

    try {
      setIsLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, comment);
      console.log(response.data);

    }
    catch (e) {
      console.error("Failed to post the comment :: " + e)
    }

    finally {

      fetchAllComments().then(() => {
        setIsLoading(false)
        setComment({ ...comment, content: "" })
      })

    }

  }

  useEffect(() => {
    if (latestCommentRef.current) {
      latestCommentRef.current.scrollIntoView({ behavior: 'smooth' });

    }
  }, [comments]);


  function formatCommentTime(dateString) {
    const now = new Date();
    const commentDate = new Date(dateString);


    const seconds = Math.floor((now - commentDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} ${hours == 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }

  }



  return (

    <div className='h-screen w-full pt-36 '>


      <div className='w-96 mx-auto flex flex-col justify-between'>

        {/* ------------------ previous comments --------------------- */}

        <div className='flex flex-col gap-2 h-96  overflow-y-scroll' style={{ scrollbarWidth: "none" }}>

          {
            comments?.map((comment, index) => {

              return <div key={index}
                className='border border-lightBorder dark:border-darkBorder rounded-lg p-4'
              >
                <div className='text-gray flex justify-between font-medium mb-1 text-sm'>
                  <h3 className='font-semibold'>{comment.username}</h3>
                  <p className='text-xs'>{formatCommentTime(comment.createdAt)}</p>
                </div>
                <p>{comment.content}</p>
              </div>

            })
          }

          <div ref={latestCommentRef}></div>

        </div>


        {/* ----------------- post comment ------------------- */}

        <div className=' flex flex-col gap-2 items-center '>



          <div className=' my-4 flex gap-1 text-xs items-center text-gray'>
            <PiWarningCircleBold />
            <p>This is a public chat, please be respectful.</p>
          </div>


          <div className='relative w-full'>

            <div onClick={() => fetchAllComments()} className='cursor-pointer bg-bgTwo p-2 rounded-full absolute -right-10 bottom-1/2 translate-y-1/2 '>
              <TbReload className='text-accentColor' />
            </div>

            <input
              type="text"
              placeholder='type your comment . . .'
              name="commentInput"
              value={comment.content}
              onChange={(e) => setComment({ ...comment, content: e.target.value })}

              className='rounded-lg w-full  outline-none bg-gray-50 border border-lightBorder dark:border-darkBorder dark:bg-bgTwo  px-6 py-2 focus:ring-0'
            />

          </div>


          <PrimaryButton
            isLoading={isLoading}
            text={"Post Comment"}
            classname={"w-full rounded-lg"}
            onClick={handlePostCommentClick} />

        </div>


      </div>

    </div>
  )
}

export default CourseDiscussionPage