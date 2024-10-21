import React from 'react';

function About() {
    return (
        <div className='w-full text-subtextColor h-screen bg-bgColorOne'>
            <div className='pt-32 w-1/2 p-8 px-24'>
                <h1 className='text-6xl font-bold w-fit text-accentColorOne -mb-2 uppercase'>
                    About Us.
                </h1>

                <div className='gradient-line-left mt-4 mb-6'></div>

                <p className='mb-4'>
                    Welcome to our e-learning platform, where we strive to provide the best resources for learners of all levels. Our mission is to make quality education accessible to everyone, regardless of their background or experience.
                </p>
                <p className='mb-4'>
                    Our platform offers a wide range of courses in software development, covering essential topics and advanced techniques. We believe in empowering individuals through knowledge, enabling them to excel in their careers and personal growth.
                </p>
                <p className='mb-4'>
                    We value community input, which is why we encourage our users to vote for the best resources. Your feedback helps us curate the most relevant and effective materials for learning. Together, we can create a vibrant community of learners and educators.
                </p>
                <p className='mb-4'>
                    Thank you for being a part of our journey. We are excited to help you unlock your potential and achieve your goals through learning.
                </p>
            </div>
        </div>
    );
}

export default About;
