import React, { useState } from 'react';
import './ReadMoreReadLess.css';

const ReadMoreReadLess = ({ text }) => {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className='gv-description-container'>
            <p>
                {showMore ? text : text.join(" ").substring(0, 130)} <span onClick={handleShowMore}>{showMore ? "..ver menos" : "..ver mas"}</span>
            </p>
        </div>
    )
}

export default ReadMoreReadLess;