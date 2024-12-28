import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/formComponents/Input'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PrimaryButton from '../components/formComponents/PrimaryButton'
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleInputChange = (e) => {

        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));

    };


    const handleEmailLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)

            const status = await login(formData);

            if (status == 200) {

                navigate("/")


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



    const googleClientId = "566391648176-repblbg2o63uink35639mmfhldam5145.apps.googleusercontent.com";

    const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`;


    const handleGoogleLogin = () => {


        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

        window.location.href = googleAuthUrl;
    };



    return (
        <div className='py-1 dark:bg-black bg-white text-black dark:text-white w-full flex flex-col  justify-center items-center'>




            {/* ------------ form -------------- */}


            <form className='flex flex-col items-center min-h-screen justify-center w-1/5 gap-6 '>


                <div className='flex mx-auto flex-col gap-4 w-full'>
                    <Input
                        name={"email"}
                        type={"email"}
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"enter your email"}
                    />



                    <Input
                        name={"password"}
                        type={"password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"enter your password"}
                    />


                </div>


                <div className='w-full flex gap-4 items-center flex-col'>

                    <button type='button' className='flex gap-2 items-center justify-center text-sm text-black dark:text-white font-medium w-full  py-2.5 rounded-md bg-white dark:bg-bgThree border border-lightBorder dark:border-none' onClick={handleEmailLogin}>
                        <MdEmail size={17} />
                        Login with Email
                    </button>


                    <button type='button' className='flex gap-2 items-center justify-center text-sm text-white dark:text-black font-medium w-full py-2.5 rounded-md bg-black dark:bg-gray-100 border border-lightBorder dark:border-none' onClick={handleGoogleLogin}>
                        <FcGoogle size={19} />
                        Login with Google
                    </button>
                </div>




                <div>
                    <p className='text-gray-500 text-sm'>Don't have an account? <Link to={"/register"}>Register</Link></p>
                </div>





            </form>


        </div>
    )
}

export default Login;


