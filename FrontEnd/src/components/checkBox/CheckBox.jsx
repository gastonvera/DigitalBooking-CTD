import React, {useState} from 'react';
import "./Checkbox.css";

const CheckBox = ({title, value, uniqueKey, checked}) => {

    return(
        <div className='gv-checkbox-container' key={uniqueKey}>
            <label className='gv-checkbox-label' >
                <input type="checkbox" className='gv-checkbox-input' value={value} defaultChecked={checked} checked={checked}/>
                <span className='gv-checkbox-span'></span>
            </label>
            <p>{title}</p>
        </div>
    )
}

export default CheckBox;