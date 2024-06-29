import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import './FeedbackManage.css';
import { getUserIdFromToken } from "../../store/actions/authAction";
import { useSelector } from "react-redux";
import Notification from '../../users/product/ui-product-mom/Notification';

const FeedbackManage = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [notification, setNotification] = useState(null);
  const commentsPerPage = 10;
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/comment/getUnansweredComments?page=${currentPage}&limit=${commentsPerPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      if (!Array.isArray(data.data)) {
        throw new Error('Comments data is not an array');
      }
      setComments(data.data); // access the 'data' property
      setTotalComments(data.data.length);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
      setTotalComments(0);
    }
  };



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCommentSubmit = async (commentId, rep) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/comment/repComment/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: userId,
          Rep: rep,
        }),
      });

      if (response.ok) {
        setNotification('Gửi bình luận thành công');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <div className="feedback-manage-thinh-cmt">
      <div className="comments-section-thinh-cmt">
        {comments.map(comment => (
          <Comment key={comment.CommentID} comment={comment} onSubmit={handleCommentSubmit} />
        ))}
      </div>
      <div className='chuyen-trang-fb'>
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={totalComments}
          productsPerPage={commentsPerPage}
        />
      </div>

      {notification && <Notification message={notification} />}
    </div>
  );
};

const Comment = ({ comment, onSubmit }) => {
  const [product, setProduct] = useState(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [comment.ProductID]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/product/getProductInforID/${comment.ProductID}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getInitial = (name) => name.charAt(0).toUpperCase();
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

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    onSubmit(comment.CommentID, reply);
  };

  return (
    <div className="comment-thinh-cmt">
      <div className='comment-thinh-fl'>
        <div className='bl-rep'>
          <div className="comment-header-thinh-cmt">
            <div className="initial-thinh-cmt">{getInitial(comment.UserName)}</div>
            <div className="details-thinh-cmt">
              <div className="name-and-stars-thinh-cmt">
                <span className="name-thinh-cmt">{comment.UserName}</span>
                <span className="stars-thinh-cmt"> {renderStars(comment.Rating)}</span>
              </div>
              <div className="comment-content-thinh-cmt">{comment.Description}</div>
              <div className="time-thinh-cmt">{new Date(comment.CommentDate).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="new-comment-section-thinh-cmt">
            <textarea
              placeholder="Nhập bình luận..."
              maxLength={3000}
              value={reply}
              onChange={handleReplyChange}
            />
            <button onClick={handleReplySubmit} disabled={!reply}>Gửi</button>
          </div>
        </div>
        {product && (
          <div className="product-info-thinh-cmt">
            <img src={product[0].Image} alt={product[0].ProductName} />
            <div>
              <div className="product-name-thinh-cmt">{product[0].ProductName}</div>
              <div className="product-code-thinh-cmt">Mã SP: {comment.ProductID}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ThrowPage = ({ current, onChange, total, productsPerPage }) => {
  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    onChange(page);
  };

  return <Pagination current={current} onChange={handlePageChange} total={total} pageSize={productsPerPage} />;
};

export default FeedbackManage;
