import React from "react";
import "./VoucherStore.css";

function VoucherStore() {
  const vouchers = [
    { discount: "Voucher 50%", maxDiscount: "150k", minDiscount: "50k", validUntil: "15-04-2021" },
    { discount: "Voucher 30%", maxDiscount: "100k", minDiscount: "40k", validUntil: "30-09-2024" },
    { discount: "Voucher 20%", maxDiscount: "50k", minDiscount: "20k", validUntil: "31-12-2024" },
    { discount: "Voucher 25%", maxDiscount: "75k", minDiscount: "30k", validUntil: "01-01-2024" },
    { discount: "Voucher 40%", maxDiscount: "120k", minDiscount: "50k", validUntil: "15-05-2024" },
    { discount: "Voucher 35%", maxDiscount: "110k", minDiscount: "45k", validUntil: "20-06-2024" },
    { discount: "Voucher 45%", maxDiscount: "140k", minDiscount: "60k", validUntil: "10-07-2024" },
    { discount: "Voucher 55%", maxDiscount: "160k", minDiscount: "70k", validUntil: "25-08-2024" },
    { discount: "Voucher 60%", maxDiscount: "170k", minDiscount: "80k", validUntil: "30-09-2024" },
    { discount: "Voucher 70%", maxDiscount: "200k", minDiscount: "90k", validUntil: "31-10-2024" },
  ];

  return (
    <div className="voucher-store">
      
      <div className="voucher-list">
        {vouchers.map((voucher, index) => (
          <div className="voucher-wrapper" key={index}>
            <div className="voucher-item">
              <div className="voucher-discount">{voucher.discount}</div>
              <div className="voucher-details">
                <div className="voucher-info">
                  <p>Giảm tối đa: {voucher.maxDiscount}</p>
                  <p>Đơn tối thiểu: {voucher.minDiscount}</p>
                  <p>Ngày hết hạn: {voucher.validUntil}</p>
                </div>
              </div>
              <button className="redeem-button">Lưu</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoucherStore;
