import React, { useContext, useState } from 'react'
import Input from '../../components/formComponents/Input';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../../components/LoaderButton'
import {  useTheme } from '../../context/ThemeContext';

function LoginWithEmailPassword() {

 const {theme} =  useTheme();

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

            setTimeout(() => {

            }, 4000);
            
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

         




        </div>
    )
}

export default LoginWithEmailPassword