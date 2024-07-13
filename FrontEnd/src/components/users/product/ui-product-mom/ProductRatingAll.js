import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./ProductRatingAll.css";
import { useTranslation } from 'react-i18next';

const ProductRatingAll = ({ ratings }) => {
  const [visibleCount, setVisibleCount] = useState(2);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStars, setFilterStars] = useState(null);
  const { t } = useTranslation();

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (stars) => {
    setFilterStars(stars);
  };

  const filteredRatings =
    filterStars !== null
      ? ratings.filter((r) => Math.floor(r.rating) === filterStars)
      : ratings;

  const sortedRatings = filteredRatings.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === "newest") {
      return dateB - dateA;
    }
    return dateA - dateB;
  });

  const visibleRatings = sortedRatings.slice(0, visibleCount);

  const averageRating = (
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length || 0
  ).toFixed(1);

  const renderStars = (count) => {
    const roundedCount = Math.round(count);
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < roundedCount ? "filled" : ""}`}>
            &#9733;
          </span>
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
        <div className="rating-count-thinhrt">
        {t('have')} {ratings.length} {t('reviews')}
        </div>
        <div className="rating-filters-thinhrt">
          <button
            className={`filter-btn-thinhrt ${sortOrder === "newest" ? "active" : ""
              }`}
            onClick={() => handleSort("newest")}
          >
           {t('newest')}
          </button>
          <button
            className={`filter-btn-thinhrt ${sortOrder === "oldest" ? "active" : ""
              }`}
            onClick={() => handleSort("oldest")}
          >
            {t('oldest')}
          </button>
        </div>
        <div className="rating-breakdown-thinhrt">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className={`star-filter-thinhrt ${filterStars === star ? "active" : ""
                }`}
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
              <div className="rating-avatar-thinhrt">
                {rating.name.charAt(0)}
              </div>
              <div className="rating-details-thinhrt">
                <div className="rating-name-thinhrt">{rating.name}</div>
                <div className="rating-stars-thinhrt1">
                  {renderStars(rating.rating)}
                </div>
                <div className="rating-text-thinhrt">{rating.text}</div>
                <div className="rating-date-thinhrt">{new Date(rating.date).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}</div>
              </div>
            </div>
            {rating.rep && (
              <div className="rep-container-thinhrt">
                <div className="rep-avatar-thinhrt">
                  {rating.staffName.charAt(0)}
                </div>
                <div className="rep-details-thinhrt">
                  <div className="rep-name-thinhrt">
                    <span className="rep-title-thinhrt">
                      {rating.staffName}
                    </span>
                    <span className="rep-tag-thinhrt">{t('administrators')}</span>
                  </div>
                  <div className="rep-text-thinhrt">{rating.rep}</div>
                  <div className="rep-date-thinhrt">{new Date(rating.repDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}</div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {visibleCount < filteredRatings.length && (
        <div className="rating-more-thinhrt">
          <span>
            Còn {filteredRatings.length - visibleCount} {t('otherReviews')},{" "}
          </span>
          <button onClick={handleShowMore}>{t('clickToView')}</button>
        </div>
      )}
    </div>
  );
};

ProductRatingAll.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rep: PropTypes.string,
      repDate: PropTypes.string,
      staffName: PropTypes.string,
    })
  ).isRequired,
};

export default ProductRatingAll;
