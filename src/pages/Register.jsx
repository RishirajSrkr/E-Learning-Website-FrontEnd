import React, { useState, useEffect } from 'react';
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
        bio: ""
    });



    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
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
        <div className='py-24 w-full min-h-screen bg-bgOne justify-center flex flex-col'>


            {/* ---------- headline ---------- */}

            {/* <div className='w-96 mx-auto'>
            <h2 className='bg-gradientForBg bg-clip-text text-transparent text-4xl font-semibold'>Welcome Back</h2>
            <p className='text-gray mt-2'>Please enter your login credentials to continue</p>
        </div> */}


            {/* ------------ form -------------- */}

            <div className='bg-gradientForBorderOpposite w-96 mx-auto p-[1px] rounded-lg mt-8'>

                <form className='w-full p-12 rounded-lg flex flex-col justify-center  mx-auto bg-bgOne'>



                    <div>
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

                        </div>
                    </div>


                    <div>
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
                        </div>

                    </div>

                    <PrimaryButton
                        isLoading={isLoading}
                        text={"Register"}
                        classname={'w-32 py-2 rounded-full shadow-2xl shadow-lime-800  font-semibold'}
                        onClick={handleSubmit}
                    ></PrimaryButton>



                    <div className='text-left mt-6'>
                        <p className='text-gray text-sm'>Already have an account? <Link to={"/login"}>Login</Link></p>
                    </div>



                </form>


            </div>


        </div>
    );
}

export default Register;
