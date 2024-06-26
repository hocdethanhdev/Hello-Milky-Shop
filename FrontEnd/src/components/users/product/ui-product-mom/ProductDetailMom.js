import React from 'react';
import './ProductDetailMom.css';
const ProductDetail = ({ product }) => {
    return (
        <div>
            <section className="product_detail-all-thinh width-common">
                <h2>Mô tả {product.ProductName}</h2>
                <div className="wrap">
                    <div dangerouslySetInnerHTML={{ __html: product.Description.substring(0, 10000) }} />


                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
