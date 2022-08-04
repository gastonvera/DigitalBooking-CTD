import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
    return (
        <div className="gv-footer">
            <div className="gv-footer-container">
                <div className="gv-isologotipo-footer">
                    <small>&copy; 2022 <b>Digital Booking</b></small>
                </div>
                <div className="gv-red-social-footer">
                    <span className='gv-icon-footer' data-tooltip="Facebook">
                        <FontAwesomeIcon icon={faFacebook} className="gv-i-fa"/>
                    </span>
                    <span className='gv-icon-footer' data-tooltip="Linkedin">
                        <FontAwesomeIcon icon={faLinkedinIn} className="gv-i-fa"/>
                    </span>
                    <span className='gv-icon-footer' data-tooltip="Twitter">
                        <FontAwesomeIcon icon={faTwitter} className="gv-i-fa"/>
                    </span>
                    <span className='gv-icon-footer' data-tooltip="Instagram">
                        <FontAwesomeIcon icon={faInstagram} className="gv-i-fa"/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;
