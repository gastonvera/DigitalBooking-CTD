import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./SearchInput.css" 
import {useLocation} from "react-router-dom";


export default function SearchInput({ setCityFilter, search, setSearch, citiesUpdate, houses, setHouses, housesTable}) {
  const [open, setOpen] = useState(false); // display control
  const refOne = useRef(null);
  const location = useLocation();

  useEffect(() => {
    citiesUpdate()
  }, []);


  const handleChange = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
    setCityFilter(e.target.value);
    if(!e.target.value){
      setCityFilter("any");
    }
  };

  const handleSearchClick = (e) => {
    console.log(e)
    setSearch(e.target.childNodes[0].textContent);
    filter(e.target.childNodes[0].textContent);
    setOpen(false);
    setCityFilter(e.target.childNodes[0].textContent);
  };

  const filter = (textToSearch) => {
    var searchResult = housesTable.filter((element) => {
      if (
        element.name
          .toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase())
      ) {
        return element;
      }
    });
    setHouses(searchResult);
  };

  const hiddenOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const hiddenOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {

    document.addEventListener("keydown", hiddenOnEscape, true)
    document.addEventListener("click", hiddenOnClickOutside, true)
  }, []);


  return (
    <>
      <input
        type="text"
        className="plc-input-text-search-block"
        placeholder="¿A dónde buscamos?"
        name="plc-id-property-type-search-block"
        id="plc-id-property-type-search-block"
        onChange={handleChange}
        value={search}
        onClick={() => setOpen(open => !open)}
      />
      {
        open && (
          <ul className="plc-house-input-search-display-list" ref={refOne}>
            {houses.map((element, i) => {

              if (i < 5) {
                return (
                  <li key={i + 1}>
                    <div className="inputSearchDisplayLocationContainer">
                      <FontAwesomeIcon
                        className="plc-input-search-display-icon"
                        icon={faLocationDot}
                      />
                      <div>
                        <p
                          onClick={handleSearchClick}
                          className="plc-search-display-paragraph-location"
                        >
                          {element.name} <br />{" "}
                          <span>{element.province} - {element.country} </span>
                        </p>
                      </div>
                    </div>
                    {i < 4 && houses.length - 1 > i && <hr />}
                  </li>
                );
              }
            })}
          </ul>
        )
      }
    </>
  )
}