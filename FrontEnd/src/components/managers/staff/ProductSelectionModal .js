import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductSelectionModal.css';

const ProductSelectionModal = ({ promotionId, selectedProducts, setSelectedProducts, onClose }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProductsAndAppliedProducts = async () => {
            try {
                // Fetch all products
                const productsResponse = await axios.get('http://localhost:5000/api/v1/product/getInfoProductsDetail');
                setProducts(productsResponse.data);

                // Fetch applied product IDs for the promotion
                const appliedProductsResponse = await axios.get(`http://localhost:5000/api/v1/promotion/getProductsApplyAnPromotion/${promotionId}`);
                const appliedProductIds = appliedProductsResponse.data; // Assuming it returns ["SE0004", "SE0005", "SE0006"]

                // Set pre-selected products
                setSelectedProducts(appliedProductIds);
            } catch (error) {
                console.error('Error fetching products or applied products:', error);
                // Optionally handle error state or inform the user
            }
        };

        fetchProductsAndAppliedProducts();
    }, [promotionId, setSelectedProducts]);

    const handleProductSelection = (productId) => {
        setSelectedProducts(prevSelectedProducts =>
            prevSelectedProducts.includes(productId)
                ? prevSelectedProducts.filter(id => id !== productId)
                : [...prevSelectedProducts, productId]
        );
    };

    const handleSelectAll = () => {
        const filteredProducts = selectedCategory
            ? products.filter(product => product.ProductCategoryName === selectedCategory)
            : products;

        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]); // Reset if all are already selected
        } else {
            setSelectedProducts(filteredProducts.map(product => product.ProductID));
        }
    };

    const toggleProductSelection = (productId) => {
        handleProductSelection(productId);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.ProductCategoryName === selectedCategory)
        : products;

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="modal-product-selection">
            <div className="modal-content-product-selection">
                <span className="close-product-selection" onClick={onClose}>&times;</span>
                <h3>Select Products for Promotion</h3>
                <div className="filter-container-promotion">
                    <label>Filter by Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {[...new Set(products.map(product => product.ProductCategoryName))].map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="product-list-container-tri">
                    <div className="select-all-container-tri">
                        <label>Select All</label>
                        <input
                            type="checkbox"
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={handleSelectAll}
                        />
                    </div>
                    <div className="product-list-promotion">
                        {filteredProducts.map(product => (
                            <div key={product.ProductID} className="product-item-promotion-nhan">
                                <label className="product-clickable">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.ProductID)}
                                        onChange={() => handleProductSelection(product.ProductID)}
                                    />
                                    <div className="product-details">
                                        <img
                                            src={product.Image}
                                            alt={product.ProductName}
                                            onClick={() => toggleProductSelection(product.ProductID)}
                                            className={selectedProducts.includes(product.ProductID) ? "selected" : ""}
                                        />
                                        <div>
                                            <p>{product.ProductName}</p>
                                            <p>{formatPrice(product.Price)}</p>
                                            <p><strong>Stock:</strong> {product.StockQuantity}</p>
                                            <p><strong>Expiration Date:</strong> {new Date(product.ExpirationDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className="save-product-selection" onClick={onClose}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default ProductSelectionModal;
