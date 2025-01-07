import React from "react";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Arjun S.",
        img: "https://img.freepik.com/free-photo/portrait-young-handsome-man-smiling_144627-29283.jpg", // Replace with actual image
        rating: 5,
        review:
            "Learning to code seemed daunting at first, but the step-by-step lessons made it so approachable. Built my first website in just 3 weeks!",
    },
    {
        name: "Priya V.",
        img: "https://img.freepik.com/free-photo/beautiful-indian-woman-traditional-clothes-posing-studio_23-2148907318.jpg", // Replace with actual image
        rating: 5,
        review:
            "Perfect for beginners. The JavaScript course was exactly what I needed.",
    },
    {
        name: "Mike T.",
        img: "https://img.freepik.com/free-photo/happy-young-man-suit_144627-31898.jpg", // Replace with actual image
        rating: 5,
        review:
            "The community support is incredible. Whenever I hit a roadblock, someone was there to help. Completed the full stack course and built three projects. Now I'm confident in my coding skills!",
    },
    {
        name: "Sarah K.",
        img: "https://img.freepik.com/free-photo/cheerful-african-american-woman-with-afro-hairstyle-smiling_197531-22523.jpg", // Replace with actual image
        rating: 5,
        review:
            "As a designer, I loved how the courses connected design principles with coding. Now I can build what I design!",
    },
    {
        name: "Alex R.",
        img: "https://img.freepik.com/free-photo/casual-caucasian-man-smiling-standing-isolated-white_53876-128797.jpg", // Replace with actual image
        rating: 5,
        review:
            "The Python course was fantastic. Clear explanations and practical projects helped me learn quickly. Highly recommend for beginners!",
    },
    {
        name: "Nina L.",
        img: "https://img.freepik.com/free-photo/beautiful-blonde-young-woman-smiling_144627-30961.jpg", // Replace with actual image
        rating: 5,
        review:
            "From complete beginner to building React apps in months. The project-based learning approach really works!",
    },
];


const Reviews = () => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid-column mb-4  bg-white dark:bg-bgOneLight rounded-lg p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={review.img}
                                alt={review.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-medium dark:text-white">{review.name}</h3>
                                <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-3 h-3 text-zinc-200 fill-zinc-200"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            "{review.review}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
