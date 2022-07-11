import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import FavouriteList from "./components/FavouriteList";
import "./favourites.css"
import { getFavoriteByUserId } from "../../services/favourite.service"

const MyFavourites = () => {
  const [favouriteList, setFavouriteList] = useState()

  const userId = JSON.parse(localStorage.getItem("user")).id
  const token = JSON.parse(localStorage.getItem("user")).tokenJwt

  useEffect(() => {
    getFavoriteByUserId(userId, token)
      .then((res) => { 
        setFavouriteList(res.data)
      })
  }, [])



  return (
    <>
      <div className="plc-header-background-favourite"></div>
      <div className="plc-favourite-general-container">
        {favouriteList && <FavouriteList data={favouriteList}/>}
        {favouriteList && <Map data={favouriteList}/>}
      </div>
    </>
  );
};

export default MyFavourites;