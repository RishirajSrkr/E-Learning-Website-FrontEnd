import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { AuthContext } from '../context/AuthContext'
import { jwtDecode } from 'jwt-decode';

function GoogleCallback() {

    const { setLoggedInUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(async () => {
        // Step 1: Get the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);


        const code = urlParams.get('code');

        console.log(code);


        if (code) {
            setIsLoading(true);

            try {
                // Step 2: Send the code to the backend
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/google/callback?code=${code}`);
                console.log(response);

                const token = response.data; // JWT returned from the backend

                // Step 3: Store the token in localStorage
                localStorage.setItem("jwtToken", token);

                const decoded_jwt = jwtDecode(token);
                const name = decoded_jwt.name;
                setLoggedInUser(name);

                // Step 4: Redirect the user to the home page
                navigate('/');

            }
            catch (e) {
                console.log(e);
                navigate("/login")

            }
            finally {
                setIsLoading(false)
            }
        }
    }, [navigate]);

    return <div>Processing Google Login...</div>;
}

export default GoogleCallback;
