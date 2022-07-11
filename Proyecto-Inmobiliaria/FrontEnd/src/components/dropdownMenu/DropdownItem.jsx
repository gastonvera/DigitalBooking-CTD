import React from 'react';
import {Link} from 'react-router-dom';
import "./DropdownMenu.css";

const DropdownItem = ({ children, leftIcon, closeSession, path, handleOpen }) => {
    const handleClick = () =>{
        handleOpen();
        closeSession();
    }
    return(
        <Link to={`${path || "/"}`} onClick={handleClick} className= "gv-dropdown-item">
            {children}
            <span className='gv-icon-dropdown-menu'>{leftIcon}</span>
        </Link>
    )
}

export default DropdownItem;