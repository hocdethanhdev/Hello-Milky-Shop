import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './SliderMoney.css';
import PropTypes from 'prop-types'; // Import PropTypes

const SliderMoney = ({ min, max, step, onChange }) => {
    const [values, setValues] = useState([min, max]);

    const handleChange = (newValues) => {
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div className="slider-container">
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={min}
                max={max}
                step={step}
                value={values}
                onChange={handleChange}
                pearling
                minDistance={10}
            />
            <div className="slider-labels">
                <span>{values[0]}đ</span>
                <span>{values[1].toLocaleString()}đ</span>
            </div>
        </div>
    );
};

// Define prop types
SliderMoney.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SliderMoney;
