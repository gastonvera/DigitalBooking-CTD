import React, { useEffect, useState } from "react";
import ReservationDetailsCard from "./components/ReservationDetailsCard";
import "./reservationDetails.css"
import { findReservationsById } from "../../services/reservation.service"
import ChatReservationDetails from "./components/ChatReservationDetails";

const ReservationDetails = ({ setReservationDeleted }) => {
  const [data, setData] = useState()
  
  const user = JSON.parse(localStorage.getItem("user"))
  const reservationId = JSON.parse(localStorage.getItem("reservationId"))

  useEffect(() => {
    findReservation()
  }, [])


  const findReservation = () =>{
    
    findReservationsById(reservationId, user.tokenJwt).then(res =>
      setData(res.data)
    )
  }

  return (
    <>
      <div className="plc-header-background"></div>
      <div className="plc-reservation-details-container">
        {data && <ReservationDetailsCard data={data} setReservationDeleted={setReservationDeleted}/>}
        <div className="plc-div-background-chat-space"></div>
        {data && <ChatReservationDetails data={data} findReservation={findReservation}/>}
      </div>
    </>
  );
};

export default ReservationDetails;