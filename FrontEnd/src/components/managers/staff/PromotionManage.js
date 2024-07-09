import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PromotionManage.css";
import { Link } from "react-router-dom";
import EditPromotionModal from "./EditPromotionModal";
import { Modal, message } from "antd";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import PromotionDetailModal from "./PromotionDetailModal";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import config from "../../config/config";

function PromotionManage() {
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const promotionsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        `${config.API_ROOT}/api/v1/promotion/getAllPromotions`
      );
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
  };

  const handleCloseModal = () => {
    setSelectedPromotion(null);
  };

  const handleDelete = (promotionId) => {
    setPromotionToDelete(promotionId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${config.API_ROOT}/api/v1/promotion/deletePromotion/${promotionToDelete}`
      );
      setPromotions(
        promotions.filter(
          (promotion) => promotion.PromotionID !== promotionToDelete
        )
      );
      message.success("Đã xóa khuyến mãi thành công");
    } catch (error) {
      console.error("Error deleting promotion:", error);
      message.error("Xảy ra lỗi khi xóa khuyến mãi");
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleSave = async (updatedPromotion) => {
    try {
      const response = await axios.put(
        `${config.API_ROOT}/api/v1/promotion/updatePromotion/${updatedPromotion.PromotionID}`,
        updatedPromotion
      );
      setPromotions(
        promotions.map((promotion) =>
          promotion.PromotionID === updatedPromotion.PromotionID
            ? response.data
            : promotion
        )
      );
      setEditingPromotion(null);
      fetchPromotions();
    } catch (error) {
      console.error("Error updating promotion:", error);
      message.error("Xảy ra lỗi khi cập nhật khuyến mãi");
    }
  };

  const handleToggleStatus = (promotion) => {
    const updatedProduct = {
      ...promotion,
      Status: promotion.Status === 1 ? 0 : 1,
    };

    fetch(
      `${config.API_ROOT}/api/v1/promotion/openPromotion/${promotion.PromotionID}`,
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
        setPromotions((prePromotions) =>
          prePromotions.map((p) =>
            p.PromotionID === promotion.PromotionID ? updatedProduct : p
          )
        );
        console.log(data);
        message.success("Trạng thái promotion đã được cập nhật!");
        fetchPromotions();
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật trạng thái promotion: " + error.message);
      });
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setCurrentPage(1);
  };

  const filteredPromotions = promotions.filter((promotion) => {
    const now = new Date();
    if (filterType === "active") {
      return new Date(promotion.EndDate) >= now;
    } else if (filterType === "expired") {
      return new Date(promotion.EndDate) < now;
    }
    return true;
  });

  const handleDetailClick = (promotion) => {
    setSelectedPromotion(promotion);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedPromotions = [...promotions].sort((a, b) => {
      if (key === "PromotionID") {
        return direction === "ascending"
          ? a.PromotionID - b.PromotionID
          : b.PromotionID - a.PromotionID;
      } else if (key === "PromotionName") {
        return direction === "ascending"
          ? a.PromotionName.localeCompare(b.PromotionName)
          : b.PromotionName.localeCompare(a.PromotionName);
      } else if (key === "DiscountPercentage") {
        return direction === "ascending"
          ? a.DiscountPercentage - b.DiscountPercentage
          : b.DiscountPercentage - a.DiscountPercentage;
      } else if (key === "StartDate") {
        return direction === "ascending"
          ? new Date(a.StartDate) - new Date(b.StartDate)
          : new Date(b.StartDate) - new Date(a.StartDate);
      } else if (key === "EndDate") {
        return direction === "ascending"
          ? new Date(a.EndDate) - new Date(b.EndDate)
          : new Date(b.EndDate) - new Date(a.EndDate);
      }
      return 0;
    });

    setPromotions(sortedPromotions);
    setSortConfig({ key, direction });
  };

  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = filteredPromotions.slice(
    indexOfFirstPromotion,
    indexOfLastPromotion
  );

  return (
    <div className="promo-table-container">
      <div className="d-flex justify-content-between align-items-end">
        <select
          className="filter-dropdown-promotion"
          value={filterType}
          onChange={handleFilterChange}>
          <option value="all">Tất cả</option>
          <option value="active">Còn hạn</option>
          <option value="expired">Hết hạn</option>
        </select>
        <Link to="/addpromotion">
          <button type="button" className="button-add-promotion">
            <span className="far fa-plus-square btn btn-secondary"></span>
          </button>
        </Link>
      </div>
      <table className="promo-table">
        <thead className="promo-thead">
          <tr>
            <th className="promo-th col-md-1">Stt</th>
            <th
              className={`promo-th col-md-2 ${sortConfig.key === "PromotionName" ? sortConfig.direction : ""
                }`}
              onClick={() => handleSort("PromotionName")}>
              Tên khuyến mãi
              <button className={`sort-icon-order`}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th className="promo-th col-md-2">Ảnh</th>

            <th
              className={`promo-th col-md-2 ${sortConfig.key === "StartDate" ? sortConfig.direction : ""
                }`}
              onClick={() => handleSort("StartDate")}>
              Bắt đầu
              <button className={`sort-icon-order`}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th
              className={`promo-th col-md-2 ${sortConfig.key === "EndDate" ? sortConfig.direction : ""
                }`}
              onClick={() => handleSort("EndDate")}>
              Kết thúc
              <button className={`sort-icon-order`}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th className="promo-th col-md-3">Thao tác</th>
          </tr>
        </thead>
        <tbody className="promo-tbody">
          {currentPromotions.map((promotion, index) => (
            <tr key={promotion.PromotionID}>
              <td className="promo-td col-md-1">
                {indexOfFirstPromotion + index + 1}
              </td>
              <td className="promo-td col-md-2">{promotion.PromotionName}</td>
              <td className="promo-td col-md-2">
                <img
                  className="promo-img"
                  src={promotion.Image}
                  alt={promotion.PromotionName}
                />
              </td>

              <td className="promo-td col-md-2">
                {new Date(promotion.StartDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="promo-td col-md-2">
                {new Date(promotion.EndDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="promo-td col-md-3">
                <div className="promo-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleDetailClick(promotion)}>
                    Xem
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning edit-vch-bt"
                    onClick={() => handleEdit(promotion)}>
                    Sửa
                  </button>
                  {promotion.Status === true ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(promotion.PromotionID)}>
                      Xóa
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleToggleStatus(promotion)}>
                      Mở
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPromotion && (
        <EditPromotionModal
          promotion={editingPromotion}
          onClose={() => setEditingPromotion(null)}
          onSave={handleSave}
        />
      )}
      {selectedPromotion && (
        <PromotionDetailModal
          promotion={selectedPromotion}
          onClose={handleCloseModal}
        />
      )}

      <Modal
        title="Xác nhận xóa khuyến mãi"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={handleCancelDelete}
        okText="Xác nhận"
        cancelText="Hủy">
        Bạn có chắc muốn xóa khuyến mãi này?
      </Modal>
      <div className="pagination-container-thinhvcher">
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={filteredPromotions.length}
          productsPerPage={promotionsPerPage}
        />
      </div>
    </div>
  );
}

PromotionManage.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      PromotionID: PropTypes.number.isRequired,
      PromotionName: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      DiscountPercentage: PropTypes.number.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
    })
  ),
};

export default PromotionManage;
