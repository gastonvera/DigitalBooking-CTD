import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './StarRating.css';
import { giveScore } from "../../services/score.service"

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"))

  const handelClick = (ratingValue) => {
    setRating(ratingValue)
    giveScore(ratingValue, user.id, productId, user.tokenJwt)
    console.log(ratingValue, user.id, productId, user.tokenJwt)
  }



  return (
    <div >
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name='rating'
              className='gv-input-radio'
              value={ratingValue}
              onClick={() => handelClick(ratingValue)} />
            <FontAwesomeIcon
              icon={faStar}
              className='gv-icon-star-rating'
              color={ratingValue <= (hover || rating) ? "#fff" : "#31363f"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)} />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating;