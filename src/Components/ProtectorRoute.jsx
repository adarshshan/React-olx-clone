import React from 'react'
import { UserAuth } from '../store/FirebaseContext'
import { Navigate } from 'react-router-dom';

function ProtectorRoute({children}) {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to='/' />
    }
    return children;
}

export default ProtectorRoute;
