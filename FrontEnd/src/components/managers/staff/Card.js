import React from 'react';
import PropTypes from 'prop-types';

function Card({ title, value }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Card;
