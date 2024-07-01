import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./address.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";

function Address() {
  const [addressData, setAddressData] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/shippingAddress/getInfoShippingByUserID/${userId}`
        );
        const data = await response.json();
        setAddressData(data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/city/getAllCities/"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchAddresses();
    fetchCities();
  }, [userId]);

  const fetchDistricts = async (cityId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/district/getDistrictByID/${cityId}`
      );
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setNewAddress({
      ...newAddress,
      city: cityId,
      district: "",
    });
    fetchDistricts(cityId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = "http://localhost:5000/api/v1/order/addInfoCusToOrder";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver: newAddress.name,
          phoneNumber: newAddress.phone,
          address: newAddress.address,
          userID: userId,
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setNewAddress({ name: "", phone: "", address: "", city: "", district: "" });
        // Optionally, fetch updated address data after adding new address
        // fetchAddresses();
      } else {
        console.error("Failed to add customer info to order");
      }
    } catch (error) {
      console.error("Error adding customer info to order:", error);
    }
  };

  const handleDelete = async (shippingAddressID) => {
    const apiURL = `http://localhost:5000/api/v1/shippingAddress/updateDeleted/${shippingAddressID}`;

    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted address from addressData state
        setAddressData(addressData.filter(address => address.ShippingAddressID !== shippingAddressID));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="account-container-account-address">
      <div className="sidebar-wrapper-account-address">
        <SidebarProfile />
      </div>
      <div className="address-account">
        <table className="address-table">
          <thead>
            <tr>
              <th>Tên người đặt</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {addressData.map((address) => (
              <tr key={address.ShippingAddressID}>
                <td>{address.Receiver}</td>
                <td>{address.PhoneNumber}</td>
                <td>{address.Address}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "#CC0000",
                      borderRadius: "10px",
                      color: "white",
                      padding: "5px",
                      border: "none",
                    }}
                    onClick={() => handleDelete(address.ShippingAddressID)}
                  >
                    Xóa địa chỉ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="button-address" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hủy" : "Thêm địa chỉ"}
        </button>

        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit} className="address-form">
              <button
                className="close-button-address"
                type="button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
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
                <label htmlFor="newCity">Thành phố:</label>
                <select
                  id="newCity"
                  name="city"
                  value={newAddress.city}
                  onChange={handleCityChange}
                  required
                >
                  <option value="">Chọn thành phố</option>
                  {cities.map((city) => (
                    <option key={city.ID} value={city.ID}>
                      {city.CityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group-account">
                <label htmlFor="newDistrict">Quận/Huyện:</label>
                <select
                  id="newDistrict"
                  name="district"
                  value={newAddress.district}
                  onChange={handleInputChange}
                  required
                  disabled={!newAddress.city}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.DistrictID} value={district.DistrictID}>
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
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

              <button className="button-address" type="submit">
                Lưu
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;
