import React from "react";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Arjun S.",
        img: "https://img.freepik.com/free-photo/portrait-young-handsome-man-smiling_144627-29283.jpg",
        rating: 5,
        review:
            "Finding the right React tutorials used to be overwhelming. Thanks to this platform, I discovered the best-voted resources and finished my React journey without wasting time. A must-have for any beginner!",
    },
    {
        name: "Priya V.",
        img: "https://img.freepik.com/free-photo/beautiful-indian-woman-traditional-clothes-posing-studio_23-2148907318.jpg",
        rating: 5,
        review:
            "As someone who creates educational content, I love how easy it is to share my YouTube videos here and create structured courses. It’s a great way to help others learn effectively!",
    },
    {
        name: "Mike T.",
        img: "https://img.freepik.com/free-photo/happy-young-man-suit_144627-31898.jpg",
        rating: 5,
        review:
            "This platform solved my biggest problem: finding trusted learning resources. I even created my own curated Python course using YouTube videos and articles. Such a helpful tool for learners and creators alike!",
    },
    {
        name: "Sarah K.",
        img: "https://img.freepik.com/free-photo/cheerful-african-american-woman-with-afro-hairstyle-smiling_197531-22523.jpg",
        rating: 5,
        review:
            "As a designer learning to code, I often felt lost among hundreds of videos. This platform helped me focus on the best-voted resources and even create a small design-to-code course for others. Love it!",
    },
    {
        name: "Alex R.",
        img: "https://img.freepik.com/free-photo/casual-caucasian-man-smiling-standing-isolated-white_53876-128797.jpg",
        rating: 5,
        review:
            "The voting system is brilliant! I quickly found the most effective JavaScript tutorials and even shared my favorite resources with others. The community aspect makes it even better.",
    },
    {
        name: "Nina L.",
        img: "https://img.freepik.com/free-photo/beautiful-blonde-young-woman-smiling_144627-30961.jpg",
        rating: 5,
        review:
            "From feeling confused about where to start, to creating my own curated React course—it’s been an amazing experience! This platform not only saves time but also helps learners and creators connect.",
    },
];



const Reviews = () => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid-column mb-4 bg-gradient-to-br dark:from-bgThree dark:to-bgOneLight from-lightBorder to-white p-[1px] rounded-lg"
                    >
                        <div className="bg-white dark:bg-bgOneLight rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={review.img}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-medium dark:text-white">{review.name}</h3>
                                    {/* <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-3 h-3 text-zinc-200 fill-zinc-200"
                                        />
                                    ))}
                                </div> */}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {review.review}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
