import React, { useState, useEffect } from 'react';
import "./Policy.css"
export default function PolicyBlock(props) {
  const [policy, setPolicy] = useState([])

  useEffect(() => {
    setPolicy(props.data.policy)
  }, [])

  return (
    <div className='plc-policy-container'>
      <h2>Qué tenés que saber</h2>
      <hr />
      <div className='plc-policty-content-container'>
        <div key={"div-1-policy"}>
          <h3>Normas de la casa</h3>
          {policy.houseRules && <ul>{policy.houseRules.map((ele, i) => { return <li className='plc-li-policy' key={i + 5}>{ele}</li> })}</ul>}
        </div>
        <div key={"div-2-policy"}>
          <h3>Salud y seguridad</h3>
          {policy.healthAndSecurity && <ul>{policy.healthAndSecurity.map((ele, i) => { return <li className='plc-li-policy' key={i+5}>{ele}</li> })}</ul>}
        </div>
        <div key={"div-3-policy"}>
          <h3>Politica de Cancelación</h3>
          {policy.cancelPolicy && <ul>{policy.cancelPolicy.map((ele, i) => { return <li className='plc-li-policy' key={i + 5}>{ele}</li> })}</ul>}
        </div>
      </div>
    </div>
  )

}