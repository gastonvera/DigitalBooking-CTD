import React from 'react';
import "./Maps.css";
import GoogleMaps from "simple-react-google-maps"
import credentials from "../../../../utilities/credentials";

const Maps = ({ data }) => {
  return (
    <div className='gv-maps-container'>
      <h2>¿Dónde vas a estar?</h2>
      <hr />
      <p>{`${data.cities.province}, ${data.cities.country}`}</p>
      <div className='gv-maps-container-map'>
        <GoogleMaps
          className="plc-map-product"
          apiKey={credentials.mapsKey}
          style={{ height: "100%", width: "100%" }}
          zoom={14}
          center={{
            lat: data.latitude,
            lng: data.longitude,
          }}
          markers={
            { lat: data.latitude, lng: data.longitude }
          }
        />
      </div>
    </div>
  )
}

export default Maps;