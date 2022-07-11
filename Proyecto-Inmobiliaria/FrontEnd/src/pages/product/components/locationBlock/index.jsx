import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import StarRating from '../../../../components/starRating/';
import './LocationBlock.css';
import Star from '../../../home/componenets/Start'

const LocationBlock = ({ data }) => {
  const [averageScore, setAverageScore] = useState(data.averageScore === null ? 0 : Math.round(data.averageScore * 10) / 10);
  const [scoreText, setScoreText] = useState('');
  const [distance, setDistance] = useState("");

  useEffect(() => {
    setAverageScore(data.averageScore === null ? 0 : Math.round(data.averageScore * 10) / 10);

    if (averageScore > 0 && averageScore < 2) {
      setScoreText('Mala');
    }
    else if (averageScore >= 2 && averageScore < 3) {
      setScoreText('Regular');
    } else if (averageScore >= 3 && averageScore < 4) {
      setScoreText('Buena');
    } else if (averageScore >= 4 && averageScore < 5) {
      setScoreText('Muy buena');
    } else if (averageScore === 5) {
      setScoreText('Excelente');
    } else {
      setScoreText('No hay calificaciones');
    }

    if (data.referencias > 1000) {
      setDistance(parseInt(data.referencias / 1000) + ' km');
    } else {
      setDistance(parseInt(data.referencias) + ' m');
    }
  }, [])

  return (
    <div className="gv-location-block-container">
      <div className="gv-location-legend">
        <FontAwesomeIcon icon={faLocationDot} className="gv-icon-location" />
        <div className='gv-location-text'>
          {data.cities && <p>{`${data.cities.province}, ${data.cities.name}, ${data.cities.country}`}</p>}
          {isNaN(data.referencias) ? null : <p>{`A ${distance} del centro`}</p>}
        </div>
      </div>
      <div className="gv-score-legend">
        <div className="gv-stars-and-text">
          <p>{scoreText}</p>
          <div>
            <Star averageScore={averageScore} />
          </div>
        </div>
        <span className="gv-score-average-number">{averageScore}</span>
      </div>
    </div>
  );
}

export default LocationBlock;