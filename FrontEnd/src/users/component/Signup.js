import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { redirect } from "react-router-dom";

function Signup() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    // Validate phone number field
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/i.test(formData.phone)) {
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

    // Validate terms accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms of use.";
    }

    setErrors(newErrors);

    // If there are errors, stop form submission
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
        }
      );

      if (response.data.err === 0) {
        //nếu muốn sửa sau khi đăng kí thành công chuyển qua trang login thì xóa toàn bộ nội dung trong if này rồi thêm dòng sau vào
        //window.open('http://localhost:3000/login', '_self');
        const login = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            PhoneNumber: formData.phone,
            Password: formData.password,
          }
        );
        if (login.data.err === 0) {
          window.open(`http://localhost:5000/api/v1/auth/loginSuccess?token=${login.data.token}`, '_self');
        } else if (response.data.err === 1) {
          setMessage("Số điện thoại " + formData.phone + " chưa được đăng kí");
        } else {
          setMessage("Sai mật khẩu");
        }
        
      } else if (response.data.err === 2) {
        console.log(response.data.mes);
        setMessage("An account with this phone number already exists.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error signing up. Please try again.");
    }
  };

  const loginGoogle = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center h-100"
    >
      <MDBCard
        className="signup-card mx-auto mb-5 p-5 shadow-5"
        style={{ maxWidth: "550px", marginTop: "50px", marginBottom: "200px" }}
      >
        <MDBCardBody className="p-5">
          <h2 className="fw-bold mb-5 text-center">Tạo một tài khoản mới</h2>

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
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder="Số điện thoại"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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

          <div className="checkbox-wrapper mb-4">
            <label htmlFor="flexCheckDefault" className="checkbox-label-tri">
              <input
                type="checkbox"
                id="flexCheckDefault"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="form-check-input"
              />
              Đồng ý với
              <a href="/termofuse" className="terms-link">
                điều khoản sử dụng
              </a>
              tại Hello Milky Shop
            </label>
            {errors.termsAccepted && (
              <div className="error">{errors.termsAccepted}</div>
            )}
          </div>

          <button
            className="signup-button"
            type="button"
            onClick={handleSubmit}
          >
            <span className="button-text">Đăng kí</span>
          </button>

          <div className="text-center social-buttons">
            <p>hoặc</p>

            <div className="d-flex flex-row mt-3">
              <a href="#" className="google-signup-button">
                <MDBIcon fab icon="google" size="lg" className="google-icon" />
                <span onClick={loginGoogle} className="button-text">
                  Đăng nhập với Google
                </span>
              </a>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
