import React, { useState } from "react";
import "./Signup.css";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

function Signup() {
  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center h-100"
    >
      <MDBCard
        className="signup-card mx-auto mb-5 p-5 shadow-5"
        style={{ maxWidth: "600px", marginTop: "50px" }}
      >
        <MDBCardBody className="p-5">
          <h2 className="fw-bold mb-5 text-center">Tạo một tài khoản mới</h2>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="input-wrapper"
                placeholder="Họ và tên"
                id="form1"
                type="text"
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass="input-wrapper"
            placeholder="Số điện thoại"
            id="form1"
            type="tel"
          />

          <MDBInput
            wrapperClass="input-wrapper"
            placeholder="Mật khẩu"
            id="form1"
            type="password"
          />
          <MDBInput
            wrapperClass="input-wrapper"
            placeholder="Nhập lại mật khẩu"
            id="form1"
            type="password"
          />

          <div className="checkbox-wrapper">
            <label htmlFor="flexCheckDefault" className="checkbox-label">
              <input
                type="checkbox"
                id="flexCheckDefault"
                name="flexCheck"
                value=""
                className="form-check-input"
              />
              Đồng ý với
              <a href="/termofuse" className="terms-link">
                điều khoản sử dụng
              </a>
              tại Hello Milky Shop
            </label>
          </div>

          <button className="signup-button" type="button">
            <span className="button-text">Đăng kí</span>
          </button>

          <div className="text-center social-buttons">
            <p>hoặc</p>

            <div className="d-flex flex-row mt-3">
              <a href="#" className="google-signup-button">
                <MDBIcon fab icon="google" size="lg" className="google-icon" />
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
