import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import "./ProductRating.css";
import Notification from "./Notification"; // Import the Notification component

export default function ProductRating({ productID, userID, fetchComments, setRatingCount }) { // Thêm fetchComments vào props
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification

    const handleText = () => {
        switch (number || hoverStar) {
            case 0:
                return "Rất tệ";
            case 1:
                return "Tệ";
            case 2:
                return "Hàng kém";
            case 3:
                return "Ổn";
            case 4:
                return "Khá tốt";
            case 5:
                return "Tuyệt vời";
            default:
                return "Đánh giá";
        }
    };

    const handlePlaceHolder = () => {
        switch (number || hoverStar) {
            case 0:
                return "Bình luận..";
            case 1:
            case 2:
                return "Bạn có vấn đề gì về sản phẩm";
            case 3:
            case 4:
                return "Bạn cảm thấy sản phẩm như thế nào";
            case 5:
                return "Tại sao bạn thích nó?";
            default:
                return "Bình luận..";
        }
    };

    const handleSubmit = async () => {
        if (number > 0 && description) {
            setIsSubmitting(true);
            try {
                const response = await axios.post("http://localhost:5000/api/v1/comment/userComment", {
                    UserID: userID,
                    ProductID: productID,
                    Rating: parseInt(number),
                    Description: description,
                });
                setIsSubmitting(false);
                setNotification("Bình Luận Thành Công!");
                setNumber(0);
                setDescription("");
                fetchComments();
                setRatingCount(prevCount => prevCount - 1);
            } catch (error) {
                console.error("Error submitting review:", error);
                setIsSubmitting(false);
            }
        }
    };

    const clearNotification = () => {
        setNotification(null);
    };

    return (
        <div className="ProductRating-thinh-rt">
            {notification && <Notification message={notification} clearNotification={clearNotification} time={2000} />}
            <div className="content-thinh-rt">
                <div>
                    <h1>{handleText()}</h1>
                    {Array(5)
                        .fill()
                        .map((_, index) =>
                            number >= index + 1 || hoverStar >= index + 1 ? (
                                <AiFillStar
                                    key={index}
                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                    onMouseLeave={() => setHoverStar(undefined)}
                                    style={{ color: "orange" }}
                                    onClick={() => setNumber(index + 1)}
                                />
                            ) : (
                                <AiOutlineStar
                                    key={index}
                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                    onMouseLeave={() => setHoverStar(undefined)}
                                    style={{ color: "orange" }}
                                    onClick={() => setNumber(index + 1)}
                                />
                            )
                        )}
                </div>
                <textarea
                    placeholder={handlePlaceHolder()}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button
                    className={`submit-btn-thinh-rt ${!number ? "disabled" : ""}`}
                    onClick={handleSubmit}
                    disabled={!number || isSubmitting}
                >
                    {isSubmitting ? "Đang gửi..." : "Gửi"}
                </button>
            </div>
        </div>
    );
}
