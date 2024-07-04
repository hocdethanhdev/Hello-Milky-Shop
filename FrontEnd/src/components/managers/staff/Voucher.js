import React, { useState, useEffect } from "react";
import "./Voucher.css";
import { Link } from "react-router-dom";
import EditVoucherModal from "./EditVoucherModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import DeleteConfirmationPopupForVoucher from "./DeleteConfirmationPopupForVoucher";
import { message } from "antd";
import VoucherDetailModal from "./VoucherDetailModal";
import { formatPrice } from "../../utils/formatPrice";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for delete confirmation popup
  const [deleteVoucherId, setDeleteVoucherId] = useState(null); // Track voucher ID to delete
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = () => {
    fetch("http://localhost:5000/api/v1/voucher/getAllVouchers")
      .then((response) => response.json())
      .then((data) => setVouchers(data))
      .catch((error) => console.error("Error fetching vouchers:", error));
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (voucherID) => {
    setDeleteVoucherId(voucherID);
    setShowDeletePopup(true); // Show delete confirmation popup
  };

  const confirmDelete = (voucherID) => {
    fetch(`http://localhost:5000/api/v1/voucher/deleteVoucher/${voucherID}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        message.success("Voucher đã được xóa thành công!");
        fetchVouchers();
      })
      .catch((error) => {
        message.error("Lỗi khi xóa voucher: " + error.message);
      })
      .finally(() => {
        setShowDeletePopup(false); // Hide delete confirmation popup
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false); // Hide delete confirmation popup
  };

  const handleEditClick = (voucher) => {
    setSelectedVoucherForEdit(voucher);
  };

  const handleDetailClick = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const handleCloseModal = () => {
    setSelectedVoucher(null);
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
      .then(() => {
        message.success("Voucher đã được cập nhật thành công!");
        fetchVouchers();
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật voucher: " + error.message);
      });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };
  const handleToggleStatus = (voucher) => {
    const updatedProduct = {
      ...voucher,
      Status: voucher.Status === 1 ? 0 : 1,
    };

    fetch(
      `http://localhost:5000/api/v1/voucher/openVoucher/${voucher.VoucherID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVouchers((prevVouchers) =>
          prevVouchers.map((p) =>
            p.VoucherID === voucher.VoucherID ? updatedProduct : p
          )
        );
        console.log(data);
        message.success("Trạng thái sản phẩm đã được cập nhật!");
        fetchVouchers();
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật trạng thái sản phẩm: " + error.message);
      });
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

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage("");
      }, 3000); // Hides the success message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="voucher-container-thinhvcher">
      <div className="voucher-body-thinhvcher">
        {showSuccess && (
          <div
            className={`success-message-thinhvcher ${successMessage.includes("Lỗi")
                ? "error-thinhvcher"
                : "success-thinhvcher"
              } success-message-show`}>
            {successMessage}
          </div>
        )}
        <div className="voucher-list-thinhvcher">
          <div className="d-flex justify-content-end align-items-end padding-0">
            <Link to="/addingvoucher">
              <button type="button" className="button-add-voucher-thinhvcher">
                <span className="far fa-plus-square btn btn-secondary"></span>
              </button>
            </Link>
          </div>

          <table>
            <thead>
              <tr>
                <th className="col-md-2">
                  Tên Voucher
                  <button
                    className="sort-vch-thinh"
                    onClick={() => handleSort("VoucherName")}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th className="col-md-2">
                  Số lượng
                  <button
                    className="sort-vch-thinh"
                    onClick={() => handleSort("Quantity")}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th className="col-md-2">
                  Phần trăm giảm giá
                  <button
                    className="sort-vch-thinh"
                    onClick={() => handleSort("DiscountPercentage")}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>

                <th className="col-md-2">
                  Ngày bắt đầu
                  <button
                    className="sort-vch-thinh"
                    onClick={() => handleSort("StartDate")}>
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>

                <th className="col-md-2">
                  <div className="filter-dropdown-thinhvcher">
                    Trạng thái
                    {showStatusDropdown && (
                      <ul className="dropdown-content-thinhvcher">
                        <li onClick={() => handleStatusFilter("All")}>All</li>
                        <li onClick={() => handleStatusFilter("active")}>
                          Khả dụng
                        </li>
                        <li onClick={() => handleStatusFilter("inactive")}>
                          Không khả dụng
                        </li>
                      </ul>
                    )}
                  </div>
                  <button
                    className="sort-vch-thinh"
                    onClick={toggleStatusDropdown}>
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.VoucherID}>
                  <td>{voucher.VoucherName}</td>
                  <td>{voucher.Quantity}</td>
                  <td>{voucher.DiscountPercentage}%</td>
                  <td>
                    {new Date(voucher.StartDate).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{voucher.Status ? "Khả dụng" : "Không khả dụng"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleDetailClick(voucher)}>
                      Xem
                    </button>
                    <button
                      className="btn btn-warning edit-vch-bt"
                      onClick={() => handleEditClick(voucher)}>
                      Sửa
                    </button>
                    {voucher.Status === true ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(voucher.VoucherID)}
                      >
                        Xóa
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleToggleStatus(voucher)}
                      >
                        Mở
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container-thinhvcher">
            <ThrowPage
              current={currentPage}
              onChange={handlePageChange}
              total={filteredVouchers.length}
              productsPerPage={10}
            />
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
      {showDeletePopup && (
        <DeleteConfirmationPopupForVoucher
          visible={showDeletePopup}
          onConfirm={() => confirmDelete(deleteVoucherId)}
          onCancel={cancelDelete}
        />
      )}
      {selectedVoucher && (
        <VoucherDetailModal
          voucher={selectedVoucher}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Voucher;
