import React, { useState, useCallback } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { message } from 'antd';

function Login() {
  const loginGoogle = () => {
    window.open('http://localhost:5000/api/v1/auth/google', '_self');
  };

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }, []);

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          PhoneNumber: formData.phone,
          Password: formData.password
        }
      );
      if (response.data.err === 0) {
        window.open(`http://localhost:5000/api/v1/auth/loginSuccess?token=${response.data.token}`, '_self');
      } else if (response.data.err === 1) {
        message.error("Số điện thoại " + formData.phone + " chưa được đăng kí");
      } else {
        message.error("Sai mật khẩu");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="bg-light text-dark my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "500px" }}>
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
              <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
              <p className="text-dark-50 mb-5"></p>

              <PhoneInput className="login-nd"
                country={"vn"}
                value={formData.phone}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-dark"
                placeholder="Số điện thoại"
                id="phone"
                name="phone"
                type="tel"
                size="lg"
                onChange={handlePhoneChange}
              />
              <div className="position-relative mb-4 mx-5 w-100">
                <MDBInput className="login-nd"
                  wrapperClass="w-100"
                  labelClass="text-dark"
                  placeholder="Mật khẩu"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                />
                <MDBIcon
                  icon={passwordVisible ? "eye-slash" : "eye"}
                  size="lg"
                  className="password-toggle-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>

              <p className="small mb-3 pb-lg-2">
                <Link to="/ResetPassword">
                  <a className="text-dark-50" href="#!">
                    Quên mật khẩu?
                  </a>
                </Link>
              </p>
              <button className="login-button-trid" type="button" onClick={handleSubmit}>
                <span className="button-text-trid">Đăng nhập</span>
              </button>

              <div className="flex-row">
                <a href="#" className="google-signup-button-trid" onClick={loginGoogle}>
                  <MDBIcon fab icon="google" size="lg" className="google-icon-trid" />
                  <span className="button-text-trid">Đăng nhập với Google</span>
                </a>
              </div>

              <div>
                <p className="mb-0">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/Signup" className="text-dark-50 fw-bold">
                    Đăng kí ngay
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
