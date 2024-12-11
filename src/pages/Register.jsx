import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Input from '../components/formComponents/Input'
import { toast } from 'sonner';
import PrimaryButton from '../components/formComponents/PrimaryButton';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        bio: "",
        profileImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null)

    const profileImageRef = useRef();


    const handleInputChange = (e) => {


        if (e.target.name === 'profileImage') {

            const file = e.target.files[0];

            setFormData(prev => ({ ...prev, profileImage: file }))

            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)

            console.log("yes its image");

        }
        else {

            setFormData(prev => ({
                ...prev, [e.target.name]: e.target.value
            }));
        }

    };

    console.log(formData);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithImage = new FormData();


        const registerUserDto = {
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            password: formData.password,
        }

        formDataWithImage.append("registerUserDto", JSON.stringify(registerUserDto));


        if (formData.profileImage) {
            formDataWithImage.append("file", formData.profileImage)
        }


        console.log(formDataWithImage);





        try {
            setIsLoading(true)

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/public/register`, formDataWithImage);

            const data = response.data;

            console.log(data);


            toast.success("Registered successfully!")

            // Successfully registered, navigate to home

            navigate("/");

        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data;
                if (errorMessage === "Email already exists") {

                    toast.warn("Email already exists")

                }
                else {
                    toast.warn("Fields cannot be empty")
                }
            }
        }
        finally {
            setIsLoading(false)
        }
    };



    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])




    return (

        <div className='py-0 bg-bgOne w-full flex flex-col  justify-center items-center'>
            {/* ------------ form -------------- */}


            <form className='flex flex-col items-center min-h-screen justify-center w-1/5 mt-8 '>


                <div className='flex mx-auto flex-col gap-4 w-full'>
                    <Input
                        name={"name"}
                        type={"text"}
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"enter your name"}
                    />


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
                        placeholder={"set a strong password"}
                    />

                    <Input
                        name={"bio"}
                        type={"text"}
                        value={formData.bio}
                        onChange={(e) => handleInputChange(e)}
                        totalWidth={"w-full"}
                        className={""}
                        placeholder={"write a short bio about yourself"}
                    />


                </div>


                {/* ------------------ image preview ----------------- */}

                <div className='flex w-full gap-3 items-center my-6'>

                    <div className=' min-h-12 min-w-12  border border-border border-dashed'>
                        {imagePreview && (

                            <img src={imagePreview} alt="Profile image preview" className='w-12 h-12 object-cover rounded' />

                        )}
                    </div>



                    <input
                        type="file"
                        className='hidden'
                        accept='image/*'
                        ref={profileImageRef}
                        name='profileImage'
                        onChange={handleInputChange}
                    />

                    <div
                        onClick={() => profileImageRef.current.click()}
                        className='border w-full border-dashed border-border h-12 flex justify-center text-white items-center cursor-pointer text-sm '>
                        Image Upload
                    </div>
                </div>



                <PrimaryButton
                    isLoading={isLoading}
                    text={"Register"}
                    classname={'rounded-md h-10 w-full py-2 font-semibold'}
                    onClick={handleSubmit}
                ></PrimaryButton>




                <div className='text-left  mt-4 sm:mt-6'>
                    <p className='text-gray text-sm'>Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>



            </form>


        </div>


    );
}

export default Register;
