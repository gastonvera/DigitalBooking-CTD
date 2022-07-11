import React, { useEffect, useState } from "react";
import ReservationsList from "./components/ReservationsList";
import ReservationListEmpty from "./components/ReservationListEmpty"
import { findReservationsByUserId } from "../../services/reservation.service"
import Spinner from "../../components/spinner/Spinner.jsx";
import NothingHere from "../../components/nothingHere/NothingHere";

const MyReservations = ({ setReservationDetailsId, setReservationDeleted, reservationDeleted }) => {
  const [reservationList, setReservationList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user")).id
  const token = JSON.parse(localStorage.getItem("user")).tokenJwt

  useEffect(() => {
    setReservationDeleted(false);
    setIsLoading(true);
    findReservationsByUserId(userId, token)
      .then((res) => {
        setReservationList(res.data)
      }).catch((err) => {
        setError(err);
        setReservationList([]);
      }).finally(() => {
        setIsLoading(false);
      })
  }, [reservationDeleted])

  console.log(reservationList);

  return (
    <>
        {isLoading ? <Spinner height={"90vh"}/> : <ReservationsList setReservationDetailsId={setReservationDetailsId} data={reservationList} />}
        {error && <ReservationListEmpty />}
    </>
  );
};

export default MyReservations;