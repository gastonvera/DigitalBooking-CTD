import React from 'react';
import "./FavouriteList.css";
import FavouriteCard from './FavouriteCard';


const FavouriteList = ({ data }) => {
  return (
    <div className='gv-favouritelist-container'>
      <div>
        <h2 className='plc-title-favourite'>Favoritos</h2>
      </div>
      {
        data.map((element) => {
          return (
            <div>
              <FavouriteCard data={element} />
            </div>
          )
        })
      }
    </div>
  )
}

export default FavouriteList;