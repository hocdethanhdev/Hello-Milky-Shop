import React, { useState, useEffect } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import ThrowPage from '../../users/ui-list-product-mom/ThrowPage'; // Adjust the import path as necessary

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const productsPerPage = 10; // Show 10 products per page

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/product/getAllProducts') // Replace with your actual API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Debugging statement
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];

        // Apply category filter
        if (categoryFilter !== 'All') {
            updatedProducts = updatedProducts.filter(product => product.ProductCategoryName === categoryFilter);
        }

        // Apply status filter
        if (statusFilter !== 'All') {
            updatedProducts = updatedProducts.filter(product => (product.Status ? 'Still in stock' : 'Out of stock') === statusFilter);
        }

        // Apply sorting
        if (sortOrder === 'asc') {
            updatedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        } else {
            updatedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
        }

        setFilteredProducts(updatedProducts);
    }, [products, sortOrder, categoryFilter, statusFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleCategoryFilter = (event) => {
        setCategoryFilter(event.target.getAttribute('data-value'));
        setShowCategoryDropdown(false);
    };

    const handleStatusFilter = (event) => {
        setStatusFilter(event.target.getAttribute('data-value'));
        setShowStatusDropdown(false);
    };

    const toggleCategoryDropdown = () => {
        setShowCategoryDropdown(!showCategoryDropdown);
    };

    const toggleStatusDropdown = () => {
        setShowStatusDropdown(!showStatusDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.category-header') && showCategoryDropdown) {
                setShowCategoryDropdown(false);
            }
            if (!event.target.closest('.status-header') && showStatusDropdown) {
                setShowStatusDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCategoryDropdown, showStatusDropdown]);

    // Calculate the products to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="product-container">
            <div className="main-content-product">
                <h1>Manage Products</h1>
                <Link to="/addingproduct">
                    <div className='d-flex justify-content-end align-items-end'>
                        <button type="button" className="button-add-product">
                            <span className="far fa-plus-square btn btn-secondary"></span>
                        </button>
                    </div>
                </Link>
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                    Name <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th className="category-header">
                                    Category <FontAwesomeIcon icon={faFilter} onClick={toggleCategoryDropdown} />
                                    {showCategoryDropdown && (
                                        <ul className="dropdown-thinh-staff">
                                            <li className="dropdown-li-thinh" data-value="All" onClick={handleCategoryFilter}>All</li>
                                            <li className="dropdown-li-thinh" data-value="Sữa cho em bé" onClick={handleCategoryFilter}>Sữa cho em bé</li>
                                            <li className="dropdown-li-thinh" data-value="Sữa cho mẹ bầu" onClick={handleCategoryFilter}>Sữa cho mẹ bầu</li>
                                        </ul>
                                    )}
                                </th>
                                <th className="status-header">
                                    Status <FontAwesomeIcon icon={faFilter} onClick={toggleStatusDropdown} />
                                    {showStatusDropdown && (
                                        <ul className="dropdown-thinh-staff">
                                            <li className="dropdown-li-thinh" data-value="All" onClick={handleStatusFilter}>All</li>
                                            <li className="dropdown-li-thinh" data-value="Still in stock" onClick={handleStatusFilter}>Still in stock</li>
                                            <li className="dropdown-li-thinh" data-value="Out of stock" onClick={handleStatusFilter}>Out of stock</li>
                                        </ul>
                                    )}
                                </th>
                                <th>CRUD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(product => (
                                <tr key={product.ProductID}>
                                    <td>{product.ProductID}</td>
                                    <td>{product.ProductName}</td>
                                    <td>{product.ProductCategoryName}</td>
                                    <td>{product.Status ? 'Still in stock' : 'Out of stock'}</td>
                                    <td>
                                        <button className='button-product btn btn-warning'>Edit</button>
                                        <button className='button-product btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='pagination-container'>
                    <ThrowPage
                        current={currentPage}
                        onChange={handlePageChange}
                        total={filteredProducts.length}
                        productsPerPage={productsPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
