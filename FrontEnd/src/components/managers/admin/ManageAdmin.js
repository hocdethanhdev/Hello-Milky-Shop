import React, { useEffect, useState } from "react";
import "./Manage.css";
import { Link } from "react-router-dom";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";

const ManageAdmin = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUsers/")
      .then((response) => response.json())
      .then((data) => {
        const staffAccounts = data.filter((account) => account.RoleID === 2);
        setAccounts(staffAccounts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container-staff manager-container">
      <div className="css-class-account-manager">
        <Link to="/adding-account-admin">
          <button type="button" className="button-add-product">
            <span className="far fa-plus-square btn btn-secondary"></span>
          </button>
        </Link>
        <table className="account-table-st">
          <thead>
            <tr className="row">
              <th className="col-md-1">No</th>
              <th className="col-md-3">Tên tài khoản</th>
              <th className="col-md-4">Email</th>
              <th className="col-md-4">Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr className="row" key={account.UserID}>
                <td className="col-md-1">{index + 1}</td>
                <td className="col-md-3">{account.UserName}</td>
                <td className="col-md-4">{account.Email}</td>
                <td className="col-md-4">{account.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container-cf">
          <ThrowPage
            current={currentPage}
            onChange={handlePageChange}
            total={accounts.length}
            productsPerPage={accountsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
