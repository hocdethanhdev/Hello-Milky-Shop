import React, { useState, useEffect } from "react";
import axios from "axios";
import './VoucherStore.css';

function VoucherItem({ voucher, onSave }) {
  const handleSave = async () => {
    try {
      await onSave(voucher.VoucherID);
    } catch (error) {
      console.error("Error saving voucher:", error);
    }
  };

  return (
    <div className="voucher-item">
      <p>Voucher Name: {voucher.VoucherName}</p>
      <p>Voucher ID: {voucher.VoucherID}</p>
      <p>Discount Percentage: {voucher.DiscountPercentage}%</p>
      <p>Max Discount: {voucher.MaxDiscount}</p>
      <p>Min Discount: {voucher.MinDiscount}</p>
      <p>Start Date: {new Date(voucher.StartDate).toLocaleDateString()}</p>
      <p>Expiry Date: {new Date(voucher.ExpiryDate).toLocaleDateString()}</p>
    </div>
  );
}

function VoucherStore() {
  const [vouchers, setVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vouchersPerPage = 5;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/voucher/getAllVouchers");
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const indexOfLastVoucher = currentPage * vouchersPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
  const currentVouchers = vouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

  const nextPage = () => {
    if (currentPage < Math.ceil(vouchers.length / vouchersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="voucher-wrapper">
      <h1>Voucher</h1>
      <div className="voucher-store-container">
        {currentVouchers.map((voucher) => (
          <VoucherItem key={voucher.VoucherID} voucher={voucher} />
        ))}
        <div className="pagination-controls">
          <button className="prev-page-button" onClick={prevPage} disabled={currentPage === 1}></button>
          <button className="next-page-button" onClick={nextPage} disabled={currentPage === Math.ceil(vouchers.length / vouchersPerPage)}></button>
        </div>
      </div>
    </div>
  );
}

export default VoucherStore;
