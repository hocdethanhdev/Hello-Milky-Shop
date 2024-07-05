import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import "./StarRating.css";
import config from "../../../config/config";

const StarRating = ({ productId }) => {
    const [ratingData, setRatingData] = useState({ count: 0, avg: 0 });

    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const response = await axios.get(`${config.API_ROOT}/api/v1/comment/countRatingAndAvgRating/${productId}`);
                const data = response.data;
                if (data.err === 0) {
                    setRatingData({ count: data.count, avg: data.avg });
                }
            } catch (error) {
                console.error('Error fetching rating data:', error);
            }
        };

        fetchRatingData();
    }, [productId]);

    const fullStars = Math.floor(ratingData.avg);
    const fractionalPart = ratingData.avg % 1;
    let hasHalfStar = 0;
    if (fractionalPart >= 0.5) {
        hasHalfStar = 1;
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className='hangsao-thinh'>
            <div className='sao-thinh-render'>
                {'★'.repeat(fullStars)}
                {hasHalfStar ? '★' : ''}
                {'☆'.repeat(emptyStars)}
            </div>
            <p className='psao'>({ratingData.count})</p>
        </div>
    );
};

// Define prop types
StarRating.propTypes = {
    productId: PropTypes.string.isRequired, // Ensure productId is a required number
};

export default StarRating;
