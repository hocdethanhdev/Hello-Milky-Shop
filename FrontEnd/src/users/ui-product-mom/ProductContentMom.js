import React, { useState } from 'react';
import './ProductContentMom.css'; // Assuming you have a CSS file for styling
import CartPopup from './CartPopup'; // Import the CartPopup component

const ProductContentMom = () => {
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);

    const openCartPopup = () => {
        setIsCartPopupOpen(true);
    };

    const closeCartPopup = () => {
        setIsCartPopupOpen(false);
    };

    return (
        <section className="product_content width-common">
            <div className="wrap">
                <div className="background_black"></div>
                <div className="main_content width-common">
                    <div className="img_detail">
                        <div id="java_zoom_"></div>
                        <div id="showImg">
                            <div className="img_zoom" id="img_1" data-zoom-image="https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg">
                                <img
                                    id="zoom_03"
                                    src="https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg"
                                    data-zoom-image="https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg"
                                    alt="Sữa Ensure Úc vị Vanilla 850g"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="detail_right">
                        <h1>Sữa Ensure Úc vị Vanilla 850g</h1>
                        <div className="pro_detail_brand">
                            <p>Thương hiệu:</p>
                            <a href="/thuong-hieu/ensure" className="name_brand">Ensure</a>
                            <p>Mã SP: <span id="barcodeMain">TP-313</span></p>
                        </div>
                        <div className="pro_info">
                            <div className="box_info">
                                <div className="clear"></div>
                            </div>
                            <div id="divPrice" className="box_info box_price">
                                <span className="box_info_txt right">Giá:</span>
                                <span className="pro_price right">
                                    <span className="price_show price_item">765.000đ</span>
                                </span>
                                <div className="clear"></div>
                            </div>
                            <div className="box_info box_status">
                                <span className="box_info_txt left">Kho: </span>
                                <span className="pro_status left">128</span>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="box_btn">
                            <button className="btn_order_now">Mua ngay</button>
                            <button className="btn_add_cart" onClick={openCartPopup}>Thêm vào giỏ hàng</button>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className='cuc_icon left'>
                        <div className='cuc_icon_item left'>
                            <span className="hinh_icon icon fas fa-shipping-fast"></span>
                            <span className="icon_title">
                                <div>
                                    Giao hàng
                                </div>
                                <div>
                                    toàn quốc
                                </div>
                            </span>
                        </div>
                        <div className='cuc_icon_item left'>
                            <span className="hinh_icon icon far fa-check-circle"></span>
                            <span className="icon_title">
                                <div>
                                    Đảm bảo hàng
                                </div>
                                <div>
                                    chính hãng
                                </div>
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
            <CartPopup isOpen={isCartPopupOpen} onClose={closeCartPopup} />
        </section>
    );
};

export default ProductContentMom;
