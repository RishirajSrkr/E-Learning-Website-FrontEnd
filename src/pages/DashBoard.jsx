import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import DashBoardCard from '../components/DashBoardCard';
import { BiLike } from "react-icons/bi";
import { RiFileUploadLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { ThreeDot } from 'react-loading-indicators';
import axios from '../config/axiosConfig';
import CourseCard from '../components/CourseCard';
import { Link, useNavigate } from 'react-router-dom';
import { TbReload } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import {toast} from 'react-hot-toast'
function DashBoard() {

  const navigate = useNavigate();

  const { user, isLoading } = useContext(UserContext)


  const [selected, setSelected] = useState("uploaded-courses");
  const [enrolledCourses, setEnrolledCourses] = useState({})
  const [uploadedCourses, setUploadedCourses] = useState({})
  const [votes, setVotes] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null)
  const [courseLinkToShare, setCourseLinkToShare] = useState(null);

  console.log(user);

  //fetching the total vote the user has received
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/total-votes`);
      setVotes(response.data)
    })();
  }, [])




  async function fetchEnrolledCourses() {

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/enrolled-courses`)
    setEnrolledCourses(response.data)
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

    const fullCourseLink = `http://localhost:5173/course/${courseId}`

    navigator.clipboard.writeText(fullCourseLink);

    toast.success("Link Copied!", {
      position: "bottom-right",
      style: {
        background: "#131415",
        color: "#FFFFFF",
      }

    })

  }
  return (
    <div className='min-h-screen bg-bgOne flex justify-center  w-full' >

      {
        isLoading ?

          (
            <div className='text-center mb-4 w-full' >
              <ThreeDot color="#9CF57F" size="small" />
            </div>
          )


          :

          (

            <div className='py-40 flex flex-col  items-center bg-bgOne gap-4 '>


              <div className='flex justify-center items-center gap-4 relative'>

                <div onClick={() => fetchEnrolledCourses()} className='cursor-pointer bg-bgTwo p-2 rounded-full absolute left-0 -top-10'>
                  <TbReload className='text-green' />
                </div>

                <DashBoardCard
                  user={user}
                  headtext={"Uploaded Courses"}
                  subtext={"We appreciate your efforts!"}
                  value={Object.keys(uploadedCourses).length}
                  icon={<RiFileUploadLine className='text-green' />}
                  onClick={() => setSelected("uploaded-courses")}

                />

                <DashBoardCard
                  user={user}
                  headtext={"Enrolled Courses"}
                  subtext={"Level up your skills!"}
                  value={Object.keys(enrolledCourses).length}
                  icon={<FaBookOpen className='text-green' />}
                  onClick={() => setSelected("enrolled-courses")}

                />

                <DashBoardCard
                  user={user}
                  headtext={"Total Votes"}
                  subtext={"People are loving your courses!"}
                  value={votes}
                  icon={<BiLike className='text-green' />}
                  onClick={() => setSelected("uploaded-courses")}

                />
              </div>

              <div className='gradient-line my-8'></div>

              {
                selected == "uploaded-courses" && <div className='flex flex-col gap-2 w-full'>
                  {
                    Object.keys(uploadedCourses).map((key) => {
                      return <div key={key}
                        className='text-white bg-bgTwo w-full px-8 py-4 font-medium text-2xl flex justify-between items-center relative'
                      >
                        {uploadedCourses[key].courseName}

                        <BsThreeDots
                          onClick={() => handleToggleDropdown(key)}
                          size={20}
                          className='text-gray cursor-pointer'
                        />

                        {
                          showDropdown === key && <div
                            className='bg-bgThree text-gray px-5 py-3.5 rounded-md absolute right-8 flex flex-col gap-1.5 top-11 z-50'
                          >


                            <Link to={`/course/${key}`} className='text-sm flex items-center gap-2'>  <FaArrowUpRightFromSquare size={12} />View</Link>

                            <Link to={`/course/${key}/enrolled-users`} className='text-sm flex items-center gap-2'><FaUserFriends /> Enrolled</Link>


                            <Link onClick={() => handleCourseLinkToShare(key)} className='text-sm flex items-center gap-2'>  <FaShareAlt size={12} />Share</Link>

                          </div>
                        }

                      </div>
                    })
                  }
                </div>
              }




              {
                selected == "enrolled-courses" && <div className='flex flex-col gap-2'>
                  {
                    Object.keys(enrolledCourses).map((key) => {
                      return <div key={key}
                        className=''
                      >

                        <CourseCard
                          title={enrolledCourses[key].courseName}
                          instructor={enrolledCourses[key].instructorName}
                          description={enrolledCourses[key].courseDescription}
                          vote={enrolledCourses[key].vote}
                          onClick={() => handleCourseCardClick(key)}
                          showCTA={true}
                          text={"Continue"}
                        />

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