import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product1.css";

function Combo1() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu sản phẩm
        axios.get('http://localhost:5000/api/v1/product/getTop6MilksForPregnantMother/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <section id="combo_1f" className="combo-1f-section">
            <div className="combo-1f-wrap">
                <div className="combo-1f-content">
                    <div className="combo-1f-header">
                        <div className="combo-1f-icon">
                            <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
                        </div>
                        <div className="combo-1f-title">
                            <h2>Sữa dành cho mẹ</h2>
                        </div>
                    </div>
                    <div className="combo-1f-main">
                        <img src=".//ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
                    </div>
                    <div className="combo-content">
                        {products.map((product, index) => (
                            <div key={product.ProductID} className="combo-item">
                                <img src=".//ImageMilkShop/aptakid.jpg" alt={`Combo ${index + 1}`} />
                                <div className="combo-details">
                                    <h3>{product.ProductName}</h3>
                                    <p>{product.price} sold</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Combo1;
