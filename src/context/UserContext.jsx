import axios from "../config/axiosConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        bio: "",
        email: "",
        name: "",
        profileImage: "",
        enrolledCourses: [],
        uploadedCourses: 0
    });
    const [isLoading, setIsLoading] = useState(false)
    const { loggedInUser } = useContext(AuthContext);


    async function fetchUser() {
        if (loggedInUser) {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`)
                setUser(response.data)
            }
            catch (error) {
                console.log("Error fetching user details: ", error);

            }
            finally{
                setIsLoading(false)
            }
        }

    }

    useEffect(() => {
        fetchUser();
    }, [loggedInUser])


    console.log(user);

    return (
        <UserContext.Provider value={{ user, isLoading, fetchUser }}>
            {children}
        </UserContext.Provider>
    )

}