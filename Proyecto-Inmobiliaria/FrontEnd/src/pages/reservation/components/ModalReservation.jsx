import "./modalReservation.css"
import React from "react";
import { useNavigate } from "react-router-dom";

const ModalReservation = ({ children, isOpen, closeModal, success }) => {
  const navigate = useNavigate();

  const handleCloseModal = () =>{
    closeModal();
    if (success) return navigate("/myreservations")
  }

  return (
    <article className={`plc-modal ${isOpen && "plc-is-open"}`}>
      <div className="plc-modal-container">
        {children}
        <button onClick={handleCloseModal} className="plc-modal-close">ok</button>
      </div>
    </article>
  )
}

export default ModalReservation;