import React, { useRef, useState, useEffect, useContext } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { WindowWidthContext } from '../context/WindowWidthContext';

function Reviews() {

    const { isMobile } = useContext(WindowWidthContext);

    const [reviews, setReviews] = useState([]);


    const dummyReviewsData = [
        {
            name: "Arjun Sharma",
            review: "An excellent course that exceeded my expectations! The instructor’s explanations were very clear, breaking down complex concepts with real-world examples that made everything so much easier to understand.",
            profileImage: "https://via.placeholder.com/150" // Demo profile image
        },
        {
            name: "Priya Verma",
            review: "This course was incredibly thorough, covering everything I needed to get started with confidence. The instructor presented the material in a logical and easily digestible manner, making challenging topics accessible.",
            profileImage: "https://via.placeholder.com/150" // Demo profile image
        },
        {
            name: "Rohan Mehta",
            review: "The resources provided are top-notch, and I feel far more comfortable tackling real-world applications after completing this course. Overall, it’s a comprehensive learning experience.",
            profileImage: "https://via.placeholder.com/150" // Demo profile image
        },
        {
            name: "Ananya Iyer",
            review: "A fantastic course that delves deeply into the material, providing valuable insights into industry practices and efficient coding techniques.",
            profileImage: "https://via.placeholder.com/150" // Demo profile image
        }
    ];

    const dummyProfileImages = [
        "https://img.freepik.com/premium-psd/indian-ethnicity-cheerful-confident-studio-concept_53876-22458.jpg?ga=GA1.1.1323944647.1725527689&semt=ais_hybrid",

        "https://img.freepik.com/premium-photo/beautiful-indian-traditional-girl-posing-white-wall_136354-5499.jpg?ga=GA1.1.1323944647.1725527689&semt=ais_hybrid",

        "https://img.freepik.com/premium-photo/portrait-young-handsome-indian-hipster-man-outdoors_251136-71679.jpg?ga=GA1.1.1323944647.1725527689&semt=ais_hybrid",

        "https://img.freepik.com/premium-photo/portrait-young-beautiful-cute-cheerful-girl-smiling-gray-wall_136354-3057.jpg?ga=GA1.1.1323944647.1725527689&semt=ais_hybrid"
    ]

    useEffect(() => {
        setReviews(dummyReviewsData);
    }, [])


    return (
        <div className="relative flex h-full">
            <div className="container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden">
                <Splide
                    options={{
                        type: "loop", // Loop back to the beginning when reaching the end

                        arrows: false, // Hide navigation arrows
                        pagination: false, // Hide pagination dots
                        fixedWidth: '500px', // Fixed width for each slide
                        gap: '20px', // Gap between slides
                    }}

                >
                    {
                        dummyReviewsData.map((review, index) => {
                            return <SplideSlide key={index}>
                                <ReviewComponent review={review} profileImage={dummyProfileImages[index]} />
                            </SplideSlide>
                        })
                    }
                </Splide>
            </div>
        </div>
    );


}


function ReviewComponent({ review, profileImage }) {
    return (
            <div className="bg-white dark:bg-bgOne pattern border h-48 border-lightBorder dark:border-darkBorder rounded-lg px-8 py-6"
            >
                <div>
                    <div className="flex gap-4 items-center mb-3">
                        <img className="w-8 h-8 rounded-full object-cover" src={profileImage} />
                        

                        <h3 className="dark:text-white font-medium">{review.name}</h3>
                    </div>
                    <p className="dark:text-gray-500">{review.review}</p>
                </div>
            </div>


    );

}
export { Reviews, ReviewComponent };






