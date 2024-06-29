import React, { useState, useEffect } from 'react';
import './EditPromotionModal.css';

const EditPromotionModal = ({ promotion, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        promotionName: '',
        discountPercentage: 0,
        description: '',
        startDate: '',
        endDate: '',
        image: '',
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                promotionName: promotion.PromotionName,
                discountPercentage: promotion.DiscountPercentage,
                description: promotion.Description,
                startDate: new Date(promotion.StartDate).toISOString().split('T')[0],
                endDate: new Date(promotion.EndDate).toISOString().split('T')[0],
                image: promotion.Image,
            });
        }
    }, [promotion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPromotion = {
            ...promotion,
            ...formData,
            StartDate: formData.startDate,
            EndDate: formData.endDate,
        };
        onSave(updatedPromotion);
    };

    return (
        <div className="modal-edit-promotion">
            <div className="modal-content-edit-promotion">
                <span className="close-edit-promotion" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên khuyến mãi:</label>
                        <input
                            type="text"
                            name="promotionName"
                            value={formData.promotionName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Giảm giá:</label>
                        <input
                            type="number"
                            name="discountPercentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <label>Ngày bắt đầu:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <label>Ngày kết thúc:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group half1">
                        <label>Mô tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <label>Ảnh:</label>
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Current Promotion"
                                className="current-image"
                            />
                        )}
                    </div>
                    <button className="save-editpromotion" type="submit">Lưu</button>
                </form>

            </div>
        </div>
    );
};

export default EditPromotionModal;
