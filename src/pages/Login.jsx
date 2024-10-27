import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'
import Input from '../components/formComponents/Input'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import SecondaryButton from '../components/formComponents/SecondaryButton';
import PrimaryButton from '../components/formComponents/PrimaryButton'

function Login() {
    const navigate = useNavigate();

    const { loggedInUser, login } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleInputChange = (e) => {

        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const status = await login(formData);

            if (status == 200) {
                console.log("Logged in successfully, token stored");

                navigate("/")


                toast.success("Login Successful!", {
                    position: "top-right",
                    style: {
                        background: "#1C1210",
                        color: "#E5E6E6",
                    }

                })
            }
            else {
                toast.error("Incorrect Credentials", {
                    position: "top-right",
                    style: {
                        background: "#1C1210",
                        color: "#E5E6E6",
                    }
                })
            }


        }
        catch (error) {
            console.log("Login Failed", error);
        }
    };

 



    const skills = ["Java", "Spring Boot", "JWT", "React JS", "Spring Security", "Mongo DB", "Token Invalidation", "Role Based Authentication"]

    return (

        <div className='min-h-screen w-full pb-10 bg-bgOne flex justify-between '>
            
            <div className=' w-1/2 flex justify-center items-start flex-col gap-6 ml-24'>

                {/* ---------------- headline -------------- */}
                <div className='text-3xl text-white font-semibold flex gap-2 w-fit'>
                    <h2>Developed by</h2>
                    <h2 className='w-fit bg-gradientForBg bg-clip-text text-transparent'>@Rishiraj</h2>
                </div>

                {/* ---------------- skills ----------------- */}
                <div className='text-gray w-fit flex flex-col gap-4'>
                    <p>I have build this app to practice</p>
                    <div className=' flex gap-2 flex-wrap w-2/3'>
                        {
                            skills.map((skill, index) => (
                                <div key={index} className={' px-4 py-1.5 bg-bgTwo text-white border-border rounded-sm'}>
                                    <p className={'text-xs font-medium'}>{skill}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className='w-1/2 bg-bgOne'>
                <form className='w-full flex flex-col justify-center items-center h-screen '>

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


                    </div>

                    <div className='w-1/2 flex justify-end'>
                        <p className='text-gray text-sm'>Don't have an account? <Link to={"/register"}>Register</Link></p>
                    </div>

                    <PrimaryButton
                        text={"Login"}
                        classname={`fixed bottom-10 right-12 mt-10  rounded-full shadow-2xl shadow-lime-800  px-8 py-2.5 font-semibold`}
                        onClick={handleSubmit}
                    >Login</PrimaryButton>

                </form>
            </div>


        </div>
    );
}

export default Login;
