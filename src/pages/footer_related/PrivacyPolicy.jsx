import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-bgOne  dark:text-white  px-6 py-32">
            <div className="max-w-4xl mx-auto">

                <div className='border border-lightBorder dark:border-darkBorder p-12 py-8 rounded-lg'>
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </p>
                </div>


                <div className='border mt-6 border-lightBorder dark:border-darkBorder p-12 py-10 rounded-lg'>
                    <h2 className="text-2xl font-semibold  mb-4">Information We Collect</h2>
                    <p className=" mb-4">
                        We may collect personal information such as your name, email address, and any data you provide while using our platform.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
                    <p className=" mb-4">
                        Your information is used to improve your experience on the platform, provide customer support, and send updates about our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Data Protection</h2>
                    <p className=" mb-4">
                        We implement industry-standard measures to ensure the security of your data. However, no online platform can guarantee complete security.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Sharing</h2>
                    <p className=" mb-4">
                        We do not sell or share your information with third parties unless required by law or with your consent.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
                    <p className=" mb-4">
                        We may update this privacy policy as necessary. Please review it periodically to stay informed.
                    </p>

                    <p className=" mt-8">
                        If you have any questions or concerns, feel free to contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
