import "./descriptionBlock.css"
import React, { useEffect, useState } from 'react';


export default function DescriptionBlock(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data.description);
  }, [])

  return (
    <div className='plc-description-product-container'>
      <h2>Alójate en {parseInt(props.data.referencias) > 5000 ? "los alrededores" : "el corazón" } de {props.data.cities.name}</h2>
      {data != null && <div>{data.map((ele,idx) => {
        return (
          <div key={idx}>
            <p>{ele}</p>
            <br />
          </div>
        );
      })}</div>}
    </div>
  )
}