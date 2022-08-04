import React from 'react';
import "./ReservationsList.css";
import ReadMoreReadLessReservation from './ReadMoreReadLessReservation';
import { Link } from "react-router-dom";
import StarRating from "../../../components/starRating/index"


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

  return (
    <>
      {data.length > 0 && <div className='gv-reservationslist-container'>
        <h1>Mis reservas</h1>

        {data &&
          data.map((element, index) => {
            return (
              <div key={(index + element.product.name).toString()} className='plc-card-user-reservation-list'>
                <img src={element.product.images[0].url} alt={element.product.images[0].title} />

                <div className='plc-card-resevation-list-container-text'>
                  <div className='plc-card-header-text'>
                    <div className='plc-card-price-container'>
                      <p className='plc-price-amount'>$ {element.product.pricePerNight}</p>
                      <p className='plc-price-text'> /noche</p>
                    </div>
                    <div className='plc-div-split-text' />
                    <div>
                      <p className='plc-name-reservation-card'>{element.product.name}</p>
                      <p className='plc-name-reservation-location'>{element.product.cities.name}, {element.product.cities.province}, {element.product.cities.country}</p>
                    </div>
                    <div className='plc-div-split-text plc-second-split-text'></div>
                    <div>
                      <p className='plc-category-reservation-card'>{element.product.category.title}</p>
                    </div>
                    <div className='plc-div-split-text'></div>
                    <div className='plc-star-container'>
                      <StarRating productId={element.product.id}/>
                      <p className='plc-star-p' style={{fontSize: "0.7rem"}}>Danos puntaje</p>
                    </div>
                  </div>
                  <ReadMoreReadLessReservation text={element.product.description} />
                  <hr className='plc-hr-bottom' />
                  <div className='plc-bottom-card-reservation'>
                    <div className='plc-reservation-card-check'>
                      <p className='plc-p-checks'>Check In: {handleTime(element.startDate)}</p>
                      <p className='plc-p-checks'>Check Out: {handleTime(element.endDate)}</p>
                    </div>
                    <div>
                      <p className='plc-p-hour'>Hora del Check In: {element.checkIn} hs</p>
                    </div>
                    <div className='plc-button-container-reservation'>
                      <Link to={`/product/${element.product.id}`} className="plc-product-link-button">
                        Ver Producto
                      </Link>
                      <Link onClick={() => handleClick(element.id)} to={`/myreservations/reservationdetails`} className="plc-product-link-button">
                        Ver Reserva
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>}
    </>
  )
}

export default ReservationsList;