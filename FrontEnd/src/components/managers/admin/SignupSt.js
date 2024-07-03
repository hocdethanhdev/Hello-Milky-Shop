import React, { useState } from "react";
import "./SignupSt.css";
import axios from "axios";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function SignupSt() {
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

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Hãy nhập tên của bạn.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Hãy nhập số điện thoại.";
    } else if (!/^\d{9,11}$/i.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không phù hợp.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Hãy nhập mật khẩu.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 6 kí tự.";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Hãy xác nhận mật khẩu.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
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
          RoleID: 2,
        }
      );

      if (response.data.err === 0) {
        alert("Đăng kí thành công")
      } else if (response.data.err === 2) {
        setMessage("Số điện thoại đã được đăng kí");
      }
    } catch (error) {
      console.error(error);
      setMessage("Đăng kí lỗi. Hãy thử lại.");
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

export default SignupSt;
