import React from 'react';
import { Link } from 'react-router-dom';
import "./Error404.css";

const Error404 = () => {
  return (
    <div className='plc-error404-general-container'>
      <div style={{position: "relative"}}>
        <img src="https://img-bucket-inmobiliaria.s3.amazonaws.com/Utils/Error404.jpg" alt="" />
        <Link to={"/"} className='gv-button-go-home'>
          <p>Ir al inicio</p>
        </Link>
      </div>
    </div>
  )
}

export default Error404;