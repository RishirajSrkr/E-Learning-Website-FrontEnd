import React from 'react';

function TermsOfService() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-32">
            <div className="max-w-4xl mx-auto">

                <div className='border border-lightBorder dark:border-darkBorder p-12 py-8 rounded-lg'>
                <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="">
                    Welcome to our e-learning platform. By accessing or using our services, you agree to be bound by these terms. Please read them carefully.
                </p>
                </div>
               

             <div className='border mt-6 border-lightBorder dark:border-darkBorder p-12 py-10 rounded-lg'>
             <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="mb-4">
                    By using our platform, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of the terms, please do not use the platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Use of the Platform</h2>
                <p className=" mb-4">
                    Our platform is intended solely for personal and non-commercial use. You are responsible for any activity that occurs under your account.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
                <p className="mb-4">
                    All content on the platform, including text, graphics, and logos, is the property of the platform and protected by copyright laws.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
                <p className="mb-4">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                </p>

                <p className=" mt-8">
                    If you have any questions about these terms, feel free to contact us.
                </p>
             </div>
            </div>
        </div>
    );
}

export default TermsOfService;
