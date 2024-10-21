import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/formComponents/Input'
import Logout from '../components/Logout';
import { AuthContext } from '../context/AuthContext';

function MyProfile() {
    const navigate = useNavigate();

    const {loggedInUser, logout} = useContext(AuthContext);

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



    return (

        <div className='w-full bg-bgColorOne '>
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


                <button
                    type='submit'
                    className={`w-1/2 bg-bgColorTwo border border-gray-800 text-white px-10 py-3 font-semibold`}
                    onClick={handleSubmit}
                >Update Profile</button>



{/* ----------------------- show logout button if user logged in -------------------- */}
                {
                    loggedInUser &&
                    <Logout

                    />
                }


            </form>
        </div>
    );
}

export default MyProfile;
