import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import "./Manage.css";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";

const ManageMember = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const accountsPerPage = 10;

  const fetchUser = () => {
    fetch("http://localhost:5000/api/v1/user/getAllUsers/")
      .then((response) => response.json())
      .then((data) => {
        const staffAccounts = data.filter((account) => account.RoleID === 3);
        setAccounts(staffAccounts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    fetch(
      `http://localhost:5000/api/v1/user/disableUser/${selectedUser.UserID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: 0 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAccounts(
          accounts.map((account) =>
            account.UserID === selectedUser.UserID
              ? { ...account, Status: 0 }
              : account
          )
        );
        setIsModalVisible(false);
        fetchUser();
      })
      .catch((error) => console.error("Error updating user status:", error));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEnableUser = (user) => {
    fetch(`http://localhost:5000/api/v1/user/disableUser/${user.UserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Status: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccounts(
          accounts.map((account) =>
            account.UserID === user.UserID ? { ...account, Status: 1 } : account
          )
        );
        fetchUser();
      })
      .catch((error) => console.error("Error enabling user:", error));
  };

  return (
    <div className="table-container-staff manager-container">
      <div className="css-class-account-manager css-class-account-manager-only-member">
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
                  {account.Status ? "Hoạt động " : "Bị khóa"}
                </td>
                <td className="col-md-2">
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

      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn khóa tài khoản này không?</p>
      </Modal>
    </div>
  );
};

export default ManageMember;
