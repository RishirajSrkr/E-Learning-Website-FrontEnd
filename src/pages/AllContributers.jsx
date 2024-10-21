import React, { useEffect, useState } from 'react'
import ContributerProfile from '../components/ContributerProfile';
import axios from 'axios'
import Search from '../components/Search';
import GoBack from '../components/GoBack';
import { ThreeDot } from 'react-loading-indicators'


function AllContributers() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [searchQuery, setSearchQuery] = useState("");

    function setQuery(query) {
        setSearchQuery(query)
    }

    console.log(searchQuery);


    useEffect(() => {
        async function fetchALlContributors() {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/contributors`)

                const data = await response.data;
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


    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
        ||
        user.email.split('@')[0].toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className='pt-32 flex flex-col items-center bg-bgColorOne h-screen w-full'>

            <GoBack text={"Go Back"} goWhere={"/"} />

            <Search
                classname={"fixed top-8"}
                onSearch={setQuery}
            />


            {
                isLoading ?

                    (

                        <div className='mt-40 text-center'>
                            <ThreeDot color="#E85533" size="small" />
                        </div>
                    )

                    :

                    (

                        <div className='mt-20 overflow-y-scroll flex flex-col w-1/2 gap-2' style={{ scrollbarWidth: "none" }}>

                            {
                                searchQuery ?

                                    (
                                        filteredUsers.length > 0 ?

                                            (
                                                (
                                                    filteredUsers.map((user, index) => {
                                                        const { email, name, bio, uploadedCourse } = user;

                                                        return <ContributerProfile

                                                            key={index}
                                                            name={name}
                                                            email={email}
                                                            bio={bio}
                                                            uploadedCourse={uploadedCourse}

                                                        />
                                                    })
                                                )
                                            )

                                            :

                                            (
                                                <p className='text-center mt-10 text-subtextColor'>No contributors found!</p>
                                            )
                                    )

                                    :

                                    (
                                        users.map((user, index) => {
                                            const { email, name, bio, uploadedCourse } = user;

                                            return <ContributerProfile

                                                key={index}
                                                name={name}
                                                email={email}
                                                bio={bio}
                                                uploadedCourse={uploadedCourse}

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