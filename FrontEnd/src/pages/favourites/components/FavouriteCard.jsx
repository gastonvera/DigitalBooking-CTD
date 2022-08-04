import React from "react";
import "./favouriteCard.css"
import Star from "../../home/componenets/Start"
import FeaturesReservationCard from "./FeaturesReservationCard";
import { Link } from "react-router-dom";
import FavouriteIcon from "../../../components/favouriteIcon/favouriteIcon";

export default function FavouriteCard({ data }) {
  return (
    <>
      <div className="plc-favourite-card-container">
        <div className="plc-img-text-container-favourite">
          <img src={data.images[0].url} alt="img" />
          <div className="plc-text-favourite-card">
            <p className="plc-location-favourite-card">{data.cities.country} - {data.cities.province} - {data.cities.name}</p>
            <Link to={`/product/${data.id}`} className="plc-product-link-favorite">
              {data.name}
            </Link>
            <FavouriteIcon product={data}/>
            <div className="plc-line-div-favourites"></div>
            <FeaturesReservationCard data={data} />
            <div className="plc-star-favourites">
              <Star averageScore={data.averageScore}/>
            </div>
            <div className="plc-price-favourite">
              <p className="plc-price">${data.pricePerNight}</p> <p className="plc-period">/noche</p>
            </div>
          </div>
        </div>
        <hr className="plc-favourite-hr" />
      </div>
    </>
  )
}