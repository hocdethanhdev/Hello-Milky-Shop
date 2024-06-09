// VoucherStore.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import NavCate from '../ui-product-mom/NavCate';
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
      <p>Voucher ID: {voucher.VoucherID}</p>
      <p>Discount Percentage: {voucher.DiscountPercentage}%</p>
      <button onClick={handleSave}>Lưu</button>
    </div>
  );
}

function SavedVouchers({ savedVouchers }) {
  return (
    <div className="saved-vouchers-container">
      <h2 className="saved-vouchers-header">Danh sách các voucher đã lưu</h2>
      {savedVouchers.length > 0 ? (
        <ul className="saved-vouchers-list">
          {savedVouchers.map((savedVoucher) => (
            <li key={savedVoucher.UserVoucherID} className="saved-voucher-item">
              <p className="saved-voucher-info">
                <span className="voucher-info-label">Voucher ID:</span> {savedVoucher.VoucherID}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có voucher nào được lưu.</p>
      )}
    </div>
  );
}


function VoucherStore() {
  const [vouchers, setVouchers] = useState([]);
  const [savedVouchers, setSavedVouchers] = useState([]);

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

  const saveVoucher = async (voucherID) => {
    try {
      await axios.post("http://localhost:5000/api/v1/voucher/saveVoucherForUser", {
        userID: "M0000001", 
        voucherID: voucherID,
      });
      fetchSavedVouchers();
    } catch (error) {
      console.error("Error saving voucher:", error);
    }
  };

  const fetchSavedVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/voucher/getVouchersByUserID/M0000001");
      setSavedVouchers(response.data);
    } catch (error) {
      console.error("Error fetching saved vouchers:", error);
    }
  };

  return (
    <div>
      
      
      <div className="voucher-store-container">
        {vouchers.map((voucher) => (
          <VoucherItem key={voucher.VoucherID} voucher={voucher} onSave={saveVoucher} />
        ))}
      </div>
      <div className="voucher-store-saved">
        <SavedVouchers savedVouchers={savedVouchers} />
      </div>
    </div>
  );
}

export default VoucherStore;
