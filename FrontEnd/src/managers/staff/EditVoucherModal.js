import React, { useState, useEffect } from 'react';

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
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Voucher</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Voucher Name:
                        <input
                            type="text"
                            name="voucherName"
                            value={formData.voucherName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Discount Percentage:
                        <input
                            type="number"
                            name="discountPercentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Min Discount:
                        <input
                            type="number"
                            name="minDiscount"
                            value={formData.minDiscount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Max Discount:
                        <input
                            type="number"
                            name="maxDiscount"
                            value={formData.maxDiscount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Expiry Date:
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditVoucherModal;
