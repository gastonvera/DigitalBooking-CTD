import React from "react";

//fontwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Slider = (props) => {

  return props.sliderImg ? (
    <div className="unc-container-slider">
      <div className="unc-wrapper-list">
        <div className="unc-list-main-image">
          <button
            className="close-btn"
            onClick={() => props.setSliderImg(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <button className="unc-btn-left" onClick={props.previous}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="unc-btn-right" onClick={props.next}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <div
            className="unc-wrapper-images"
            style={{ marginLeft: -1200 * props.index }}
          >
            {props.imagesData.map((image) => (
              <div
                key={image.id}
                className="unc-main-image"
                style={{
                  backgroundImage: `url("${
                    props.imagesData[props.index].url
                  }")`,
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {props.index + 1} / {props.maxPag}
        </div>
        <div className="unc-list-images">
          {props.imagesData.slice(0, 4).map((image, idx) => (
            <div
              key={image.id}
              className="unc-image"
              style={{ backgroundImage: `url("${props.imagesData[idx].url}")` }}
              onClick={() => props.setIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Slider;
