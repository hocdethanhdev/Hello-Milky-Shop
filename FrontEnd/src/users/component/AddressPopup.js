import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddressPopup.css';

const AddressPopup = ({ userId, handleAddressSelect, closePopup }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/shippingAddress/getInfoShippingByUserID/${userId}`);
                setAddresses(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching addresses:', err);
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [userId]);

    if (loading) return <div><h1>Loading...</h1></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Select Saved Address</h2>
                <button onClick={closePopup} className="close-btn">X</button>
                {addresses.length > 0 ? (
                    <ul>
                        {addresses.map(address => (
                            <li key={address.ShippingAddressID}>
                                <input
                                    type="radio"
                                    id={address.ShippingAddressID}
                                    name="selectedAddress"
                                    onChange={() => handleAddressSelect(address)}
                                />
                                <label htmlFor={address.ShippingAddressID}>
                                    {`${address.Receiver}, ${address.PhoneNumber}, ${address.Address}`}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved addresses found.</p>
                )}
            </div>
        </div>
    );
};

export default AddressPopup;
