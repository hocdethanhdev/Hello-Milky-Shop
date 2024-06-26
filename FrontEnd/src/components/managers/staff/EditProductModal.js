import React, { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";
import sanitizeHtml from "sanitize-html";
import './EditProductModal.css';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...product });
    const editor = useRef(null);

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, Description: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, Status: parseInt(formData.Status) }; // Convert Status to number
        onSave(updatedFormData);
    };

    const editorConfig = useMemo(() => ({
        readonly: false,
        toolbar: true,
        toolbarButtonSize: 'middle',
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', 'eraser',
            '|', 'ul', 'ol', 'indent', 'outdent',
            '|', 'font', 'fontsize', 'brush', 'paragraph',
            '|', 'image', 'link', 'table',
            '|', 'align', 'undo', 'redo', 'hr',
            '|', 'copyformat', 'fullsize'
        ]
    }), []);

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
                    <label className='edit-pro-thinh'>
                        Description:
                        <JoditEditor
                            ref={editor}
                            value={formData.Description}
                            config={editorConfig}
                            onBlur={handleDescriptionChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
