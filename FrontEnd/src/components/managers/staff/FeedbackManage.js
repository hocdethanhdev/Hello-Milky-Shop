import React, { useEffect, useState } from "react";
import { Pagination, Select, message } from "antd";
import PropTypes from "prop-types";
import "./FeedbackManage.css";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { useSelector } from "react-redux";
import { config } from "../../../config";

const { Option } = Select;

const FeedbackManage = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [filterProductType, setFilterProductType] = useState("all");
  const [filterCommentID, setFilterCommentID] = useState("all");
  const commentsPerPage = 5;
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    fetchComments();
  });

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${config.API_ROOT}/api/v1/comment/getUnansweredComments?page=${currentPage}&limit=${commentsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      if (!Array.isArray(data.data)) {
        throw new Error("Comments data is not an array");
      }
      let filteredComments = data.data;
      if (filterProductType !== "all") {
        filteredComments = filteredComments.filter(comment =>
          comment.ProductID.includes(filterProductType)
        );

      }

      if (filterCommentID === "newest") {
        filteredComments.sort((a, b) => b.CommentID - a.CommentID);
      } else if (filterCommentID === "oldest") {
        filteredComments.sort((a, b) => a.CommentID - b.CommentID);
      }
      setComments(filteredComments);
      setTotalComments(filterCommentID.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
      setTotalComments(0);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCommentSubmit = async (commentId, rep) => {
    try {
      const response = await fetch(
        `${config.API_ROOT}/api/v1/comment/repComment/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserID: userId,
            Rep: rep,
          }),
        }
      );

      if (response.ok) {
        message.success("Gửi bình luận thành công!");
        fetchComments();
      }
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const handleFilterProductTypeChange = (value) => {
    setFilterProductType(value);
  };

  const handleFilterCommentIDChange = (value) => {
    setFilterCommentID(value);
  };

  return (
    <div className="feedback-manage-thinh-cmt">
      <div className="filters-section-thinh-cmt">
        <Select
          value={filterProductType}
          onChange={handleFilterProductTypeChange}
          style={{ width: 200 }}
        >
          <Option value="all">Tất cả</Option>
          <Option value="SM">Sữa cho mẹ bầu</Option>
          <Option value="SE">Sữa cho em bé</Option>
        </Select>
        <Select
          value={filterCommentID}
          onChange={handleFilterCommentIDChange}
          style={{ width: 200, marginLeft: 10 }}
        >
          <Option value="all">Tất cả</Option>
          <Option value="newest">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
        </Select>
      </div>
      <div className="comments-section-thinh-cmt">
        {comments.map((comment) => (
          <Comment
            key={comment.CommentID}
            comment={comment}
            onSubmit={handleCommentSubmit}
          />
        ))}
        <div className="chuyen-trang-fb">
          <ThrowPage
            current={currentPage}
            onChange={handlePageChange}
            total={totalComments}
            productsPerPage={commentsPerPage}
          />
        </div>
      </div>
    </div>
  );
};



const Comment = ({ comment, onSubmit }) => {
  const [product, setProduct] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${config.API_ROOT}/api/v1/product/getProductInforID/${comment.ProductID}`
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

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    onSubmit(comment.CommentID, reply);
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
                  {" "}
                  {renderStars(comment.Rating)}
                </span>
              </div>
              <div className="comment-content-thinh-cmt">
                {comment.Description}
              </div>
              <div className="time-thinh-cmt">
                {new Date(comment.CommentDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="new-comment-section-thinh-cmt">
            <textarea
              placeholder="Nhập bình luận..."
              maxLength={3000}
              value={reply}
              onChange={handleReplyChange}
            />
            <button onClick={handleReplySubmit} disabled={!reply}>
              Gửi
            </button>
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
  comment: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const ThrowPage = ({ current, onChange, total, productsPerPage }) => {
  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    onChange(page);
  };

  return (
    <Pagination
      current={current}
      onChange={handlePageChange}
      total={total}
      pageSize={productsPerPage}
    />
  );
};

ThrowPage.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  productsPerPage: PropTypes.number.isRequired,
};

export default FeedbackManage;
