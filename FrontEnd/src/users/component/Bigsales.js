import React, { useState, useEffect } from "react";
import "./Bigsales.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import NavCate from "../ui-product-mom/NavCate";

const fetchPromotions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/promotion/getPormotionByDate");
    if (!response.ok) {
      throw new Error("Failed to fetch promotions");
    }
    const data = await response.json();
    return data.map(promo => ({
      id: promo.PromotionID,
      title: promo.PromotionName,
      description: promo.Description,
      discount: promo.DiscountPercentage,
      startDate: new Date(promo.StartDate).toLocaleDateString(),
      endDate: new Date(promo.EndDate).toLocaleDateString(),
      imageUrl: "https://via.placeholder.com/768x399?text=Promotion+Image",
      link: `/dealsoc/${promo.PromotionID}`,
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return [];
  }
};

function Bigsales() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promotionsData = await fetchPromotions();
      setPromotions(promotionsData);
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="box-banner">
      <NavCate />
      <div className="main-banner">
        <Slider {...settings}>
          {promotions.map(promo => (
            <div key={promo.id}>
              <Link to={promo.link} className="imgbanner">
                <img src={promo.imageUrl} alt="banner" className="imgbanner" />
              </Link>
              <div className="tgkm-promo night">
                Thời gian khuyến mại: <b>{promo.startDate} - {promo.endDate}</b>
              </div>
              <div className="promo-description">
                {promo.description} - Giảm đến {promo.discount}%
              </div>
            </div>
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
      style={{ ...style, display: "block", right: "-25px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-25px" }}
      onClick={onClick}
    />
  );
}

export default Bigsales;
