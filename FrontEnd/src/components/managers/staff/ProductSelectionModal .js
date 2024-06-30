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
                console.log(promotionId);
                // Fetch applied products IDs
                const appliedProductsResponse = await axios.get(`http://localhost:5000/api/v1/promotion/getProductsApplyAnPromotion/${promotionId}`);
                const appliedProductIds = appliedProductsResponse.data.appliedProducts.map(product => product.ProductID);
                console.log(appliedProductIds);
                // Set pre-selected products
                setSelectedProducts(appliedProductIds);
            } catch (error) {
                console.error('Error fetching products or applied products:', error);
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
                        <label>Chọn tất cả</label>
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
                                            <p><strong>Kho:</strong> {product.StockQuantity}</p>
                                            <p><strong>HSD:</strong> {new Date(product.ExpirationDate).toLocaleDateString()}</p>
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
