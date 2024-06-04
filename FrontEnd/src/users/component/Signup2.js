import React, { useState } from "react";
import "./Signup2.css";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (!formData.termsAccepted) {
      setMessage("You must accept the terms of use.");
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
        console.log(response.data.mes);
        setMessage("Sign up successful!");
      } else if (response.data.err === 2) {
        console.log(response.data.mes);
        setMessage("Account exist !!");
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

          <MDBInput
            wrapperClass="input-wrapper-sign"
            placeholder="Họ và tên"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <MDBInput
            wrapperClass="input-wrapper-sign"
            placeholder="Số điện thoại"
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <MDBInput
            wrapperClass="input-wrapper-sign"
            placeholder="Mật khẩu"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="input-wrapper-sign"
            placeholder="Nhập lại mật khẩu"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="checkbox-wrapper">
            <label htmlFor="flexCheckDefault" className="checkbox-label">
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

          {message && <p className="message">{message}</p>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
