import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [comment.ProductID]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/getProductInforID/${comment.ProductID}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getInitial = (name) => name.charAt(0).toUpperCase();
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
    <div className="comment-thinh-cmt">
      <div className="comment-thinh-fl">
        <div className="bl-rep">
          <div className="comment-header-thinh-cmt">
            <div className="initial-thinh-cmt">
              {getInitial(comment.UserName)}
            </div>
            <div className="details-thinh-cmt">
              <div className="name-and-stars-thinh-cmt">
                <span className="name-thinh-cmt">{comment.UserName}</span>
                <span className="stars-thinh-cmt">
                  {renderStars(comment.Rating)}
                </span>
              </div>
              <div className="comment-content-thinh-cmt">
                {comment.Description}
              </div>
              <div className="time-thinh-cmt">
                {new Date(comment.CommentDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="staff-reply-section-thinh-cmt">
            <div className="rep-container-thinhrt">
              <div className="initial-thinh-cmt">
                {getInitial(comment.StaffName)}
              </div>
              <div className="details-thinh-cmt">
                <div className="rep-title-thinhrt">
                  {comment.StaffName}{" "}
                  <span className="rep-tag-thinhrt">Quản trị viên</span>
                </div>
                <div className="reply-content-thinh-cmt">{comment.Rep}</div>
                <div className="time-thinh-cmt">
                  {new Date(comment.RepDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {product && (
          <div className="product-info-thinh-cmt">
            <img src={product[0].Image} alt={product[0].ProductName} />
            <div>
              <div className="product-name-thinh-cmt">
                {product[0].ProductName}
              </div>
              <div className="product-code-thinh-cmt">
                Mã SP: {comment.ProductID}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    CommentID: PropTypes.number.isRequired,
    ProductID: PropTypes.number.isRequired,
    UserName: PropTypes.string.isRequired,
    Rating: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    CommentDate: PropTypes.string.isRequired,
    StaffName: PropTypes.string.isRequired,
    Rep: PropTypes.string.isRequired,
    RepDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
