import React, { useState } from "react";
import "./SignupAd.css";
import axios from "axios";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function SignupAd() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone,
    });
    setErrors({
      ...errors,
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    const newErrors = {};

    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    // Validate phone number field
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{9,11}$/i.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Validate password field
    if (!formData.password.trim()) {
      newErrors.password = "Please enter a password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Validate confirm password field
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          UserName: formData.name,
          PhoneNumber: formData.phone,
          Password: formData.password,
          RoleID: 1,
        }
      );

      if (response.data.err === 0) {
        alert("Đăng kí thành công")
      } else if (response.data.err === 2) {
        setMessage("An account with this phone number already exists.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center h-100"
    >
      <div id="recaptcha-container"></div>
      <MDBCard
        className="signup-card mx-auto mb-5 p-5 shadow-5"
        style={{ maxWidth: "550px", marginTop: "50px", marginBottom: "200px" }}
      >
        <MDBCardBody className="p-5">
          <h2 className="fw-bold mb-5 text-center">Tạo một tài khoản mới</h2>
          {message && <div className="message">{message}</div>}
          <div className="mb-4">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder="Họ và tên"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="mb-4">
            <PhoneInput
              country={"vn"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="input-wrapper-sign"
              placeholder="Số điện thoại"
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <div className="mb-4">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder="Mật khẩu"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder="Nhập lại mật khẩu"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            className="signup-button"
            type="button"
            onClick={handleSubmit}
          >
            <span className="button-text">Đăng kí</span>
          </button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignupAd;
