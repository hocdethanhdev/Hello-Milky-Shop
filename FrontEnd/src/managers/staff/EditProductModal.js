import React, { useState } from 'react';
import './EditProductModal.css';
const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-thinhprostedit">
            <div className="modal-content-thinhprostedit">
                <span className="close-thinhprostedit" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="Description" value={formData.Description} onChange={handleChange} />
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
                        <input type="text" name="ProductCategoryName" value={formData.ProductCategoryName} onChange={handleChange} />
                    </label>
                    <label>
                        Status:
                        <select name="Status" value={formData.Status} onChange={handleChange}>
                            <option value="0">Out of stock</option>
                            <option value="1">Still in stock</option>

                        </select>
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
