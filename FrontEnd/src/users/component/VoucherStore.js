import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VoucherStore.css";

function VoucherItem({ voucher }) {
  return (
    <div className="tri-voucher">
      <div className="voucher">
        <div className="voucher-body bg-orange-gradient">
          <div className="voucher-text">
            <h5 className="text-white mb-0 font-weight-bold">
              {voucher.VoucherName}
            </h5>
            <p className="text-white mb-0" style={{ lineHeight: 1 }}>
              <strong style={{ fontSize: "1.5rem" }}>
                {voucher.DiscountPercentage} %
              </strong>
              <br />
              Discount
            </p>
          </div>
          <div className="voucher-overlay d-none">
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>

          <div className="voucher-border-left"></div>
          <div className="voucher-border-right"></div>
        </div>
        <div className="voucher-footer">
          <div className="voucher-details">
            <div className="details-icon">
              {/* Icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffefed"
                  d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5"
                />
                <path
                  fill="#ff4933"
                  d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,3.5c-4.7,0-8.5,3.8-8.5,8.5 s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                />
                <path
                  fill="#ff4933"
                  d="M12.7,5.5c0-0.4-0.3-0.8-0.7-0.8s-0.7,0.3-0.7,0.8v7.2c0,0.4,0.3,0.8,0.7,0.8h5.8c0.4,0,0.7-0.3,0.7-0.8 s-0.3-0.8-0.7-0.8h-5.1V5.5z"
                />
              </svg>
            </div>
            <div className="details-text">
              <div className="text-title">Valid till</div>
              <div className="text-description text-primary">
                {new Date(voucher.ExpiryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="voucher-details">
            <div className="details-text">
              <div className="text-title">Minimum spend</div>
              <div className="text-description text-primary">
                {voucher.MinDiscount}đ
              </div>
             
            </div>
            
          </div>
          <div className="voucher-save">
                <button className="btn save-button-voucher">Save</button>
              </div>
        </div>
      </div>
    </div>
  );
}
function VoucherStore() {
  const [vouchers, setVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vouchersPerPage] = useState(3);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/voucher/getAllVouchers")
      .then((response) => {
        setVouchers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the vouchers!", error);
      });
  }, []);

  const indexOfLastVoucher = currentPage * vouchersPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
  const currentVouchers = vouchers.slice(
    indexOfFirstVoucher,
    indexOfLastVoucher
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="voucher-store">
      <h1>Voucher</h1>
      <div className="pagination-container">
        <button
          className="prev-page-button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          &lt; 
        </button>
        <button
          className="next-page-button"
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(vouchers.length / vouchersPerPage)
          }
        >
           &gt;
        </button>
      </div>
      <div className="row">
        {currentVouchers.map((voucher) => (
          <VoucherItem key={voucher.VoucherID} voucher={voucher} />
        ))}
      </div>
    </div>
  );
}

export default VoucherStore;