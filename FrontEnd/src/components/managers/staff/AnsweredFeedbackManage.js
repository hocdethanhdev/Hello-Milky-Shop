import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./FeedbackManage.css";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { useSelector } from "react-redux";
import Notification from "../../users/product/ui-product-mom/Notification";

const AnsweredFeedbackManage = () => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    const commentsPerPage = 10;

    useEffect(() => {
        fetchComments();
    }, [currentPage]);

    const fetchComments = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/comment/getAnsweredComments?page=${currentPage}&limit=${commentsPerPage}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }
            const data = await response.json();
            if (!Array.isArray(data.data)) {
                throw new Error("Comments data is not an array");
            }
            setComments(data.data); // access the 'data' property
            setTotalComments(data.data.length);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setComments([]);
            setTotalComments(0);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="feedback-manage-thinh-cmt">
            <div className="comments-section-thinh-cmt">
                {comments.map((comment) => (
                    <Comment key={comment.CommentID} comment={comment} />
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
                                    {comment.StaffName} <span className="rep-tag-thinhrt">Quản trị viên</span>
                                </div>
                                <div className="reply-content-thinh-cmt">
                                    {comment.Rep}
                                </div>
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

export default AnsweredFeedbackManage;
