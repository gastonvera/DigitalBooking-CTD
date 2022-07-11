import React from 'react';
import { Link } from "react-router-dom";
import "./completeReservationsList.css"
import ReadMoreReadLessReservation from '../../myReservations/components/ReadMoreReadLessReservation';


const ReservationsList = ({ data, setReservationDetailsId }) => {

  const handleClick = id => {
    localStorage.setItem("reservationId", id)
    setReservationDetailsId(id)
  }

  const handleTime = (time) => {
    const year = time.slice(0, 4)
    const month = time.slice(5, 7)
    const day = time.slice(8, 10)
    const date = `${day}/${month}/${year}`
    return date
  }

  const handleTimeCreateAt = (time) => {
    const hour = time.slice(11,16)
    const year = time.slice(0,4)
    const month = time.slice(5,7)
    const day = time.slice(8,10)
    const date = `${day}/${month}/${year}`
    return `${date} - ${hour}hs`
  }

  console.log(data)

  return (
    <div className='plc-admin-reservationslist-container'>
      <h1>Todas las reservas</h1>
      {data &&
        data.map((element, index) => {
          return (
            <div key={(index + element.product.name).toString()} className='plc-admin-card-user-reservation-list'>
              <img src={element.product.images[0].url} alt={element.product.images[0].title} className="plc-admin-reservation-img" />
              <div className='plc-admin-card-resevation-list-container-text'>
                <div className='plc-admin-card-header-text'>
                  <div className='plc-admin-card-price-container'>
                    <p className='plc-admin-price-amount'>$ {element.product.pricePerNight}</p>
                    <p className='plc-admin-price-text'> /noche</p>
                  </div>
                  <div className='plc-admin-div-split-text' />
                  <div>
                    <p className='plc-admin-name-reservation-card'>{element.product.name}</p>
                    <p className='plc-admin-name-reservation-location'>{element.product.cities.name}, {element.product.cities.province}, {element.product.cities.country}</p>
                  </div>
                  <div className='plc-admin-div-split-text plc-admin-second-split-text'></div>
                  <div>
                    <p className='plc-admin-category-reservation-card'>{element.product.category.title}</p>
                  </div>
                </div>
                <div className='plc-admin-reservation-card-info'>
                  <div className='plc-admin-reservation-card-info-top'>
                    <div className='plc-admin-reservation-card-info-first-div plc-admin-card-reservations'>
                      <p className=''>Check In: <span>{handleTime(element.startDate)}</span></p>
                      <p className=''>Check Out: <span>{handleTime(element.endDate)}</span></p>
                      <p className=''>Hora del Check In: <span>{element.checkIn} hs</span></p>
                      <p>Ciudad de procedencia: <span>{element.city}</span></p>
                    </div>
                    <div className='plc-admin-reservation-card-info-second-div plc-admin-card-reservations'>
                      <p>ID del usuario: <span>{element.user.id}</span></p>
                      <p>Nombre del usuario: <span>{element.user.name}</span></p>
                      <p>Apellido del usuario: <span>{element.user.lastName}</span></p>
                      <p>Fecha de reserva confirmada: <span>{handleTimeCreateAt(element.createdAt)}</span></p>
                    </div>
                  </div>
                  <div className='plc-admin-reservation-card-info-mail plc-card-admin-reservations'>
                    <p>Email del usuario: <span>{element.user.email}</span></p>
                  </div>
                </div>
                <hr className='plc-admin-hr-bottom' />
                <div className='plc-admin-bottom-card-reservation'>
                  <div className='plc-admin-link-container'>
                    <Link to={`/product/${element.product.id}`} className="plc-admin-product-link-button">
                      Ver Producto
                    </Link>
                    <Link onClick={() => handleClick(element.id)} to={`/myreservations/reservationdetails`} className="plc-admin-product-link-button">
                      Ver Reserva
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default ReservationsList;