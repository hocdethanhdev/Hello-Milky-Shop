import React from 'react';
import PropTypes from 'prop-types';
import './CartPopup.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const CartPopup = ({ isOpen, onClose, product, quantity }) => {
    const { t } = useTranslation();
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
                            <p className="product-code-thinh-cart">{t('code')}: {product.ProductID}</p>
                            <p> {t('added')} {quantity} {t('productsToCart')}</p>
                        </div>
                    </div>
                    <div className="popup-btn-thinh-cart">
                        <button className="btn-go-cart-thinh-cart" onClick={onClose}>{t('continueShopping')}</button>
                    </div>
                    <Link to="/ShoppingCart">
                        <div className="popup-btn-thinh-cart1">
                            <button className="btn-go-cart-thinh-cart1">{t('pay')}</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

CartPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.shape({
        Image: PropTypes.string.isRequired,
        ProductName: PropTypes.string.isRequired,
        ProductID: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
};

export default CartPopup;
