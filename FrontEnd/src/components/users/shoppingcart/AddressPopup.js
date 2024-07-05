import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AddressPopup.css';
import { config } from "../../../config";

const AddressPopup = ({ userID, onSelect, onClose }) => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${config.API_ROOT}/api/v1/shippingAddress/getInfoShippingByUserID/${userID}`);
                setAddresses(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy địa chỉ:', err);
            }
        };
        fetchAddresses();
    }, [userID]);

    return (
        <div className="address-popup-overlay-long">
            <div className="address-popup-long">
                <h2>Chọn địa chỉ cũ</h2>
                <div className="address-list-container">
                    <ul>
                        {addresses.map((address) => (
                            <li key={address.ShippingAddressID}>
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    id={`address-${address.ShippingAddressID}`}
                                    value={address.ShippingAddressID}
                                    onChange={() => onSelect(address)}
                                />
                                <label htmlFor={`address-${address.ShippingAddressID}`}>
                                    {address.Receiver}, {address.PhoneNumber}, {address.Address}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={onClose} className="close-button">Đóng</button>
            </div>
        </div>
    );
};

AddressPopup.propTypes = {
    userID: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddressPopup;
