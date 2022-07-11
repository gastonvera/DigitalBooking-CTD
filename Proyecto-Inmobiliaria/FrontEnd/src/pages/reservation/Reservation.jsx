import React, { useEffect, useState } from "react";
import { getProductById } from "../../services/products.service";
import { addDays } from "date-fns";
import format from "date-fns/format";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ReservationCard from "./components/ReservationCard";
import CheckInHourForm from "./components/CheckInHourForm";
import PolicyBlock from "../product/components/policyBlock/PolicyBlock"
import HeaderBlock from "../../components/headerBlock/index";
import Calendar from "../../components/calendar/Calendar";
import "./reservation.css";


const Reservation = () => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);

  const location = window.location.pathname;
  const productId = location.split("/")[2];

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId)
      .then((res) => {
        setProduct(res);
        return res;
      }).catch((e) => {
        new Error(e);
        setError(e);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [])


  return (
    <>
      {product && <HeaderBlock data={product} />}
      <div className="plc-reservation-page-container">
        <div className="plc-reservation-forms-container">
          {product && <PersonalInfoForm />}
          <div style={{ paddingTop: "2rem" }}>
            <h2 style={{ paddingBottom: "1rem" }}>Seleccioná tu fecha de reserva</h2>
            {product && <Calendar data={product} range={range} setRange={setRange} />}
          </div>
          {product && <CheckInHourForm product={product} />}
        </div>
        <div className="plc-reservation-card-container">
          {product && <ReservationCard product={product} checkIn={format(range[0].startDate, "dd/MM/yyyy")} checkOut={format(range[0].endDate, "dd/MM/yyyy")} />}
        </div>
      </div>
      {product && <PolicyBlock data={product} />}
    </>
  );
};

export default Reservation;
