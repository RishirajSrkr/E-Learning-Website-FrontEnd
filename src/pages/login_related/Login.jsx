import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const googleClientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`;
    const { theme } = useTheme();

    const handleGoogleLogin = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row  dark:from-bgOne dark:to-bgTwo">
            {/* Left Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-gray-50 dark:bg-bgOneLight items-center">
                <div className="max-w-lg">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r dark:from-blue-100 dark:to-blue-600 from-blue-300 to-blue-600 bg-clip-text text-transparent">Access the</span>
                        <br />
                        <span className="bg-gradient-to-l dark:from-blue-200 dark:to-blue-700 from-blue-400 to-blue-700 bg-clip-text text-transparent">Best Learning</span>
                        <br />
                        <span className="bg-gradient-to-r dark:from-blue-100 dark:to-blue-700 from-blue-200 to-blue-700 bg-clip-text text-transparent">Resources.</span>

                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                        Join thousands of students worldwide who are already transforming their careers through our platform.
                    </p>
                    <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200">
                        <FaRegArrowAltCircleRight className="text-blue-500" />
                        <span>Start your learning journey today</span>
                    </div>
                </div>
            </div>

            {/* Right Section - Simplified for Google-only login */}
            <div className="w-full md:w-1/2 flex  justify-center items-center">
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome!</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                            Sign in securely with your Google account
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            We use Google Sign-In to ensure the highest level of account security
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-3/4 mx-auto flex items-center justify-center gap-3 py-2.5 px-6  rounded-full bg-white dark:bg-bgTwo border border-lightBorder dark:border-darkBorder"
                        >
                            <FcGoogle size={24} />
                            <span className="text-gray-700 dark:text-gray-200 font-medium ">
                                Continue with Google
                            </span>
                        </button>

                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                            By continuing, you agree to our{' '}
                            <a href="/tos" className="text-blue-500 hover:text-blue-600">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy-policy" className="text-blue-500 hover:text-blue-600">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;