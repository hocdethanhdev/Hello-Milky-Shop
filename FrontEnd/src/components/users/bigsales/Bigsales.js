import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Bigsales.css";
import NavCate from "../product/ui-product-mom/NavCate";
import StarRating from "../product/ui-list-product-mom/StarRating";

const fetchPromotions = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/promotion/getPromotionByDate"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch promotions");
    }
    const data = await response.json();
    return data.map((promo) => ({
      id: promo.PromotionID,
      title: promo.PromotionName,
      description: promo.Description,
      discount: promo.DiscountPercentage,
      startDate: new Date(promo.StartDate).toLocaleDateString(),
      endDate: new Date(promo.EndDate).toLocaleDateString(),
      imageUrl: promo.Image,
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return [];
  }
};

const formatPrice = (price) => {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/promotion/getCurrentProductsHavingPromotion"
    );
    const data = await response.json();
    if (data.productsWithPromotion === null) {
      throw new Error("Failed to fetch products");
    }
    return data.productsWithPromotion.map((product) => ({
      id: product.ProductID,
      name: product.ProductName,
      description: product.Description,
      price: product.Price,
      priceAf: product.PriceAfterDiscounts,
      imageUrl: product.Image,
      stockQuantity: product.StockQuantity,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

function Bigsales() {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promotionsData = await fetchPromotions();
      setPromotions(promotionsData);

      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  return (
    <div className="box-banner">
      <NavCate />
      <div className="main-banner">
        {promotions.map((promo) => (
          <div key={promo.id}>
            <Link to={promo.link} className="imgbanner">
              <img src={promo.imageUrl} alt="banner" className="imgbanner" />
            </Link>
            <div className="tgkm-promo night">
              Thời gian khuyến mại:{" "}
              <b>
                {new Date(promo.startDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(promo.endDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </b>
            </div>
            <div className="promo-description">
              {promo.description} - Giảm đến {promo.discount}%
            </div>
          </div>
        ))}
      </div>
      <div className="content-tri">
        <div className="contentPro">
          <div className="box_product" id="id920">
            <di>
              <div
                className="box_product_header"
                style={{
                  background: "url() no-repeat center",
                  backgroundRepeat: "repeat-y",
                  backgroundColor: "#0f7fc1",
                }}>
                <span className="box_product_textHead">
                  Những sản phẩm khuyến mãi đang chờ bạn
                </span>
              </div>
            </di>
            <div
              className="listProduct"
              id="danhsach920"
              data-url="/Desktop/PromotionDetail/ListProduct?pageType=km&danhsachId=920&size=8">
              <div className="bx-wrapper" style={{ width: "100%" }}>
                <div className="bx-viewport">
                  {products.map((product) => (
                    <div className="item_product" key={product.id}>
                      <div className="pro-image">
                        <Link
                          to={`/product/${product.id}`}
                          rel="noopener noreferrer">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ display: "block" }}
                          />
                        </Link>
                      </div>
                      <div className="item_product_detail">
                        <div className="info">
                          <Link
                            to={`/product/${product.id}`}
                            title={product.name}
                            target="_blank"
                            rel="noopener noreferrer">
                            {product.name}
                          </Link>
                          <span className="barCode">Mã SP: {product.id}</span>
                        </div>
                        <div className="saoduoithinh">
                          <StarRating productId={product.id} />
                        </div>
                        <div className="money">
                          <span className="moneyText">
                            {formatPrice(product.priceAf)}đ
                          </span>
                          <span className="moneyText2">
                            {formatPrice(product.price)}đ
                          </span>{" "}
                        </div>
                      </div>
                      <span className="discount">
                        -{formatPrice((product.price - product.priceAf) / 1000)}
                        K
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bigsales;
