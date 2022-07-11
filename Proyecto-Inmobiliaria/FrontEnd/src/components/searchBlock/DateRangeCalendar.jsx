import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { addDays, format, eachDayOfInterval, subDays } from "date-fns";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./dateRangeCalendar.css";
import useWindowDimensions from "../../hooks/useWindowDimension";

export default function DateRangeCalendar({ setStartDateFilter, setEndDateFilter, range, setRange }) {

  const [open, setOpen] = useState(false); // open close
  const refOne = useRef(null); //get the target element to toggle
  const dimensions = useWindowDimensions();
  const [disabledDates, setDisabledDates] = React.useState([]);


  useEffect(() => {
    document.addEventListener("keydown", hiddenOnEscape, true);
    document.addEventListener("click", hiddenOnClickOutside, true);
    const prevDate = format(subDays(new Date(), 180), 'yyyy-MM-dd');
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const prevDaysFromToday = obtainDaysOfReservation(prevDate, currentDate);
    setDisabledDates(prevDaysFromToday)
  }, []);

  //Esto es solo para una reserva, si quiero guardar muchas reservas, hay que hacer un array de estos objetos
  const obtainDaysOfReservation = (startDate, endDate) => {
    const s = startDate.split('-');
    const e = endDate.split('-');
    const reservedDays = eachDayOfInterval({
      start: new Date(parseInt(s[0]), parseInt(s[1]) - 1, parseInt(s[2])),
      end: new Date(parseInt(e[0]), parseInt(e[1]) - 1, parseInt(e[2]))
    });
    return [...reservedDays];
  }

  // hide dropdown on ESC press
  const hiddenOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // hide on outside click
  const hiddenOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleRangeChange = () => {
    setRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection"
      },
    ]);
  };


  return (
    <div className="calendarWrap">
      <input
        value={
          range[0]
            ? `${format(range[0].startDate, "dd-MM-yyyy")} a ${format(
              range[0].endDate,
              "dd/MM/yyyy"
            )}`
            : ""
        }
        readOnly
        className="inputBox"
        placeholder="Busquemos por fecha"
        onClick={() => {
          handleRangeChange();
          setOpen((open) => !open);
        }}
      />
      {open && (
        <div className="plc-calendar-container" ref={refOne}>
          <DateRange
            onChange={(item) => {
              setRange([item.selection]);
              const start = format(item.selection.startDate, "yyyy-MM-dd");
              setStartDateFilter(start);
              const end = format(item.selection.endDate, "yyyy-MM-dd");
              setEndDateFilter(end);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={['#f0572d', '#f0572d']}
            disabledDates={disabledDates}
            months={2}
            direction={dimensions.width > 548 ? "horizontal" : "vertical"}
            className="plc-calendar-element"
            locale={locales.es}
          />

          <button
            onClick={() => setOpen(false)}
            className="plc-button-calendar"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
