import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./address.css"; // Import the CSS file

function Address() {
  const [addressData, setAddressData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual API URL for adding an address
    const apiURL = 'https://api.example.com/addAddress';
    
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        // Update the address data
        setAddressData(newAddress);
        setShowForm(false);
        setNewAddress({ name: '', phone: '', address: '' });
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

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
        <button onClick={() => setShowForm(true)}>Thêm địa chỉ</button>
        
        {showForm && (
          <form onSubmit={handleSubmit} className="address-form">
            <div className="form-group-account">
              <label htmlFor="newName">Tên người đặt:</label>
              <input
                type="text"
                id="newName"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-account">
              <label htmlFor="newPhone">Số điện thoại:</label>
              <input
                type="text"
                id="newPhone"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-account">
              <label htmlFor="newAddress">Địa chỉ:</label>
              <input
                type="text"
                id="newAddress"
                name="address"
                value={newAddress.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Address;
