import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../components/checkInHourForm.css"



export default function CheckInHourForm({product}) {
  const [hours, setHours] = useState([]);
  const [hourSelected, setHourSelected] = useState();


  useEffect(() => {
    setHours(product.checkInRange_list)
  }, [])

  const handleChange = (e) => {
    setHourSelected(e.target.value)
  }

  return (
    <>
      <h2 className='plc-check-subtitle'>Tu horario de llegada</h2>
      <div className='check-hour-template-container'>
        <div className='div-container-check-hour-icon'>
          <span className='span-check-circle'><FontAwesomeIcon className="" icon={faCheck} /></span>
          {hourSelected === undefined && <p>{`Tu habitacion puede estar lista para el check-in entre las ${hours[0]} y las ${hours[hours.length - 1]}`}</p>}
          {hourSelected != undefined &&<p>{`Tu habitacion va a estar lista para el check-in a las ${hourSelected} `}</p>}
        </div>
        <label htmlFor="check-in-hour">
          Indicá tu horario estimado de llegada
        </label>
        <select name="check-in-hour" id="check-in-hour" onChange={handleChange}>
          <option key={"1a"} id='plc-option-default' selected="selected" disabled={true} value="">Seleccionar hora de llegada</option>
          {hours && hours.map((ele,i) => {
            return(<option key={(i+1).toString()} value={ele}>{ele}</option>)
          })}
        </select>
      </div>
      
    </>
  )
}