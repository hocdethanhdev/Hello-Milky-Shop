import React from 'react';
import './CartPopup.css';

const CartPopup = ({ isOpen, onClose, product, quantity }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-add-cart-thinh-cart">
            <div className="wrapper-popup-cart-thinh-cart">
                <div className="btn-close-cart-thinh-cart">
                    <button onClick={onClose}><i className="fa fa-times" style={{ fontSize: '24px' }}></i></button>
                </div>
                <div className="popup-cart-thinh-cart">
                    <div className="product-details-thinh-cart">
                        <img src={product.Image} alt={product.ProductName} className="product-image-thinh-cart" />
                        <div>
                            <h3 className="product-name-thinh-cart">{product.ProductName}</h3>
                            <p className="product-code-thinh-cart">Mã: {product.ProductID}</p>
                            <p>Đã thêm {quantity} sản phẩm vào giỏ hàng</p>
                        </div>
                    </div>
                    <div className="popup-btn-thinh-cart">
                        <button className="btn-go-cart-thinh-cart" onClick={onClose}>Tiếp tục mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
