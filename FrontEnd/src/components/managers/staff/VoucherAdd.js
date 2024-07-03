import React, { useState } from "react";
import "./Voucher.css";
import { message } from "antd";
import { formatPrice } from "../../utils/formatPrice";

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

    if (name === "minDiscount") {
      const formattedMinDiscount = formatPrice(value);
      setVoucherData((prevData) => ({
        ...prevData,
        minDiscount: value.replace(/\D/g, ''), // Store numeric value
        formattedMinDiscount // Store formatted value for display
      }));
    } else if (name === "maxDiscount") {
      const formattedMaxDiscount = formatPrice(value);
      setVoucherData((prevData) => ({
        ...prevData,
        maxDiscount: value.replace(/\D/g, ''), // Store numeric value
        formattedMaxDiscount // Store formatted value for display
      }));
    } else {
      setVoucherData({
        ...voucherData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure voucherData from state
    const {
      voucherName,
      discountPercentage,
      minDiscount,
      maxDiscount,
      startDate,
      expiryDate,
      quantity,
    } = voucherData;

    // Validation checks
    if (!voucherName) {
      message.warning("Tên voucher không được bỏ trống.");
      return;
    }
    if (voucherName.length > 30) {
      message.warning("Tên voucher không được quá 30 kí tự.");
      return;
    }
    if (minDiscount === null || minDiscount === "") {
      message.warning("Giảm tối thiểu không được bỏ trống.");
      return;
    }
    if (minDiscount < 0) {
      message.warning("Giảm tối thiểu không được nhỏ hơn 0.");
      return;
    }
    if (quantity === null || quantity === "") {
      message.warning("Số lượng không được bỏ trống.");
      return;
    }
    if (quantity < 0) {
      message.warning("Số lượng không được nhỏ hơn 0.");
      return;
    }
    if (maxDiscount === null || maxDiscount === "") {
      message.warning("Giảm tối đa không được bỏ trống.");
      return;
    }
    if (maxDiscount < 0) {
      message.warning("Giảm tối đa không được nhỏ hơn 0.");
      return;
    }
    if (!startDate) {
      message.warning("Ngày bắt đầu không được bỏ trống.");
      return;
    }

    // Check if startDate is after today
    const today = new Date();
    const start = new Date(startDate);
    if (start < today) {
      message.warning("Ngày bắt đầu không được sau ngày hiện tại.");
      return;
    }

    if (!expiryDate) {
      message.warning("Ngày kết thúc không được bỏ trống.");
      return;
    }
    if (new Date(expiryDate) < start) {
      message.warning("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.");
      return;
    }
    if (discountPercentage === null || discountPercentage === "") {
      message.warning("Phần trăm giảm giá không được bỏ trống.");
      return;
    }
    if (discountPercentage < 0) {
      message.warning("Phần trăm giảm giá không được nhỏ hơn 0.");
      return;
    }

    // If all validations pass, proceed with API call
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
      .then(() => {
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
          <label htmlFor="voucherName">Tên Voucher</label>
          <input
            type="text"
            id="voucherName"
            name="voucherName"
            value={voucherData.voucherName}
            onChange={handleChange}
          />

          <label htmlFor="quantity">Số lượng</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={voucherData.quantity}
            onChange={handleChange}
          />

          <label htmlFor="startDate">Ngày bắt đầu</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={voucherData.startDate}
            onChange={handleChange}
          />

          <label htmlFor="discountPercentage">Phần trăm giảm giá (%)</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={voucherData.discountPercentage}
            onChange={handleChange}
          />
        </div>
        <div className="half-width">
          <label htmlFor="minDiscount"> Giảm tối thiểu</label>
          <input
            type="text"
            id="minDiscount"
            name="minDiscount"
            value={voucherData.formattedMinDiscount}
            onChange={handleChange}
          />

          <label htmlFor="maxDiscount">Giảm tối đa</label>
          <input
            type="number"
            id="maxDiscount"
            name="maxDiscount"
            value={voucherData.formattedMaxDiscount}
            onChange={handleChange}
          />

          <label htmlFor="expiryDate">Ngày kết thúc</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={voucherData.expiryDate}
            onChange={handleChange}
          />

          <button type="submit" className="create-voucher">
            Tạo voucher
          </button>
        </div>
      </form>
    </div>
  );
}

export default VoucherAdd;
