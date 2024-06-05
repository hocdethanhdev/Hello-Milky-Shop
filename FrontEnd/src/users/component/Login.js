import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useDispatch } from "react-redux";


function Login() {
  const loginGoogle = () => {
    window.open('http://localhost:5000/api/v1/auth/google', '_self');
  };

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra xem các giá trị input có null không
    if (!formData.phone || !formData.password) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
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
      } else if (response.data.err === 1){
        setMessage("Số điện thoại " + formData.phone + " chưa được đăng kí");
      }else {
        setMessage("Sai mật khẩu");
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    }
  };


  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol >
          <MDBCard
            className="bg-light text-dark my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
              <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
              <p className="text-dark-50 mb-5">
                
              </p>

              {message && <p className="text-danger">{message}</p>}
              
              <MDBInput className="login-nd"
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-dark"
                placeholder="Số điện thoại"
                id="phone"
                name="phone"
                type="tel"
                size="lg"
                value={formData.phone}
                onChange={handleChange}
              />
              <MDBInput className="login-nd"
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-dark"
                placeholder="Mật khẩu"
                id="password"
                name="password"
                type="password"
                size="lg"
                value={formData.password}
                onChange={handleChange}
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-dark-50" href="#!">
                  Quên mật khẩu?
                </a>
              </p>
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
