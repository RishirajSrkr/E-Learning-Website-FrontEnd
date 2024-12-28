import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { AuthContext } from '../context/AuthContext'
import { jwtDecode } from 'jwt-decode';

function GoogleCallback() {

    const { setLoggedInUser } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        // Step 1: Get the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);


        const code = urlParams.get('code');

        console.log(code);


        if (code) {
            // Step 2: Send the code to the backend
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/auth/google/callback?code=${code}`)
                .then((response) => {
                    console.log(response);

                    const token = response.data; // JWT returned from the backend

                    // Step 3: Store the token in localStorage
                    localStorage.setItem("jwtToken", token);

                    const decoded_jwt = jwtDecode(token);
                    const name = decoded_jwt.name;
                    setLoggedInUser(name);

                    // Step 4: Redirect the user to the home page
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error during Google login:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    return <div>Processing Google Login...</div>;
}

export default GoogleCallback;
