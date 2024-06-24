import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductRatingAll.css';

const ProductRatingAll = ({ productId }) => {
    const [ratings, setRatings] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2);
    const [sortOrder, setSortOrder] = useState('newest');
    const [filterStars, setFilterStars] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/comment/getCommentByProductID/${productId}`);
                const fetchedRatings = response.data.data.map(comment => ({
                    name: comment.UserName,
                    date: new Date(comment.CommentDate).toLocaleDateString(),
                    rating: comment.Rating,
                    text: comment.Description,
                    rep: comment.Rep,
                    repDate: new Date(comment.RepDate).toLocaleDateString(),
                    staffName: comment.StaffName,
                }));
                setRatings(fetchedRatings);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [productId]);

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

    const averageRating = (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length || 0).toFixed(1);

    const renderStars = (count) => {
        const roundedCount = Math.round(count);
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < roundedCount ? 'filled' : ''}`}>&#9733;</span>
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
                    {renderStars(Math.round(averageRating))}
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
                    <React.Fragment key={index}>
                        <div className="rating-item-thinhrt">
                            <div className="rating-avatar-thinhrt">{rating.name.charAt(0)}</div>
                            <div className="rating-details-thinhrt">
                                <div className="rating-name-thinhrt">{rating.name}</div>
                                <div className="rating-stars-thinhrt1">
                                    {renderStars(rating.rating)}
                                </div>
                                <div className="rating-text-thinhrt">{rating.text}</div>
                                <div className="rating-date-thinhrt">{rating.date}</div>
                            </div>
                        </div>
                        {rating.rep && (
                            <div className="rep-container-thinhrt">
                                <div className="rep-avatar-thinhrt">{rating.staffName.charAt(0)}</div>
                                <div className="rep-details-thinhrt">
                                    <div className="rep-name-thinhrt">
                                        <span className="rep-title-thinhrt">{rating.staffName}</span>
                                        <span className="rep-tag-thinhrt">Quản trị viên</span>
                                    </div>
                                    <div className="rep-text-thinhrt">{rating.rep}</div>
                                    <div className="rep-date-thinhrt">{rating.repDate}</div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            {visibleCount < filteredRatings.length && (
                <div className="rating-more-thinhrt">
                    <span>Còn {filteredRatings.length - visibleCount} đánh giá khác, </span>
                    <button onClick={handleShowMore}>Bấm vào để xem</button>
                </div>
            )}
        </div>
    );
}

export default ProductRatingAll;
