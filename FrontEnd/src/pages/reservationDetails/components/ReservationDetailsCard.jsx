import React, { useEffect, useState } from "react"
import "./reservationDetailsCard.css"
import FeatureReservationDetails from "./FeatureReservationDetails";
import PolicyReservationDetails from "./PolicyReservationDetails";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { deleteReservationById } from "../../../services/reservation.service"


export default function ReservationDetailsCard({ data, setReservationDeleted }) {
  const [reservationData, setReservationData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setReservationData(data)
  }, [])
  
  const jwtToken = JSON.parse(localStorage.getItem("user")).tokenJwt

  const handleTime = (time) => {
    const year = time.slice(0,4)
    const month = time.slice(5,7)
    const day = time.slice(8,10)
    const date = `${day}/${month}/${year}`
    return date
  }
  
  const handleClick = () => {
    Swal.fire({
      title: '¿Estas seguro de que queres cancelar la reserva?',
      text: "¡No podrias revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Reserva cancelada!',
          'success',
        ).then(
          deleteReservationById(reservationData.id, jwtToken),
          setReservationDeleted(true),
          navigate("/myreservations")
        )
      }
    })
    
  }

  return (
    (reservationData &&
      <div className="plc-reservation-details-card-container">
        <img src={reservationData.product.images[0].url} alt="" />
        <div className="plc-details-card-title">
          <p className="plc-p-top-checks">
            {`${handleTime(reservationData.startDate)} - ${handleTime(reservationData.endDate)}`}
          </p>
          <p className="plc-details-description-location">{reservationData.product.cities.name} - {reservationData.product.cities.province} - {reservationData.product.cities.country}</p>
          <h2>{reservationData.product.name}</h2>
        </div>
        <div className="plc-text-details-container">
          <div className="plc-reservation-owner">
            <p className="plc-rev-owner-title">Propietario de la reserva</p>
            <p className="plc-rev-owner-data">Nombre: <span className="plc-span-owner-data">{reservationData.name}</span></p>
            <p className="plc-rev-owner-data">Apellido: <span className="plc-span-owner-data">{reservationData.lastName}</span></p>
            <p className="plc-rev-owner-data">Email: <span className="plc-span-owner-data">{reservationData.email}</span></p>
          </div>
          <hr />
          <div className="plc-cancel-reservation-container">
            <p className="plc-cancel-reservation-text-top">Reservacion confirmada. Vas a hospedarte en {reservationData.product.cities.name}!</p>
            <p className="plc-cancel-reservation-text-bottom">Tu arrendatario esta disponible para contestar cualquier pregunta.</p>
            <button onClick={handleClick} className="plc-cancel-button">Cancelar Reserva</button>
          </div>
          <hr />
          <div>
            <div className="plc-checks-container">
              <div className="plc-check-date-reservation-detail-card">
                <div className="plc-div-check-in-card">
                  <p className="plc-check-section-title">Check in</p>
                  <p>{handleTime(reservationData.startDate)}</p>
                </div>
                <div className="plc-div-check-out-card">
                  <p className="plc-check-section-title">Check out</p>
                  <p>{handleTime(reservationData.endDate)}</p>
                </div>
              </div>
              <div className="plc-div-check-hour-card">
                <p className="plc-check-section-title">Horario de Check in</p>
                <p>{reservationData.checkIn}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="plc-details-description-container">
            <p className="plc-details-description-title">Descripcion</p>
            {reservationData.product.description.map((ele, i) => <p key={(i + "details")} className="plc-details-description-info">{ele}</p>)}
          </div>
          <hr />
          <FeatureReservationDetails data={reservationData.product} />
          <hr />
          <PolicyReservationDetails data={reservationData.product} />
        </div>
      </div>
    )
  )
}