import React, { useEffect, useState } from "react";
import "./ManageMember.css";
import { Link } from "react-router-dom";

const ManageMember = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State để lưu thông tin người dùng đang chỉnh sửa
  const [editForm, setEditForm] = useState({
    UserName: "",
    Email: "",
    PhoneNumber: "",
  }); // State để quản lý dữ liệu trong form chỉnh sửa
  const [showEditPopup, setShowEditPopup] = useState(false); // State để điều khiển sự hiển thị của popup

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUsers/")
      .then((response) => response.json())
      .then((data) => {
        // Filter users with RoleID: 2
        const staffAccounts = data.filter((account) => account.RoleID === 3);
        setAccounts(staffAccounts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Function to handle editing user
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      UserName: user.UserName,
      Email: user.Email || "",
      PhoneNumber: user.PhoneNumber || "",
    });
    setShowEditPopup(true); // Hiển thị popup chỉnh sửa
  };

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to the server
    console.log("Submitting edited user:", editForm);
    // Example: Call API to update user data
    // fetch(`http://localhost:5000/api/v1/user/updateUser/${editingUser.UserID}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(editForm),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle success, update accounts state if necessary
    // })
    // .catch(error => console.error('Error updating user:', error));

    // Reset editing state
    setEditingUser(null);
    setEditForm({
      UserName: "",
      Email: "",
      PhoneNumber: "",
    });
    setShowEditPopup(false); // Đóng popup chỉnh sửa sau khi hoàn thành
  };

  return (
    <div className="table-container-staff">
      <table className="account-table-st">
        <thead>
          <tr>
            <th>No</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.UserID}>
              <td>{index + 1}</td>
              <td>{account.UserName}</td>
              <td>{account.Email}</td>
              <td>{account.PhoneNumber}</td>
              <td>
                <button
                  className="edit-button-staff"
                  onClick={() => handleEdit(account)}>
                  Edit
                </button>
                <button className="delete-button-staff">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Popup */}
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowEditPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMember;
