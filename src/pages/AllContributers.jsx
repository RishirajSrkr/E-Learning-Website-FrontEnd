import React, { useEffect, useState } from 'react'
import ContributorProfile from '../components/ContributorProfile';
import axios from '../config/axiosConfig'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";


function AllContributers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState({})




    useEffect(() => {
        async function fetchALlContributors() {
            try {
                setIsLoading(true)

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/contributors`)

                const data = response.data;
                console.log(data);

                setUsers(data);
            }
            catch (e) {
                console.error("Error fetching contributers", e)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchALlContributors();

    }, [])



    useEffect(() => {

        const filteredUsers = Object.keys(users ? users : {}).filter(key =>
            users[key].name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(key => users[key]);

        setFilteredUsers(filteredUsers)

    }, [searchQuery])


    function handleSeeCoursesClick(userId) {

        navigate(`/user/${userId}/uploaded-courses`)
    }



    return (
        <div className='pt-28 pb-10 flex flex-col items-center bg-white dark:bg-black text-black dark:text-white h-screen w-full'>

            <div className='relative w-1/3'>

                <input
                    type="text"
                    placeholder="Search Contributor"
                    className={`pl-12 w-full bg-gray-100  dark:bg-bgTwo pr-6 dark:text-white border-none outline-none focus:ring-0 rounded-full py-3 placeholder-gray `}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className='text-gray-500 absolute  top-1/2 -translate-y-1/2 left-5'>
                    <IoPersonSharp />
                </div>
            </div>


            {
                isLoading ?

                    (

                        <Loader classname={"h-[500px]"} />
                    )

                    :

                    (

                        <div className='mt-20 overflow-y-scroll flex flex-col w-1/2 gap-2' style={{ scrollbarWidth: "none" }}>

                            {
                                searchQuery ?

                                    (
                                        Object.keys(filteredUsers).length > 0 ?

                                            (
                                                (
                                                    Object.keys(filteredUsers).map((key) => {

                                                        return <ContributorProfile

                                                            key={key}
                                                            name={filteredUsers[key].name}
                                                            email={filteredUsers[key].email}
                                                            bio={filteredUsers[key].bio}
                                                            uploadedCourses={filteredUsers[key].uploadedCourses}
                                                            onClick={() => handleSeeCoursesClick(key)}

                                                        />
                                                    })
                                                )
                                            )

                                            :

                                            (
                                                <p className='text-center mt-40 text-gray-500'>No contributors found with the name : {searchQuery}</p>
                                            )
                                    )

                                    :

                                    (
                                        Object.keys(users).map((key) => {

                                            return <ContributorProfile

                                                key={key}
                                                name={users[key].name}
                                                email={users[key].email}
                                                bio={users[key].bio}
                                                uploadedCourses={users[key].uploadedCourses}
                                                onClick={() => handleSeeCoursesClick(key)}
                                                profileImage={users[key].profileImage}

                                            />
                                        })
                                    )

                            }
                        </div>
                    )

            }





        </div>
    )
}

export default AllContributers