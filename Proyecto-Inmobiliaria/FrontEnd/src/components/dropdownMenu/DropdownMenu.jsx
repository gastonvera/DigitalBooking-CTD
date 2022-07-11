import React, { useRef, useEffect } from 'react';
import DropdownItem from './DropdownItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCircleXmark, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import "./DropdownMenu.css";
import useUser from '../../hooks/useUser';
import { useStore } from '../../store/StoreProvider';

const DropdownMenu = ({ handleOpen }) => {
    const refOne = useRef(null)
    const {logout} = useUser();
    const { user } = useStore();
    const hiddenOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            handleOpen();
        }
    }

    useEffect(() => {
        document.addEventListener("click", hiddenOnClickOutside, true)
    }, []);

    return (
        <div className='gv-dropdownMenu-container' ref={refOne}>
            {/* <DropdownItem path={"/"} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faCircleUser} />} >
                <p>Mi cuenta</p>
            </DropdownItem> */}
            {user.rol === "ROLE_USER" &&
            <DropdownItem path={"/myfavourites"} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />} >
                <p>Mis favoritos</p>
            </DropdownItem>}
            {user.rol === "ROLE_USER" &&
            <DropdownItem path={"/myreservations"} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />} >
                <p>Mis reservas</p>
            </DropdownItem>}
            {user.rol === "ROLE_ADMIN" &&
            <DropdownItem path={"/admin/createproduct"} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />} >
                <p>Crear Propiedad</p>
            </DropdownItem>}
            {user.rol === "ROLE_ADMIN" &&
            <DropdownItem path={"/adminreservations"} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />} >
                <p>Reservas</p>
            </DropdownItem>}
            <DropdownItem closeSession={logout} handleOpen={handleOpen} leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}>
                <p>Cerrar sesión</p>
            </DropdownItem>
        </div>
    )
}

export default DropdownMenu;