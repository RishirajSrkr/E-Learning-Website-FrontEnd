import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const {loggedInUser} = useContext(AuthContext);

    if(loggedInUser){
        return children;
    }
    else{
        return <Navigate to={"/login"} />
    }
}

export default ProtectedRoute