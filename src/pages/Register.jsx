import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Input from '../components/formComponents/Input'
import { toast } from 'react-hot-toast';
import PrimaryButton from '../components/formComponents/PrimaryButton';

function Register() {
    const navigate = useNavigate();

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


        console.log(formData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/public/register`, formData);
            const data = await response.data;

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
                    setErrors(errorMessage);
                }
            }
        }
    };

    console.log(errors);


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





    const skills = ["Java", "Spring Boot", "JWT", "React JS", "Spring Security", "Mongo DB", "Token Invalidation", "Role Based Authentication"]

    return (

        <div className='min-h-screen w-full flex'>



            <div className='px-16 w-1/2 bg-bgColorOne flex justify-center flex-col gap-6'>

                {/* ---------------- headline -------------- */}
                <div className='text-3xl text-maintextColor font-semibold flex gap-2 w-fit'>
                    <h2>Developed by</h2>
                    <h2 className='w-fit text-accentColorOne'>@Rishiraj</h2>
                </div>

                {/* ---------------- skills ----------------- */}
                <div className='text-subtextColor w-fit flex flex-col gap-4'>
                    <p>I have build this app to practice</p>
                    <div className=' flex gap-2 flex-wrap w-2/3'>
                        {
                            skills.map((skill, index) => (
                                <div key={index} className={' px-4 py-1.5 bg-bgColorThree text-maintextColor border-borderColor rounded-sm'}>
                                    <p className={'text-xs font-medium'}>{skill}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>



            <div className='w-1/2 bg-bgColorOne '>
                <form className='w-full flex flex-col justify-center items-center h-screen'>

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

                        {errors && <p className='mt-2 text-xs text-gray-400'>{errors.name}</p>}
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
                        {errors && <p className='mt-2 text-xs text-gray-400'>{errors.email}</p>}

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
                        {errors && <p className='mt-2 text-xs text-gray-400'>{errors.password}</p>}

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
                        {errors && <p className='mt-2 text-xs text-gray-400'>{errors.bio}</p>}
                    </div>



                    <div className='w-1/2 flex justify-end'>
                        <p className='text-subtextColor text-sm'>Already have an account? <Link to={"/login"}>Login</Link></p>
                    </div>

                    <PrimaryButton
                        text={"Register"}
                        classname={`fixed bottom-10 right-12 mt-10 bg-accentColorOne rounded-full text-white px-10 py-3 font-semibold`}
                        onClick={handleSubmit}
                    >Login</PrimaryButton>

                </form>
            </div>


        </div>
    );
}

export default Register;
