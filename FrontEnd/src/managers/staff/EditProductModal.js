import React, { useState, useEffect } from 'react';
import './EditProductModal.css';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...product });

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, Status: parseInt(formData.Status) }; // Convert Status to number
        onSave(updatedFormData);
    };

    return (
        <div className="modal-thinhprostedit">
            <div className="modal-content-thinhprostedit">
                <span className="close-thinhprostedit" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label>
                            Product Name:
                            <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} />
                        </label>
                        <label>
                            Description:
                            <textarea name="Description" value={formData.Description} onChange={handleChange} rows="4" />
                        </label>
                        <label>
                            Price:
                            <input type="number" name="Price" value={formData.Price} onChange={handleChange} />
                        </label>
                        <label>
                            Stock Quantity:
                            <input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange} />
                        </label>
                        <label>
                            Image:
                            <input type="text" name="Image" value={formData.Image} onChange={handleChange} />
                        </label>
                        <label>
                            Expiration Date:
                            <input type="date" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleChange} />
                        </label>
                        <label>
                            Manufacturing Date:
                            <input type="date" name="ManufacturingDate" value={formData.ManufacturingDate} onChange={handleChange} />
                        </label>
                        <label>
                            Brand Name:
                            <input type="text" name="BrandName" value={formData.BrandName} onChange={handleChange} />
                        </label>
                        <label>
                            Product Category Name:
                            <select name="ProductCategoryName" value={formData.ProductCategoryName} onChange={handleChange}>
                                <option value="Sữa cho mẹ">Sữa cho mẹ</option>
                                <option value="Sữa cho em bé">Sữa cho em bé</option>
                            </select>
                        </label>
                        <label>
                            Status:
                            <select name="Status" value={formData.Status} onChange={handleChange}>
                                <option value="0">Out of stock</option>
                                <option value="1">Still in stock</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
