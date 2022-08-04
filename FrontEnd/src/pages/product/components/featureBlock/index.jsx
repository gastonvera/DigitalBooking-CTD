import React, { useEffect, useState } from 'react';
import "./index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWaterLadder, faFire, faVideoCamera, faElevator, faSnowflake, faDumbbell,
  faJugDetergent, faHotTub, faSuitcase, faWheelchair, faCouch, faLightbulb,
  faDog, faStore, faSun, faFireBurner, faWater, faTemperatureArrowUp, faWifi
} from "@fortawesome/free-solid-svg-icons";

export default function FeatureBlock(props) {
  const [features, setFeatures] = useState({})   //Features que llega por props

  useEffect(() => {
    setFeatures(props.data.features)
  }, [])

  return (
    <div className='plc-features-container'>

      <h2>¿Qué ofrece este lugar?</h2>
      <hr />
      <div className='plc-icon-p-container'>
        {features.pool && <p key={"p-features-1"}><FontAwesomeIcon className='plc-icon-features' icon={faWaterLadder} />Piscina</p>}
        {features.grill && <p key={"p-features-2"}><FontAwesomeIcon className='plc-icon-features' icon={faFire} />Parrilla</p>}
        {features.security && <p key={"p-features-3"}><FontAwesomeIcon className='plc-icon-features' icon={faVideoCamera} />Vigilancia</p>}
        {features.elevator && <p key={"p-features-4"}><FontAwesomeIcon className='plc-icon-features' icon={faElevator} />Ascensor</p>}
        {features.airConditioning && <p key={"p-features-5"}><FontAwesomeIcon className='plc-icon-features' icon={faSnowflake} />Aire Acondicionado</p>}
        {features.gym && <p key={"p-features-6"}><FontAwesomeIcon className='plc-icon-features' icon={faDumbbell} />Gimnasio</p>}
        {features.laundry && <p key={"p-features-7"}><FontAwesomeIcon className='plc-icon-features' icon={faJugDetergent} />Lavadero</p>}
        {features.sauna && <p key={"p-features-8"}><FontAwesomeIcon className='plc-icon-features' icon={faHotTub} />Sauna</p>}
        {features.suitableProfessional && <p key={"p-features-9"}><FontAwesomeIcon className='plc-icon-features' icon={faSuitcase} />Apto Profesional</p>}
        {features.furnished && <p key={"p-features-11"}><FontAwesomeIcon className='plc-icon-features' icon={faCouch} />Amoblado</p>}
        {features.bright && <p key={"p-features-12"}><FontAwesomeIcon className='plc-icon-features' icon={faSun} />Luminoso</p>}
        {features.pets && <p key={"p-features-13"}><FontAwesomeIcon className='plc-icon-features' icon={faDog} />Permite Mascotas</p>}
        {features.comercialUse && <p key={"p-features-14"}><FontAwesomeIcon className='plc-icon-features' icon={faStore} />Uso Comercial</p>}
        {features.electricity && <p key={"p-features-15"}><FontAwesomeIcon className='plc-icon-features' icon={faLightbulb} />Electricidad/Luz</p>}
        {features.naturalGas && <p key={"p-features-16"}><FontAwesomeIcon className='plc-icon-features' icon={faFireBurner} />Gas Natural</p>}
        {features.water && <p key={"p-features-17"}><FontAwesomeIcon className='plc-icon-features' icon={faWater} />Agua Corriente</p>}
        {features.heating && <p key={"p-features-18"}><FontAwesomeIcon className='plc-icon-features' icon={faTemperatureArrowUp} />Calefaccion</p>}
        {features.wifi && <p key={"p-features-19"}><FontAwesomeIcon className='plc-icon-features' icon={faWifi} />Wifi</p>}
        {features.disabledAccess && <p className='disabled-p' key={"p-features-10"}><FontAwesomeIcon className='plc-icon-features plc-disabled-icon' icon={faWheelchair} />Apto Discapacitados</p>}
      </div>
    </div>
  )
}