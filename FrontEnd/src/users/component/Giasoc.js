import React, { useState, useEffect } from "react";
import "./Product1.css";

function Giasoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:5000/api/v1/promotion/getCurrentProductsHavingPromotion")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : 1));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : totalPages));
  };

  useEffect(() => {
    const interval = setInterval(nextPage, 2500); // Auto change page every 2.5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
            <div className="navigation-gia-soc">
              <button className="nut-chuyen-gia-soc" onClick={prevPage} disabled={currentPage === 1}>
                &lt;
              </button>
              <button className="nut-chuyen-gia-soc" onClick={nextPage} disabled={currentPage === totalPages}>
                &gt;
              </button>
            </div>
          </div>
          <div className="box-container-bottom">
            {currentProducts.map((product, index) => (
              <div key={index} className="item item-giasoc">
                <div className="image_item">
                  <a href={`/product/${product.ProductID}`} target="_blank">
                    <img src={product.Image} alt={product.ProductName} />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href={`/product/${product.ProductID}`} target="_blank">
                      {product.ProductName}
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">{product.Price.toLocaleString()}đ</span>
                  <span className="old_price">{/* Add old price if available */}</span>
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
