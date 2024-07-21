import React, { useEffect, useState } from "react";
import { Table, Modal, message, Input } from "antd";
import axios from "axios";
import "./Manage.css";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import config from "../../config/config";

const { Search } = Input;

const ManageMember = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const accountsPerPage = 10;

  const fetchUser = () => {
    fetch(`${config.API_ROOT}/api/v1/user/getAllUsers/`)
      .then((response) => response.json())
      .then((data) => {
        const staffAccounts = data.filter((account) => account.RoleID === 3);
        setAccounts(staffAccounts);
        setFilteredAccounts(staffAccounts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFilteredAccounts(
      accounts.filter(
        (account) =>
          (account.UserName &&
            account.UserName.toLowerCase().includes(
              searchText.toLowerCase()
            )) ||
          (account.PhoneNumber && account.PhoneNumber.includes(searchText))
      )
    );
  }, [searchText, accounts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const check = await axios.post(
      `${config.API_ROOT}/api/v1/order/checkOrderOfUser`,
      {
        UserID: selectedUser.UserID,
      }
    );
    if (check.data.status === 1) {
      message.error("Tài khoản đang có đơn hàng không thể chặn");
      setIsModalVisible(false);
    } else {
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
          fetchUser();
        })
        .catch((error) => console.error("Error updating user status:", error));
    }
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
        fetchUser();
      })
      .catch((error) => console.error("Error enabling user:", error));
  };

  const columns = [
    {
      title: "Stt",
      dataIndex: "index",
      key: "index",
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "UserName",
      key: "UserName",
      sorter: (a, b) => a.UserName.localeCompare(b.UserName),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      sorter: (a, b) => a.PhoneNumber.localeCompare(b.PhoneNumber),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Bị khóa", value: false },
      ],
      onFilter: (value, record) => record.Status === value,
      render: (Status) => (Status ? "Hoạt động " : "Bị khóa"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          {record.Status === true ? (
            <button
              className="btn btn-danger"
              onClick={() => showModal(record)}
            >
              Khóa
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => handleEnableUser(record)}
            >
              Mở
            </button>
          )}
        </>
      ),
    },
  ];

  const startIndex = (currentPage - 1) * accountsPerPage;
  const endIndex = startIndex + accountsPerPage;
  const currentAccounts = filteredAccounts
    .slice(startIndex, endIndex)
    .map((account, index) => ({
      ...account,
      index: startIndex + index + 1,
    }));

  return (
    <div className="table-container-staff manager-container">
      <div className="css-class-account-manager css-class-account-manager-only-member">
        <div className="search-barrr">
          <Search
            placeholder="Tìm kiếm theo tên tài khoản"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginBottom: 16, float: "right" }}
          />
        </div>
        <div className="account-table-st">
          <Table
            columns={columns}
            dataSource={currentAccounts}
            pagination={false}
            rowKey="UserID"
          />
        </div>

        <div className="pagination-container-cf">
          <ThrowPage
            current={currentPage}
            onChange={handlePageChange}
            total={filteredAccounts.length}
            productsPerPage={accountsPerPage}
          />
        </div>
      </div>

      <Modal
        title="Xác nhận khóa tài khoản"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn khóa tài khoản này không?</p>
      </Modal>
    </div>
  );
};

export default ManageMember;
