import React, { useEffect, useState } from 'react';
import './ManageAdmin.css';
import { Link } from 'react-router-dom';

const ManageAdmin = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/user/getAllUsers/')
            .then(response => response.json())
            .then(data => {
                // Filter users with RoleID: 2
                const staffAccounts = data.filter(account => account.RoleID === 2);
                setAccounts(staffAccounts);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

 
   
    

    return (
        <div className="table-container-staff">
            <h1>Manage Staff Accounts</h1>
            <Link to="/adding-account-staff" className="add-account-link">Add Account</Link>
            <table className="account-table-st">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tên tài khoản</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, index) => (
                        <tr key={account.UserID}>
                            <td>{index + 1}</td>
                            <td>{account.UserName}</td>
                            <td>{account.Email}</td> 
                            <td>{account.PhoneNumber}</td> 
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
    );
};

export default ManageAdmin;
