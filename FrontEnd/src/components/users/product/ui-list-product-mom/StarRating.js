
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./StarRating.css";
const StarRating = ({ productId }) => {
    const [ratingData, setRatingData] = useState({ count: 0, avg: 0 });

    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/comment/countRatingAndAvgRating/${productId}`);
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

    const roundedAvg = Math.round(ratingData.avg * 10) / 10;
    const fullStars = Math.floor(roundedAvg);
    const halfStar = (roundedAvg - fullStars) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className='hangsao-thinh'>
            <div className='sao-thinh-render'>
                {'★'.repeat(fullStars)}
                {'☆'.repeat(emptyStars)}
            </div>
            <p className='psao'>({ratingData.count})</p>
        </div>
    );
};

export default StarRating;
