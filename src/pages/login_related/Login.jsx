import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import CircleLoader from '../../components/CircleLoader'

function Login() {

    const navigate = useNavigate();

    const googleClientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`;

    const { theme } = useTheme();

    const { login } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleGoogleLogin = () => {

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

        window.location.href = googleAuthUrl;
    };


    const handleInputChange = (e) => {

        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));

    };



    const handleEmailLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)

            setTimeout(() => {

            }, 4000);

            const status = await login(formData);
            console.log(window.history);


            if (status == 200) {

                const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
                if (redirectAfterLogin) {
                    window.location.href = redirectAfterLogin;
                }
                else navigate("/")

                toast.success("Login successful!")
            }
            else {
                toast.error("Incorrect credentials")
            }


        }
        catch (error) {
            console.log("Login Failed", error);
        }

        finally {
            setIsLoading(false)
        }
    };




    return (
        <div className='w-full h-screen flex items-center flex-col justify-center'>

            <div className='w-[350px] flex flex-col gap-3 mx-auto'>

                <p className='text-sm font-medium border border-emerald-500 bg-emerald-600 w-fit px-4 py-1 rounded-full shadow-xl dark:shadow-emerald-950 shadow-emerald-100 text-white dark:text-white'>Recommended</p>

                <button type='button' className='flex gap-2 items-center dark:bg-bgTwo justify-center text-sm font-medium w-full py-3 rounded-full border border-lightBorder dark:border-darkBorder ' onClick={handleGoogleLogin}>
                    <FcGoogle size={19} />
                    Login with Google
                </button>

            </div>

{/* 
            <div className='my-5 flex gap-2 justify-center items-center w-[350px] px-10'>
                <div className='h-[1px] bg-zinc-400 w-16'></div>
                <p className='text-center text-xs text-zinc-400 w-full'>or log in with email & password</p>
                <div className='h-[1px] bg-zinc-400 w-16'></div>

            </div> */}



            {/* <div className='w-[350px] mx-auto flex flex-col gap-3'>
                <input
                    type="text"
                    name='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    className='w-full rounded-full px-6 py-3 bg-transparent border border-lightBorder dark:border-darkBorder outline-none ring-0'
                    placeholder='example@gmail.com'

                />


                <input
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={(e) => handleInputChange(e)}
                    className='w-full rounded-full px-6 py-3 bg-transparent border border-lightBorder dark:border-darkBorder outline-none ring-0'
                    placeholder="Password (8+ characters)"

                />


                <button type='button' className='mt-2 flex gap-2 items-center justify-center text-sm text-black dark:text-white font-medium w-full h-12 rounded-full bg-white dark:bg-zinc-900 border border-lightBorder dark:border-none' onClick={handleEmailLogin}>

                    {
                        isLoading ? <CircleLoader theme={theme} /> : "Log in"
                    }

                </button>


            </div>
 */}



        </div>
    )
}

export default Login;


