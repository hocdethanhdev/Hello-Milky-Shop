import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Product1.css";

function Combo2() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/product/getTop6MilkForBaby')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <section id="combo_2f" className="combo-2f-section">
            <div className="combo-2f-wrap">
                <div className="combo-2f-content">
                    <div className="combo-2f-header">
                        <div className="combo-2f-icon">
                            <img src="./ImageMilkShop/icon2.png" alt="Combo icon" />
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
                            <div key={index} className="combo-item-1" onClick={() => handleProductClick(product.ProductID)}>
                                <img src={product.Image} alt={product.ProductName} />
                                <div className="combo-details-1">
                                    <h3>{product.ProductName}</h3>
                                    <p>{product.Price.toLocaleString('vi-VN')}đ</p>
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
