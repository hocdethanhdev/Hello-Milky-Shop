
    // { discount: "Voucher 50%", maxDiscount: "150k", minDiscount: "50k", validUntil: "15-04-2021" },
    // { discount: "Voucher 30%", maxDiscount: "100k", minDiscount: "40k", validUntil: "30-09-2024" },
    // { discount: "Voucher 20%", maxDiscount: "50k", minDiscount: "20k", validUntil: "31-12-2024" },
    // { discount: "Voucher 25%", maxDiscount: "75k", minDiscount: "30k", validUntil: "01-01-2024" },
    // { discount: "Voucher 40%", maxDiscount: "120k", minDiscount: "50k", validUntil: "15-05-2024" },
    // { discount: "Voucher 35%", maxDiscount: "110k", minDiscount: "45k", validUntil: "20-06-2024" },
    // { discount: "Voucher 45%", maxDiscount: "140k", minDiscount: "60k", validUntil: "10-07-2024" },
    // { discount: "Voucher 55%", maxDiscount: "160k", minDiscount: "70k", validUntil: "25-08-2024" },
    // { discount: "Voucher 60%", maxDiscount: "170k", minDiscount: "80k", validUntil: "30-09-2024" },
    // { discount: "Voucher 70%", maxDiscount: "200k", minDiscount: "90k", validUntil: "31-10-2024" },
    import React, { useState, useEffect } from "react";
    import "./VoucherStore.css";
    import Menu from "./Menu";
    
    function VoucherStore() {
      const [vouchers, setVouchers] = useState([]);
    
      useEffect(() => {
        // Simulate an API call to fetch vouchers
        const fetchVouchers = async () => {
          const response = await fetch('/api/vouchers'); // Replace with your API endpoint
          const data = await response.json();
          setVouchers(data);
        };
    
        fetchVouchers();
      }, []);
    
      return (
        <div className="voucher-store-container-tri">
          <div className="menu-col-tri">
            <Menu />
          </div>
          <div className="vouchers-col-tri">
            <div className="voucher-store">
              
              <div className="voucher-list-tri">
                {vouchers.map((voucher, index) => (
                  <div className="voucher-wrapper-tri" key={index}>
                    <div className="voucher-item-tri">
                      <div className="voucher-discount-tri">{voucher.discount}</div>
                      <div className="voucher-details-tri">
                        <div className="voucher-info-tri">
                          <p>Giảm tối đa: {voucher.maxDiscount}</p>
                          <p>Đơn tối thiểu: {voucher.minDiscount}</p>
                          <p>Ngày hết hạn: {voucher.validUntil}</p>
                        </div>
                      </div>
                      <button className="redeem-button-tri">Lưu</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default VoucherStore;
    