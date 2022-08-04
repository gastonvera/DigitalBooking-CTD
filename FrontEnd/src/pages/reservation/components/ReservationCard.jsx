import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./reservationCard.css"
import { postReservation } from '../../../services/reservation.service';
import ModalReservation from "./ModalReservation"
import { useModal } from "../../../hooks/useModal";
import Start from '../../home/componenets/Start';

export default function ReservationCard({ product, checkIn, checkOut }) {
  const [isOpenModalSuccess, OpenModalSuccess, closeModalSucess] = useModal(false);
  const [isOpenModalFail, OpenModalFail, closeModalFail] = useModal(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    const checkInSplit = checkIn.split("/")
    const checkInFormated = `${checkInSplit[2]}-${checkInSplit[1]}-${checkInSplit[0]}`
    const checkOutSplit = checkOut.split("/")
    const checkOutFormated = `${checkOutSplit[2]}-${checkOutSplit[1]}-${checkOutSplit[0]}`
    const cityInputValue = document.querySelector("#city").value
    const checkInHourValue = document.querySelector("#check-in-hour").value
    const jwt = userData.tokenJwt;

    const data = {
      user: { id: userData.id },
      product: { id: product.id },
      startDate: checkInFormated,
      endDate: checkOutFormated,
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      city: cityInputValue,
      checkIn: checkInHourValue
    }

    postReservation(data, jwt).then((res) => {

      if (res.status === 201) {
        OpenModalSuccess()
        console.log("exito")
      } else {
        OpenModalFail()
        console.log("error")
      }
    })
  }
console.log(product)
  return (
    <div className='plc-card-reservation-container-component'>
      <div className='plc-card-reservation-title-img-container'>
        <h2 className='plc-card-reservation-title'>Detalle de reserva</h2>
        <div className='plc-img-reservation-container'>
          <img src={product.images[0].url} alt="product screenshot" />
        </div>
      </div>
      <div className='plc-info-card-container'>
        <p>{product.category.title}</p>
        <div className='plc-name-price-container'>
          <h2>{product.name}</h2>
          <p>${product.pricePerNight} <span>/noche</span></p>
        </div>
        <Start averageScore={product.averageScore} />
        <div className='plc-card-direction-container'>
          <FontAwesomeIcon className="" icon={faLocationDot} />
          <p>{product.address}, {product.cities.province}, {product.cities.name}, {product.cities.country}</p>
        </div>
        <hr />
        <div className='plc-check-date-reservation-card'>
          <h4>Check in</h4>
          <p>{checkIn}</p>
        </div>
        <hr />
        <div className='plc-check-date-reservation-card'>
          <h4>Check Out</h4>
          <p>{checkOut}</p>
        </div>
        <hr />
        <button type='submit' onClick={handleClick} className='plc-confirm-booking-button'>Confirmar reserva</button>
      </div>
      <ModalReservation isOpen={isOpenModalSuccess} closeModal={closeModalSucess} success={closeModalSucess}>
        <FontAwesomeIcon className="plc-modal-icon-success" icon={faCircleCheck} />
        <div className='plc-modal-text-container'>
          <h3>¡Muchas gracias!</h3>
          <h4>Su reserva se ha realizado con éxito</h4>
        </div>
      </ModalReservation>
      <ModalReservation isOpen={isOpenModalFail} closeModal={closeModalFail}>
        <FontAwesomeIcon className="plc-modal-icon-fail" icon={faTriangleExclamation} />
        <div className='plc-modal-text-container'>
          <h3 id='plc-error-modal-text'>¡Lo sentimos!</h3>
          <h4>Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde</h4>
        </div>
      </ModalReservation>
    </div>
  )
}