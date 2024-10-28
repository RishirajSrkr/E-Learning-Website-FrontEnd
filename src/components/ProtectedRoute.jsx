import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import {ThreeDot} from 'react-loading-indicators'

function ProtectedRoute({ children }) {

    const { loggedInUser, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div className='text-center'>
            <ThreeDot color="#9CF57F" size="small" />
        </div>
    }

    else if (loggedInUser) {
        return children;
    }

    else {
        return <Navigate to={"/login"} />
    }
}

export default ProtectedRoute