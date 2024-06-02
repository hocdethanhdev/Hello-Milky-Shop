import React from 'react';
import './CartPopup.css';

const CartPopup = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup_add_cart">
            <div className="wrapper_popup_cart">
                <div className="btn_close_cart">
                    <a href="javascript:;" onClick={onClose}><i className="fa fa-times" style={{ fontSize: '24px' }}></i></a>
                </div>
                <div id="popup_add_cart">
                    <div className="popup_cart">
                        <div className="cart_popup_left">
                            <div className="cart_message">
                                <span className="cart_message_icon"><i className="fa fa-check"></i></span>
                                <span className="cart_message_text">1 sản phẩm mới được thêm vào giỏ hàng của bạn</span>
                            </div>
                            <div className="item_cart">
                                <div className="item_cart_product">
                                    <div className="item_cart_img">
                                        <a href=""><img src="https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg?mode=max&amp;width=96&amp;height=96" alt="Sữa Ensure Úc vị Vanilla 850g" /></a>
                                    </div>
                                    <div className="item_cart_info">
                                        <h3>
                                            <a href="">Sữa Ensure Úc vị Vanilla 850g</a>
                                        </h3>
                                        <span className="cart_brand">Mã: TP-313</span>
                                        <span className="item_cart_price">765.000đ</span>
                                        <span className="item_cart_old_price">780.000đ</span>
                                        <p className="label_km">-15k</p>
                                    </div>
                                </div>
                                <div className="cart_action">
                                    <span className="right">Số lượng : 1</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <button className="btn_go_cart" onClick={onClose} style={{ paddingLeft: '20px', color: '#fc6b00', fontSize: '18px' }}>
                                    <i className="fa fa-angle-left"></i> Tiếp tục mua hàng
                                </button>
                            </div>
                        </div>
                        <div className="cart_popup_right">
                            <div className="summary_section">
                                <div className="summary_section_heading">
                                    <div className="checkout_summary_title">Giỏ hàng của tôi <span className="checkout_summary_count">(4 sản phẩm)</span></div>
                                </div>
                                <div className="summary_section_content">
                                    <div className="total_price">
                                        <span className="left">Thành tiền</span>
                                        <span className="right1">2.525.000đ</span>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="total_price">
                                        <span className="left">Giảm giá</span>
                                        <span className="right2">63.000đ</span>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="total_price_last">
                                        <span className="left">Tổng tiền</span>
                                        <span className="right3">2.462.000đ</span>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="right4" style={{ fontSize: '13px' }}>
                                        Đã bao gồm VAT nếu có
                                        <div className="clear"></div>
                                    </div>
                                </div>
                                <div className="popup_btn" style={{ clear: 'both' }}>
                                    <a href="/thanh-toan" className="btn_order_now">Thanh toán</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
