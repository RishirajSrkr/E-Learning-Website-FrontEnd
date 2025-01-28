import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import DashBoardCard from '../components/DashBoardCard';
import { BiLike } from "react-icons/bi";
import { RiFileUploadLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { ThreeDot } from 'react-loading-indicators';
import axios from '../config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { TbReload } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { motion } from 'framer-motion'
import { RiArrowRightLine } from "react-icons/ri";
import { TbLoader2 } from 'react-icons/tb';
import { toast } from 'sonner';

function DashBoard() {

  const navigate = useNavigate();

  const { user, isLoading } = useContext(UserContext)


  const [selected, setSelected] = useState("enrolled-courses");
  const [enrolledCourses, setEnrolledCourses] = useState({})
  const [uploadedCourses, setUploadedCourses] = useState({})
  const [votes, setVotes] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null)
  const [courseLinkToShare, setCourseLinkToShare] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);


  console.log(user);

  //fetching the total vote the user has received
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/total-votes`);
      console.log(response.data);
      
      setVotes(response.data)
    })();
  }, [])




  async function fetchEnrolledCourses() {

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enrollments`)
    setEnrolledCourses(response.data)
    console.log("Enrolled courses", response.data);

  }

  async function fetchUploadedCourses() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/uploaded-courses`)
    setUploadedCourses(response.data)
  }

  useEffect(() => {
    fetchEnrolledCourses();
    fetchUploadedCourses();
  }, [])


  function handleCourseCardClick(id) {
    navigate(`/course/${id}`)
  }

  function handleToggleDropdown(id) {
    setShowDropdown(prev => prev === id ? null : id);
  }



  //setting up course share link when someone clicks on share button
  function handleCourseLinkToShare(courseId) {
    setShowDropdown(null)
    console.log(courseId);

    const fullCourseLink = `${import.meta.env.VITE_FRONTEND_URL}/course/${courseId}`

    navigator.clipboard.writeText(fullCourseLink);

    toast.success("Link copied!")
  }




  async function handleCourseDelete(courseId) {
    try {
      setIsDeleting(true)

      const remainingUploadedCourses = Object.keys(uploadedCourses)
        .filter(key => key != courseId)
        .reduce((acc, key) => {
          acc[key] = uploadedCourses[key]
          return acc;
        }, {})

      setUploadedCourses(remainingUploadedCourses);

      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/course/delete/${courseId}`)
      toast.success("Course deleted successfully")

      console.log(response.data);
    }
    catch (e) {
      toast.error("Failed to delete the course, please try again")
      console.log("Error while deleting the course : ", e);
    }
    finally {
      setIsDeleting(false)
    }

  }




  return (
    <div className='min-h-screen dark:bg-black bg-white text-black dark:text-white flex justify-center w-full' >

      {
        isLoading ?

          (
            <div className='text-center mb-4 w-full' >
              <ThreeDot color="#9CF57F" size="small" />
            </div>
          )


          :

          (

            <div className='py-40 flex flex-col  items-center  gap-4 '>


              <div className='flex justify-center items-center gap-4 relative'>

                <div onClick={() => fetchEnrolledCourses()} className='cursor-pointer bg-gray-50 dark:bg-bgTwo p-2 rounded-full absolute left-0 -top-10'>
                  <TbReload className='text-gray-500' />
                </div>


                <DashBoardCard
                  user={user}
                  headtext={"Enrolled Resources"}
                  subtext={"Level up your skills!"}
                  value={Object.keys(enrolledCourses).length}
                  icon={<FaBookOpen />}
                  onClick={() => setSelected("enrolled-courses")}
                  isSelected={selected == "enrolled-courses"}

                />


                <DashBoardCard
                  user={user}
                  headtext={"Uploaded Resources"}
                  subtext={"We appreciate your efforts!"}
                  value={Object.keys(uploadedCourses).length}
                  icon={<RiFileUploadLine />}
                  onClick={() => setSelected("uploaded-courses")}
                  isSelected={selected == "uploaded-courses"}


                />


                <DashBoardCard
                  user={user}
                  headtext={"Total Votes"}
                  subtext={"People are loving your courses!"}
                  value={votes}
                  icon={<BiLike />}
                  onClick={() => setSelected("top-voted")}
                  isSelected={selected == "top-voted"}

                />
              </div>

              <div className='my-8'></div>

              {
                selected == "uploaded-courses" && <div className='flex flex-col gap-2 w-full'>

                  {
                    Object.keys(uploadedCourses).length == 0 && <div className='text-gray-500 text-center'>
                      <p>You don't have any uploaded courses.</p>
                      <p>Contribute now & be a part of the journey.</p>

                      <button
                        className='mt-3 flex gap-1 text-white  mx-auto items-center underline underline-offset-2'
                        onClick={() => navigate("/course/create")}
                      >
                        <p>Contribute</p>
                      </button>

                    </div>
                  }
                  {
                    Object.keys(uploadedCourses).map((key) => {
                      return <div key={key}
                        className='text-black dark:text-white rounded-md bg-gray-100 dark:bg-bgTwo w-full px-8 py-4 font-medium text-2xl flex justify-between items-center relative'
                      >
                        {uploadedCourses[key].courseName}

                        <BsThreeDots
                          onClick={() => handleToggleDropdown(key)}
                          size={20}
                          className='text-gray cursor-pointer'
                        />

                        {
                          showDropdown === key && <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 100 }}
                            transition={{ delay: 0 }}
                            className='bg-gray-50 dark:bg-bgThree w-32 text-gray px-5 py-3.5 rounded-md absolute right-8 flex flex-col gap-2 top-12 z-50'
                          >

                            <Link to={`/course/${key}`} className='text-sm h-5 flex items-center gap-1'>  <FaArrowUpRightFromSquare className='w-6' size={12} />View</Link>

                            {/* <Link to={`/course/${key}/enrolled-users`} className='text-sm h-5 flex items-center gap-1'><FaUserFriends className='w-6' /> Enrolled</Link> */}


                            <Link onClick={() => handleCourseLinkToShare(key)} className='text-sm h-5 flex items-center gap-1'>  <FaShareAlt className='w-6' size={12} />Share</Link>


                            <Link onClick={() => handleCourseDelete(key)} className='text-sm h-5 flex items-center '>{isDeleting ? <div className='flex items-center gap-1'><TbLoader2 className='animate-spin w-6' />Deleting</div> : <div className='flex items-center gap-1'><MdDelete className='w-6' size={13} /> Delete</div>}</Link>

                          </motion.div>
                        }

                      </div>
                    })
                  }
                </div>
              }




              {
                selected == "enrolled-courses" && <div className='flex flex-col gap-2 w-full'>

                  {
                    Object.keys(enrolledCourses).length == 0 && <div className='text-gray-500 text-center'>
                      <p>You don't have any enrolled courses.</p>
                      <p>Enroll now & be a part of the journey.</p>

                      <button
                        className='mt-3 flex gap-1 text-white  mx-auto items-center underline underline-offset-2'
                        onClick={() => navigate("/all-courses")}
                      >
                        <p>All Courses</p>
                      </button>

                    </div>

                  }


                  {
                    Object.keys(enrolledCourses).map((key) => {
                      return <div key={key}
                        className='rounded-md bg-gray-100 dark:bg-bgTwo w-full px-8 py-4 font-medium text-2xl flex justify-between items-center relative'
                      >
                        {enrolledCourses[key].courseName}

                        <BsThreeDots
                          onClick={() => handleToggleDropdown(key)}
                          size={20}
                          className='text-gray cursor-pointer'
                        />

                        {
                          showDropdown === key && <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 100 }}
                            transition={{ delay: 0 }}
                            className='bg-gray-50 dark:bg-bgThree text-gray px-5 py-3.5 rounded-md absolute right-8 flex flex-col gap-2 top-12 z-50'
                          >


                            <Link to={`/course/${key}`} className='text-sm flex items-center gap-2'>  <FaArrowUpRightFromSquare size={12} />View</Link>

                            <Link onClick={() => handleCourseLinkToShare(key)} className='text-sm flex items-center gap-2'>  <FaShareAlt size={12} />Share</Link>

                          </motion.div>
                        }

                      </div>
                    })
                  }
                </div>
              }






            </div>





          )

      }






    </div>
  )
}

export default DashBoard