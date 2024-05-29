import React from 'react';
import './Posts.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Posts() {
    return (
        <div className="posts-container">
            <h1>Post Management</h1>
            <Link to="/addingpost">
                <div className='d-flex justify-content-end align-items-end'>
                    <button type="button" className="button-add-voucher">
                        <span className="far fa-plus-square btn btn-secondary"></span>
                    </button>
                </div>
            </Link>
            <div className="post-list">
                <table>
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>STAFF001</td>
                            <td>New Milk Product Launch</td>
                            <td>Dairy</td>
                            <td>2024-05-17</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>STAFF002</td>
                            <td>Milk Store Anniversary</td>
                            <td>Events</td>
                            <td>2024-04-10</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Posts;
