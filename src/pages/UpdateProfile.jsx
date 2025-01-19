import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { toast } from 'sonner';
import PrimaryButton from '../components/formComponents/PrimaryButton';
import Input from '../components/formComponents/Input';
import SecondaryButton from '../components/formComponents/SecondaryButton';
import { MdUpload } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';
import { MdEdit } from "react-icons/md";
import CircleLoader from '../components/CircleLoader';

function UpdateProfile() {

    const { user } = useContext(UserContext);

    const { loggedInUser } = useContext(AuthContext)

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        bio: "",
        profileImage: "",
    });

    const [imagePreview, setImagePreview] = useState(null)

    const profileImageRef = useRef();


    const handleInputChange = (e) => {


        if (e.target.name === 'profileImage') {

            const file = e.target.files[0];

            setFormData(prev => ({ ...prev, profileImage: file }))

            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)

        }
        else {

            setFormData(prev => ({
                ...prev, [e.target.name]: e.target.value
            }));
        }

    };

    console.log(formData);



    const handleSubmit = async (e) => {

        e.preventDefault();

        const formDataWithImage = new FormData();

        const registerUserDto = {
            name: formData.name,
            email: formData.email ? formData.email : user?.email,
            bio: formData.bio,
            password: formData.password,
        }

        formDataWithImage.append("registerUserDto", JSON.stringify(registerUserDto));



        if (formData.profileImage) {
            formDataWithImage.append("file", formData.profileImage)
        }


        try {
            setIsLoading(true)

            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update-profile`, formDataWithImage);

            
            toast.success("Updated Successfully")

        } catch (error) {
            if (error.response && error.response.data) {
                toast.error("Failed to update", {
                    position: "top-right",
                    style: {
                        background: "#1C1210",
                        color: "#E5E6E6",
                    }
                })
            }
        }
        finally {
            setIsLoading(false)
        }
    };



    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])



    return (
        <div className='min-h-screen  w-full flex flex-col gap-8 justify-center items-center py-24'>

            <form className='flex flex-col w-3/5  gap-4 '>

                {/* ---------------- Image -------------- */}

                <div className='flex w-1/2 mx-auto gap-8 items-center justify-center'>
                    <div className='relative'>
                        <div className='rounded-full h-32 w-32'>
                            {
                                imagePreview ?
                                    <img
                                        src={imagePreview}
                                        className='rounded-full w-full h-full object-cover'

                                    />
                                    :
                                    <img src={user?.profileImage} className='rounded-full w-full h-full object-cover' />
                            }
                        </div>

                        <div
                            onClick={() => profileImageRef.current.click()}
                            className='bg-gray-100 text-black dark:text-gray-100 dark:bg-bgThree flex cursor-pointer justify-center items-center p-2 rounded-full  absolute bottom-0 right-2'>
                            <MdEdit />

                        </div>
                        <input
                            type="file"
                            name="profileImage"
                            className='hidden'
                            ref={profileImageRef}
                            onChange={(e) => handleInputChange(e)}

                        />
                    </div>


                </div>




                {/* -------------- input fields ------------------ */}

                <div className='flex mx-auto flex-col gap-3 w-1/2'>
                    <Input
                        name={"name"}
                        type={"text"}
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={user?.name}
                    />

                    <Input
                        name={"email"}
                        type={"email"}
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        placeholder={user?.email}
                        disabled={true}
                    />

                    <Input
                        name={"password"}
                        type={"password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"Oops! We cannot show the password"}
                    />

                    <Input
                        name={"bio"}
                        type={"text"}
                        value={formData.bio}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={user.bio ? user.bio : "Write something about yourself"}
                    />
                </div>


            </form>

            <div className='flex w-3/5 mx-auto gap-4 items-center justify-center'>
                <div className='w-1/2 flex gap-4'>
                <PrimaryButton
                        isLoading={isLoading}
                        text={"Update Profile"}
                        classname={' py-3 w-full rounded-md font-semibold'}
                        onClick={handleSubmit}
                    ></PrimaryButton>

                    {
                        loggedInUser && <Logout />
                    }
                </div>

            </div>


        </div>


    );
}

export default UpdateProfile;
