import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Product1.css";
import StarRating from "../ui-list-product-mom/StarRating";
function Combo2() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/product/getTop6MilkForBaby')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <section id="combo_2f" className="combo-2f-section">
            <div className="combo-2f-wrap">
                <div className="combo-2f-content">
                    <div className="combo-2f-header">
                        <div className="combo-2f-icon">
                            <img src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg" alt="Combo icon" />
                        </div>
                        <div className="combo-2f-title">
                            <h2>Sữa dành cho bé</h2>
                        </div>
                    </div>
                    <div className="combo-2f-main">
                        <img src="./ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
                    </div>
                    <div className="combo-content-1">
                        {products.map((product, index) => (
                            <div key={product.ProductID} className="combo-item-1" onClick={() => handleProductClick(product.ProductID)}>
                                <img src={product.Image} alt={product.ProductName} />
                                <div className="combo-details-1">
                                    <h3>{product.ProductName}</h3>
                                    {product.PriceAfterDiscounts !== product.Price ? (
                                        <div className="gia">
                                        <p className="original-price-1">{formatPrice(product.Price)}</p>
                                            <p className="discounted-price-1">{formatPrice(product.PriceAfterDiscounts)}</p>
                                            
                                        </div>
                                    ) : (
                                        <p>{formatPrice(product.Price)}</p>
                                    )}
                                    <div className='saoduoithinh-1'><StarRating productId={product.ProductID}/></div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Combo2;
