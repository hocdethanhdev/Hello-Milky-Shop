// src/ManageAdmin.js
import React from 'react';
import './ManageAdmin.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const ManageAdmin = ({ accounts }) => {
    return (
        <div className="table-container">
            <h1>Manage Admin Accounts</h1>
            <Link to="/adding-account-admin">
                <button type="button" className="button-add-accad">
                    <span className="far fa-plus-square btn btn-secondary"></span>
                </button>
            </Link>
            <table className="account-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tên tài khoản</th>
                        <th>Họ tên</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Thinhlp</td>
                        <td>Lê Phước Thịnh</td>
                        <td>FBT</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>MinFun</td>
                        <td>Minh Fun</td>
                        <td>HEHE</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>KFCUser</td>
                        <td>KFC Lover</td>
                        <td>KFC</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageAdmin;
