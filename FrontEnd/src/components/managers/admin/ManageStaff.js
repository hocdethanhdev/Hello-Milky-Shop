import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import "./Manage.css";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import config from "../../config/config";

const ManageStaff = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    UserName: "",
    Email: "",
    PhoneNumber: "",
  });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const accountsPerPage = 10;

  const fetchUsers = () => {
    fetch(`${config.API_ROOT}/api/v1/user/getAllUsers/`)
      .then((response) => response.json())
      .then((data) => {
        const staffAccounts = data.filter((account) => account.RoleID === 2);
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
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    fetch(
      `${config.API_ROOT}/api/v1/user/disableUser/${selectedUser.UserID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: 0 }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setAccounts(
          accounts.map((account) =>
            account.UserID === selectedUser.UserID
              ? { ...account, Status: 0 }
              : account
          )
        );
        setIsModalVisible(false);
        message.success("Khóa tài khoản thành công");

        fetchUsers();
      })
      .catch((error) => console.error("Error updating user status:", error));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEnableUser = (user) => {
    fetch(`${config.API_ROOT}/api/v1/user/disableUser/${user.UserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Status: 1 }),
    })
      .then((response) => response.json())
      .then(() => {
        setAccounts(
          accounts.map((account) =>
            account.UserID === user.UserID ? { ...account, Status: 1 } : account
          )
        );
        message.success("Mở khóa tài khoản thành công");
        fetchUsers();
      })
      .catch((error) => console.error("Error enabling user:", error));
  };

  return (
    <div className="table-container-staff manager-container">
      <div className="css-class-account-manager">
        <Link to="/adding-account-staff">
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
              <th className="col-md-2">Số điện thoại</th>
              <th className="col-md-2">Trạng thái</th>
              <th className="col-md-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr className="row" key={account.UserID}>
                <td className="col-md-1">{index + 1}</td>
                <td className="col-md-2">{account.UserName}</td>
                <td className="col-md-3">{account.Email}</td>
                <td className="col-md-2">{account.PhoneNumber}</td>
                <td className="col-md-2">
                  {account.Status ? "Hoạt động" : "Bị khóa"}
                </td>
                <td className="col-md-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(account)}
                  >
                    Sửa
                  </button>
                  {account.Status === true ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => showModal(account)}
                    >
                      Khóa
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleEnableUser(account)}
                    >
                      Mở
                    </button>
                  )}
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
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
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

      <Modal
        title="Xác nhận khóa tài khoản"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn khóa tài khoản này không?</p>
      </Modal>
    </div>
  );
};

export default ManageStaff;
