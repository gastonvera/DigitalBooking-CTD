import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWaterLadder, faFire, faVideoCamera, faElevator, faSnowflake, faDumbbell,
  faJugDetergent, faHotTub, faSuitcase, faWheelchair, faCouch, faLightbulb,
  faDog, faStore, faSun, faFireBurner, faWater, faTemperatureArrowUp, faWifi
} from "@fortawesome/free-solid-svg-icons";

export default function FeaturesReservationCard({ data }) {
  return (
    <div className="plc-div-features-favourites-card">
      <span className='plc-icon-reservation-card' data-tooltip="Piscina">
        {data.features.pool && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faWaterLadder} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Parrilla">
        {data.features.grill && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faFire} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Vigilancia">
        {data.features.security && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faVideoCamera} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Ascensor">
        {data.features.elevator && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faElevator} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Aire Acondicionado">
        {data.features.airConditioning && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faSnowflake} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Gimnasio">
        {data.features.gym && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faDumbbell} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Lavadero">
        {data.features.laundry && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faJugDetergent} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Sauna">
        {data.features.sauna && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faHotTub} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Apto Profesional">
        {data.features.suitableProfessional && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faSuitcase} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Amoblado">
        {data.features.furnished && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faCouch} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Luminoso">
        {data.features.bright && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faSun} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Permite Mascotas">
        {data.features.pets && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faDog} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Uso Comercial">
        {data.features.comercialUse && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faStore} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Electricidad/Luz">
        {data.features.electricity && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faLightbulb} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Gas Natural">
        {data.features.naturalGas && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faFireBurner} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Agua Corriente">
        {data.features.water && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faWater} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Calefaccion">
        {data.features.heating && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faTemperatureArrowUp} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Wifi">
        {data.features.wifi && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faWifi} />}
      </span>
      <span className='plc-icon-reservation-card' data-tooltip="Apto Discapacitados">
        {data.features.disabledAccess && <FontAwesomeIcon className='plc-icon-favourite-card' icon={faWheelchair} />}
      </span>
    </div>
  )
}