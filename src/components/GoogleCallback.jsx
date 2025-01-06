import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode

function GoogleCallback() {
    const { setLoggedInUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (!code) {
                console.error("Authorization code not found");
                navigate("/login");
                return;
            }

            setIsLoading(true);

            try {
                // Step 2: Send the authorization code to the backend
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/auth/google/callback?code=${code}`
                );

                const token = response.data; // JWT returned from the backend

                // Step 3: Store the token in localStorage
                localStorage.setItem("jwtToken", token);

                // Decode the token and get user details
                const decoded_jwt = jwtDecode(token);
                const name = decoded_jwt.name;

                setLoggedInUser(name);

                // Step 4: Redirect the user to the home page
                navigate('/');
            } catch (error) {
                console.error("Error during Google login callback:", error);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        handleGoogleCallback();
    }, [navigate, setLoggedInUser]);

    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            {isLoading ? <p>Processing Google Login...</p> : <p>Redirecting...</p>}
        </div>
    );
}

export default GoogleCallback;
