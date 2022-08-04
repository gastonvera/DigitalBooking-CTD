import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import ReadMoreReadLess from "../readMoreReadLess/ReadMoreReadLess.jsx";
import "./ProductCard.css";
import Start from "../../pages/home/componenets/Start.jsx";
import Icons from "./Icons";
import FavouriteIcon from "../favouriteIcon/favouriteIcon";

const ProductCard = ({ product }) => {
  const [averageScore, setAverageScore] = useState(product.averageScore === null ? 0 : Math.round(product.averageScore * 10) / 10)
  const [scoreText, setScoreText] = useState("");

  useEffect(() => {
    setAverageScore(product.averageScore === null ? 0 : Math.round(product.averageScore * 10) / 10);

    if (averageScore > 0 && averageScore < 2) {
      setScoreText("Mala");
    } else if (averageScore >= 2 && averageScore < 3) {
      setScoreText("Regular");
    } else if (averageScore >= 3 && averageScore < 4) {
      setScoreText("Buena");
    } else if (averageScore >= 4 && averageScore < 5) {
      setScoreText("Muy buena");
    } else if (averageScore === 5) {
      setScoreText("Excelente");
    } else {
      setScoreText("sin calificacion");
    }
  }, []);

  return (
    <>
      <div className="unc-icons">
        <img
          className="unc-img"
          src={product.images[0].url}
          alt={product.images[0].title}
        />
        <FavouriteIcon product={product} />
      </div>
      <div className="unc-content">
        <div className="unc-category-span">
          <div className="unc-star-rating-span">
            <div className='unc-span-content'>
              <span className="unc-span">
                {product.category.title.toUpperCase()} 
              </span>
              <span className="unc-span">
                <Start averageScore={averageScore} />
              </span>
            </div>
            <h3>{product.name}</h3>
          </div>
          <div className="unc-ranking">
            <span className="unc-ranking-span">{Math.round(averageScore)}</span>
            <p>{scoreText}</p>
          </div>
        </div>
        {/* llamar a location aqui */}
        <div className="plc-price-home">
          <p>${product.pricePerNight} <span>/noche</span></p>
        </div>
        <Icons product={product} />
        <ReadMoreReadLess text={product.description} />
        <Link to={`/product/${product.id}`} className="unc-link">
          Ver Mas
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
