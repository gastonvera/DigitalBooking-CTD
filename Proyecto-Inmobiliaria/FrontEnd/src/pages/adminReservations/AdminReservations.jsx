import React, { useEffect, useState } from "react";
import { findAllReservations } from "../../services/reservation.service"
import CompleteReservationList from "./components/CompleteReservationList"
import "./adminReserevations.css"

const AdminReservations = ({ setReservationDetailsId }) => {
  const [completeReservationList, setCompleteReservationList] = useState()

  const token = JSON.parse(localStorage.getItem("user")).tokenJwt

  useEffect(() => {
    findAllReservations(token)
      .then((res) => {
        setCompleteReservationList(res.data)
      })
  }, [])

  return (
    <>
      <div className='plc-complete-list-background-header'></div>
      {completeReservationList && <CompleteReservationList setReservationDetailsId={setReservationDetailsId} data={completeReservationList} />}
    </>
  );
};

export default AdminReservations;