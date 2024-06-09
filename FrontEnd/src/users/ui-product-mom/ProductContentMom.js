import React, { useState } from 'react';
import './ProductContentMom.css';
import CartPopup from './CartPopup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const calculateDiscount = (originalPrice, discountedPrice) => originalPrice === discountedPrice ? 0 : originalPrice - discountedPrice;

const formatDiscount = (discount) => `-${Math.round(discount / 1000)}K`;

const ProductContentMom = ({ product }) => {
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const openCartPopup = () => setIsCartPopupOpen(true);
    const closeCartPopup = () => setIsCartPopupOpen(false);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/order/addProductToOrder', {
                userID: "M0000001",
                productID: product.ProductID,
                quantity: quantity,
                price: product.PriceAfterDiscounts
            });
            openCartPopup();
        } catch (error) {
            console.error('Error adding product to order:', error);
        }
    };

    const handleBuyNow = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/order/addProductToOrder', {
                userID: "M0000001",
                productID: product.ProductID,
                quantity: quantity,
                price: product.PriceAfterDiscounts
            });
            navigate('/ShoppingCart');
        } catch (error) {
            console.error('Error adding product to order:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const discountAmount = calculateDiscount(product.Price, product.PriceAfterDiscounts);

    return (
        <section className="product_content width-common">
            <div className="wrap">
                <div className="background_black"></div>
                <div className="main_content width-common">
                    <div className="img_detail">
                        <div id="java_zoom_"></div>
                        <div id="showImg">
                            <div className="img_zoom" id="img_1">
                                <img
                                    id="zoom_03"
                                    src={product.Image}
                                    alt={product.ProductName}
                                />
                                {discountAmount > 0 && (
                                    <div className="discount-badge-thinh">
                                        {formatDiscount(discountAmount)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="detail_right">
                        <h1>{product.ProductName}</h1>
                        <div className="pro_detail_brand">
                            <p className='thuong-hieu-san-pham'>Thương hiệu: <span className='thuong-hieu-san-pham-api'>{product.BrandName}</span></p>
                            <p>Mã SP: <span id="barcodeMain">{product.ProductID}</span></p>
                        </div>
                        <div className="pro_info">
                            <div className="box_info">
                                <div className="clear"></div>
                            </div>
                            <div id="divPrice" className="box_info box_price">
                                <span className="box_info_txt right">Giá:</span>
                                <span className="pro_price right">
                                    <span className="price_show price_item">{formatPrice(product.PriceAfterDiscounts)}₫</span>
                                    {product.Price !== product.PriceAfterDiscounts && (
                                        <span className="old_price">{formatPrice(product.Price)}₫</span>
                                    )}
                                </span>
                                <div className="clear"></div>
                            </div>
                            <div className="box_info box_status">
                                <span className="box_info_txt left">Kho: </span>
                                <span className="pro_status left">{product.StockQuantity}</span>
                                <div className="clear"></div>
                            </div>
                            <div className="quantity-selector-thinh-cart">
                                <button className="quantity-button-thinh-cart" onClick={decrementQuantity}>-</button>
                                <input type="text" value={quantity} readOnly className="quantity-input-thinh-cart" />
                                <button className="quantity-button-thinh-cart" onClick={incrementQuantity}>+</button>
                            </div>
                        </div>
                        <div className="box_btn">
                            <button className="btn_order_now" onClick={handleBuyNow}>Mua ngay</button>
                            <button className="btn_add_cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className='cuc_icon left'>
                        <div className='cuc_icon_item left'>
                            <span className="hinh_icon icon fas fa-shipping-fast"></span>
                            <span className="icon_title">
                                <div>Giao hàng</div>
                                <div>toàn quốc</div>
                            </span>
                        </div>
                        <div className='cuc_icon_item left'>
                            <span className="hinh_icon icon far fa-check-circle"></span>
                            <span className="icon_title">
                                <div>Đảm bảo hàng</div>
                                <div>chính hãng</div>
                            </span>
                        </div>
                    </div>
                    <div className="box_phone">
                        Tổng đài mua hàng miễn cước <a href="tel:0852793879 - Zalo:0393892623" className="hot_phone">0852793879 - Zalo:0393892623</a> (Từ 8h00 đến 21h30 hàng ngày)
                    </div>
                    <div className="box_banner"></div>
                </div>
                <div className="clear"></div>
            </div>
            <CartPopup isOpen={isCartPopupOpen} onClose={closeCartPopup} product={product} quantity={quantity} />
        </section>
    );
};

export default ProductContentMom;
