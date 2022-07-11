import React from "react";
import { Link } from 'react-router-dom';
import './CalendarBlock.css';
import Calendar from "../../../../components/calendar/Calendar";

const CalendarBlock = ({ data, setBookTriedWithoutLogin }) => {

  const handleReservation = () => {
    setBookTriedWithoutLogin(true)
  }

  return (
    <div className="gv-calendar-block-container">
      <div className="gv-calendar-and-reservation">
        <div className="gv-calendar-container">
          <h2>Fechas Disponibles</h2>
          <Calendar data={data}/>
        </div>
        <div className="gv-reservation-container">
          <div className="gv-reservation-box">
            <p>Agrega tus fechas de viaje para obtener precios exactos</p>
            {
              localStorage.getItem("user") &&
              <div className="gv-reservation-button">
                <Link to={`/product/${data.id}/reservation`}><p>Iniciar reserva</p></Link>
              </div>
            }
            {
              localStorage.getItem("user") === null &&
              <div className="gv-reservation-button">
                <Link to={`/login`} onClick={handleReservation}><p>Iniciar reserva</p></Link>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarBlock;