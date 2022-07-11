import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './HeaderBlock.css';

const HeaderBlock = (props) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return(
        <div className='gv-header-block-container'>
            <div className='gv-product-title'>
                <p>{props.data.category.title}</p>
                <h2>{props.data.name}</h2>
            </div>
            <div onClick={goBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="gv-icon-back"/>
            </div>
        </div>
    )
}

export default HeaderBlock;