import React, { useState, useEffect } from 'react';
import './EditVoucherModal.css';

const EditVoucherModal = ({ voucher, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        voucherName: '',
        quantity: 0,
        discountPercentage: 0,
        minDiscount: 0,
        maxDiscount: 0,
        startDate: '',
        expiryDate: '',
    });

    useEffect(() => {
        if (voucher) {
            setFormData({
                voucherName: voucher.VoucherName,
                quantity: voucher.Quantity,
                discountPercentage: voucher.DiscountPercentage,
                minDiscount: voucher.MinDiscount,
                maxDiscount: voucher.MaxDiscount,
                startDate: new Date(voucher.StartDate).toISOString().split('T')[0],
                expiryDate: new Date(voucher.ExpiryDate).toISOString().split('T')[0],
            });
        }
    }, [voucher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedVoucher = {
            ...voucher,
            ...formData,
            StartDate: formData.startDate,
            ExpiryDate: formData.expiryDate,
        };
        onSave(updatedVoucher);
    };

    return (
        <div className="modal-thinhprostedit3">
            <div className="modal-content-thinhprostedit3">
                <span className="close-thinhprostedit3" onClick={onClose}>&times;</span>
                <h2>Edit Voucher</h2>
                <form onSubmit={handleSubmit}>
                    <div className="half-width">
                        <label>
                            Voucher Name:
                            <input
                                type="text"
                                name="voucherName"
                                value={formData.voucherName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Discount Percentage:
                            <input
                                type="number"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="half-width">
                        <label>
                            Min Discount:
                            <input
                                type="number"
                                name="minDiscount"
                                value={formData.minDiscount}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Max Discount:
                            <input
                                type="number"
                                name="maxDiscount"
                                value={formData.maxDiscount}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Expiry Date:
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button className=""  type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVoucherModal;
