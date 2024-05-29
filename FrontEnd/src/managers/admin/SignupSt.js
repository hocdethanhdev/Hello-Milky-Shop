import React, { useState } from "react";
import "./SignupSt.css";

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

function SignupSt() {
    return (
        <div className="form-sign-up-ne">
            <MDBContainer
                fluid
                className="d-flex justify-content-center align-items-center h-100"
            >
                <MDBCard
                    className="signup-card mx-auto mb-5 p-5 shadow-5"
                    style={{ maxWidth: "600px", marginTop: "50px" }}
                >
                    <MDBCardBody className="p-5">
                        <div className="logo-sign-up-ad">
                            <img src="/ImageMilkShop/Logo.jpg" alt="Milk Store Logo" style={{ width: '100px' }} />
                        </div>
                        <h2 className="fw-bold mb-5 text-center custom-font-size">Create staff account</h2>

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

                        <MDBBtn className="signup-button w-100 mb-4" size="md">
                            Đăng kí
                        </MDBBtn>


                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default SignupSt;
