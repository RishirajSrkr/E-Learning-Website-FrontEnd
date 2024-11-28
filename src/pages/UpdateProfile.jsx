import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { toast } from 'react-hot-toast';
import PrimaryButton from '../components/formComponents/PrimaryButton';
import Input from '../components/formComponents/Input';
import SecondaryButton from '../components/formComponents/SecondaryButton';
import { MdUpload } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';
import { MdEdit } from "react-icons/md";
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
            email: formData.email,
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


            navigate("/my-profile")

            toast.success("Updated Successfully!", {
                position: "top-right",
                style: {
                    background: "#1C1210",
                    color: "#E5E6E6",
                }

            })

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
        <div className='min-h-screen bg-bgOne w-full flex flex-col gap-12 justify-center items-center py-32'>

            <form className='flex flex-col w-3/5  gap-12 '>

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
                            className='bg-gradientForBg flex cursor-pointer justify-center items-center p-2 rounded-full  absolute bottom-0 right-2'>
                            <MdEdit className=' text-black' />

                        </div>
                        <input
                            type="file"
                            name="profileImage"
                            className='hidden'
                            ref={profileImageRef}
                            onChange={(e) => handleInputChange(e)}

                        />
                    </div>

                    <div className='flex gap-4'>
                        <SecondaryButton text={"Remove Picture"} classname={" rounded-md bg-transparent border border-border text-white px-2"} />

                    </div>
                </div>




                {/* -------------- input fields ------------------ */}

                <div className='flex mx-auto flex-col gap-5 w-1/2'>
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
                        className={""}
                        placeholder={user?.email}
                    />

                    <Input
                        name={"password"}
                        type={"password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"Oops!   We cannot show the password"}
                    />

                    <Input
                        name={"bio"}
                        type={"text"}
                        value={formData.bio}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={user?.bio}
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
