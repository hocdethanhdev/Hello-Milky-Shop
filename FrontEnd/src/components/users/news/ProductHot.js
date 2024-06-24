import React from "react";
import './ProductHot.css'; // Import your CSS file for styling

const recommendedArticles = [
    {
      image: 'https://wikibacsi.com/wp-content/uploads/2019/06/la-dinh-lang-loi-sua-tot-cho-cac-me-sau-sinh-5.jpg',
      title: 'Hướng dẫn cách nấu lá đinh lăng lợi sữa cho bà đẻ sau sinh'
    },
    {
      image: 'https://wikibacsi.com/wp-content/uploads/2019/06/la-dinh-lang-loi-sua-tot-cho-cac-me-sau-sinh-5.jpg',
      title: 'Sau sinh có được ăn dưa chuột không? Mẹ bỉm nên lưu ý gì?'
    },
    {
      image: 'https://wikibacsi.com/wp-content/uploads/2019/06/la-dinh-lang-loi-sua-tot-cho-cac-me-sau-sinh-5.jpg',
      title: 'Sau sinh có ăn được đậu phụ không? Một số lưu ý quan trọng cho sức khỏe'
    },
    {
      image: 'https://wikibacsi.com/wp-content/uploads/2019/06/la-dinh-lang-loi-sua-tot-cho-cac-me-sau-sinh-5.jpg',
      title: 'Hướng dẫn cách xông hơi cửa mình sau sinh cho các sản phụ đẻ thường'
    },
    {
      image: 'https://wikibacsi.com/wp-content/uploads/2019/06/la-dinh-lang-loi-sua-tot-cho-cac-me-sau-sinh-5.jpg',
      title: 'Sau sinh có được ăn bánh ngọt không? Mẹ bỉm sữa cần lưu ý điều gì?'
    }
  ];

function ProductHot() {
  return (
    <div className="sidebar-producthot">
      <h3>DÀNH CHO BẠN HÔM NAY</h3>
      {recommendedArticles.map((article, index) => (
        <div key={index} className="recommended-article">
          <img src={article.image} alt={article.title} className="recommended-image" />
          <div className="recommended-content">
            <p className="recommended-title">{article.title}</p>
            <div className="recommended-pricing">
              <span className="discount-price">{article.discountPrice}</span>
              <span className="original-price">{article.originalPrice}</span>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductHot;
