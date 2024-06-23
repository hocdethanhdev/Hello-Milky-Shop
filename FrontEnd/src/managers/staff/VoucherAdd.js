import React, { useState } from "react";
import "./Voucher.css";

function VoucherAdd() {
  const [voucherData, setVoucherData] = useState({
    voucherName: "",
    discountPercentage: "",
    minDiscount: "",
    maxDiscount: "",
    startDate: "",
    expiryDate: "",
    quantity: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucherData({
      ...voucherData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/v1/voucher/addVoucher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucherData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Voucher created successfully!");
        setErrorMessage("");
        setVoucherData({
          voucherName: "",
          discountPercentage: "",
          minDiscount: "",
          maxDiscount: "",
          startDate: "",
          expiryDate: "",
          quantity: "",
        });
      })
      .catch((error) => {
        setErrorMessage("Error creating voucher: " + error.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="voucher-form-thinhvcher">
      {successMessage && (
        <p className="success-message-thinhvcher">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message-thinhvcher">{errorMessage}</p>
      )}
      <h1>Tạo voucher</h1>
      <form onSubmit={handleSubmit}>
        <div className="half-width">
          <label htmlFor="voucherName">Voucher Name</label>
          <input
            type="text"
            id="voucherName"
            name="voucherName"
            value={voucherData.voucherName}
            onChange={handleChange}
            required
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={voucherData.quantity}
            onChange={handleChange}
            required
          />
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={voucherData.startDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="discountPercentage">Discount (%)</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={voucherData.discountPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="half-width">
          <label htmlFor="minDiscount">Min Discount</label>
          <input
            type="number"
            id="minDiscount"
            name="minDiscount"
            value={voucherData.minDiscount}
            onChange={handleChange}
            required
          />

          <label htmlFor="maxDiscount">Max Discount</label>
          <input
            type="number"
            id="maxDiscount"
            name="maxDiscount"
            value={voucherData.maxDiscount}
            onChange={handleChange}
            required
          />
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={voucherData.expiryDate}
            onChange={handleChange}
            required
          />
          <button type="submit" className="create-voucher">
            Create Voucher
          </button>
        </div>
      </form>
    </div>
  );
}

export default VoucherAdd;
