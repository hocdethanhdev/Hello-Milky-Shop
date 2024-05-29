import React from 'react';
import './Products.css';

function ProductAdd() {
    return (

        <div className="create-product">
            <h2>Create New Product</h2>
            <form id="create-product-form" className='product-form'>
                <div className="form-group">
                    <label htmlFor="product-id">ID:</label>
                    <input type="text" id="product-id" name="product-id" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-name">Name:</label>
                    <input type="text" id="product-name" name="product-name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-description">Description:</label>
                    <textarea id="product-description" name="product-description" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="product-price">Price:</label>
                    <input type="number" id="product-price" name="product-price" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-stock">Stock Quantity:</label>
                    <input type="number" id="product-stock" name="product-stock" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-image">Image:</label>
                    <input type="file" id="product-image" name="product-image" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-expiration">Expiration Date:</label>
                    <input type="date" id="product-expiration" name="product-expiration" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-manufacturing">Manufacturing Date:</label>
                    <input type="date" id="product-manufacturing" name="product-manufacturing" required />
                </div>
                <div className="form-group">
                    <label htmlFor="product-brand">Brand:</label>
                    <select id="product-brand" name="product-brand" required>
                        <option value="Brand A">Brand A</option>
                        <option value="Brand B">Brand B</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="product-category">Category:</label>
                    <select id="product-category" name="product-category" required>
                        <option value="Dairy">Dairy</option>
                        <option value="Organic">Organic</option>
                    </select>
                </div>
                <button type="submit" className='button-product btn btn-primary' >Create Product</button>
            </form>
        </div>
    );
};

export default ProductAdd;