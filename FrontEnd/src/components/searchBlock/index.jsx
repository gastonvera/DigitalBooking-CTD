import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import DateRangeCalendar from "./DateRangeCalendar";
import SearchInput from "./SearchInput"
import "./index.css";
import getCities from "../../services/cities.service";
import { FilterContext } from "../../context/FilterProvider";


export default function SearchBlock() {
  const [housesTable, setHousesTable] = useState([]); //dynmic search
  const [houses, setHouses] = useState([]); //static search
  const [search, setSearch] = useState(""); //search fingering control
  const [range, setRange] = useState([]); //date state


  const [cityFilter, setCityFilter] = useState("any");
  const [endDateFilter, setEndDateFilter] = useState("any");
  const [startDateFilter, setStartDateFilter] = useState("any");
  

  const {handleChangeFilters} = useContext(FilterContext);

  useEffect(()=>{
    handleChangeFilters(
      {
        city: cityFilter,
        startDate: startDateFilter,
        endDate: endDateFilter
      }
    )
  }, [cityFilter, startDateFilter, endDateFilter])

  const handleClearCity = () => {
    setCityFilter("any");
    setSearch("");
    citiesUpdate();
  }

  const citiesUpdate = () => {
    getCities().then((res) => {
      setHouses(res)
      setHousesTable(res);
      return res
    });
  }

  const handleClearRange = () => {
    setEndDateFilter("any");
    setStartDateFilter("any");
    setRange([]);
  }

  return (
    <div className="plc-search-block">
      <div className="uncSearch">
        <h1 className="plc-title-search-block">
          Busca ofertas de casas, locales y mucho más
        </h1>
        <form className="plc-form-search-block">
          <div className="plc-input-container">
            <FontAwesomeIcon className="icon" icon={faLocationDot} />
            <SearchInput setCityFilter={setCityFilter} cityFilter={cityFilter} search={search} setSearch={setSearch} citiesUpdate={citiesUpdate} houses={houses} setHouses={setHouses} housesTable={housesTable} setHousesTable={setHousesTable} />
            <FontAwesomeIcon className="gv-x-icon-in-city" icon={faXmark} onClick={handleClearCity} />
          </div>
          <div className="plc-input-container">
            <FontAwesomeIcon
              className="icon plc-calendar-icon"
              icon={faCalendarDays}
            />
            <DateRangeCalendar setEndDateFilter={setEndDateFilter} setStartDateFilter={setStartDateFilter} range={range} setRange={setRange} />
            <FontAwesomeIcon className="gv-x-icon-in-search" icon={faXmark} onClick={handleClearRange} />
          </div>
          <Link to={`/search/city/${cityFilter}/startDate/${startDateFilter}/endDate/${endDateFilter}`}
            className="plc-submit-search-block"
            style={{ pointerEvents: ((cityFilter !== "any" && cityFilter) || (startDateFilter !== "any" && endDateFilter !== "any")) ? "auto" : "none" }}>
            Buscar
          </Link>
        </form>
      </div>
    </div>
  );
}
