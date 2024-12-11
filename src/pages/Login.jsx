import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'
import Input from '../components/formComponents/Input'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PrimaryButton from '../components/formComponents/PrimaryButton'

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


    const handleSubmit = async (e) => {
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


    return (
             <div className='py-1 bg-bgOne w-full flex flex-col  justify-center items-center'>




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


                        <PrimaryButton
                            isLoading={isLoading}
                            text={"Login"}
                            classname={'rounded-md h-10 w-full py-2 font-semibold'}
                            onClick={handleSubmit}
                        ></PrimaryButton>



                        <div>
                            <p className='text-gray text-sm'>Don't have an account? <Link to={"/register"}>Register</Link></p>
                        </div>



                    </form>


            </div>
    )
}

export default Login;
