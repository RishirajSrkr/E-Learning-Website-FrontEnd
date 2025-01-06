import React, { useContext, useState } from 'react'
import Input from '../../components/formComponents/Input';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function LoginWithEmailPassword() {

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



    return (
        <div className='min-h-screen w-full flex items-center justify-center'>

            <div className='w-[350px] mx-auto flex flex-col gap-5'>

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


                <button type='button' className='flex gap-2 items-center justify-center text-sm text-black dark:text-white font-medium w-full px-5  py-3 rounded-full bg-white dark:bg-zinc-900 border border-lightBorder dark:border-none' onClick={handleEmailLogin}>
                    {/* <MdEmail size={17} /> */}
                    Login
                </button>


            </div>




        </div>
    )
}

export default LoginWithEmailPassword