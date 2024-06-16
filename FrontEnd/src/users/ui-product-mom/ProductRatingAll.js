import React, { useState } from 'react';
import './ProductRatingAll.css';
import ReactStars from 'react-rating-stars-component';

const initialRatings = [
    { name: 'Quynh Hong', date: '2024-06-13T17:34:00', rating: 5, text: "Excellent product!" },
    { name: 'Nguyễn Na', date: '2024-06-13T12:16:00', rating: 4, text: "Very good, highly recommend!" },
    { name: 'Minh Trang', date: '2024-06-12T10:20:00', rating: 4, text: "Good quality." },
    { name: 'Thanh Tâm', date: '2024-06-11T15:50:00', rating: 3, text: "Really liked it." },
    { name: 'Hồng Anh', date: '2024-06-10T09:30:00', rating: 2, text: "Superb experience." },
    { name: 'Lan Hương', date: '2024-06-09T18:25:00', rating: 1, text: "Nice, but can be improved." },
    { name: 'Mai Phương', date: '2024-06-08T14:15:00', rating: 2, text: "Average product." },
    { name: 'Bảo Ngọc', date: '2024-06-07T20:45:00', rating: 1, text: "Loved it!" },
    { name: 'Văn Sơn', date: '2024-06-06T12:00:00', rating: 2, text: "Good value for money." },
    { name: 'Thu Trang', date: '2024-06-05T16:50:00', rating: 4, text: "Would buy again." },
];

const ProductRatingAll = () => {
    const [ratings, setRatings] = useState(initialRatings);
    const [visibleCount, setVisibleCount] = useState(2);
    const [sortOrder, setSortOrder] = useState('newest');
    const [filterStars, setFilterStars] = useState(null);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleFilter = (stars) => {
        setFilterStars(stars);
    };

    const filteredRatings = filterStars !== null
        ? ratings.filter(r => Math.floor(r.rating) === filterStars)
        : ratings;

    const sortedRatings = filteredRatings.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (sortOrder === 'newest') {
            return dateB - dateA;
        }
        return dateA - dateB;
    });

    const visibleRatings = sortedRatings.slice(0, visibleCount);

    const averageRating = (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1);

    const renderStars = (count) => {
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < count ? 'filled' : ''}`}>&#9733;</span>
                ))}
            </div>
        );
    };

    return (
        <div className="product-rating-container-thinhrt">
            <div className="rating-summary-thinhrt">
                <div className="rating-score-thinhrt">
                    <span className="rating-number-thinhrt">{averageRating}</span>
                    <span className="rating-max-thinhrt">/5.0</span>
                </div>
                <div className="rating-stars-thinhrt">
                    <ReactStars
                        count={5}
                        value={Number(averageRating)}
                        size={24}
                        edit={false}
                        isHalf={true}
                        activeColor="#fc6b00"
                    />
                </div>
                <div className="rating-count-thinhrt">Có {ratings.length} lượt đánh giá</div>
                <div className="rating-filters-thinhrt">
                    <button
                        className={`filter-btn-thinhrt ${sortOrder === 'newest' ? 'active' : ''}`}
                        onClick={() => handleSort('newest')}
                    >Mới nhất</button>
                    <button
                        className={`filter-btn-thinhrt ${sortOrder === 'oldest' ? 'active' : ''}`}
                        onClick={() => handleSort('oldest')}
                    >Cũ nhất</button>
                </div>
                <div className="rating-breakdown-thinhrt">
                    {[5, 4, 3, 2, 1].map(star => (
                        <button
                            key={star}
                            className={`star-filter-thinhrt ${filterStars === star ? 'active' : ''}`}
                            onClick={() => handleFilter(star)}
                        >
                            {star} &#9733;
                        </button>
                    ))}
                </div>
            </div>
            <div className="rating-list-thinhrt">
                {visibleRatings.map((rating, index) => (
                    <div key={index} className="rating-item-thinhrt">
                        <div className="rating-avatar-thinhrt">{rating.name.charAt(0)}</div>
                        <div className="rating-details-thinhrt">
                            <div className="rating-name-thinhrt">{rating.name}</div>
                            <div className="rating-stars-thinhrt1">
                                {renderStars(rating.rating)}
                            </div>
                            <div className="rating-date-thinhrt">{rating.date}</div>
                            <div className="rating-text-thinhrt">{rating.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < filteredRatings.length && (
                <div className="rating-more-thinhrt">
                    <span>Còn <>{filteredRatings.length - visibleCount} </>đánh giá khác, </span>
                    <button onClick={handleShowMore}>Bấm vào để xem</button>
                </div>
            )}
        </div>
    );
}

export default ProductRatingAll;
