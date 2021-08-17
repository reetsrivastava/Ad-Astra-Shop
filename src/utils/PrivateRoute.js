import React from 'react';

import { Route,Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = ({path,...props}) => {
    
    const { isUserloggedIn } = useAuth();

    return isUserloggedIn ? (
        <Route path={path} {...props}/>
    ) : (
        <Navigate state={{from:path}} to="/login" replace/>
    )
}