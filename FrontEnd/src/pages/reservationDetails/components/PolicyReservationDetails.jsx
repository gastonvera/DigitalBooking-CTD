import React, { useState, useEffect } from 'react';

export default function PolicyReservationDetails(props) {
  const [policy, setPolicy] = useState([])

  useEffect(() => {
    setPolicy(props.data.policy)
  }, [])

  return (
    <div className='plc-details-policy-container'>
      <h2>Qué tenés que saber</h2>
      <div className=''>
        <div key={"div-1-policy"}>
          <h3>Normas de la casa</h3>
          {policy.houseRules && <ul>{policy.houseRules.map((ele, i) => { return <li className='plc-details-li' key={i + 5}>{ele}</li> })}</ul>}
        </div>
        <div key={"div-2-policy"}>
          <h3>Salud y seguridad</h3>
          {policy.healthAndSecurity && <ul>{policy.healthAndSecurity.map((ele, i) => { return <li className='plc-details-li' key={i+5}>{ele}</li> })}</ul>}
        </div>
        <div key={"div-3-policy"}>
          <h3>Politica de Cancelación</h3>
          {policy.cancelPolicy && <ul>{policy.cancelPolicy.map((ele, i) => { return <li className='plc-details-li' key={i + 5}>{ele}</li> })}</ul>}
        </div>
      </div>
    </div>
  )

}