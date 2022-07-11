import React from "react";
//fontwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Pager = ({ maxPag, setPag, pag }) => {
  const nextPage = () => {
    setPag(pag + 1);
  };

  const previousPage = () => {
    setPag(pag - 1);
  };

  return (
    <div className="pag-change">
      <button
        className="btn-pag"
        disabled={pag === 1 || pag < 1}
        onClick={previousPage}
      >
        <FontAwesomeIcon icon={faCircleChevronLeft} />
      </button>
        <p>{pag}</p>
        <p><span>de</span>{Math.ceil(maxPag)}</p>
      <button
        className="btn-pag"
        disabled={pag === maxPag || pag > maxPag}
        onClick={nextPage}
      >
        <FontAwesomeIcon icon={faCircleChevronRight} />
      </button>
    </div>
  );
};

export default Pager;
