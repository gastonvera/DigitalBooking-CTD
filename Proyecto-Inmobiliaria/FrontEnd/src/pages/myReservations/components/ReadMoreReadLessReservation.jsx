import React, { useState } from 'react';
import './readMoreReadLessReservation.css';
import useWindowDimensions from '../../../hooks/useWindowDimension';



const ReadMoreReadLessReservation = ({ text }) => {
  const [showMore, setShowMore] = useState(false);
  const dimensions = useWindowDimensions();

  const handleShowMore = () => {
    setShowMore(!showMore);
  }

  return (
    <div className='plc-description-container-reservation'>
      <p id='plc-p-description'>
        {
          dimensions.width > 799 ? showMore ? text : text.join(" ").substring(0, 600) :
            dimensions.width > 475 ?  showMore ? text : text.join(" ").substring(0, 400) :
            showMore ? text : text.join(" ").substring(0, 240)
        } 
        
        <span onClick={handleShowMore}>{showMore ? "..ver menos" : "..ver mas"}</span>
      </p>
    </div>
  )
}

export default ReadMoreReadLessReservation;