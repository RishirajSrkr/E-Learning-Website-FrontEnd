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
        image: null,
    });

    const [profileImage, setProfileimage] = useState(null);

    const profileImageRef = useRef();


    const handleInputChange = (e) => {
      
        if (e.target.name === 'profileImage') {
            setFormData(prev => ({ ...prev, image: e.target.files[0]}))
            console.log("yes its image");
            
        }
        else {
            setFormData(prev => ({
                ...prev, [e.target.name]: e.target.value
            }));
        }

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/public/register`, formData);

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


 {/* ------------------ image preview ----------------- */}
<div>

</div>

                    <input
                        type="file"
                        className='hidden'
                        ref={profileImageRef}
                        name='profileImage'
                        onChange={handleInputChange}
                    />

                    <div
                        onClick={() => profileImageRef.current.click()}
                        className='border border-dashed border-border h-14 mb-6 flex justify-center text-white items-center cursor-pointer'>
                        Image Upload
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



                    <PrimaryButton
                        isLoading={isLoading}
                        text={"Register"}
                        classname={'w-32 py-2 rounded-full shadow-2xl shadow-lime-800  font-semibold'}
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
