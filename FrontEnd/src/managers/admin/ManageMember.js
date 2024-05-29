// src/ManageMember.js
import React from 'react';
import './ManageMember.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const ManageMember = ({ accounts }) => {
    return (
        <div className="table-container-member">
            <h1>Manage Member Accounts</h1>
            <Link to="/adding-account-member">
                <button type="button" className="button-add-accmem">
                    <span className="far fa-plus-square btn btn-secondary"></span>
                </button>
            </Link>
            <table className="account-table-mem">
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

export default ManageMember;
