import React, { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

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
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isSignupAttempted, setIsSignupAttempted] = useState(false);
  const [confirmOTP, setConfirmOTP] = useState(false);

  useEffect(() => {
    onCaptchVerify();
  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // No need to call onSignup here, it will be called separately
          },
          "expired-callback": () => {
            toast.error("Recaptcha hết hạn. Hãy thử lại.");
            // Re-verify captcha when expired
            window.recaptchaVerifier.clear();
            onCaptchVerify();
          },
        },
        auth
      );
    } else {
      window.recaptchaVerifier.render();
    }
  }

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

  const handleSendOTP = () => {
    if (loading || isSignupAttempted) return;
    onSignup();
  };

  function onSignup() {
    if (isSignupAttempted) return;
    setIsSignupAttempted(true);
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + formData.phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("Gửi OTP thành công.");
      })
      .catch((error) => {
        console.error("Gửi OTP lỗi:", error);
        setLoading(false);
        setIsSignupAttempted(false);
        if (error.code === "auth/quota-exceeded") {
          toast.error("Quá lượt gửi OTP. Hãy thử lại vào ngày mai.");
        } else {
          toast.error("Gửi OTP thất bại. Hãy thử lại.");
        }
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setLoading(false);
        setConfirmOTP(true);
        toast.success("Xác nhận OTP thành công");
        // Proceed with signup after OTP is verified
        await completeSignup();
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Xác nhận OTP thất bại. Hãy thử lại.");
      });
  }

  const handleSubmit = (e) => {
    const newErrors = {};

    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Hãy nhập tên của bạn.";
    }

    // Validate phone number field
    if (!formData.phone.trim()) {
      newErrors.phone = "Hãy nhập số điện thoại.";
    } else if (!/^\d{9,11}$/i.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không phù hợp.";
    }

    // Validate password field
    if (!formData.password.trim()) {
      newErrors.password = "Hãy nhập mật khẩu.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 6 kí tự.";
    }

    // Validate confirm password field
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Hãy xác nhận mật khẩu.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    // Validate terms accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "Hãy đọc và đồng ý với điều khoản của chúng tôi.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    handleSendOTP();
  };

  const completeSignup = async () => {
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
        const login = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            PhoneNumber: formData.phone,
            Password: formData.password,
          }
        );
        if (login.data.err === 0) {
          window.open(
            `http://localhost:5000/api/v1/auth/loginSuccess?token=${login.data.token}`,
            "_self"
          );
        } else {
          setMessage("Số điện thoại chưa được đăng kí hoặc sai mật khẩu");
        }
      }else {
        setMessage("Số điện thoại đã được đăng kí");
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
      <Toaster toastOptions={{ duration: 4000 }} />

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
          {isSignupAttempted && showOTP && !confirmOTP && (
            <div className="overlay">
              <div className="OTP-box">
                <div className="icon-container">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="otp-label">
                  Nhập OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                />
                <button
                  onClick={() => {
                    onOTPVerify();
                  }}
                  disabled={loading}
                  className="btn btn-success m-4"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Xác nhận</span>
                </button>
              </div>
            </div>
          )}

          <button
            className="signup-button"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
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
