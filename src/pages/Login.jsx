import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { errorMessages } from '../data/errorMessages'
import axios from 'axios';

function Login() {

    const [userCredential, setUserCredential] = useState({
        username: "",
        password: "",
    });


    const handleInputChange = (e) => {
        // const {name, value} = e.target;
        setUserCredential(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const x = import.meta.env.VITE_BASE_URL;

        console.log(x);
        console.log("Inside handle submit");
        
        
        try {
            const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,
                 userCredential ,
                { withCredentials: true }

            );

            const data = await response.data;
            console.log("Login successful : ", data);

        }
        catch(e){
            console.error("login failed : ", e)
        }

    }


    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Developed by @Rishiraj
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            I built this app to practice Spring Boot, Spring Security & React Js.
                        </p>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={userCredential.username}
                                    onChange={(e) => handleInputChange(e)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>


                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={userCredential.password}
                                    onChange={(e) => handleInputChange(e)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>


                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type="submit"
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Log in
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account ?
                                    <Link to={"/register"} className="text-gray-700 underline">Register</Link>.
                                </p>
                            </div>
                        </form>

                    </div>
                </main>
            </div>
        </section>

    )
}

export default Login