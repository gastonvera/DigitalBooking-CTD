import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useStore();
    const navigate = useNavigate();

    //if (!isLogged) return navigate("/");

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute;