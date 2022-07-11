import React, { useState, useEffect } from 'react';
import "../components/personalInfoForm.css"

export default function PersonalInfoForm() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: ""
  })

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("user"))
    setUser({
      name: userStored.name,
      lastName: userStored.lastName,
      email: userStored.email
    })
  }, [])

  return (
    <>
      <h2>Completá tus datos</h2>
      <form className="plc-personal-dates-form">
        <div className='plc-personal-dates-upper-side'>
          <div className="plc-reservation-input-container">
            <label htmlFor="name">Nombre</label>
            <input type="text" disabled={true} name='name' id='name' value={user.name} />
          </div>
          <div className="plc-reservation-input-container">
            <label htmlFor="lastName">Apellido</label>
            <input type="text" disabled={true} name='lastName' id='lastName' value={user.lastName}/>
          </div>
        </div>
        <div className='plc-personal-dates-bottom-side'>
          <div className="plc-reservation-input-container">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" disabled={true} name='email' id='email' value={user.email}/>
          </div>
          <div className="plc-reservation-input-container-city">
            <label htmlFor="city">Ciudad</label>
            <input type="text" name='city' id='city' placeholder='Ciudad' />
          </div>
        </div>
      </form>
    </>
  )
}