import React, { useState, useEffect } from "react";
import "./Product1.css";

function Giasoc() {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/v1/promotion/getCurrentProductsHavingPromotion"
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages - 1 ? prevPage + 1 : 0
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage > 0 ? prevPage - 1 : totalPages - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) =>
        prevPage > 0 ? prevPage - 1 : totalPages - 1
      );
    }, 10000); // Auto change page every 10 seconds
    return () => clearInterval(interval);
  }, [totalPages]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <section
      id="list_product_cate-tri"
      className="width-common boxx-common tm-d superSale"
      data-recoedwidget="true"
    >
      <div className="wrap">
        <div className="category width-common" id="relative-btnMore">
          <div className="box-container-header">
            <div className="box-title box-title-Sgg">Giá Sốc Hôm Nay</div>
            <div className="box-time box-time-allDay"></div>
          </div>
          <div className="box-container-bottom">
            <div className="nutnhan">
              <button
                className="nut-chuyen-gia-soc prev"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                &lt;
              </button>
              <button
                className="nut-chuyen-gia-soc next"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
              >
                &gt;
              </button>
            </div>
            {currentProducts.map((product, index) => (
              <div key={index} className="item item-giasoc">
                <div className="image_item">
                  <a href={`/product/${product.ProductID}`}>
                    <img src={product.Image} alt={product.ProductName} />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href={`/product/${product.ProductID}`}>
                      {product.ProductName}
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">
                    {product.PriceAfterDiscounts?.toLocaleString("de-DE")}đ
                  </span>
                  <span className="old_price">
                    {product.Price?.toLocaleString("de-DE")}đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Giasoc;
