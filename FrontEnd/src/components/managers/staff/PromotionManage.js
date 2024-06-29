import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PromotionManage.css"; // Import the CSS file
import { Link } from "react-router-dom";
import EditPromotionModal from "./EditPromotionModal"; // Import the EditPromotionModal
import { Modal } from "antd";

function PromotionManage() {
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [editingPromotion, setEditingPromotion] = useState(null); // State for the promotion being edited
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const promotionsPerPage = 5;

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/promotion/getAllPromotions"
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

  const handleDelete = (promotionId) => {
    setPromotionToDelete(promotionId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/promotion/deletePromotion/${promotionToDelete}`
      );
      setPromotions(
        promotions.filter(
          (promotion) => promotion.PromotionID !== promotionToDelete
        )
      );
    } catch (error) {
      console.error("Error deleting promotion:", error);
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
        `http://localhost:5000/api/v1/promotion/updatePromotion/${updatedPromotion.PromotionID}`,
        updatedPromotion
      );
      setPromotions(
        promotions.map((promotion) =>
          promotion.PromotionID === updatedPromotion.PromotionID
            ? response.data
            : promotion
        )
      );
      setEditingPromotion(null); // Close the modal
      fetchPromotions();
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  const handleAddToPromotion = async (productID, promotionID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/applyPromotionToProduct",
        { productID, promotionID },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error adding product to promotion:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          onChange={handleFilterChange}
        >
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
            <th className="promo-th">Stt</th>
            <th className="promo-th">Tên khuyến mãi</th>
            <th className="promo-th">Ảnh</th>
            <th className="promo-th">Mô tả</th>
            <th className="promo-th">Giảm giá</th>
            <th className="promo-th">Bắt đầu</th>
            <th className="promo-th">Kết thúc</th>
            <th className="promo-th">Thao tác</th>
          </tr>
        </thead>
        <tbody className="promo-tbody">
          {currentPromotions.map((promotion, index) => (
            <tr key={promotion.PromotionID}>
              <td className="promo-td">{indexOfFirstPromotion + index + 1}</td>
              <td className="promo-td">{promotion.PromotionName}</td>
              <td className="promo-td">
                <img
                  className="promo-img"
                  src={promotion.Image}
                  alt={promotion.PromotionName}
                />
              </td>
              <td className="promo-td">{promotion.Description}</td>
              <td className="promo-td">{promotion.DiscountPercentage}%</td>
              <td className="promo-td">
                {new Date(promotion.StartDate).toLocaleDateString()}
              </td>
              <td className="promo-td">
                {new Date(promotion.EndDate).toLocaleDateString()}
              </td>
              <td className="promo-td">
                <div className="promo-buttons">
                  <button
                    className="promo-button promo-button-edit"
                    onClick={() => handleEdit(promotion)}
                  >
                    Sửa
                  </button>
                  <button
                    className="promo-button promo-button-delete"
                    onClick={() => handleDelete(promotion.PromotionID)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container-promotion">
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={filteredPromotions.length}
          itemsPerPage={promotionsPerPage}
        />
      </div>
      {editingPromotion && (
        <EditPromotionModal
          promotion={editingPromotion}
          onClose={() => setEditingPromotion(null)}
          onSave={handleSave}
        />
      )}
      <Modal
        title="Xác nhận xóa khuyến mãi"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa khuyến mãi này?</p>
      </Modal>
    </div>
  );
}

const ThrowPage = ({ current, onChange, total, itemsPerPage }) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        className="page-button"
        disabled={current === 1}
        onClick={() => handleClick(current - 1)}
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-button ${current === index + 1 ? "active" : ""}`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="page-button"
        disabled={current === totalPages}
        onClick={() => handleClick(current + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default PromotionManage;
