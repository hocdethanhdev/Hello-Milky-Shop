import "./ProductRating.css";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ProductRating() {
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);

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
                return "Tuyệt cmn vời";
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
            case 3:
            case 4:
                return "Bạn có vấn đề gì về sản phẩm";
            case 5:
                return "Tại sao bạn thích nó?";
            default:
                return "Bình luận..";
        }
    };

    return (
        <div className="ProductRating-thinh-rt">
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
                <textarea placeholder={handlePlaceHolder()}></textarea>

                <button className={`submit-btn-thinh-rt ${!number && "disabled"} `}>Gửi</button>
            </div>
        </div>
    );
}
