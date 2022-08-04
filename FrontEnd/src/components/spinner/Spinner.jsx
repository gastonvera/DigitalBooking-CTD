import React from 'react';
import "./Spinner.css";

const Spinner = (props) => {
    return (
        <div className='gv-spinner-container' style={{height: `${props.height}`}}>
            <span className='gv-loader'></span>
        </div>
    )
}

export default Spinner;