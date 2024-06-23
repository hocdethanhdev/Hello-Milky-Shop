import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PromotionManage.css"; // Import the CSS file
import { Link } from "react-router-dom";
function PromotionManage() {
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const promotionsPerPage = 4; // Number of promotions per page

  useEffect(() => {
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

    fetchPromotions();
  }, []);

  const handleEdit = (promotionId) => {
    console.log("Edit promotion with ID:", promotionId);
  };

  const handleDelete = (promotionId) => {
    console.log("Delete promotion with ID:", promotionId);
  };

  const handleAddToPromotion = async (productID, promotionID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/applyPromotionToProduct",
        { productID, promotionID },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Product added to promotion:", response.data);
      // Optionally, you can update state or show a success message here
    } catch (error) {
      console.error("Error adding product to promotion:", error);
      // Handle error scenario, show error message or retry logic
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = promotions.slice(
    indexOfFirstPromotion,
    indexOfLastPromotion
  );

  return (
    <div className="promo-table-container">
      <h1 className="promo-heading">Promotions</h1>
      <div className="d-flex justify-content-end align-items-end">
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
            <th className="promo-th">Promotion Name</th>
            <th className="promo-th">Image</th>
            <th className="promo-th">Description</th>
            <th className="promo-th">Discount Percentage</th>
            <th className="promo-th">Start Date</th>
            <th className="promo-th">End Date</th>
            <th className="promo-th">Actions</th>
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
                    onClick={() => handleEdit(promotion.PromotionID)}>
                    Edit
                  </button>
                  <button
                    className="promo-button promo-button-delete"
                    onClick={() => handleDelete(promotion.PromotionID)}>
                    Delete
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
          total={promotions.length}
          itemsPerPage={promotionsPerPage}
        />
      </div>
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
        onClick={() => handleClick(current - 1)}>
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-button ${current === index + 1 ? "active" : ""}`}
          onClick={() => handleClick(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button
        className="page-button"
        disabled={current === totalPages}
        onClick={() => handleClick(current + 1)}>
        &gt;
      </button>
    </div>
  );
};

export default PromotionManage;
