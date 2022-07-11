import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWaterLadder, faFire, faVideoCamera, faElevator, faSnowflake, faDumbbell,
  faJugDetergent, faHotTub, faSuitcase, faWheelchair, faCouch, faLightbulb,
  faDog, faStore, faSun, faFireBurner, faWater, faTemperatureArrowUp, faWifi
} from "@fortawesome/free-solid-svg-icons";

export default function FeatureReservationDetails(props) {
  const [features, setFeatures] = useState({}) 

  useEffect(() => {
    setFeatures(props.data.features)
  }, [])

  return (
    <div className='plc-reservation-details-features-container'>
      <h4>¿Qué ofrece este lugar?</h4>
      <div className='plc-reservation-details-icon-p-container'>
        {features.pool && <p className="plc-feature-deatils-p" key={"p-features-1"}><FontAwesomeIcon className='plc-details-feature' icon={faWaterLadder} />Piscina</p>}
        {features.grill && <p className="plc-feature-deatils-p" key={"p-features-2"}><FontAwesomeIcon className='plc-details-feature' icon={faFire} />Parrilla</p>}
        {features.security && <p className="plc-feature-deatils-p" key={"p-features-3"}><FontAwesomeIcon className='plc-details-feature' icon={faVideoCamera} />Vigilancia</p>}
        {features.elevator && <p className="plc-feature-deatils-p" key={"p-features-4"}><FontAwesomeIcon className='plc-details-feature' icon={faElevator} />Ascensor</p>}
        {features.airConditioning && <p className="plc-feature-deatils-p" key={"p-features-5"}><FontAwesomeIcon className='plc-details-feature' icon={faSnowflake} />Aire Acondicionado</p>}
        {features.gym && <p className="plc-feature-deatils-p" key={"p-features-6"}><FontAwesomeIcon className='plc-details-feature' icon={faDumbbell} />Gimnasio</p>}
        {features.laundry && <p className="plc-feature-deatils-p" key={"p-features-7"}><FontAwesomeIcon className='plc-details-feature' icon={faJugDetergent} />Lavadero</p>}
        {features.sauna && <p className="plc-feature-deatils-p" key={"p-features-8"}><FontAwesomeIcon className='plc-details-feature' icon={faHotTub} />Sauna</p>}
        {features.suitableProfessional && <p className="plc-feature-deatils-p" key={"p-features-9"}><FontAwesomeIcon className='plc-details-feature' icon={faSuitcase} />Apto Profesional</p>}
        {features.furnished && <p className="plc-feature-deatils-p" key={"p-features-11"}><FontAwesomeIcon className='plc-details-feature' icon={faCouch} />Amoblado</p>}
        {features.bright && <p className="plc-feature-deatils-p" key={"p-features-12"}><FontAwesomeIcon className='plc-details-feature' icon={faSun} />Luminoso</p>}
        {features.pets && <p className="plc-feature-deatils-p" key={"p-features-13"}><FontAwesomeIcon className='plc-details-feature' icon={faDog} />Permite Mascotas</p>}
        {features.comercialUse && <p className="plc-feature-deatils-p" key={"p-features-14"}><FontAwesomeIcon className='plc-details-feature' icon={faStore} />Uso Comercial</p>}
        {features.electricity && <p className="plc-feature-deatils-p" key={"p-features-15"}><FontAwesomeIcon className='plc-details-feature' icon={faLightbulb} />Electricidad/Luz</p>}
        {features.naturalGas && <p className="plc-feature-deatils-p" key={"p-features-16"}><FontAwesomeIcon className='plc-details-feature' icon={faFireBurner} />Gas Natural</p>}
        {features.water && <p className="plc-feature-deatils-p" key={"p-features-17"}><FontAwesomeIcon className='plc-details-feature' icon={faWater} />Agua Corriente</p>}
        {features.heating && <p className="plc-feature-deatils-p" key={"p-features-18"}><FontAwesomeIcon className='plc-details-feature' icon={faTemperatureArrowUp} />Calefaccion</p>}
        {features.wifi && <p className="plc-feature-deatils-p" key={"p-features-19"}><FontAwesomeIcon className='plc-details-feature' icon={faWifi} />Wifi</p>}
        {features.disabledAccess && <p className="plc-feature-deatils-p" key={"p-features-10"} ><FontAwesomeIcon className='plc-details-feature' icon={faWheelchair} />Apto Discapacitados</p>}
      </div>
    </div>
  )}