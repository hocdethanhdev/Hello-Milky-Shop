import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressPopup = ({ userID, onSelect, onClose }) => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/shippingAddress/getInfoShippingByUserID/${userID}`);
                setAddresses(response.data);
            } catch (err) {
                console.error('Error fetching addresses:', err);
            }
        };
        fetchAddresses();
    }, [userID]);

    return (
        <div className="address-popup">
            <h2>Chọn địa chỉ cũ</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address.ShippingAddressID}>
                        <input
                            type="radio"
                            name="selectedAddress"
                            value={address.ShippingAddressID}
                            onChange={() => onSelect(address)}
                        />
                        <label>
                            {address.Receiver}, {address.PhoneNumber}, {address.Address}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default AddressPopup;
