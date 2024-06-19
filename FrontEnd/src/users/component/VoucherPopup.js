import React from 'react';
import "./VoucherModal.css"
const VoucherPopup = ({ vouchers, handleVoucherSelect, closePopup }) => {
    return (
        <div className="voucher-popup">
            <h2>Chọn Voucher</h2>
            <ul>
                {vouchers.map(voucher => (
                    <li key={voucher.UserVoucherID} onClick={() => handleVoucherSelect(voucher)}>
                        <div className="voucher-item">
                            <div className="voucher-name">{voucher.VoucherName}</div>
                            <div className="voucher-details">
                                <p>Giảm giá: {voucher.DiscountPercentage}%</p>
                                <p>Giảm tối đa: {voucher.MaxDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p>Đơn tối thiểu: {voucher.MinDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={closePopup}>OK</button>
        </div>
    );
};

export default VoucherPopup;