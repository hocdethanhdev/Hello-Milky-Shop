import React, { useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBIcon } from "mdb-react-ui-kit";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
      <MDBCard className="signup-card mx-auto mb-5 p-5 shadow-5" style={{ maxWidth: "600px", marginTop: "50px" }}>
        <MDBCardBody className="p-5">
          <h2 className="fw-bold mb-5 text-center">Tạo một tài khoản mới</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="input-wrapper-sign mb-4"
              placeholder="Họ và tên"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <MDBInput
              wrapperClass="input-wrapper-sign mb-4"
              placeholder="Số điện thoại"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <MDBInput
              wrapperClass="input-wrapper-sign mb-4"
              placeholder="Mật khẩu"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <MDBInput
              wrapperClass="input-wrapper-sign mb-4"
              placeholder="Nhập lại mật khẩu"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="checkbox-wrapper mb-4">
              <label htmlFor="flexCheckDefault" className="checkbox-label">
                <input
                  type="checkbox"
                  id="flexCheckDefault"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                Đồng ý với
                <a href="/termofuse" className="terms-link">
                  điều khoản sử dụng
                </a>
                tại Hello Milky Shop
              </label>
            </div>

            <button className="signup-button w-100 mb-4" type="submit">
              <span className="button-text">Đăng kí</span>
            </button>
          </form>

          <div className="text-center social-buttons">
            <p>hoặc</p>
            <div className="d-flex flex-row justify-content-center mt-3">
              <a href="#" className="google-signup-button d-flex align-items-center">
                <MDBIcon fab icon="google" size="lg" className="google-icon me-2" />
                <span className="button-text">Đăng nhập với Google</span>
              </a>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
