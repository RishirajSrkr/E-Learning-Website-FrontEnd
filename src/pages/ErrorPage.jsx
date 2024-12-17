import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray px-4">
            {/* Error Code */}
            <h1 className="text-8xl font-bold">404</h1>

            {/* Error Message */}
            <p className="mt-4">Oops! The page you're looking for doesn't exist.</p>

            {/* Navigation Button */}
            <button
                onClick={handleGoHome}
                className="mt-6 bg-offwhite text-sm text-bgOne px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
            >
                Go to Homepage
            </button>

        </div>
    );
}

export default ErrorPage;
