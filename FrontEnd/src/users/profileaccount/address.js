import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./address.css"; // Import the CSS file

function Address() { // Changed function name to start with an uppercase letter
  const [addressData, setAddressData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Replace with your actual API URL
    const apiURL = 'https://api.example.com/address';
    
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setAddressData({
          name: data.name,
          phone: data.phone,
          address: data.address
        });
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="account-container-account">
      <div className="sidebar-wrapper-account">
        <SidebarProfile />
      </div>
      <div className="address-account">
        <div className="form-group-account">
          <label htmlFor="name">Tên người đặt:</label>
          <p id="name">{addressData.name}</p>
        </div>
        <div className="form-group-account">
          <label htmlFor="phone">Số điện thoại:</label>
          <p id="phone">{addressData.phone}</p>
        </div>
        <div className="form-group-account">
          <label htmlFor="address">Địa chỉ:</label>
          <p id="address">{addressData.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Address; // Changed the export to match the new function name
