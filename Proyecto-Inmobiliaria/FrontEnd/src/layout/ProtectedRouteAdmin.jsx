import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'

const ProtectedRouteAdmin = ({ children }) => {
    const { isLogged, user } = useStore();
    const navigate = useNavigate();

    if (!isLogged && user.rol != "ROLE_ADMIN") return navigate("/");

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRouteAdmin;