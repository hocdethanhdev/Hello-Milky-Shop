import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VoucherStore.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";

function VoucherItem({ voucher }) {
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);
  const saveVoucherForUser = () => {
    const requestBody = {
      userID: userIdd, // Replace with actual user ID logic
      voucherID: voucher.VoucherID,
    };

    axios
      .post(
        "http://localhost:5000/api/v1/voucher/saveVoucherForUser",
        requestBody
      )
      .then((response) => {
        alert("Voucher saved successfully!");
        window.location.reload();
        // Handle success if needed
      })
      .catch((error) => {
        console.error("Error saving voucher:", error);
        // Handle error if needed
      });
  };

  return (
    <div className="tri-voucher">
      <div className="voucher" onClick={saveVoucherForUser}>
        <div className="voucher-body bg-orange-gradient">
          <div className="voucher-text">
            <h5 className="text-white mb-0 font-weight-bold">
              {voucher.VoucherName}
            </h5>
            <p className="text-white mb-0" style={{ lineHeight: 1 }}>
              <strong style={{ fontSize: "1.5rem" }}>
                {voucher.DiscountPercentage} %
              </strong>
            </p>
          </div>
          <div className="voucher-overlay d-none">
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>

          <div className="voucher-border-left"></div>
          <div className="voucher-border-right"></div>
        </div>
        <div className="voucher-footer">
          <div className="voucher-details-1">
            <div className="details-icon">
              {/* Icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffefed"
                  d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5"
                />
                <path
                  fill="#ff4933"
                  d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,3.5c-4.7,0-8.5,3.8-8.5,8.5 s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                />
                <path
                  fill="#ff4933"
                  d="M12.7,5.5c0-0.4-0.3-0.8-0.7-0.8s-0.7,0.3-0.7,0.8v7.2c0,0.4,0.3,0.8,0.7,0.8h5.8c0.4,0,0.7-0.3,0.7-0.8 s-0.3-0.8-0.7-0.8h-5.1V5.5z"
                />
              </svg>
            </div>
            <div className="details-text">
              <div className="text-title">Ngày bắt đầu</div>
              <div className="text-description text-primary">
                {new Date(voucher.StartDate).toLocaleDateString()}
              </div>
            </div>
            <div className="details-text">
            <div className="details-icon">
              {/* Icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffefed"
                  d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5"
                />
                <path
                  fill="#ff4933"
                  d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,3.5c-4.7,0-8.5,3.8-8.5,8.5 s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                />
                <path
                  fill="#ff4933"
                  d="M12.7,5.5c0-0.4-0.3-0.8-0.7-0.8s-0.7,0.3-0.7,0.8v7.2c0,0.4,0.3,0.8,0.7,0.8h5.8c0.4,0,0.7-0.3,0.7-0.8 s-0.3-0.8-0.7-0.8h-5.1V5.5z"
                />
              </svg>
            </div> <div className="details-icon">
              {/* Icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffefed"
                  d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5"
                />
                <path
                  fill="#ff4933"
                  d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,3.5c-4.7,0-8.5,3.8-8.5,8.5 s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                />
                <path
                  fill="#ff4933"
                  d="M12.7,5.5c0-0.4-0.3-0.8-0.7-0.8s-0.7,0.3-0.7,0.8v7.2c0,0.4,0.3,0.8,0.7,0.8h5.8c0.4,0,0.7-0.3,0.7-0.8 s-0.3-0.8-0.7-0.8h-5.1V5.5z"
                />
              </svg>
            </div>
              <div className="text-title">Ngày hết hạn</div>
              <div className="text-description text-primary">
                {new Date(voucher.ExpiryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="nhandan">
            <div className="voucher-details">
              <div className="details-text">
                <div className="text-title">Đơn tối thiểu</div>
                <div className="text-description-gia text-primary">
                  {voucher.MinDiscount}đ
                </div>
              </div>
            </div>
            <div className="voucher-details">
              <div className="details-text">
                <div className="text-title">Giảm tối đa</div>
                <div className="text-description-gia text-primary">
                  {voucher.MaxDiscount}đ
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function VoucherStore() {
  const [vouchers, setVouchers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v1/voucher/getVouchersForUser", {
        UserID: userIdd,
      })
      .then((response) => {
        setVouchers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the vouchers!", error);
      });
  }, [userIdd]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

  };

  return (
    <div className="voucher-store">
      <h1>Voucher</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {vouchers.map((voucher) => (
            <VoucherItem key={voucher.VoucherID} voucher={voucher} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-100px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-40px" }}
      onClick={onClick}
    />
  );
}

export default VoucherStore;
