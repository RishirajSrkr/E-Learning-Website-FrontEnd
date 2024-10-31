import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Input from '../components/formComponents/Input'
import Logout from '../components/Logout';
import { AuthContext } from '../context/AuthContext';
import SecondaryButton from '../components/formComponents/SecondaryButton'
import CourseCard from '../components/CourseCard';
import { WindowWidthContext } from '../context/WindowWidthContext';


import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules


function MyProfile() {

    const navigate = useNavigate();

    const { loggedInUser } = useContext(AuthContext);
    const { isMobile } = useContext(WindowWidthContext)

    const [enrolledCourses, setEnrolledCourses] = useState({});

    const [uploadedCourses, setUploadedCourses] = useState({});

    const [enrolledOrUpdated, setEnrolledOrUpdated] = useState("enrolled");


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        bio: ""
    });


    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/update`, formData);

            if (response.status !== 200) {
                throw new Error("Failed to create a new user.");
            }

            // Successfully registered, navigate to home
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            }
        }
    };



    // not showing the error message user is typing / changing formData
    useEffect(() => {
        setErrors(prev => ({ ...prev, name: "" }))
    }, [formData.name])

    useEffect(() => {
        setErrors(prev => ({ ...prev, password: "" }))
    }, [formData.password])

    useEffect(() => {
        setErrors(prev => ({ ...prev, email: "" }))
    }, [formData.email])

    useEffect(() => {
        setErrors(prev => ({ ...prev, bio: "" }))
    }, [formData.bio])



    //fetching the courses enrolled by the user
    useEffect(() => {

        async function getEnrolledCourses() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/enrolled-courses`)

                setEnrolledCourses(response.data)

            }
            catch (e) {
                console.log(e);
            }
        }
        getEnrolledCourses();

        async function getUploadedCourses() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/uploaded-courses`)

                setUploadedCourses(response.data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getUploadedCourses();
    }, [])


    function handleCourseCardClick(id) {
        navigate(`/course/${id}`)
    }


    function handleSetEnrolledOrUpdated(value) {
        setEnrolledOrUpdated(value)
    }



    return (

        <div className='pt-4 sm:pt-32 pb-10 w-full min-h-screen bg-bgOne flex flex-col px-4'>


            <div className='w-full sm:w-1/2 flex flex-col items-center gap-6 '>

                <div className='flex w-full sm:w-1/2 justify-start  items-center gap-3'>
                    <SecondaryButton
                        text={"Enrolled"}
                        onClick={() => handleSetEnrolledOrUpdated("enrolled")}
                        classname={`text-gray rounded-md ${enrolledOrUpdated === 'enrolled' ? "border-green" : "border-border"}`}
                    />
                    <SecondaryButton
                        text={"Uploaded"}
                        onClick={() => handleSetEnrolledOrUpdated("uploaded")}
                        classname={`text-gray  rounded-md ${enrolledOrUpdated === 'uploaded' ? 'border-green' : 'border-border'}`}
                    />

                    {
                        isMobile && <SecondaryButton
                            text={"Profile"}
                            onClick={() => handleSetEnrolledOrUpdated("profile")}
                            classname={`text-gray  rounded-md ${enrolledOrUpdated === 'profile' ? 'border-green' : 'border-border'}`}
                        />
                    }
                </div>




                {
                    enrolledOrUpdated === "enrolled" &&

                    <div className='w-full sm:w-1/2 text-white  items-start flex flex-col gap-4'>

                        <div className='flex justify-start w-full sm:w-1/2'>
                            <h2 className='uppercase text-white text-3xl sm:text-4xl font-semibold'>Enrolled <br /><span className='text-white text-5xl sm:text-6xl'>Courses.</span></h2>
                        </div>


                        {
                            isMobile &&
                            <Swiper
                                slidesPerView={1.2}
                                spaceBetween={12}
                                freeMode={true}

                                modules={[FreeMode]}
                                className="text-gray w-full cursor-move p-4"
                            >

                                {
                                    Object.keys(enrolledCourses).map(key => {
                                        return <SwiperSlide key={key} >

                                            <CourseCard
                                                title={enrolledCourses[key].courseName}
                                                instructor={enrolledCourses[key].instructorName}
                                                description={enrolledCourses[key].courseDescription}
                                                vote={enrolledCourses[key].vote}
                                                onClick={() => handleCourseCardClick(key)}
                                                showCTA={true}
                                                text={"Continue"}
                                            />
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>

                        }







                        <div className='flex flex-col gap-2'>
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
                    </div>
                }


                {
                    enrolledOrUpdated === "uploaded" &&

                    <div className='w-full sm:w-1/2 text-white  items-start flex flex-col gap-4'>

                        <div className='flex justify-start w-full sm:w-1/2'>
                            <h2 className='uppercase text-white text-3xl sm:text-4xl font-semibold'>Uploaded <br /><span className='text-white text-5xl sm:text-6xl'>Courses.</span></h2>
                        </div>

                        {
                            isMobile && <Swiper
                                slidesPerView={1.2}
                                spaceBetween={12}
                                freeMode={true}

                                modules={[FreeMode]}
                                className="text-gray w-full cursor-move"
                            >

                                {
                                    Object.keys(uploadedCourses).map(key => {
                                        return <SwiperSlide key={key} >

                                            <CourseCard
                                                title={uploadedCourses[key].courseName}
                                                instructor={uploadedCourses[key].instructorName}
                                                description={uploadedCourses[key].courseDescription}
                                                vote={uploadedCourses[key].vote}
                                                onClick={() => handleCourseCardClick(key)}
                                                showCTA={true}
                                                text={"View"}
                                            />
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        }



                        <div className='flex flex-col gap-2'>
                            {
                                Object.keys(uploadedCourses).map((key) => {
                                    return <div key={key}
                                        className=''
                                    >

                                        <CourseCard
                                            title={uploadedCourses[key].courseName}
                                            instructor={uploadedCourses[key].instructorName}
                                            description={uploadedCourses[key].courseDescription}
                                            vote={uploadedCourses[key].vote}
                                            onClick={() => handleCourseCardClick(key)}
                                            showCTA={true}
                                            text={"View"}
                                        />

                                    </div>
                                })
                            }
                        </div>
                    </div>
                }

                {
                    enrolledOrUpdated === "profile" &&
                    <form className='text-white w-full flex flex-col justify-start items-center p-12'>

                        <div className='h-24 w-full '>
                            <Input
                                totalWidth={"w-full"}
                                className={""}
                                type={"text"}
                                name={"name"}
                                value={formData.name}
                                placeholder={"your name"}
                                onChange={(e) => handleInputChange(e)}
                                reloadButtonShowOrHide={true}
                                onClick={(e) => handleReloadButton(e)}
                            />

                            {errors && <p className='mt-2 text-xs text-gray'>{errors.name}</p>}
                        </div>

                        <div className='h-24 w-full '>
                            <Input
                                totalWidth={"w-full"}
                                className={""}
                                type={"email"}
                                name={"email"}
                                value={formData.email}
                                placeholder={"your email"}
                                onChange={(e) => handleInputChange(e)}
                                reloadButtonShowOrHide={true}
                                onClick={(e) => handleReloadButton(e)}
                            />
                            {errors && <p className='mt-2 text-xs text-gray'>{errors.email}</p>}

                        </div>

                        <div className='h-24 w-full '>

                            <Input
                                totalWidth={"w-full"}
                                className={""}
                                type={"password"}
                                name={"password"}
                                value={formData.password}
                                placeholder={"your password"}
                                onChange={(e) => handleInputChange(e)}
                                reloadButtonShowOrHide={true}
                                onClick={(e) => handleReloadButton(e)}
                            />
                            {errors && <p className='mt-2 text-xs text-gray'>{errors.password}</p>}

                        </div>

                        <div className='h-24 w-full '>
                            <Input
                                totalWidth={"w-full"}
                                className={""}
                                type={"text"}
                                name={"bio"}
                                value={formData.bio}
                                placeholder={"your bio"}
                                onChange={(e) => handleInputChange(e)}
                                reloadButtonShowOrHide={true}
                                onClick={(e) => handleReloadButton(e)}
                            />
                            {errors && <p className='mt-2 text-xs text-gray'>{errors.bio}</p>}


                        </div>


                        <div className='flex w-full'>
                            <SecondaryButton
                                text={"Update Changes"}
                                classname={`w-1/2 text-white py-3 rounded-none text-xs border-border`}
                                onClick={handleSubmit}
                            >Update Profile</SecondaryButton>



                            {/* ----------------------- show logout button if user logged in -------------------- */}
                            {
                                loggedInUser &&
                                <Logout

                                />
                            }


                        </div>

                    </form>
                }


            </div>


            {/* --------------- gradient line ----------------- */}

            {!isMobile && <div className='h-96 gradient-line-vertical fixed top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 w-[1px]'></div>
            }




            {!isMobile && <form className='mt-8 w-1/2 flex flex-col justify-start items-center sm:fixed right-0 top-0 translate-y-1/3'>

                <div className='h-24 w-1/2 '>
                    <Input
                        totalWidth={"w-full"}
                        className={""}
                        type={"text"}
                        name={"name"}
                        value={formData.name}
                        placeholder={"your name"}
                        onChange={(e) => handleInputChange(e)}
                        reloadButtonShowOrHide={true}
                        onClick={(e) => handleReloadButton(e)}
                    />

                    {errors && <p className='mt-2 text-xs text-gray'>{errors.name}</p>}
                </div>

                <div className='h-24 w-1/2 '>
                    <Input
                        totalWidth={"w-full"}
                        className={""}
                        type={"email"}
                        name={"email"}
                        value={formData.email}
                        placeholder={"your email"}
                        onChange={(e) => handleInputChange(e)}
                        reloadButtonShowOrHide={true}
                        onClick={(e) => handleReloadButton(e)}
                    />
                    {errors && <p className='mt-2 text-xs text-gray'>{errors.email}</p>}

                </div>

                <div className='h-24 w-1/2 '>

                    <Input
                        totalWidth={"w-full"}
                        className={""}
                        type={"password"}
                        name={"password"}
                        value={formData.password}
                        placeholder={"your password"}
                        onChange={(e) => handleInputChange(e)}
                        reloadButtonShowOrHide={true}
                        onClick={(e) => handleReloadButton(e)}
                    />
                    {errors && <p className='mt-2 text-xs text-gray'>{errors.password}</p>}

                </div>

                <div className='h-24 w-1/2 '>
                    <Input
                        totalWidth={"w-full"}
                        className={""}
                        type={"text"}
                        name={"bio"}
                        value={formData.bio}
                        placeholder={"your bio"}
                        onChange={(e) => handleInputChange(e)}
                        reloadButtonShowOrHide={true}
                        onClick={(e) => handleReloadButton(e)}
                    />
                    {errors && <p className='mt-2 text-xs text-gray'>{errors.bio}</p>}


                </div>


                <div className='flex w-1/2'>
                    <SecondaryButton
                        text={"Update Changes"}
                        classname={`w-1/2 text-white py-3 rounded-none border-border`}
                        onClick={handleSubmit}
                    >Update Profile</SecondaryButton>



                    {/* ----------------------- show logout button if user logged in -------------------- */}
                    {
                        loggedInUser &&
                        <Logout

                        />
                    }


                </div>

            </form>}
        </div>
    );
}

export default MyProfile;
