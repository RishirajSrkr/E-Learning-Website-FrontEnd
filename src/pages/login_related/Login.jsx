import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";
import { MdFitbit } from "react-icons/md";
const Login = () => {
    const googleClientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`;

    const [isLogin, setIsLogin] = useState("");

    const handleGoogleLogin = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
            {/* Left Section - Hero */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-16 bg-gradient-to-br from-orange-50 to-white dark:from-bgTwo dark:to-bgOne">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03]" />
                <div className="relative max-w-2xl">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-accentColor dark:text-accentColor">
                            <span className="block  py-2 -mb-3">
                                Share Knowledge,
                            </span>
                            <span className="block mt-2 py-2">
                                Empower Learning.
                            </span>
                        </h1>
                    </div>

                    <p className=" text-lg md:text-xl font-medium mb-8">
                        Discover, share, and learn with curated resources from a <br /> community of passionate learners.
                    </p>

                    <div className="flex flex-col gap-2 font-medium">
                        <div className="flex items-center gap-2">
                            <IoMdCheckmark className='text-accentColor' />
                            <span>Find top-rated learning resources</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdCheckmark className='text-accentColor' />
                            <span>Curate your own learning journey</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdCheckmark className='text-accentColor' />
                            <span>Join a supportive learning community</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Login */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-bgOne">
                <div className="w-full max-w-md">
                    <div className="text-center mb-12 w-full">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 justify-center flex items-center gap-2 w-full">
                            < MdFitbit />
                            BitByBit
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Join our platform to discover, share, and organize learning resources effortlessly.
                            Continue building your knowledge or get started today!
                        </p>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-bgOne border border-lightBorder dark:border-darkBorder rounded-full "
                    >
                        <FcGoogle className="w-6 h-6" />
                        <span className="text-slate-700 dark:text-slate-200 font-medium">
                            {isLogin ? "Continue with Google" : "Sign up with Google"}
                        </span>
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            By {isLogin ? "logging in" : "signing up"}, you agree to our{' '}
                            <a href="/tos" className="text-accentColor hover:underline">
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a href="/privacy-policy" className="text-accentColor hover:underline">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;
