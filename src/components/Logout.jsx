import axios from '../config/axiosConfig';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {toast} from 'sonner'

function Logout() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();
    const { loggedInUser } = useContext(AuthContext)

    async function handleLogout() {

        try {
            const status = await logout();
            toast.success("Logged out successfully")
            if (status == 200) {
                console.log("Logout Success");
                navigate("/");

            }

        } catch (error) {
            toast.error("Failed to logout")
            console.error("Error logging out: ", error);
            // Optionally, handle error feedback to the user here
        }
    }

    return (

        <button
            className={`w-full rounded-md text-sm px-5 dark:bg-bgTwo bg-gray-100 py-3 font-medium`}
            onClick={handleLogout}
        >
            Logout Profile
        </button>
    );
}

export default Logout;
