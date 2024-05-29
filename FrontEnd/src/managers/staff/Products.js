import React from 'react';
import './Products.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Products() {
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
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock Quantity</th>
                                <th>Image</th>
                                <th>Expiration Date</th>
                                <th>Manufacturing Date</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Milk A</td>
                                <td>High-quality dairy milk</td>
                                <td>50,000 VND</td>
                                <td>100</td>
                                <td><img src="milk-a.jpg" alt="Milk A" className="product-image" /></td>
                                <td>2024-12-31</td>
                                <td>2024-01-01</td>
                                <td>Brand A</td>
                                <td>Dairy</td>
                                <td className='nut-pro'><button className='button-product btn btn-warning'>Edit</button> <button className='button-product btn btn-danger'>Delete</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Milk B</td>
                                <td>Organic milk</td>
                                <td>45,000 VND</td>
                                <td>200</td>
                                <td><img src="milk-b.jpg" alt="Milk B" className="product-image" /></td>
                                <td>2024-11-30</td>
                                <td>2024-02-01</td>
                                <td>Brand B</td>
                                <td>Organic</td>
                                <td className='nut-pro'><button className='button-product btn btn-warning'>Edit</button> <button className='button-product btn btn-danger'>Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default Products;
