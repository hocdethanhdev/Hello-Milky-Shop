import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./address.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { message } from "antd"; // Import Ant Design message component
import config from "../../config/config";

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
          `${config.API_ROOT}/api/v1/shippingAddress/getInfoShippingByUserID/${userId}`
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
          `${config.API_ROOT}/api/v1/city/getAllCities/`
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
        `${config.API_ROOT}/api/v1/district/getDistrictByID/${cityId}`
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

    // Validate inputs
    if (newAddress.name.length > 50) {
      message.error("Tên người đặt không vượt quá 50 kí tự.");
      return;
    }
    if (newAddress.phone.length < 11 || newAddress.phone.length > 15) {
      message.error("Số điện thoại phải lớn hơn 11 và bé hơn 15 kí tự.");
      return;
    }
    if (newAddress.address.length > 150) {
      message.error("Địa chỉ không vượt quá 150 kí tự.");
      return;
    }
    if (!newAddress.city) {
      message.error("Vui lòng chọn thành phố.");
      return;
    }
    if (!newAddress.district) {
      message.error("Vui lòng chọn quận/huyện.");
      return;
    }
    if (!newAddress.address) {
      message.error("Vui lòng nhập địa chỉ.");
      return;
    }

    const apiURL = `${config.API_ROOT}/api/v1/order/addInfoCusToOrder`;

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
        setNewAddress({
          name: "",
          phone: "",
          address: "",
          city: "",
          district: "",
        });
        // Fetch updated address data after adding a new address
        fetchAddresses();
        message.success("Địa chỉ mới đã được lưu thành công!");
      } else {
        message.error("Thêm địa chỉ thất bại.");
      }
    } catch (error) {
      console.error("Error adding customer info to order:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const handleDelete = async (shippingAddressID) => {
    const apiURL = `${config.API_ROOT}/api/v1/shippingAddress/updateDeleted/${shippingAddressID}`;

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
        setAddressData(
          addressData.filter(
            (address) => address.ShippingAddressID !== shippingAddressID
          )
        );
        message.success("Địa chỉ đã được xóa thành công.");
      } else {
        message.error("Xóa địa chỉ thất bại.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `${config.API_ROOT}/api/v1/shippingAddress/getInfoShippingByUserID/${userId}`
      );
      const data = await response.json();
      setAddressData(data);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  return (
    <div className="account-container-account-address">
      <div className="sidebar-wrapper">
        <SidebarProfile />
      </div>
      <div className="address-account">
        <table className="address-table">
          <thead>
            <tr className="row">
              <th className="col-md-2">Tên người đặt</th>
              <th className="col-md-2">Số điện thoại</th>
              <th className="col-md-6">Địa chỉ</th>
              <th className="col-md-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {addressData.map((address) => (
              <tr className="row" key={address.ShippingAddressID}>
                <td className="col-md-2">{address.Receiver}</td>
                <td className="col-md-2">{address.PhoneNumber}</td>
                <td className="col-md-6">{address.Address}</td>
                <td className="col-md-2">
                  <button
                    style={{
                      backgroundColor: "#CC0000",
                      borderRadius: "10px",
                      color: "white",
                      padding: "5px",
                      border: "none",
                    }}
                    onClick={() => handleDelete(address.ShippingAddressID)}>
                    Xóa địa chỉ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="button-address"
          onClick={() => setShowForm(!showForm)}>
          Thêm địa chỉ
        </button>

        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit} className="address-form">
              <button
                className="close-button-address"
                type="button"
                onClick={() => setShowForm(false)}>
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
                />
              </div>
              <div className="form-group-account">
                <label htmlFor="newCity">Thành phố:</label>
                <select
                  id="newCity"
                  name="city"
                  value={newAddress.city}
                  onChange={handleCityChange}>
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
                  disabled={!newAddress.city}>
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID}>
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
