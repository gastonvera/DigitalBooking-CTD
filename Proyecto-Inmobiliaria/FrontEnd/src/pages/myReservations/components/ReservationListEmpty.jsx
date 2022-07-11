import React from 'react';
import { Link } from "react-router-dom";
import "./reservationListEmpty.css"

const ReservationsList = ({ data }) => {


  return (
    <div className='plc-empty-list-container'>
      <h1>Aún no has efectuado ninguna reserva</h1>
      <img src="https://img-bucket-inmobiliaria.s3.amazonaws.com/Utils/emptyList.jpg" alt="empty-list" />
      <Link to={`/`} id="plc-link-empty-list" className="plc-product-link-button plc-product-empty-button">
        Volver al Inicio
      </Link>
    </div>
  )
}

export default ReservationsList;