import React from "react";
import "./map.css"
import GoogleMaps from "simple-react-google-maps"
import credentials from "../../../utilities/credentials";

const Map = ({data}) => {
  return (
    <div className="plc-map-container">
      <GoogleMaps
        apiKey={credentials.mapsKey}
        style={{ height: "100%", width: "100%" }}
        zoom={3}
        center={{
          lat: -10.051039,
          lng: -68.025320,
        }}        
        markers={
          data.map(element => {
            return { lat: element.latitude, lng: element.longitude}
          })
        }
      />
    </div>
  )
}


export default Map;

