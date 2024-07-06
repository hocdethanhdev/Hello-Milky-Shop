import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import "./Manage.css";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import config from "../../config/config";

const ManageAdmin = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    UserName: "",
    Email: "",
    PhoneNumber: "",
  });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 10;

  const fetchUsers = () => {
    fetch(`${config.API_ROOT}/api/v1/user/getAllUsers/`)
      .then((response) => response.json())
      .then((data) => {
        const staffAccounts = data.filter((account) => account.RoleID === 1);
        setAccounts(staffAccounts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      UserName: user.UserName,
      Email: user.Email || "",
      PhoneNumber: user.PhoneNumber || "",
    });
    setShowEditPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Email") {
      // Validate email format
      if (value.trim() && !/\S+@\S+\.\S+/.test(value)) {
        message.error("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.");
      }
    }
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editForm.UserName.trim()) {
      message.error("Tên tài khoản không được để trống");
      return;
    }
    if (editForm.UserName.length > 50) {
      message.error("Tên tài khoản không được vượt quá 50 kí tự.");
      return;
    }
    if (!editForm.PhoneNumber.trim()) {
      message.error("Vui lòng nhập số điện thoại.");
      return;
    }
    if (editForm.PhoneNumber.length < 11 || editForm.PhoneNumber.length > 15) {
      message.error("Số điện thoại không hợp lệ.");
      return;
    }

    fetch(`${config.API_ROOT}/api/v1/user/updateInforUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: editingUser.UserID,
        ...editForm,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Chỉnh sửa thành công!");
        setAccounts(
          accounts.map((account) =>
            account.UserID === editingUser.UserID
              ? { ...account, ...editForm }
              : account
          )
        );
        setShowEditPopup(false);
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        message.error("Chỉnh sửa thất bại!");
      });
  };

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
              <th className="col-md-1">Stt</th>
              <th className="col-md-2">Tên tài khoản</th>
              <th className="col-md-3">Email</th>
              <th className="col-md-3">Số điện thoại</th>
              <th className="col-md-3">Thao thác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr className="row" key={account.UserID}>
                <td className="col-md-1">{index + 1}</td>
                <td className="col-md-2">{account.UserName}</td>
                <td className="col-md-3">{account.Email}</td>
                <td className="col-md-3">{account.PhoneNumber}</td>
                <td className="col-md-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(account)}>
                    Sửa
                  </button>
                </td>
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

      {showEditPopup && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <form onSubmit={handleSubmit}>
              <label>
                Tên tài khoản:
                <input
                  type="text"
                  name="UserName"
                  value={editForm.UserName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="Email"
                  value={editForm.Email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Số điện thoại:
                <input
                  type="text"
                  name="PhoneNumber"
                  value={editForm.PhoneNumber}
                  onChange={handleChange}
                />
              </label>
              <div className="edit-popup-buttons">
                <button type="submit">Lưu</button>
                <button type="button" onClick={() => setShowEditPopup(false)}>
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
