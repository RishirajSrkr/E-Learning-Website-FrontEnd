import React, { useEffect, useState } from 'react'
import { users as userData } from '../data/Users'
import ContributerProfile from '../components/ContributerProfile';
import { IoMdSearch } from "react-icons/io";

function AllContributers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(userData);
    }, [])

    return (
        <div className='pt-20 flex flex-col justify-center items-center bg-bgColorOne'>

            <div className='w-full flex justify-center'>
                <div className='flex gap-2 justify-between my-16 w-1/4'>

                    <div className='gradient-outer w-full'>
                        <div className='gradient-inner'>
                            <input type="text"
                                placeholder='Search contributers'
                                className='bg-bgColorOne rounded-full focus:outline-none focus:ring-0 
                        border-none text-gray-300 w-full
                        px-6 py-3 h-12 text-lg
                        '
                            />
                        </div>
                    </div>


                    <div className='gradient-outer'>
                        <div className='inner'>
                            <button className='bg-bgColorOne min-w-12 h-12 flex justify-center rounded-full items-center
                            text-gray-400 text-2xl'><IoMdSearch /></button>
                        </div>
                    </div>


                </div>
            </div>

            {
                users.map(user => {
                    const { id, email, name, major, gpa } = user;

                    return <ContributerProfile

                        key={id}
                        name={name}
                        email={email}
                        major={major}
                        gpa={gpa}

                    />
                })
            }
        </div>
    )
}

export default AllContributers