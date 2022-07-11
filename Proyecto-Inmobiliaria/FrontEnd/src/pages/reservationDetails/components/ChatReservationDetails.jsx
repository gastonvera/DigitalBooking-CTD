import React, { useEffect, useState } from "react";
import "./chatReservationDetails.css"
import { postMessage } from "../../../services/messages.service"

const ChatReservationDetails = ({ data, findReservation }) => {
  const [reservationData, setReservationData] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    setReservationData(data)
    setUser(JSON.parse(localStorage.getItem("user")))
    const interval = setInterval(() => {
      findReservation()
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  

  useEffect(() => {
    setReservationData(data)
  }, [data])

  const handleTime = (time) => {
    const hour = time.slice(11,16)
    const year = time.slice(0,4)
    const month = time.slice(5,7)
    const day = time.slice(8,10)
    const date = `${day}/${month}/${year}`
    return `${hour}hs - ${date}`
  }

  const handleClick = (e) => {
    e.preventDefault()

    const textValue = document.querySelector("#textarea-send").value
    const reservationId = JSON.parse(localStorage.getItem("reservationId"))
    const user = JSON.parse(localStorage.getItem("user"))
    const jwt = user.tokenJwt

    if (textValue.trim().length > 0) {
      const data = {
        user: {
          id: user.id
        },
        body: textValue,
        reservation: {
          id: reservationId
        },
        isUser: user.rol === "ROLE_ADMIN" ? false : true //CONDICION CUANDO TENGA EL USER ROL
      }
      postMessage(data, jwt).then((res) => res.status === 200 ? findReservation() : "")
      document.querySelector("#textarea-send").value = ""
    }
  }
  
  return (reservationData &&
    <div className="plc-chat-details-container">
      <form>
        <textarea name="textarea-send" id="textarea-send" cols="55" rows="4" placeholder="Escribe un mensaje aqui"></textarea>
        <button onClick={(e) => handleClick(e)}>Enviar Mensaje</button>
      </form>
      <div className="plc-text-info-chat-container">
        <div className="plc-chat-div-line-decoration-left"></div>
        <p> Reserva confirmada para {reservationData.startDate}</p>
        <div className="plc-chat-div-line-decoration-right"></div>
      </div>
      <div className="plc-chat-history-container">
        {reservationData && reservationData.messages.sort((a, b) => b.id - a.id).map((ele, i) => {
          return ele.isUser ? (
            <div className="plc-comment-user-container">
              <div className="plc-chat-comment-user plc-chat-comment">
                {/* <div className="plc-chat-name-display plc-chat-name-user">{reservationData.user.name}</div> */}
                <div className="plc-chat-body-user">{ele.body}</div>
                <div className="plc-chat-time-user">{user.name} - {handleTime(ele.createdAt)}</div>
              </div>
            </div>
          ) : (
            <div className="plc-comment-admin-container">
              <div className="plc-chat-comment-admin plc-chat-comment">
                {/* <div className="plc-chat-name-display plc-chat-name-admin">Arrendatario</div> */}
                <div className="plc-chat-body-admin">{ele.body}</div>
                <div className="plc-chat-time-admin">Arrendatario - { handleTime(ele.createdAt)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ChatReservationDetails;