import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./address.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { message, Modal } from "antd"; // Import Ant Design message and Modal components
import config from "../../config/config";
import { useTranslation } from 'react-i18next';
import { AES, enc } from 'crypto-js';

function Address() {
  const [addressData, setAddressData] = useState([]);
  const { t } = useTranslation();
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
  const decryptedToken = token ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8) : null;
  const userId = getUserIdFromToken(decryptedToken);

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
      message.error(`${t('accountNameMustNotExceed50Characters')}`);
      return;
    }
    if (newAddress.phone.length < 9 || newAddress.phone.length > 11) {
      message.error(`${t('phoneNumberMustBeGreaterThan11AndLessThan15Characters.')}`);
      return;
    }
    if (newAddress.address.length > 150) {
      message.error(`${t('addressMustNotExceed150Characters')}`);
      return;
    }
    if (!newAddress.city) {
      message.error(`${t('pleaseSelectACity')}`);
      return;
    }
    if (!newAddress.district) {
      message.error(`${t('pleaseSelectaDistrict')}`);
      return;
    }
    if (!newAddress.address) {
      message.error(`${t('pleaseSelectAAddress')}`);
      return;
    }

    const apiURL = `${config.API_ROOT}/api/v1/order/addInfoCusToOrder`;

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decryptedToken}`,
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
        message.success(`${t('newAddressSavedSucessfully')}`);
      } else {
        message.error(`${t('addAddressFailed')}`);
      }
    } catch (error) {
      console.error("Error adding customer info to order:", error);
      message.error(`${t('errorAnErrorOccurredPleaseTryAgainLater')}`);
    }
  };

  const handleDelete = (shippingAddressID) => {
    Modal.confirm({
      title: `${t('confirmDeletion')}`,
      content: `${t('wantToDeleteThisAddress')}`,
      onOk: () => deleteAddress(shippingAddressID),
    });
  };

  const deleteAddress = async (shippingAddressID) => {
    const apiURL = `${config.API_ROOT}/api/v1/shippingAddress/updateDeleted/${shippingAddressID}`;

    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decryptedToken}`,
        },
      });

      if (response.ok) {
        // Remove the deleted address from addressData state
        setAddressData(
          addressData.filter(
            (address) => address.ShippingAddressID !== shippingAddressID
          )
        );
        message.success(`${t('addressDeletedSucessfully')}`);
      } else {
        message.error(`${t('deleteAddressFailed')}`);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      message.error(`${t('errorAnErrorOccurredPleaseTryAgainLater')}`);
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
              <th className="col-md-2">{t('orderersName')}</th>
              <th className="col-md-2">{t('phoneNumber')}</th>
              <th className="col-md-6">{t('address2')}</th>
              <th className="col-md-2">{t('operate')}</th>
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
                    {t('deleteAddress')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="button-address"
          onClick={() => setShowForm(!showForm)}>
          {t('addAddress')}
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
                <label htmlFor="newName">{t('orderersName')}:</label>
                <input
                  type="text"
                  id="newName"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-account">
                <label htmlFor="newPhone">{t('phoneNumber')}:</label>
                <input
                  type="text"
                  id="newPhone"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-account">
                <label htmlFor="newCity">{t('city')}:</label>
                <select
                  id="newCity"
                  name="city"
                  value={newAddress.city}
                  onChange={handleCityChange}>
                  <option value="">{t('selectCity')}</option>
                  {cities.map((city) => (
                    <option key={city.ID} value={city.ID}>
                      {city.CityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group-account">
                <label htmlFor="newDistrict">{t('district')}:</label>
                <select
                  id="newDistrict"
                  name="district"
                  value={newAddress.district}
                  onChange={handleInputChange}
                  disabled={!newAddress.city}>
                  <option value="">{t('selectDistrict')}</option>
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
                <label htmlFor="newAddress">{t('address2')}:</label>
                <input
                  type="text"
                  id="newAddress"
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                />
              </div>

              <button className="button-address" type="submit">
                {t('save')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;
