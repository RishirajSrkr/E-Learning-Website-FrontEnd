import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/formComponents/Input'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PrimaryButton from '../../components/formComponents/PrimaryButton'
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
function Login() {

    const navigate = useNavigate();

    const googleClientId = import.meta.env.VITE_CLIENT_ID;
    console.log(googleClientId);
    

    const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`;


    const handleGoogleLogin = () => {


        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

        window.location.href = googleAuthUrl;
    };



    return (
        <div className='w-full h-screen flex items-center bg-'>

            <div className='w-[350px] flex flex-col gap-3 mx-auto'>

         <p className='text-sm font-medium bg-indigo-500 w-fit px-4 py-1 rounded-full shadow-xl dark:shadow-indigo-950 shadow-indigo-100 text-white dark:text-white'>Login to BitByBit</p>

                <button type='button' className='flex gap-2 items-center justify-center text-sm font-medium w-full py-3 rounded-full border border-lightBorder dark:border-darkBorder ' onClick={handleGoogleLogin}>
                    <FcGoogle size={19} />
                    Login with Google
                </button>


                <div>
                    Show other options
                </div>
            </div>
        </div>
    )
}

export default Login;


