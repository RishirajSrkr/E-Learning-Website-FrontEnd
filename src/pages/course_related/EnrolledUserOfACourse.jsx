import React, { useEffect, useState } from 'react'
import axios from '../../config/axiosConfig'
import { useParams } from 'react-router-dom'
import UserCard_Box from '../../components/User Specific/UserCard_Box';
import { ThreeDot } from 'react-loading-indicators';
function EnrolledUserOfACourse() {

    const userData = [
        {
            name: "John Doe",
            email: "johndoe@example.com",
            bio: "A passionate backend developer specializing in Java and Spring Boot.",
            profileImageUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=John"
        },
        {
            name: "Jane Smith",
            email: "janesmith@example.com",
            bio: "Frontend enthusiast and React expert who loves crafting elegant UIs.",
            profileImageUrl: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Jane"
        },
        {
            name: "Michael Brown",
            email: "michaelb@example.com",
            bio: "Data scientist exploring the world of machine learning and AI.",
            profileImageUrl: "https://via.placeholder.com/150/28A745/FFFFFF?text=Michael"
        },
        {
            name: "Emily Davis",
            email: "emilyd@example.com",
            bio: "Digital marketer with a knack for SEO and analytics.",
            profileImageUrl: "https://via.placeholder.com/150/FFC107/FFFFFF?text=Emily"
        },
        {
            name: "David Wilson",
            email: "davidw@example.com",
            bio: "Full-stack developer with a love for MERN and cloud technologies.",
            profileImageUrl: "https://via.placeholder.com/150/DC3545/FFFFFF?text=David"
        },
        {
            name: "Sophia Garcia",
            email: "sophiag@example.com",
            bio: "UI/UX designer creating intuitive and beautiful digital experiences.",
            profileImageUrl: "https://via.placeholder.com/150/6F42C1/FFFFFF?text=Sophia"
        },
        {
            name: "James Johnson",
            email: "jamesj@example.com",
            bio: "DevOps engineer focusing on CI/CD and infrastructure automation.",
            profileImageUrl: "https://via.placeholder.com/150/20C997/FFFFFF?text=James"
        },
        {
            name: "Olivia Martinez",
            email: "oliviam@example.com",
            bio: "Mobile app developer proficient in Flutter and Kotlin.",
            profileImageUrl: "https://via.placeholder.com/150/17A2B8/FFFFFF?text=Olivia"
        },
        {
            name: "Ethan Miller",
            email: "ethanm@example.com",
            bio: "Cybersecurity analyst ensuring robust security systems.",
            profileImageUrl: "https://via.placeholder.com/150/E83E8C/FFFFFF?text=Ethan"
        },
        {
            name: "Isabella Anderson",
            email: "isabellaa@example.com",
            bio: "Cloud engineer working with AWS, Azure, and Kubernetes.",
            profileImageUrl: "https://via.placeholder.com/150/6610F2/FFFFFF?text=Isabella"
        },
        {
            name: "Liam Thomas",
            email: "liamt@example.com",
            bio: "Game developer creating immersive gaming experiences.",
            profileImageUrl: "https://via.placeholder.com/150/FD7E14/FFFFFF?text=Liam"
        },
        {
            name: "Ava Scott",
            email: "avas@example.com",
            bio: "Technical writer making complex topics simple and accessible.",
            profileImageUrl: "https://via.placeholder.com/150/ADB5BD/000000?text=Ava"
        }
    ];


    const { courseId } = useParams();

    const [enrolledUsers, setEnrolledUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        

            (async () => {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enrollments/course/${courseId}`);

                const data = response.data;

                // setEnrolledUsers(data)
                setEnrolledUsers(userData)

                console.log("Enrolled users of course :: " + courseId + " :: ", data);


                setIsLoading(false)

            })();

    }, [])
    return (


        <div className='min-h-screen py-32 bg-bgOne px-56 flex justify-center items-center w-full'>


            {
                isLoading &&

                <div className='text-center mb-4 w-full' >
                    <ThreeDot color="#9CF57F" size="small" />
                </div>

            }


           {
            !isLoading &&  <div className='flex flex-wrap justify-center items-center gap-1 relative'>
            {
                enrolledUsers?.map(user => {
                    const { name, email, profileImageUrl } = user;
                    return <UserCard_Box
                        name={name}
                        email={email}
                        profileImage={profileImageUrl}
                    />

                })
            }

            <div className='h-full absolute w-full  bottom-0 bg-gradient-to-b from-transparent to-bgOne flex  justify-center items-center'>

                <button className='bg-gradientForBg px-6 py-3 text-bgOne font-semibold text-lg rounded-md'>
                    Subscribe to Unlock!
                </button>

            </div>
        </div>

           }

        </div>
    )
}

export default EnrolledUserOfACourse