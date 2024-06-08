import React, { useState, useEffect } from "react";
import "./Product1.css";

function Giasoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [products] = useState([
    {
      href: "/sua-kid-essentials-nestle-800g-1-10-tuoi",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg?mode=max&width=400&height=400",
      alt: "Sữa Kid Essentials Nestle 800g (1-10 tuổi)",
      title: "Sữa Kid Essentials Nestle 800g (1-10 tuổi)",
      price: "580.000đ",
      oldPrice: "625.000đ"
    },
    {
      href: "/sua-aptamil-new-zealand-so-2-900g-12-24-thang",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230529/sua-aptamil-newzealand-2.jpg?mode=max&width=400&height=400",
      alt: "Sữa Aptamil New Zealand số 2 900g (12-24 tháng)",
      title: "Sữa Aptamil New Zealand số 2 900g (12-24 tháng)",
      price: "659.000đ",
      oldPrice: "664.000đ"
    },
    {
      href: "/sua-glico-icreo-so-1-nhat-ban",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400",
      alt: "Glico Icreo Nhật Bản số 1 (9-36 tháng)",
      title: "Glico Icreo Nhật Bản số 1 (9-36 tháng)",
      price: "520.000đ",
      oldPrice: "565.000đ"
    },
    {
      href: "/product4",
      imgSrc: "https://via.placeholder.com/150",
      alt: "Product 4",
      title: "Product 4",
      price: "400.000đ",
      oldPrice: "450.000đ"
    },
    {
      href: "/product5",
      imgSrc: "https://via.placeholder.com/150",
      alt: "Product 5",
      title: "Product 5",
      price: "350.000đ",
      oldPrice: "400.000đ"
    },
    {
      href: "/product6",
      imgSrc: "https://via.placeholder.com/150",
      alt: "Product 6",
      title: "Product 6",
      price: "300.000đ",
      oldPrice: "350.000đ"
    }
  ]);

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
    const interval = setInterval(nextPage, 2500); // Auto change page every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
                  <a href={product.href} target="_blank">
                    <img src={product.imgSrc} alt={product.alt} />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href={product.href} target="_blank">
                      {product.title}
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">{product.price}</span>
                  <span className="old_price">{product.oldPrice}</span>
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
