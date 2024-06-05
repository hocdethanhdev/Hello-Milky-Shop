import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";

function Signup2() {
  const loginGoogle = () => {
    window.open('http://localhost:5000/api/v1/auth/google', '_self');
  };

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Kiểm tra và thiết lập lỗi khi người dùng nhập dữ liệu
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Vui lòng nhập số điện thoại.";
        } else {
          newErrors.phone = "";
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "Vui lòng nhập mật khẩu.";
        } else {
          newErrors.password = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra và thiết lập lỗi trước khi submit
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) {
        validationErrors[key] = errors[key];
      }
    });

    // Nếu có lỗi, dừng việc submit
    if (Object.keys(validationErrors).length > 0) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
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
        console.log(response.data.mes);
        setMessage("Đăng nhập thành công!");
      } else {
        console.log(response.data.mes);
        setMessage("Tài khoản không tồn tại hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard
        className="bg-light text-dark my-5 mx-auto"
        style={{ borderRadius: "1rem", maxWidth: "500px" }}
      >
        <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
          <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>

          {message && <p className="text-danger mb-3">{message}</p>}

          <MDBInput className="login-nd"
            wrapperClass="mb-4 mx-5 w-100"
            labelClass="text-dark"
            placeholder="Số điện thoại"
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-danger mb-3">{errors.phone}</p>}

          <MDBInput className="login-nd"
            wrapperClass="mb-4 mx-5 w-100"
            labelClass="text-dark"
            placeholder="Mật Khẩu"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-danger mb-3">{errors.password}</p>}

          <button className="login-button-trid" type="button" onClick={handleSubmit}>
            <span className="button-text-trid">Đăng nhập</span>
          </button>

          <div className=" flex-row">
            <a href="#" className="google-signup-button-trid">
              <MDBIcon
                fab
                icon="google"
                size="lg"
                className="google-icon-trid"
              />
              <span onClick={loginGoogle} className="button-text-trid">Đăng nhập với Google</span>
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
    </MDBContainer>
  );
}

export default Signup2;
