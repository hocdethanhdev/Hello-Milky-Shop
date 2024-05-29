import React from 'react';
import './Voucher.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Voucher() {
    return (
        <div className="voucher-container">
            <div className="voucher-body">
                <div className="voucher-main-content">
                    <h1>Voucher Management</h1>

                    <div className="voucher-list">
                        <Link to="/addingvoucher">
                            <div className='d-flex justify-content-end align-items-end'>
                                <button type="button" className="button-add-voucher">
                                    <span className="far fa-plus-square btn btn-secondary"></span>
                                </button>
                            </div>
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Discount</th>
                                    <th>Min Discount</th>
                                    <th>Max Discount</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NEWYEAR2024</td>
                                    <td>20%</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>31/12/2024</td>
                                    <td className="active">Active</td>
                                    <td>
                                        <button className="btn btn-warning">Edit</button> <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>SUMMER2024</td>
                                    <td>15%</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>30/06/2024</td>
                                    <td className="expired">Expired</td>
                                    <td>
                                        <button className="btn btn-warning">Edit</button> <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Voucher;
