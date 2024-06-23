import React, { useState } from "react";
import axios from "axios";
import "./AddPromotion.css";

function AddPromotion({ onAddPromotion }) {
  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/addPromotion",
        {
          promotionName,
          description,
          discountPercentage,
          startDate,
          endDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("New Promotion added:", response.data);
      onAddPromotion(response.data); // Notify parent component of new promotion
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  return (
    <div className="add-promotion-container">
      <h2>Add Promotion</h2>
      <PromotionForm
        promotionName={promotionName}
        setPromotionName={setPromotionName}
        description={description}
        setDescription={setDescription}
        discountPercentage={discountPercentage}
        setDiscountPercentage={setDiscountPercentage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function PromotionForm({
  promotionName,
  setPromotionName,
  description,
  setDescription,
  discountPercentage,
  setDiscountPercentage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="promotion-form">
          <div className="half">
            <div>
              <label>Promotion Name:</label>
              <input
                type="text"
                value={promotionName}
                onChange={(e) => setPromotionName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Discount Percentage:</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="half">
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <button type="submit">Add Promotion</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPromotion;
