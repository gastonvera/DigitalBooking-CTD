import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWaterLadder,
  faFire,
  faVideoCamera,
  faElevator,
  faSnowflake,
  faDumbbell,
  faJugDetergent,
  faHotTub,
  faSuitcase,
  faWheelchair,
  faCouch,
  faLightbulb,
  faDog,
  faStore,
  faSun,
  faFireBurner,
  faWater,
  faTemperatureArrowUp,
  faWifi,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const sliderIcons = {
  marginLeft: "8em",
};

const Icons = ({ product }) => {
  const [iconsSlider, setIconsSlider] = useState(0);
  const [cont, setCont] = useState(1);
  const [features, setFeatures] = useState({}); //Features que llega por props

  useEffect(() => {
    setFeatures(product.features);
  }, []);
  const result = Object.values(product.features);
  const tasks = result.filter((task) => task === true);
  const resultTotalIcons = tasks.length - 1;
  const previous = () => {
    const redondeo = Math.ceil(resultTotalIcons / 4);
    setCont(cont - 1);
    if (cont === 1) {
      setIconsSlider(0);
      setCont(1);
    } else {
      setIconsSlider(iconsSlider + 8);
    }
  };

  const next = () => {
    const redondeo = Math.ceil(resultTotalIcons / 4);
    setCont(cont + 1);
    console.log(cont);
    console.log(resultTotalIcons);
    console.log(redondeo);
    console.log(tasks);
    console.log(product.features);

    if (cont === redondeo) {
      setIconsSlider(0);
      setCont(1);
    } else {
      setIconsSlider(iconsSlider - 8);
    }
  };

  return (
    <div className="unc-icons-products">
      <button className="unc-btn-left-product" onClick={previous}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button className="unc-btn-right-product" onClick={next}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <div className="unc-icon-p-container">
        <div style={{ marginLeft: iconsSlider + "em" }}>
        {features.pool && <span key={"p-features-1"}><FontAwesomeIcon className='unc-icon-features' icon={faWaterLadder} /></span>}
        {features.grill && <span key={"p-features-2"}><FontAwesomeIcon className='unc-icon-features' icon={faFire} /></span>}
        {features.security && <span key={"p-features-3"}><FontAwesomeIcon className='unc-icon-features' icon={faVideoCamera} /></span>}
        {features.elevator && <span key={"p-features-4"}><FontAwesomeIcon className='unc-icon-features' icon={faElevator} /></span>}
        {features.airConditioning && <span key={"p-features-5"}><FontAwesomeIcon className='unc-icon-features' icon={faSnowflake} /></span>}
        {features.gym && <span key={"p-features-6"}><FontAwesomeIcon className='unc-icon-features' icon={faDumbbell} /></span>}
        {features.laundry && <span key={"p-features-7"}><FontAwesomeIcon className='unc-icon-features' icon={faJugDetergent} /></span>}
        {features.sauna && <span key={"p-features-8"}><FontAwesomeIcon className='unc-icon-features' icon={faHotTub} /></span>}
        {features.suitableProfessional && <span key={"p-features-9"}><FontAwesomeIcon className='unc-icon-features' icon={faSuitcase} /></span>}
        {features.furnished && <span key={"p-features-11"}><FontAwesomeIcon className='unc-icon-features' icon={faCouch} /></span>}
        {features.bright && <span key={"p-features-12"}><FontAwesomeIcon className='unc-icon-features' icon={faSun} /></span>}
        {features.pets && <span key={"p-features-13"}><FontAwesomeIcon className='unc-icon-features' icon={faDog} /></span>}
        {features.comercialUse && <span key={"p-features-14"}><FontAwesomeIcon className='unc-icon-features' icon={faStore} /></span>}
        {features.electricity && <span key={"p-features-15"}><FontAwesomeIcon className='unc-icon-features' icon={faLightbulb} /></span>}
        {features.naturalGas && <span key={"p-features-16"}><FontAwesomeIcon className='unc-icon-features' icon={faFireBurner} /></span>}
        {features.water && <span key={"p-features-17"}><FontAwesomeIcon className='unc-icon-features' icon={faWater} /></span>}
        {features.heating && <span key={"p-features-18"}><FontAwesomeIcon className='unc-icon-features' icon={faTemperatureArrowUp} /></span>}
        {features.wifi && <span key={"p-features-19"}><FontAwesomeIcon className='unc-icon-features' icon={faWifi} /></span>}
        {features.disabledAccess && <span key={"p-features-10"}><FontAwesomeIcon className='unc-icon-features' icon={faWheelchair} /></span>}
        </div>
      </div>
    </div>
  );
};

export default Icons;
