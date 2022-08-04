import React, { useState, useCallback, useEffect } from "react";
import "./galleryBlock.css";
import Slider from "./Slider";
//fontwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import useWindowDimensions from "../../../../hooks/useWindowDimension";

const GalleryBlock = (product) => {
  const [showRedes, setShowRedes] = useState(false);
  const [sliderImg, setSliderImg] = useState(false);
  const [index, setIndex] = useState(0);
  const imagesData = product.data.images;
  const maxPag = imagesData.length;
  const dimensions = useWindowDimensions();

  const handleShowRedes = () => {
    setShowRedes(!showRedes);
  }

  const interval = useCallback(() => {
    if (index < maxPag - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    const int = setInterval(interval, 3000);
    return () => clearInterval(int);
  }, [index]);

  if (sliderImg == true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const handleSlider = () => {
    setIndex(0);
    setSliderImg(true);
    let scrollModal = window.pageYOffset;
    if (scrollModal > 100) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previous = () => {
    setIndex(index === 0 ? maxPag - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === maxPag - 1 ? 0 : index + 1);
  };

  return (
    <>
      <Slider
        index={index}
        setIndex={setIndex}
        maxPag={maxPag}
        imagesData={imagesData}
        sliderImg={sliderImg}
        setSliderImg={setSliderImg}
        previous={previous}
        next={next}
      />
      <div className="wrapper">
        <div className="unc-icons-slider">
          {!showRedes ? null : <>
            <div className='unc-red-social'>
              <FacebookShareButton url={`http://app-g8-c10621-bucket.s3-website-us-west-1.amazonaws.com/products/${product.data.id}`} quote={"mira este hermoso lugar"} hashtag="#Db">
                <FacebookIcon round={true} className="unc-share-icon"></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={`http://app-g8-c10621-bucket.s3-website-us-west-1.amazonaws.com/products/${product.data.id}`} quote={"mira este hermoso lugar"} hashtag="#Db">
                <TwitterIcon round={true} className="unc-share-icon"></TwitterIcon>
              </TwitterShareButton>
              <WhatsappShareButton url={`http://app-g8-c10621-bucket.s3-website-us-west-1.amazonaws.com/products/${product.data.id}`} quote={"mira este hermoso lugar"} hashtag="#Db">
                <WhatsappIcon round={true} className="unc-share-icon"></WhatsappIcon>
              </WhatsappShareButton>
            </div>
          </>}
          <div className="unc-icon-share" onClick={handleShowRedes}>
            <FontAwesomeIcon icon={faShareNodes} />
          </div>
          <div className="unc-icon-heart">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
        <div className="list-main-image">
          <div
            className="main-image"
            style={{ backgroundImage: `url("${imagesData[0].url}")` }}
          ></div>
          <div className="list-images">
            {dimensions.width > "768"
              ? imagesData.map((image, idx) => (
                <div
                  key={idx}
                  className="image"
                  style={{ backgroundImage: `url("${image.url}")` }}
                ></div>
              ))
              : imagesData.map((image) => (
                <div
                  key={image.id}
                  className="image"
                  style={{
                    backgroundImage: `url("${imagesData[index].url}")`,
                  }}
                >
                  <button className="unc-btn-left" onClick={previous}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button className="unc-btn-right" onClick={next}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              ))}
          </div>
          <div className="unc-pag-tablet">
            {index + 1} / {maxPag}
          </div>
          <button className="btn-ver-mas" onClick={handleSlider}>
            Ver Mas
          </button>
        </div>
      </div>
    </>
  );
};

export default GalleryBlock;
