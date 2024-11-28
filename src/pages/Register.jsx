import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Input from '../components/formComponents/Input'
import { toast } from 'react-hot-toast';
import PrimaryButton from '../components/formComponents/PrimaryButton';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        bio: "",
        profileImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null)

    const profileImageRef = useRef();


    const handleInputChange = (e) => {


        if (e.target.name === 'profileImage') {

            const file = e.target.files[0];

            setFormData(prev => ({ ...prev, profileImage: file }))

            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)

            console.log("yes its image");

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


        console.log(formDataWithImage);





        try {
            setIsLoading(true)

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/public/register`, formDataWithImage);

            const data = response.data;

            console.log(data);


            toast.success("Registered Successfully!", {
                position: "top-right",
                style: {
                    background: "#1C1210",
                    color: "#E5E6E6",
                }

            })

            // Successfully registered, navigate to home

            navigate("/");

        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data;
                if (errorMessage === "Email already exists") {

                    toast.error("Email already exists!", {
                        position: "top-right",
                        style: {
                            background: "#1C1210",
                            color: "#E5E6E6",
                        }

                    })

                }
                else {
                    toast.error("Fields cannot be empty", {
                        position: "top-right",
                        style: {
                            background: "#1C1210",
                            color: "#E5E6E6",
                        }

                    })
                }
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
        <div className='pt-28 sm:pb-24 w-full min-h-screen bg-bgOne sm:justify-center flex flex-col'>


            {/* ------------ form -------------- */}

            <div className='bg-gradientForBorderOpposite w-11/12 sm:w-96 mx-auto p-[1px] rounded-lg -mt-16 sm:mt-8'>

                <form className='w-full p-6 sm:p-12 rounded-lg flex flex-col justify-center mx-auto bg-bgOne'>




                    <div className='h-24 w-full '>
                        <Input
                            totalWidth={"w-full"}
                            className={""}
                            type={"text"}
                            name={"name"}
                            value={formData.name}
                            placeholder={"your name"}
                            onChange={(e) => handleInputChange(e)}

                        />

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

                        />

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

                        />

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

                        />
                    </div>


                    {/* ------------------ image preview ----------------- */}

                    <div className='flex gap-3 items-center mb-10'>

                        <div className=' min-h-12 min-w-12  border border-border border-dashed'>
                            {imagePreview && (

                                <img src={imagePreview} alt="Profile image preview" className='w-12 h-12 object-cover rounded' />

                            )}
                        </div>



                        <input
                            type="file"
                            className='hidden'
                            accept='image/*'
                            ref={profileImageRef}
                            name='profileImage'
                            onChange={handleInputChange}
                        />

                        <div
                            onClick={() => profileImageRef.current.click()}
                            className='border w-full border-dashed border-border h-12 flex justify-center text-white items-center cursor-pointer text-sm '>
                            Image Upload
                        </div>
                    </div>






                    <PrimaryButton
                        isLoading={isLoading}
                        text={"Register"}
                        classname={'w-28 py-2 rounded-full  font-semibold'}
                        onClick={handleSubmit}
                    ></PrimaryButton>



                    <div className='text-left  mt-4 sm:mt-6'>
                        <p className='text-gray text-sm'>Already have an account? <Link to={"/login"}>Login</Link></p>
                    </div>



                </form>


            </div>


        </div>
    );
}

export default Register;
