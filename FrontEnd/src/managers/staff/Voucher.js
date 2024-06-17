import React, { useState, useEffect } from "react";
import "./Voucher.css";
import { Link } from "react-router-dom";
import EditVoucherModal from "./EditVoucherModal";
import ThrowPage from "../../users/ui-list-product-mom/ThrowPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";

function Voucher() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [vouchers, setVouchers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVoucherForEdit, setSelectedVoucherForEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/voucher/getAllVouchers")
      .then((response) => response.json())
      .then((data) => setVouchers(data))
      .catch((error) => console.error("Error fetching vouchers:", error));
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedVouchers = [...vouchers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredVouchers = sortedVouchers.filter((voucher) => {
    if (statusFilter === "All") return true;
    return statusFilter === "active" ? voucher.Status : !voucher.Status;
  });

  const handleEditClick = (voucher) => {
    setSelectedVoucherForEdit(voucher);
  };

  const handleSaveVoucher = (updatedVoucher) => {
    fetch(
      `http://localhost:5000/api/v1/voucher/updateVoucher/${updatedVoucher.VoucherID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVoucher),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Voucher đã được cập nhật thành công!");
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("Lỗi khi cập nhật voucher: " + error.message);
      });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  return (
    <div className="voucher-container-thinhvcher">
      <div className="voucher-body-thinhvcher">
        <div className="voucher-main-content-thinhvcher">
          <h1>Voucher Management</h1>
          {successMessage && (
            <p
              className={`success-message-thinhvcher ${
                successMessage.includes("Lỗi")
                  ? "error-thinhvcher"
                  : "success-thinhvcher"
              }`}
            >
              {successMessage}
            </p>
          )}
          <div className="voucher-list-thinhvcher">
            <Link to="/addingvoucher">
              <div className="d-flex justify-content-end align-items-end">
                <button type="button" className="button-add-voucher-thinhvcher">
                  <span className="far fa-plus-square btn btn-secondary"></span>
                </button>
              </div>
            </Link>
            <table>
              <thead>
                <tr>
                  <th>
                    Voucher Name
                    <button onClick={() => handleSort("VoucherName")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Quantity
                    <button onClick={() => handleSort("Quantity")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Discount Percentage
                    <button onClick={() => handleSort("DiscountPercentage")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Min Discount
                    <button onClick={() => handleSort("MinDiscount")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Max Discount
                    <button onClick={() => handleSort("MaxDiscount")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Start Date
                    <button onClick={() => handleSort("StartDate")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                    Expiry Date
                    <button onClick={() => handleSort("ExpiryDate")}>
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th>
                  
                    <div className="filter-dropdown-thinhvcher">
                    Status
                      <button onClick={toggleStatusDropdown}>
                      <FontAwesomeIcon icon={faFilter} />
                      </button>
                      {showStatusDropdown && (
                        <ul className="dropdown-content-thinhvcher">
                          <li onClick={() => handleStatusFilter("All")}>All</li>
                          <li onClick={() => handleStatusFilter("active")}>
                            Active
                          </li>
                          <li onClick={() => handleStatusFilter("inactive")}>
                            Inactive
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVouchers.map((voucher) => (
                  <tr key={voucher.VoucherID}>
                    <td>{voucher.VoucherName}</td>
                    <td>{voucher.Quantity}</td>
                    <td>{voucher.DiscountPercentage}%</td>
                    <td>{voucher.MinDiscount}</td>
                    <td>{voucher.MaxDiscount}</td>
                    <td>{new Date(voucher.StartDate).toLocaleDateString()}</td>
                    <td>{new Date(voucher.ExpiryDate).toLocaleDateString()}</td>
                    <td>{voucher.Status ? "Active" : "Inactive"}</td>
                    <td>
                      <button onClick={() => handleEditClick(voucher)}>
                        Edit
                      </button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedVoucherForEdit && (
        <EditVoucherModal
          voucher={selectedVoucherForEdit}
          onClose={() => setSelectedVoucherForEdit(null)}
          onSave={handleSaveVoucher}
        />
      )}
      <div className="pagination-container-thinhvcher">
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={filteredVouchers.length}
          productsPerPage={10}
        />
      </div>
    </div>
  );
}

export default Voucher;
